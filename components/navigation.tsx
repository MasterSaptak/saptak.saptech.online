"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useMode } from "./mode-context"

const founderLinks = [
  { label: "Systems", href: "#systems" },
  { label: "Security", href: "#security" },
  { label: "Robotics", href: "#robotics" },
  { label: "Timeline", href: "#timeline" },
  { label: "Research", href: "#research" },
  { label: "Terminal", href: "/terminal" },
]

const researchLinks = [
  { label: "Research", href: "#research" },
  { label: "Security", href: "#security" },
  { label: "Architecture", href: "#robotics" },
  { label: "Systems", href: "#systems" },
  { label: "Terminal", href: "/terminal" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { mode, setMode } = useMode()

  const navLinks = mode === "founder" ? founderLinks : researchLinks

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border"
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="font-mono text-sm font-bold text-neon-blue hover:opacity-80 transition-opacity">
          SRA<span className="text-muted-foreground">.sys</span>
        </a>

        {/* Center: Mode Toggles */}
        <div className="hidden md:flex items-center gap-4">
          {/* Site Switcher */}
          <div className="flex items-center rounded-full border border-border bg-secondary/40 p-0.5">
            <button className="px-3 py-1 rounded-full text-xs font-mono bg-neon-blue/15 text-neon-blue border border-neon-blue/30 cursor-default">
              Portfolio
            </button>
            <a
              href="https://error-ccx404.saptech.online/"
              className="px-3 py-1 rounded-full text-xs font-mono text-muted-foreground hover:text-foreground border border-transparent transition-all duration-300"
            >
              Community
            </a>
          </div>

          <div className="h-4 w-px bg-border/50" />

          {/* Mode Toggle */}
          <div className="flex items-center rounded-full border border-border bg-secondary/40 p-0.5">
            <button
              onClick={() => setMode("founder")}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 ${
                mode === "founder"
                  ? "bg-neon-blue/15 text-neon-blue border border-neon-blue/30"
                  : "text-muted-foreground hover:text-foreground border border-transparent"
              }`}
            >
              Founder
            </button>
            <button
              onClick={() => setMode("research")}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 ${
                mode === "research"
                  ? "bg-neon-green/15 text-neon-green border border-neon-green/30"
                  : "text-muted-foreground hover:text-foreground border border-transparent"
              }`}
            >
              Research
            </button>
          </div>
        </div>

        {/* Desktop Nav */}
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
                className={`text-sm transition-colors ${
                  link.label === "Terminal"
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

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl"
        >
          <div className="px-6 py-4 flex flex-col gap-6">
            {/* Mobile site switcher */}
            <div className="flex items-center rounded-full border border-border bg-secondary/40 p-0.5 w-fit">
              <button className="px-3 py-1 rounded-full text-xs font-mono bg-neon-blue/15 text-neon-blue border border-neon-blue/30 cursor-default">
                Portfolio
              </button>
              <a
                href="https://error-ccx404.saptech.online/"
                className="px-3 py-1 rounded-full text-xs font-mono text-muted-foreground border border-transparent"
              >
                Community
              </a>
            </div>

            {/* Mobile mode toggle */}
            <div className="flex items-center rounded-full border border-border bg-secondary/40 p-0.5 w-fit">
              <button
                onClick={() => setMode("founder")}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 ${
                  mode === "founder"
                    ? "bg-neon-blue/15 text-neon-blue border border-neon-blue/30"
                    : "text-muted-foreground border border-transparent"
                }`}
              >
                Founder
              </button>
              <button
                onClick={() => setMode("research")}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 ${
                  mode === "research"
                    ? "bg-neon-green/15 text-neon-green border border-neon-green/30"
                    : "text-muted-foreground border border-transparent"
                }`}
              >
                Research
              </button>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm transition-colors ${
                  link.label === "Terminal"
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
    </motion.nav>
  )
}
