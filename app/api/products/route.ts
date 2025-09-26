import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@/types';

// Mock data for products (no database needed)
const mockProducts = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'Abstract Expression Canvas',
    description: 'A vibrant abstract painting that brings energy and modern sophistication to any space.',
    price: 299.00,
    original_price: 399.00,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=500&fit=crop',
    category: 'Canvas Painting',
    in_stock: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'Minimalist Mountain Landscape',
    description: 'A serene mountain landscape rendered in soft, muted tones.',
    price: 249.00,
    original_price: 299.00,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop',
    category: 'Fine Art Painting',
    in_stock: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    name: 'Urban Geometric Art',
    description: 'Contemporary geometric artwork inspired by city architecture.',
    price: 199.00,
    original_price: 279.00,
    discount: 29,
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&h=500&fit=crop',
    category: 'Canvas Painting',
    in_stock: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    name: 'Botanical Fine Art Study',
    description: 'Delicate botanical illustration featuring hand-painted florals.',
    price: 349.00,
    original_price: 449.00,
    discount: 22,
    image: '/simple_woman.jpg',
    category: 'Fine Art Painting',
    in_stock: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    name: 'Ocean Waves Canvas',
    description: 'Dramatic seascape capturing the power and beauty of ocean waves.',
    price: 279.00,
    original_price: 349.00,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=500&h=500&fit=crop',
    category: 'Canvas Painting',
    in_stock: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    name: 'Ethereal Dreams',
    description: 'A mystical landscape painting that captures the essence of dreams and imagination.',
    price: 389.00,
    original_price: 489.00,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop',
    category: 'Fine Art Painting',
    in_stock: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440007',
    name: 'Golden Sunset Portrait',
    description: 'An expressive portrait artwork with warm golden tones and emotional depth.',
    price: 459.00,
    original_price: 559.00,
    discount: 18,
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=500&fit=crop',
    category: 'Fine Art Painting',
    in_stock: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440008',
    name: 'Modern Floral Study',
    description: 'Contemporary botanical illustration featuring vibrant flowers in modern artistic style.',
    price: 229.00,
    original_price: 299.00,
    discount: 23,
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500&h=500&fit=crop',
    category: 'Illustration',
    in_stock: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export async function GET() {
  try {
    // Simply return mock data (no database needed)
    console.log('🎨 Using mock data for products');
    return NextResponse.json({ products: mockProducts });
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { 
      name, 
      description, 
      price, 
      originalPrice, 
      discount, 
      image, 
      category, 
      inStock 
    } = body;

    // Basic validation
    if (!name || !description || !price || !image || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: name, description, price, image, category' }, 
        { status: 400 }
      );
    }

    // Generate a simple product for response (no database save)
    const product = {
      id: `550e8400-e29b-41d4-a716-${Date.now()}`,
      name,
      description,
      price,
      original_price: originalPrice || null,
      discount: discount || 0,
      image,
      category,
      in_stock: inStock !== undefined ? inStock : true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}