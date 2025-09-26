import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, Mail, CheckCircle, X, Clock, Package } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { mockOrders } from '../../lib/mock-data';
import { Order } from '../../types';

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Load orders from localStorage and merge with mock data
    const storedOrders = JSON.parse(localStorage.getItem('nujuum-orders') || '[]');
    const allOrders = [...mockOrders, ...storedOrders];
    
    // Remove duplicates based on orderId
    const uniqueOrders = allOrders.filter((order, index, self) => 
      index === self.findIndex(o => o.orderId === order.orderId)
    );
    
    setOrders(uniqueOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer_email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reviewing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'accepted': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'fulfilled': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'reviewing': return Clock;
      case 'accepted': return CheckCircle;
      case 'fulfilled': return Package;
      case 'rejected': return X;
      default: return Clock;
    }
  };

    const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setOrders(orders.map(order => 
          (order.orderId || order.id) === orderId ? { ...order, status: newStatus as any } : order
        ));
        
        // Update selected order if it's the one being updated
        if (selectedOrder && (selectedOrder.orderId || selectedOrder.id) === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus as any });
        }
      }
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  const orderStats = {
    total: orders.length,
    reviewing: orders.filter(o => o.status === 'reviewing' || o.status === 'pending').length,
    accepted: orders.filter(o => o.status === 'accepted' || o.status === 'processing').length,
    fulfilled: orders.filter(o => o.status === 'fulfilled' || o.status === 'delivered').length,
    rejected: orders.filter(o => o.status === 'rejected' || o.status === 'cancelled').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Orders</h1>
        <p className="text-muted-foreground">
          Manage customer orders and update their status
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-4"
      >
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{orderStats.total}</div>
            <div className="text-sm text-muted-foreground">Total Orders</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{orderStats.reviewing}</div>
            <div className="text-sm text-muted-foreground">Reviewing</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{orderStats.accepted}</div>
            <div className="text-sm text-muted-foreground">Accepted</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{orderStats.fulfilled}</div>
            <div className="text-sm text-muted-foreground">Fulfilled</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{orderStats.rejected}</div>
            <div className="text-sm text-muted-foreground">Rejected</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search orders, customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="reviewing">Reviewing</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="fulfilled">Fulfilled</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Orders List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No orders found</h3>
              <p className="text-muted-foreground">
                {searchQuery || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'Orders will appear here when customers make purchases.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order, index) => {
              const StatusIcon = getStatusIcon(order.status);
              
              return (
                <motion.div
                  key={order.orderId || order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{order.orderId || order.id}</h3>
                            <Badge className={getStatusColor(order.status)}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {order.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Customer</p>
                              <p className="font-medium">{order.customer?.name || order.customer_name}</p>
                              <p className="text-muted-foreground">{order.customer?.email || order.customer_email}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Order Details</p>
                              <p>{(order.items || order.order_items)?.length || 0} item{((order.items || order.order_items)?.length || 0) !== 1 ? 's' : ''} • ${order.total.toFixed(2)}</p>
                              <p className="text-muted-foreground">
                                {new Date(order.createdAt || order.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          
                          {order.status === 'reviewing' && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleStatusUpdate(order.orderId || order.id, 'accepted')}
                                disabled={isUpdating}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Accept
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleStatusUpdate(order.orderId || order.id, 'rejected')}
                                disabled={isUpdating}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          
                          {order.status === 'accepted' && (
                            <Button
                              size="sm"
                              onClick={() => handleStatusUpdate(order.orderId || order.id, 'fulfilled')}
                              disabled={isUpdating}
                            >
                              <Package className="h-4 w-4 mr-1" />
                              Mark Fulfilled
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Order Details - {selectedOrder?.orderId}
              {selectedOrder && (
                <Badge className={getStatusColor(selectedOrder.status)}>
                  {selectedOrder.status}
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Contact Details</h4>
                      <div className="space-y-1 text-sm">
                        <p><strong>Name:</strong> {selectedOrder.customer?.name || selectedOrder.customer_name}</p>
                        <p><strong>Email:</strong> {selectedOrder.customer?.email || selectedOrder.customer_email}</p>
                        <p><strong>Phone:</strong> {selectedOrder.customer?.phone || selectedOrder.customer_phone}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Shipping Address</h4>
                      <div className="space-y-1 text-sm">
                        <p>{selectedOrder.shipping_address}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(selectedOrder.items || selectedOrder.order_items)?.map((item) => (
                      <div key={item.product_id || item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
                          <img
                            src={item.products?.image || '/placeholder-image.jpg'}
                            alt={item.products?.name || 'Product'}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.products?.name || 'Product'}</h4>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity} × ${item.price}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total</span>
                      <span className="text-lg font-bold">${selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Status Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    {selectedOrder.status === 'reviewing' && (
                      <>
                        <Button
                          onClick={() => handleStatusUpdate(selectedOrder.orderId || selectedOrder.id, 'accepted')}
                          disabled={isUpdating}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Accept Order
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleStatusUpdate(selectedOrder.orderId || selectedOrder.id, 'rejected')}
                          disabled={isUpdating}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Reject Order
                        </Button>
                      </>
                    )}
                    
                    {selectedOrder.status === 'accepted' && (
                      <Button
                        onClick={() => handleStatusUpdate(selectedOrder.orderId || selectedOrder.id, 'fulfilled')}
                        disabled={isUpdating}
                      >
                        <Package className="h-4 w-4 mr-2" />
                        Mark as Fulfilled
                      </Button>
                    )}
                    
                    <Button variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                  </div>
                  
                  {isUpdating && (
                    <p className="text-sm text-muted-foreground mt-3">
                      Updating order status and sending email notification...
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}