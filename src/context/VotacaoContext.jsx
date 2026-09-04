"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AWARD_SLUGS, isAwardSlug } from "@/lib/awards";

const STORAGE_KEY = "awards-ballot:v1";

const VotacaoContext = createContext(null);

const votosVazios = () => Object.fromEntries(AWARD_SLUGS.map((slug) => [slug, {}]));

/** Versões antigas guardavam um objeto por voto; hoje basta o id do indicado. */
const normalizarVotos = (salvos = {}) =>
  Object.fromEntries(
    AWARD_SLUGS.map((slug) => {
      const escolhas = Object.entries(salvos[slug] ?? {}).map(([categoria, voto]) => [
        categoria,
        typeof voto === "string" ? voto : voto?.nomineeId,
      ]);

      return [slug, Object.fromEntries(escolhas.filter(([, id]) => id))];
    })
  );

export const VotacaoProvider = ({ children }) => {
  const [votos, setVotos] = useState(votosVazios);
  const [nome, setNome] = useState("");
  const [awardAtual, setAwardAtual] = useState(AWARD_SLUGS[0]);
  const [hidratado, setHidratado] = useState(false);

  useEffect(() => {
    try {
      const salvo = window.localStorage.getItem(STORAGE_KEY);
      if (salvo) {
        const { votos: votosSalvos, nome: nomeSalvo, award } = JSON.parse(salvo);
        setVotos(normalizarVotos(votosSalvos));
        setNome(nomeSalvo ?? "");
        if (isAwardSlug(award)) setAwardAtual(award);
      }
    } catch {
      // Sem localStorage (modo privado), a votação vale apenas nesta sessão.
    }

    setHidratado(true);
  }, []);

  useEffect(() => {
    if (!hidratado) return;

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ votos, nome, award: awardAtual })
      );
    } catch {
      // Sem localStorage (modo privado), a votação vale apenas nesta sessão.
    }
  }, [votos, nome, awardAtual, hidratado]);

  const votar = useCallback((award, categoriaId, indicadoId) => {
    setVotos((anterior) => {
      const escolhas = { ...(anterior[award] ?? {}) };

      if (escolhas[categoriaId] === indicadoId) delete escolhas[categoriaId];
      else escolhas[categoriaId] = indicadoId;

      return { ...anterior, [award]: escolhas };
    });
  }, []);

  const limparAward = useCallback((award) => {
    setVotos((anterior) => ({ ...anterior, [award]: {} }));
  }, []);

  const votosDoAward = useCallback((award) => votos[award] ?? {}, [votos]);

  const valor = useMemo(
    () => ({ votosDoAward, votar, limparAward, nome, setNome, awardAtual, setAwardAtual }),
    [votosDoAward, votar, limparAward, nome, awardAtual]
  );

  return <VotacaoContext.Provider value={valor}>{children}</VotacaoContext.Provider>;
};

export const useVotacao = () => {
  const contexto = useContext(VotacaoContext);
  if (!contexto) throw new Error("useVotacao precisa estar dentro de VotacaoProvider");
  return contexto;
};
