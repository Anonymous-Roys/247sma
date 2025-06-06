import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';

import { format } from 'date-fns';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Order } from '@/shared/types/order';

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
  onAction: (action: string) => void;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  refunded: 'bg-gray-100 text-gray-800',
};

const paymentStatusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  refunded: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function OrderDetailsModal({ order, onClose, onAction }: OrderDetailsModalProps) {
  return (
    <Dialog open={!!order} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Order Details - {order.orderNumber}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Order Summary */}
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-gray-50">
              <h3 className="mb-3 text-lg font-medium">Order Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="font-medium">
                    {format(new Date(order.createdAt), 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Badge className={`${statusColors[order.status]} capitalize`}>
                    {order.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Subtotal</p>
                  <p className="font-medium">₵{order.subtotal.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Shipping</p>
                  <p className="font-medium">₵{order.shipping.cost.toFixed(2)}</p>
                </div>
                {order.discount?.amount && (
                  <>
                    <div>
                      <p className="text-sm text-gray-500">Discount</p>
                      <p className="font-medium text-red-600">
                        -₵{order.discount.amount.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Discount Code</p>
                      <p className="font-medium">{order.discount.code}</p>
                    </div>
                  </>
                )}
                <div className="col-span-2 pt-2 border-t">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-lg font-medium">₵{order.total.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="p-4 rounded-lg bg-gray-50">
              <h3 className="mb-3 text-lg font-medium">Customer Information</h3>
              <div className="space-y-2">
                <p className="font-medium">{order.customerId?.name || 'N/A'}</p>
                <p className="text-sm text-gray-600">{order.customerId?.email || 'N/A'}</p>
                <p className="text-sm text-gray-600">{order.customerId?.phone || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Shipping & Payment */}
          <div className="space-y-4">
            {/* Shipping Information */}
            <div className="p-4 rounded-lg bg-gray-50">
              <h3 className="mb-3 text-lg font-medium">Shipping Information</h3>
              <div className="space-y-2">
                <p className="font-medium">{order.shipping.method}</p>
                <p className="text-sm">
                  {order.shipping.address.street}, {order.shipping.address.city}
                </p>
                <p className="text-sm">
                  {order.shipping.address.state}, {order.shipping.address.country}
                </p>
                <p className="text-sm">Postal Code: {order.shipping.address.postalCode}</p>
                {order.shipping.estimatedDelivery && (
                  <p className="text-sm">
                    Estimated Delivery: {format(new Date(order.shipping.estimatedDelivery), 'MMM dd, yyyy')}
                  </p>
                )}
                {order.shipping.trackingNumber && (
                  <p className="text-sm">
                    Tracking #: {order.shipping.trackingNumber}
                  </p>
                )}
              </div>
            </div>

            {/* Payment Information */}
            <div className="p-4 rounded-lg bg-gray-50">
              <h3 className="mb-3 text-lg font-medium">Payment Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Method</p>
                  <p className="font-medium capitalize">{order.payment.method}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Badge className={`${paymentStatusColors[order.payment.status]} capitalize`}>
                    {order.payment.status}
                  </Badge>
                </div>
                {order.payment.transactionId && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Transaction ID</p>
                    <p className="text-sm font-medium">{order.payment.transactionId}</p>
                  </div>
                )}
                {order.payment.paidAt && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Paid At</p>
                    <p className="font-medium">
                      {format(new Date(order.payment.paidAt), 'MMM dd, yyyy HH:mm')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mt-6">
          <h3 className="mb-3 text-lg font-medium">Order Items</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Product
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Variant
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Qty
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Total
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Weight
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {item.productName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {item.variantName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      ₵{item.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      ₵{item.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {item.weight} {item.weightUnit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Notes */}
        {order.notes && (
          <div className="p-4 mt-6 rounded-lg bg-gray-50">
            <h3 className="mb-2 text-lg font-medium">Order Notes</h3>
            <p className="text-sm text-gray-600">{order.notes}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end mt-6 space-x-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {order.status === 'pending' && (
            <>
              <Button variant="default" onClick={() => onAction('process')}>
                Process Order
              </Button>
              <Button variant="destructive" onClick={() => onAction('cancel')}>
                Cancel Order
              </Button>
            </>
          )}
          {order.status === 'processing' && (
            <>
              <Button variant="default" onClick={() => onAction('ship')}>
                Mark as Shipped
              </Button>
              <Button variant="destructive" onClick={() => onAction('cancel')}>
                Cancel Order
              </Button>
            </>
          )}
          {order.status === 'shipped' && (
            <Button variant="default" onClick={() => onAction('deliver')}>
              Mark as Delivered
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}