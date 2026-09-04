"use client";

import AwardIcon from "@/components/AwardIcon";
import { AWARDS, AWARD_SLUGS } from "@/lib/awards";

const AwardTabs = ({ selecionado, onSelecionar }) => (
  <div className="flex flex-wrap gap-2">
    {AWARD_SLUGS.map((slug) => (
      <button
        key={slug}
        type="button"
        onClick={() => onSelecionar(slug)}
        aria-pressed={slug === selecionado}
        className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-xs tracking-widest uppercase transition-colors ${
          slug === selecionado
            ? "border-[#C9A227] bg-[#C9A227]/15 text-[#C9A227]"
            : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
        }`}
      >
        <AwardIcon icon={AWARDS[slug].icon} size={16} />
        {AWARDS[slug].label}
      </button>
    ))}
  </div>
);

export default AwardTabs;
