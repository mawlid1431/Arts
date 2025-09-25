'use client';

import { useState, useEffect } from 'react';
import { Order } from '@/types';
import { ordersApi } from '@/utils/api/client';

export function useOrders(userId?: string) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ordersApi.getAll(userId);
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  return {
    orders,
    loading,
    error,
    refetch: fetchOrders,
  };
}

export function useOrder(id: string) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ordersApi.getById(id);
      setOrder(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch order');
      console.error('Error fetching order:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchOrder();
    }
  }, [id]);

  const updateOrderStatus = async (updates: {
    status?: string;
    paymentMethod?: string;
    trackingNumber?: string;
  }) => {
    try {
      const updatedOrder = await ordersApi.updateStatus(id, updates);
      setOrder(updatedOrder);
      return updatedOrder;
    } catch (err) {
      throw err;
    }
  };

  return {
    order,
    loading,
    error,
    refetch: fetchOrder,
    updateStatus: updateOrderStatus,
  };
}