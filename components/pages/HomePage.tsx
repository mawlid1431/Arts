import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, Palette, Shield, Truck, ChevronDown, Eye, Heart, Zap, Sparkles, Award, Globe } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Product } from '../../types';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

// Animation variants for consistent animations
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

export function HomePage({ onNavigate }: HomePageProps) {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [video1Playing, setVideo1Playing] = useState(false);
  const [video2Playing, setVideo2Playing] = useState(false);
  const { scrollY } = useScroll();
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const productsRef = useRef(null);
  
  const featuredProducts = Array.isArray(products) ? products.slice(0, 3) : [];

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          // The API returns {products: [...]} so we need to extract the products array
          const productsArray = data.products || data;
          if (Array.isArray(productsArray)) {
            setProducts(productsArray);
          } else {
            console.error('API response does not contain a valid products array:', data);
            setProducts([]);
          }
        } else {
          console.error('Failed to fetch products:', response.status);
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Parallax effects with smoother transitions
  const heroY = useTransform(scrollY, [0, 800], [0, 300]);
  const artY = useTransform(scrollY, [0, 800], [0, -150]);
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -200]);
  
  // Section visibility
  const heroInView = useInView(heroRef, { margin: "-50% 0px -50% 0px" });
  const featuresInView = useInView(featuresRef, { margin: "-30% 0px -30% 0px" });
  const productsInView = useInView(productsRef, { margin: "-30% 0px -30% 0px" });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollButton(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (heroInView) setActiveSection('hero');
    else if (featuresInView) setActiveSection('features');
    else if (productsInView) setActiveSection('products');
  }, [heroInView, featuresInView, productsInView]);

  // Video control functions
  const toggleVideo1 = () => {
    setVideo1Playing(!video1Playing);
  };

  const toggleVideo2 = () => {
    setVideo2Playing(!video2Playing);
  };

  const handleVideoClick = (videoNumber: number) => {
    if (videoNumber === 1) {
      toggleVideo1();
    } else {
      toggleVideo2();
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const features = [
    {
      icon: Palette,
      title: 'Curated Collection',
      description: 'Hand-picked artworks from talented artists worldwide',
      color: 'from-blue-500/10 to-purple-500/10'
    },
    {
      icon: Shield,
      title: 'Authenticity Guaranteed',
      description: 'Every piece comes with a certificate of authenticity',
      color: 'from-green-500/10 to-emerald-500/10'
    },
    {
      icon: Truck,
      title: 'Secure Shipping',
      description: 'Carefully packaged and insured worldwide delivery',
      color: 'from-orange-500/10 to-red-500/10'
    }
  ];

  const stats = [
    { number: '500+', label: 'Artworks', icon: Palette },
    { number: '50+', label: 'Artists', icon: Award },
    { number: '1000+', label: 'Happy Homes', icon: Heart },
    { number: '25+', label: 'Countries', icon: Globe }
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section with Enhanced Art Gallery */}
      <section 
        ref={heroRef}
        id="hero"
        className="relative min-h-screen flex items-center"
      >
        {/* Animated Background */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: backgroundY }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-accent/5" />
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1680703511743-d87fba006ec3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaXZpbmclMjByb29tJTIwYXJ0JTIwd2FsbCUyMHBhaW50aW5nc3xlbnwxfHx8fDE3NTg3MzYxOTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Modern living room with art"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Floating Decorative Elements */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/20 rounded-full blur-2xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-br from-accent/20 to-primary/10 rounded-full blur-xl"
          animate={{
            x: [0, -25, 0],
            y: [0, 15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Enhanced Text Content */}
            <motion.div 
              className="space-y-10"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeInUp}>
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 backdrop-blur-sm rounded-full mb-6 border border-primary/10"
                  whileHover={{ scale: 1.05 }}
                >
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="font-medium text-primary">Nujuum Arts Gallery</span>
                </motion.div>

                <h1 className="space-y-2">
                  <motion.span
                    variants={fadeInUp}
                    className="block text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
                  >
                    Make Your Home
                  </motion.span>
                  <motion.span
                    variants={fadeInUp}
                    className="block text-4xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent"
                  >
                    Amazing
                  </motion.span>
                  <motion.span
                    variants={fadeInUp}
                    className="block text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
                  >
                    with Art
                  </motion.span>
                </h1>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed"
              >
                Transform your space into a gallery of inspiration with our curated collection of canvas and fine art paintings that speak to your soul.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    onClick={() => onNavigate('shop')}
                    className="text-lg px-8 py-6 rounded-full group shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Eye className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Explore Collection
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => scrollToSection('featured-section')}
                    className="text-lg px-8 py-6 rounded-full backdrop-blur-sm hover:bg-primary/5 transition-all duration-300"
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    Featured Pieces
                  </Button>
                </motion.div>
              </motion.div>

              {/* Enhanced Stats Grid */}
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    className="text-center group"
                    whileHover={{ y: -5 }}
                  >
                    <motion.div
                      className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <stat.icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <motion.div 
                      className="text-2xl md:text-3xl font-bold text-primary"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2 + index * 0.1, type: "spring" }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Enhanced Art Gallery Wall */}
            <motion.div
              className="relative"
              style={{ y: artY }}
              initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
            >
              <div className="grid grid-cols-12 grid-rows-12 gap-4 h-[700px] perspective-1000">
                {/* Main Featured Artwork */}
                <motion.div
                  className="relative col-span-8 row-span-7 rounded-3xl overflow-hidden shadow-2xl group"
                  whileHover={{ scale: 1.02, rotateY: 5, z: 50 }}
                  transition={{ duration: 0.4 }}
                >
                  <ImageWithFallback
                    src="/main_2.jpg"
                    alt="Vibrant portrait with flowing colorful patterns - Make Your Home Amazing with Art"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div
                    className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ y: 20 }}
                    whileHover={{ y: 0 }}
                  >
                    <div className="font-semibold text-lg">Colorful Portrait Art</div>
                    <div className="text-sm opacity-90">Canvas Painting • $399</div>
                  </motion.div>
                </motion.div>

                {/* Side Gallery Pieces */}
                <motion.div
                  className="relative col-span-4 row-span-5 rounded-2xl overflow-hidden shadow-xl group"
                  whileHover={{ scale: 1.05, rotate: 2, z: 30 }}
                  transition={{ duration: 0.3 }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{ y: useTransform(scrollY, [0, 400], [0, -30]) }}
                >
                  <ImageWithFallback
                    src="/main_1.jpg"
                    alt="Abstract blue and yellow contemporary artwork"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </motion.div>

                <motion.div
                  className="relative col-span-4 row-span-4 rounded-2xl overflow-hidden shadow-xl group"
                  whileHover={{ scale: 1.05, rotate: -2, z: 30 }}
                  transition={{ duration: 0.3 }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{ y: useTransform(scrollY, [0, 400], [0, 30]) }}
                >
                  <ImageWithFallback
                    src="/done_arrow_bg.jpg"
                    alt="Serene misty landscape path artwork"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </motion.div>

                <motion.div
                  className="relative col-span-6 row-span-3 rounded-xl overflow-hidden shadow-lg group"
                  whileHover={{ scale: 1.03, z: 20 }}
                  transition={{ duration: 0.3 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center">
                    <motion.div
                      className="text-center text-primary"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Palette className="h-8 w-8 mx-auto mb-2" />
                      <div className="font-semibold text-sm">View More</div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Floating Elements with Physics */}
              <motion.div
                className="absolute -top-6 -left-6 w-12 h-12 bg-primary/20 rounded-full backdrop-blur-sm"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 w-8 h-8 bg-accent/40 rounded-full backdrop-blur-sm"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.4, 0.7, 0.4],
                  rotate: [360, 180, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <AnimatePresence>
          {showScrollButton && (
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span 
                className="text-xs text-muted-foreground font-medium tracking-wider uppercase"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Scroll to explore
              </motion.span>
              <motion.button
                className="p-4 rounded-full bg-background/80 backdrop-blur-md border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 shadow-lg"
                onClick={() => scrollToSection('features-section')}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <ChevronDown className="h-6 w-6 text-primary" />
                </motion.div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Video Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-background via-accent/5 to-background">
        {/* Background Elements */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/20 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 20, 0],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-accent/20 to-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, -15, 0],
            y: [0, 10, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 backdrop-blur-sm rounded-full mb-6 border border-primary/10"
            >
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-medium text-primary">See Art Come to Life</span>
            </motion.div>

            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Watch Art Transform Spaces
              </span>
            </motion.h2>

            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Experience how the right artwork can completely transform any space into a gallery of inspiration.
            </motion.p>
          </motion.div>

          {/* Video Gallery - Product Card Style */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Video 1 - What is Arts */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group"
              >
                <div className="overflow-hidden cursor-pointer border-none shadow-lg hover:shadow-2xl transition-all duration-500 bg-card/80 backdrop-blur-sm rounded-2xl">
                  {/* Video Thumbnail - Increased Size */}
                  <div className="aspect-video overflow-hidden relative bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-[300px]">
                    {/* Background Pattern */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-40"
                      style={{
                        backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23667eea;stop-opacity:0.4" /><stop offset="50%" style="stop-color:%23764ba2;stop-opacity:0.6" /><stop offset="100%" style="stop-color:%23f093fb;stop-opacity:0.4" /></linearGradient></defs><rect width="800" height="450" fill="url(%23grad1)" /><circle cx="150" cy="100" r="60" fill="rgba(255,255,255,0.08)" /><circle cx="650" cy="300" r="80" fill="rgba(255,255,255,0.05)" /><circle cx="400" cy="200" r="40" fill="rgba(255,255,255,0.1)" /></svg>')`
                      }}
                    />
                    
                    {/* Play Button Overlay */}
                    {!video1Playing && (
                      <motion.div
                        className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                        whileHover={{ opacity: 1 }}
                      >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="text-center text-white"
                      >
                        <motion.div
                          className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 mx-auto mb-4"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="w-0 h-0 border-l-[14px] border-l-white border-y-[8px] border-y-transparent ml-1" />
                        </motion.div>
                        <span className="font-medium text-lg">Watch Video</span>
                      </motion.div>
                    </motion.div>
                    )}

                    {/* Video Badge */}
                    <motion.div
                      className="absolute top-6 left-6 px-4 py-2 bg-black/70 backdrop-blur-sm rounded-full text-white text-sm font-medium"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      Art Education
                    </motion.div>

                    {/* Duration Badge */}
                    <motion.div
                      className="absolute top-6 right-6 px-3 py-2 bg-primary/80 backdrop-blur-sm rounded-full text-white text-sm font-medium"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      ▶ 5:30
                    </motion.div>

                    {/* Click Handler */}
                    <div 
                      className="absolute inset-0 cursor-pointer z-10"
                      onClick={() => handleVideoClick(1)}
                    />
                    
                    {/* Dynamic Video Container */}
                    <div className="absolute inset-0">
                      {video1Playing ? (
                        <div className="relative w-full h-full">
                          <iframe
                            src="https://www.youtube.com/embed/nkv1Euf5dc0?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0&fs=1&enablejsapi=1"
                            title="What is Arts and When I Start - Nujuum Arts"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="w-full h-full"
                            onLoad={() => {
                              // Listen for messages from the iframe to detect when video is paused
                              const handleMessage = (event: MessageEvent) => {
                                if (event.origin !== 'https://www.youtube.com') return;
                                
                                try {
                                  const data = JSON.parse(event.data);
                                  if (data.event === 'video-progress' && data.info?.playerState === 2) {
                                    // Video is paused (playerState 2)
                                    // Don't automatically close, let user control
                                  }
                                } catch (e) {
                                  // Ignore parsing errors
                                }
                              };
                              
                              window.addEventListener('message', handleMessage);
                              return () => window.removeEventListener('message', handleMessage);
                            }}
                          />
                          
                          {/* Close Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setVideo1Playing(false);
                            }}
                            className="absolute top-4 right-4 w-10 h-10 bg-black/70 hover:bg-black/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white z-20 transition-all duration-200"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* Video Info - Product Card Style */}
                  <div className="p-8">
                    {/* Rating Stars */}
                    <motion.div 
                      className="flex items-center gap-1 mb-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            delay: 0.4 + i * 0.1,
                            duration: 0.3,
                            ease: "easeOut"
                          }}
                        >
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">(128 views)</span>
                    </motion.div>

                    {/* Video Title */}
                    <motion.h3 
                      className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      What is Arts and When I Start
                    </motion.h3>

                    {/* Video Description */}
                    <motion.p 
                      className="text-muted-foreground mb-6 line-clamp-2 text-lg"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Discover the journey into the world of art and learn about the passion that drives artistic creation and expression.
                    </motion.p>

                    {/* Action Button */}
                    <motion.div 
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                          Featured
                        </span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors px-6 py-3"
                      >
                        <Eye className="mr-2 h-5 w-5" />
                        Watch Now
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Video 2 - NujuumArts talks about Modern Somali Art */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group"
              >
                <div className="overflow-hidden cursor-pointer border-none shadow-lg hover:shadow-2xl transition-all duration-500 bg-card/80 backdrop-blur-sm rounded-2xl">
                  {/* Video Thumbnail - Increased Size */}
                  <div className="aspect-video overflow-hidden relative bg-gradient-to-br from-purple-900 via-pink-800 to-indigo-900 min-h-[300px]">
                    {/* Background Pattern */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-40"
                      style={{
                        backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450"><defs><linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23f093fb;stop-opacity:0.4" /><stop offset="50%" style="stop-color:%23f5576c;stop-opacity:0.6" /><stop offset="100%" style="stop-color:%234facfe;stop-opacity:0.4" /></linearGradient></defs><rect width="800" height="450" fill="url(%23grad2)" /><circle cx="200" cy="120" r="70" fill="rgba(255,255,255,0.06)" /><circle cx="600" cy="320" r="90" fill="rgba(255,255,255,0.04)" /><circle cx="350" cy="180" r="50" fill="rgba(255,255,255,0.08)" /></svg>')`
                      }}
                    />
                    
                    {/* Play Button Overlay */}
                    {!video2Playing && (
                      <motion.div
                        className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                        whileHover={{ opacity: 1 }}
                      >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="text-center text-white"
                      >
                        <motion.div
                          className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 mx-auto mb-4"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="w-0 h-0 border-l-[14px] border-l-white border-y-[8px] border-y-transparent ml-1" />
                        </motion.div>
                        <span className="font-medium text-lg">Watch Video</span>
                      </motion.div>
                    </motion.div>
                    )}

                    {/* Video Badge */}
                    <motion.div
                      className="absolute top-6 left-6 px-4 py-2 bg-black/70 backdrop-blur-sm rounded-full text-white text-sm font-medium"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      Cultural Art
                    </motion.div>

                    {/* Duration Badge */}
                    <motion.div
                      className="absolute top-6 right-6 px-3 py-2 bg-accent/80 backdrop-blur-sm rounded-full text-white text-sm font-medium"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      ▶ 9:09
                    </motion.div>

                    {/* Click Handler */}
                    <div 
                      className="absolute inset-0 cursor-pointer z-10"
                      onClick={() => handleVideoClick(2)}
                    />
                    
                    {/* Dynamic Video Container */}
                    <div className="absolute inset-0">
                      {video2Playing ? (
                        <div className="relative w-full h-full">
                          <iframe
                            src="https://www.youtube.com/embed/mepKFi2CeMA?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0&fs=1&t=549&enablejsapi=1"
                            title="NujuumArts talks to us about modern Somali art"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="w-full h-full"
                            onLoad={() => {
                              // Listen for messages from the iframe to detect when video is paused
                              const handleMessage = (event: MessageEvent) => {
                                if (event.origin !== 'https://www.youtube.com') return;
                                
                                try {
                                  const data = JSON.parse(event.data);
                                  if (data.event === 'video-progress' && data.info?.playerState === 2) {
                                    // Video is paused (playerState 2)
                                    // Don't automatically close, let user control
                                  }
                                } catch (e) {
                                  // Ignore parsing errors
                                }
                              };
                              
                              window.addEventListener('message', handleMessage);
                              return () => window.removeEventListener('message', handleMessage);
                            }}
                          />
                          
                          {/* Close Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setVideo2Playing(false);
                            }}
                            className="absolute top-4 right-4 w-10 h-10 bg-black/70 hover:bg-black/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white z-20 transition-all duration-200"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* Video Info - Product Card Style */}
                  <div className="p-8">
                    {/* Rating Stars */}
                    <motion.div 
                      className="flex items-center gap-1 mb-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            delay: 0.6 + i * 0.1,
                            duration: 0.3,
                            ease: "easeOut"
                          }}
                        >
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">(95 views)</span>
                    </motion.div>

                    {/* Video Title */}
                    <motion.h3 
                      className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      NujuumArts talks to us about modern Somali art
                    </motion.h3>

                    {/* Video Description */}
                    <motion.p 
                      className="text-muted-foreground mb-6 line-clamp-2 text-lg"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      An insightful conversation about the evolution and significance of contemporary Somali art and cultural expression.
                    </motion.p>

                    {/* Action Button */}
                    <motion.div 
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
                          Interview
                        </span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors px-6 py-3"
                      >
                        <Eye className="mr-2 h-5 w-5" />
                        Watch Now
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                onClick={() => onNavigate('shop')}
                className="px-8 py-6 rounded-full text-lg group shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Eye className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Start Your Transformation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section 
        ref={featuresRef}
        id="features-section"
        className="py-24 relative overflow-hidden"
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5" />
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), 
                             radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 40% 80%, rgba(120, 200, 255, 0.1) 0%, transparent 50%)`
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 to-accent/20 backdrop-blur-sm rounded-full mb-6 border border-primary/10"
            >
              <Zap className="h-5 w-5 text-primary" />
              <span className="font-medium text-primary">Why Choose Nujuum Arts</span>
            </motion.div>

            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              The Nujuum Experience
            </motion.h2>

            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              We're committed to bringing you the finest art with exceptional service, 
              unmatched quality, and an experience that transforms your space into a masterpiece.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group"
                whileHover={{ y: -15, scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Card className={`text-center h-full border-none shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br ${feature.color} backdrop-blur-sm relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <CardContent className="p-10 relative z-10">
                    <motion.div 
                      className="mb-8"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <div className="relative w-20 h-20 mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                          <feature.icon className="h-10 w-10 text-primary" />
                        </div>
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-primary/20"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                          className="absolute inset-2 rounded-full border border-primary/10"
                          animate={{ rotate: -360 }}
                          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                    </motion.div>

                    <motion.h3 
                      className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {feature.title}
                    </motion.h3>

                    <motion.p 
                      className="text-muted-foreground leading-relaxed text-lg"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {feature.description}
                    </motion.p>

                    {/* Decorative elements */}
                    <motion.div
                      className="absolute top-4 right-4 w-2 h-2 bg-primary/20 rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    />
                    <motion.div
                      className="absolute bottom-4 left-4 w-1 h-1 bg-accent/40 rounded-full"
                      animate={{ scale: [1, 2, 1], opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.7 }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action in Features */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                onClick={() => onNavigate('about')}
                className="px-8 py-6 rounded-full text-lg group shadow-lg hover:shadow-xl transition-all duration-300"
                variant="outline"
              >
                <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Learn Our Story
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Background Decorations */}
        <motion.div
          className="absolute top-32 left-16 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 20, 0],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-32 right-16 w-52 h-52 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, -25, 0],
            y: [0, 15, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-primary/5 to-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </section>

      {/* Enhanced Featured Products Section */}
      <section 
        ref={productsRef}
        id="featured-section" 
        className="py-24 relative overflow-hidden"
      >
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(600px circle at 25% 25%, rgba(29, 78, 216, 0.05), transparent 50%),
              radial-gradient(400px circle at 75% 75%, rgba(236, 72, 153, 0.05), transparent 50%)
            `
          }}
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 backdrop-blur-sm rounded-full mb-6 border border-primary/10"
            >
              <Heart className="h-5 w-5 text-primary" />
              <span className="font-medium text-primary">Curated Collection</span>
            </motion.div>

            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Featured Artworks
              </span>
            </motion.h2>

            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Discover our hand-picked collection of exceptional pieces that transform spaces 
              into galleries of inspiration and wonder.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              // Loading skeleton
              [...Array(3)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <Card className="overflow-hidden border-none shadow-lg bg-card/80">
                    <div className="aspect-square bg-muted" />
                    <CardContent className="p-6">
                      <div className="h-4 bg-muted rounded mb-2" />
                      <div className="h-4 bg-muted rounded w-3/4 mb-4" />
                      <div className="h-8 bg-muted rounded" />
                    </CardContent>
                  </Card>
                </div>
              ))
            ) : (
              featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.2,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="overflow-hidden group cursor-pointer border-none shadow-lg hover:shadow-2xl transition-all duration-500 bg-card/80 backdrop-blur-sm" onClick={() => onNavigate('shop')}>
                    <div className="aspect-square overflow-hidden relative">
                      <motion.img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Type Badge */}
                      <motion.div
                        className="absolute top-4 left-4 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-white text-xs font-medium"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 + 0.5 }}
                      >
                        {product.category}
                      </motion.div>

                      {/* Discount Badge */}
                      {product.discount && product.discount > 0 && (
                        <motion.div
                          className="absolute top-4 right-4 px-2 py-1 bg-red-500 backdrop-blur-sm rounded-full text-white text-xs font-medium"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.2 + 0.6 }}
                        >
                          -{product.discount}%
                        </motion.div>
                      )}

                      {/* Hover Overlay - Original Beautiful Style */}
                      <motion.div
                        className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                        whileHover={{ opacity: 1 }}
                      >
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileHover={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                          className="text-center text-white"
                        >
                          <Eye className="h-8 w-8 mx-auto mb-2" />
                          <span className="font-medium">View Details</span>
                        </motion.div>
                      </motion.div>
                    </div>

                    <CardContent className="p-6">
                      {/* Star Rating - Original Beautiful Style */}
                      <motion.div 
                        className="flex items-center gap-1 mb-3"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.2 + 0.3 }}
                      >
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            transition={{ 
                              delay: index * 0.2 + 0.4 + i * 0.1,
                              duration: 0.3,
                              ease: "easeOut"
                            }}
                          >
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          </motion.div>
                        ))}
                        <span className="text-sm text-muted-foreground ml-2">(42 reviews)</span>
                      </motion.div>

                      {/* Product Title - Original Beautiful Style */}
                      <motion.h3 
                        className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 + 0.4 }}
                      >
                        {product.name}
                      </motion.h3>

                      {/* Product Description - Original Beautiful Style */}
                      <motion.p 
                        className="text-muted-foreground mb-4 line-clamp-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.2 + 0.5 }}
                      >
                        {product.description}
                      </motion.p>

                      {/* Price and Button - Original Beautiful Style with New Data */}
                      <motion.div 
                        className="flex items-center justify-between"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 + 0.6 }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                            ${product.price}
                          </span>
                          {product.original_price && product.original_price > product.price && (
                            <span className="text-sm text-muted-foreground line-through">
                              ${product.original_price}
                            </span>
                          )}
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate('shop');
                          }}
                          className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        >
                          <Eye className="mr-1 h-4 w-4" />
                          View
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                onClick={() => onNavigate('shop')}
                className="px-8 py-6 rounded-full text-lg group"
              >
                <Palette className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                View All Artworks
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4"
            >
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">Transform Your Space</span>
            </motion.div>

            <motion.h2 
              className="text-3xl md:text-5xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Ready to Make Your Home{' '}
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Amazing?
              </span>
            </motion.h2>

            <motion.p 
              className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Join thousands of art lovers who have already discovered their perfect piece and transformed their spaces into galleries of inspiration.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => onNavigate('shop')}
                  className="px-8 py-6 rounded-full text-lg group"
                >
                  <Palette className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Browse Collection
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate('contact')}
                  className="px-8 py-6 rounded-full text-lg border-white/30 text-white hover:bg-white hover:text-primary backdrop-blur-sm"
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Get in Touch
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 mt-16 border-t border-white/20"
            >
              <div className="text-center">
                <motion.div 
                  className="text-3xl md:text-4xl font-bold mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 1, type: "spring" }}
                  viewport={{ once: true }}
                >
                  98%
                </motion.div>
                <div className="text-white/80">Customer Satisfaction</div>
              </div>
              <div className="text-center">
                <motion.div 
                  className="text-3xl md:text-4xl font-bold mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.1, type: "spring" }}
                  viewport={{ once: true }}
                >
                  24/7
                </motion.div>
                <div className="text-white/80">Support Available</div>
              </div>
              <div className="text-center">
                <motion.div 
                  className="text-3xl md:text-4xl font-bold mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2, type: "spring" }}
                  viewport={{ once: true }}
                >
                  Free
                </motion.div>
                <div className="text-white/80">Worldwide Shipping</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}