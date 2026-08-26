"use client"

import { motion, useInView } from "framer-motion"
import { useMemo, useRef } from "react"
import { Bot, Leaf, Sparkles, ShoppingBag, ShieldCheck, LayoutDashboard, KeyRound, Network, ArrowRight } from "lucide-react"
import { GlitchText, SystemStatus, TechCorners, DecryptEffect } from "./tech-animations"
import { useSignal } from "./signal-context"

type Product = {
  key: string
  title: string
  subtitle: string
  positioning: string
  /** What exists in the repository today. */
  built: string[]
  /** Stated direction, not a claim about anything shipped. */
  next: string[]
  tags: string[]
  accent: "blue" | "green" | "purple"
  icon: React.ElementType
  status: "Prototype" | "In Development"
}

const products: Product[] = [
  {
    key: "iobotanica",
    title: "IOBOTANICA",
    subtitle: "Smart Garden Node",
    positioning: "Sensing and irrigation on real hardware, with cloud telemetry",
    built: [
      "ESP8266 node reading soil moisture, temperature, humidity, and motion on scheduled intervals.",
      "Relay-driven pump controlled from either the cloud dashboard or a physical button, kept in sync across reconnects.",
      "On-device 16×2 LCD readout that stays useful when the network does not.",
    ],
    next: ["Vision-based plant health from captured images", "Watering predicted from soil trends rather than thresholds"],
    tags: ["ESP8266", "Sensors", "Relay Control", "Cloud Telemetry"],
    accent: "green",
    icon: Leaf,
    status: "Prototype",
  },
  {
    key: "glamora",
    title: "GLAMORA",
    subtitle: "AI Beauty Platform",
    positioning: "Hairstyle recommendation keyed to face structure, plus stylist booking",
    built: [
      "Next.js frontend over a style catalogue organised by face structure.",
      "Booking flow connecting users to stylists for salon or doorstep service.",
      "A separately deployed booking prototype used to validate the interaction model end to end.",
    ],
    next: ["Facial analysis via OpenCV and MediaPipe", "Geo-based stylist discovery", "FastAPI inference backend"],
    tags: ["Computer Vision", "OpenCV", "MediaPipe", "Bookings", "Next.js"],
    accent: "purple",
    icon: Sparkles,
    status: "In Development",
  },
  {
    key: "chocket",
    title: "CHOCKET",
    subtitle: "Commerce Layer",
    positioning: "Cross-border marketplace with multi-currency checkout",
    built: [
      "Next.js storefront for imported brands, with multi-currency pricing in the checkout.",
      "Gifting treated as a first-class order type rather than a checkout add-on.",
    ],
    next: ["Shared billing and entitlements across the other products"],
    tags: ["E‑commerce", "Multi‑currency", "Checkout", "Next.js"],
    accent: "blue",
    icon: ShoppingBag,
    status: "In Development",
  },
]

