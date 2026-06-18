import { createClient } from '@supabase/supabase-js';

console.log("DEBUG ENV COMPLETO:", process.env);
console.log("DEBUG URL:", process.env.REACT_APP_SUPABASE_URL);

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL o Anon Key faltante. Asegúrate de configurar tu archivo .env correctamente.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
