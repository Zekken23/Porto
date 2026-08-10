import { navLinks, profile } from "@/lib/data";
import { socialIconMap } from "@/components/icons";
import { ArrowUpIcon } from "@/components/icons";

/** Footer: brand, tautan cepat, sosial media */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          {/* Brand */}
          <div className="text-center md:text-left">
            <a
              href="#home"
              className="font-display text-xl font-bold tracking-tight text-white"
            >
              {profile.logo}
              <span className="text-gradient">.dev</span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {profile.shortDescription}
            </p>
          </div>

          {/* Tautan cepat */}
          <nav className="flex flex-col items-center gap-2 md:items-start">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Navigasi
            </p>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition hover:text-primary-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Sosial */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Temukan Saya
            </p>
            <div className="flex gap-2.5">
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
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-raised/60 text-muted transition hover:-translate-y-0.5 hover:border-secondary-500/60 hover:text-secondary-300"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="text-center text-xs text-zinc-500">
            © {year} {profile.name}. Dibuat dengan sepenuh hati.
          </p>
          <p className="font-mono text-xs text-zinc-600">
            Next.js 16 · TypeScript · Tailwind CSS v4 · Drizzle ORM
          </p>
          <a
            href="#home"
            aria-label="Kembali ke atas"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-raised/60 text-muted transition hover:border-primary-500/60 hover:text-primary-300"
          >
            <ArrowUpIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
