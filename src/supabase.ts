import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bxbsrdhxulubllidvolk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4YnNyZGh4dWx1YmxsaWR2b2xrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDkxMDY2MywiZXhwIjoyMDY2NDg2NjYzfQ.6_r9GooT8DLfN6ne_brfpKlkraGTXhUILcMnsDk7hyU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
