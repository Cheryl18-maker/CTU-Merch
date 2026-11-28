import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://aograbohxutnakmcnrgm.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseConfigured = Boolean(supabase && supabaseAnonKey);

// ─── AUTH ──────────────────────────────────────────────────────────────────────

/**
 * Sign in with email + password via Supabase Auth
 * Returns { user, session, error }
 */
export async function signIn(email, password) {
  if (!supabase) return { error: { message: 'Supabase not configured' } };
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { user: data?.user, session: data?.session, error };
}

/**
 * Sign up a new user and create a profile row
 * Returns { user, error }
 */
export async function signUp(email, password, fullName, studentId) {
  if (!supabase) return { error: { message: 'Supabase not configured' } };
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName, student_id: studentId } }
  });
  if (error) return { error };

  // Insert into profiles table
  if (data?.user) {
    await supabase.from('profiles').upsert({
      id: data.user.id,
      student_id: studentId,
      full_name: fullName,
      email,
      role: 'Student',
      balance: 0,
      points: 0
    });
  }

  return { user: data?.user, error: null };
}

/**
 * Sign out the current user
 */
export async function signOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

/**
 * Get the currently logged-in Supabase auth user (if any)
 */
export async function getCurrentAuthUser() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data?.session?.user ?? null;
}

/**
 * Subscribe to auth state changes (login, logout)
 * callback receives (event, session)
 */
export function onAuthStateChange(callback) {
  if (!supabase) return () => {};
  const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
  return () => subscription.unsubscribe();
}

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────

export async function fetchSupabaseProducts() {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('price', { ascending: true });
    if (error) { console.warn('Supabase products query note:', error.message); return null; }
    return data;
  } catch (err) { console.warn('Supabase fetch products error:', err); return null; }
}

// ─── PROFILES ─────────────────────────────────────────────────────────────────

/**
 * Fetch profile by Supabase auth user ID (uuid)
 */
export async function fetchProfileByAuthId(authUserId) {
  if (!supabase || !authUserId) return null;
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUserId)
      .single();
    if (error) return null;
    return data;
  } catch { return null; }
}

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
  } catch { return null; }
}

// ─── ORDERS ───────────────────────────────────────────────────────────────────

export async function createSupabaseOrder(orderData) {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();
    if (error) { console.warn('Supabase insert order note:', error.message); return null; }
    return data;
  } catch (err) { console.warn('Supabase order creation error:', err); return null; }
}

// ─── REWARDS ──────────────────────────────────────────────────────────────────

export async function fetchSupabaseRewards() {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('rewards')
      .select('*')
      .order('cost', { ascending: true });
    if (error) return null;
    return data;
  } catch { return null; }
}
