"use client";

import { useEffect, useRef } from "react";
import { useActionState } from "react";
import { contactAction, type ContactFormState } from "@/app/actions/contact";
import { honeypotField } from "@/lib/validations/contact";
import { profile } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  CheckIcon,
  LoaderIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  SendIcon,
  socialIconMap,
} from "@/components/icons";

const initialState: ContactFormState = {
  status: "idle",
  message: "",
};

const inputClass =
  "w-full rounded-xl border border-line bg-raised/70 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition focus:border-primary-500/60 focus:ring-2 focus:ring-primary-500/20";

/** Form kontak dengan Server Action + validasi + penyimpanan database */
export function Contact() {
  const [state, formAction, pending] = useActionState(
    contactAction,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  // Kosongkan form setelah sukses terkirim
  useEffect(() => {
    if (state.status === "success" && formRef.current) {
      formRef.current.reset();
    }
  }, [state.status]);

  const contactInfo = [
    {
      icon: MailIcon,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: PhoneIcon,
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, "")}`,
    },
    {
      icon: MapPinIcon,
      label: "Location",
      value: profile.location,
      href: undefined,
    },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="contact"
          title="Mari Bekerja Sama"
          description="Punya proyek menarik atau ingin berdiskusi? Kirim pesan — saya biasanya membalas dalam 1-2 hari kerja."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Kolom kiri: info kontak */}
          <Reveal>
            <div className="space-y-4">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                const content = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-gradient-to-br from-primary-500/15 to-secondary-500/15 text-primary-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wider text-zinc-500">
                        {info.label}
                      </p>
                      <p className="mt-0.5 truncate text-sm font-medium text-zinc-100">
                        {info.value}
                      </p>
                    </div>
                  </>
                );
                const classes =
                  "card-hover glass flex items-center gap-4 rounded-2xl p-5";

                return info.href ? (
                  <a
                    key={info.label}
                    href={info.href}
                    className={classes}
                    aria-label={info.label}
                  >
                    {content}
                  </a>
                ) : (
                  <div key={info.label} className={classes}>
                    {content}
                  </div>
                );
              })}

              <div className="glass flex items-center justify-between rounded-2xl p-5">
                <div>
                  <p className="text-sm font-medium text-zinc-100">
                    Social Media
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    Ikuti aktivitas saya di sini
                  </p>
                </div>
                <div className="flex gap-2">
                  {profile.socials
                    .filter((s) => !s.href.startsWith("mailto:"))
                    .map((social) => {
                      const Icon = socialIconMap[social.icon];
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={social.label}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-raised/60 text-muted transition hover:border-secondary-500/60 hover:text-secondary-300"
                        >
                          <Icon className="h-4 w-4" />
                        </a>
                      );
                    })}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Kolom kanan: form */}
          <Reveal delay={0.12}>
            <div className="glass rounded-2xl p-6 sm:p-8">
              <form ref={formRef} action={formAction} noValidate>
                {/* Honeypot anti-spam (disembunyikan dari manusia) */}
                <input
                  type="text"
                  name={honeypotField}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-400"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Nama Anda"
                      defaultValue={state.fieldValues?.name ?? ""}
                      className={inputClass}
                      required
                    />
                    {state.errors?.name && (
                      <p className="mt-1.5 text-xs text-rose-400">
                        {state.errors.name[0]}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-400"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="nama@email.com"
                      defaultValue={state.fieldValues?.email ?? ""}
                      className={inputClass}
                      required
                    />
                    {state.errors?.email && (
                      <p className="mt-1.5 text-xs text-rose-400">
                        {state.errors.email[0]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="subject"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-400"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Topik pembicaraan"
                    defaultValue={state.fieldValues?.subject ?? ""}
                    className={inputClass}
                    required
                  />
                  {state.errors?.subject && (
                    <p className="mt-1.5 text-xs text-rose-400">
                      {state.errors.subject[0]}
                    </p>
                  )}
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-400"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Ceritakan tentang proyek Anda..."
                    defaultValue={state.fieldValues?.message ?? ""}
                    className={`${inputClass} resize-none`}
                    required
                  />
                  {state.errors?.message && (
                    <p className="mt-1.5 text-xs text-rose-400">
                      {state.errors.message[0]}
                    </p>
                  )}
                </div>

                {/* Status pesan */}
                {state.status === "success" && (
                  <div className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                    <CheckIcon className="h-5 w-5 shrink-0" />
                    {state.message}
                  </div>
                )}
                {state.status === "error" && (
                  <div className="mt-5 flex items-center gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
                    {state.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={pending}
                  className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-secondary-500/25 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {pending ? (
                    <>
                      <LoaderIcon className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <SendIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
