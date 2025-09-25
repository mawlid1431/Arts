import { Product, Order, DashboardStats } from '../types';

// Mock Products Data
export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Ethereal Landscape',
    slug: 'ethereal-landscape',
    description: 'A breathtaking landscape painting that captures the essence of tranquility and natural beauty. Perfect for creating a calming atmosphere in any living space.',
    price: 299,
    images: [
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
    ],
    type: 'Painting',
    stock: 5,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Urban Dreams',
    slug: 'urban-dreams',
    description: 'A vibrant cityscape illustration that captures the energy and dynamism of modern urban life. Ideal for contemporary spaces.',
    price: 189,
    images: [
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=800&h=600&fit=crop'
    ],
    type: 'Illustration',
    stock: 8,
    createdAt: '2024-01-16T14:30:00Z'
  },
  {
    id: '3',
    title: 'Abstract Emotions',
    slug: 'abstract-emotions',
    description: 'An expressive abstract piece that evokes deep emotions through bold colors and dynamic forms. A statement piece for any art lover.',
    price: 450,
    images: [
      'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop'
    ],
    type: 'Painting',
    stock: 3,
    createdAt: '2024-01-17T09:15:00Z'
  },
  {
    id: '4',
    title: 'Minimalist Geometry',
    slug: 'minimalist-geometry',
    description: 'A clean, geometric composition that embodies minimalist design principles. Perfect for modern and contemporary interiors.',
    price: 225,
    images: [
      'https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
    ],
    type: 'Print',
    stock: 12,
    createdAt: '2024-01-18T16:45:00Z'
  },
  {
    id: '5',
    title: 'Nature\'s Symphony',
    slug: 'natures-symphony',
    description: 'A stunning nature photograph that captures the harmony and beauty of the natural world in exquisite detail.',
    price: 175,
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop'
    ],
    type: 'Photography',
    stock: 7,
    createdAt: '2024-01-19T11:20:00Z'
  },
  {
    id: '6',
    title: 'Digital Horizons',
    slug: 'digital-horizons',
    description: 'A futuristic digital art piece that explores the intersection of technology and creativity. Ideal for tech-savvy art enthusiasts.',
    price: 320,
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1636622433525-127afdf3662d?w=800&h=600&fit=crop'
    ],
    type: 'Digital Art',
    stock: 6,
    createdAt: '2024-01-20T13:10:00Z'
  }
];

// Mock Orders Data
export const mockOrders: Order[] = [
  {
    orderId: 'ORD-2024-001',
    status: 'reviewing',
    items: [
      {
        productId: '1',
        title: 'Ethereal Landscape',
        price: 299,
        qty: 1,
        image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop'
      }
    ],
    customer: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1-555-0123',
      address: {
        line1: '123 Main Street',
        line2: 'Apt 4B',
        city: 'New York',
        postcode: '10001',
        country: 'United States'
      }
    },
    subtotal: 299,
    total: 299,
    createdAt: '2024-01-21T09:30:00Z'
  },
  {
    orderId: 'ORD-2024-002',
    status: 'accepted',
    items: [
      {
        productId: '2',
        title: 'Urban Dreams',
        price: 189,
        qty: 2,
        image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop'
      },
      {
        productId: '4',
        title: 'Minimalist Geometry',
        price: 225,
        qty: 1,
        image: 'https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?w=800&h=600&fit=crop'
      }
    ],
    customer: {
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1-555-0456',
      address: {
        line1: '456 Oak Avenue',
        city: 'Los Angeles',
        postcode: '90210',
        country: 'United States'
      }
    },
    subtotal: 603,
    total: 603,
    createdAt: '2024-01-20T14:15:00Z'
  },
  {
    orderId: 'ORD-2024-003',
    status: 'fulfilled',
    items: [
      {
        productId: '3',
        title: 'Abstract Emotions',
        price: 450,
        qty: 1,
        image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&h=600&fit=crop'
      }
    ],
    customer: {
      name: 'Emma Rodriguez',
      email: 'emma.rodriguez@email.com',
      phone: '+1-555-0789',
      address: {
        line1: '789 Pine Street',
        city: 'Chicago',
        postcode: '60601',
        country: 'United States'
      }
    },
    subtotal: 450,
    total: 450,
    createdAt: '2024-01-19T16:20:00Z'
  }
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalProducts: mockProducts.length,
  pendingOrders: mockOrders.filter(order => order.status === 'reviewing').length,
  fulfilledOrders: mockOrders.filter(order => order.status === 'fulfilled').length,
  totalRevenue: mockOrders
    .filter(order => order.status === 'fulfilled')
    .reduce((total, order) => total + order.total, 0)
};