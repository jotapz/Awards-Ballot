import { NextResponse } from "next/server";
import { isAdminAuthenticated, isAdminEnabled } from "@/lib/server/adminAuth";
import { isSupabaseConfigured } from "@/lib/server/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    enabled: isAdminEnabled(),
    authenticated: await isAdminAuthenticated(),
    supabase: isSupabaseConfigured(),
  });
}
