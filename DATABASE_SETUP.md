# Supabase Database Setup Guide

## Step 1: Create Database Tables

Copy and run this SQL in your Supabase SQL Editor:

```sql
-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    discount INTEGER DEFAULT 0,
    image TEXT,
    category VARCHAR(50) NOT NULL,
    in_stock BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50),
    shipping_address TEXT NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'pending',
    status VARCHAR(50) DEFAULT 'pending',
    subtotal DECIMAL(10,2) NOT NULL,
    shipping DECIMAL(10,2) DEFAULT 0,
    total DECIMAL(10,2) NOT NULL,
    tracking_number VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON public.products(in_stock);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON public.orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON public.order_items(product_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public access to products
CREATE POLICY "Products are viewable by everyone" 
ON public.products FOR SELECT 
USING (true);

CREATE POLICY "Products can be created by anyone" 
ON public.products FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Products can be updated by anyone" 
ON public.products FOR UPDATE 
USING (true);

CREATE POLICY "Products can be deleted by anyone" 
ON public.products FOR DELETE 
USING (true);

-- Create policies for orders
CREATE POLICY "Orders are viewable by everyone" 
ON public.orders FOR SELECT 
USING (true);

CREATE POLICY "Orders can be created by anyone" 
ON public.orders FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Orders can be updated by anyone" 
ON public.orders FOR UPDATE 
USING (true);

-- Create policies for order_items
CREATE POLICY "Order items are viewable by everyone" 
ON public.order_items FOR SELECT 
USING (true);

CREATE POLICY "Order items can be created by anyone" 
ON public.order_items FOR INSERT 
WITH CHECK (true);
```

## Step 2: Add Sample Products

Run this SQL to populate your database with sample art products:

```sql
INSERT INTO products (name, description, price, original_price, discount, image, category, in_stock) VALUES
(
  'Abstract Harmony',
  'A vibrant abstract painting featuring flowing colors and dynamic shapes that create a sense of movement and energy. Perfect for modern living spaces.',
  299.99,
  399.99,
  25,
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=800&fit=crop',
  'Painting',
  true
),
(
  'Desert Sunset',
  'Capturing the breathtaking beauty of a desert landscape during golden hour. Rich oranges and purples blend seamlessly in this stunning piece.',
  189.99,
  null,
  0,
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop',
  'Painting',
  true
),
(
  'Urban Rhythm',
  'A modern interpretation of city life through bold strokes and contemporary color palettes. This piece speaks to the energy of metropolitan living.',
  349.99,
  449.99,
  22,
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop',
  'Painting',
  true
),
(
  'Botanical Dreams Print',
  'High-quality print of an original botanical illustration featuring delicate leaves and flowers in watercolor style.',
  49.99,
  69.99,
  29,
  'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=800&fit=crop',
  'Print',
  true
),
(
  'Geometric Patterns',
  'Contemporary geometric design with clean lines and bold colors. Available as a limited edition print on premium paper.',
  79.99,
  null,
  0,
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=800&fit=crop',
  'Print',
  true
),
(
  'Mountain Vista',
  'Breathtaking landscape photography capturing the majesty of mountain peaks during sunrise. Printed on fine art paper.',
  159.99,
  199.99,
  20,
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop',
  'Photography',
  true
),
(
  'Ocean Waves',
  'Dynamic seascape photography showcasing the power and beauty of ocean waves. Perfect for coastal-themed decor.',
  129.99,
  null,
  0,
  'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=800&fit=crop',
  'Photography',
  true
),
(
  'Character Study',
  'Original illustration featuring expressive character design with intricate details and vibrant colors.',
  119.99,
  149.99,
  20,
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop',
  'Illustration',
  true
),
(
  'Digital Landscape',
  'Futuristic digital art piece exploring themes of technology and nature. Created using advanced digital painting techniques.',
  199.99,
  null,
  0,
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=800&fit=crop',
  'Digital Art',
  true
),
(
  'Cyberpunk City',
  'Neon-lit cityscape in cyberpunk style, featuring dramatic lighting and futuristic architecture.',
  249.99,
  299.99,
  17,
  'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=800&fit=crop',
  'Digital Art',
  true
),
(
  'Floral Composition',
  'Delicate watercolor painting of seasonal flowers with soft, flowing brushstrokes and natural color harmony.',
  179.99,
  null,
  0,
  'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=800&fit=crop',
  'Painting',
  true
),
(
  'Minimalist Portrait',
  'Clean, minimalist illustration focusing on essential features and elegant simplicity.',
  89.99,
  119.99,
  25,
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=800&fit=crop',
  'Illustration',
  false
);
```

## Step 3: Verify Setup

After running both SQL scripts:

1. Check the Tables tab in Supabase dashboard
2. You should see 3 tables: `products`, `orders`, `order_items`
3. The `products` table should have 12 sample artworks
4. Visit your website at http://localhost:3001 and go to the Shop page
5. You should see the real products loaded from the database

## API Endpoints Available

- `GET /api/products` - Get all products
- `GET /api/products/[id]` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)
- `GET /api/orders` - Get all orders
- `GET /api/orders/[id]` - Get single order
- `POST /api/orders` - Create new order
- `PUT /api/orders/[id]` - Update order status

## Testing the Integration

1. Visit http://localhost:3001/shop to see products loaded from database
2. Try adding items to cart
3. Go through the checkout process to create an order
4. Check the admin panel to see orders in the dashboard

Your Supabase database is now fully integrated with your Next.js application!