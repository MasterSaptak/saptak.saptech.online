"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Briefcase, Globe, TrendingUp, Users, Cpu, Rocket } from "lucide-react"

const ventures = [
  {
    title: "SAPTECH",
    role: "Founder & Lead Architect",
    period: "2020 — Present",
    description: "A technology consultancy and systems engineering hub focused on building high-reliability digital infrastructure for businesses.",
    bullets: [
      "Architected secure payment gateways for national and international transactions.",
      "Developed end-to-end education commerce systems for university admissions.",
      "Managed 50+ production deployments with 99.9% uptime targets.",
      "Implemented zero-trust security architecture for corporate clients."
    ],
    tech: ["Systems Arch", "FinTech", "SecOps", "Cloud Infra"],
    color: "neon-blue" as const,
    icon: Cpu,
  },
  {
    title: "DHOPA",
    role: "Founder & Product Lead",
    period: "2025 — Present",
    description: "A student-centric smart laundry service platform designed to optimize operations in high-volume, logistics-heavy environments.",
    bullets: [
      "Engineered an operations-first dashboard for real-time order tracking.",
      "Designed dynamic pricing algorithms based on demand and logistics cost.",
      "Built a high-performance PWA for field agents to manage pickups/deliveries.",
      "Scaled the platform to serve hundreds of active student subscribers."
    ],
    tech: ["Logistics Tech", "PWA", "Real-time Ops", "BI Metrics"],
    color: "neon-green" as const,
    icon: Rocket,
  },
]

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export function EntrepreneurshipSection() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isHeadingInView = useInView(headingRef, { once: true })

  return (
    <section id="entrepreneurship" className="relative py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-neon-blue tracking-widest uppercase mb-3 block">
            {"// Venture Portfolio"}
          </span>
          <h2
            className={`text-3xl lg:text-4xl font-bold text-foreground text-balance transition-all duration-1000 ${isHeadingInView ? "heading-glow" : ""
              }`}
          >
            Entrepreneurship & Ventures
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl leading-relaxed">
            Building technology-backed businesses from the ground up, focusing on operational efficiency and scalable digital systems.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10px" }}
          className="grid md:grid-cols-2 gap-8"
        >
          {ventures.map((venture) => {
            const isBlue = venture.color === "neon-blue";
            return (
              <motion.div
                key={venture.title}
                variants={cardVariants}
                className="glass-card group relative p-8 rounded-2xl border border-border/50 hover:border-foreground/20 transition-all duration-500 overflow-hidden"
              >
                {/* Background Glow */}
                <div className={`absolute -top-24 -right-24 w-48 h-48 blur-[100px] opacity-10 transition-opacity duration-500 group-hover:opacity-20 ${isBlue ? "bg-neon-blue" : "bg-neon-green"}`} />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 ${isBlue ? "bg-neon-blue/10 border-neon-blue/20 text-neon-blue" : "bg-neon-green/10 border-neon-green/20 text-neon-green"}`}>
                      <venture.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground bg-secondary/50 px-2 py-1 rounded border border-border">
                      {venture.period}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-1 group-hover:text-glow transition-all duration-300">
                    {venture.title}
                  </h3>
                  <p className={`text-xs font-mono uppercase tracking-wider mb-4 ${isBlue ? "text-neon-blue/80" : "text-neon-green/80"}`}>
                    {venture.role}
                  </p>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {venture.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {venture.bullets.map((bullet, i) => (
                      <div key={i} className="flex gap-3 text-xs text-muted-foreground/90">
                        <div className={`mt-1.5 w-1 h-1 rounded-full shrink-0 ${isBlue ? "bg-neon-blue shadow-[0_0_8px_rgba(0,229,255,0.6)]" : "bg-neon-green shadow-[0_0_8px_rgba(57,255,20,0.6)]"}`} />
                        <span className="leading-relaxed">{bullet}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {venture.tech.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary/30 border border-border text-foreground/70">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
