import { useState } from 'react';
import { Search,  ChevronLeft, ChevronRight, Plus } from 'lucide-react';
// Product Card Component
import { Link } from 'react-router-dom';
import slugify from 'slugify';

// Define TypeScript types
type Category = 'Fruits' | 'Vegetables' | 'Seeds' | 'Plants';
export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  category: Category;
  
};


 // Product data
 export const products: Product[] = [
  {
    id: 1,
    name: 'Cassava',
    price: 19.0,
    image: '/yam.png',
    rating: 2,
    reviews: 24,
    category: 'Vegetables',
  },
  {
    id: 2,
    name: 'Sweet Potato',
    price: 19.0,
    image: '/pine.png',
    rating: 2,
    reviews: 24,
    category: 'Vegetables',
  },
  {
    id: 3,
    name: 'Banana',
    price: 19.0,
    image: '/coco.png',
    rating: 2,
    reviews: 24,
    category: 'Fruits',
  },
  {
    id: 4,
    name: 'Pineapple',
    price: 19.0,
    image: '/pine.png',
    rating: 2,
    reviews: 24,
    category: 'Fruits',
  },
  {
    id: 5,
    name: 'Coconut',
    price: 19.0,
    image: '/coco.png',
    rating: 2,
    reviews: 24,
    category: 'Fruits',
  },
  {
    id: 6,
    name: 'Corn',
    price: 19.0,
    image: '/cor.png',
    rating: 2,
    reviews: 24,
    category: 'Vegetables',
  },
  {
    id: 7,
    name: 'Sunflower Seeds',
    price: 10.0,
    image: '/api/placeholder/320/240',
    rating: 4,
    reviews: 15,
    category: 'Seeds',
  },
  {
    id: 8,
    name: 'Tomato Plant',
    price: 15.0,
    image: '/cor.png',
    rating: 3,
    reviews: 18,
    category: 'Plants',
  },
];



export default function FarmMarketplace() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [priceRange, setPriceRange] = useState(50);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === null || product.category === selectedCategory) &&
      product.price <= priceRange
  );

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Handler functions remain the same

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
        {/* Stats - Simplified for mobile */}
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
              className="w-full px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <Search size={18} className="absolute text-gray-400 right-3 top-2" />
          </div>
        </div>

        {/* Products Grid - More compact */}
        <div className="grid grid-cols-2 gap-3 mb-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
          {currentProducts.map((product) => (
            <CompactProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination - Simplified */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-md disabled:opacity-50 hover:bg-gray-100"
            >
              <ChevronLeft size={18} />
            </button>
            
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const page = currentPage <= 3 ? i + 1 : 
                         currentPage >= totalPages - 2 ? totalPages - 4 + i : 
                         currentPage - 2 + i;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 text-sm rounded-md ${
                    currentPage === page ? 'bg-green-600 text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-md disabled:opacity-50 hover:bg-gray-100"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Compact Stat Card Component
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

// Compact Product Card Component
function CompactProductCard({ product }: { product: Product }) {
  const slug = slugify(`${product.name}-${product.id}`, { lower: true });

  return (
    <Link to={`/farmers/marketplace/product/${slug}`} className="group">
      <div className="overflow-hidden transition-all duration-200 bg-white border rounded-md hover:shadow-sm">
        <div className="relative aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
        <div className="p-2">
          <h3 className="text-sm font-medium line-clamp-1">{product.name}</h3>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm font-semibold text-green-600">${product.price.toFixed(2)}</span>
            <div className="flex items-center">
              <StarRating rating={product.rating} />
              <span className="ml-1 text-xs text-gray-500">({product.reviews})</span>
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

// Sidebar Component (optimized)
function SidebarComponent({
  selectedCategory,
  handleCategoryChange,
  priceRange,
  handlePriceRangeChange,
}: {
  selectedCategory: Category | null;
  handleCategoryChange: (category: Category) => void;
  priceRange: number;
  handlePriceRangeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const categories: Category[] = ['Fruits', 'Vegetables', 'Seeds', 'Plants'];

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
              {category}
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
        <button className="w-full px-3 py-1.5 text-sm text-gray-700 bg-white border rounded-md hover:bg-gray-50">
          Reset
        </button>
      </div>
    </div>
  );
}