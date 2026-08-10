import { NextResponse } from "next/server";
import { count } from "drizzle-orm";
import { db } from "@/lib/db";
import { runMigrations } from "@/lib/migrate";
import { contacts } from "@/lib/schema";
import { stats } from "@/lib/data";

export const dynamic = "force-dynamic";

/**
 * GET /api/stats
 * Statistik portfolio + jumlah pesan kontak yang tersimpan di database.
 */
export async function GET() {
  await runMigrations();

  let contactMessages = 0;
  try {
    const [row] = await db.select({ value: count() }).from(contacts);
    contactMessages = row?.value ?? 0;
  } catch (error) {
    console.error("Failed to count contact messages:", error);
  }

  return NextResponse.json({ data: stats, contactMessages });
}
