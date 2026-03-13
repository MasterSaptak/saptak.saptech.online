"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Shield, Cpu, Lock, Bot } from "lucide-react"

const directions = [
  {
    icon: Shield,
    title: "Robotics and Intelligent Systems",
    description: "Developing autonomous physical agents capable of complex decision-making and interaction with their environment.",
  },
  {
    icon: Cpu,
    title: "Embedded Systems and IoT Devices",
    description: "Designing efficient sensor-actuator loops on resource-constrained microcontrollers, creating the foundation for the smart environments.",
  },
  {
    icon: Lock,
    title: "Cyber-Physical Systems & Sensor Networks",
    description: "Bridging the gap between digital security and physical infrastructure with fail-safe protocols and robust communication.",
  },
  {
    icon: Bot,
    title: "AI for Healthcare Technologies",
    description: "Applying machine learning to medical data (like the SepsisAlert system) to provide predictive insights and early warnings.",
  },
  {
    icon: Cpu,
    title: "Computer Vision and Edge AI",
    description: "Deploying deep learning models (like PotatoCare and GLAMORA) optimized for real-time inference on edge devices.",
  },
  {
    icon: Shield,
    title: "Technology Entrepreneurship",
    description: "Building scalable startup systems and digital platforms, demonstrating end-to-end capabilities from concept to production.",
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
