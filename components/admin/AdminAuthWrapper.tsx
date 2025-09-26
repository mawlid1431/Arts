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
      // Use sessionStorage instead of localStorage - expires when tab closes
      const isAuth = sessionStorage.getItem('nujumarts_admin_auth') === 'true';
      const loginTime = sessionStorage.getItem('nujumarts_admin_login_time');
      
      // Check if session exists and is recent (5 minutes for security)
      if (isAuth && loginTime) {
        const now = Date.now();
        const sessionAge = now - parseInt(loginTime);
        const fiveMinutes = 5 * 60 * 1000; // 5 minutes instead of 24 hours
        
        if (sessionAge > fiveMinutes) {
          // Session expired
          handleLogout();
        } else {
          setIsAuthenticated(true);
          // Update last activity time
          sessionStorage.setItem('nujumarts_admin_login_time', Date.now().toString());
        }
      }
      setIsLoading(false);
    };

    checkAuth();

    // Auto-logout on page visibility change (user switches tabs)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User switched away from tab - logout after 1 minute
        setTimeout(() => {
          if (document.hidden) {
            handleLogout();
          }
        }, 60000); // 1 minute
      }
    };

    // Auto-logout on beforeunload (user closes tab/refreshes)
    const handleBeforeUnload = () => {
      // Clear session when tab closes
      sessionStorage.removeItem('nujumarts_admin_auth');
      sessionStorage.removeItem('nujumarts_admin_login_time');
    };

    // Activity tracking for auto-logout
    let inactivityTimer: NodeJS.Timeout;
    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      // Auto logout after 10 minutes of inactivity
      inactivityTimer = setTimeout(() => {
        handleLogout();
      }, 10 * 60 * 1000); // 10 minutes
      
      // Update last activity time
      if (sessionStorage.getItem('nujumarts_admin_auth') === 'true') {
        sessionStorage.setItem('nujumarts_admin_login_time', Date.now().toString());
      }
    };

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Track user activity
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    activityEvents.forEach(event => {
      document.addEventListener(event, resetInactivityTimer, true);
    });

    // Start inactivity timer if authenticated
    if (isAuthenticated) {
      resetInactivityTimer();
    }

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearTimeout(inactivityTimer);
      
      activityEvents.forEach(event => {
        document.removeEventListener(event, resetInactivityTimer, true);
      });
    };
  }, [isAuthenticated]);

  const handleLogin = async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    setError('');

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
        // Use sessionStorage - expires when browser/tab closes
        sessionStorage.setItem('nujumarts_admin_auth', 'true');
        sessionStorage.setItem('nujumarts_admin_login_time', Date.now().toString());
        setIsAuthenticated(true);
        setError('');
      } else {
        setError(result.error || 'Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('nujumarts_admin_auth');
    sessionStorage.removeItem('nujumarts_admin_login_time');
    setIsAuthenticated(false);
    setError('');
  };

  const handleBack = () => {
    // Navigate back to home page
    window.location.href = '/';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Admin Panel...</p>
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
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
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
              className={`flex items-center px-1 py-4 border-b-2 text-sm font-medium transition-colors ${
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
              className={`flex items-center px-1 py-4 border-b-2 text-sm font-medium transition-colors ${
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
              className={`flex items-center px-1 py-4 border-b-2 text-sm font-medium transition-colors ${
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