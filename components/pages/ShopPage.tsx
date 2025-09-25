import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, Star, ShoppingCart, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription } from '../ui/alert';
import { useCartContext } from '../../contexts/CartContext';
import { useProducts } from '../../hooks/useProducts';
import { Product } from '../../types';

interface ShopPageProps {
  onNavigate: (page: string) => void;
}

export function ShopPage({ onNavigate }: ShopPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { addToCart, isInCart } = useCartContext();
  const { products, loading, error, refetch } = useProducts();

  const artTypes = ['all', 'Painting', 'Print', 'Illustration', 'Photography', 'Digital Art'];
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name A-Z' }
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'all' || product.category === selectedType;
      return matchesSearch && matchesType;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    return filtered;
  }, [products, searchQuery, selectedType, sortBy]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Art Collection</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover unique pieces that speak to your soul and transform your space.
          </p>
        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Alert variant="destructive">
              <AlertDescription>
                {error}. 
                <Button 
                  variant="link" 
                  className="p-0 h-auto ml-1" 
                  onClick={refetch}
                >
                  Try again
                </Button>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-20"
          >
            <Loader2 className="h-8 w-8 animate-spin mr-3" />
            <span className="text-lg">Loading artworks...</span>
          </motion.div>
        )}

        {/* Main Content - Only show when not loading */}
        {!loading && (
          <>
            {/* Filters and Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search artworks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Filters */}
                <div className="flex items-center gap-3">
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-40">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {artTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {type === 'all' ? 'All Types' : type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* View Mode Toggle */}
                  <div className="flex border rounded-md">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-r-none"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-l-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? 'artwork' : 'artworks'} found
                </p>
              </div>
            </motion.div>

            {/* Products Grid/List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {filteredAndSortedProducts.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No artworks found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search criteria or browse all artworks.
                  </p>
                  <Button onClick={() => {
                    setSearchQuery('');
                    setSelectedType('all');
                  }}>
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className={viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-6'
                }>
                  {filteredAndSortedProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {viewMode === 'grid' ? (
                        <Card className="overflow-hidden group cursor-pointer h-full">
                          <div 
                            className="aspect-square overflow-hidden"
                            onClick={() => onNavigate(`product/${product.id}`)}
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              ))}
                              <span className="text-xs text-muted-foreground ml-1">(4.8)</span>
                            </div>
                            
                            <Badge variant="secondary" className="mb-2 text-xs">
                              {product.category}
                            </Badge>
                            
                            <h3 
                              className="font-semibold mb-2 line-clamp-1 cursor-pointer hover:text-primary"
                              onClick={() => onNavigate(`product/${product.id}`)}
                            >
                              {product.name}
                            </h3>
                            
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {product.description}
                            </p>
                            
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold">${product.price}</span>
                                {product.original_price && product.discount && product.discount > 0 && (
                                  <>
                                    <span className="text-sm text-muted-foreground line-through">
                                      ${product.original_price}
                                    </span>
                                    <Badge variant="destructive" className="text-xs">
                                      -{product.discount}%
                                    </Badge>
                                  </>
                                )}
                              </div>
                              <Button
                                size="sm"
                                onClick={() => handleAddToCart(product)}
                                disabled={isInCart(product.id) || !product.in_stock}
                              >
                                {!product.in_stock ? (
                                  'Out of Stock'
                                ) : isInCart(product.id) ? (
                                  'In Cart'
                                ) : (
                                  <>
                                    <ShoppingCart className="h-4 w-4 mr-1" />
                                    Add
                                  </>
                                )}
                              </Button>
                            </div>
                            
                            {!product.in_stock && (
                              <p className="text-sm text-destructive">
                                Currently out of stock
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      ) : (
                        <Card className="overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            <div 
                              className="w-full md:w-48 h-48 md:h-32 overflow-hidden cursor-pointer"
                              onClick={() => onNavigate(`product/${product.id}`)}
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                              />
                            </div>
                            <CardContent className="flex-1 p-6">
                              <div className="flex flex-col md:flex-row md:items-start justify-between h-full">
                                <div className="flex-1">
                                  <div className="flex items-center gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                    <span className="text-sm text-muted-foreground ml-2">(4.8)</span>
                                    <Badge variant="secondary" className="ml-2">
                                      {product.category}
                                    </Badge>
                                  </div>
                                  
                                  <h3 
                                    className="text-xl font-semibold mb-2 cursor-pointer hover:text-primary"
                                    onClick={() => onNavigate(`product/${product.id}`)}
                                  >
                                    {product.name}
                                  </h3>
                                  
                                  <p className="text-muted-foreground mb-4">
                                    {product.description}
                                  </p>
                                  
                                  {!product.in_stock && (
                                    <p className="text-sm text-destructive">
                                      Currently out of stock
                                    </p>
                                  )}
                                </div>
                                
                                <div className="flex flex-col items-end space-y-3 mt-4 md:mt-0">
                                  <div className="text-right">
                                    <span className="text-2xl font-bold">${product.price}</span>
                                    {product.original_price && product.discount && product.discount > 0 && (
                                      <div className="flex items-center gap-2 mt-1">
                                        <span className="text-lg text-muted-foreground line-through">
                                          ${product.original_price}
                                        </span>
                                        <Badge variant="destructive">
                                          -{product.discount}%
                                        </Badge>
                                      </div>
                                    )}
                                  </div>
                                  <Button
                                    onClick={() => handleAddToCart(product)}
                                    disabled={isInCart(product.id) || !product.in_stock}
                                  >
                                    {!product.in_stock ? (
                                      'Out of Stock'
                                    ) : isInCart(product.id) ? (
                                      'In Cart'
                                    ) : (
                                      <>
                                        <ShoppingCart className="h-4 w-4 mr-2" />
                                        Add to Cart
                                      </>
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </div>
                        </Card>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}