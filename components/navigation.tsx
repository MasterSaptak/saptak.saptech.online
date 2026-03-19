"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useMode } from "./mode-context"

const founderLinks = [
  { label: "Ventures", href: "#entrepreneurship" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Leadership", href: "#leadership" },
  { label: "Systems", href: "#systems" },
  { label: "Security", href: "#security" },
  { label: "Robotics", href: "#robotics" },
  { label: "Timeline", href: "#timeline" },
  { label: "Terminal", href: "/terminal" },
]

const researchLinks = [
  { label: "Core Research", href: "#research" },
  { label: "Protocol Security", href: "#security" },
  { label: "System Arch", href: "#systems" },
  { label: "Bio-Robotics", href: "#robotics" },
  { label: "Terminal", href: "/terminal" },
]

const gameDevLinks = [
  { label: "Unity_ECS", href: "#game-dev" },
  { label: "Physics_SOLVER", href: "#game-dev" },
  { label: "VFX_STUDIO", href: "#game-dev" },
  { label: "Hardware_Bot", href: "#robotics" },
  { label: "Terminal", href: "/terminal" },
]

function SiteSwitcher({ className = "" }: { className?: string }) {
  return (
    <div role="group" aria-label="Site navigation" className={`flex items-center rounded-full border border-border bg-secondary/40 p-0.5 ${className}`}>
      <span aria-current="page" className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-mono bg-neon-blue/15 text-neon-blue border border-neon-blue/30 cursor-default">
        Portfolio
      </span>
      <a
        href="https://error-ccx404.saptech.online/"
        className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-mono text-muted-foreground hover:text-foreground border border-transparent transition-all duration-300"
      >
        Community
      </a>
    </div>
  )
}

function ModeToggle({ className = "" }: { className?: string }) {
  const { mode, setMode } = useMode()

  return (
    <div role="group" aria-label="View mode" className={`flex items-center rounded-full border border-border bg-secondary/40 p-0.5 ${className}`}>
      <button
        onClick={() => setMode("founder")}
        aria-pressed={mode === "founder"}
        className={`px-2 sm:px-3 py-1 rounded-full text-[10px] font-mono whitespace-nowrap transition-all duration-300 ${mode === "founder"
          ? "bg-neon-blue/15 text-neon-blue border border-neon-blue/30 shadow-[0_0_10px_rgba(0,229,255,0.2)]"
          : "text-muted-foreground hover:text-foreground border border-transparent"
          }`}
      >
        Founder
      </button>
      <button
        onClick={() => setMode("research")}
        aria-pressed={mode === "research"}
        className={`px-2 sm:px-3 py-1 rounded-full text-[10px] font-mono whitespace-nowrap transition-all duration-300 ${mode === "research"
          ? "bg-neon-green/15 text-neon-green border border-neon-green/30 shadow-[0_0_10px_rgba(57,255,20,0.2)]"
          : "text-muted-foreground hover:text-foreground border border-transparent"
          }`}
      >
        Researcher
      </button>
      <button
        onClick={() => setMode("game-dev")}
        aria-pressed={mode === "game-dev"}
        className={`px-2 sm:px-3 py-1 rounded-full text-[10px] font-mono whitespace-nowrap transition-all duration-300 ${mode === "game-dev"
          ? "bg-purple-500/15 text-purple-400 border border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]"
          : "text-muted-foreground hover:text-foreground border border-transparent"
          }`}
      >
        Game Design
      </button>
    </div>
  )
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { mode } = useMode()

  const navLinks = mode === "founder" ? founderLinks : mode === "research" ? researchLinks : gameDevLinks

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border"
    >
      {/* Main nav row */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="font-mono text-sm font-bold text-neon-blue hover:opacity-80 transition-opacity">
          SRA<span className="text-muted-foreground">.sys</span>
        </a>

        {/* Desktop center: Mode Toggles */}
        <div className="hidden md:flex items-center gap-4">
          <SiteSwitcher />
          <div className="h-4 w-px bg-border/50" />
          <ModeToggle />
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <AnimatePresence mode="wait">
            {navLinks.map((link) => (
              <motion.a
                key={`${mode}-${link.label}`}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
                href={link.href}
                className={`text-sm transition-colors ${link.label === "Terminal"
                  ? "font-mono text-neon-green hover:text-neon-green/80"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {link.label === "Terminal" ? `> ${link.label}` : link.label}
              </motion.a>
            ))}
          </AnimatePresence>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile: always-visible switcher bar */}
      <div className="md:hidden border-t border-border/50 bg-background/60 backdrop-blur-lg" role="toolbar" aria-label="View controls">
        <div className="flex items-center justify-center gap-2 px-3 py-2 overflow-x-auto scrollbar-hide">
          <SiteSwitcher />
          <div className="h-4 w-px bg-border/50 shrink-0" />
          <ModeToggle />
        </div>
      </div>

      {/* Mobile menu (nav links only) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm transition-colors ${link.label === "Terminal"
                    ? "font-mono text-neon-green"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {link.label === "Terminal" ? `> ${link.label}` : link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
