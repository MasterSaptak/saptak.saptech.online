/**
 * Canonical source of truth for every project and experiment shown on the site.
 * Every claim here must be traceable to the repository, its README, or its manifest —
 * see `evidence` on each entry. Nothing is inferred or embellished.
 */

export type Track = "project" | "experiment"

export type ProjectKind =
  | "Platform"
  | "Product"
  | "Application"
  | "Research"
  | "Experiment"
  | "Prototype"
  | "Community"
  | "Academic"

export type ProjectStatus =
  | "Live"
  | "In Development"
  | "Prototype"
  | "Completed"
  | "Archived"
  | "Concept"

export type Category =
  | "Full-Stack"
  | "SaaS"
  | "AI / ML"
  | "IoT & Embedded"
  | "Cybersecurity"
  | "Data Engineering"
  | "Mobile"
  | "Community"
  | "Research"

export type Accent = "blue" | "green" | "purple"

export interface Project {
  slug: string
  name: string
  /** One line. Shown on the card. */
  tagline: string
  /** 1–3 sentences. Shown on the card body and at the top of the detail view. */
  summary: string
  problem?: string
  solution?: string
  /** How it is actually built — architecture and engineering decisions. */
  approach?: string[]
  features?: string[]
  tech: string[]
  categories: Category[]
  kind: ProjectKind
  status: ProjectStatus
  track: Track
  year: string
  github?: string
  /** Only set when the deployment was verified reachable. */
  live?: string
  /**
   * "private" marks a closed-source codebase: the card shows a Private badge
   * instead of a source link, and no repository URL is ever emitted.
   */
  visibility?: "public" | "private"
  image?: string
  blueprint?: "sepsis" | "iobotanica"
  accent: Accent
  /** Rendered verbatim as a caveat on the detail view. Use for scope/ownership honesty. */
  note?: string
  /** Not rendered. Records what the entry above is grounded in. */
  evidence: string
}

