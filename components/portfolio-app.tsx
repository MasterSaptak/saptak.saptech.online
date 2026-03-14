"use client"

import dynamic from "next/dynamic"
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
import { SkillsSection } from "@/components/skills-section"
import { EntrepreneurshipSection } from "@/components/entrepreneurship-section"
import { GameDevSection } from "@/components/game-dev-section"
import { ModeProvider, useMode } from "@/components/mode-context"
import { SignalProvider } from "@/components/signal-context"

const CircuitBackground = dynamic(
  () => import("@/components/circuit-background").then(m => ({ default: m.CircuitBackground })),
  { ssr: false }
)
const ScannerBeam = dynamic(
  () => import("@/components/scanner-beam").then(m => ({ default: m.ScannerBeam })),
  { ssr: false }
)
const DataStream = dynamic(
  () => import("@/components/data-stream").then(m => ({ default: m.DataStream })),
  { ssr: false }
)
const SignalOverlay = dynamic(
  () => import("@/components/signal-overlay").then(m => ({ default: m.SignalOverlay })),
  { ssr: false }
)

function SectionDivider({ color = "neon-blue" }: { color?: "neon-blue" | "neon-green" }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10px" })

  return (
    <div ref={ref} className="relative py-2" aria-hidden="true">
      <div
        className={`h-px bg-gradient-to-r from-transparent ${color === "neon-blue" ? "via-neon-blue/25" : "via-neon-green/25"
          } to-transparent transition-transform duration-1000 ease-out ${isInView ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
          }`}
        style={{ transformOrigin: "center" }}
      />
      {/* Animated glow dot traveling the line */}
      {isInView && (
        <motion.div
          className={`absolute top-1/2 -translate-y-1/2 w-12 h-[2px] rounded-full ${color === "neon-blue" ? "bg-neon-blue/40" : "bg-neon-green/40"
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

        {/* Design Philosophy & Skills - always visible below Hero */}
        <SectionDivider color="neon-blue" />
        <DesignPhilosophy />
        <SectionDivider color="neon-green" />
        <SkillsSection />

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
              <EntrepreneurshipSection />
              <SectionDivider color="neon-green" />
              <SystemsSection />
              <SectionDivider color="neon-blue" />
              <GameDevSection />
              <SectionDivider color="neon-green" />
              <RoboticsSection />
              <SectionDivider color="neon-blue" />
              <TimelineSection />
              <SectionDivider color="neon-green" />
              <ResearchSection />
              <SectionDivider color="neon-blue" />
              <CurrentResearchFocus />
            </motion.div>
          ) : mode === "research" ? (
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
              <GameDevSection />
              <SectionDivider color="neon-green" />
              <RoboticsSection />
            </motion.div>
          ) : (
            <motion.div
              key="game-dev"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative"
            >
              {/* Game Engine Grid Overlay - specific to this mode */}
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
              
              <SectionDivider color="neon-blue" />
              <div className="px-6 py-4 border-l-2 border-purple-500/30 ml-4 mb-8">
                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-[0.2em]">Engine_Core_Initialized</span>
                <h2 className="text-2xl font-bold text-foreground mt-1">Technical Game Design</h2>
              </div>

              <GameDevSection />
              <SectionDivider color="neon-green" />
              <SystemsSection />
              <SectionDivider color="neon-blue" />
              <RoboticsSection />
              <SectionDivider color="neon-green" />
              <TimelineSection />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <Footer />
      <SystemsAssistant />

      {/* Circuit board animated background */}
      <CircuitBackground />

      {/* Robotic scanner beam */}
      <ScannerBeam />

      {/* Data streams along edges */}
      <DataStream />

      {/* Hex grid tech background */}
      <div className="hex-grid-bg" aria-hidden="true" />

      {/* Animated background grid overlay */}
      <div className="animated-grid-overlay" aria-hidden="true" />

      {/* Mode-specific background overlays */}
      <AnimatePresence>
        {mode === "research" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_70%_30%,rgba(57,255,20,0.03)_0%,transparent_50%)]"
          />
        )}
        {mode === "game-dev" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_70%_30%,rgba(168,85,247,0.05)_0%,transparent_50%)]"
          />
        )}
      </AnimatePresence>

      {/* Persistent Crosshair for Game Dev Mode */}
      <AnimatePresence>
        {mode === "game-dev" && (
          <motion.div
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center opacity-30"
          >
            <div className="w-8 h-8 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-2 bg-purple-400" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-2 bg-purple-400" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-px bg-purple-400" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-px bg-purple-400" />
              <div className="absolute inset-0 border border-purple-400/20 rounded-full" />
            </div>
            {/* Aspect Ratio Markers */}
            <div className="absolute top-8 left-8 text-[8px] font-mono text-purple-400 tracking-tighter">16:9_ENGINE_VIEW</div>
            <div className="absolute bottom-8 right-8 text-[8px] font-mono text-purple-400 tracking-tighter">DEBUG_V1.0.4</div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="pointer-events-none fixed inset-0 z-[60] opacity-[0.015]"
        aria-hidden="true"
        style={{
          background: mode === "research"
            ? "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(57,255,20,0.08) 2px, rgba(57,255,20,0.08) 4px)"
            : mode === "game-dev"
            ? "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(168,85,247,0.1) 2px, rgba(168,85,247,0.1) 4px)"
            : "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.08) 2px, rgba(0,229,255,0.08) 4px)",
        }}
      />
    </>
  )
}

export function PortfolioApp() {
  return (
    <ModeProvider>
      <SignalProvider>
        <main className="relative bg-background min-h-screen overflow-x-hidden w-full">
          <PortfolioContent />
          <SignalOverlay />
        </main>
      </SignalProvider>
    </ModeProvider>
  )
}
