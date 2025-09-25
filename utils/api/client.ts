import { Product, Order } from '@/types';

const API_BASE = '/api';

// Products API
export const productsApi = {
  // Get all products
  getAll: async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data.products;
  },

  // Get product by ID
  getById: async (id: string): Promise<Product> => {
    const response = await fetch(`${API_BASE}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    const data = await response.json();
    return data.product;
  },

  // Create new product (admin only)
  create: async (product: Omit<Product, 'id'>): Promise<Product> => {
    const response = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    const data = await response.json();
    return data.product;
  },

  // Update product (admin only)
  update: async (id: string, product: Partial<Product>): Promise<Product> => {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    const data = await response.json();
    return data.product;
  },

  // Delete product (admin only)
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
  },
};

// Orders API
export const ordersApi = {
  // Get all orders or orders by user
  getAll: async (userId?: string): Promise<Order[]> => {
    const url = userId ? `${API_BASE}/orders?user_id=${userId}` : `${API_BASE}/orders`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    const data = await response.json();
    return data.orders;
  },

  // Get order by ID
  getById: async (id: string): Promise<Order> => {
    const response = await fetch(`${API_BASE}/orders/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }
    const data = await response.json();
    return data.order;
  },

  // Create new order
  create: async (orderData: {
    userId?: string;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    shippingAddress: string;
    paymentMethod?: string;
    items: Array<{
      productId: string;
      quantity: number;
      price: number;
    }>;
    subtotal: number;
    shipping: number;
    total: number;
  }): Promise<Order> => {
    const response = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      throw new Error('Failed to create order');
    }
    const data = await response.json();
    return data.order;
  },

  // Update order status (admin only)
  updateStatus: async (id: string, updates: {
    status?: string;
    paymentMethod?: string;
    trackingNumber?: string;
  }): Promise<Order> => {
    const response = await fetch(`${API_BASE}/orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error('Failed to update order');
    }
    const data = await response.json();
    return data.order;
  },
};

// Helper function to handle API errors
export const handleApiError = (error: any): string => {
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};