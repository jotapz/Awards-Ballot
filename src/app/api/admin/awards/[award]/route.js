import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/server/adminAuth";
import { isAwardSlug } from "@/lib/awards";
import { getActiveEdition, saveEdition } from "@/lib/server/editionsRepository";

export const dynamic = "force-dynamic";

/** Devolve a resposta de erro quando a requisição não pode seguir, ou null. */
async function validar(params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const { award } = await params;
  if (!isAwardSlug(award)) {
    return NextResponse.json({ error: "Premiação desconhecida." }, { status: 404 });
  }

  return null;
}

export async function GET(_request, { params }) {
  const impedimento = await validar(params);
  if (impedimento) return impedimento;

  const { award } = await params;

  try {
    return NextResponse.json(await getActiveEdition(award));
  } catch (falha) {
    return NextResponse.json({ error: falha.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const impedimento = await validar(params);
  if (impedimento) return impedimento;

  const { award } = await params;

  try {
    return NextResponse.json(await saveEdition(award, await request.json()));
  } catch (falha) {
    return NextResponse.json({ error: falha.message }, { status: 400 });
  }
}
