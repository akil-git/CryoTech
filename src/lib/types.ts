export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  categoryId: string;
  subCategoryId?: string;
  price: number;
  discountPrice?: number;
  discountPercentage?: number;
  images: string[];
  inStock: boolean;
  stockQuantity: number;
  isOnSale: boolean;
  isFeatured: boolean;
  isNew: boolean;
  variants?: ProductVariant[];
  specifications: { [key: string]: string };
  rating: number;
  reviewCount: number;
  sku: string;
}

export interface ProductVariant {
  type: string; // e.g., "Color", "Storage", "Size"
  options: VariantOption[];
}

export interface VariantOption {
  name: string;
  priceModifier?: number;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  subCategories?: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedVariant?: { [key: string]: string };
  maxStock: number;
}

export interface WishlistItem {
  productId: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  inStock: boolean;
}

export interface CompareItem {
  productId: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  specifications: { [key: string]: string };
  rating: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  addresses?: Address[];
  orders?: Order[];
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
}
