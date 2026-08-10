import { NextResponse } from "next/server";
import { skillCategories, techMarquee } from "@/lib/data";

/**
 * GET /api/skills
 * Mengembalikan kategori skill dan daftar tech stack.
 */
export function GET() {
  return NextResponse.json({ categories: skillCategories, marquee: techMarquee });
}
