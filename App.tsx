'use client';

import React, { useState, Suspense } from 'react';
import { Toaster } from './components/ui/sonner';
import { CartProvider } from './contexts/CartContext';
import { LoadingSpinner } from './components/ui/loading-spinner';
import dynamic from 'next/dynamic';

// Import only essential components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

// Optimized loading component
const PageLoader = ({ text = 'Loading...' }: { text?: string }) => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="lg" text={text} />
  </div>
);

const AdminLoader = ({ text = 'Loading...' }: { text?: string }) => (
  <div className="p-8 flex items-center justify-center">
    <LoadingSpinner size="md" text={text} />
  </div>
);

// Dynamic imports for better performance - optimized chunks
const HomePage = dynamic(() => import('./components/pages/HomePage').then(mod => ({ default: mod.HomePage })), {
  loading: () => <PageLoader text="Loading home page..." />
});

const ShopPage = dynamic(() => import('./components/pages/ShopPage').then(mod => ({ default: mod.ShopPage })), {
  loading: () => <PageLoader text="Loading shop..." />
});

const ProductDetailPage = dynamic(() => import('./components/pages/ProductDetailPage').then(mod => ({ default: mod.ProductDetailPage })), {
  loading: () => <PageLoader text="Loading product..." />
});

const CartPage = dynamic(() => import('./components/pages/CartPage').then(mod => ({ default: mod.CartPage })), {
  loading: () => <PageLoader text="Loading cart..." />
});

const CheckoutPage = dynamic(() => import('./components/pages/CheckoutPage').then(mod => ({ default: mod.CheckoutPage })), {
  loading: () => <PageLoader text="Loading checkout..." />
});

const ConfirmationPage = dynamic(() => import('./components/pages/ConfirmationPage').then(mod => ({ default: mod.ConfirmationPage })), {
  loading: () => <PageLoader />
});

const AboutPage = dynamic(() => import('./components/pages/AboutPage').then(mod => ({ default: mod.AboutPage })), {
  loading: () => <PageLoader />
});

const ContactPage = dynamic(() => import('./components/pages/ContactPage').then(mod => ({ default: mod.ContactPage })), {
  loading: () => <PageLoader />
});

// Dynamic imports for admin components - separate chunks
const AdminLogin = dynamic(() => import('./components/admin/AdminLogin').then(mod => ({ default: mod.AdminLogin })), {
  loading: () => <PageLoader text="Loading admin..." />
});

const AdminLayout = dynamic(() => import('./components/admin/AdminLayout').then(mod => ({ default: mod.AdminLayout })), {
  loading: () => <PageLoader text="Loading admin..." />
});

const OverviewPage = dynamic(() => import('./components/admin/OverviewPage').then(mod => ({ default: mod.OverviewPage })), {
  loading: () => <AdminLoader text="Loading dashboard..." />
});

const ProductsPage = dynamic(() => import('./components/admin/ProductsPage').then(mod => ({ default: mod.ProductsPage })), {
  loading: () => <AdminLoader text="Loading products..." />
});

const OrdersPage = dynamic(() => import('./components/admin/OrdersPage').then(mod => ({ default: mod.OrdersPage })), {
  loading: () => <AdminLoader text="Loading orders..." />
});

type PageType = 'home' | 'shop' | 'cart' | 'checkout' | 'about' | 'contact' | 'admin' | 'admin-login';

interface AdminUser {
  email: string;
  name: string;
  role: 'admin';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [productSlug, setProductSlug] = useState<string>('');
  const [confirmationOrderId, setConfirmationOrderId] = useState<string>('');
  
