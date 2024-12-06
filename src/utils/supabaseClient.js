import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_CENTRAL_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_CENTRAL_KEY;
export const centralSupabase = createClient(supabaseUrl, supabaseKey, {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
