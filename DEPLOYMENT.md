# Nujuum Arts - Production Deployment Guide

## 🚀 Quick Deployment Checklist

### ✅ Pre-Deployment Requirements
- [x] Next.js 15.0.3+ project configured
- [x] Supabase database setup with proper schema
- [x] Environment variables configured
- [x] Build scripts optimized
- [x] Production headers and security configured

### 🔧 Environment Variables Setup

#### Required Environment Variables:
```bash
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME="Nujuum Arts"

# Contact & Social
NEXT_PUBLIC_CONTACT_EMAIL=hello@nujuumarts.com
NEXT_PUBLIC_CONTACT_PHONE=+252634839219
NEXT_PUBLIC_WHATSAPP_NUMBER=252634839219
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/nujuumarts
NEXT_PUBLIC_TWITTER_URL=https://x.com/nujuumarts
NEXT_PUBLIC_YOUTUBE_URL=https://www.youtube.com/@nujuumarts6307
NEXT_PUBLIC_TIKTOK_URL=https://www.tiktok.com/@nujuumarts

# Admin Access (SECURE THESE!)
ADMIN_EMAIL=your_admin@email.com
ADMIN_PASSWORD=your_very_secure_password
```

## 🌐 Deployment Platforms

### 1. Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# or use CLI:
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# ... repeat for all variables
```

### 2. Netlify
```bash
# Install Netlify CLI
npm install netlify-cli -g

# Build and deploy
npm run build
netlify deploy --prod --dir=.next
```

### 3. Railway
```bash
# Connect GitHub repo to Railway
# Set environment variables in Railway dashboard
# Deploy automatically on push
```

### 4. DigitalOcean App Platform
```bash
# Create app from GitHub repo
# Configure environment variables
# Deploy with auto-scaling
```

## 📦 Build Process

### Local Build Test
```bash
# Test production build locally
npm run deploy:build  # Runs lint, type-check, and build
npm run preview       # Test production server
```

### Build Commands for Platforms
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "outputDirectory": ".next"
}
```

## 🔒 Security Configuration

### Production Headers (Already Configured)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff  
- Referrer-Policy: origin-when-cross-origin
- Console logs removed in production

### Admin Security
- ⚠️ **CRITICAL**: Change default admin credentials
- Use strong passwords (12+ characters)
- Consider implementing JWT authentication
- Enable rate limiting for admin endpoints

## 🗄️ Database Setup

### Supabase Configuration
1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Note project URL and anon key

2. **Run Database Scripts**
   ```sql
   -- Run scripts in this order:
   -- 1. scripts/create-database-schema.sql
   -- 2. scripts/sample-products.sql
   -- 3. scripts/complete-database-setup.sql
   ```

3. **Enable RLS (Row Level Security)**
   ```sql
   -- Enable RLS on all tables
   ALTER TABLE products ENABLE ROW LEVEL SECURITY;
   ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
   ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
   
   -- Create policies for public read access
   CREATE POLICY "Public read access" ON products
   FOR SELECT USING (true);
   ```

## 🎨 Asset Optimization

### Images
- ✅ Using Unsplash CDN (optimized)
- ✅ Next.js Image component configured
- ✅ WebP format support
- ✅ Lazy loading enabled

### Performance
- ✅ Code splitting enabled
- ✅ ESM externals enabled
- ✅ Console logs removed in production
- ✅ Tree shaking configured

## 🔍 Monitoring & Analytics

### Add Analytics (Optional)
```bash
# Google Analytics
NEXT_PUBLIC_GA_TRACKING_ID=GA_MEASUREMENT_ID

# Facebook Pixel  
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=YOUR_PIXEL_ID
```

### Error Monitoring
Consider adding:
- Sentry for error tracking
- LogRocket for session replay
- Hotjar for user behavior

## 📱 Domain & DNS

### Custom Domain Setup
1. **Purchase Domain** (e.g., nujuumarts.com)
2. **Configure DNS** 
   ```
   Type: CNAME
   Name: www
   Value: your-app.vercel.app
   
   Type: A
   Name: @  
   Value: 76.76.19.61 (Vercel IP)
   ```
3. **Update Environment Variables**
   ```bash
   NEXT_PUBLIC_SITE_URL=https://nujuumarts.com
   ```

## 🚀 Deployment Steps

### Step-by-Step Deployment

1. **Prepare Environment**
   ```bash
   # Copy and configure environment
   cp .env.example .env.production
   # Edit .env.production with production values
   ```

2. **Test Build Locally**
   ```bash
   npm run deploy:build
   npm run preview
   # Visit http://localhost:3003
   ```

3. **Deploy to Platform**
   ```bash
   # Vercel example
   vercel --prod
   ```

4. **Configure Domain** (if using custom domain)

5. **Test Production**
   - ✅ Home page loads
   - ✅ Shop displays products
   - ✅ Cart functionality works
   - ✅ Admin panel accessible
   - ✅ Contact form works
   - ✅ All images load
   - ✅ Mobile responsive

## 🔄 Post-Deployment

### Regular Maintenance
- Monitor site performance
- Update dependencies monthly
- Backup Supabase data
- Monitor error logs
- Check broken links

### Content Updates
- Products managed via Supabase dashboard
- Images via Unsplash or upload to CDN
- Site content via code updates

## 📞 Support & Troubleshooting

### Common Issues
1. **Environment Variables Not Loading**
   - Ensure all NEXT_PUBLIC_ prefixes are correct
   - Restart deployment after env changes

2. **Supabase Connection Failed**
   - Check URL and keys are correct
   - Verify database is running
   - Check RLS policies

3. **Build Failures**
   - Run `npm run lint:fix`
   - Check TypeScript errors
   - Verify all imports

### Getting Help
- Check deployment platform docs
- Supabase documentation
- Next.js deployment guide

---

## 🎉 Go Live!

Your Nujuum Arts website is ready for production! 

**Production URL Structure:**
- Homepage: `https://nujuumarts.com`
- Shop: `https://nujuumarts.com/shop`
- Admin: `https://nujuumarts.com/admin`
- Contact: `https://nujuumarts.com/contact`

**Features Ready for Production:**
- ✅ 8 Beautiful Art Products
- ✅ Shopping Cart & Checkout
- ✅ Admin Dashboard
- ✅ Contact Form & WhatsApp
- ✅ Mobile Responsive
- ✅ SEO Optimized
- ✅ Performance Optimized

*Make your home amazing with art!* 🎨