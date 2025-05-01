import Jollof from '@/shared/assets/farmers_assets/Jollof-rice.png'
import { Order } from '@/shared/types/types'



export const ordersArray:Order[] =[
    {
      id: 'ORDER001',
      customer: 'j***n@example.com', // Masked email
      productName: 'Yam', // Example product name
      unitPrice: 50.2,
      quantity: 5,
      productCategory: 'Vegetables',
      productDescription: 'Fresh yams from local farms',
      total: 250.99,
      productImages: [
        'Jollof', // Ensure you replace with actual image paths
        'Jollof'
      ],
      orderDate: '2023-04-15',
      status: 'pending'
    },
    {
      id: 'ORDER002',
      customer: 'j***e@example.com',
      productName: 'Rice',
      unitPrice: 30.75,
      quantity: 6,
      productCategory: 'Grains',
      productDescription: 'Premium long-grain rice',
      total: 184.5,
      productImages: [
        Jollof
      ],
      orderDate: '2023-04-12',
      status: 'shipped'
    },
    {
      id: 'ORDER003',
      customer: 'b**@example.com',
      productName: 'Potatoes',
      unitPrice: 20.3,
      quantity: 10,
      productCategory: 'Vegetables',
      productDescription: 'Organic potatoes',
      total: 203.0,
      productImages: [
        'potato1.jpg',
        'potato2.jpg'
      ],
      orderDate: '2023-04-10',
      status: 'delivered'
    },
    {
      id: 'ORDER001',
      customer: 'j***n@example.com', // Masked email
      productName: 'Yam', // Example product name
      unitPrice: 50.2,
      quantity: 5,
      productCategory: 'Vegetables',
      productDescription: 'Fresh yams from local farms',
      total: 250.99,
      productImages: [
        'Jollof', // Ensure you replace with actual image paths
        'Jollof'
      ],
      orderDate: '2023-04-15',
      status: 'pending'
    },
    {
      id: 'ORDER002',
      customer: 'j***e@example.com',
      productName: 'Rice',
      unitPrice: 30.75,
      quantity: 6,
      productCategory: 'Grains',
      productDescription: 'Premium long-grain rice',
      total: 184.5,
      productImages: [
        'rice1.jpg'
      ],
      orderDate: '2023-04-12',
      status: 'shipped'
    },
    {
      id: 'ORDER003',
      customer: 'b**@example.com',
      productName: 'Potatoes',
      unitPrice: 20.3,
      quantity: 10,
      productCategory: 'Vegetables',
      productDescription: 'Organic potatoes',
      total: 203.0,
      productImages: [
        'potato1.jpg',
        'potato2.jpg'
      ],
      orderDate: '2023-04-10',
      status: 'delivered'
    },
   
  ]

  
 