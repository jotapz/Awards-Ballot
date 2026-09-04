"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Download, Loader2, Lock, LogOut, Plus, Save, Upload } from "lucide-react";
import AwardTabs from "@/components/AwardTabs";
import Carregando from "@/components/Carregando";
import CategoriaCard from "@/features/admin/CategoriaCard";
import LoginAdmin from "@/features/admin/LoginAdmin";
import { useSessaoAdmin } from "@/features/admin/useSessaoAdmin";
import {
  categoriaVazia,
  mover,
  removerDe,
  substituirEm,
} from "@/features/admin/edicaoUtils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AdminEditor = () => {
  const { sessao, entrar, sair } = useSessaoAdmin();

  const [award, setAward] = useState("oscar");
  const [edicao, setEdicao] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [aviso, setAviso] = useState(null);
  const [abertas, setAbertas] = useState(() => new Set());

  const inputArquivo = useRef(null);

  const carregar = useCallback(async (slug) => {
    setCarregando(true);
    setAviso(null);

    try {
      const resposta = await fetch(`/api/admin/awards/${slug}`);
      const dados = await resposta.json();

      if (!resposta.ok) throw new Error(dados.error);
      setEdicao(dados);
    } catch (falha) {
      setAviso({ tipo: "erro", texto: falha.message });
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    if (sessao?.authenticated) carregar(award);
  }, [sessao?.authenticated, award, carregar]);

  const alterarCategorias = (categorias) =>
    setEdicao((anterior) => ({ ...anterior, categories: categorias }));

  const salvar = async () => {
    setSalvando(true);
    setAviso(null);

    try {
      const resposta = await fetch(`/api/admin/awards/${award}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(edicao),
      });
      const dados = await resposta.json();

      if (!resposta.ok) throw new Error(dados.error);
      setEdicao(dados);
      setAviso({ tipo: "ok", texto: "Salvo no Supabase." });
    } catch (falha) {
      setAviso({ tipo: "erro", texto: falha.message });
    } finally {
      setSalvando(false);
    }
  };

  const exportar = () => {
    const arquivo = new Blob([JSON.stringify(edicao, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(arquivo);
    link.download = `${award}-${edicao?.year ?? "edicao"}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const importar = async (evento) => {
    const arquivo = evento.target.files?.[0];
    if (!arquivo) return;

    try {
      const conteudo = JSON.parse(await arquivo.text());
      setEdicao((anterior) => ({ ...anterior, ...conteudo, award }));
      setAviso({ tipo: "ok", texto: "JSON carregado. Revise e clique em Salvar." });
    } catch {
      setAviso({ tipo: "erro", texto: "JSON inválido." });
    } finally {
      evento.target.value = "";
    }
  };

  const alternarCategoria = (id) =>
    setAbertas((anterior) => {
      const proximo = new Set(anterior);

      if (proximo.has(id)) proximo.delete(id);
      else proximo.add(id);

      return proximo;
    });

  const adicionarCategoria = () => {
    const nova = categoriaVazia();

    alterarCategorias([...edicao.categories, nova]);
    setAbertas((anterior) => new Set(anterior).add(nova.id));
  };

  if (!sessao) return <Carregando />;

  if (!sessao.enabled) {
    return (
      <div className="mx-auto max-w-lg px-6 py-20 text-center text-white/70">
        <Lock className="mx-auto mb-4 size-8 text-[#C9A227]" />
        <p>
          Painel desativado. Defina <code className="text-[#C9A227]">ADMIN_PASSWORD</code>{" "}
          no arquivo <code className="text-[#C9A227]">.env.local</code> e reinicie o
          servidor.
        </p>
      </div>
    );
  }

  if (!sessao.authenticated) return <LoginAdmin onEntrar={entrar} />;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.35em] text-white/40 uppercase">Admin</p>
          <h1 className="font-display text-3xl text-white">Indicados por categoria</h1>
        </div>

        <button
          type="button"
          onClick={sair}
          className="flex cursor-pointer items-center gap-2 text-xs text-white/50 hover:text-white"
        >
          <LogOut className="size-3.5" />
          Sair
        </button>
      </div>

      {!sessao.supabase && (
        <p className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-200">
          Supabase não configurado: você está vendo os dados estáticos e o botão salvar vai
          falhar. Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env.local.
        </p>
      )}

      <div className="mt-6">
        <AwardTabs selecionado={award} onSelecionar={setAward} />
      </div>

      {aviso && (
        <p
          className={`mt-4 rounded-lg border p-3 text-xs ${
            aviso.tipo === "ok"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
              : "border-red-500/30 bg-red-500/10 text-red-200"
          }`}
        >
          {aviso.texto}
        </p>
      )}

      {carregando || !edicao ? (
        <Carregando className="min-h-[40vh]" />
      ) : (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-[2fr_1fr]">
            <div>
              <label className="mb-1.5 block text-xs text-white/50">Nome da edição</label>
              <Input
                value={edicao.awardsName ?? ""}
                onChange={(evento) =>
                  setEdicao({ ...edicao, awardsName: evento.target.value })
                }
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-white/50">Ano</label>
              <Input
                type="number"
                value={edicao.year ?? ""}
                onChange={(evento) =>
                  setEdicao({ ...edicao, year: Number(evento.target.value) })
                }
              />
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <AnimatePresence initial={false}>
              {edicao.categories.map((categoria, posicao) => (
                <CategoriaCard
                  key={categoria.id}
                  categoria={categoria}
                  posicao={posicao}
                  aberta={abertas.has(categoria.id)}
                  onAlternar={() => alternarCategoria(categoria.id)}
                  onMover={(destino) =>
                    alterarCategorias(mover(edicao.categories, posicao, destino))
                  }
                  onRemover={() => alterarCategorias(removerDe(edicao.categories, posicao))}
                  onAlterar={(campos) =>
                    alterarCategorias(substituirEm(edicao.categories, posicao, campos))
                  }
                />
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={adicionarCategoria}>
              <Plus className="size-4" />
              Nova categoria
            </Button>

            <Button onClick={salvar} disabled={salvando}>
              {salvando ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              Salvar
            </Button>

            <Button onClick={exportar}>
              <Download className="size-4" />
              Exportar JSON
            </Button>

            <Button onClick={() => inputArquivo.current?.click()}>
              <Upload className="size-4" />
              Importar JSON
            </Button>
            <input
              ref={inputArquivo}
              type="file"
              accept="application/json"
              onChange={importar}
              className="hidden"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminEditor;
