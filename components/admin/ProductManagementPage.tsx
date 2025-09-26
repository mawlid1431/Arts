'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number;
  discount: number;
  image: string;
  category: string;
  in_stock: boolean;
  created_at: string;
  updated_at: string;
}

const ProductManagementPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    original_price: '',
    discount: '',
    image: '',
    category: '',
    in_stock: true
  });

  const supabase = createClient();

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err: any) {
      console.error('Error fetching products:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          original_price: formData.original_price ? parseFloat(formData.original_price) : null,
          discount: formData.discount ? parseInt(formData.discount) : 0,
          image: formData.image,
          category: formData.category,
          in_stock: formData.in_stock
        }])
        .select()
        .single();

      if (error) throw error;
      
      setProducts([data, ...products]);
      resetForm();
      setShowAddForm(false);
    } catch (err: any) {
      alert('Failed to add product: ' + err.message);
    }
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;

    try {
      const { data, error } = await supabase
        .from('products')
        .update({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          original_price: formData.original_price ? parseFloat(formData.original_price) : null,
          discount: formData.discount ? parseInt(formData.discount) : 0,
          image: formData.image,
          category: formData.category,
          in_stock: formData.in_stock
        })
        .eq('id', editingProduct.id)
        .select()
        .single();

      if (error) throw error;

      setProducts(products.map(p => p.id === editingProduct.id ? data : p));
      resetForm();
      setEditingProduct(null);
    } catch (err: any) {
      alert('Failed to update product: ' + err.message);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setProducts(products.filter(p => p.id !== id));
    } catch (err: any) {
      alert('Failed to delete product: ' + err.message);
    }
  };

  const startEditing = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      original_price: product.original_price?.toString() || '',
      discount: product.discount.toString(),
      image: product.image,
      category: product.category,
      in_stock: product.in_stock
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      original_price: '',
      discount: '',
      image: '',
      category: '',
      in_stock: true
    });
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setShowAddForm(false);
    resetForm();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className="p-8">Loading products...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600 mt-2">Add, edit, and manage your art products</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="bg-blue-500 hover:bg-blue-600">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingProduct) && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Canvas Painting">Canvas Painting</SelectItem>
                    <SelectItem value="Fine Art Painting">Fine Art Painting</SelectItem>
                    <SelectItem value="Abstract Art">Abstract Art</SelectItem>
                    <SelectItem value="Portrait Art">Portrait Art</SelectItem>
                    <SelectItem value="Landscape Art">Landscape Art</SelectItem>
                    <SelectItem value="Illustration">Illustration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter product description"
                rows={3}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="price">Price ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="0.00"
                  required
                />
              </div>
              <div>
                <Label htmlFor="original_price">Original Price ($)</Label>
                <Input
                  id="original_price"
                  type="number"
                  step="0.01"
                  value={formData.original_price}
                  onChange={(e) => setFormData(prev => ({ ...prev, original_price: e.target.value }))}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  value={formData.discount}
                  onChange={(e) => setFormData(prev => ({ ...prev, discount: e.target.value }))}
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="image">Image URL *</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="in_stock"
                type="checkbox"
                checked={formData.in_stock}
                onChange={(e) => setFormData(prev => ({ ...prev, in_stock: e.target.checked }))}
                className="rounded"
              />
              <Label htmlFor="in_stock">In Stock</Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={cancelEdit}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={editingProduct ? handleUpdateProduct : handleAddProduct}>
                <Save className="h-4 w-4 mr-2" />
                {editingProduct ? 'Update' : 'Add'} Product
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant={product.in_stock ? "default" : "secondary"}>
                  {product.in_stock ? 'In Stock' : 'Out of Stock'}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.category}</p>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold">${product.price}</span>
                  {product.original_price && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.original_price}
                    </span>
                  )}
                  {product.discount > 0 && (
                    <Badge variant="destructive">{product.discount}% OFF</Badge>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => startEditing(product)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No products yet. Add your first product!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductManagementPage;