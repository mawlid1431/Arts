# 🎨 Nujuum Arts - Installation & Setup Guide

## Make Your Home Amazing with Art

This guide will help you set up and run the complete Nujuum Arts e-commerce website locally.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18.0.0 or higher)
- **npm** (version 8.0.0 or higher) or **yarn**
- **Git** (for cloning the repository)

### Check Your Versions
```bash
node --version
npm --version
git --version
```

---

## 🚀 Quick Start Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/nujuumarts/nujuum-arts-ecommerce.git
cd nujuum-arts-ecommerce
```

### Step 2: Install Dependencies
```bash
npm install
```

Or if you prefer using yarn:
```bash
yarn install
```

### Step 3: Start Development Server
```bash
npm run dev
```

Or with yarn:
```bash
yarn dev
```

### Step 4: Open Your Browser
Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates an optimized production build |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint to check for code issues |
| `npm run type-check` | Runs TypeScript type checking |
| `npm run preview` | Builds and starts production server |

---

## 📁 Project Structure

```
nujuum-arts-ecommerce/
├── 📄 App.tsx                 # Main application component
├── 📁 components/             # React components
│   ├── 📁 admin/             # Admin dashboard components
│   ├── 📁 pages/             # Page components
│   ├── 📁 ui/                # Reusable UI components
│   └── 📁 figma/             # Figma integration components
├── 📁 contexts/              # React contexts
├── 📁 hooks/                 # Custom React hooks
├── 📁 lib/                   # Utility functions and mock data
├── 📁 styles/                # CSS and styling files
├── 📁 types/                 # TypeScript type definitions
├── 📄 package.json           # Project dependencies
└── 📄 INSTALLATION.md        # This file
```

---

## 🎨 Features Overview

### Client-Side Features ✨
- **Home Page**: Hero section with animated art gallery
- **Shop Page**: Product grid with filtering and search
- **Product Details**: Individual product pages with image galleries
- **Shopping Cart**: Persistent cart with local storage
- **Checkout**: Customer information collection
- **About & Contact**: Company information pages
- **Dark Mode**: Toggle between light and dark themes
- **WhatsApp Integration**: Floating chat button
- **Responsive Design**: Works on all devices

### Admin Dashboard 🛠️
- **Admin Login**: Secure authentication system
- **Product Management**: Add, edit, delete products
- **Order Management**: View and process orders
- **Dashboard Overview**: Sales analytics and insights

### Technical Features 🔧
- **React 18** with TypeScript
- **Next.js 15** for server-side rendering
- **Tailwind CSS v4** for styling
- **Framer Motion** for smooth animations
- **ShadCN/UI** component library
- **Local Storage** for cart persistence
- **Responsive Design** across all devices

---

## 🎯 Getting Started Guide

### 1. Explore the Homepage
- Visit the animated homepage with art gallery showcase
- Use the scroll button to navigate smoothly
- Toggle dark mode using the theme switcher

### 2. Browse the Shop
- Explore the product catalog
- Filter by art type (Canvas/Fine Art)
- Add items to your cart

### 3. Admin Access
- Navigate to `/admin` or click "Admin" in the header
- **Demo Login Credentials:**
  - Email: `admin@nujuumarts.com`
  - Password: `admin123`

### 4. Test the Cart System
- Add products to cart
- View cart persistence across page reloads
- Complete the checkout process

---

## 🛠️ Development Setup

### Environment Setup
1. Ensure you're using Node.js 18+ for optimal compatibility
2. The project uses Tailwind CSS v4 (alpha) - no additional config needed
3. All animations are powered by Framer Motion
4. Mock data is provided for development

### Code Structure
- **Components**: Modular React components in `/components`
- **Pages**: Main page components in `/components/pages`
- **Admin**: Admin dashboard in `/components/admin`
- **Contexts**: React context providers in `/contexts`
- **Hooks**: Custom hooks in `/hooks`
- **Types**: TypeScript definitions in `/types`

### Styling Guidelines
- Uses Tailwind CSS v4 with custom design tokens
- Black & white theme with dark mode support
- Smooth animations throughout
- Mobile-first responsive design

---

## 🚨 Troubleshooting

### Common Issues

**Problem**: `npm install` fails
**Solution**: 
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Problem**: TypeScript errors
**Solution**:
```bash
# Run type checking
npm run type-check

# Clear Next.js cache
rm -rf .next
npm run dev
```

**Problem**: Styling issues
**Solution**: 
- Ensure Tailwind CSS v4 is properly installed
- Check if `styles/globals.css` is imported
- Restart the development server

**Problem**: Animation issues
**Solution**:
- Verify Framer Motion is installed (`motion` package)
- Check console for JavaScript errors
- Ensure proper component mounting

---

## 🌟 Key Dependencies

### Core Framework
- **React 18.3.1**: Latest React with concurrent features
- **Next.js 15.0.3**: Full-stack React framework
- **TypeScript 5.6.3**: Type safety and better DX

### Styling & Animation
- **Tailwind CSS 4.0.0-alpha**: Utility-first CSS framework
- **Framer Motion 11.11.17**: Production-ready motion library
- **Lucide React**: Beautiful icon library

### UI Components
- **Radix UI**: Primitive components for accessibility
- **ShadCN/UI**: Pre-built component library
- **Recharts**: Chart library for analytics

### Forms & Validation
- **React Hook Form 7.55.0**: Performant forms library
- **Zod**: Schema validation library

---

## 🔧 Customization

### Brand Colors
Edit `styles/globals.css` to modify the color scheme:
```css
:root {
  --primary: #030213;        /* Main brand color */
  --accent: #e9ebef;         /* Accent color */
  --background: #ffffff;     /* Background color */
}
```

### Add New Products
Modify `lib/mock-data.ts` to add new products:
```typescript
export const mockProducts: Product[] = [
  {
    id: 'new-product',
    title: 'Your Art Title',
    type: 'Canvas Painting',
    price: 299,
    // ... other properties
  }
];
```

### Customize Animations
Modify animation settings in components using Framer Motion:
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
```

---

## 📞 Support & Contact

If you encounter any issues during installation or setup:

- 📧 **Email**: support@nujuumarts.com
- 💬 **WhatsApp**: Available through the website chat
- 🐛 **Issues**: Create an issue on GitHub repository
- 📖 **Documentation**: Check the project README and code comments

---

## 🚀 Deployment

### Development Deployment
The app is ready for deployment on platforms like:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **Digital Ocean**

### Production Build
```bash
npm run build
npm run start
```

---

## 🎉 You're All Set!

Your Nujuum Arts e-commerce website is now ready to use. Explore the features, customize as needed, and start showcasing beautiful artwork!

**Happy coding! 🎨✨**

---

*This installation guide is part of the Nujuum Arts e-commerce platform. For more information about the brand and artwork, visit the website.*