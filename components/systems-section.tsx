"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  Shield,
  Wifi,
  Brain,
  Lock,
  CreditCard,
  Globe,
  Github,
  ExternalLink,
  Sparkles,
} from "lucide-react"
import Image from "next/image"
import { HardwareBlueprint } from "./hardware-blueprint"
import { useSignal } from "./signal-context"
import { DecryptEffect } from "./tech-animations"

const projects = [
  {
    title: "SepsisAlert",
    year: "2025",
    status: "Shipped",
    tagline: "AI Healthcare Monitoring System",
    problem:
      "AI-powered early sepsis screening system designed for rural healthcare workers with real-time vitals monitoring and cloud analytics.",
    details: [
      "Integrated sensors: heart rate, SpO2, and temperature for real-time patient monitoring.",
      "Streamed medical telemetry using AWS IoT infrastructure for real-time analytics.",
      "Applied ML models trained on the MIMIC-IV clinical dataset for risk prediction.",
    ],
    tech: ["AWS IoT", "Machine Learning", "MIMIC-IV", "Sensors"],
    color: "neon-blue" as const,
    image: "/images/project-wepeople.png",
    github: "#",
    live: "#",
  },
  {
    title: "We People",
    year: "2025",
    status: "In Progress",
    tagline: "Humanitarian Safety Platform",
    problem:
      "A community-driven safety platform focused on emergency response and public safety.",
    details: [
      "Supports SOS alerts, location sharing, and nearby assistance discovery.",
      "Designed for fast incident reporting and community-driven coordination.",
    ],
    tech: ["Realtime", "Location", "Safety", "Community"],
    color: "neon-green" as const,
    image: "/images/project-wepeople.png",
    github: "#",
    live: "#",
  },
  {
    title: "RBSAPS Cipher",
    year: "2023–Present",
    status: "Ongoing",
    tagline: "Cryptosystem Development",
    problem:
      "A cryptographic system that generates multiple ciphertext outputs for a single plaintext, exploring high-entropy randomization paths.",
    details: ["Designed a cryptosystem generating multiple ciphertext outputs for a single plaintext."],
    tech: ["Cryptography", "Entropy", "Security"],
    color: "neon-blue" as const,
    image: "/images/project-cipher.png",
    github: "#",
  },
  {
    title: "Quiz App",
    year: "2022–Present",
    status: "Ongoing",
    tagline: "Authentication-based Quiz Platform",
    problem:
      "A lightweight, authentication-based quiz platform built for reliability and speed.",
    details: ["Developed an authentication-based quiz platform using HTML, CSS, and JavaScript."],
    tech: ["HTML", "CSS", "JavaScript", "Auth"],
    color: "neon-green" as const,
    image: "/images/project-wepeople.png",
    github: "#",
  },
  {
    title: "WashOut (Dhopa)",
    year: "2023–Present",
    status: "Ongoing",
    tagline: "Full-Stack Laundry Platform",
    problem:
      "An online laundry booking platform with a modern web experience and scalable backend.",
    details: ["Built an online laundry booking platform using React, Node.js, Express, and MongoDB."],
    tech: ["React", "Node.js", "Express", "MongoDB"],
    color: "neon-blue" as const,
    image: "/images/project-dhopa.png",
    github: "#",
    live: "#",
  },
  {
    title: "IOBOTANICA",
    year: "2023–Present",
    status: "Ongoing",
    tagline: "Smart Agri‑Tech Platform (AI + IoT)",
    problem:
      "AI + IoT powered intelligent plant ecosystem with predictive watering, health scoring, and vision-based growth tracking.",
    details: [
      "Predictive watering intelligence using Weather API + soil trends (e.g., “Next watering in 6 hours”).",
      "Mobile app dashboard (not basic Blynk): plant health score, water usage analytics, growth tracking charts.",
      "Smart alerts: plant stress, optimal growth windows, water tank low, sensor anomalies.",
      "Camera + AI vision: detect leaf diseases and track growth via images (future scope → core feature).",
      "SaaS + hardware combo: sell the kit (ESP8266 + sensors + pump) + subscription for AI insights.",
      "Hardware: ESP8266 NodeMCU with soil moisture, DHT11, PIR; relay-controlled pump; 16x2 LCD; portable 18650 power.",
      "Developed under the supervision of Dr. Gaurav Barnwal.",
    ],
    tech: ["ESP8266", "Sensors", "Weather API", "Predictive AI", "Mobile Dashboard", "SaaS"],
    color: "neon-green" as const,
    image: "/images/project-iobotanica.png",
    github: "#",
    live: "#",
  },
  {
    title: "GLAMORA",
    year: "Ongoing",
    status: "In Progress",
    tagline: "AI Beauty Platform (Stylist + Bookings)",
    problem:
      "Your personal AI stylist: AR try-on, confidence scoring, social virality, and a creator economy for stylists — all inside a premium booking flow.",
    details: [
      "Live AR hairstyle try‑on: real-time preview on face via camera (not just static recommendations).",
      "AI confidence score (e.g., “This style suits you 92%”) + explainable reasons.",
      "Social + viral layer: share previews, “rate my look”, trend discovery.",
      "Creator economy: stylists upload looks, earn from bookings, and build a following.",
      "Expand beyond hair: beard styles, makeup suggestions, skin analysis.",
      "Tech stack: Python + PyTorch + OpenCV for CV inference; Next.js frontend; auth, dashboards, booking, email confirmations.",
    ],
    tech: ["Computer Vision", "AR Try‑On", "Python", "PyTorch", "OpenCV", "Next.js", "Booking"],
    color: "neon-blue" as const,
    image: "/images/project-cipher.png",
    github: "#",
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
  system: (typeof projects)[0]
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
      className="group relative rounded-2xl overflow-hidden border border-white/10 bg-card/40 backdrop-blur-md project-card"
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
        {/* Subtle grain sheen */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), transparent 45%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.04), transparent 50%)",
          }}
        />
      </div>

      {/* Content area */}
      <div className="p-6">
        {/* Badge row */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-muted-foreground">
            {system.year}
          </span>
          <span className="w-1 h-1 rounded-full bg-border" aria-hidden="true" />
          <span
            className={`text-[11px] font-mono tracking-[0.22em] uppercase px-2 py-0.5 rounded-full border ${isBlue
              ? "border-neon-blue/25 text-neon-blue/80 bg-neon-blue/10"
              : "border-neon-green/25 text-neon-green/80 bg-neon-green/10"
              }`}
          >
            {system.status}
          </span>
        </div>

        {/* Title row with action icons */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3
              className={`text-xl lg:text-2xl font-bold transition-colors duration-300 ${isBlue ? "text-neon-blue" : "text-neon-green"
                }`}
            >
              <DecryptEffect>{system.title}</DecryptEffect>
            </h3>
            <p className="text-sm text-foreground/85 mt-1">{system.tagline}</p>
          </div>
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

        {/* Details (expand) */}
        <details className="group/details">
          <summary className="list-none cursor-pointer select-none inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground transition">
            <Sparkles className="w-3.5 h-3.5" />
            View build details
            <span className="ml-1 text-foreground/60 group-open/details:rotate-90 transition">›</span>
          </summary>
          <ul className="mt-3 space-y-2 text-sm text-foreground/85">
            {system.details.map((d) => (
              <li key={d} className="flex gap-3 leading-relaxed">
                <span
                  className={`mt-2 w-1.5 h-1.5 rounded-full ${isBlue ? "bg-neon-blue/70" : "bg-neon-green/70"}`}
                />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </details>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mt-5">
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
            {"// Projects"}
          </span>
          <h2
            className={`text-3xl lg:text-4xl font-bold text-foreground text-balance transition-all duration-1000 ${isHeadingInView ? "heading-glow" : ""
              }`}
          >
            <DecryptEffect>Selected Work</DecryptEffect>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl leading-relaxed">
            Modern systems, applied research, and full-stack products — built with real constraints, measurable outcomes, and careful engineering.
          </p>
        </motion.div>

        {/* Projects grid with staggered reveal */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10px" }}
          className="grid md:grid-cols-2 gap-6 mb-24 lg:mb-32"
        >
          {projects.map((system) => (
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
