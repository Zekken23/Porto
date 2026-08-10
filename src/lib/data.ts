/**
 * ============================================================
 *  DATA PORTOFOLIO — satu-satunya file yang perlu Anda edit
 *  untuk mengganti seluruh konten website ini.
 *  ------------------------------------------------------------
 *  Isi data di bawah dengan profil, proyek, skills, dan
 *  pengalaman Anda yang sesungguhnya. Semua komponen website
 *  membaca data dari file ini.
 * ============================================================
 */

export const profile = {
  name: "Muhammad Yusron AL Ghoni Rizqullah",
  firstName: "Muhammad",
  /** Nama singkat untuk logo website (tampil sebagai yusron.dev) */
  logo: "yusron",
  role: "Full-Stack Developer",
  /** Roles yang ditampilkan dengan efek ketik (typewriter) di Hero */
  roles: [
    "Full-Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Mobile Developer",
    "Data Science Enthusiast",
  ],
  shortDescription:
    "Pengembang Full-Stack (web & mobile) yang membangun produk modern, cepat, dan dapat diskalakan — dengan ketertarikan mendalam pada Data Science.",
  about: [
    "Halo! Saya Muhammad Yusron AL Ghoni Rizqullah — Full-Stack Developer dengan pengalaman 4+ tahun membangun aplikasi web end-to-end, dari desain antarmuka yang intuitif hingga arsitektur backend yang solid dan scalable.",
    "Saya percaya bahwa software yang hebat lahir dari kombinasi antara engineering yang bersih, perhatian terhadap detail, dan pengalaman pengguna yang manusiawi. Saya senang memecahkan masalah kompleks menjadi solusi sederhana dan elegan.",
    "Selain pengembangan web, saya juga aktif mendalami Data Science dan membangun aplikasi mobile. Di waktu luang, saya menulis artikel teknis, berkontribusi ke proyek open source, dan berbagi ilmu lewat komunitas developer.",
  ],
  email: "yusronalgoni@gmail.com",
  phone: "+62 812 3456 7890", // TODO: ganti dengan nomor WhatsApp/telepon Anda
  location: "Jakarta, Indonesia", // TODO: ganti dengan kota Anda
  website: "https://yusron.dev", // TODO: ganti dengan domain asli saat sudah punya
  /** Ubah jadi true/false untuk badge "Available for work" */
  available: true,
  /** File CV Anda di folder public/ (bisa jpg, png, atau pdf) */
  resumeUrl: "/cv_yusron.jpg",
  socials: [
    { label: "GitHub", href: "https://github.com/Zekken23", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/muhammad-yusron-al-ghoni-rizqullah",
      icon: "linkedin",
    },
    {
      label: "Instagram",
      href: "https://instagram.com/yusron_alghoni",
      icon: "instagram",
    },
    { label: "Email", href: "mailto:yusronalgoni@gmail.com", icon: "mail" },
  ] as const,
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

/** Statistik singkat yang tampil di section About */
export const stats = [
  { value: 4, suffix: "+", label: "Years of Experience" },
  { value: 25, suffix: "+", label: "Projects Completed" },
  { value: 12, suffix: "+", label: "Happy Clients" },
  { value: 10, suffix: "K+", label: "Lines of Code" },
] as const;

/** Kartu "What I Do" di section About */
export const highlights = [
  {
    icon: "monitor",
    title: "Web Application",
    description:
      "Aplikasi web modern dengan React & Next.js yang cepat, responsif, dan mudah dirawat.",
  },
  {
    icon: "server",
    title: "API & Backend",
    description:
      "REST API dan serverless functions yang aman, teruji, dan dapat diskalakan.",
  },
  {
    icon: "database",
    title: "Database Design",
    description:
      "Model data dan query yang efisien menggunakan SQL dan ORM modern (Drizzle, Prisma).",
  },
  {
    icon: "zap",
    title: "Performance",
    description:
      "Optimasi Core Web Vitals, code-splitting, dan caching untuk pengalaman tercepat.",
  },
] as const;

export type SkillCategory = {
  title: string;
  icon: "monitor" | "server" | "terminal";
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "monitor",
    items: [
      "TypeScript",
      "React / Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Redux / Zustand",
      "Vite",
    ],
  },
  {
    title: "Backend",
    icon: "server",
    items: [
      "Node.js",
      "Next.js API Routes",
      "Drizzle ORM",
      "PostgreSQL",
      "SQLite / libSQL",
      "REST & GraphQL",
    ],
  },
  {
    title: "DevOps & Tools",
    icon: "terminal",
    items: ["Docker", "Git & GitHub", "CI/CD Pipelines", "Vercel", "Linux", "Figma"],
  },
];

/** Tech stack berjalan (marquee) di bawah section Skills */
export const techMarquee = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "Docker",
  "GraphQL",
  "Drizzle ORM",
  "Framer Motion",
  "Git",
  "Vercel",
  "Linux",
  "Figma",
];

export type ProjectCategory = "Full-Stack" | "Frontend" | "Backend";

