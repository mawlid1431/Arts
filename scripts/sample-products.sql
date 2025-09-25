-- Sample products for Nujuum Arts
-- Run these in your Supabase SQL editor to populate the products table

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
  99189.99,
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