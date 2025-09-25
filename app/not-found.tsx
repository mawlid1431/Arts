'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft, Palette, Heart, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const floatingVariants = {
    floating: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/50 to-primary/5 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Art Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Art Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.2, 1], 
            rotate: [0, 180, 360],
            x: [0, 20, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-tl from-secondary/20 to-accent/20 rounded-full blur-lg"
          animate={{ 
            scale: [1.2, 1, 1.2], 
            rotate: [360, 180, 0],
            x: [0, -30, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-accent/15 to-primary/15 rounded-full blur-md"
          animate={{ 
            x: [-20, 20, -20], 
            y: [-20, 20, -20],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Additional floating elements */}
        <motion.div
          className="absolute top-32 right-1/4 w-8 h-8 bg-primary/20 rounded-full"
          animate={{ 
            y: [-10, 10, -10],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 left-1/3 w-12 h-12 bg-secondary/15 rounded-full blur-sm"
          animate={{ 
            x: [-15, 15, -15],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto text-center relative z-10"
      >
        {/* Artistic 404 Display */}
        <motion.div
          variants={itemVariants}
          className="mb-12 relative"
        >
          <motion.div
            variants={floatingVariants}
            animate="floating"
            className="inline-flex items-center justify-center mb-8 gap-4"
          >
            {/* First "4" */}
            <div className="relative">
              <motion.span 
                className="text-8xl md:text-9xl font-bold bg-gradient-to-br from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent font-serif"
                animate={{ 
                  textShadow: [
                    "0 0 0px rgba(0,0,0,0)",
                    "0 0 20px rgba(0,0,0,0.1)",
                    "0 0 0px rgba(0,0,0,0)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                4
              </motion.span>
              <motion.div
                className="absolute -top-6 -right-4"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 text-primary/60" />
              </motion.div>
            </div>
            
            {/* Central Art Heart */}
            <div className="relative mx-6">
              <motion.div 
                className="w-28 h-28 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-full flex items-center justify-center border-4 border-primary/30 backdrop-blur-sm"
                animate={{ 
                  boxShadow: [
                    "0 0 0px rgba(0,0,0,0)",
                    "0 0 30px rgba(0,0,0,0.1)",
                    "0 0 0px rgba(0,0,0,0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.15, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <Heart className="w-12 h-12 text-primary fill-primary/20" />
                </motion.div>
              </motion.div>
              
              {/* Floating decorative dots */}
              <motion.div
                className="absolute -bottom-3 -left-3 w-4 h-4 bg-accent rounded-full"
                animate={{ 
                  scale: [1, 1.8, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ duration: 1.8, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className="absolute -top-3 -right-3 w-3 h-3 bg-secondary rounded-full"
                animate={{ 
                  scale: [1, 1.6, 1],
                  opacity: [0.5, 0.9, 0.5]
                }}
                transition={{ duration: 2.2, repeat: Infinity, delay: 0.8 }}
              />
            </div>
            
            {/* Second "4" */}
            <div className="relative">
              <motion.span 
                className="text-8xl md:text-9xl font-bold bg-gradient-to-br from-secondary via-secondary/80 to-secondary/60 bg-clip-text text-transparent font-serif"
                animate={{ 
                  textShadow: [
                    "0 0 0px rgba(0,0,0,0)",
                    "0 0 20px rgba(0,0,0,0.1)",
                    "0 0 0px rgba(0,0,0,0)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                4
              </motion.span>
              <motion.div
                className="absolute -bottom-4 -left-4"
                animate={{ 
                  y: [-8, 8, -8],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Palette className="w-5 h-5 text-secondary/60" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <motion.div variants={itemVariants} className="mb-10">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent font-serif"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{ backgroundSize: "200% 200%" }}
          >
            Masterpiece Missing
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto"
            variants={itemVariants}
          >
            It seems this artwork has wandered off to inspire another soul. 
            Let's help you discover the perfect piece for your gallery.
          </motion.p>
          <motion.div 
            className="w-32 h-1.5 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full"
            animate={{ 
              scaleX: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        {/* Enhanced Search Section */}
        <motion.div variants={itemVariants} className="mb-12">
          <motion.h3 
            className="text-lg md:text-xl font-semibold mb-6 text-foreground/90 font-serif"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Search Our Art Collection
          </motion.h3>
          <form onSubmit={handleSearch} className="flex gap-3 max-w-lg mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Find paintings, canvas art, abstracts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 border-2 border-primary/20 focus:border-primary/50 rounded-xl text-base font-medium bg-background/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-14 px-8 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <Search className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Search Art
            </Button>
          </form>
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link href="/">
            <Button
              size="lg"
              className="h-14 px-10 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 group shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              Return Home
            </Button>
          </Link>
          
          <Link href="/shop">
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-10 rounded-xl border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group backdrop-blur-sm"
            >
              <Palette className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
              Browse Gallery
            </Button>
          </Link>
        </motion.div>

        {/* Inspirational Art Quote */}
        <motion.div
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-border/30"
        >
          <motion.blockquote 
            className="text-muted-foreground/80 italic text-lg md:text-xl max-w-2xl mx-auto font-serif leading-relaxed"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            "Art is not what you see, but what you make others see. Let us help you find the perfect vision for your space."
          </motion.blockquote>
          <motion.p 
            className="text-sm text-muted-foreground/60 mt-4 font-medium tracking-wide"
            animate={{ letterSpacing: ["0.05em", "0.1em", "0.05em"] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            — Nujuum Arts Gallery
          </motion.p>
        </motion.div>

        {/* Back Navigation */}
        <motion.div
          variants={itemVariants}
          className="mt-8"
        >
          <Button
            onClick={() => router.back()}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}