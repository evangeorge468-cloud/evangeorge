const SUPABASE_URL = "https://mqqrjlficdycjhdfjadj.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_9Nmch9OuzTscY9_rX9FFWw_3LtdELgV";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);