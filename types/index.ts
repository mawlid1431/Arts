// Data Models for Nujuum Arts

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  discount?: number;
  image: string;
  category: 'Painting' | 'Print' | 'Illustration' | 'Photography' | 'Digital Art';
  in_stock: boolean;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  products?: {
    id: string;
    name: string;
    image: string;
    category?: string;
  };
}

export interface Customer {
  name: string;
  email: string;
  phone?: string;
  address: string;
}

export interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    postcode: string;
    country: string;
  };
}

export interface Order {
  id: string;
  orderId?: string; // Legacy field for admin interface
  user_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  shipping_address: string;
  payment_method: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'reviewing' | 'accepted' | 'fulfilled' | 'rejected';
  subtotal: number;
  shipping: number;
  total: number;
  tracking_number?: string;
  created_at: string;
  createdAt?: string; // Legacy field for admin interface
  updated_at: string;
  order_items?: OrderItem[];
  items?: OrderItem[]; // Legacy field for admin interface
  customer?: { // Legacy nested customer object for admin interface
    name: string;
    email: string;
    phone?: string;
    address: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'customer';
}

export interface DashboardStats {
  totalProducts: number;
  pendingOrders: number;
  fulfilledOrders: number;
  totalRevenue: number;
}