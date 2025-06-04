import { useState } from "react";

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

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked; // Type assertion for checkbox
    
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
    // Reset form after submission
    setForm({
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
    });
  };

  const categories = [
    'fruits', 'vegetables', 'grains', 'dairy', 'meat',
    'poultry', 'herbs', 'spices', 'seeds', 'roots',
    'greens', 'other'
  ];


  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="p-2 border rounded" required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="col-span-2 p-2 border rounded" required />

      <select name="status" value={form.status} onChange={handleChange} className="p-2 border rounded">
        <option value="active">In stock</option>
        <option value="out_of_stock">Out of stock</option>
      </select>

      <input name="harvestDate" type="date" value={form.harvestDate} onChange={handleChange} className="p-2 border rounded" required />
      <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" className="p-2 border rounded" required />
      <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock" className="p-2 border rounded" required />
      <input name="weight" type="number" value={form.weight} onChange={handleChange} placeholder="Weight" className="p-2 border rounded" required />

      <select name="weightUnit" value={form.weightUnit} onChange={handleChange} className="p-2 border rounded">
        <option value="kg">kg</option>
        <option value="g">g</option>
        <option value="lb">lb</option>
        <option value="oz">oz</option>
      </select>

      <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} className="p-2 border rounded" />

      <div className="col-span-2">
        <label className="flex items-center space-x-2">
          <input type="checkbox" name="isOrganic" checked={form.isOrganic} onChange={handleChange} className="p-2 border rounded" />
          <span>Organic Product</span>
        </label>
      </div>

      <div className="col-span-2">
        <h3 className="mb-2 font-medium">Categories</h3>
        <div className="grid grid-cols-3 gap-2">
          {categories.map(category => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="categories"
                value={category}
                checked={form.categories.includes(category)}
                onChange={handleCategoryChange}
                className="p-2 border rounded"
              />
              <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end col-span-2 gap-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">Cancel</button>
        <button type="submit" className="px-4 py-2 text-white bg-green-600 rounded">Save</button>
      </div>
    </form>
  );
}