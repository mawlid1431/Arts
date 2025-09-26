import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { Product } from '@/types';

// Fallback mock data (in case database is empty)
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
  }
];

export async function GET() {
  try {
    // Try to connect to Supabase database
    const supabase = await createClient();

    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && products && products.length > 0) {
      console.log('✅ Successfully loaded products from Supabase:', products.length);
      return NextResponse.json({ products });
    }

    // If no products in database or error, use mock data
    if (error) {
      console.warn('⚠️ Supabase error, using mock data:', error.message);
    } else {
      console.warn('⚠️ No products in database yet, using mock data');
    }

    console.log('🎨 Using mock data for products');
    return NextResponse.json({ products: mockProducts });

  } catch (error) {
    console.error('❌ Unexpected error:', error);
    // Fallback to mock data on any error
    return NextResponse.json({ products: mockProducts });
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