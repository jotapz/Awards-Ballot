"use client";

import { useEffect, useState } from "react";

/** Carrega a edição ativa de uma premiação pela API pública. */
export function useEdicao(award) {
  const [edicao, setEdicao] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const controle = new AbortController();
    setEdicao(null);
    setErro(null);

    const carregar = async () => {
      try {
        const resposta = await fetch(`/api/awards/${award}`, { signal: controle.signal });
        const dados = await resposta.json();

        if (!resposta.ok) throw new Error(dados.error);
        setEdicao(dados);
      } catch (falha) {
        if (falha.name !== "AbortError") setErro(falha.message);
      }
    };

    carregar();

    return () => controle.abort();
  }, [award]);

  return { edicao, erro };
}