  // Admin state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [adminView, setAdminView] = useState('overview');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleNavigation = (page: string) => {
    // Handle special routing
    if (page.startsWith('product/')) {
      const slug = page.replace('product/', '');
      setProductSlug(slug);
      setCurrentPage('shop'); // We'll render ProductDetailPage when slug is set
    } else if (page.startsWith('confirmation/')) {
      const orderId = page.replace('confirmation/', '');
      setConfirmationOrderId(orderId);
      setCurrentPage('checkout'); // We'll render ConfirmationPage when orderId is set
    } else {
      setCurrentPage(page as PageType);
      setProductSlug('');
      setConfirmationOrderId('');
    }
  };

  const handleAdminLogin = async (credentials: { email: string; password: string }) => {
    setIsLoggingIn(true);
    setLoginError('');

    try {
      // Use secure API endpoint for authentication
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const result = await response.json();

      if (result.success) {
        const user: AdminUser = {
          email: result.user.email,
          name: result.user.name,
          role: result.user.role
        };
        
        setAdminUser(user);
        setIsAdminAuthenticated(true);
        setCurrentPage('admin');
        setAdminView('overview');
      } else {
        setLoginError(result.error || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Login failed. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setAdminUser(null);
    setCurrentPage('home');
    setAdminView('overview');
  };

  const showAdminLogin = () => {
    setCurrentPage('admin-login');
  };

  const renderPage = () => {
    // Admin routes
    if (currentPage === 'admin-login') {
      return (
        <Suspense fallback={<PageLoader text="Loading admin..." />}>
          <AdminLogin
            onLogin={handleAdminLogin}
            onBack={() => setCurrentPage('home')}
            isLoading={isLoggingIn}
            error={loginError}
          />
        </Suspense>
      );
    }

    if (currentPage === 'admin' && isAdminAuthenticated) {
      const renderAdminView = () => {
        switch (adminView) {
          case 'products':
            return (
              <Suspense fallback={<AdminLoader text="Loading products..." />}>
                <ProductsPage />
              </Suspense>
            );
          case 'orders':
            return (
              <Suspense fallback={<AdminLoader text="Loading orders..." />}>
                <OrdersPage />
              </Suspense>
            );
          default:
            return (
              <Suspense fallback={<AdminLoader text="Loading dashboard..." />}>
                <OverviewPage />
              </Suspense>
            );
        }
      };

      return (
        <Suspense fallback={<PageLoader text="Loading admin..." />}>
          <AdminLayout
            currentView={adminView}
            onViewChange={setAdminView}
            onLogout={handleAdminLogout}
          >
            {renderAdminView()}
          </AdminLayout>
        </Suspense>
      );
    }

    // Client routes with header/footer layout
    const ClientLayout = ({ children }: { children: React.ReactNode }) => (
      <div className="min-h-screen flex flex-col">
        <Header 
          currentPage={currentPage} 
          onNavigate={handleNavigation}
          onAdminLogin={showAdminLogin}
        />
        <main className="flex-1">
          {children}
        </main>
        <Footer onNavigate={handleNavigation} />
        <WhatsAppButton />
      </div>
    );

    // Handle special cases with URL params
    if (productSlug) {
      return (
        <ClientLayout>
          <Suspense fallback={<PageLoader text="Loading product..." />}>
            <ProductDetailPage 
              productSlug={productSlug}
              onNavigate={handleNavigation}
            />
          </Suspense>
        </ClientLayout>
      );
    }

    if (confirmationOrderId) {
      return (
        <ClientLayout>
          <Suspense fallback={<PageLoader />}>
            <ConfirmationPage 
              orderId={confirmationOrderId}
              onNavigate={handleNavigation}
            />
          </Suspense>
        </ClientLayout>
      );
    }

    // Regular pages
    switch (currentPage) {
      case 'shop':
        return (
          <ClientLayout>
            <Suspense fallback={<PageLoader text="Loading shop..." />}>
              <ShopPage onNavigate={handleNavigation} />
            </Suspense>
          </ClientLayout>
        );
      case 'cart':
        return (
          <ClientLayout>
            <Suspense fallback={<PageLoader text="Loading cart..." />}>
              <CartPage onNavigate={handleNavigation} />
            </Suspense>
          </ClientLayout>
        );
      case 'checkout':
        return (
          <ClientLayout>
            <Suspense fallback={<PageLoader text="Loading checkout..." />}>
              <CheckoutPage onNavigate={handleNavigation} />
            </Suspense>
          </ClientLayout>
        );
      case 'about':
        return (
          <ClientLayout>
            <Suspense fallback={<PageLoader />}>
              <AboutPage onNavigate={handleNavigation} />
            </Suspense>
          </ClientLayout>
        );
      case 'contact':
        return (
          <ClientLayout>
            <Suspense fallback={<PageLoader />}>
              <ContactPage onNavigate={handleNavigation} />
            </Suspense>
          </ClientLayout>
        );
      default:
        return (
          <ClientLayout>
            <Suspense fallback={<PageLoader text="Loading home page..." />}>
              <HomePage onNavigate={handleNavigation} />
            </Suspense>
          </ClientLayout>
        );
    }
  };

  return (
    <CartProvider>
      <div className="app">
        <div className="fade-transition">
          {renderPage()}
        </div>
        <Toaster />
      </div>
    </CartProvider>
  );
}