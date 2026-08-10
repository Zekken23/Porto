/**
 * Menyiapkan database sebelum build produksi (dijalankan Vercel via
 * script "vercel-build").
 *
 * Jika DATABASE_URL menunjuk ke database remote (Turso/libSQL cloud),
 * skema tabel di-push langsung ke sana sehingga runtime tidak perlu
 * membaca folder migrasi. Untuk database lokal (file:) — misalnya di
 * mesin developer — script ini tidak melakukan apa-apa.
 */
import { execSync } from "node:child_process";

const url = process.env.DATABASE_URL ?? process.env.TURSO_DATABASE_URL ?? "";

if (url && !url.startsWith("file:")) {
  console.log("🌍 Database remote terdeteksi — push skema ke:", url);
  try {
    execSync("npx drizzle-kit push --force", {
      stdio: "inherit",
      env: { ...process.env },
    });
    console.log("✅ Skema database berhasil di-push.");
  } catch (error) {
    console.error("❌ Gagal push skema database:", error);
    process.exit(1);
  }
} else {
  console.log("ℹ️  Tidak ada DATABASE_URL remote — lewati push skema.");
}
