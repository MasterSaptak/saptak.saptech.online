"use client"

import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { DesignPhilosophy } from "@/components/design-philosophy"
import { SystemsSection } from "@/components/systems-section"
import { RoboticsSection } from "@/components/robotics-section"
import { TimelineSection } from "@/components/timeline-section"
import { ResearchSection } from "@/components/research-section"
import { CurrentResearchFocus } from "@/components/current-research-focus"
import { Footer } from "@/components/footer"
import { SystemsAssistant } from "@/components/systems-assistant"
import { ModeProvider, useMode } from "@/components/mode-context"

function SectionDivider({ color = "neon-blue" }: { color?: "neon-blue" | "neon-green" }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <div ref={ref} className="relative py-2" aria-hidden="true">
      <div
        className={`h-px bg-gradient-to-r from-transparent ${
          color === "neon-blue" ? "via-neon-blue/25" : "via-neon-green/25"
        } to-transparent transition-transform duration-1000 ease-out ${
          isInView ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
        }`}
        style={{ transformOrigin: "center" }}
      />
      {/* Animated glow dot traveling the line */}
      {isInView && (
        <motion.div
          className={`absolute top-1/2 -translate-y-1/2 w-12 h-[2px] rounded-full ${
            color === "neon-blue" ? "bg-neon-blue/40" : "bg-neon-green/40"
          }`}
          style={{
            boxShadow: color === "neon-blue"
              ? "0 0 12px rgba(0,229,255,0.5)"
              : "0 0 12px rgba(57,255,20,0.5)",
          }}
          animate={{ left: ["0%", "100%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
        />
      )}
    </div>
  )
}

function PortfolioContent() {
  const { mode } = useMode()

  return (
    <>
      <Navigation />

      {/* Page entrance wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <HeroSection />

        {/* Design Philosophy - always visible below Hero */}
        <SectionDivider color="neon-blue" />
        <DesignPhilosophy />

        <AnimatePresence mode="wait">
          {mode === "founder" ? (
            <motion.div
              key="founder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SectionDivider color="neon-blue" />
              <SystemsSection />
              <SectionDivider color="neon-green" />
              <RoboticsSection />
              <SectionDivider color="neon-blue" />
              <TimelineSection />
              <SectionDivider color="neon-green" />
              <ResearchSection />
              <SectionDivider color="neon-blue" />
              <CurrentResearchFocus />
            </motion.div>
          ) : (
            <motion.div
              key="research"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SectionDivider color="neon-green" />
              <ResearchSection />
              <SectionDivider color="neon-blue" />
              <CurrentResearchFocus />
              <SectionDivider color="neon-green" />
              <SystemsSection />
              <SectionDivider color="neon-blue" />
              <RoboticsSection />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <Footer />
      <SystemsAssistant />

      {/* Animated background grid overlay */}
      <div className="animated-grid-overlay" aria-hidden="true" />

      {/* Subtle full-page scanline overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[60] opacity-[0.012]"
        aria-hidden="true"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.08) 2px, rgba(0,229,255,0.08) 4px)",
        }}
      />
    </>
  )
}

export function PortfolioApp() {
  return (
    <ModeProvider>
      <main className="relative bg-background min-h-screen">
        <PortfolioContent />
      </main>
    </ModeProvider>
  )
}
