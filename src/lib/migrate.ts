import "server-only";
import { migrate } from "drizzle-orm/libsql/migrator";
import { db } from "./db";

let migrationPromise: Promise<void> | null = null;

/**
 * Menjalankan migrasi database (folder ./drizzle) tepat satu kali
 * per proses — hanya untuk database LOKAL (file:).
 *
 * Untuk database remote (Turso di production), skema sudah di-push
 * saat build Vercel oleh scripts/prepare-db.mjs, jadi runtime tidak
 * perlu membaca folder migrasi.
 */
export function runMigrations(): Promise<void> {
  const url =
    process.env.DATABASE_URL ??
    process.env.TURSO_DATABASE_URL ??
    "file:./data/portfolio.db";

  if (!url.startsWith("file:")) {
    return Promise.resolve();
  }

  if (!migrationPromise) {
    migrationPromise = migrate(db, { migrationsFolder: "./drizzle" })
      .then(() => undefined)
      .catch((error) => {
        // Jangan sampai migrasi lokal yang gagal merusak request
        console.warn("Peringatan: migrasi database lokal gagal:", error);
      });
  }
  return migrationPromise;
}
