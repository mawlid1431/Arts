'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from './components/ui/sonner';
import { CartProvider } from './contexts/CartContext';

// Import page components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { HomePage } from './components/pages/HomePage';
import { ShopPage } from './components/pages/ShopPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { CartPage } from './components/pages/CartPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { ConfirmationPage } from './components/pages/ConfirmationPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';

// Import admin components
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { OverviewPage } from './components/admin/OverviewPage';
import { ProductsPage } from './components/admin/ProductsPage';
import { OrdersPage } from './components/admin/OrdersPage';

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
      // Simulate authentication
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Demo credentials
      if (credentials.email === 'admin@nujuumarts.com' && credentials.password === 'admin123') {
        const user: AdminUser = {
          email: credentials.email,
          name: 'Admin User',
          role: 'admin'
        };
        
        setAdminUser(user);
        setIsAdminAuthenticated(true);
        setCurrentPage('admin');
        setAdminView('overview');
      } else {
        setLoginError('Invalid email or password');
      }
    } catch (error) {
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
        <AdminLogin
          onLogin={handleAdminLogin}
          onBack={() => setCurrentPage('home')}
          isLoading={isLoggingIn}
          error={loginError}
        />
      );
    }

    if (currentPage === 'admin' && isAdminAuthenticated) {
      const renderAdminView = () => {
        switch (adminView) {
          case 'products':
            return <ProductsPage />;
          case 'orders':
            return <OrdersPage />;
          default:
            return <OverviewPage />;
        }
      };

      return (
        <AdminLayout
          currentView={adminView}
          onViewChange={setAdminView}
          onLogout={handleAdminLogout}
        >
          {renderAdminView()}
        </AdminLayout>
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
          <ProductDetailPage 
            productSlug={productSlug}
            onNavigate={handleNavigation}
          />
        </ClientLayout>
      );
    }

    if (confirmationOrderId) {
      return (
        <ClientLayout>
          <ConfirmationPage 
            orderId={confirmationOrderId}
            onNavigate={handleNavigation}
          />
        </ClientLayout>
      );
    }

    // Regular pages
    switch (currentPage) {
      case 'shop':
        return (
          <ClientLayout>
            <ShopPage onNavigate={handleNavigation} />
          </ClientLayout>
        );
      case 'cart':
        return (
          <ClientLayout>
            <CartPage onNavigate={handleNavigation} />
          </ClientLayout>
        );
      case 'checkout':
        return (
          <ClientLayout>
            <CheckoutPage onNavigate={handleNavigation} />
          </ClientLayout>
        );
      case 'about':
        return (
          <ClientLayout>
            <AboutPage onNavigate={handleNavigation} />
          </ClientLayout>
        );
      case 'contact':
        return (
          <ClientLayout>
            <ContactPage onNavigate={handleNavigation} />
          </ClientLayout>
        );
      default:
        return (
          <ClientLayout>
            <HomePage onNavigate={handleNavigation} />
          </ClientLayout>
        );
    }
  };

  return (
    <CartProvider>
      <div className="app">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + productSlug + confirmationOrderId + adminView}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
        <Toaster />
      </div>
    </CartProvider>
  );
}