function AccentBadge({ accent, children }: { accent: Product["accent"]; children: React.ReactNode }) {
  const cls =
    accent === "green"
      ? "border-neon-green/25 bg-neon-green/10 text-neon-green/80"
      : accent === "purple"
      ? "border-purple-400/25 bg-purple-400/10 text-purple-300/90"
      : "border-neon-blue/25 bg-neon-blue/10 text-neon-blue/80"
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[11px] font-mono tracking-[0.22em] uppercase border ${cls}`}>
      {children}
    </span>
  )
}

function ProductCard({ p }: { p: Product }) {
  const { emitSignal } = useSignal()

  const accent = useMemo(() => {
    if (p.accent === "green") return { ring: "border-neon-green/25", glow: "bg-neon-green", tag: "text-neon-green" }
    if (p.accent === "purple") return { ring: "border-purple-400/25", glow: "bg-purple-400", tag: "text-purple-300" }
    return { ring: "border-neon-blue/25", glow: "bg-neon-blue", tag: "text-neon-blue" }
  }, [p.accent])

  const handleMouseEnter = (e: React.MouseEvent) => {
    emitSignal(e.clientX, e.clientY, p.accent === "green" ? "green" : "blue")
  }

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      className={`group relative rounded-2xl border border-white/10 bg-card/40 backdrop-blur-md overflow-hidden hover-elevate ${accent.ring}`}
      initial={{ opacity: 0, y: 22, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`absolute -top-28 -right-24 w-56 h-56 blur-[100px] opacity-10 group-hover:opacity-25 transition-opacity ${accent.glow}`} />

      <div className="relative z-10 p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <AccentBadge accent={p.accent}>
                <p.icon className="w-3.5 h-3.5" />
                {p.status}
              </AccentBadge>
              <span className="text-[11px] font-mono text-muted-foreground tracking-[0.22em] uppercase">
                {p.subtitle}
              </span>
            </div>

            <h3 className={`text-2xl font-black tracking-tight ${accent.tag}`}>
              <DecryptEffect>{p.title}</DecryptEffect>
            </h3>
            <p className="text-sm text-foreground/85 mt-2 leading-relaxed">
              {p.positioning}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <div className="text-[10px] font-mono tracking-[0.25em] uppercase text-muted-foreground mb-2.5">
            Built
          </div>
          <div className="space-y-2.5">
            {p.built.map((b) => (
              <div key={b} className="flex gap-3 text-sm text-foreground/85 leading-relaxed">
                <span className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${accent.glow}/70`} />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-white/5">
          <div className="text-[10px] font-mono tracking-[0.25em] uppercase text-muted-foreground mb-2.5">
            Direction — not yet built
          </div>
          <div className="flex flex-wrap gap-2">
            {p.next.map((n) => (
              <span
                key={n}
                className="text-[11px] font-mono px-2 py-1 rounded-md border border-dashed border-border text-muted-foreground"
              >
                {n}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary/30 border border-border text-foreground/70">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function EcosystemSection() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isHeadingInView = useInView(headingRef, { once: true })

  return (
    <section id="ecosystem" className="relative py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <SystemStatus message="Booting unified product ecosystem..." color="green" />
          <span className="text-xs font-mono text-neon-green tracking-widest uppercase mb-3 block">
            {"// SAPTECH AI ECOSYSTEM"}
          </span>
          <GlitchText
            as="h2"
            className={`text-3xl lg:text-4xl font-bold text-foreground text-balance transition-all duration-1000 ${isHeadingInView ? "heading-glow" : ""}`}
          >
            Multi‑domain products. One intelligence layer.
          </GlitchText>
          <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
            These are separate builds that share a thesis: sensing, vision, and commerce are the same
            problem viewed from three angles. Each card separates what exists in the repository today
            from where the product is headed.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 grid md:grid-cols-2 gap-6">
            <ProductCard p={products[0]} />
            <ProductCard p={products[1]} />
            <div className="md:col-span-2">
              <ProductCard p={products[2]} />
            </div>
          </div>

          <div className="lg:col-span-4">
            <TechCorners color="blue" className="rounded-2xl border border-border bg-secondary/20 backdrop-blur-md">
              <div className="p-7">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
                      Common Platform Layer
                    </div>
                    <h3 className="text-xl font-bold text-foreground mt-2 text-balance">
                      Shared infrastructure that makes it “startup‑level”
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center">
                    <Network className="w-5 h-5 text-neon-blue" />
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    { icon: KeyRound, title: "Same login system", desc: "One identity across all products (roles, profiles, entitlements)." },
                    { icon: Bot, title: "Shared AI engine", desc: "Reusable CV/ML pipelines, inference services, and evaluation loops." },
                    { icon: LayoutDashboard, title: "Cross‑product dashboard", desc: "One home for insights, alerts, subscriptions, and usage analytics." },
                    { icon: ShieldCheck, title: "Security baseline", desc: "Consistent auth, rate limits, audit logs, and privacy practices." },
                  ].map((row) => (
                    <div key={row.title} className="flex gap-3">
                      <div className="w-9 h-9 rounded-lg bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center shrink-0">
                        <row.icon className="w-4.5 h-4.5 text-neon-blue" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{row.title}</div>
                        <div className="text-xs text-muted-foreground leading-relaxed mt-0.5">{row.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-7 rounded-xl border border-dashed border-border bg-background/40 p-4">
                  <div className="text-[10px] font-mono tracking-[0.25em] uppercase text-muted-foreground">
                    Status
                  </div>
                  <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed">
                    This shared layer is the design intent across the products, not a service that runs
                    today. Each product currently owns its own identity and data. The individual builds
                    below are the real, inspectable work.
                  </p>
                </div>

                <a
                  href="#systems"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 border border-neon-blue/25 bg-neon-blue/10 text-neon-blue font-mono text-sm tracking-wider lab-button"
                >
                  Explore the builds
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </TechCorners>
          </div>
        </div>
      </div>
    </section>
  )
}

