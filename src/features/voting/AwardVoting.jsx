"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Info, RotateCcw, Sparkles } from "lucide-react";
import AwardIcon from "@/components/AwardIcon";
import Carregando from "@/components/Carregando";
import NomineeOption from "@/features/voting/NomineeOption";
import { Button } from "@/components/ui/button";
import { AWARDS } from "@/lib/awards";
import { useEdicao } from "@/hooks/useEdicao";
import { useVotacao } from "@/context/VotacaoContext";

const animacaoCategoria = {
  enter: (direcao) => ({ opacity: 0, x: direcao > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (direcao) => ({ opacity: 0, x: direcao > 0 ? -60 : 60 }),
};

const AwardVoting = ({ award }) => {
  const { icon, label } = AWARDS[award];
  const { votosDoAward, votar, limparAward, setAwardAtual } = useVotacao();
  const { edicao, erro } = useEdicao(award);

  const [indice, setIndice] = useState(0);
  const [direcao, setDirecao] = useState(1);

  useEffect(() => setAwardAtual(award), [award, setAwardAtual]);

  const votos = votosDoAward(award);
  const categorias = edicao?.categories ?? [];
  const total = categorias.length;
  const categoria = categorias[indice];
  const respondidas = categorias.filter(({ id }) => votos[id]).length;

  const irPara = useCallback(
    (destino) => {
      if (destino < 0 || destino >= total) return;

      setDirecao(destino > indice ? 1 : -1);
      setIndice(destino);
    },
    [indice, total]
  );

  useEffect(() => {
    const aoTeclar = (evento) => {
      if (evento.key === "ArrowRight") irPara(indice + 1);
      if (evento.key === "ArrowLeft") irPara(indice - 1);
    };

    window.addEventListener("keydown", aoTeclar);

    return () => window.removeEventListener("keydown", aoTeclar);
  }, [irPara, indice]);

  if (erro) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6 text-center text-white/70">
        Não foi possível carregar os indicados: {erro}
      </div>
    );
  }

  if (!edicao) return <Carregando />;

  const ultima = indice === total - 1;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-xs tracking-[0.2em] text-white/50 uppercase transition-colors hover:text-[#C9A227]"
        >
          <ArrowLeft className="size-3.5" />
          Início
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AwardIcon icon={icon} alt={label} size={34} />
            <div>
              <p className="font-display text-2xl tracking-[0.2em] text-[#C9A227] uppercase">
                {edicao.awardsName}
              </p>
              <p className="text-xs text-white/50">
                {respondidas} de {total} categorias votadas
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => limparAward(award)}
            className="flex cursor-pointer items-center gap-2 text-xs text-white/50 transition-colors hover:text-white"
          >
            <RotateCcw className="size-3.5" />
            Limpar votos
          </button>
        </div>

        <div className="mt-5 flex items-center gap-1.5">
          {categorias.map((item, posicao) => (
            <motion.button
              key={item.id}
              type="button"
              title={item.category}
              aria-label={item.category}
              aria-current={posicao === indice}
              onClick={() => irPara(posicao)}
              animate={{ height: posicao === indice ? 10 : 6 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className={`min-w-[10px] flex-1 cursor-pointer rounded-full transition-colors ${
                posicao === indice
                  ? "bg-white"
                  : votos[item.id]
                    ? "bg-[#C9A227] hover:bg-[#E4C55F]"
                    : "bg-white/15 hover:bg-white/35"
              }`}
            />
          ))}
        </div>
      </motion.header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <AnimatePresence mode="wait" custom={direcao}>
          <motion.section
            key={categoria?.id ?? indice}
            custom={direcao}
            variants={animacaoCategoria}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <p className="text-xs tracking-[0.35em] text-white/40 uppercase">
              Categoria {indice + 1}/{total}
            </p>
            <h1 className="font-display mt-3 text-4xl leading-tight text-white sm:text-5xl">
              {categoria?.category}
            </h1>

            {categoria?.explanation && (
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
                {categoria.explanation}
              </p>
            )}

            {categoria?.lastWinnerDescription && (
              <p className="mt-6 flex max-w-md gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-relaxed text-white/50">
                <Info className="mt-0.5 size-4 shrink-0 text-[#C9A227]" />
                {categoria.lastWinnerDescription}
              </p>
            )}
          </motion.section>
        </AnimatePresence>

        <div>
          <AnimatePresence mode="wait">
            <motion.div key={categoria?.id ?? indice} className="grid gap-3 sm:grid-cols-2">
              {categoria?.nominees.map((indicado, posicao) => (
                <NomineeOption
                  key={indicado.id}
                  indicado={indicado}
                  indice={posicao}
                  selecionado={votos[categoria.id] === indicado.id}
                  onSelect={() => votar(award, categoria.id, indicado.id)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between gap-3">
            <Button onClick={() => irPara(indice - 1)} disabled={indice === 0}>
              <ArrowLeft className="size-4" />
              Anterior
            </Button>

            {ultima ? (
              <Button asChild>
                <Link href="/template">
                  <Sparkles className="size-4" />
                  Ver meu bolão
                </Link>
              </Button>
            ) : (
              <Button onClick={() => irPara(indice + 1)}>
                Próximo
                <ArrowRight className="size-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwardVoting;
