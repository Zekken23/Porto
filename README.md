# Portfolio Website

Website portfolio profesional yang modern, cepat, dan full-stack. Dibangun dengan **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, dan **Drizzle ORM** (SQLite/libSQL).

![Stack](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8) ![Drizzle](https://img.shields.io/badge/Drizzle_ORM-SQLite-94a3b8)

---

## ✨ Fitur

- 🎨 **Dark mode modern** dengan aksen gradient cyan → violet → pink
- ⚡ **Next.js 16** (App Router, Server Components, Turbopack)
- 🎭 Animasi halus: typewriter effect, reveal-on-scroll, animated counters, marquee, floating badges
- 📱 **Responsive penuh** — navbar dengan menu mobile, grid adaptif
- 📝 **Form kontak** dengan Server Action + validasi **Zod** + penyimpanan ke database
- 🛡️ Anti-spam honeypot **+ rate limiting** (5 pesan/menit/IP) pada form kontak
- 🔌 **REST API** untuk data portfolio (proyek, skills, statistik, kontak)
- 🗄️ **Database SQLite lokal** tanpa setup — migrasi Drizzle dijalankan otomatis saat aplikasi start, siap upgrade ke Turso cloud untuk production
- 🔍 SEO: metadata lengkap, Open Graph, Twitter Card, JSON-LD structured data

## 🚀 Mulai Cepat

```bash
# 1. Install dependency
npm install

# 2. Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

> Aplikasi langsung berjalan tanpa konfigurasi apa pun — database lokal otomatis dibuat.

## 🗂️ Struktur Project

```
├── src/
│   ├── app/
│   │   ├── api/                  # REST API
│   │   │   ├── contact/route.ts  #   POST kirim pesan · GET lihat/count pesan
│   │   │   ├── projects/route.ts #   GET daftar proyek
│   │   │   ├── skills/route.ts   #   GET kategori skill
│   │   │   └── stats/route.ts    #   GET statistik + jumlah pesan
│   │   ├── actions/contact.ts    # Server Action form kontak
│   │   ├── layout.tsx            # Root layout (font, metadata, navbar, footer)
│   │   ├── page.tsx              # Beranda (semua section + JSON-LD)
│   │   └── globals.css           # Tema Tailwind v4 + utilitas kustom
│   ├── components/
│   │   ├── sections/             # Navbar, Hero, About, Skills, Projects,
│   │   │                         # Experience, Contact, Footer
│   │   ├── ui/                   # Reveal, SectionHeading, Counter, ScrollProgress
│   │   └── icons.tsx             # Library ikon SVG inline
│   └── lib/
│       ├── data.ts               # ⭐ SEMUA KONTEN — edit file ini!
│       ├── schema.ts             # Skema tabel database (Drizzle)
│       ├── db.ts                 # Koneksi database
│       └── validations/contact.ts# Skema validasi form (Zod)
├── drizzle/                      # Migrasi database
├── data/                         # Database lokal (data/portfolio.db)
├── drizzle.config.ts
└── .env.example
```

## ✏️ Mengganti Konten

**Semua konten** (nama, role, deskripsi, socials, skills, proyek, pengalaman, statistik) ada di **satu file**: `src/lib/data.ts`.

1. Ubah `profile` → nama, email, socials, dll.
2. Ubah `projects`, `skillCategories`, `experience` → data Anda.
3. Letakkan CV di `public/resume.pdf` lalu sesuaikan `profile.resumeUrl`.

## 🗄️ Database

Secara default aplikasi memakai **SQLite lokal** (`data/portfolio.db`) — tanpa instalasi, tanpa akun. Migrasi Drizzle dijalankan otomatis saat aplikasi pertama kali dipakai (tabel `contacts` langsung dibuat).

| Perintah | Fungsi |
|---|---|
| `npm run db:generate` | Generate migrasi dari skema |
| `npm run db:migrate` | Terapkan migrasi |
| `npm run db:studio` | Buka Drizzle Studio (UI untuk lihat data) |

**Melihat pesan kontak:**

- **Opsi A** — `npm run db:studio` lalu buka tabel `contacts`.
- **Opsi B** — set `ADMIN_TOKEN` di `.env.local`, lalu:
  ```bash
  curl -H "Authorization: Bearer <token>" http://localhost:3000/api/contact
  ```

**Deploy ke cloud:** lihat bagian **Deploy ke Vercel** di bawah — database Turso + hosting Vercel.

---

## 🚀 Deploy ke Vercel

Website ini siap deploy ke **Vercel** (hosting Next.js terbaik). Karena filesystem serverless Vercel bersifat sementara, database lokal harus diganti dengan **Turso** (SQLite cloud) agar form kontak tetap berfungsi.

### 1. Buat database Turso

1. Daftar/buka [turso.tech](https://turso.tech) (gratis, tanpa kartu kredit).
2. Buat database baru — nanti dapat **URL** (`libsql://...turso.io`) dan **token**.
3. Salin kedua nilai tersebut.

### 2. Deploy aplikasi

**Cara A — dari GitHub (disarankan):**

```bash
# 1. Commit dan push project ke repository GitHub Anda
# 2. Buka https://vercel.com/new → Import repository Anda
# 3. Vercel otomatis mendeteksi Next.js. Tambahkan Environment Variables:
#    DATABASE_URL        = libsql://...turso.io
#    DATABASE_AUTH_TOKEN = <token turso>
# 4. Klik Deploy 🚀
```

**Cara B — CLI (tanpa GitHub):**

```bash
npx vercel
# ikuti prompt, lalu set env:
vercel env add DATABASE_URL        # production
vercel env add DATABASE_AUTH_TOKEN # production
vercel --prod
```

> **Catatan**: script `vercel-build` otomatis menjalankan `drizzle-kit push`
> untuk membuat tabel di Turso saat build, jadi tidak perlu setup manual lain.

### 3. (Opsional) Domain kustom

Di dashboard Vercel → **Settings → Domains**, tambahkan domain Anda
(mis. `yusron.dev`) dan ikuti instruksi DNS. Jangan lupa update
`profile.website` di `src/lib/data.ts`.

### 4. Verifikasi

1. Buka URL production — halaman harus tampil normal.
2. Kirim pesan lewat form kontak.
3. Cek pesan tersimpan: `GET /api/contact` di production (lihat tabel API) —
   atau di dashboard Turso → tabel `contacts`.

### Env variables production

| Variable | Wajib? | Keterangan |
|---|---|---|
| `DATABASE_URL` | ya | `libsql://...turso.io` (atau `TURSO_DATABASE_URL`) |
| `DATABASE_AUTH_TOKEN` | ya | Token dari dashboard Turso (atau `TURSO_AUTH_TOKEN`) |
| `ADMIN_TOKEN` | opsional | Untuk melihat daftar pesan via `GET /api/contact` |

## 🔌 REST API

| Endpoint | Method | Deskripsi |
|---|---|---|
| `/api/projects` | GET | Daftar proyek |
| `/api/skills` | GET | Kategori skill + tech stack |
| `/api/stats` | GET | Statistik + jumlah pesan kontak |
| `/api/contact` | POST | Kirim pesan `{ name, email, subject, message }` |
| `/api/contact` | GET | Jumlah pesan (atau daftar lengkap dengan token admin) |

Contoh kirim pesan via API:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Budi","email":"budi@email.com","subject":"Kolaborasi","message":"Halo, saya tertarik berkolaborasi!"}'
```

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router, React 19, Turbopack)
- **Bahasa:** TypeScript (strict)
- **Styling:** Tailwind CSS v4, Motion (Framer Motion)
- **Database:** Drizzle ORM + libSQL (SQLite lokal → Turso cloud)
- **Validasi:** Zod v4
- **Lint:** ESLint (React Compiler rules)

## 📄 Scripts

```bash
npm run dev          # Development server (Turbopack)
npm run build        # Build produksi
npm run start        # Jalankan build produksi
npm run lint         # ESLint
npm run db:*         # Perintah database (lihat tabel di atas)
```
Project by : Muhammad Yusron Al Ghoni Rizqullah
