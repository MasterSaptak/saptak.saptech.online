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
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {directions.map((dir, idx) => (
            <motion.div
              key={dir.title}
              variants={staggerItem}
              className="group relative glass-card p-6 rounded-xl border border-border/50 hover:border-neon-green/30 transition-all duration-500 hover:shadow-[0_0_20px_rgba(57,255,20,0.05)] overflow-hidden"
            >
              {/* Data stream line */}
              <div className="absolute top-0 left-6 w-px h-full bg-gradient-to-b from-transparent via-neon-green/10 to-transparent group-hover:via-neon-green/30 transition-all duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-neon-green/10 border border-neon-green/20 flex items-center justify-center shrink-0 node-pulse group-hover:bg-neon-green/20 transition-colors duration-300">
                    <dir.icon className="w-5 h-5 text-neon-green" />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground bg-secondary/30 px-2 py-0.5 rounded border border-border uppercase">
                    ID: {0x100 + idx}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-foreground mb-2 group-hover:text-neon-green transition-colors">
                  {dir.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  {dir.description}
                </p>

                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border/50">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-mono text-muted-foreground uppercase opacity-50">Discovery Rate</span>
                    <span className="text-[10px] font-mono text-neon-green">89.4%</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] font-mono text-muted-foreground uppercase opacity-50">Impact Factor</span>
                    <span className="text-[10px] font-mono text-neon-blue">A+</span>
                  </div>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute top-0 right-0 w-px h-4 bg-neon-green" />
                <div className="absolute top-0 right-0 w-4 h-px bg-neon-green" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
