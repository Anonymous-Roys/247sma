// components/ProductsPage.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from '../../components/product/ProductForm';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '@/shared/lib/utils';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => { 
      
    const fetchFarmerProducts = async () => {
      
      try {
        const token = sessionStorage.getItem('token');
        
        const res = await fetch(`${BASE_URL}/api/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();

        if (!data.user?._id) {
          throw new Error('User not authenticated');
        }
       
        const response = await axios.get(
          `${BASE_URL}/api/products/farmer/${data.user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("first")
        setProducts(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFarmerProducts();
  }, []);
// Add these functions to your ProductsPage component
const handleEdit = (productId: string) => {
  navigate(`/farmers/products/edit/${productId}`);
};

const handleDelete = async (productId: string) => {
  if (!window.confirm('Are you sure you want to delete this product?')) {
    return;
  }

  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.delete(
      `${BASE_URL}/api/products/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      setProducts(products.filter(product => product._id !== productId));
      setTimeout(() => setSuccess(false), 3000);
    }
  } catch (err: any) {
    setError(err.response?.data?.error || 'Failed to delete product');
  }
};
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async (productData: any) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const token = sessionStorage.getItem('token');
      const user = JSON.parse(sessionStorage.getItem('user') || '{}');

      const response = await axios.post(
        `${BASE_URL}/api/products`,
        { ...productData, farmerId: user._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setProducts(prev => [...prev, response.data]);
        setSuccess(true);
        setShowForm(false);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full max-w-md p-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 ml-4 text-white transition-colors bg-green-600 rounded hover:bg-green-700"
        >
          Add Product
        </button>
      </div>

      {success && (
        <div className="p-4 mb-4 text-green-700 bg-green-100 rounded">
          Product created successfully!
        </div>
      )}

      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">
          {error}
        </div>
      )}

      {showForm && (
        <div className="p-4 mb-4 bg-white rounded shadow">
          <ProductForm
            onSubmit={handleAdd}
            onCancel={handleCancel}
          />
          {isSubmitting && (
            <div className="mt-2 text-blue-600">Saving product...</div>
          )}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Harvested</th>
              <th className="px-4 py-2 text-left">Stock</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${product.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                    }`}>
                    {product.status === 'active' ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {product.harvestDate ? new Date(product.harvestDate).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-4 py-2">{product.variants[0]?.stock || 0}</td>
                <td className="px-4 py-2">¢{(product.variants[0]?.price || 0).toFixed(2)}</td>
                <td className="px-4 py-2">
                  {product.images[0]?.url ? (
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="object-cover w-10 h-10 rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder-product.png';
                      }}
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded"></div>
                  )}
                </td>
                <td className="px-4 py-2">
  <div className="flex space-x-2">
    <button
      onClick={() => handleEdit(product._id)}
      className="px-2 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
    >
      Edit
    </button>
    <button
      onClick={() => handleDelete(product._id)}
      className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
    >
      Delete
    </button>
  </div>
</td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                  {products.length === 0 ? 'No products available' : 'No matching products found'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}