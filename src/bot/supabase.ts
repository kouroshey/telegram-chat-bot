import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

// Replace with your Supabase URL and anon key from the dashboard
const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl!, supabaseKey!);
