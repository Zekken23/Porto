import { NextResponse } from "next/server";
import { projects } from "@/lib/data";

/**
 * GET /api/projects
 * Mengembalikan daftar proyek portfolio dalam bentuk JSON.
 */
export function GET() {
  return NextResponse.json({ data: projects });
}
