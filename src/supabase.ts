import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bxbsrdhxulubllidvolk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4YnNyZGh4dWx1YmxsaWR2b2xrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MTA2NjMsImV4cCI6MjA2NjQ4NjY2M30.kazqAK0ZFTvXPw5brsR5DpMRZmyOa_FWeqXm868e-dA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
