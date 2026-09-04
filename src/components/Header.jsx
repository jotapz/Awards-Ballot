"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { AWARDS, AWARD_SLUGS } from "@/lib/awards";

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0B0B0C]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-end px-4 py-3 sm:px-6">
        <Link
          href="/template"
          className="hidden rounded-full border border-[#C9A227]/40 px-4 py-1.5 text-[11px] tracking-[0.2em] text-[#C9A227] uppercase transition-colors hover:bg-[#C9A227] hover:text-black md:inline-block"
        >
          Meus bolões
        </Link>

        <button
          type="button"
          className="cursor-pointer text-white md:hidden"
          onClick={() => setMenuAberto((aberto) => !aberto)}
          aria-label="Abrir menu"
          aria-expanded={menuAberto}
        >
          {menuAberto ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {menuAberto && (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="flex flex-col gap-1 overflow-hidden border-t border-white/5 px-4 pb-4 md:hidden"
        >
          {AWARD_SLUGS.map((slug) => (
            <Link
              key={slug}
              href={`/${slug}`}
              onClick={() => setMenuAberto(false)}
              className="py-2 text-sm text-white/80 hover:text-white"
            >
              {AWARDS[slug].label}
            </Link>
          ))}
          <Link
            href="/template"
            onClick={() => setMenuAberto(false)}
            className="py-2 text-sm text-[#C9A227]"
          >
            Meus bolões
          </Link>
        </motion.nav>
      )}
    </header>
  );
};

export default Header;
