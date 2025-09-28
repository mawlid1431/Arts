/**
 * Environment variable validation utility
 * Helps handle missing environment variables gracefully during build
 */

export function getRequiredEnvVar(name: string, fallback?: string): string {
  const value = process.env[name] || fallback;
  
  if (!value) {
    // During build time, just warn instead of throwing
    if (process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV) {
      console.warn(`Warning: Environment variable ${name} is missing`);
      return '';
    }
    throw new Error(`Missing required environment variable: ${name}`);
  }
  
  return value;
}

export function checkSupabaseEnvVars(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key) {
    console.warn('Supabase environment variables are missing');
    return false;
  }
  
  return true;
}