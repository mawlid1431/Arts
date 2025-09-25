import { NextRequest, NextResponse } from 'next/server';
import { sendOrderNotification } from '@/lib/email';

export async function GET(request: NextRequest) {
  try {
    // For demo purposes, return mock orders from localStorage or empty array
    return NextResponse.json({ orders: [] });
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

    // Generate a simple order ID
    const orderId = `ORD-${Date.now()}`;

    // Create order object (just for response, no database)
    const order = {
      id: orderId,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      shipping_address: shippingAddress,
      payment_method: paymentMethod || 'pending',
      subtotal,
      shipping,
      total,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Prepare email data using cart item information
    const emailItems = items.map((item: any) => ({
      name: item.name || `Product ${item.productId}`,
      category: item.category || 'Canvas Painting', // Default category
      quantity: item.quantity,
      price: item.price
    }));

    // Send email notification (main functionality)
    try {
      const emailResult = await sendOrderNotification({
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        items: emailItems,
        subtotal,
        shipping,
        total,
        orderId
      });

      if (!emailResult.success) {
        console.error('Email notification failed:', emailResult.error);
        return NextResponse.json(
          { error: 'Failed to send order notification email' }, 
          { status: 500 }
        );
      }
    } catch (emailError) {
      console.error('Failed to send order notification email:', emailError);
      return NextResponse.json(
        { error: 'Failed to process order notification' }, 
        { status: 500 }
      );
    }

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}