import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, Package, ArrowRight, Home } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { Order } from '../../types';

interface ConfirmationPageProps {
  orderId: string;
  onNavigate: (page: string) => void;
}

export function ConfirmationPage({ orderId, onNavigate }: ConfirmationPageProps) {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Load order from localStorage
    const orders = JSON.parse(localStorage.getItem('nujuum-orders') || '[]');
    const foundOrder = orders.find((o: Order) => o.orderId === orderId);
    setOrder(foundOrder || null);
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
            <p className="text-muted-foreground mb-8">
              We couldn't find the order you're looking for.
            </p>
            <Button onClick={() => onNavigate('home')}>
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="h-10 w-10 text-white" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-600">
            Order Confirmed!
          </h1>
          
          <p className="text-xl text-muted-foreground mb-2">
            Thank you for your order. We've received your request and it's currently under review.
          </p>
          
          <p className="text-lg">
            Order ID: <span className="font-mono font-bold">{order.orderId}</span>
          </p>
        </motion.div>

        {/* What Happens Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                What Happens Next?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold">Order Review</h3>
                    <p className="text-muted-foreground text-sm">
                      Our team will review your order to ensure artwork availability and quality.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold">Email Confirmation</h3>
                    <p className="text-muted-foreground text-sm">
                      You'll receive an email with order status updates and payment instructions.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold">Secure Packaging & Shipping</h3>
                    <p className="text-muted-foreground text-sm">
                      Once approved and payment is received, we'll carefully package and ship your artwork.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.productId} className="flex gap-3">
                    <div className="w-16 h-16 bg-muted rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.qty} × ${item.price}
                      </p>
                      <p className="font-medium">${(item.price * item.qty).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">Contact</h4>
                  <p className="text-muted-foreground">{order.customer.name}</p>
                  <p className="text-muted-foreground">{order.customer.email}</p>
                  <p className="text-muted-foreground">{order.customer.phone}</p>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium">Shipping Address</h4>
                  <p className="text-muted-foreground">{order.customer.address.line1}</p>
                  {order.customer.address.line2 && (
                    <p className="text-muted-foreground">{order.customer.address.line2}</p>
                  )}
                  <p className="text-muted-foreground">
                    {order.customer.address.city}, {order.customer.address.postcode}
                  </p>
                  <p className="text-muted-foreground">{order.customer.address.country}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Email Notification */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                    Check Your Email
                  </h3>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    We've sent a confirmation email to <strong>{order.customer.email}</strong> with your order details and next steps.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button 
            size="lg"
            onClick={() => onNavigate('shop')}
          >
            Continue Shopping
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            onClick={() => onNavigate('home')}
          >
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </Button>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-12 p-6 bg-muted rounded-lg"
        >
          <h3 className="font-semibold mb-2">Need Help?</h3>
          <p className="text-muted-foreground text-sm mb-4">
            If you have any questions about your order, feel free to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm">
            <span>Email: hello@nujuumarts.com</span>
            <span className="hidden sm:inline">•</span>
            <span>Phone: +1 (555) 123-4567</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}