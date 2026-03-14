import { createClient } from '@supabase/supabase-js';

// ✅ Dual fallback for Project URL
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://djoudhyishfnfzpkwnqa.supabase.co";

// ✅ Dual fallback for the modern Publishable Key (Replaces the legacy Anon key)
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_DOJVBy0eb0Nm9iKozVGsjA_q5D65Pqx";

// ✅ Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);