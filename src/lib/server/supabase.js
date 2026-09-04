import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let client = null;

/** Só pode ser usado no servidor: a service role key ignora as políticas de RLS. */
export function getSupabase() {
  if (!url || !serviceKey) return null;

  client ??= createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return client;
}

export const isSupabaseConfigured = () => Boolean(url && serviceKey);
