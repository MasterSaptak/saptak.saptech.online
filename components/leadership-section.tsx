"use client"

import { motion, useInView } from "framer-motion"
import { useMemo, useRef } from "react"
import {
  Users,
  Megaphone,
  CalendarDays,
  Theater,
  Crown,
  Radio,
  ClipboardList,
  Camera,
  Aperture,
  Atom,
} from "lucide-react"
import { GlitchText, SystemStatus, TechCorners, DecryptEffect } from "./tech-animations"
import { useSignal } from "./signal-context"

type Item = {
  title: string
  org: string
  role: string
  timeframe?: string
  icon: React.ElementType
  tags: string[]
  accent: "blue" | "green"
}

const items: Item[] = [
  {
    title: "Bangladesh Academy of Geological Sciences (BDAGS)",
    org: "BDAGS",
    role: "Founding member & organiser",
    icon: Crown,
    tags: ["Founding", "Operations", "Community"],
    accent: "blue",
  },
  {
    title: "DevFest Kolkata 2023",
    org: "GDG / DevFest",
    role: "Outreach — organising team",
    timeframe: "2023",
    icon: Megaphone,
    tags: ["Outreach", "Partnerships", "Coordination"],
    accent: "green",
  },
  {
    title: "Anandamela — Grand Cultural Festival",
    org: "Visva Bharati University",
    role: "Yearly festival manager",
    timeframe: "2022 • 2023 • 2024",
    icon: CalendarDays,
    tags: ["Leadership", "Logistics", "Execution"],
    accent: "blue",
  },
  {
    title: "Daul — Acting Group",
    org: "Performing Arts",
    role: "Performing actor (multi-stage)",
    icon: Theater,
    tags: ["Stage", "Performance", "Discipline"],
    accent: "green",
  },
  {
    title: "Shantibuzz Chess Squad",
    org: "Chess Community",
    role: "Co‑founder & administrator",
    timeframe: "150+ active members",
    icon: Users,
    tags: ["Tournaments", "Community", "Growth"],
    accent: "blue",
  },
  {
    title: "IoT Club (VBDCSS)",
    org: "Visva Bharati University",
    role: "Active member",
    timeframe: "2022–2023",
    icon: Radio,
    tags: ["IoT", "Builders", "Workshops"],
    accent: "green",
  },
  {
    title: "Departmental Cultural Events",
    org: "Visva Bharati University",
    role: "Organising team + teacher coordination",
    icon: ClipboardList,
    tags: ["Coordination", "Teamwork", "Ops"],
    accent: "blue",
  },
  {
    title: "Sports Day — Bir Srestha Nur Mohammad Public College (BNMPC)",
    org: "BNMPC",
    role: "Photographer",
    icon: Camera,
    tags: ["Coverage", "Sports", "Delivery"],
    accent: "green",
  },
  {
    title: "Institutional Event Photography",
    org: "Freshers • Farewell • Ceremonies",
    role: "Occasional photographer",
    icon: Aperture,
    tags: ["Media", "Events", "Storytelling"],
    accent: "blue",
  },
  {
    title: "ISTRAC — Science Club",
    org: "Ideal School and College",
    role: "Member",
    icon: Atom,
    tags: ["Science", "Curiosity", "Team"],
    accent: "green",
  },
]

function AccentDot({ accent }: { accent: "blue" | "green" }) {
  return (
    <span
      className={`w-2 h-2 rounded-full ${accent === "blue" ? "bg-neon-blue" : "bg-neon-green"} pulse-glow`}
      aria-hidden="true"
    />
  )
}

