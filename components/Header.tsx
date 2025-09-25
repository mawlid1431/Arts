import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Menu, X, Moon, Sun, User } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useCartContext } from '../contexts/CartContext';
import { useDarkMode } from '../hooks/useDarkMode';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onAdminLogin?: () => void;
}

export function Header({ currentPage, onNavigate, onAdminLogin }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount } = useCartContext();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const cartCount = getCartCount();

  const navigationItems = [
    { name: 'Home', href: 'home' },
    { name: 'Shop', href: 'shop' },
    { name: 'About', href: 'about' },
    { name: 'Contact', href: 'contact' }
  ];

  const handleNavigation = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigation('home')}
          >
            <span className="text-xl font-bold">Nujuum Arts</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <motion.button
                key={item.href}
                onClick={() => handleNavigation(item.href)}
                className={`relative px-3 py-2 transition-colors ${
                  currentPage === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
                {currentPage === item.href && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    layoutId="underline"
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="hidden sm:flex"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Admin Login */}
            {onAdminLogin && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onAdminLogin}
                className="hidden sm:flex"
              >
                <User className="h-5 w-5" />
              </Button>
            )}

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleNavigation('cart')}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t"
          >
            <div className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className={`text-left px-4 py-2 rounded-md transition-colors ${
                    currentPage === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              
              <div className="flex items-center space-x-2 px-4 py-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleDarkMode}
                  className="sm:hidden"
                >
                  {isDarkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
                
                {onAdminLogin && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      onAdminLogin();
                      setIsMenuOpen(false);
                    }}
                    className="sm:hidden"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  );
}