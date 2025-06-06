import { useState, useRef, ChangeEvent } from "react";
import { FiUpload, FiX, FiCheck, FiInfo } from "react-icons/fi";

type ProductFormProps = {
  onSubmit: (product: any) => void;
  onCancel: () => void;
  initialValues?: {
    name: string;
    description: string;
    status: 'active' | 'out_of_stock';
    harvestDate: string;
    price: number;
    stock: number;
    weight: number;
    weightUnit: 'kg' | 'g' | 'lb' | 'oz';
    imageUrl: string;
    isOrganic: boolean;
    categories: string[];
  };
};

export default function ProductForm({
  onSubmit,
  onCancel,
  initialValues = {
    name: '',
    description: '',
    status: 'active',
    harvestDate: '',
    price: 0,
    stock: 0,
    weight: 1,
    weightUnit: 'kg',
    imageUrl: '',
    isOrganic: false,
    categories: []
  }
}: ProductFormProps) {
  const [form, setForm] = useState(initialValues);
  const [previewImage, setPreviewImage] = useState<string | null>(initialValues.imageUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked :
        (name === 'price' || name === 'stock' || name === 'weight') ?
          parseFloat(value) || 0 : value
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setForm(prev => ({
      ...prev,
      categories: checked
        ? [...prev.categories, value]
        : prev.categories.filter(cat => cat !== value)
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (!files || files.length === 0) return;

  const file = files[0];

  if (file.size > 2 * 1024 * 1024) {
    alert('Image size should be less than 2MB');
    return;
  }

  setIsUploading(true);

  try {
    // Step 1: Preview via Base64
    const reader = new FileReader();

    reader.onload = async (event) => {
      const base64Image = event.target?.result as string;

      // Show preview
      setPreviewImage(base64Image);

      // OPTIONAL: send to your backend as base64 string
      // await axios.post('/api/products/upload-base64', { image: base64Image });

      // Step 2: Simulate upload (you can replace this with real upload logic)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // OR, to store base64 directly:
      setForm((prev) => ({ ...prev, imageUrl: base64Image }));
    };

    reader.readAsDataURL(file);
  } catch (error) {
    console.error('Image upload error:', error);
    alert('Failed to upload image');
  } finally {
    setIsUploading(false);
  }
};


  const removeImage = () => {
    setPreviewImage(null);
    setForm(prev => ({ ...prev, imageUrl: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product = {
      name: form.name,
      description: form.description,
      status: form.status,
      harvestDate: form.harvestDate,
      isOrganic: form.isOrganic,
      categories: form.categories,
      images: form.imageUrl ? [{ url: form.imageUrl, alt: form.name, isPrimary: true }] : [],
      variants: [{
        name: `${form.name} - ${form.weight}${form.weightUnit}`,
        price: form.price,
        stock: form.stock,
        weight: form.weight,
        weightUnit: form.weightUnit,
      }]
    };
    onSubmit(product);
  };

  const categories = [
    'fruits', 'vegetables', 'grains', 'dairy', 'meat',
    'poultry', 'herbs', 'spices', 'seeds', 'roots',
    'greens', 'other'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            placeholder="e.g. Organic Apples"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="active">In stock</option>
            <option value="out_of_stock">Out of stock</option>
          </select>
        </div>

        {/* Description */}
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe your product in detail..."
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>

        {/* Harvest Date */}
        <div className="space-y-2">
          <label htmlFor="harvestDate" className="block text-sm font-medium text-gray-700">
            Harvest Date <span className="text-red-500">*</span>
          </label>
          <input
            id="harvestDate"
            name="harvestDate"
            type="date"
            value={form.harvestDate}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>

        {/* Organic Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            id="isOrganic"
            type="checkbox"
            name="isOrganic"
            checked={form.isOrganic}
            onChange={handleChange}
            className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <label htmlFor="isOrganic" className="text-sm font-medium text-gray-700">
            Organic Product
          </label>
        </div>

        {/* Price */}
        <div className="space-y-2">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price (₵) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₵</span>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full p-3 pl-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Stock */}
        <div className="space-y-2">
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
            Available Stock <span className="text-red-500">*</span>
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            value={form.stock}
            onChange={handleChange}
            placeholder="0"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>

        {/* Weight */}
        <div className="space-y-2">
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
            Weight <span className="text-red-500">*</span>
          </label>
          <div className="flex">
            <input
              id="weight"
              name="weight"
              type="number"
              min="0"
              step="0.01"
              value={form.weight}
              onChange={handleChange}
              placeholder="1"
              className="w-3/4 p-3 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
            <select
              name="weightUnit"
              value={form.weightUnit}
              onChange={handleChange}
              className="w-1/4 p-3 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="lb">lb</option>
              <option value="oz">oz</option>
            </select>
          </div>
        </div>

        {/* Image Upload */}
        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Product Image
          </label>
          
          {previewImage ? (
            <div className="relative w-40 h-40">
              <img 
                src={previewImage} 
                alt="Preview" 
                className="object-cover w-full h-full rounded-md"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute p-1 text-white bg-red-500 rounded-full -top-2 -right-2 hover:bg-red-600"
              >
                <FiX size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-green-500 hover:bg-green-50">
                <div className="flex flex-col items-center justify-center">
                  <FiUpload className="w-8 h-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    <span className="font-medium text-green-600">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                </div>
                <input
                  ref={fileInputRef}
                  id="image-upload"
                  name="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            </div>
          )}
          {isUploading && (
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <FiInfo className="mr-1" /> Uploading image...
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Categories
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {categories.map(category => (
              <div key={category} className="flex items-center">
                <input
                  id={`category-${category}`}
                  type="checkbox"
                  name="categories"
                  value={category}
                  checked={form.categories.includes(category)}
                  onChange={handleCategoryChange}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end pt-4 space-x-3 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Save Product
        </button>
      </div>
    </form>
  );
}