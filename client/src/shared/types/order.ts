import { User } from './user';
import { Product } from './product';

export interface OrderItem {
  productId: string | Product;
  productName: string;
  variantId: string;
  variantName: string;
  quantity: number;
  price: number;
  total: number;
  weight: number;
  weightUnit: 'kg' | 'g' | 'lb' | 'oz';
  farmerId: string | User;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface ShippingInfo {
  address: ShippingAddress;
  method: string;
  cost: number;
  estimatedDelivery?: Date;
  trackingNumber?: string;
  transitPartnerId?: string;
}

export interface PaymentInfo {
  method: string;
  transactionId?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'cancelled';
  paidAt?: Date;
  total: number;
}

export interface Discount {
  code?: string;
  amount?: number;
}

export interface Order {
  _id: string;
  customer: User | string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: ShippingInfo;
  payment: PaymentInfo;
  discount?: Discount;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  notes?: string;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}