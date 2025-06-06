// components/EditProductPage.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductForm from '../../../components/product/ProductForm';
import { BASE_URL } from '@/shared/lib/utils';

export default function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get(
          `${BASE_URL}/api/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProduct(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to fetch product');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (productData: any) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.put(
        `${BASE_URL}/api/products/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => navigate('/farmers/products'), 2000);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update product');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading product...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-700 bg-red-100 rounded">
        {error}
        <button 
          onClick={() => navigate('/products')} 
          className="block mt-2 text-blue-600"
        >
          Back to products
        </button>
      </div>
    );
  }

  return (
   <div className="p-6 mb-8 bg-white rounded-lg shadow">
      <h1 className="mb-6 text-2xl font-bold">Edit Product</h1>
      
      {success && (
        <div className="p-4 mb-4 text-green-700 bg-green-100 rounded">
          Product updated successfully! Redirecting...
        </div>
      )}

      {product && (
        <ProductForm
          onSubmit={handleSubmit}
          onCancel={() => navigate('/farmers/products')}
          initialValues={{
            name: product.name,
            description: product.description,
            status: product.status,
            harvestDate: product.harvestDate?.split('T')[0],
            price: product.variants[0]?.price,
            stock: product.variants[0]?.stock,
            weight: product.variants[0]?.weight,
            weightUnit: product.variants[0]?.weightUnit,
            imageUrl: product.images[0]?.url,
            isOrganic: product.isOrganic,
            categories: product.categories
          }}
        />
      )}
    </div>
  );
}