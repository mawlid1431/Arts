// Data Models for Nujuum Arts

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  type: 'Painting' | 'Print' | 'Illustration' | 'Photography' | 'Digital Art';
  stock: number;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  qty: number;
  image: string;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    postcode: string;
    country: string;
  };
}

export interface Order {
  orderId: string;
  status: 'reviewing' | 'accepted' | 'rejected' | 'fulfilled';
  items: OrderItem[];
  customer: Customer;
  subtotal: number;
  total: number;
  createdAt: string;
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