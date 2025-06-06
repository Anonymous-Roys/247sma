import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';

import axios from 'axios';
import { BASE_URL } from '@/shared/lib/utils';
import { FilterOptions, Pagination, SearchBar } from '@/modules/farmers/components/orders/OrderFilter';
import OrderList from '@/modules/farmers/components/orders/OrderList';
import OrderDetailsModal from '@/modules/farmers/components/orders/OrderDetailsModel';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
        setFilteredOrders(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch orders');
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredOrders.length / 5));
  }, [filteredOrders]);

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
  };

  const handleOrderAction = async (action) => {
    try {
      const token = sessionStorage.getItem('token');
      let newStatus = '';
      
      switch (action) {
        case 'process':
          newStatus = 'processing';
          break;
        case 'ship':
          newStatus = 'shipped';
          break;
        case 'deliver':
          newStatus = 'delivered';
          break;
        case 'cancel':
          newStatus = 'cancelled';
          break;
        default:
          return;
      }

      const response = await axios.put(
        `${BASE_URL}/api/orders/${selectedOrder._id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the order in state
      const updatedOrders = orders.map(order => 
        order._id === selectedOrder._id ? response.data : order
      );
      
      setOrders(updatedOrders);
      setFilteredOrders(updatedOrders);
      setSelectedOrder(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update order');
    }
  };

  const handleSearch = (searchTerm) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const searchedOrders = orders.filter(order => 
      order.orderNumber.toLowerCase().includes(lowercasedTerm) || 
      (typeof order.customerId === 'object' && 
        (order.customerId.name.toLowerCase().includes(lowercasedTerm) || 
         order.customerId.email.toLowerCase().includes(lowercasedTerm)))
    );
    setFilteredOrders(searchedOrders);
    setCurrentPage(1);
  };

  const handleFilter = (filters) => {
    const { status, startDate, endDate } = filters;

    const filtered = orders.filter(order => {
      const matchesStatus = status ? order.status === status : true;
      const orderDate = new Date(order.createdAt);
      const matchesStartDate = startDate ? orderDate >= new Date(startDate) : true;
      const matchesEndDate = endDate ? orderDate <= new Date(endDate) : true;
      
      return matchesStatus && matchesStartDate && matchesEndDate;
    });

    setFilteredOrders(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-100 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Order Management Dashboard</CardTitle>
          <CardDescription>
            View and manage all orders from your customers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col justify-between mb-4">
            <SearchBar onSearch={handleSearch} />
            <FilterOptions onFilter={handleFilter} />
          </div>
          <OrderList 
            orders={filteredOrders.slice((currentPage - 1) * 5, currentPage * 5)} 
            onOrderSelect={handleOrderSelect} 
          />
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </CardContent>
      </Card>

      {selectedOrder && (
        <OrderDetailsModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
          onAction={handleOrderAction} 
        />
      )}
    </div>
  );
};

export default Orders;