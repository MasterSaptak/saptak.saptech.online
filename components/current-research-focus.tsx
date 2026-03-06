"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Shield, Cpu, Lock, Bot } from "lucide-react"

const directions = [
  {
    icon: Shield,
    title: "Securing Cyber-Physical Systems",
    description:
      "Bridging the gap between digital security and physical infrastructure. Authentication, integrity verification, and fail-safe protocols for real-world actuators.",
  },
  {
    icon: Cpu,
    title: "Lightweight Edge AI for IoT",
    description:
      "Deploying optimized inference models on resource-constrained microcontrollers. Reducing cloud dependency while maintaining accuracy at the edge.",
  },
  {
    icon: Lock,
    title: "Cryptographic Experimentation",
    description:
      "Exploring multi-layer ciphertext generation and high-entropy randomization techniques. Building on the RBSAPS_Cipher framework for novel encryption approaches.",
  },
  {
    icon: Bot,
    title: "Autonomous Systems Architecture",
    description:
      "Designing decision-making pipelines for autonomous agents. Event-driven architectures with safety constraints and human-in-the-loop overrides.",
  },
]

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 25, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export function CurrentResearchFocus() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isHeadingInView = useInView(headingRef, { once: true })

  return (
    <section className="relative py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <span className="text-xs font-mono text-neon-green tracking-widest uppercase mb-3 block">
            {"// Active Exploration"}
          </span>
          <h2
            className={`text-3xl lg:text-4xl font-bold text-foreground text-balance transition-all duration-1000 ${isHeadingInView ? "heading-glow" : ""
              }`}
          >
            Current Research Direction
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl leading-relaxed">
            Focused areas of ongoing investigation and experimentation.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10px" }}
          className="grid md:grid-cols-2 gap-5"
        >
          {directions.map((dir) => (
            <motion.div
              key={dir.title}
              variants={staggerItem}
              className="glass-card research-highlight rounded-xl p-6 flex items-start gap-4 hover-elevate group"
            >
              <div className="w-10 h-10 rounded-lg bg-neon-green/10 border border-neon-green/20 flex items-center justify-center shrink-0 node-pulse group-hover:bg-neon-green/20 transition-colors duration-300">
                <dir.icon className="w-5 h-5 text-neon-green" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1.5">
                  {dir.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {dir.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
