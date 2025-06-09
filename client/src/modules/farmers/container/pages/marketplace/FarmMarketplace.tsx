
import { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import { BASE_URL } from '@/shared/lib/utils';

type ProductCategory =
  | "fruits"
  | "vegetables"
  | "grains"
  | "dairy"
  | "meat"
  | "poultry"
  | "herbs"
  | "spices"
  | "seeds"
  | "roots"
  | "greens"
  | "other";

type ProductStatus =
  | "draft"
  | "active"
  | "out_of_stock"
  | "deleted"
  | "inactive";

interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

interface ProductVariant {
  id: string;
  name: string;
  price: number;
  comparedAtPrice?: number;
  sku: string;
  weight: number;
  weightUnit: "kg" | "g" | "lb" | "oz";
  stock: number;
  isAvailable: boolean;
}

interface Product {
  id?: string | number; // Allow both string and number for _id
  _id?: string | number;
  farmerId: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  categories: ProductCategory[];
  images: ProductImage[];
  variants: ProductVariant[];
  harvestDate?: Date;
  bestBefore?: Date;
  certifications: string[];
  isOrganic: boolean;
  status: ProductStatus;
  averageRating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
}

// Sample product data matching the interface
export const products: Product[] = [
  {
    _id: "1",
    farmerId: "farmer-1",
    name: 'Cassava',
    slug: 'cassava',
    description: 'Fresh organic cassava from local farms',
    shortDescription: 'Organic cassava',
    categories: ["vegetables", "roots"],
    images: [
      {
        id: "img-1",
        url: '/yam.png',
        alt: 'Cassava',
        isPrimary: true
      }
    ],
    variants: [
      {
        id: "var-1",
        name: "1kg pack",
        price: 19.0,
        sku: "CAS-1KG",
        weight: 1,
        weightUnit: "kg",
        stock: 100,
        isAvailable: true
      }
    ],
    harvestDate: new Date('2023-10-15'),
    bestBefore: new Date('2023-12-15'),
    certifications: ["USDA Organic"],
    isOrganic: true,
    status: "active",
    averageRating: 2,
    reviewCount: 24,
    createdAt: new Date('2023-09-01'),
    updatedAt: new Date('2023-09-01'),
    featured: true,
    metaTitle: 'Organic Cassava',
    metaDescription: 'Buy fresh organic cassava from local farmers',
    tags: ['root', 'organic', 'local']
  },
  {
    id: "2",
    farmerId: "farmer-1",
    name: 'Sweet Potato',
    slug: 'sweet-potato',
    description: 'Sweet and nutritious sweet potatoes',
    shortDescription: 'Fresh sweet potatoes',
    categories: ["vegetables", "roots"],
    images: [
      {
        id: "img-2",
        url: '/pine.png',
        alt: 'Sweet Potato',
        isPrimary: true
      }
    ],
    variants: [
      {
        id: "var-2",
        name: "1kg pack",
        price: 19.0,
        sku: "SWP-1KG",
        weight: 1,
        weightUnit: "kg",
        stock: 80,
        isAvailable: true
      }
    ],
    harvestDate: new Date('2023-10-10'),
    bestBefore: new Date('2023-12-10'),
    certifications: [],
    isOrganic: false,
    status: "active",
    averageRating: 2,
    reviewCount: 24,
    createdAt: new Date('2023-09-05'),
    updatedAt: new Date('2023-09-05'),
    featured: false
  },
  // Add more products following the same structure
];



export default function FarmMarketplace() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [priceRange, setPriceRange] = useState(50);

  // Fetch products from API
  const fetchProducts = async () => {
    const params = new URLSearchParams();
    if (selectedCategory) params.append('category', selectedCategory);
    if (searchQuery) params.append('search', searchQuery);
    params.append('maxPrice', priceRange.toString());
    params.append('page', currentPage.toString());
    params.append('limit', itemsPerPage.toString());

    const response = await axios.get(`${BASE_URL}/api/products?${params.toString()}`);
    
    return response.data;
  };
  

  const { data, isLoading, isError, refetch } = useQuery(
    ['products', selectedCategory, searchQuery, priceRange, currentPage, itemsPerPage],
    fetchProducts,
    {
      keepPreviousData: true,
      staleTime: 30000, // 30 seconds
    }
  );

  // Refetch when filters change
  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedCategory, searchQuery, priceRange]);

  // Handle error state
  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-4 text-red-600 bg-red-100 rounded-md">
          Failed to load products. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen lg:flex-row">
      {/* Mobile Filters Button */}
      <div className="p-4 lg:hidden">
        <button className="flex items-center justify-center w-full p-2 text-sm text-white bg-green-600 rounded-md">
          <Plus size={16} className="mr-2" />
          Filters
        </button>
      </div>

      {/* Sidebar - Hidden on mobile */}
      <div className="hidden w-full p-4 ml-4 bg-white lg:block lg:w-64 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <SidebarComponent
          selectedCategory={selectedCategory}
          handleCategoryChange={setSelectedCategory}
          priceRange={priceRange}
          handlePriceRangeChange={(e) => setPriceRange(Number(e.target.value))}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-3 mb-4 sm:grid-cols-3">
          <StatCard title="Weekly Sales" value="46,827" trend="↓ 6.56" />
          <StatCard title="Top Crop" value="Cassava" trend="↑ 6.56" />
          <StatCard title="Price Rise" value="20%" trend="↑ 6.56" />
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col items-stretch mb-4 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 sm:items-center">
          <div className="flex items-center">
            <span className="mr-2 text-sm text-gray-600">Show:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="py-1 pl-2 pr-8 text-sm bg-white border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            >
              <option value={8}>8</option>
              <option value={12}>12</option>
              <option value={16}>16</option>
            </select>
          </div>

          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && refetch()}
              className="w-full px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <Search 
              size={18} 
              className="absolute text-gray-400 cursor-pointer right-3 top-2" 
              onClick={() => refetch()}
            />
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-green-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && data?.data && (
          <>
            <div className="grid grid-cols-2 gap-3 mb-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
              {data.data.map((product: Product) => (
                <CompactProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {data.total > itemsPerPage && (
              <div className="flex items-center justify-center space-x-1">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1 || isLoading}
                  className="p-1.5 rounded-md disabled:opacity-50 hover:bg-gray-100"
                >
                  <ChevronLeft size={18} />
                </button>
                
                {Array.from({ length: Math.min(data.pages, 5) }, (_, i) => {
                  const page = currentPage <= 3 ? i + 1 : 
                             currentPage >= data.pages - 2 ? data.pages - 4 + i : 
                             currentPage - 2 + i;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      disabled={isLoading}
                      className={`w-8 h-8 text-sm rounded-md ${
                        currentPage === page ? 'bg-green-600 text-white' : 'hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, data.pages))}
                  disabled={currentPage === data.pages || isLoading}
                  className="p-1.5 rounded-md disabled:opacity-50 hover:bg-gray-100"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}

        {/* Empty state */}
        {!isLoading && data?.data?.length === 0 && (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 text-gray-500">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="mb-2 text-lg font-medium">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, trend }: { title: string; value: string; trend: string }) {
  const isPositive = trend.startsWith('↑');
  
  return (
    <div className="p-3 bg-white rounded-md shadow-xs">
      <div className="text-lg font-semibold text-green-600">{value}</div>
      <div className="text-xs text-gray-500">{title}</div>
      <div className={`flex items-center mt-1 text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {trend}
      </div>
    </div>
  );
}

// Product Card Component
export function CompactProductCard({ product }: { product: any}) {
  const primaryImage = product.images.find((img: ProductImage) => img.isPrimary) || product.images[0];
  const price = product.variants[0].price;

  return (
    <Link to={`/farmers/marketplace/product/${product._id}`} className="group">
      <div className="overflow-hidden transition-all duration-200 bg-white border rounded-md hover:shadow-sm">
        <div className="relative aspect-square">
          <img
            src={primaryImage.url}
            alt={primaryImage.alt}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
        <div className="p-2">
          <h3 className="text-sm font-medium line-clamp-1">{product.name}</h3>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm font-semibold text-green-600">${price.toFixed(2)}</span>
            <div className="flex items-center">
              <StarRating rating={product.averageRating} />
              <span className="ml-1 text-xs text-gray-500">({product.reviewCount})</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Star Rating Component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3 h-3 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// Sidebar Component
function SidebarComponent({
  selectedCategory,
  handleCategoryChange,
  priceRange,
  handlePriceRangeChange,
}: {
  selectedCategory: ProductCategory | null;
  handleCategoryChange: (category: ProductCategory | null) => void;
  priceRange: number;
  handlePriceRangeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const categories: ProductCategory[] = [
    "fruits", 
    "vegetables", 
    "seeds", 
    "roots",
    "greens",
    "herbs",
    "spices"
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold tracking-wider text-gray-500 uppercase">Filters</h2>
      
      <div className="space-y-3">
        <h3 className="text-xs font-medium tracking-wider text-gray-500 uppercase">Category</h3>
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`flex w-full items-center px-3 py-1.5 text-sm rounded-md ${
                selectedCategory === category 
                  ? 'bg-green-50 text-green-700' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <span className={`w-2 h-2 rounded-full mr-2 ${
                selectedCategory === category ? 'bg-green-500' : 'bg-gray-300'
              }`}></span>
              {category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-medium tracking-wider text-gray-500 uppercase">Price Range</h3>
        <div className="px-1">
          <div className="flex justify-between mb-1 text-xs">
            <span>${priceRange}</span>
            <span>$100</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={priceRange}
            onChange={handlePriceRangeChange}
            className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-500"
          />
        </div>
      </div>

      <div className="pt-2 space-y-2">
        <button className="w-full px-3 py-1.5 text-sm text-white bg-green-600 rounded-md hover:bg-green-700">
          Apply Filters
        </button>
        <button 
          onClick={() => {
            handleCategoryChange(null);
            handlePriceRangeChange({ target: { value: '100' } } as React.ChangeEvent<HTMLInputElement>);
          }}
          className="w-full px-3 py-1.5 text-sm text-gray-700 bg-white border rounded-md hover:bg-gray-50"
        >
          Reset
        </button>
      </div>
    </div>
  );
}