export const projects: Project[] = [
  {
    slug: "converto",
    name: "Converto",
    tagline: "One account for international payments, global shopping, tuition, and medical travel",
    summary:
      "A cross-border services platform: send money internationally, shop globally through a “Buy For Me” concierge flow, pay university tuition, book medical tourism, exchange currencies, and browse credit card offers — all behind a single account. Built as an installable PWA on a Supabase Postgres backend with a modular service engine.",
    problem:
      "A student paying overseas tuition, a family arranging medical treatment abroad, and someone buying goods from another country are all solving the same cross-border money problem — but each is handed a different provider, a different account, and a different fee structure.",
    solution:
      "One installable app where each service is a module over shared identity and shared data, so a user moves between remittance, concierge purchasing, tuition payment, and medical travel booking without re-authenticating or re-entering their details.",
    approach: [
      "Next.js App Router with route middleware handling session and access control at the edge of every request.",
      "Supabase Postgres as the system of record, with schema and migrations checked into the repo (setup.sql, database_updates.sql).",
      "Capabilities isolated under a modules/service-engine directory rather than being spread through the page tree.",
      "TanStack React Query for server-state caching and Zustand for local UI state — a deliberate split between the two.",
      "Installable and offline-tolerant via a PWA service worker layer.",
      "Rail booking backed by a bundled station/train dataset rather than a live third-party dependency.",
    ],
    features: [
      "International money transfer",
      "“Buy For Me” global concierge purchasing",
      "University tuition payments",
      "Medical tourism booking",
      "Currency exchange and credit card offers",
      "Ticket booking with Indian railway station lookup",
      "Installable PWA with offline shell",
    ],
    tech: ["Next.js 15", "React 19", "TypeScript", "Supabase", "PostgreSQL", "TanStack Query", "Zustand", "Zod", "Tailwind CSS", "PWA"],
    categories: ["Full-Stack", "SaaS"],
    kind: "Platform",
    status: "Live",
    track: "project",
    year: "2026",
    github: "https://github.com/MasterSaptak/Converto_UserSide",
    live: "https://converto.saptech.online",
    accent: "blue",
    evidence:
      "converto.saptech.online verified live (HTTP 200, Next.js). Site metadata: 'International Payments, Shopping, Buy For Me, Education & Medical Services' — send money internationally, shop globally with Buy For Me, pay university tuition, book medical tourism, exchange currencies, credit card offers. package.json (next 15, @supabase/ssr, @tanstack/react-query, zustand, zod, @ducanh2912/next-pwa, indian-railway-station-codes); repo tree (middleware.ts, modules/service-engine, setup.sql, database_updates.sql, trains-data.json).",
  },
  {
    slug: "soms",
    name: "SOMS",
    tagline: "Multi-tenant office operations platform with database-enforced isolation",
    summary:
      "Smart Office Management System — an enterprise platform covering attendance, task management, HR operations, and productivity tracking. Its defining engineering work is multi-tenant data isolation enforced in Postgres itself rather than in application code.",
    problem:
      "An operations platform serving multiple organisations has to guarantee that one tenant can never read another's employee, payroll, or attendance data — and application-layer checks are easy to forget on a new query.",
    solution:
      "Tenant isolation is pushed down into Postgres row-level security policies, so the database rejects cross-tenant reads regardless of which query path the application takes.",
    approach: [
      "Row-level security policies authored and version-controlled as SQL, with a dedicated pass on policy query performance.",
      "Supabase Postgres accessed through server-side helpers, with route middleware gating authenticated surfaces.",
      "Client-side persistence through IndexedDB so the app stays usable when the network drops.",
      "Zustand stores for cross-view UI state; TanStack Query for server state.",
      "Drag-and-drop task management built on dnd-kit; reporting views built on Recharts.",
      "Generative features wired through the Google Gen AI SDK.",
      "Unit tests run under Vitest; lint output tracked in-repo.",
    ],
    features: [
      "Attendance tracking",
      "Task management with drag-and-drop",
      "HR operations",
      "Productivity and reporting dashboards",
      "Offline-capable PWA shell",
    ],
    tech: ["Next.js 15", "React 19", "TypeScript", "Supabase", "PostgreSQL", "Row-Level Security", "Zustand", "TanStack Query", "Dexie / IndexedDB", "Recharts", "Google Gen AI", "Vitest"],
    categories: ["Full-Stack", "SaaS", "AI / ML"],
    kind: "Platform",
    status: "Live",
    track: "project",
    year: "2026",
    github: "https://github.com/MasterSaptak/SOMS",
    live: "https://soms.saptech.online",
    accent: "green",
    note: "Deployed as a working product with public pricing and sign-up; the platform itself sits behind authentication.",
    evidence:
      "soms.saptech.online verified live (HTTP 200, Next.js), title 'SOMS - Smart Office Management System', root redirects to /login with public /pricing, /signup, and /about routes. package.json (next 15, @supabase/ssr, @google/genai, @dnd-kit/*, recharts, dexie, pg, zustand, @tanstack/react-query, vitest, next-pwa); repo tree (supabase/ migrations, fix_rls.sql, optimize_rls_performance.sql, middleware.ts, store/, types/).",
  },
  {
    slug: "pawbio",
    name: "PawBio",
    tagline: "QR collar tags that turn any stranger's phone into a pet-recovery device",
    summary:
      "A mobile-first pet recovery platform. Every collar tag carries a QR code linking to a public profile where a finder can call the owner, message them on WhatsApp, and share their GPS location in a single tap — no app install, no account.",
    problem:
      "A lost-pet poster only reaches people who happen to walk past it, and a phone number on a collar tag gives a finder no way to tell the owner where the pet actually is.",
    solution:
      "A scannable tag resolves to a public page with the pet's status, one-tap contact, and a location-share button, while the owner gets a private dashboard showing every GPS ping as it arrives.",
    approach: [
      "FastAPI backend over MongoDB through the async Motor driver.",
      "Every pet row carries an owner_id and queries are owner-scoped, so users only ever see their own animals; seeded demo pets are deliberately ownerless so the public route works without an account.",
      "Google OAuth with an httpOnly session-token cookie, also accepted as a bearer token.",
      "QR codes rendered entirely client-side with error-correction level H, so a centre logo overlay stays scannable and no third-party QR service ever sees the URLs.",
      "Lost-pet posters generated in-browser to a 1080×1350 PNG and a printable A4 PDF.",
      "Maps via OpenStreetMap embeds, which need no API key.",
      "Backend covered by a pytest suite spanning auth failures, owner isolation, and session revocation.",
    ],
    features: [
      "Public scan page with SAFE / LOST status",
      "One-tap call, WhatsApp, and GPS share",
      "Owner dashboard with per-pet location timeline",
      "Client-side QR generation with printable tag formats",
      "Shareable lost-pet poster (PNG + PDF)",
    ],
    tech: ["FastAPI", "Python", "MongoDB", "Motor", "React 19", "Tailwind CSS", "Radix UI", "Google OAuth", "OpenStreetMap", "pytest"],
    categories: ["Full-Stack", "Mobile"],
    kind: "Product",
    status: "In Development",
    track: "project",
    year: "2026",
    github: "https://github.com/MasterSaptak/PawBio",
    accent: "green",
    evidence:
      "README.md (full feature list, tech stack table, API reference table, auth model, design tokens, 12-case pytest suite, roadmap with unchecked items); repo tree (backend/, frontend/, tests/, test_reports/, auth_testing.md).",
  },
  {
    slug: "pocket-post",
    name: "PocketPost",
    tagline: "A task marketplace and peer-to-peer delivery network built on verified carriers",
    summary:
      "A marketplace connecting people who need something done or moved with verified carriers already making that trip. Posts go to a public feed, carriers pick up missions, and the platform's trust layer — carrier verification and privacy controls — is what makes strangers willing to transact.",
    problem:
      "Courier services are slow and expensive for one-off cross-border items, while travellers make those exact journeys daily with unused capacity. The reason that gap stays open is trust, not logistics — neither side will hand goods to a stranger without some guarantee.",
    solution:
      "A mission feed where senders post tasks and verified carriers claim them, with carrier verification and privacy protection built into the platform rather than left to the two parties to negotiate.",
    approach: [
      "Next.js App Router frontend with Firebase as the backend.",
      "Public mission feed with authenticated posting, so browsing is open but participation is accountable.",
      "Access control expressed as Firestore security rules committed alongside the application code.",
      "Carrier verification as a first-class platform concern rather than a user-to-user negotiation.",
      "Generative features wired through the Google Gen AI SDK.",
      "Release versioning automated by a prebuild script that bumps the version on every build.",
    ],
    features: [
      "Task marketplace with a public mission feed",
      "Global peer-to-peer delivery matching",
      "Verified carrier network",
      "Privacy-protected transactions",
      "Firestore-rule-enforced access control",
    ],
    tech: ["Next.js 15", "React 19", "TypeScript", "Firebase", "Firestore", "Google Gen AI", "Tailwind CSS"],
    categories: ["Full-Stack", "AI / ML"],
    kind: "Platform",
    status: "Live",
    track: "project",
    year: "2026",
    github: "https://github.com/MasterSaptak/Pocket-Post",
    live: "https://pocketpost.saptech.online",
    accent: "blue",
    evidence:
      "pocketpost.saptech.online verified live (HTTP 200, Next.js). Site metadata: 'Trusted Task Marketplace & Global Delivery' — connects users with verified carriers for task completion and global peer-to-peer delivery, with stated privacy protection. Public routes /feed, /post, /auth/signin; page sections 'What is PocketPost', 'How It Works', 'Built for Trust'. package.json (next 15, firebase, @google/genai, prebuild version bump); repo tree (firestore.rules, firebase.json, .agent/workflows).",
  },
  {
    slug: "uidai-insight-hub",
    name: "UIDAI Insight Hub",
    tagline: "4.9 million Aadhaar records turned into a district-level policy signal",
    summary:
      "A data analytics and visualisation platform built for the UIDAI Data Hackathon 2026. It processes 4.9 million anonymised enrolment and update records across 55 states/UTs and 985 districts to locate where India's identity infrastructure is under the most strain.",
    problem:
      "Aadhaar generates far more update requests than new enrolments, but the aggregate number hides which districts are actually absorbing that load — so infrastructure investment cannot be targeted.",
    solution:
      "A reproducible pipeline that computes an update-to-enrolment ratio per district and flags statistical outliers, reframing a raw data dump as a specific, actionable question about resource allocation.",
    approach: [
      "Twelve chunked CSV sources merged into four clean datasets, then normalised for dates, column names, and age-group buckets.",
      "Feature engineering to derive per-district update ratios and geographic aggregations.",
      "Anomaly detection by z-score, with separate thresholds for temporal spikes and state-level outliers.",
      "Analysis written to JSON artefacts that the dashboard consumes as an API, keeping the Python pipeline and the Next.js frontend decoupled.",
      "Cross-dataset correlation between enrolment volume and update behaviour.",
    ],
    features: [
      "Update-to-enrolment burden mapped across 985 districts",
      "Age-group and state-level distribution analysis",
      "Z-score anomaly detection across time and geography",
      "Interactive Next.js dashboard over JSON analysis outputs",
    ],
    tech: ["Python", "pandas", "NumPy", "SciPy", "Next.js", "TypeScript", "Data Pipelines"],
    categories: ["Data Engineering", "AI / ML", "Research"],
    kind: "Research",
    status: "Completed",
    track: "project",
    year: "2026",
    github: "https://github.com/MasterSaptak/Project-UIDAI",
    accent: "green",
    evidence:
      "INSIGHTS_AND_PROBLEM_STATEMENT.md (record counts, dataset table, methodology pipeline, z-score thresholds, technical stack, JSON deliverables); repo tree (backend/, Dataset/, app/, scripts/).",
  },
  {
    slug: "error-ccx404",
    name: "Error_CCx404",
    tagline: "Community portal for a builder collective — “where builders debug the future”",
    summary:
      "The platform behind Error_CCx404, an independent DevOps and innovation collective working across software, cybersecurity, robotics, IoT, and hackathons. A real-time community portal rather than a static landing page.",
    problem:
      "A technical community spread across chat apps and event links has no durable home for its knowledge, its members, or its hackathon activity.",
    solution:
      "A purpose-built portal where authentication, member content, and event activity live together and update in real time.",
    approach: [
      "Next.js 15 App Router with React Server Components.",
      "Firebase providing Firestore, authentication, and storage, with real-time sync driving the interactive surfaces.",
      "Gemini wired in for search and automation features.",
      "Motion-based transitions layered over Tailwind CSS 4.",
    ],
    features: [
      "Real-time community portal",
      "Firebase authentication and storage",
      "AI-assisted search and automation",
      "Hackathon and event hub",
    ],
    tech: ["Next.js 15", "React 19", "TypeScript", "Firebase", "Firestore", "Gemini API", "Tailwind CSS 4", "Motion"],
    categories: ["Full-Stack", "Community"],
    kind: "Community",
    status: "Live",
    track: "project",
    year: "2026",
    github: "https://github.com/MasterSaptak/Error_CCx404",
    live: "https://error-ccx404.saptech.online",
    accent: "purple",
    evidence:
      "error-ccx404.saptech.online verified live (HTTP 200), title 'Error_CCx404 | Where Builders Debug the Future'. README.md (community description, feature list, explicit tech stack section with versions, deployment notes).",
  },
  {
    slug: "glamora",
    name: "Glamora",
    tagline: "Face-structure-aware hairstyle recommendations with stylist booking",
    summary:
      "An AI hair designer and stylist booking app. It recommends hairstyles from a curated database organised by face structure, then connects the user to professional stylists at nearby salons or via doorstep service.",
    problem:
      "Choosing a hairstyle is guesswork for most people, and the stylist who could advise them is only reachable after they have already committed to a booking.",
    solution:
      "Recommendations keyed to face structure, paired with a booking flow that routes the user to a verified stylist — so the advice and the appointment sit in the same product.",
    approach: [
      "Next.js frontend over a style database organised into face-structure categories.",
      "Computer-vision pipeline targeting OpenCV and MediaPipe for facial analysis.",
      "Stylist matching and appointment booking for both salon and home-visit service.",
    ],
    features: [
      "Hairstyle recommendation by face structure",
      "Salon and doorstep appointment booking",
      "Verified professional stylist matching",
    ],
    tech: ["Next.js", "React", "OpenCV", "MediaPipe", "Python"],
    categories: ["AI / ML", "Full-Stack"],
    kind: "Product",
    status: "In Development",
    track: "project",
    year: "2025",
    github: "https://github.com/MasterSaptak/Glamora",
    accent: "purple",
    note: "The README marks facial analysis and geo-based stylist discovery as in progress, and the FastAPI backend as planned. Only the frontend and the face-structure style dataset are present in the repository today.",
    evidence:
      "README.md (feature list with explicit 'coming soon' / 'in progress' markers, tech stack table listing FastAPI as planned); repo tree (frontend/, data_male/oval face-shape directories).",
  },
  {
    slug: "sepsis-alert",
    name: "SepsisAlert",
    tagline: "Portable vitals sensing and a clinical dashboard for early sepsis screening",
    summary:
      "A portable system that helps health workers detect sepsis early. A Bluetooth sensor unit measures vital signs and relays them to a model that flags risk, with a web dashboard for the health worker reading the result.",
    problem:
      "Sepsis is survivable when caught early, but early detection depends on continuous vitals monitoring that rural and mobile health workers have no equipment for.",
    solution:
      "A low-cost sensor unit paired over Bluetooth with a dashboard that turns a vitals stream into a risk signal a non-specialist can act on.",
    approach: [
      "Arduino firmware on the sensor unit handling vitals capture.",
      "Next.js dashboard for the health worker, with the data access layer isolated behind a services module.",
      "A dedicated sync layer in that services module, so readings captured away from connectivity reconcile later.",
    ],
    features: [
      "Bluetooth vitals sensor unit",
      "Risk flagging from measured vital signs",
      "Web dashboard for health workers",
      "Deferred sync for intermittent connectivity",
    ],
    tech: ["Next.js", "React 19", "TypeScript", "Arduino", "Bluetooth", "Tailwind CSS"],
    categories: ["AI / ML", "IoT & Embedded"],
    kind: "Application",
    status: "Live",
    track: "project",
    year: "2026",
    github: "https://github.com/MasterSaptak/SepsisAlert",
    live: "https://sepsis-alert-seven.vercel.app",
    blueprint: "sepsis",
    accent: "blue",
    note: "A collaborative project. The upstream repository is maintained by a collaborator; the link above points to this fork.",
    evidence:
      "Repo description (Bluetooth sensor → vital signs → AI model); upstream repo tree (Sepsis_Alert_arduino code/Sepsis_Alert.ino, services/{api,mockData,sync}.ts, app/, components/); package.json (next 16, react 19, radix, tailwind); live deployment verified reachable.",
  },
  {
    slug: "dhopa",
    name: "Dhopa",
    tagline: "A laundry business running on software I built and operate",
    summary:
      "An on-demand laundry service operating across Bolpur, Santiniketan, and Prantik, with free doorstep pickup and delivery. Dhopa is a live business, and the ordering platform, customer accounts, order tracking, and the admin dashboard that runs day-to-day operations are all software I built for it.",
    problem:
      "Local laundry runs on phone calls and paper slips. The customer cannot see where their order is, and the operator has no reliable record of what was collected, what stage it is at, or what is owed.",
    solution:
      "One system covering both sides of the counter: customers book a pickup, see transparent per-item pricing, and track their order; the operator works from an admin dashboard that holds the real state of every order.",
    approach: [
      "Next.js platform serving the storefront, customer accounts, and order tracking.",
      "Customer-facing sign-up, login, and an order tracking route, so order state belongs to the customer rather than a phone call.",
      "Admin dashboard as the operational side, used to run the business day to day.",
      "Per-area landing pages for each service town, backed by structured data — LaundryService, OfferCatalog, FAQPage, geo coordinates, and opening hours — so the business is discoverable in local search.",
      "Published service catalogue with per-item pricing rather than quote-on-request.",
    ],
    features: [
      "Doorstep pickup and delivery booking",
      "Customer accounts and order tracking",
      "Admin dashboard for order and operations management",
      "Transparent per-item pricing and offers",
      "Wash & Fold, Steam Ironing, and Dry Ironing services",
      "Local-search landing pages per service area",
    ],
    tech: ["Next.js", "React", "TypeScript", "Structured Data / SEO", "Flutter", "Dart"],
    categories: ["Full-Stack", "SaaS"],
    kind: "Product",
    status: "Live",
    track: "project",
    year: "2024–Present",
    live: "https://dhopa.online",
    visibility: "private",
    image: "/images/project-dhopa.png",
    accent: "blue",
    note: "Operating business. The platform and admin dashboard are a private codebase and are not publicly linked. The public Project_WashOut repository is an earlier archived Flutter client, superseded by the current platform.",
    evidence:
      "dhopa.online verified live (HTTP 200, Next.js). Site metadata and JSON-LD confirm: LaundryService schema, OfferCatalog with Wash & Fold / Steam Ironing / Dry Ironing, areaServed Bolpur / Santiniketan / Prantik, opening hours 08:00–21:00, FAQPage, GeoCoordinates. Routes /login, /signup, /track, /pricing, /offers, /services plus per-area landing pages. Admin dashboard confirmed by Saptak; not accessed. Earlier Flutter client: MasterSaptak/Project_WashOut (Dart, last push 2024).",
  },
  {
    slug: "chocket",
    name: "Chocket",
    tagline: "Imported artisan chocolate storefront with cold-chain delivery and gifting",
    summary:
      "An e-commerce storefront for handcrafted chocolate imported from Belgium, Switzerland, France, and Italy. Beyond a standard catalogue it handles the two things that make confectionery hard to ship: temperature-controlled delivery, and gifting as a distinct order type with its own hampers and combos.",
    problem:
      "Premium chocolate is a poor fit for ordinary e-commerce — it melts in transit, and most of it is bought as a gift for someone at a different address than the buyer, which standard checkouts treat as an edge case.",
    solution:
      "A storefront built around cold-chain delivery and a first-class gifting flow, with the catalogue segmented by occasion and budget rather than by brand alone.",
    approach: [
      "Next.js and TypeScript storefront with authenticated accounts and a persistent cart.",
      "Catalogue segmented across premium, imported, budget, combo, and cookie categories, plus browsing by brand.",
      "Gifting treated as its own route and order type, covering hampers and combination sets.",
      "Cold-chain delivery handled as a product constraint rather than a shipping afterthought.",
    ],
    features: [
      "Imported catalogue across Belgium, Switzerland, France, and Italy",
      "Category and brand browsing",
      "Dedicated gift hampers and combo sets",
      "Temperature-controlled delivery",
      "Accounts and persistent cart",
    ],
    tech: ["Next.js", "React", "TypeScript"],
    categories: ["Full-Stack"],
    kind: "Application",
    status: "Live",
    track: "project",
    year: "2026",
    github: "https://github.com/MasterSaptak/Chocket",
    live: "https://chocket.saptech.online",
    accent: "purple",
    evidence:
      "chocket.saptech.online verified live (HTTP 200, Next.js). Site metadata: handcrafted luxury chocolates from Belgium, Switzerland, France & Italy; artisan truffles, gift hampers, global cold-chain delivery. Public routes /shop, /brands, /categories, /gifts, /cart, /auth and category routes (premium, imported, budget, combos, cookies). README.md product description.",
  },
  {
    slug: "jaglul",
    name: "Jaglul",
    tagline: "Client web platform with automated deployment and versioned database migrations",
    summary:
      "A centralised repository covering website development, system design, and automation tooling for a client engagement — treated as an engineering project with migrations and CI rather than a one-off site build.",
    problem:
      "Client site work usually ships as a hand-deployed bundle with database changes applied manually, which makes every later change risky.",
    solution:
      "The same discipline applied to product work: schema changes as version-controlled migrations, and deployment automated through CI.",
    approach: [
      "Vite and React 19 frontend with client-side routing.",
      "Supabase backend with schema changes committed as ordered migration files.",
      "Build and deployment automated through GitHub Actions workflows.",
    ],
    features: ["Client web platform", "Versioned database migrations", "Automated CI deployment"],
    tech: ["Vite", "React 19", "TypeScript", "Supabase", "Tailwind CSS", "GitHub Actions"],
    categories: ["Full-Stack"],
    kind: "Application",
    status: "In Development",
    track: "project",
    year: "2026",
    github: "https://github.com/MasterSaptak/Jaglul",
    accent: "blue",
    evidence:
      "package.json (vite, react 19, @supabase/supabase-js, react-router-dom, tailwind); repo tree (.github/workflows, supabase/migrations, src/, scripts/); repo description.",
  },

  /* ── Experiments ─────────────────────────────────────────────────────── */

  {
    slug: "iobotanica",
    name: "IoBotanica",
    tagline: "Smart-garden firmware with cloud telemetry and dual local/remote pump control",
    summary:
      "Firmware for an ESP8266-based smart garden node. It reads soil moisture, air temperature, humidity, and motion, streams them to a cloud dashboard, and drives an irrigation pump that can be triggered either from the cloud or from a physical button on the unit.",
    problem:
      "A plant monitoring rig is only useful if you can both see it remotely and operate it in front of you — and cloud-only control fails the moment the network does.",
    solution:
      "The relay state is mirrored between a physical push button and a cloud virtual pin, so either input drives the pump and both stay in sync — including a re-sync on reconnect.",
    approach: [
      "ESP8266 NodeMCU running a timer-driven loop, with sensor reads scheduled on separate intervals rather than blocking in the main loop.",
      "DHT11 for temperature and humidity, an analog soil moisture probe mapped and inverted to a percentage, and a PIR sensor for motion.",
      "Relay-driven pump reflected on a cloud virtual pin and a local push button, re-synchronised on every reconnect so neither input drifts.",
      "16×2 I²C LCD giving a live local readout independent of network state.",
      "Motion events pushed to the cloud as logged events rather than polled values.",
    ],
    features: [
      "Soil moisture, temperature, and humidity telemetry",
      "Relay-controlled irrigation pump",
      "Cloud dashboard and physical button kept in sync",
      "On-device LCD readout",
      "Motion-triggered event logging",
    ],
    tech: ["ESP8266", "Arduino / C++", "Blynk IoT", "DHT11", "Soil Moisture Sensor", "PIR", "I²C LCD", "Relay Control"],
    categories: ["IoT & Embedded"],
    kind: "Prototype",
    status: "Prototype",
    track: "experiment",
    year: "2024",
    github: "https://github.com/MasterSaptak/IoBotanica",
    blueprint: "iobotanica",
    accent: "green",
    note: "A single-sketch hardware prototype. There is no companion mobile app, vision model, or hosted service in the repository.",
    evidence:
      "BlynkIOT_SmartPlant_Monitoring_Manual.ino read in full — pin definitions, BlynkTimer intervals, DHT11/soil/PIR handlers, relay + push-button sync via BLYNK_CONNECTED/syncVirtual, LiquidCrystal_I2C output, Blynk.logEvent for motion.",
  },
  {
    slug: "rbsaps-cipher",
    name: "RBSAPS Cipher",
    tagline: "A cipher where the same plaintext never encrypts to the same ciphertext twice",
    summary:
      "A cryptography experiment built as a group academic project. It generates a fresh random three-value key on every encryption, so encrypting identical plaintext twice produces two different ciphertexts.",
    problem:
      "A classical substitution cipher maps a given plaintext to exactly one ciphertext, which makes identical messages trivially recognisable even without breaking the cipher.",
    solution:
      "Generating the key at encryption time rather than fixing it in advance, so the same message produces a different output on every run and the key travels with the ciphertext.",
    approach: [
      "A three-value key is drawn at random per encryption, each value an independent shift in the 0–25 range.",
      "The three shifts are applied cyclically across successive characters, making it polyalphabetic rather than a single Caesar shift.",
      "Case is preserved and spaces pass through untouched, so word boundaries survive the transform.",
      "Decryption is the exact inverse and requires the caller to supply the key generated at encryption time.",
    ],
    features: [
      "Randomised key generated per encryption run",
      "Cyclic three-shift polyalphabetic substitution",
      "Case-preserving encrypt and decrypt CLI",
    ],
    tech: ["Python", "Cryptography", "Polyalphabetic Substitution"],
    categories: ["Cybersecurity", "Research"],
    kind: "Experiment",
    status: "Prototype",
    track: "experiment",
    year: "2022",
    github: "https://github.com/MasterSaptak/RBSAPSS_Cipher",
    image: "/images/project-cipher.png",
    accent: "blue",
    note: "An academic exercise in cipher design, not a production cryptosystem. The three-shift key space is small by modern standards and the construction has not been formally analysed.",
    evidence:
      "RBSAPSS.py read in full — key_generator() drawing three randint(0,25) values, cyclic index j over the key tuple, case-preserving modular shift, space passthrough, inverse decrypt(), interactive CLI.",
  },
  {
    slug: "hair-booking",
    name: "Hair Booking Platform",
    tagline: "A booking-flow prototype exploring the interaction model behind Glamora",
    summary:
      "A deployed prototype of a hair stylist booking experience: a browsable style gallery, authenticated user accounts, and a multi-step booking flow. Built to test the interaction model that Glamora is designed around.",
    problem:
      "Before committing to a computer-vision product, the surrounding experience — browsing styles, holding an account, walking through a booking — has to be worth using on its own.",
    solution:
      "A working end-to-end booking prototype with real authentication and a real database, so the flow could be evaluated as a product rather than a mockup.",
    approach: [
      "Next.js 15 and React 19 with Supabase providing authentication and a Postgres database.",
      "Row Level Security policies scoping every row to its owning user.",
      "Style catalogue organised by category, driven from a central configuration module rather than hardcoded per page.",
      "Multi-step booking flow covering service, stylist, and date/time selection.",
      "Form handling through React Hook Form with schema validation.",
    ],
    features: [
      "Categorised hairstyle gallery with search and filtering",
      "Supabase authentication with persistent sessions",
      "Multi-step booking flow",
      "User dashboard and profile management",
    ],
    tech: ["Next.js 15", "React 19", "TypeScript", "Supabase", "PostgreSQL", "Row-Level Security", "Tailwind CSS", "Framer Motion", "Zod"],
    categories: ["Full-Stack"],
    kind: "Prototype",
    status: "Live",
    track: "experiment",
    year: "2025",
    github: "https://github.com/MasterSaptak/v0-hair-booking-landing-page",
    live: "https://v0-hair-booking-landing-page.vercel.app",
    accent: "purple",
    note: "Initially scaffolded with v0.dev, then extended by hand.",
    evidence:
      "README.md (feature breakdown, explicit tech stack sections, project structure, Supabase RLS setup, v0.dev attribution); live deployment verified reachable.",
  },
  {
    slug: "hobbyzen",
    name: "Hobbyzen Tracker",
    tagline: "Habit tracking with charted streaks and generative insight",
    summary:
      "A habit tracking application that visualises streaks and consistency over time, with generative features layered on the recorded history.",
    problem: "Habit data is only motivating once you can see the shape of it over weeks rather than as a list of checkboxes.",
    solution: "Charted views over recorded habit history, with generative commentary on the patterns those charts expose.",
    approach: [
      "React 19 on Vite, chosen for a fast dev loop on a small single-purpose app.",
      "Recharts for the streak and consistency visualisations.",
      "Google Gen AI SDK for the generative layer over recorded history.",
    ],
    features: ["Habit and streak tracking", "Charted consistency views", "AI-generated insight"],
    tech: ["React 19", "TypeScript", "Vite", "Recharts", "Google Gen AI"],
    categories: ["Full-Stack", "AI / ML"],
    kind: "Experiment",
    status: "Prototype",
    track: "experiment",
    year: "2026",
    github: "https://github.com/MasterSaptak/Habbit-Tracker-",
    accent: "green",
    evidence: "package.json (name 'hobbyzen-tracker', react 19, vite, recharts, @google/genai); repo description.",
  },
  {
    slug: "quiz-platform",
    name: "Quiz Platform",
    tagline: "An early full-stack build: authentication and server-side score persistence",
    summary:
      "An authenticated quiz application with a database-backed scoring system — an early exercise in wiring a frontend to real server-side persistence rather than keeping state in the browser.",
    problem:
      "A quiz that stores scores in the browser cannot tell you who took it, and loses everything the moment the tab closes.",
    solution: "Login-gated sessions with scores written server-side to a database, so results persist and belong to an identified user.",
    approach: [
      "PHP backend handling authentication and score persistence to a database.",
      "Browser frontend built directly on HTML, CSS, and JavaScript, without a framework.",
    ],
    features: ["User login", "Server-side score persistence", "Question and scoring engine"],
    tech: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
    categories: ["Full-Stack"],
    kind: "Academic",
    status: "Archived",
    track: "experiment",
    year: "2022–2023",
    github: "https://github.com/MasterSaptak/Quiz_app2.0",
    accent: "blue",
    note: "An early learning project, kept for the record of where the full-stack work started.",
    evidence:
      "Repo description ('Quiz app demo with login database and backend score save'); primary language PHP; companion HTML repo Quiz_App.",
  },
  {
    slug: "ml-lab",
    name: "ML & Neural Network Lab",
    tagline: "Notebook work on classical machine learning and artificial neural networks",
    summary:
      "Coursework and experimentation in machine learning and artificial neural networks, kept as Jupyter notebooks — the groundwork behind the applied AI in the projects above.",
    approach: [
      "Jupyter notebooks covering classical machine learning methods and artificial neural network implementations.",
    ],
    tech: ["Python", "Jupyter", "Machine Learning", "Neural Networks"],
    categories: ["AI / ML", "Research"],
    kind: "Academic",
    status: "Archived",
    track: "experiment",
    year: "2024–2025",
    github: "https://github.com/MasterSaptak/ml",
    accent: "green",
    note: "Academic lab work rather than a deliverable system.",
    evidence: "Repo language Jupyter Notebook; ML_LAB directory; companion ANN repository described as 'artificial neural networks'.",
  },
  {
    slug: "we-people",
    name: "We People",
    tagline: "Community safety and emergency coordination — concept stage",
    summary:
      "A community-driven safety concept centred on SOS alerts, location sharing, and discovering nearby help during an emergency.",
    tech: ["Realtime", "Location", "Safety"],
    categories: ["Community"],
    kind: "Experiment",
    status: "Concept",
    track: "experiment",
    year: "2025",
    image: "/images/project-wepeople.png",
    accent: "green",
    note: "Concept stage — there is no public repository for this yet, so nothing here is claimed as built.",
    evidence:
      "Carried over from existing portfolio content authored by Saptak. No repository was found on the GitHub account; deliberately listed as a concept with no implementation claims.",
  },
]

export const allProjects = projects.filter((p) => p.track === "project")
export const allExperiments = projects.filter((p) => p.track === "experiment")

export function getBySlug(slug: string) {
  return projects.find((p) => p.slug === slug)
}

/** Categories present in a track, ordered by how many entries use them. */
export function categoriesFor(track: Track): Category[] {
  const counts = new Map<Category, number>()
  for (const p of projects) {
    if (p.track !== track) continue
    for (const c of p.categories) counts.set(c, (counts.get(c) ?? 0) + 1)
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([c]) => c)
}
