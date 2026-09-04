"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const NomineeOption = ({ indicado, selecionado, onSelect, indice }) => (
  <motion.button
    type="button"
    onClick={onSelect}
    aria-pressed={selecionado}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.05 * indice, duration: 0.35, ease: "easeOut" }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`relative flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
      selecionado
        ? "border-[#C9A227] bg-[#C9A227]/15"
        : "border-white/10 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.07]"
    }`}
  >
    <span
      className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border transition-colors ${
        selecionado ? "border-[#C9A227] bg-[#C9A227] text-black" : "border-white/30"
      }`}
    >
      {selecionado && <Check className="size-3.5" strokeWidth={3} />}
    </span>

    <span className="min-w-0">
      <span className="block text-sm font-semibold tracking-wide text-white uppercase">
        {indicado.name}
      </span>
      {indicado.description && (
        <span className="mt-1 block text-xs text-white/55">{indicado.description}</span>
      )}
    </span>

    {selecionado && (
      <motion.span
        layoutId="indicado-selecionado"
        className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-[#C9A227]/60"
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
    )}
  </motion.button>
);

export default NomineeOption;
