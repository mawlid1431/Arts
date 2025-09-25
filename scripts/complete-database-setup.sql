-- First, create the database tables if they don't exist
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  discount INTEGER DEFAULT 0,
  image TEXT,
  category VARCHAR(100),
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  customer_address TEXT,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable read access for all users" ON products;
DROP POLICY IF EXISTS "Enable insert for all users" ON products;
DROP POLICY IF EXISTS "Enable update for all users" ON products;
DROP POLICY IF EXISTS "Enable delete for all users" ON products;

DROP POLICY IF EXISTS "Enable read access for all users" ON orders;
DROP POLICY IF EXISTS "Enable insert for all users" ON orders;
DROP POLICY IF EXISTS "Enable update for all users" ON orders;
DROP POLICY IF EXISTS "Enable delete for all users" ON orders;

DROP POLICY IF EXISTS "Enable read access for all users" ON order_items;
DROP POLICY IF EXISTS "Enable insert for all users" ON order_items;
DROP POLICY IF EXISTS "Enable update for all users" ON order_items;
DROP POLICY IF EXISTS "Enable delete for all users" ON order_items;

-- Create policies for public access to products
CREATE POLICY "Enable read access for all users" ON products FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON products FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON products FOR DELETE USING (true);

-- Create policies for orders
CREATE POLICY "Enable read access for all users" ON orders FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON orders FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON orders FOR DELETE USING (true);

-- Create policies for order_items
CREATE POLICY "Enable read access for all users" ON order_items FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON order_items FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON order_items FOR DELETE USING (true);

-- Clear any existing data
TRUNCATE TABLE order_items, orders, products CASCADE;

-- Insert the sample products you provided
INSERT INTO products (
  name, 
  description, 
  price, 
  original_price, 
  discount, 
  image, 
  category, 
  in_stock
) VALUES 
('Abstract Expression Canvas', 'A vibrant abstract painting that brings energy and modern sophistication to any space.', 299.00, 399.00, 25, 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500', 'Canvas Painting', true),
('Minimalist Mountain Landscape', 'A serene mountain landscape rendered in soft, muted tones.', 249.00, 299.00, 17, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500', 'Fine Art Painting', true),
('Urban Geometric Art', 'Contemporary geometric artwork inspired by city architecture.', 199.00, 279.00, 29, 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=500', 'Canvas Painting', true),
('Botanical Fine Art Study', 'Delicate botanical illustration featuring hand-painted florals.', 349.00, 449.00, 22, 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500', 'Fine Art Painting', true),
('Ocean Waves Canvas', 'Dramatic seascape capturing the power and beauty of ocean waves.', 279.00, 349.00, 20, 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=500', 'Canvas Painting', true),
('Desert Sunset Masterpiece', 'Capturing the breathtaking beauty of a desert landscape during golden hour.', 189.99, null, 0, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500', 'Fine Art Painting', true),
('Floral Watercolor Study', 'Delicate watercolor painting featuring seasonal flowers with soft brushstrokes.', 179.99, 219.99, 18, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500', 'Canvas Painting', true),
('Modern Portrait Series', 'Contemporary portrait artwork with bold colors and expressive techniques.', 399.99, 499.99, 20, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500', 'Fine Art Painting', true),
('Geometric Patterns Print', 'Clean geometric design with contemporary appeal, perfect for modern spaces.', 79.99, 99.99, 20, 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500', 'Canvas Painting', true),
('Vintage Landscape Collection', 'Classic landscape painting inspired by traditional techniques and natural beauty.', 299.99, null, 0, 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500', 'Fine Art Painting', true);