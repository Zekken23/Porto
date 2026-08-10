"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { profile, stats } from "@/lib/data";
import { socialIconMap } from "@/components/icons";
import { ArrowRightIcon, FileTextIcon } from "@/components/icons";
import { TerminalCard } from "./TerminalCard";
import { CvModal } from "./CvModal";

/** Efek ketik (typewriter) yang berputar di antara beberapa role */
function useTypewriter(
  words: readonly string[],
  typeSpeed = 55,
  deleteSpeed = 30,
  pause = 1700
) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      timeout = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }, 120);
    } else {
      timeout = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? deleteSpeed : typeSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

/** Hero section: nama, role dengan efek ketik, CTA, sosial, dan terminal card */
export function Hero() {
  const typed = useTypewriter(profile.roles);
  const prefersReduced = useReducedMotion();
  const experienceYears = stats[0]?.value;
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16"
    >
      {/* Background dekoratif */}
      <div className="bg-grid bg-grid-fade absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-secondary-600/20 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-[-120px] h-[360px] w-[360px] rounded-full bg-primary-600/15 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 px-6 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Kolom kiri: teks */}
        <div>
          {profile.available && (
            <motion.span
              initial={prefersReduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for work
            </motion.span>
          )}

          <motion.h1
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-6 font-display text-5xl font-bold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m{" "}
            <span className="text-gradient animate-gradient">
              {profile.name}
            </span>
          </motion.h1>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-5 font-mono text-lg text-primary-300 sm:text-xl"
          >
            <span className="mr-2 text-secondary-400">&gt;</span>
            {typed}
            <span className="animate-blink ml-0.5 text-primary-400">▍</span>
          </motion.p>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-6 max-w-xl leading-relaxed text-muted"
          >
            {profile.shortDescription}
          </motion.p>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-secondary-500/25 transition hover:brightness-110 hover:shadow-secondary-500/45"
            >
              View My Work
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <button
              type="button"
              onClick={() => setCvOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-raised/70 px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:border-secondary-500/50 hover:text-white"
            >
              <FileTextIcon className="h-4 w-4" />
              View CV
            </button>
          </motion.div>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex items-center gap-3"
          >
            {profile.socials.map((social) => {
              const Icon = socialIconMap[social.icon];
              const isMail = social.href.startsWith("mailto:");
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={isMail ? undefined : "_blank"}
                  rel={isMail ? undefined : "noreferrer"}
                  aria-label={social.label}
                  title={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-raised/60 text-muted transition hover:-translate-y-1 hover:border-secondary-500/60 hover:text-secondary-300 hover:shadow-lg hover:shadow-secondary-500/20"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
            <span className="ml-2 hidden font-mono text-xs text-zinc-600 sm:inline">
              {experienceYears}
              {stats[0]?.suffix} years building for the web
            </span>
          </motion.div>
        </div>

        {/* Kolom kanan: terminal card */}
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <TerminalCard />
        </div>
      </div>

      <CvModal open={cvOpen} onClose={() => setCvOpen(false)} />
    </section>
  );
}
