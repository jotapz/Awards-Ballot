import { NextResponse } from "next/server";
import { isAwardSlug } from "@/lib/awards";
import { getActiveEdition } from "@/lib/server/editionsRepository";

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  const { award } = await params;

  if (!isAwardSlug(award)) {
    return NextResponse.json({ error: "Premiação desconhecida." }, { status: 404 });
  }

  try {
    return NextResponse.json(await getActiveEdition(award));
  } catch (falha) {
    return NextResponse.json({ error: falha.message }, { status: 500 });
  }
}
