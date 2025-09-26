'use client';

import React from 'react';
import { Package, ShoppingCart, DollarSign, TrendingUp, Clock, CheckCircle, X, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { useDashboard } from '../../hooks/useDashboard';

export function OverviewPage() {
  const { dashboardData, loading, error, refreshDashboard } = useDashboard();

  const stats = [
    {
      title: 'Total Products',
      value: dashboardData.totalProducts,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      title: 'Pending Orders',
      value: dashboardData.pendingOrders,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20'
    },
    {
      title: 'Accepted Orders',
      value: dashboardData.acceptedOrders,
      icon: CheckCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      title: 'Fulfilled Orders',
      value: dashboardData.fulfilledOrders,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      title: 'Rejected Orders',
      value: dashboardData.rejectedOrders,
      icon: X,
      color: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900/20'
    },
    {
      title: 'Total Revenue',
      value: `$${dashboardData.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    }
  ];

  const recentOrders = dashboardData.recentOrders || [];
  const lowStockProducts = dashboardData.lowStockProducts || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reviewing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'accepted': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'fulfilled': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome to Nujuum Arts Admin</h1>
          <p className="text-gray-600 mt-2">Here's a real-time overview of your art business performance.</p>
        </div>
        <button
          onClick={refreshDashboard}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => (
          <div key={stat.title}>
            <Card className={loading ? 'opacity-50' : ''}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">
                      {loading ? '...' : stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Recent Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <RefreshCw className="h-8 w-8 mx-auto mb-4 animate-spin" />
                    <p>Loading recent orders...</p>
                  </div>
                ) : recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">#{order.id.substring(0, 8)}</span>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {order.customer_name} • {order.order_items?.length || 0} item{(order.order_items?.length || 0) !== 1 ? 's' : ''}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No recent orders</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Low Stock Alert */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Low Stock Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <RefreshCw className="h-8 w-8 mx-auto mb-4 animate-spin" />
                    <p>Checking inventory...</p>
                  </div>
                ) : lowStockProducts.length > 0 ? (
                  lowStockProducts.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">${product.price}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="destructive">
                          Out of Stock
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>All products are in stock</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg text-center">
                <Package className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-medium mb-1">Add New Product</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Add a new artwork to your collection
                </p>
                <button className="text-sm text-primary hover:underline">
                  Add Product →
                </button>
              </div>
              
              <div className="p-4 border rounded-lg text-center">
                <ShoppingCart className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-medium mb-1">Process Orders</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Review and update order statuses
                </p>
                <button className="text-sm text-primary hover:underline">
                  View Orders →
                </button>
              </div>
              
              <div className="p-4 border rounded-lg text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-medium mb-1">View Analytics</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Check sales performance and trends
                </p>
                <button className="text-sm text-primary hover:underline">
                  View Reports →
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default OverviewPage;