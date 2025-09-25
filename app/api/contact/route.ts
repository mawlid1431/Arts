import { NextRequest, NextResponse } from 'next/server';
import { sendContactNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, subject } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, message' }, 
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' }, 
        { status: 400 }
      );
    }

    // Send email notification
    try {
      const emailResult = await sendContactNotification({
        name,
        email,
        phone,
        message,
        subject
      });

      if (!emailResult.success) {
        console.error('Email notification failed:', emailResult.error);
        return NextResponse.json(
          { error: 'Failed to send notification email' }, 
          { status: 500 }
        );
      }
    } catch (emailError) {
      console.error('Email notification error:', emailError);
      return NextResponse.json(
        { error: 'Failed to process contact form' }, 
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Contact form submitted successfully' 
    }, { status: 200 });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}