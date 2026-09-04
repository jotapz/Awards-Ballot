"use client";

import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { Input, Textarea } from "@/components/ui/input";
import { indicadoVazio, removerDe, substituirEm } from "@/features/admin/edicaoUtils";

const BotaoIcone = ({ titulo, onClick, perigo = false, children }) => (
  <button
    type="button"
    title={titulo}
    aria-label={titulo}
    onClick={onClick}
    className={`cursor-pointer p-1 transition-colors ${
      perigo ? "text-red-400/70 hover:text-red-400" : "text-white/40 hover:text-white"
    }`}
  >
    {children}
  </button>
);

const CategoriaCard = ({
  categoria,
  posicao,
  aberta,
  onAlternar,
  onMover,
  onRemover,
  onAlterar,
}) => {
  const alterarIndicado = (indice, campos) =>
    onAlterar({ nominees: substituirEm(categoria.nominees, indice, campos) });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
    >
      <div className="flex items-center gap-2 p-3">
        <button
          type="button"
          onClick={onAlternar}
          aria-expanded={aberta}
          className="flex flex-1 cursor-pointer items-center gap-3 text-left"
        >
          <span className="text-xs text-white/30">{posicao + 1}</span>
          <span className="truncate text-sm text-white">
            {categoria.category || "Categoria sem nome"}
          </span>
          <span className="text-xs text-white/35">
            {categoria.nominees.length} indicados
          </span>
        </button>

        <BotaoIcone titulo="Subir" onClick={() => onMover(posicao - 1)}>
          <ChevronUp className="size-4" />
        </BotaoIcone>
        <BotaoIcone titulo="Descer" onClick={() => onMover(posicao + 1)}>
          <ChevronDown className="size-4" />
        </BotaoIcone>
        <BotaoIcone titulo="Remover categoria" onClick={onRemover} perigo>
          <Trash2 className="size-4" />
        </BotaoIcone>
      </div>

      {aberta && (
        <div className="space-y-4 border-t border-white/10 p-4">
          <Input
            value={categoria.category}
            placeholder="Nome da categoria"
            onChange={(evento) => onAlterar({ category: evento.target.value })}
          />
          <Textarea
            value={categoria.explanation}
            placeholder="Explicação da categoria"
            onChange={(evento) => onAlterar({ explanation: evento.target.value })}
          />
          <Textarea
            value={categoria.lastWinnerDescription}
            placeholder="Curiosidade / último vencedor"
            onChange={(evento) => onAlterar({ lastWinnerDescription: evento.target.value })}
          />

          <div className="space-y-2">
            {categoria.nominees.map((indicado, indice) => (
              <div key={indicado.id} className="flex gap-2">
                <Input
                  value={indicado.name}
                  placeholder="Indicado"
                  onChange={(evento) => alterarIndicado(indice, { name: evento.target.value })}
                />
                <Input
                  value={indicado.description}
                  placeholder="Filme / obra (opcional)"
                  onChange={(evento) =>
                    alterarIndicado(indice, { description: evento.target.value })
                  }
                />
                <BotaoIcone
                  titulo="Remover indicado"
                  perigo
                  onClick={() => onAlterar({ nominees: removerDe(categoria.nominees, indice) })}
                >
                  <Trash2 className="size-4" />
                </BotaoIcone>
              </div>
            ))}

            <button
              type="button"
              onClick={() => onAlterar({ nominees: [...categoria.nominees, indicadoVazio()] })}
              className="flex cursor-pointer items-center gap-1.5 text-xs text-[#C9A227] hover:underline"
            >
              <Plus className="size-3.5" />
              Adicionar indicado
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CategoriaCard;