export type Project = {
  title: string;
  description: string;
  tech: string[];
  category: ProjectCategory;
  year: string;
  github: string;
  demo: string;
  /** Warna gradient untuk thumbnail (gunakan class Tailwind gradient) */
  gradient: string;
  /** Singkatan yang tampil di thumbnail */
  monogram: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "NusantaraMart — E-Commerce Platform",
    description:
      "Platform e-commerce lengkap dengan keranjang realtime, checkout, integrasi payment gateway, dashboard admin, dan analitik penjualan. Melayani 10K+ pengguna aktif.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Redis"],
    category: "Full-Stack",
    year: "2025",
    github: "https://github.com/Zekken23/nusantarashop",
    demo: "https://nusantarashop.vercel.app",
    gradient: "from-cyan-500/25 via-sky-600/15 to-indigo-600/25",
    monogram: "NM",
    featured: true,
  },
  {
    title: "TaskFlow — Project Management",
    description:
      "Aplikasi manajemen proyek kolaboratif dengan kanban board, realtime collaboration, notifikasi, dan laporan produktivitas tim.",
    tech: ["React", "TypeScript", "Node.js", "Socket.io", "MongoDB"],
    category: "Full-Stack",
    year: "2024",
    github: "https://github.com/Zekken23/taskflow",
    demo: "https://taskflow-demo.vercel.app",
    gradient: "from-violet-500/25 via-purple-600/15 to-fuchsia-600/25",
    monogram: "TF",
    featured: true,
  },
  {
    title: "DevMetrics — Analytics Dashboard",
    description:
      "Dashboard analitik developer dengan visualisasi data interaktif, custom chart, export report, dan integrasi API pihak ketiga.",
    tech: ["Next.js", "TypeScript", "D3.js", "Tailwind CSS"],
    category: "Frontend",
    year: "2024",
    github: "https://github.com/Zekken23/devmetrics",
    demo: "https://devmetrics.vercel.app",
    gradient: "from-emerald-500/25 via-teal-600/15 to-cyan-600/25",
    monogram: "DM",
  },
  {
    title: "ChatKit — Realtime Chat SDK",
    description:
      "SDK chat realtime yang mudah diintegrasikan: room, private message, presence, typing indicator, dan message history.",
    tech: ["Node.js", "TypeScript", "WebSocket", "Redis"],
    category: "Backend",
    year: "2023",
    github: "https://github.com/Zekken23/chatkit",
    demo: "https://chatkit.dev",
    gradient: "from-amber-500/25 via-orange-600/15 to-rose-600/25",
    monogram: "CK",
  },
  {
    title: "Siparkir — Smart Parking App",
    description:
      "Aplikasi pencarian dan booking parkir realtime berbasis lokasi, dengan pembayaran digital dan integrasi IoT sensor.",
    tech: ["React Native", "TypeScript", "Node.js", "PostgreSQL"],
    category: "Full-Stack",
    year: "2023",
    github: "https://github.com/Zekken23/siparkir",
    demo: "https://siparkir.vercel.app",
    gradient: "from-sky-500/25 via-blue-600/15 to-indigo-600/25",
    monogram: "SP",
  },
  {
    title: "Portfolio Website — Ini Sendiri",
    description:
      "Website portfolio yang sedang Anda lihat. Dibangun dengan Next.js 16, TypeScript, Tailwind CSS v4, dan Drizzle ORM. Open source!",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Drizzle ORM"],
    category: "Frontend",
    year: "2026",
    github: "https://github.com/Zekken23/porto",
    demo: "https://rakapratama.dev",
    gradient: "from-fuchsia-500/25 via-pink-600/15 to-rose-600/25",
    monogram: "PR",
  },
];

export type ExperienceItem = {
  role: string;
  company: string;
  companyInitials: string;
  period: string;
  type: string;
  description: string[];
  tech: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Senior Full-Stack Developer",
    company: "TechNusa",
    companyInitials: "TN",
    period: "2023 — Present",
    type: "Full-time",
    description: [
      "Memimpin pengembangan platform SaaS dengan 50K+ pengguna dan arsitektur microservices.",
      "Meningkatkan performa aplikasi 3x lebih cepat melalui optimasi query dan caching.",
      "Mentoring 5 developer junior dan menetapkan standar code review & testing.",
    ],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "AWS"],
  },
  {
    role: "Full-Stack Developer",
    company: "KodeKreatif",
    companyInitials: "KK",
    period: "2021 — 2023",
    type: "Full-time",
    description: [
      "Membangun 10+ aplikasi web untuk klien dari berbagai industri.",
      "Merancang REST API yang melayani 1M+ request per bulan dengan uptime 99.9%.",
      "Mengurangi waktu loading halaman rata-rata hingga 60%.",
    ],
    tech: ["React", "Node.js", "MongoDB", "Docker"],
  },
  {
    role: "Frontend Developer",
    company: "StartupLab",
    companyInitials: "SL",
    period: "2020 — 2021",
    type: "Full-time",
    description: [
      "Mengembangkan UI component library yang dipakai 3 produk perusahaan.",
      "Berkolaborasi dengan tim desain untuk menerapkan design system.",
    ],
    tech: ["Vue", "Nuxt", "SCSS"],
  },
  {
    role: "Junior Web Developer",
    company: "Freelance",
    companyInitials: "FR",
    period: "2019 — 2020",
    type: "Freelance",
    description: [
      "Membangun website landing page dan toko online untuk 15+ klien UMKM.",
      "Mengelola hosting, domain, dan maintenance website klien.",
    ],
    tech: ["HTML", "CSS", "JavaScript", "WordPress"],
  },
];
