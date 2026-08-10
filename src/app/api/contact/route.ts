import { NextResponse } from "next/server";
import { desc, count } from "drizzle-orm";
import { db } from "@/lib/db";
import { runMigrations } from "@/lib/migrate";
import { contacts } from "@/lib/schema";
import { saveContactMessage } from "@/lib/contact-service";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

/**
 * POST /api/contact
 * Menerima pesan kontak (JSON), memvalidasi, lalu menyimpannya ke database.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON body" },
      { status: 400 }
    );
  }

  // Rate limit: maksimal 5 kiriman per menit per IP
  if (!rateLimit(`contact:${getClientIp(request.headers)}`)) {
    return NextResponse.json(
      { ok: false, message: "Too many messages sent. Please try again in a minute." },
      { status: 429 }
    );
  }

  const result = await saveContactMessage(body as Record<string, unknown>);

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, errors: result.errors },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { ok: true, message: "Message sent successfully" },
    { status: 201 }
  );
}

/**
 * GET /api/contact
 * Tanpa token : jumlah total pesan (aman untuk publik).
 * Dengan token : daftar lengkap pesan (set env ADMIN_TOKEN).
 */
export async function GET(request: Request) {
  await runMigrations();

  const [row] = await db.select({ value: count() }).from(contacts);
  const total = row?.value ?? 0;

  const adminToken = process.env.ADMIN_TOKEN;
  const authorization = request.headers.get("authorization");

  if (adminToken && authorization === `Bearer ${adminToken}`) {
    const messages = await db.select().from(contacts).orderBy(desc(contacts.id));
    return NextResponse.json({ ok: true, total, data: messages });
  }

  return NextResponse.json({ ok: true, total });
}
