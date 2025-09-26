import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { sendContactNotification } from '@/lib/email';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let query = supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data: messages, error } = await query;

    if (error) {
      console.error('Error fetching contact messages:', error);
      return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }

    return NextResponse.json({ messages: messages || [] });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

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

    const supabase = await createClient();

    // Save to database
    const { data: contactMessage, error: dbError } = await supabase
      .from('contact_messages')
      .insert([{
        name,
        email,
        phone,
        subject,
        message,
        status: 'new'
      }])
      .select()
      .single();

    if (dbError) {
      console.error('Error saving contact message:', dbError);
      // Continue with email even if database save fails
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
      message: 'Contact form submitted successfully',
      id: contactMessage?.id || 'email-only'
    }, { status: 200 });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}