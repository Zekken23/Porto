"use client";

import { motion, useReducedMotion } from "motion/react";
import { profile, stats, techMarquee } from "@/lib/data";

const deployStatus = "✓ Deployed to production in 2.4s";

/** Kartu terminal dekoratif dengan baris perintah yang muncul berurutan */
export function TerminalCard() {
  const prefersReduced = useReducedMotion();

  const lines = [
    { prompt: "whoami", output: profile.name.toLowerCase().replace(/\s+/g, "_") },
    {
      prompt: "cat roles.txt",
      output: profile.roles.slice(0, 3).join(" · "),
    },
    { prompt: "npm run deploy --production", output: deployStatus },
    {
      prompt: "ls projects/",
      output: `${stats[1]?.value}${stats[1]?.suffix} projects ready to ship 🚀`,
    },
  ];

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.45, delayChildren: 0.55 },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: { duration: 0.35 } },
  };

  return (
    <div className="relative">
      {/* Glow */}
      <div
        className="absolute -inset-10 rounded-[2.5rem] bg-gradient-to-br from-primary-500/20 via-secondary-500/10 to-tertiary-400/15 blur-3xl"
        aria-hidden="true"
      />

      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 28, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="glass relative overflow-hidden rounded-2xl shadow-2xl shadow-black/60"
      >
        {/* Window bar */}
        <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
          <span className="h-3 w-3 rounded-full bg-rose-500/80" />
          <span className="h-3 w-3 rounded-full bg-amber-400/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          <span className="ml-3 font-mono text-xs text-zinc-500">
            {profile.logo}@dev: ~/portfolio
          </span>
        </div>

        {/* Terminal body */}
        <motion.div
          variants={prefersReduced ? undefined : container}
          initial={prefersReduced ? false : "hidden"}
          animate="show"
          className="space-y-4 px-5 py-6 font-mono text-[13px] leading-relaxed sm:text-sm"
        >
          {lines.map((line, i) => {
            const isLast = i === lines.length - 1;
            return (
              <motion.div
                key={line.prompt}
                variants={prefersReduced ? undefined : item}
              >
                <p>
                  <span className="text-secondary-400">➜</span>{" "}
                  <span className="text-primary-400">~</span>{" "}
                  <span className="text-zinc-100">{line.prompt}</span>
                </p>
                <p className="mt-0.5 text-zinc-400">
                  {line.output}
                  {isLast && (
                    <span className="animate-blink ml-1 text-primary-400">
                      ▍
                    </span>
                  )}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Floating badges */}
      <div className="animate-float glass absolute -top-6 -right-4 rounded-xl px-4 py-3 sm:-right-8">
        <p className="font-display text-xl font-bold text-white">
          {stats[0]?.value}
          {stats[0]?.suffix}
        </p>
        <p className="text-[11px] text-muted">Years Experience</p>
      </div>
      <div className="animate-float-delayed glass absolute -bottom-6 -left-4 rounded-xl px-4 py-3 sm:-left-8">
        <p className="font-display text-xl font-bold text-white">
          {stats[2]?.value}
          {stats[2]?.suffix}
        </p>
        <p className="text-[11px] text-muted">Happy Clients</p>
      </div>

      {/* Tech stack mini */}
      <div className="absolute -bottom-10 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-line bg-raised/90 px-4 py-2 sm:flex">
        {techMarquee.slice(0, 4).map((tech) => (
          <span key={tech} className="font-mono text-[11px] text-zinc-400">
            {tech}
          </span>
        ))}
        <span className="text-[11px] text-secondary-400">+{techMarquee.length - 4} more</span>
      </div>
    </div>
  );
}
