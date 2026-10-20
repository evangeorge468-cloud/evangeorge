if (window.supabase && typeof window.supabase.createClient === "function") {
  window.ironHouseSupabase = window.supabase.createClient(
    "https://mqqrjlficdycjhdfjadj.supabase.co",
    "sb_publishable_9Nmch9OuzTscY9_rX9FFWw_3LtdELgV",
    {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    }
  );
}
