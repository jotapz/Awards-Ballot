"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AwardIcon from "@/components/AwardIcon";
import { AWARDS, AWARD_SLUGS } from "@/lib/awards";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const HomeHero = () => (
  <div className="mx-auto flex min-h-[calc(100vh-160px)] w-full max-w-5xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
    <motion.p
      initial={{ opacity: 0, letterSpacing: "0.1em" }}
      animate={{ opacity: 1, letterSpacing: "0.5em" }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="text-[11px] text-[#C9A227] uppercase"
    >
      Temporada de premiações
    </motion.p>

    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
      className="font-display mt-4 text-6xl leading-[0.95] text-white sm:text-8xl"
    >
      Awards
      <span className="block bg-gradient-to-r from-[#C9A227] via-[#F3DF95] to-[#C9A227] bg-clip-text text-transparent">
        Ballot
      </span>
    </motion.h1>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.45, duration: 0.6 }}
      className="mt-6 max-w-md text-sm leading-relaxed text-white/60"
    >
      Escolha quem você acha que leva a estatueta em cada categoria e baixe o seu
      bolão preenchido para compartilhar.
    </motion.p>

    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mt-14 grid w-full gap-4 sm:grid-cols-3"
    >
      {AWARD_SLUGS.map((slug) => {
        const award = AWARDS[slug];
        return (
          <motion.div key={slug} variants={item}>
            <Link
              href={`/${slug}`}
              className="group flex h-full flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-[#C9A227]/60 hover:bg-[#C9A227]/[0.07]"
            >
              <motion.span
                whileHover={{ scale: 1.12, rotate: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="text-white/85 transition-colors group-hover:text-[#C9A227]"
              >
                <AwardIcon icon={award.icon} alt={award.label} size={52} />
              </motion.span>

              <span className="text-sm tracking-[0.28em] text-white uppercase">
                {award.label}
              </span>

              <span className="mt-auto flex items-center gap-1.5 text-xs text-[#C9A227] opacity-0 transition-opacity group-hover:opacity-100">
                Votar
                <ArrowRight className="size-3.5" />
              </span>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>

  </div>
);

export default HomeHero;
