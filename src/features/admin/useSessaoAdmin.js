"use client";

import { useCallback, useEffect, useState } from "react";

const SESSAO_DESLIGADA = { enabled: false, authenticated: false, supabase: false };

export function useSessaoAdmin() {
  const [sessao, setSessao] = useState(null);

  useEffect(() => {
    fetch("/api/admin/session")
      .then((resposta) => resposta.json())
      .then(setSessao)
      .catch(() => setSessao(SESSAO_DESLIGADA));
  }, []);

  const entrar = useCallback(async (senha) => {
    const resposta = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: senha }),
    });
    const dados = await resposta.json();

    if (!resposta.ok) throw new Error(dados.error ?? "Falha no login.");

    setSessao((anterior) => ({ ...anterior, authenticated: true }));
  }, []);

  const sair = useCallback(async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setSessao((anterior) => ({ ...anterior, authenticated: false }));
  }, []);

  return { sessao, entrar, sair };
}
