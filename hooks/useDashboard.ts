'use client';

import { useState, useEffect, useCallback } from 'react';

interface DashboardStats {
  totalProducts: number;
  pendingOrders: number;
  acceptedOrders: number;
  fulfilledOrders: number;
  rejectedOrders: number;
  totalRevenue: number;
  recentOrders: any[];
  lowStockProducts: any[];
}

export function useDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardStats>({
    totalProducts: 0,
    pendingOrders: 0,
    acceptedOrders: 0,
    fulfilledOrders: 0,
    rejectedOrders: 0,
    totalRevenue: 0,
    recentOrders: [],
    lowStockProducts: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/dashboard');
      
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      
      const data = await response.json();
      setDashboardData(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    
    return () => clearInterval(interval);
  }, [fetchDashboardData]);

  return {
    dashboardData,
    loading,
    error,
    refreshDashboard: fetchDashboardData
  };
}