function LeadershipCard({ item }: { item: Item }) {
  const { emitSignal } = useSignal()
  const isBlue = item.accent === "blue"

  const accent = useMemo(
    () => ({
      border: isBlue ? "border-neon-blue/20" : "border-neon-green/20",
      bg: isBlue ? "bg-neon-blue/10" : "bg-neon-green/10",
      text: isBlue ? "text-neon-blue" : "text-neon-green",
      shadow: isBlue ? "rgba(0,229,255,0.18)" : "rgba(57,255,20,0.18)",
    }),
    [isBlue]
  )

  const onEnter = (e: React.MouseEvent) => {
    emitSignal(e.clientX, e.clientY, isBlue ? "blue" : "green")
  }

  return (
    <motion.div
      onMouseEnter={onEnter}
      initial={{ opacity: 0, y: 26, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative rounded-2xl border border-white/10 bg-card/40 backdrop-blur-md overflow-hidden hover-elevate ${accent.border}`}
    >
      <div
        className="absolute -top-20 -right-16 w-48 h-48 blur-[90px] opacity-10 group-hover:opacity-25 transition-opacity"
        style={{ background: `radial-gradient(circle, ${accent.shadow} 0%, transparent 70%)` }}
        aria-hidden="true"
      />

      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <AccentDot accent={item.accent} />
              <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-muted-foreground">
                {item.org}
              </span>
              {item.timeframe && (
                <>
                  <span className="w-1 h-1 rounded-full bg-border" aria-hidden="true" />
                  <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-muted-foreground">
                    <DecryptEffect>{item.timeframe}</DecryptEffect>
                  </span>
                </>
              )}
            </div>

            <h3 className="text-lg font-bold text-foreground leading-snug text-balance">
              {item.title}
            </h3>
            <p className={`mt-2 text-xs font-mono tracking-wider uppercase ${accent.text}/80`}>
              {item.role}
            </p>
          </div>

          <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${accent.border} ${accent.bg}`}>
            <item.icon className={`w-5 h-5 ${accent.text}`} />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <span
              key={t}
              className={`text-[10px] font-mono px-2 py-0.5 rounded-full border bg-secondary/30 ${accent.border} text-foreground/70`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function LeadershipSection() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isHeadingInView = useInView(headingRef, { once: true })

  return (
    <section id="leadership" className="relative py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <SystemStatus message="Syncing public footprint + leadership ops..." color="blue" />
          <span className="text-xs font-mono text-neon-blue tracking-widest uppercase mb-3 block">
            {"// Events & Leadership"}
          </span>
          <GlitchText
            as="h2"
            className={`text-3xl lg:text-4xl font-bold text-foreground text-balance transition-all duration-1000 ${isHeadingInView ? "heading-glow" : ""}`}
          >
            Field leadership, community ops, and public execution
          </GlitchText>
          <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
            Building isn’t only code — it’s coordination under pressure: managing teams, shipping events, running communities, and delivering outcomes on real timelines.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
            {items.slice(0, 8).map((item) => (
              <LeadershipCard key={item.title} item={item} />
            ))}
          </div>

          <div className="lg:col-span-4">
            <TechCorners color="green" className="rounded-2xl border border-border bg-secondary/20 backdrop-blur-md">
              <div className="p-7">
                <div className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
                  Signal summary
                </div>
                <h3 className="text-xl font-bold text-foreground mt-2 text-balance">
                  What this proves (in product terms)
                </h3>

                <div className="mt-6 space-y-3">
                  {[
                    { k: "OPS", v: "Event execution + logistics ownership" },
                    { k: "LEAD", v: "Founding + admin responsibility" },
                    { k: "COMMS", v: "Outreach + coordination" },
                    { k: "CRAFT", v: "Stage + media delivery" },
                  ].map((row) => (
                    <div key={row.k} className="flex items-start justify-between gap-4 rounded-xl border border-border bg-background/40 p-3">
                      <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-neon-green/80">
                        <DecryptEffect>{row.k}</DecryptEffect>
                      </span>
                      <span className="text-xs text-muted-foreground leading-relaxed text-right">
                        {row.v}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-7">
                  <div className="text-[10px] font-mono tracking-[0.25em] uppercase text-muted-foreground mb-2">
                    Remaining entries
                  </div>
                  <div className="space-y-3">
                    {items.slice(8).map((item) => (
                      <div key={item.title} className="rounded-xl border border-border bg-secondary/10 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-foreground/90 truncate">
                              {item.title}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {item.role}
                            </div>
                          </div>
                          <div className="w-9 h-9 rounded-lg bg-neon-green/10 border border-neon-green/20 flex items-center justify-center shrink-0">
                            <item.icon className="w-4.5 h-4.5 text-neon-green" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TechCorners>
          </div>
        </div>
      </div>
    </section>
  )
}

