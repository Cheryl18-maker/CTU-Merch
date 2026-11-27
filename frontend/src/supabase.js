import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://aograbohxutnakmcnrgm.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseConfigured = Boolean(supabase && supabaseAnonKey);

/**
 * Fetch products from Supabase, or returns null if not configured / error
 */
export async function fetchSupabaseProducts() {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('price', { ascending: true });
    if (error) {
      console.warn('Supabase products query returned error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase fetch products error:', err);
    return null;
  }
}

/**
 * Fetch user profile from Supabase
 */
export async function fetchSupabaseUserProfile(userId = 'CTU-2024-08219') {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

/**
 * Record a kiosk order in Supabase
 */
export async function createSupabaseOrder(orderData) {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();
    if (error) {
      console.warn('Supabase insert order error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase order creation error:', err);
    return null;
  }
}
