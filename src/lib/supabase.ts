import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: { 'x-application-name': 'product-recommendations' }
  },
  db: {
    schema: 'public'
  }
});

// Add error handling for connection issues
supabase.from('washing_machines').select('count').single()
  .then(() => {
    console.log('Successfully connected to Supabase');
  })
  .catch(error => {
    console.error('Error connecting to Supabase:', error.message);
    // You might want to show a user-friendly error message here
  });