"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "@/lib/data";
import { CloseIcon, DownloadIcon } from "@/components/icons";

type CvModalProps = {
  open: boolean;
  onClose: () => void;
};

/** Modal viewer CV: menampilkan gambar CV agar bisa dibaca langsung di web */
export function CvModal({ open, onClose }: CvModalProps) {
  // Tutup dengan tombol Escape + kunci scroll halaman saat modal terbuka
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={`CV ${profile.name}`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold text-white">
                  Curriculum Vitae
                </p>
                <p className="truncate font-mono text-xs text-zinc-500">
                  {profile.name}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup CV"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-raised/70 text-zinc-300 transition hover:border-line-strong hover:text-white"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            {/* Gambar CV — scrollable */}
            <div className="overflow-auto bg-base/60 p-4 sm:p-6">
              <div className="relative mx-auto h-[60vh] w-full">
                <Image
                  src={profile.resumeUrl}
                  alt={`CV ${profile.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="rounded-lg object-contain"
                  priority
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4">
              <p className="text-xs text-muted">
                Tidak terbaca jelas? Unduh file aslinya di bawah ini.
              </p>
              <a
                href={profile.resumeUrl}
                download="CV-Yusron.jpg"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
              >
                <DownloadIcon className="h-4 w-4" />
                Download CV
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
