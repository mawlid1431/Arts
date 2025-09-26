'use client';

import React, { useState, useEffect } from 'react';
import { AdminLogin } from './AdminLogin';
import { Button } from '@/components/ui/button';
import { LogOut, Home, BarChart3, ShoppingBag, Package } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminAuthWrapperProps {
  children: React.ReactNode;
}

const AdminAuthWrapper: React.FC<AdminAuthWrapperProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const pathname = usePathname();

  // Check if user is already authenticated on component mount
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem('nujumarts_admin_auth') === 'true';
      const loginTime = localStorage.getItem('nujumarts_admin_login_time');
      
      // Check if session has expired (24 hours)
      if (isAuth && loginTime) {
        const now = Date.now();
        const sessionAge = now - parseInt(loginTime);
        const twentyFourHours = 24 * 60 * 60 * 1000;
        
        if (sessionAge > twentyFourHours) {
          // Session expired
          handleLogout();
        } else {
          setIsAuthenticated(true);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    setError('');

    // Check credentials (in production, this should be server-side)
    const validEmail = 'admin@nujuumarts.com';
    const validPassword = 'nujumarts2024';

    setTimeout(() => {
      if (credentials.email === validEmail && credentials.password === validPassword) {
        localStorage.setItem('nujumarts_admin_auth', 'true');
        localStorage.setItem('nujumarts_admin_login_time', Date.now().toString());
        setIsAuthenticated(true);
        setError('');
      } else {
        setError('Invalid email or password. Please try again.');
      }
      setIsLoading(false);
    }, 1000); // Simulate network delay
  };

  const handleLogout = () => {
    localStorage.removeItem('nujumarts_admin_auth');
    localStorage.removeItem('nujumarts_admin_login_time');
    setIsAuthenticated(false);
    setError('');
  };

  const handleBack = () => {
    // Navigate back to home page
    window.location.href = '/';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AdminLogin 
        onLogin={handleLogin}
        onBack={handleBack}
        isLoading={isLoading}
        error={error}
      />
    );
  }

  // User is authenticated, show admin content with header
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                🎨 Nujuum Arts Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Shop
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <Link 
              href="/admin"
              className={`flex items-center px-1 py-4 border-b-2 text-sm font-medium ${
                pathname === '/admin' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </Link>
            <Link 
              href="/admin/orders"
              className={`flex items-center px-1 py-4 border-b-2 text-sm font-medium ${
                pathname === '/admin/orders' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Orders
            </Link>
            <Link 
              href="/admin/products"
              className={`flex items-center px-1 py-4 border-b-2 text-sm font-medium ${
                pathname === '/admin/products' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Package className="h-4 w-4 mr-2" />
              Products
            </Link>
          </div>
        </div>
      </nav>

      {/* Admin Content */}
      <main>
        {children}
      </main>
    </div>
  );
};

export default AdminAuthWrapper;