import { profile, stats, highlights } from "@/lib/data";
import { featureIconMap } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Counter } from "@/components/ui/Counter";

/** Section About: paragraf profil, kartu "what I do", dan statistik beranimasi */
export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="about me"
          title="Tentang Saya"
          description="Sepintas tentang siapa saya, apa yang saya kerjakan, dan apa yang saya kuasai."
        />

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Kolom kiri: narasi + highlights */}
          <Reveal>
            <div className="space-y-5 leading-relaxed text-muted">
              {profile.about.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => {
                const Icon = featureIconMap[item.icon];
                return (
                  <div
                    key={item.title}
                    className="card-hover glass group rounded-2xl p-5"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line-strong bg-gradient-to-br from-primary-500/15 to-secondary-500/15 text-primary-300 transition group-hover:text-primary-200">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-display text-base font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* Kolom kanan: statistik */}
          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="card-hover glass rounded-2xl p-6 text-center"
                >
                  <div className="text-gradient font-display text-4xl font-bold sm:text-5xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-2 text-xs uppercase tracking-wider text-muted sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-line bg-gradient-to-br from-secondary-600/15 via-transparent to-primary-600/10 p-6">
              <p className="font-mono text-sm text-zinc-300">
                <span className="text-secondary-400">$</span> currently:{" "}
                <span className="text-primary-300">
                  building scalable web apps
                </span>
              </p>
              <p className="mt-2 font-mono text-xs text-zinc-500">
                {"// \"Code is like humor. When you have to explain it, it's bad.\""}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
