import { Button } from '@/shared/components/ui/button';
import { Order } from '@/shared/types/types';

interface OrderListProps {
  orders: Order[];
  onOrderSelect: (order: any) => void;
}


const OrderList: React.FC<OrderListProps> = ({ orders, onOrderSelect }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-b border-collapse">
        <thead>
          <tr>
            <th className="p-2 text-left border-b">Order ID</th>
            <th className="p-2 text-left border-b">Customer</th>
            <th className="p-2 text-left border-b">Status</th>
            <th className="p-2 text-left border-b">Total</th>
            <th className="p-2 text-left border-b">Date</th>
            <th className="p-2 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="cursor-pointer hover:bg-gray-100" onClick={() => onOrderSelect(order)}>
              <td className="p-2 border-b">{order.id}</td>
              <td className="p-2 border-b">{`${order.customer.slice(0, 2)}***@example.com`}</td>
              <td className="p-2 border-b">{order.status}</td>
              <td className="p-2 border-b">${order.total.toFixed(2)}</td>
              <td className="p-2 border-b">{order.orderDate}</td>
              <td className="p-2 border-b">
                <Button variant="secondary" size="sm">View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default OrderList