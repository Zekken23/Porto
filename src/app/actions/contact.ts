"use server";

import { headers } from "next/headers";
import { saveContactMessage } from "@/lib/contact-service";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { honeypotField } from "@/lib/validations/contact";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Record<string, string[] | undefined>;
  fieldValues?: Record<string, string>;
};

/**
 * Server Action untuk form kontak.
 * Rate-limit per IP → validasi (Zod) + honeypot → simpan ke database.
 */
export async function contactAction(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Rate limit: maksimal 5 kiriman per menit per IP
  const headerList = await headers();
  const ip = getClientIp(headerList);
  if (!rateLimit(`contact:${ip}`)) {
    return {
      status: "error",
      message: "Too many messages sent. Please try again in a minute.",
    };
  }

  const raw: Record<string, unknown> = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    [honeypotField]: formData.get(honeypotField),
  };

  const result = await saveContactMessage(raw);

  if (!result.ok) {
    return {
      status: "error",
      message: "Please fix the errors below and try again.",
      errors: result.errors,
      fieldValues: {
        name: String(raw.name ?? ""),
        email: String(raw.email ?? ""),
        subject: String(raw.subject ?? ""),
        message: String(raw.message ?? ""),
      },
    };
  }

  return {
    status: "success",
    message: "Message sent successfully! I'll get back to you soon.",
  };
}
