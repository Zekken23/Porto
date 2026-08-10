import { experience } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BriefcaseIcon } from "@/components/icons";

/** Section Experience: timeline riwayat kerja */
export function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="experience"
          title="Pengalaman Kerja"
          description="Perjalanan karier saya dalam membangun produk digital."
        />

        <ol className="relative mt-16 space-y-12 before:absolute before:top-2 before:bottom-4 before:left-[7px] before:w-px before:bg-gradient-to-b before:from-primary-500/70 before:via-secondary-500/40 before:to-transparent">
          {experience.map((item, i) => (
            <Reveal key={`${item.company}-${item.period}`} delay={i * 0.08}>
              <li className="relative pl-10">
                {/* Dot timeline */}
                <span
                  className="absolute top-1.5 left-0 flex h-4 w-4 items-center justify-center rounded-full border border-primary-400 bg-base"
                  aria-hidden="true"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
                </span>

                <div className="card-hover glass rounded-2xl p-6 sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/25 to-secondary-500/25 font-display text-sm font-bold text-white ring-1 ring-line-strong">
                        {item.companyInitials}
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-white">
                          {item.role}
                        </h3>
                        <p className="text-sm text-primary-300">
                          {item.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border border-line bg-raised/70 px-3 py-1 font-mono text-xs text-zinc-300">
                        {item.period}
                      </span>
                      <span className="hidden items-center gap-1.5 rounded-full border border-line bg-raised/70 px-3 py-1 text-xs text-muted sm:inline-flex">
                        <BriefcaseIcon className="h-3.5 w-3.5" />
                        {item.type}
                      </span>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {item.description.map((point, index) => (
                      <li
                        key={index}
                        className="flex gap-2.5 text-sm leading-relaxed text-muted"
                      >
                        <span className="mt-0.5 shrink-0 text-secondary-400">
                          ▹
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-line bg-raised/60 px-2.5 py-1 font-mono text-[11px] text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
