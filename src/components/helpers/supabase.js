import { createClient } from "@supabase/supabase-js";
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;

const connection = createClient(supabaseUrl, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3bm1tc2thYWZyY3htcXVpcmhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDkwODE4NzYsImV4cCI6MTk2NDY1Nzg3Nn0.-OGv0WVgx2gBl-Sxavd6GxaupqZ_qQ0njwJ7w9ZEsIw");
export default connection;