import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('=== DEBUGGING SUPABASE CONNECTION ===');
    console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('SUPABASE_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'EXISTS' : 'MISSING');
    console.log('Key length:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length);
    console.log('Key starts with:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20));

    // Try direct connection
    const { createClient } = require('@supabase/supabase-js');
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        error: 'Missing environment variables',
        url: supabaseUrl ? 'PRESENT' : 'MISSING',
        key: supabaseKey ? 'PRESENT' : 'MISSING'
      }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Created Supabase client, testing connection...');

    const { data, error } = await supabase
      .from('products')
      .select('count(*)', { count: 'exact', head: true });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({
        error: 'Supabase connection failed',
        details: error.message,
        code: error.code
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase connection working!',
      productCount: data
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({
      error: 'Connection test failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}