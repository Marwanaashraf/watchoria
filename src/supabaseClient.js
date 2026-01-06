import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
export const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
  },
});
