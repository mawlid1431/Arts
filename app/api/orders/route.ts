import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { sendOrderNotification } from '@/lib/email';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const customerEmail = searchParams.get('customer_email');

    let query = supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id,
          quantity,
          price,
          product_id,
          products (
            id,
            name,
            image,
            category
          )
        )
      `)
      .order('created_at', { ascending: false });

    if (customerEmail) {
      query = query.eq('customer_email', customerEmail);
    }

    const { data: orders, error } = await query;

    if (error) {
      console.error('Error fetching orders:', error);
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }

    return NextResponse.json({ orders: orders || [] });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { 
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      paymentMethod,
      items,
      subtotal,
      shipping,
      total 
    } = body;

    // Basic validation
    if (!customerName || !customerEmail || !shippingAddress || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: customerName, customerEmail, shippingAddress, items' }, 
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Create the order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        shipping_address: shippingAddress,
        payment_method: paymentMethod || 'pending',
        subtotal,
        shipping: shipping || 0,
        total,
        status: 'pending',
      }])
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    // Create order items
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Error creating order items:', itemsError);
      // Rollback order creation
      await supabase.from('orders').delete().eq('id', order.id);
      return NextResponse.json({ error: 'Failed to create order items' }, { status: 500 });
    }

    // Try to get product details for email notification
    const productIds = items.map((item: any) => item.productId);
    let products: any[] = [];
    
    try {
      const { data: productsData } = await supabase
        .from('products')
        .select('id, name, category')
        .in('id', productIds);
      
      if (productsData) {
        products = productsData;
      }
    } catch (productError) {
      console.log('Could not fetch product details from database, using cart data');
    }

    // Prepare email data - use cart data as fallback if products not in DB
    const emailItems = items.map((item: any) => {
      const product = products.find(p => p.id === item.productId);
      return {
        name: product?.name || item.name || `Product ${item.productId}`,
        category: product?.category || 'Canvas Painting', // Default category
        quantity: item.quantity,
        price: item.price
      };
    });

    // Send email notification
    try {
      const emailResult = await sendOrderNotification({
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        items: emailItems,
        subtotal,
        shipping: shipping || 0,
        total,
        orderId: order.id
      });

      if (!emailResult.success) {
        console.error('Email notification failed:', emailResult.error);
        // Don't fail the order creation if email fails
      }
    } catch (emailError) {
      console.error('Failed to send order notification email:', emailError);
      // Don't fail the order creation if email fails
    }

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}