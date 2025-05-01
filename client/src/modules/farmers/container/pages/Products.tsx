import { useState } from 'react';
import { Search, PlusCircle, Edit } from 'lucide-react';

export default function Products() {
  // Sample product data
  const initialProducts = [
    {
      id: "#1122",
      name: "Maize",
      status: "In stock",
      dateHarvested: "9/15/2023",
      totalHarvested: 300,
      totalSold: 40,
      unitPrice: 3.00,
      bulkPrice: 120.00,
      amountLeft: 260,
      image: "/corn.png"
    },
    {
      id: "#1122",
      name: "Maize",
      status: "In stock",
      dateHarvested: "9/15/2023",
      totalHarvested: 300,
      totalSold: 40,
      unitPrice: 3.00,
      bulkPrice: 120.00,
      amountLeft: 260,
      image: "/corn.png"
    },
    {
      id: "#1122",
      name: "Potato",
      status: "Out of stock",
      dateHarvested: "9/15/2023",
      totalHarvested: 600,
      totalSold: 600,
      unitPrice: 4.00,
      bulkPrice: 160.00,
      amountLeft: 0,
      image: "/potato.png"
    },
    {
      id: "#1122",
      name: "Maize",
      status: "In stock",
      dateHarvested: "9/15/2023",
      totalHarvested: 300,
      totalSold: 40,
      unitPrice: 3.00,
      bulkPrice: 120.00,
      amountLeft: 260,
      image: "/corn.png"
    },
    {
      id: "#1122",
      name: "Maize",
      status: "In stock",
      dateHarvested: "9/15/2023",
      totalHarvested: 300,
      totalSold: 40,
      unitPrice: 3.00,
      bulkPrice: 120.00,
      amountLeft: 260,
      image: "/corn.png"
    },
    {
      id: "#1122",
      name: "Potato",
      status: "Out of stock",
      dateHarvested: "9/15/2023",
      totalHarvested: 600,
      totalSold: 600,
      unitPrice: 4.00,
      bulkPrice: 160.00,
      amountLeft: 0,
      image: "/potato.png"
    },
    {
      id: "#1122",
      name: "Maize",
      status: "In stock",
      dateHarvested: "9/15/2023",
      totalHarvested: 300,
      totalSold: 40,
      unitPrice: 3.00,
      bulkPrice: 120.00,
      amountLeft: 260,
      image: "/corn.png"
    },
    {
      id: "#1122",
      name: "Potato",
      status: "Out of stock",
      dateHarvested: "9/15/2023",
      totalHarvested: 600,
      totalSold: 600,
      unitPrice: 4.00,
      bulkPrice: 160.00,
      amountLeft: 0,
      image: "/potato.png"
    },
    {
      id: "#1122",
      name: "Maize",
      status: "In stock",
      dateHarvested: "9/15/2023",
      totalHarvested: 300,
      totalSold: 40,
      unitPrice: 3.00,
      bulkPrice: 120.00,
      amountLeft: 260,
      image: "/corn.png"
    },
    {
      id: "#1122",
      name: "Potato",
      status: "Out of stock",
      dateHarvested: "9/15/2023",
      totalHarvested: 600,
      totalSold: 600,
      unitPrice: 4.00,
      bulkPrice: 160.00,
      amountLeft: 0,
      image: "/potato.png"
    }
  ];

  // State
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    status: "In stock",
    dateHarvested: "",
    totalHarvested: 0,
    totalSold: 0,
    unitPrice: 0,
    bulkPrice: 0,
    amountLeft: 0,
    image: "/api/placeholder/60/60"
  });

  // Filter products by search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle checkbox selection
  const toggleSelectProduct = (productId:any) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  // Handle select all
  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((product) => product.id));
    }
  };

  // Handle form input changes
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: name === 'totalHarvested' || name === 'totalSold' || name === 'unitPrice' || name === 'bulkPrice' 
        ? parseFloat(value) 
        : value
    });
  };

  // Calculate amount left
  const calculateAmountLeft = () => {
    return newProduct.totalHarvested - newProduct.totalSold;
  };

  // Handle form submission
  const handleSubmit = (e:any) => {
    e.preventDefault();
    
    const productToAdd = {
      ...newProduct,
      amountLeft: calculateAmountLeft()
    };
    
    setProducts([...products, productToAdd]);
    setShowAddForm(false);
    setNewProduct({
      id: "",
      name: "",
      status: "In stock",
      dateHarvested: "",
      totalHarvested: 0,
      totalSold: 0,
      unitPrice: 0,
      bulkPrice: 0,
      amountLeft: 0,
      image: "/api/placeholder/60/60"
    });
  };

  return (
    <div className="flex flex-col min-h-screen p-4 bg-white">
      {/* Search and Add Product Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search For Product"
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          className="flex items-center px-1 py-2 ml-4 text-white bg-green-700 rounded-md"
          onClick={() => setShowAddForm(true)}
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Product
        </button>
      </div>

      {/* Add Product Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Add New Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block mb-1 text-xs font-medium text-gray-700">Product ID</label>
                  <input
                    type="text"
                    name="id"
                    value={newProduct.id}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-xs font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-xs font-medium text-gray-700">Status</label>
                  <select
                    name="status"
                    value={newProduct.status}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="In stock">In stock</option>
                    <option value="Out of stock">Out of stock</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-xs font-medium text-gray-700">Date Harvested</label>
                  <input
                    type="date"
                    name="dateHarvested"
                    value={newProduct.dateHarvested}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-xs font-medium text-gray-700">Total Harvested</label>
                  <input
                    type="number"
                    name="totalHarvested"
                    value={newProduct.totalHarvested}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-xs font-medium text-gray-700">Total Sold</label>
                  <input
                    type="number"
                    name="totalSold"
                    value={newProduct.totalSold}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-xs font-medium text-gray-700">Unit Price (¢)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="unitPrice"
                    value={newProduct.unitPrice}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-xs font-medium text-gray-700">Bulk Price (¢)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="bulkPrice"
                    value={newProduct.bulkPrice}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-1 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-1 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all"
                    type="checkbox"
                    className="w-4 h-4 border-gray-300 rounded accent-green-600"
                    checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                    onChange={toggleSelectAll}
                  />
                </div>
              </th>
              <th scope="col" className="px-1 py-3 text-sm font-medium text-left text-gray-500">
                Product ID
              </th>
              <th scope="col" className="px-1 py-3 text-sm font-medium text-left text-gray-500">
                Name
              </th>
              <th scope="col" className="px-1 py-3 text-sm font-medium text-left text-gray-500">
                Status
              </th>
              <th scope="col" className="px-1 py-3 text-sm font-medium text-left text-gray-500">
                Date Harvested
              </th>
              <th scope="col" className="px-1 py-3 text-sm font-medium text-left text-gray-500">
                Total Harvested
              </th>
              <th scope="col" className="px-1 py-3 text-sm font-medium text-left text-gray-500">
                Total Sold
              </th>
              <th scope="col" className="px-1 py-3 text-sm font-medium text-left text-gray-500">
                Unit Price
              </th>
              <th scope="col" className="px-1 py-3 text-sm font-medium text-left text-gray-500">
                Bulk Price
              </th>
              <th scope="col" className="px-1 py-3 text-sm font-medium text-left text-gray-500">
                Amount left
              </th>
              <th scope="col" className="px-1 py-3 text-sm font-medium text-right text-gray-500">
                Edit
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="p-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border-gray-300 rounded accent-green-600"
                      checked={selectedProducts.includes(product.id)}

                      onChange={() => toggleSelectProduct(index)}
                    />
                  </div>
                </td>
                <td className="px-1 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">
                  {product.id}
                </td>
                <td className="px-1 py-4 text-xs text-gray-900 whitespace-nowrap">
                  {product.name}
                </td>
                <td className="px-1 py-4 text-xs whitespace-nowrap">
                  <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${
                    product.status === 'In stock' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-1 py-4 text-xs text-gray-900 whitespace-nowrap">
                  {product.dateHarvested}
                </td>
                <td className="px-1 py-4 text-xs text-gray-900 whitespace-nowrap">
                  {product.totalHarvested}
                </td>
                <td className="px-1 py-4 text-xs text-gray-900 whitespace-nowrap">
                  {product.totalSold}
                </td>
                <td className="px-1 py-4 text-xs text-gray-900 whitespace-nowrap">
                  ¢ {product.unitPrice.toFixed(2)}
                </td>
                <td className="px-1 py-4 text-xs text-gray-900 whitespace-nowrap">
                  ¢ {product.bulkPrice.toFixed(2)}
                </td>
                <td className="px-1 py-4 text-xs text-gray-900 whitespace-nowrap">
                  {product.amountLeft}
                </td>
                <td className="px-1 py-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-between">
                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded-md" />
                    <button className="text-green-600 hover:text-green-900">
                      <Edit size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}