import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { Product } from '@/types';

// Temporary mock data for testing - will switch to Supabase once API key is fixed
const mockProducts = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
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
    id: '4',
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
    id: '5',
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
    id: '6',
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
    id: '7',
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
    id: '8',
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
    // Try Supabase first (production-ready approach)
    try {
      const supabase = await createClient();

      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && products && products.length > 0) {
        console.log('✅ Successfully loaded products from Supabase:', products.length);
        return NextResponse.json({ products });
      }

      // If error or no data, log it and fall back to mock data
      if (error) {
        console.warn('⚠️ Supabase error, falling back to mock data:', error.message);
      } else {
        console.warn('⚠️ No products found in Supabase, using mock data');
      }
    } catch (supabaseError) {
      console.warn('⚠️ Supabase connection failed, using mock data:', supabaseError);
    }

    // Fallback to mock data for development/testing
    console.log('🎨 Using mock data for products');
    return NextResponse.json({ products: mockProducts });

  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
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

    const { data: product, error } = await supabase
      .from('products')
      .insert([{
        name,
        description,
        price,
        original_price: originalPrice || null,
        discount: discount || 0,
        image,
        category,
        in_stock: inStock !== undefined ? inStock : true,
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating product:', error);
      return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}