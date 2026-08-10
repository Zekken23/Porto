"use client";

import { useState } from "react";
import { projects, type Project } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowUpRightIcon, GithubIcon } from "@/components/icons";

const filters = ["All", "Full-Stack", "Frontend", "Backend"] as const;
type Filter = (typeof filters)[number];

/** Thumbnail proyek bergaya browser window dengan gradient */
function ProjectThumbnail({ project }: { project: Project }) {
  return (
    <div
      className={`relative h-44 overflow-hidden bg-gradient-to-br ${project.gradient}`}
    >
      <div className="bg-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent"
        aria-hidden="true"
      />
      {/* Browser chrome */}
      <div className="absolute top-3 left-4 flex items-center gap-3">
        <span className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
        </span>
        <span className="h-5 w-36 rounded-md bg-black/30 sm:w-44" />
      </div>
      {/* Monogram */}
      <span className="absolute right-5 bottom-4 font-display text-5xl font-bold text-white/15 transition-transform duration-300 group-hover:scale-110 group-hover:text-white/25">
        {project.monogram}
      </span>
      {project.featured && (
        <span className="absolute top-3 right-4 rounded-full border border-white/20 bg-black/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm">
          Featured
        </span>
      )}
    </div>
  );
}

/** Section Projects: grid proyek dengan filter kategori */
export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="projects"
          title="Proyek Pilihan"
          description="Beberapa proyek yang pernah saya kerjakan — dari aplikasi e-commerce hingga SDK realtime."
        />

        {/* Filter */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {filters.map((f) => {
              const isActive = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-secondary-500/25"
                      : "border border-line bg-raised/60 text-muted hover:border-line-strong hover:text-zinc-100"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Grid proyek */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <Reveal key={project.title} delay={(i % 3) * 0.08}>
              <article className="card-hover glass group flex h-full flex-col overflow-hidden rounded-2xl">
                <ProjectThumbnail project={project} />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold leading-snug text-white transition group-hover:text-primary-300">
                      {project.title}
                    </h3>
                    <span className="shrink-0 font-mono text-xs text-zinc-500">
                      {project.year}
                    </span>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5">
                    {project.tech.map((tech) => (
                      <li
                        key={tech}
                        className="font-mono text-xs text-primary-400/80"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                    <div className="flex items-center gap-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition hover:text-white"
                      >
                        <GithubIcon className="h-4 w-4" />
                        Source
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition hover:text-primary-300"
                      >
                        Live Demo
                        <ArrowUpRightIcon className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
