"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Shield, TrendingUp, Activity } from "lucide-react"
import { GlitchText, SystemStatus, TechCorners } from "./tech-animations"

const pillars = [
  {
    icon: Shield,
    title: "Security by Default",
    description:
      "Every system starts with threat modeling and zero-trust assumptions. Security is embedded in architecture, not bolted on after deployment.",
  },
  {
    icon: TrendingUp,
    title: "Scalability from Day One",
    description:
      "Microservice boundaries, event-driven patterns, and modular design ensure systems grow gracefully under real-world load.",
  },
  {
    icon: Activity,
    title: "Observability & Resilience",
    description:
      "Structured logging, health checks, and graceful degradation paths. Systems should self-report and recover without manual intervention.",
  },
]

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export function DesignPhilosophy() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isHeadingInView = useInView(headingRef, { once: true })

  return (
    <section id="philosophy" className="relative py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <SystemStatus message="Loading core principles..." color="blue" />
          <span className="text-xs font-mono text-neon-blue tracking-widest uppercase mb-3 block">
            {"// Core Principles"}
          </span>
          <GlitchText
            as="h2"
            className={`text-3xl lg:text-4xl font-bold text-foreground text-balance transition-all duration-1000 ${isHeadingInView ? "heading-glow" : ""
              }`}
          >
            Systems Design Philosophy
          </GlitchText>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.title}
              variants={staggerItem}
              className="glass-card philosophy-card rounded-xl p-6 lg:p-8 hover-elevate group"
            >
              <div className="w-10 h-10 rounded-lg bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center mb-5 group-hover:bg-neon-blue/20 transition-colors duration-300">
                <pillar.icon className="w-5 h-5 text-neon-blue" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
