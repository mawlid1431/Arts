-- Nujuum Arts - Production Database Setup
-- Insert the 8 art products currently used in the app

-- Clear existing products (if any)
TRUNCATE TABLE products RESTART IDENTITY CASCADE;

-- Insert the current 8 art products
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
-- Product 1: Abstract Expression Canvas
(
    'Abstract Expression Canvas',
    'A vibrant abstract painting that brings energy and modern sophistication to any space.',
    299.00,
    399.00,
    25,
    'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=500&fit=crop',
    'Canvas Painting',
    true
),

-- Product 2: Minimalist Mountain Landscape  
(
    'Minimalist Mountain Landscape',
    'A serene mountain landscape rendered in soft, muted tones.',
    249.00,
    299.00,
    17,
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop',
    'Fine Art Painting',
    true
),

-- Product 3: Urban Geometric Art (Fixed Image)
(
    'Urban Geometric Art',
    'Contemporary geometric artwork inspired by city architecture.',
    199.00,
    279.00,
    29,
    'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&h=500&fit=crop',
    'Canvas Painting',
    true
),

-- Product 4: Botanical Fine Art Study
(
    'Botanical Fine Art Study',
    'Delicate botanical illustration featuring hand-painted florals.',
    349.00,
    449.00,
    22,
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=500&fit=crop',
    'Fine Art Painting',
    true
),

-- Product 5: Ocean Waves Canvas
(
    'Ocean Waves Canvas',
    'Dramatic seascape capturing the power and beauty of ocean waves.',
    279.00,
    349.00,
    20,
    'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=500&h=500&fit=crop',
    'Canvas Painting',
    true
),

-- Product 6: Ethereal Dreams
(
    'Ethereal Dreams',
    'A mystical landscape painting that captures the essence of dreams and imagination.',
    389.00,
    489.00,
    20,
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop',
    'Fine Art Painting',
    true
),

-- Product 7: Golden Sunset Portrait
(
    'Golden Sunset Portrait',
    'An expressive portrait artwork with warm golden tones and emotional depth.',
    459.00,
    559.00,
    18,
    'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=500&fit=crop',
    'Fine Art Painting',
    true
),

-- Product 8: Modern Floral Study (Fixed Image)
(
    'Modern Floral Study',
    'Contemporary botanical illustration featuring vibrant flowers in modern artistic style.',
    229.00,
    299.00,
    23,
    'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500&h=500&fit=crop',
    'Illustration',
    true
);

-- Verify the products were inserted
SELECT 
    id,
    name,
    price,
    original_price,
    discount,
    category,
    in_stock
FROM products 
ORDER BY id;

-- Enable Row Level Security (RLS) for public access
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to products
DROP POLICY IF EXISTS "Public read access for products" ON products;
CREATE POLICY "Public read access for products" 
ON products FOR SELECT 
USING (true);

-- Admin access policies (you can modify these based on your admin authentication)
DROP POLICY IF EXISTS "Admin full access to products" ON products;
CREATE POLICY "Admin full access to products" 
ON products FOR ALL 
USING (true) 
WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access to orders" ON orders;  
CREATE POLICY "Admin full access to orders" 
ON orders FOR ALL 
USING (true) 
WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access to order_items" ON order_items;
CREATE POLICY "Admin full access to order_items" 
ON order_items FOR ALL 
USING (true) 
WITH CHECK (true);

-- Verify RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('products', 'orders', 'order_items');

COMMIT;