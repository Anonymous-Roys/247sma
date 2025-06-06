// types/product.ts
import { User } from './user';

export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
  isPrimary?: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  comparedAtPrice?: number;
  sku: string;
  weight: number;
  weightUnit: 'kg' | 'g' | 'lb' | 'oz';
  stock: number;
  isAvailable?: boolean;
}

export type ProductCategory = 
  | 'fruits' | 'vegetables' | 'grains' | 'dairy' | 'meat'
  | 'poultry' | 'herbs' | 'spices' | 'seeds' | 'roots'
  | 'greens' | 'other';

export type ProductStatus = 
  | 'draft' | 'active' | 'out_of_stock' | 'deleted' | 'inactive';

export interface Product {
  _id: string;
  farmerId: string | User; // Reference to User type
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  categories?: ProductCategory[];
  images: ProductImage[];
  variants: ProductVariant[];
  harvestDate?: Date;
  bestBefore?: Date;
  certifications?: string[];
  isOrganic?: boolean;
  status?: ProductStatus;
  averageRating?: number;
  reviewCount?: number;
  featured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

