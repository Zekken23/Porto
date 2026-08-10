import { skillCategories, techMarquee } from "@/lib/data";
import { skillIconMap } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Section Skills: kartu kategori skill + marquee tech stack */
export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="skills"
          title="Tech Stack & Tools"
          description="Teknologi yang saya gunakan sehari-hari untuk membangun produk digital."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {skillCategories.map((category, i) => {
            const Icon = skillIconMap[category.icon];
            return (
              <Reveal key={category.title} delay={i * 0.1}>
                <div className="card-hover glass h-full rounded-2xl p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line-strong bg-gradient-to-br from-primary-500/20 to-secondary-500/20 text-primary-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-white">
                      {category.title}
                    </h3>
                  </div>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line bg-raised/70 px-3 py-1.5 text-[13px] text-zinc-300 transition hover:border-primary-500/50 hover:text-primary-300"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Marquee tech stack */}
        <Reveal delay={0.15}>
          <div className="relative mt-16 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <div className="flex w-max animate-marquee">
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  className="flex shrink-0 items-center gap-10 pr-10"
                  aria-hidden={copy === 1}
                >
                  {techMarquee.map((tech) => (
                    <span
                      key={`${copy}-${tech}`}
                      className="flex items-center gap-10 font-mono text-sm text-zinc-500"
                    >
                      {tech}
                      <span className="text-secondary-500">✦</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
