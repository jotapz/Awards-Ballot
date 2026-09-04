import { NextResponse } from "next/server";
import { checkPassword, isAdminEnabled, startAdminSession } from "@/lib/server/adminAuth";

export async function POST(request) {
  if (!isAdminEnabled()) {
    return NextResponse.json(
      { error: "Painel admin desativado: defina ADMIN_PASSWORD no .env.local." },
      { status: 503 }
    );
  }

  const { password } = await request.json().catch(() => ({}));

  if (!checkPassword(password)) {
    return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
  }

  await startAdminSession();
  return NextResponse.json({ ok: true });
}
