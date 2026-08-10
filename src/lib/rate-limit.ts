/**
 * Rate limiter in-memory (sliding window) untuk endpoint publik.
 * Catatan: state tersimpan per proses — cukup untuk melindungi
 * dari spam ringan di satu instance.
 */
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

export function rateLimit(
  key: string,
  max: number = MAX_REQUESTS,
  windowMs: number = WINDOW_MS
): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= max) {
    return false;
  }

  recent.push(now);
  hits.set(key, recent);
  return true;
}

/** Mengambil IP klien dari header, dengan fallback aman. */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return headers.get("x-real-ip") ?? "unknown";
}
