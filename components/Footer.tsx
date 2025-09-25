import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Mail, Phone, MapPin, Youtube } from 'lucide-react';
import { Button } from './ui/button';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/nujuumarts', label: 'Instagram' },
    { icon: Twitter, href: 'https://x.com/nujuumarts', label: 'Twitter/X' },
    { icon: Youtube, href: 'https://www.youtube.com/@nujuumarts6307', label: 'YouTube' },
    { 
      icon: () => (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ), 
      href: 'https://www.tiktok.com/@nujuumarts', 
      label: 'TikTok' 
    }
  ];

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold">Nujuum Arts</span>
            </div>
            <p className="text-muted-foreground">
              Make Your Home Amazing with Art. Discover unique pieces that transform your space.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-accent hover:bg-accent/80 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <div className="space-y-2">
              {['Home', 'Shop', 'About', 'Contact'].map((link) => (
                <button
                  key={link}
                  onClick={() => onNavigate(link.toLowerCase())}
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold">Art Categories</h3>
            <div className="space-y-2">
              {['Paintings', 'Prints', 'Illustrations', 'Photography', 'Digital Art'].map((category) => (
                <button
                  key={category}
                  onClick={() => onNavigate('shop')}
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>hello@nujuumarts.com</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+252634839219</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Spain</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2024 Nujuum Arts. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                Return Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}