import { createClient } from 'https://esm.sh/@supabase/supabase-js@^1.33.2'

export const supabaseClient = await createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? ''
);