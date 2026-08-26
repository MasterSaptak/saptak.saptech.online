"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Shield, Wifi, Brain, Lock, CreditCard, Globe } from "lucide-react"
import { useSignal } from "./signal-context"
import { DecryptEffect } from "./tech-animations"
import { ProjectGrid } from "./project-grid"
import { allProjects } from "@/lib/projects"

const securityTopics = [
  {
    icon: Shield,
    title: "Threat Modeling Mindset",
    description:
      "Every system I build begins with identifying attack surfaces, mapping threat vectors, and designing countermeasures before writing a single line of code.",
  },
  {
    icon: Lock,
    title: "Zero-Trust Architecture",
    description:
      "I design systems where no entity is inherently trusted. Every request is verified, every access is authenticated, and every connection is encrypted.",
  },
  {
    icon: CreditCard,
    title: "Secure Payment Systems",
    description:
      "Implemented international payment gateways with SSL encryption, secure gateway integration, and cross-border compliance thinking across multiple ventures.",
  },
  {
    icon: Wifi,
    title: "IoT Security",
    description:
      "Securing sensor-to-cloud pipelines with encrypted data transmission, device authentication, and tamper-resistant firmware design.",
  },
  {
    icon: Brain,
    title: "Privacy-First Design",
    description:
      "Data minimization, end-to-end encryption, and user-controlled privacy settings are foundational to every system architecture I create.",
  },
  {
    icon: Globe,
    title: "Encryption Research",
    description:
      "Built RBSAPS_Cipher, an academic cipher experiment where a key generated per encryption run makes identical plaintext produce a different ciphertext every time.",
  },
]

const securityStaggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const securityStaggerItem = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export function SystemsSection() {
  const { emitSignal } = useSignal()
  const ref = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const securityHeadingRef = useRef<HTMLDivElement>(null)
  const isHeadingInView = useInView(headingRef, { once: true })
  const isSecurityHeadingInView = useInView(securityHeadingRef, { once: true })

  const handleSecurityMouseEnter = (e: React.MouseEvent) => {
    emitSignal(e.clientX, e.clientY, "blue")
  }

  return (
    <section id="systems" className="relative py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-neon-blue tracking-widest uppercase mb-3 block">
            {"// Projects"}
          </span>
          <h2
            className={`text-3xl lg:text-4xl font-bold text-foreground text-balance transition-all duration-1000 ${isHeadingInView ? "heading-glow" : ""
              }`}
          >
            <DecryptEffect>Selected Work</DecryptEffect>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
            Platforms, products, and applied research. Every entry below links to the source it was
            built from — open a card to read the problem it solves and how it is actually put together.
          </p>
        </motion.div>

        <div ref={ref} className="mb-24 lg:mb-32">
          <ProjectGrid items={allProjects} track="project" accentColor="neon-blue" />
        </div>

        {/* Security Philosophy */}
        <div id="security">
          <motion.div
            ref={securityHeadingRef}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <span className="text-xs font-mono text-neon-green tracking-widest uppercase mb-3 block">
              {"// Security Philosophy"}
            </span>
            <h2
              className={`text-3xl lg:text-4xl font-bold text-foreground text-balance transition-all duration-1000 ${isSecurityHeadingInView ? "heading-glow" : ""
                }`}
            >
              <DecryptEffect>Security-First Mindset</DecryptEffect>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl leading-relaxed">
              Security is not an afterthought. It is the foundation on which every system I design is built.
            </p>
          </motion.div>

          <motion.div
            variants={securityStaggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {securityTopics.map((topic) => (
              <motion.div
                key={topic.title}
                variants={securityStaggerItem}
                onMouseEnter={handleSecurityMouseEnter}
                className="glass-card rounded-xl p-6 group transition-all duration-500 glow-border-hover hover-elevate"
              >
                <div className="w-10 h-10 rounded-lg bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center mb-4 group-hover:bg-neon-blue/20 transition-colors duration-300">
                  <topic.icon className="w-5 h-5 text-neon-blue" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{topic.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {topic.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
