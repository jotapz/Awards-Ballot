"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Download, Loader2, PenLine } from "lucide-react";
import AwardTabs from "@/components/AwardTabs";
import Carregando from "@/components/Carregando";
import BallotSheet from "@/features/ballot/BallotSheet";
import { baixarComoPng, nomeDoArquivo } from "@/features/ballot/baixarPng";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AWARDS } from "@/lib/awards";
import { useEdicao } from "@/hooks/useEdicao";
import { useVotacao } from "@/context/VotacaoContext";

const LARGURA_DA_FOLHA = 1000;

const BallotResult = () => {
  const {
    votosDoAward,
    nome,
    setNome,
    awardAtual: award,
    setAwardAtual: setAward,
  } = useVotacao();
  const { edicao } = useEdicao(award);

  const [baixando, setBaixando] = useState(false);
  const [erro, setErro] = useState(null);
  const [escala, setEscala] = useState(1);
  const [altura, setAltura] = useState(0);

  const folhaRef = useRef(null);
  const areaRef = useRef(null);

  useLayoutEffect(() => {
    const ajustar = () => {
      const disponivel = areaRef.current?.clientWidth ?? LARGURA_DA_FOLHA;
      setEscala(Math.min(1, disponivel / LARGURA_DA_FOLHA));
      setAltura(folhaRef.current?.offsetHeight ?? 0);
    };

    ajustar();
    window.addEventListener("resize", ajustar);

    const observador = new ResizeObserver(ajustar);
    if (folhaRef.current) observador.observe(folhaRef.current);

    return () => {
      window.removeEventListener("resize", ajustar);
      observador.disconnect();
    };
  }, [edicao]);

  const baixar = async () => {
    if (!folhaRef.current) return;

    setBaixando(true);
    setErro(null);

    try {
      await baixarComoPng(folhaRef.current, nomeDoArquivo(award, nome));
    } catch (falha) {
      setErro(`Não foi possível gerar a imagem: ${falha.message}`);
    } finally {
      setBaixando(false);
    }
  };

  const votos = votosDoAward(award);
  const { label } = AWARDS[award];
  const temVoto = Object.keys(votos).length > 0;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-xs tracking-[0.2em] text-white/50 uppercase transition-colors hover:text-[#C9A227]"
        >
          <ArrowLeft className="size-3.5" />
          Início
        </Link>

        <p className="text-xs tracking-[0.35em] text-white/40 uppercase">Suas apostas</p>
        <h1 className="font-display mt-2 text-4xl text-white sm:text-5xl">Meus bolões</h1>
      </motion.div>

      <div className="mt-8 flex flex-wrap items-end gap-4">
        <AwardTabs selecionado={award} onSelecionar={setAward} />

        <div className="w-full max-w-xs">
          <label className="mb-1.5 flex items-center gap-1.5 text-xs text-white/50">
            <PenLine className="size-3.5" />
            Seu nome (opcional)
          </label>
          <Input
            value={nome}
            onChange={(evento) => setNome(evento.target.value)}
            placeholder="Como quer aparecer no bolão"
            maxLength={40}
          />
        </div>

        <div className="ml-auto flex gap-2">
          <Button asChild>
            <Link href={`/${award}`}>Voltar a votar</Link>
          </Button>
          <Button
            onClick={baixar}
            disabled={!edicao || baixando || !temVoto}
            title={temVoto ? undefined : "Vote em pelo menos uma categoria para baixar"}
          >
            {baixando ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Download className="size-4" />
            )}
            Baixar PNG
          </Button>
        </div>
      </div>

      {erro && <p className="mt-4 text-right text-xs text-red-400">{erro}</p>}

      <div ref={areaRef} className="mt-10 w-full">
        {!temVoto ? (
          <motion.div
            key={`vazio-${award}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center gap-3 py-24 text-center"
          >
            <p className="text-sm text-white/60">Você ainda não votou no {label}.</p>
            <Link
              href={`/${award}`}
              className="group inline-flex items-center gap-1.5 text-xs tracking-[0.2em] text-[#C9A227] uppercase transition-colors hover:text-[#F3DF95]"
            >
              Clique aqui para votar
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        ) : edicao ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              width: LARGURA_DA_FOLHA * escala,
              height: altura ? altura * escala : undefined,
              margin: "0 auto",
            }}
            className="overflow-hidden rounded-xl shadow-[0_30px_80px_-30px_rgba(201,162,39,0.55)]"
          >
            <div
              style={{
                width: LARGURA_DA_FOLHA,
                transform: `scale(${escala})`,
                transformOrigin: "top left",
              }}
            >
              <BallotSheet
                ref={folhaRef}
                edicao={edicao}
                votos={votos}
                nome={nome}
                largura={LARGURA_DA_FOLHA}
              />
            </div>
          </motion.div>
        ) : (
          <Carregando className="min-h-[40vh]" />
        )}
      </div>

      {temVoto && (
        <p className="mt-6 text-center text-xs text-white/40">
          Premiação: {label}. As categorias sem voto ficam em branco na folha.
        </p>
      )}
    </div>
  );
};

export default BallotResult;
