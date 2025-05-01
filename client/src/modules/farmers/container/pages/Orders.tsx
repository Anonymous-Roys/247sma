
import{ useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { SearchBar, FilterOptions, Pagination } from '../../components/orders/OrderFilter';
import OrderList from '../../components/orders/OrderList';
import { OrderDetailsModal } from '../../components/orders/OrderDetailsModel';
import { ordersArray } from '../../components/orders/orderArray';




const Orders = () => {
  const [orders, setOrders] = useState(ordersArray);
  useEffect(()=>{
    setOrders(orders);
  },[])

  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(orders.length / 5));

  const handleOrderSelect = (order:any) => {
    setSelectedOrder(order);
  };

  const handleOrderAction = (order:any, action:any) => {
    console.log(`Performing action "${action}" on order ${order.id}`);
  };

  const handleSearch = (searchTerm:any) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const searchedOrders = orders.filter(order => 
      order.customer.toLowerCase().includes(lowercasedTerm) || 
      order.productName.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredOrders(searchedOrders);
    setTotalPages(Math.ceil(searchedOrders.length / 5)); // Update total pages based on search results
    setCurrentPage(1); // Reset to the first page after search
  };

  const handleFilter = (filters:any) => {
    const { status, startDate, endDate, category } = filters;

    const filtered = orders.filter(order => {
      const matchesStatus = status ? order.status === status : true;
      const matchesCategory = category ? order.productCategory === category : true;
      const orderDate = new Date(order.orderDate);
      const matchesStartDate = startDate ? orderDate >= new Date(startDate) : true;
      const matchesEndDate = endDate ? orderDate <= new Date(endDate) : true;
      
      return matchesStatus && matchesCategory && matchesStartDate && matchesEndDate;
    });

    setFilteredOrders(filtered);
    setTotalPages(Math.ceil(filtered.length / 5)); // Update total pages based on filter results
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const handlePageChange = (page:any) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setTotalPages(Math.ceil(filteredOrders.length / 5));
  });

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
          <OrderList orders={filteredOrders.slice((currentPage - 1) * 5, currentPage * 5)} onOrderSelect={handleOrderSelect} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </CardContent>
      </Card>

      {selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} onAction={handleOrderAction} />
      )}
    </div>
  );
};



export default Orders;

