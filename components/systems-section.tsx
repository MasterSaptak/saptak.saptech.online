"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Shield, Wifi, Brain, Lock, CreditCard, Globe, Github, ExternalLink, Cpu, Layout } from "lucide-react"
import Image from "next/image"
import { HardwareBlueprint } from "./hardware-blueprint"
import { useSignal } from "./signal-context"
import { DecryptEffect } from "./tech-animations"

const systems = [
  {
    title: "SepsisAlert",
    problem: "AI-powered early sepsis detection system prioritizing real-time monitoring and medical data streaming via AWS IoT.",
    tech: ["Machine Learning", "AWS IoT", "MIMIC-IV dataset", "Sensors"],
    security: "Secure transmission of patient data (heart rate, SpO2, temperature) in real-time",
    scale: "Designed for rural healthcare workers with cloud connectivity",
    color: "neon-blue" as const,
    image: "/images/project-wepeople.png", // Reusing image placeholder
    github: "#",
    live: "#",
  },
  {
    title: "IOBOTANICA",
    problem: "IoT-based smart gardening system to automate plant care and enable real-time environmental monitoring.",
    tech: ["ESP8266 NodeMCU", "Blynk IoT", "Sensors", "Relay Control"],
    security: "Standalone operation with 18650 lithium battery system and secure remote commands",
    scale: "Automated irrigation and tracking based on soil moisture thresholds",
    color: "neon-green" as const,
    image: "/images/project-iobotanica.png",
    github: "#",
    live: "#",
  },
  {
    title: "GLAMORA",
    problem: "AI-powered hairstyle recommendation and barber booking platform with real-time face shape detection.",
    tech: ["Python", "PyTorch", "OpenCV", "Next.js"],
    security: "Secure user authentication and booking workflows with automated confirmations",
    scale: "Combining AI inference with full-stack web development for seamless user experience",
    color: "neon-blue" as const,
    image: "/images/project-cipher.png", // Reusing image placeholder
    github: "#",
  },
  {
    title: "Dhopa",
    problem: "On-demand laundry platform with dynamic pricing engines and intelligent business analytics.",
    tech: ["React Native", "Node.js", "MongoDB", "AWS"],
    security: "Operations-First design for high-volume, low-margin environments",
    scale: "Microservice architecture for independent scaling of order, payment, and logistics modules",
    color: "neon-green" as const,
    image: "/images/project-dhopa.png",
    github: "#",
    live: "#",
  },
]

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

function SystemCard({
  system,
}: {
  system: (typeof systems)[0]
}) {
  const { emitSignal } = useSignal()
  const isBlue = system.color === "neon-blue"

  const handleMouseEnter = (e: React.MouseEvent) => {
    emitSignal(e.clientX, e.clientY, isBlue ? "blue" : "green")
  }

  return (
    <motion.div
      variants={staggerItem}
      onMouseEnter={handleMouseEnter}
      className="group relative glass-card rounded-xl overflow-hidden glow-border-hover project-card"
    >
      {/* Image area with overlay or Blueprint */}
      <div className="relative h-56 overflow-hidden">
        {system.title.toLowerCase() === "sepsisalert" ? (
          <HardwareBlueprint type="sepsis" className="w-full h-full border-none rounded-none" />
        ) : system.title.toLowerCase() === "iobotanica" ? (
          <HardwareBlueprint type="iobotanica" className="w-full h-full border-none rounded-none" />
        ) : (
          <>
            <Image
              src={system.image}
              alt={system.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
          </>
        )}

        {/* Hover overlay glow */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isBlue
            ? "bg-gradient-to-t from-neon-blue/10 via-transparent to-transparent"
            : "bg-gradient-to-t from-neon-green/10 via-transparent to-transparent"
            }`}
        />
        {/* Scan line on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.03) 2px, rgba(0,229,255,0.03) 4px)",
          }}
        />
      </div>

      {/* Content area */}
      <div className="p-6">
        {/* Title row with action icons */}
        <div className="flex items-start justify-between mb-3">
          <h3
            className={`text-lg lg:text-xl font-bold transition-colors duration-300 ${isBlue ? "text-neon-blue" : "text-neon-green"
              }`}
          >
            <DecryptEffect>{system.title}</DecryptEffect>
          </h3>
          <div className="flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
            {system.github && (
              <a
                href={system.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-neon-blue transition-colors"
                aria-label={`${system.title} GitHub`}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {system.live && (
              <a
                href={system.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-neon-blue transition-colors"
                aria-label={`${system.title} live demo`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {system.problem}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {system.tech.map((t) => (
            <span
              key={t}
              className={`px-2.5 py-1 text-xs font-mono rounded-md border transition-all duration-300 ${isBlue
                ? "border-neon-blue/20 bg-neon-blue/8 text-neon-blue/80 group-hover:border-neon-blue/40 group-hover:bg-neon-blue/12"
                : "border-neon-green/20 bg-neon-green/8 text-neon-green/80 group-hover:border-neon-green/40 group-hover:bg-neon-green/12"
                }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

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
      "Developed RBSAPS_Cipher -- a novel encryption methodology exploring multi-layer ciphertext generation with high-entropy randomization.",
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
            {"// Real-World Systems"}
          </span>
          <h2
            className={`text-3xl lg:text-4xl font-bold text-foreground text-balance transition-all duration-1000 ${isHeadingInView ? "heading-glow" : ""
              }`}
          >
            <DecryptEffect>Featured Systems</DecryptEffect>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl leading-relaxed">
            Not just projects. Production systems designed with security, scalability, and real-world constraints in mind.
          </p>
        </motion.div>

        {/* Systems grid with staggered reveal */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10px" }}
          className="grid md:grid-cols-2 gap-6 mb-24 lg:mb-32"
        >
          {systems.map((system) => (
            <SystemCard key={system.title} system={system} />
          ))}
        </motion.div>

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
