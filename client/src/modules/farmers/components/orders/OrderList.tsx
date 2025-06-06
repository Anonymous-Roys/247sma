
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { format } from 'date-fns';
import { Order } from '@/shared/types/order';

interface OrderListProps {
  orders: Order[];
  onOrderSelect: (order: Order) => void;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  refunded: 'bg-gray-100 text-gray-800',
};

export default function OrderList({ orders, onOrderSelect }: OrderListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Order #
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Customer
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Items
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Total
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Status
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Date
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                {order.orderNumber}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {order.customerId?.name || 'N/A'}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {order.items.length} items
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                ₵{order.total.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge className={`${statusColors[order.status]} text-xs`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {format(new Date(order.createdAt), 'MMM dd, yyyy')}
              </td>
              <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOrderSelect(order)}
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}