import "server-only";
import { db } from "./db";
import { runMigrations } from "./migrate";
import { contacts } from "./schema";
import { contactSchema, honeypotField } from "./validations/contact";

export type SaveContactResult =
  | { ok: true; honeypot?: boolean }
  | { ok: false; errors: Record<string, string[] | undefined> };

/**
 * Logika bersama untuk menyimpan pesan kontak:
 * cek honeypot → validasi Zod → simpan ke database.
 * Dipakai oleh Server Action (form) dan REST API.
 */
export async function saveContactMessage(
  raw: Record<string, unknown>
): Promise<SaveContactResult> {
  // Honeypot anti-spam: bot yang mengisi field tersembunyi "berhasil"
  const honeypot = raw[honeypotField];
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return { ok: true, honeypot: true };
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors };
  }

  await runMigrations();
  await db.insert(contacts).values({
    name: parsed.data.name,
    email: parsed.data.email,
    subject: parsed.data.subject,
    message: parsed.data.message,
  });

  return { ok: true };
}
