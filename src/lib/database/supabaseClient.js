// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// 1. Leer variables de entorno (REACT_APP_*)
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// 2. Validar que existan (evita errores silenciosos en producción)
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
        'Faltan las variables de entorno REACT_APP_SUPABASE_URL o REACT_APP_SUPABASE_ANON_KEY en el archivo .env'
    );
}

// 3. Crear y exportar el cliente único (singleton)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);