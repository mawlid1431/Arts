-- Nujuum Arts Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create products table
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  discount INTEGER DEFAULT 0,
  image TEXT,
  category VARCHAR(100) NOT NULL,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  shipping_address TEXT NOT NULL,
  payment_method VARCHAR(100) DEFAULT 'pending',
  subtotal DECIMAL(10,2) NOT NULL,
  shipping DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table (junction table for orders and products)
CREATE TABLE order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_messages table (for contact form submissions)
CREATE TABLE contact_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_in_stock ON products(in_stock);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_email ON orders(customer_email);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
CREATE INDEX idx_contact_messages_status ON contact_messages(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers to update updated_at automatically
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (optional but recommended)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies (allow public read access, restrict write access)
-- Products: Public read access
CREATE POLICY "Public can view products" ON products
  FOR SELECT USING (true);

-- Orders: Customers can only see their own orders
CREATE POLICY "Customers can view own orders" ON orders
  FOR SELECT USING (true); -- For now, allow all reads

-- Order items: Public read access (linked to orders policy)
CREATE POLICY "Public can view order items" ON order_items
  FOR SELECT USING (true);

-- Contact messages: Allow inserts, restrict reads
CREATE POLICY "Anyone can insert contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Insert sample products
INSERT INTO products (name, description, price, original_price, discount, image, category, in_stock) VALUES
('Abstract Expression Canvas', 'A vibrant abstract painting that brings energy and modern sophistication to any space.', 299.00, 399.00, 25, 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=500&fit=crop', 'Canvas Painting', true),
('Minimalist Mountain Landscape', 'A serene mountain landscape rendered in soft, muted tones.', 249.00, 299.00, 17, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop', 'Fine Art Painting', true),
('Urban Geometric Art', 'Contemporary geometric artwork inspired by city architecture.', 199.00, 279.00, 29, 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&h=500&fit=crop', 'Canvas Painting', true),
('Botanical Fine Art Study', 'Delicate botanical illustration featuring hand-painted florals.', 349.00, 449.00, 22, '/simple_woman.jpg', 'Fine Art Painting', true),
('Ocean Waves Canvas', 'Dramatic seascape capturing the power and beauty of ocean waves.', 279.00, 349.00, 20, 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=500&h=500&fit=crop', 'Canvas Painting', true),
('Ethereal Dreams', 'A mystical landscape painting that captures the essence of dreams and imagination.', 389.00, 489.00, 20, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop', 'Fine Art Painting', true),
('Golden Sunset Portrait', 'An expressive portrait artwork with warm golden tones and emotional depth.', 459.00, 559.00, 18, 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=500&fit=crop', 'Fine Art Painting', true),
('Modern Floral Study', 'Contemporary botanical illustration featuring vibrant flowers in modern artistic style.', 229.00, 299.00, 23, 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500&h=500&fit=crop', 'Illustration', true);

COMMENT ON TABLE products IS 'Art products available for purchase';
COMMENT ON TABLE orders IS 'Customer orders';
COMMENT ON TABLE order_items IS 'Individual items within each order';
COMMENT ON TABLE contact_messages IS 'Messages from contact form submissions';