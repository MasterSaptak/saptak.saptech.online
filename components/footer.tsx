"use client"

import { motion } from "framer-motion"
import { TechCorners } from "./tech-animations"

export function Footer() {
  return (
    <footer className="relative py-16 border-t border-border overflow-hidden">
      {/* Electromagnetic wave effects */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] em-wave"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.3), transparent)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-0 right-0 h-[1px] em-wave-delayed"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(57,255,20,0.2), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Signal strength indicator */}
          <div className="flex items-end justify-center gap-[3px] mb-6" aria-hidden="true">
            <div className="signal-bar w-[3px] h-2 rounded-sm bg-neon-blue/40" />
            <div className="signal-bar w-[3px] h-3 rounded-sm bg-neon-blue/50" />
            <div className="signal-bar w-[3px] h-4 rounded-sm bg-neon-blue/60" />
            <div className="signal-bar w-[3px] h-5 rounded-sm bg-neon-blue/70" />
          </div>

          <TechCorners className="inline-block px-8 py-4" color="blue">
            <p className="font-mono text-sm text-muted-foreground mb-4">
              {"// Designed and built with systems thinking"}
            </p>
            <p className="text-xs text-muted-foreground">
              Saptak Roy Akash &middot; Systems Builder &middot; Cyber Security &middot; Robotics
            </p>
          </TechCorners>

          <div className="mt-6 flex items-center justify-center gap-6">
            <a
              href="#hero"
              className="text-xs font-mono text-neon-blue hover:text-neon-blue/80 transition-colors"
            >
              Back to top
            </a>
            <span className="text-border">|</span>
            <a
              href="/terminal"
              className="text-xs font-mono text-neon-green hover:text-neon-green/80 transition-colors"
            >
              {">"} Terminal
            </a>
          </div>

          {/* Boot timestamp */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <span className="w-1 h-1 rounded-full bg-neon-green pulse-glow" />
            <span className="text-[9px] font-mono text-muted-foreground/50 tracking-widest uppercase">
              system uptime: stable • all services operational
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
