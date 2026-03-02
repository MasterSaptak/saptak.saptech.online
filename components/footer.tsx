"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer className="relative py-16 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-sm text-muted-foreground mb-4">
            {"// Designed and built with systems thinking"}
          </p>
          <p className="text-xs text-muted-foreground">
            Saptak Roy Akash &middot; Systems Builder &middot; Cyber Security &middot; Robotics
          </p>
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
        </motion.div>
      </div>
    </footer>
  )
}
