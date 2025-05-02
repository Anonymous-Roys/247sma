import { useState } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
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
// Main App component
export default function FarmMarketplace() {
  // State management
  const [selectedCategory, setSelectedCategory] = useState<Category>('Fruits');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [priceRange, setPriceRange] = useState(50);

 

  // Filter products based on search, category, and price
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === product.category || selectedCategory === null) &&
      product.price <= priceRange
  );

  // Pagination logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Handler functions
  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen md:flex-row bg-gray-50">
      {/* Sidebar */}
      <div className="w-full p-4 bg-white shadow-md md:w-64">
        <SidebarComponent
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
          priceRange={priceRange}
          handlePriceRangeChange={handlePriceRangeChange}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Statistics */}
        <StatsComponent />

        {/* Search and Filter */}
        <div className="flex flex-col items-center justify-between gap-2 mb-4 md:flex-row">
          <div className="flex items-center">
            <span className="mr-2 text-gray-700">Per Page:</span>
            <div className="relative">
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="py-1 pl-2 pr-8 bg-white border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value={6}>6</option>
                <option value={12}>12</option>
                <option value={24}>24</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          <div className="flex w-full md:w-auto">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="p-2 text-white bg-green-600 rounded-r-md hover:bg-green-700">
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2 lg:grid-cols-3">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center mt-6 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-full ${
              currentPage === 1 ? 'text-gray-400' : 'text-green-600 hover:bg-green-100'
            }`}
          >
            <ChevronLeft size={20} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-8 h-8 rounded-full ${
                currentPage === page
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 hover:bg-green-100'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-full ${
              currentPage === totalPages ? 'text-gray-400' : 'text-green-600 hover:bg-green-100'
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Stats Component
function StatsComponent() {
  return (
    <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
      <div className="p-4 bg-white rounded-md shadow-sm">
        <div className="text-2xl font-bold text-green-500">46,827</div>
        <div className="text-sm text-gray-600">Total Week Crop Sales</div>
        <div className="flex items-center mt-1 text-sm">
          <span className="mr-2 text-red-500">↓ 6.56</span>
          <span className="text-gray-500">-0.91% this week</span>
        </div>
      </div>

      <div className="p-4 bg-white rounded-md shadow-sm">
        <div className="text-2xl font-bold text-green-500">Cassava - 48,593</div>
        <div className="text-sm text-gray-600">Top Selling Crop</div>
        <div className="flex items-center mt-1 text-sm">
          <span className="mr-2 text-green-500">↑ 6.56</span>
        </div>
      </div>

      <div className="p-4 bg-white rounded-md shadow-sm">
        <div className="text-2xl font-bold text-green-500">20%</div>
        <div className="text-sm text-gray-600">Crops Monthly Price Rise</div>
        <div className="flex items-center mt-1 text-sm">
          <span className="mr-2 text-green-500">↑ 6.56</span>
        </div>
      </div>
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
  selectedCategory: Category | null;
  handleCategoryChange: (category: Category) => void;
  priceRange: number;
  handlePriceRangeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const categories: Category[] = ['Fruits', 'Vegetables', 'Seeds', 'Plants'];

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Category</h2>
      <div className="mb-6 space-y-2">
        {categories.map((category) => (
          <div
            key={category}
            className="flex items-center p-2 border rounded-md cursor-pointer hover:bg-gray-50"
            onClick={() => handleCategoryChange(category)}
          >
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${
                selectedCategory === category ? 'border-green-500' : 'border-gray-300'
              }`}
            >
              {selectedCategory === category && (
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              )}
            </div>
            <span>{category}</span>
          </div>
        ))}
      </div>

      <h2 className="mb-4 text-lg font-semibold">Price</h2>
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span>Price Range</span>
          <span>${priceRange}.00</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={priceRange}
          onChange={handlePriceRangeChange}
          className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
        />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-gray-500">$0</span>
          <span className="text-xs text-gray-500">$100</span>
        </div>
      </div>

      <button className="w-full py-2 mb-4 text-green-600 bg-white border border-green-600 rounded-md hover:bg-green-50">
        Filter
      </button>

      <div className="space-y-2">
        <button className="flex items-center justify-center w-full py-2 text-white bg-green-600 rounded-md hover:bg-green-700">
          <Plus size={20} className="mr-2" />
          Add Product
        </button>
        <button className="w-full py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
          View My Products
        </button>
      </div>
    </div>
  );
}



function ProductCard({ product }: { product: Product }) {
  const slug = slugify(`${product.name}-${product.id}`, { lower: true });

  return (
    <Link to={`product/${slug}`}>
      <div className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-sm hover:shadow-md">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-48"
        />
        <div className="p-4">
          <div className="flex mb-2">
            {Array.from({ length: 5 }, (_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < product.rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-xs text-gray-500">({product.reviews})</span>
          </div>
          <h3 className="mb-1 font-semibold">{product.name}</h3>
          <p className="text-gray-700">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}
