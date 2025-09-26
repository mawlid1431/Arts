import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get total products count
    const { count: totalProducts, error: productsError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    if (productsError) {
      console.error('Error fetching products count:', productsError);
      throw productsError;
    }

    // Get orders statistics
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('status, total');

    if (ordersError) {
      console.error('Error fetching orders:', ordersError);
      throw ordersError;
    }

    // Calculate order statistics
    const pendingOrders = orders?.filter(order => 
      order.status === 'pending' || order.status === 'reviewing'
    ).length || 0;

    const acceptedOrders = orders?.filter(order => 
      order.status === 'accepted'
    ).length || 0;

    const fulfilledOrders = orders?.filter(order => 
      order.status === 'fulfilled' || order.status === 'delivered'
    ).length || 0;

    const rejectedOrders = orders?.filter(order => 
      order.status === 'rejected' || order.status === 'cancelled'
    ).length || 0;

    // Calculate total revenue from fulfilled orders
    const totalRevenue = orders
      ?.filter(order => order.status === 'fulfilled' || order.status === 'delivered')
      ?.reduce((sum, order) => sum + (order.total || 0), 0) || 0;

    // Get recent orders (last 5)
    const { data: recentOrders, error: recentOrdersError } = await supabase
      .from('orders')
      .select(`
        id,
        customer_name,
        customer_email,
        status,
        total,
        created_at,
        order_items (
          id,
          quantity,
          price,
          products (
            id,
            name,
            image
          )
        )
      `)
      .order('created_at', { ascending: false })
      .limit(5);

    if (recentOrdersError) {
      console.error('Error fetching recent orders:', recentOrdersError);
      throw recentOrdersError;
    }

    // Get low stock products (assuming we'll track inventory in future)
    const { data: lowStockProducts, error: lowStockError } = await supabase
      .from('products')
      .select('id, name, price, image')
      .eq('in_stock', false)
      .limit(5);

    if (lowStockError) {
      console.error('Error fetching low stock products:', lowStockError);
    }

    const dashboardStats = {
      totalProducts: totalProducts || 0,
      pendingOrders,
      acceptedOrders,
      fulfilledOrders,
      rejectedOrders,
      totalRevenue: Math.round(totalRevenue * 100) / 100, // Round to 2 decimal places
      recentOrders: recentOrders || [],
      lowStockProducts: lowStockProducts || []
    };

    return NextResponse.json(dashboardStats);

  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}