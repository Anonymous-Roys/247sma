import { useEffect, useState } from 'react';
import { Share2, Plus } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { products } from './FarmMarketplace';

// TypeScript types
type ProductImage = {
  id: number;
  url: string;
};
type Category = 'Fruits' | 'Vegetables' | 'Seeds' | 'Plants';

type Product = {
  id: number;
  name: string;
  type?: string;
  unitPrice?: number;
  unitDiscount?: number;
  bulkPrice?: number;
  bulkDiscount?: number;
  expiryDate?: string;
  description?: string;
  mainImage?: string;
  additionalImages?: ProductImage[];
  category?: Category;
  price?: number;
  image?: string;
  rating?: number;
  reviews?: number;
};

export default function ProductDetailPage() {
  const { slug } = useParams();
  const id = Number(slug?.split('-').pop());
  const matchedProduct = products.find(p => p.id === id);
  const [product, setProduct] = useState<Product | null>(
    matchedProduct ? (matchedProduct as Product) : null
  );
  
  useEffect(() => {
    const found = products.find(p => p.id === id);
    if (!found) {
      console.warn('Product not found!');
    } else {
      setProduct(found as Product);
    }
  }, [id]);
  

  // Handler for input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => {
      if (!prev) return prev; // or throw if this should never happen
      return {
        ...prev,
        [name]: value
      };
    });
    
  };

  // Handler for Save to Cart
  const handleSaveToCart = async () => {
    try {
      // await api.saveToCart(product);
      alert('Product saved to cart!');
    } catch (err) {
      console.error(err);
      alert('Failed to save.');
    }
  };
  

  // Handler for Publish
  const handlePublish = () => {
    alert('Product published successfully!');
  
  };
  const handleAddImage = () => {
    alert('Image add form/modal would open here.');
  };
  // Handler for Upload New Image
  const handleUploadImage = () => {
    alert('Image upload feature would open here');
  };

  
  if (!product) {
    return <div className="p-4">Product not found.</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb navigation */}
      <div className="p-4 text-gray-500">
        <p>Marketplace &gt; Product &gt; Description</p>
      </div>

      <div className="p-4 mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Left side - Images */}
          <div className="w-full md:w-1/2">
            <div className="mb-4 overflow-hidden bg-white rounded-lg shadow-sm">
              <img 
                src={product.mainImage} 
                alt={product.name || "Product"} 
                className="object-cover w-full h-80"
              />
              
              <div className="flex justify-center p-4">
                <button 
                  onClick={handleUploadImage}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                >
                  <Share2 size={20} className="transform rotate-90" />
                  <span>Upload New Image</span>
                </button>
              </div>
            </div>

            {/* Additional Images */}
            <div>
              <h3 className="mb-3 text-lg font-medium">Additional Images</h3>
              <div className="flex flex-wrap gap-2">
                {product.additionalImages?.map((image) => (
                  <div 
                    key={image.id}
                    className="w-32 h-32 overflow-hidden bg-white rounded-lg shadow-sm"
                  >
                    <img 
                      src={image.url} 
                      alt={`Additional ${image.id}`} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
                
                {/* Add image button */}
                <button 
                  onClick={handleAddImage}
                  className="flex items-center justify-center w-32 h-32 bg-green-100 rounded-lg hover:bg-green-200"
                >
                  <Plus size={32} className="text-green-500" />
                </button>
              </div>
            </div>
          </div>

          {/* Right side - Product Details Form */}
          <div className="w-full space-y-6 md:w-1/2">
            {/* Product Name */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Product Name"
                value={product.name}
                onChange={handleInputChange}
                className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-green-500"
              />
            </div>

            {/* Product Type */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Product Type
              </label>
              <input
                type="text"
                name="type"
                value={product.type}
                onChange={handleInputChange}
                className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-green-500"
              />
            </div>

            {/* Price Section - Two columns */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Unit Price */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Unit Price
                </label>
                <input
                  type="number"
                  name="unitPrice"
                  placeholder="$$$$$"
                  value={product.unitPrice || ''}
                  onChange={handleInputChange}
                  className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-green-500"
                />
              </div>

              {/* Unit Discount */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Discount
                </label>
                <input
                  type="text"
                  name="unitDiscount"
                  placeholder="$$$$$"
                  value={product.unitDiscount || ''}
                  onChange={handleInputChange}
                  className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-green-500"
                />
              </div>

              {/* Bulk Price */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Bulk Price
                </label>
                <input
                  type="text"
                  name="bulkPrice"
                  placeholder="$$$$$"
                  value={product.bulkPrice || ''}
                  onChange={handleInputChange}
                  className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-green-500"
                />
              </div>

              {/* Bulk Discount */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Discount
                </label>
                <input
                  type="text"
                  name="bulkDiscount"
                  placeholder="$$$$$"
                  value={product.bulkDiscount || ''}
                  onChange={handleInputChange}
                  className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-green-500"
                />
              </div>
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/DD/YY"
                value={product.expiryDate}
                onChange={handleInputChange}
                className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-green-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                rows={4}
                value={product.description}
                onChange={handleInputChange}
                className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-green-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-4">
              <button
                onClick={handleSaveToCart}
                className="px-8 py-3 text-white transition bg-green-600 rounded-md hover:bg-green-700"
              >
                Save to Cart
              </button>
              
              <button
                onClick={handlePublish}
                className="px-8 py-3 text-white transition bg-green-600 rounded-md hover:bg-green-700"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}