import { categoriesData as oscarData } from "@/data/oscar";
import { categoriesData as grammyData } from "@/data/grammys";
import { categoriesData as gglobeData } from "@/data/goldenGlobes";

export const AWARDS = {
  oscar: {
    slug: "oscar",
    label: "Oscar",
    icon: "estatueta",
    seed: oscarData,
  },
  grammys: {
    slug: "grammys",
    label: "Grammys",
    icon: "gramofone",
    seed: grammyData,
  },
  "golden-globes": {
    slug: "golden-globes",
    label: "Golden Globes",
    icon: "golden-globe",
    seed: gglobeData,
  },
};

export const AWARD_SLUGS = Object.keys(AWARDS);

export const isAwardSlug = (slug) => Object.hasOwn(AWARDS, slug);

const slugify = (value) =>
  String(value)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const anoDoNome = (nome) => {
  const encontrado = /\d{4}/.exec(nome ?? "");
  return encontrado ? Number(encontrado[0]) : new Date().getFullYear();
};

/** Dados estáticos no mesmo formato do banco, usados quando não há Supabase. */
export function seedEdition(slug) {
  const award = AWARDS[slug];
  if (!award) return null;

  return {
    award: slug,
    awardsName: award.seed.awardsName,
    year: anoDoNome(award.seed.awardsName),
    categories: (award.seed.categories ?? []).map((categoria, indice) => ({
      id: `seed-${slug}-${slugify(categoria.category)}-${indice}`,
      category: categoria.category,
      explanation: categoria.explanation ?? "",
      lastWinnerDescription: categoria.lastWinnerDescription ?? "",
      nominees: (categoria.nominees ?? []).map((indicado, posicao) => ({
        id: `seed-${slug}-${indice}-${posicao}`,
        name: indicado.name,
        description: indicado.description ?? "",
      })),
    })),
  };
}
