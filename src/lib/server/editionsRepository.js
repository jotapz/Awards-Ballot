import { AWARDS, seedEdition } from "@/lib/awards";
import { getSupabase } from "@/lib/server/supabase";

const ordenarPorPosicao = (a, b) => a.position - b.position;

const paraEdicao = (linha) => ({
  id: linha.id,
  award: linha.award,
  awardsName: linha.name,
  year: linha.year,
  categories: [...(linha.categories ?? [])].sort(ordenarPorPosicao).map((categoria) => ({
    id: categoria.id,
    category: categoria.name,
    explanation: categoria.explanation ?? "",
    lastWinnerDescription: categoria.last_winner_description ?? "",
    nominees: [...(categoria.nominees ?? [])].sort(ordenarPorPosicao).map((indicado) => ({
      id: indicado.id,
      name: indicado.name,
      description: indicado.description ?? "",
    })),
  })),
});

const falharSe = (error) => {
  if (error) throw new Error(error.message);
};

export async function getActiveEdition(slug) {
  const seed = seedEdition(slug);
  if (!seed) return null;

  const supabase = getSupabase();
  if (!supabase) return seed;

  const { data, error } = await supabase
    .from("editions")
    .select(
      `id, award, year, name,
       categories ( id, name, explanation, last_winner_description, position,
         nominees ( id, name, description, position ) )`
    )
    .eq("award", slug)
    .eq("is_active", true)
    .maybeSingle();

  falharSe(error);

  return data ? paraEdicao(data) : seed;
}

async function garantirEdicao(supabase, slug, year, name) {
  const { data: existente } = await supabase
    .from("editions")
    .select("id")
    .eq("award", slug)
    .eq("year", year)
    .maybeSingle();

  if (existente) {
    const { error } = await supabase
      .from("editions")
      .update({ name, is_active: true })
      .eq("id", existente.id);
    falharSe(error);
    return existente.id;
  }

  // O índice único parcial só admite uma edição ativa por premiação.
  await supabase
    .from("editions")
    .update({ is_active: false })
    .eq("award", slug)
    .eq("is_active", true);

  const { data, error } = await supabase
    .from("editions")
    .insert({ award: slug, year, name, is_active: true })
    .select("id")
    .single();
  falharSe(error);

  return data.id;
}

async function inserirCategorias(supabase, editionId, categorias) {
  const { data, error } = await supabase
    .from("categories")
    .insert(
      categorias.map((categoria, indice) => ({
        edition_id: editionId,
        name: categoria.category.trim(),
        explanation: categoria.explanation?.trim() ?? "",
        last_winner_description: categoria.lastWinnerDescription?.trim() ?? "",
        position: indice,
      }))
    )
    .select("id, position");
  falharSe(error);

  return new Map(data.map((categoria) => [categoria.position, categoria.id]));
}

async function inserirIndicados(supabase, categorias, idPorPosicao) {
  const linhas = categorias.flatMap((categoria, indice) =>
    (categoria.nominees ?? [])
      .filter((indicado) => indicado.name?.trim())
      .map((indicado, posicao) => ({
        category_id: idPorPosicao.get(indice),
        name: indicado.name.trim(),
        description: indicado.description?.trim() ?? "",
        position: posicao,
      }))
  );

  if (linhas.length === 0) return;

  const { error } = await supabase.from("nominees").insert(linhas);
  falharSe(error);
}

/**
 * Reescreve a edição ativa por completo (as categorias antigas caem em cascata),
 * o que preserva exatamente a ordem definida na tela de admin.
 */
export async function saveEdition(slug, payload) {
  const supabase = getSupabase();
  if (!supabase) {
    throw new Error(
      "Supabase não configurado. Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY."
    );
  }
  if (!AWARDS[slug]) throw new Error(`Premiação desconhecida: ${slug}`);

  const year = Number(payload.year) || new Date().getFullYear();
  const name = payload.awardsName?.trim() || `${AWARDS[slug].label} ${year}`;
  const editionId = await garantirEdicao(supabase, slug, year, name);

  const { error } = await supabase.from("categories").delete().eq("edition_id", editionId);
  falharSe(error);

  const categorias = (payload.categories ?? []).filter((categoria) =>
    categoria.category?.trim()
  );

  if (categorias.length > 0) {
    const idPorPosicao = await inserirCategorias(supabase, editionId, categorias);
    await inserirIndicados(supabase, categorias, idPorPosicao);
  }

  return getActiveEdition(slug);
}
