import "server-only";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

/**
 * Koneksi database (libSQL / SQLite).
 *
 * Default        : file lokal `data/portfolio.db` — tanpa setup, langsung jalan.
 * Production     : set env di bawah untuk memakai Turso / libSQL cloud.
 *   DATABASE_URL          (atau TURSO_DATABASE_URL)  → libsql://<db>.turso.io
 *   DATABASE_AUTH_TOKEN   (atau TURSO_AUTH_TOKEN)    → token dari dashboard Turso
 */
const url =
  process.env.DATABASE_URL ??
  process.env.TURSO_DATABASE_URL ??
  "file:./data/portfolio.db";

const authToken =
  process.env.DATABASE_AUTH_TOKEN ?? process.env.TURSO_AUTH_TOKEN;

export const client = createClient({
  url,
  ...(authToken ? { authToken } : {}),
});

export const db = drizzle(client, { schema });
