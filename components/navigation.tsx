"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Terminal as TerminalIcon, Shield, Zap, Cpu, Globe, Activity } from "lucide-react"
import { useMode, type ViewMode } from "./mode-context"

const founderLinks = [
  { label: "Ventures", href: "#entrepreneurship" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Leadership", href: "#leadership" },
  { label: "Timeline", href: "#timeline" },
  { label: "Terminal", href: "/terminal" },
]

const researchLinks = [
  { label: "Cyber_Security", href: "#security" },
  { label: "Threat_Intel", href: "#research" },
  { label: "Protocol_Def", href: "#security" },
  { label: "Risk_Audit", href: "#robotics" },
  { label: "Terminal", href: "/terminal" },
]

const devLinks = [
  { label: "Full_Stack", href: "#systems" },
  { label: "Cloud_Arch", href: "#ecosystem" },
  { label: "API_Design", href: "#systems" },
  { label: "Dev_Ops", href: "#systems" },
  { label: "Terminal", href: "/terminal" },
]

const gameDesignLinks = [
  { label: "Game_Design", href: "#game-dev" },
  { label: "Unity_Engine", href: "#game-dev" },
  { label: "Physics_Sim", href: "#game-dev" },
  { label: "VFX_Studio", href: "#game-dev" },
  { label: "Terminal", href: "/terminal" },
]

const MODE_STATUS: Record<ViewMode, string> = {
  founder: "INDUSTRIAL_OPERATIONS",
  research: "CYBER_SECURITY_PROTOCOL",
  developer: "FULL_STACK_DEVELOPMENT",
  "game-design": "VIRTUAL_WORLD_ENGINE",
}

function NavPill({ 
  active, 
  onClick, 
  children, 
  activeColor = "neon-blue",
  icon: Icon
}: { 
  active: boolean
  onClick: () => void
  children: React.ReactNode
  activeColor?: string
  icon?: any
}) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-2 text-[10px] font-mono tracking-widest transition-all duration-500 z-10 flex items-center gap-2 group shrink-0 ${
        active ? "text-white" : "text-white/30 hover:text-white/60"
      }`}
    >
      {active && (
        <motion.div
          layoutId="active-nav-pill"
          className="absolute inset-0 rounded-xl border border-white/10"
          style={{
            background: `linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)`,
            backgroundColor: "rgba(255,255,255,0.03)",
            boxShadow: `inset 0 1px 1px rgba(255,255,255,0.1), 0 10px 20px -10px rgba(0,0,0,0.5)`,
          }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        >
          {/* Active Accent */}
          <motion.div 
            className="absolute top-0 left-2 right-2 h-[1px] opacity-50"
            style={{ background: `var(--${activeColor})` }}
          />
        </motion.div>
      )}
      <div className={`transition-transform duration-300 ${active ? "scale-110" : "group-hover:scale-110"}`}>
        {Icon && <Icon className={`w-3.5 h-3.5 ${active ? `text-${activeColor} drop-shadow-[0_0_5px_var(--${activeColor})]` : "text-white/20 group-hover:text-white/40"}`} />}
      </div>
      <span className="relative z-10 uppercase whitespace-nowrap">{children}</span>
    </button>
  )
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { mode, setMode } = useMode()
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = 
    mode === "founder" ? founderLinks : 
    mode === "research" ? researchLinks : 
    mode === "developer" ? devLinks : 
    gameDesignLinks

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "px-4 pt-2" : "px-4 pt-4"
      }`}
    >
      <div className="max-w-[98%] mx-auto rounded-2xl bg-[#0a0a0f]/80 backdrop-blur-3xl border border-white/5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] overflow-hidden">
        {/* Top Status Bar indicator */}
        <div className="h-1 flex bg-white/[0.02] border-b border-white/[0.03]">
          <motion.div 
            className="h-full bg-neon-blue/40"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>

        {/* Main Header Context */}
        <div className="flex flex-col lg:flex-row lg:items-center">
          
          {/* Brand & Network Unit */}
          <div className="flex items-center justify-between lg:justify-start px-8 h-20 lg:border-r border-white/5 gap-10 shrink-0">
            <a href="#hero" className="flex items-center gap-4 group">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-neon-blue/10 rounded-lg border border-neon-blue/20 rotate-45 group-hover:rotate-90 transition-transform duration-500" />
                <Activity className="w-5 h-5 text-neon-blue" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-sm font-bold tracking-[0.2em] text-white uppercase">Sapt.Hub</span>
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-green pulse-glow" />
                  NETWORK_ACTIVE
                </span>
              </div>
            </a>

            {/* Site Toggles (Refined Spacing) */}
            <div className="flex items-center bg-white/[0.03] border border-white/10 rounded-full p-1.5 shadow-inner">
              <button 
                className="min-w-[95px] px-4 py-2 text-[10px] font-mono text-white bg-white/5 rounded-full border border-white/5 shadow-sm"
              >
                PORTFOLIO
              </button>
              <a 
                href="https://error-ccx404.saptech.online/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="min-w-[95px] px-4 py-2 text-[10px] font-mono text-center text-white/40 hover:text-white transition-colors"
              >
                COMMUNITY
              </a>
            </div>
          </div>

          {/* Core Controls & Stats */}
          <div className="flex-1 flex flex-col sm:flex-row items-center justify-between px-8 py-4 lg:py-0 gap-8 overflow-x-auto no-scrollbar">
            
            {/* View State Display (Flexible room) */}
            <div className="hidden min-w-[160px] xl:flex flex-col justify-center">
              <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.3em]">System_State</span>
              <AnimatePresence mode="wait">
                <motion.span 
                  key={mode}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 5 }}
                  className="text-[10px] font-mono text-neon-blue/80 tracking-widest uppercase truncate font-bold"
                >
                  {MODE_STATUS[mode]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Mode Switcher (Renamed Category Focus) */}
            <div className="flex items-center bg-white/[0.02] border border-white/10 rounded-2xl p-1 shadow-inner shrink-0 origin-center">
              <NavPill active={mode === "founder"} onClick={() => setMode("founder")} icon={Globe}>Founder</NavPill>
              <NavPill active={mode === "research"} onClick={() => setMode("research")} icon={Shield} activeColor="neon-green">Researcher</NavPill>
              <NavPill active={mode === "developer"} onClick={() => setMode("developer")} icon={Cpu} activeColor="neon-blue">Developer</NavPill>
              <NavPill active={mode === "game-design"} onClick={() => setMode("game-design")} icon={Zap} activeColor="purple-500">Game Designer</NavPill>
            </div>

            {/* Links Block - Fixed Visibility and Clipping */}
            <div className="hidden md:flex items-center gap-0.5 h-12 px-4 rounded-xl border border-white/5 bg-white/[0.01] min-w-max">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-1"
                >
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      onMouseEnter={() => setHoveredLink(link.label)}
                      onMouseLeave={() => setHoveredLink(null)}
                      href={link.href}
                      className="relative px-3 py-2 group shrink-0"
                    >
                      <span className={`relative z-10 font-mono text-[10px] tracking-tight transition-colors duration-300 ${
                        link.label === "Terminal" 
                          ? "text-neon-green flex items-center gap-1.5"
                          : "text-white/40 group-hover:text-white"
                      }`}>
                        {link.label === "Terminal" && <TerminalIcon className="w-3.5 h-3.5" />}
                        {link.label.toUpperCase()}
                      </span>
                      {hoveredLink === link.label && (
                        <motion.div
                          layoutId="nav-link-hover"
                          className="absolute inset-0 bg-white/[0.05] rounded-xl"
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </a>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors shrink-0"
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Expanded Menu */}
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-white/5 bg-black/40 backdrop-blur-3xl overflow-hidden"
            >
              <div className="p-6 space-y-8">
                <div className="grid grid-cols-1 gap-6 pt-2">
                  <div className="space-y-3">
                    <span className="text-[8px] font-mono text-white/30 tracking-[0.3em] uppercase px-1">Role Selection</span>
                    <div className="grid grid-cols-2 gap-2">
                      <NavPill active={mode === "founder"} onClick={() => setMode("founder")} icon={Globe}>Founder</NavPill>
                      <NavPill active={mode === "research"} onClick={() => setMode("research")} icon={Shield} activeColor="neon-green">Researcher</NavPill>
                      <NavPill active={mode === "developer"} onClick={() => setMode("developer")} icon={Cpu} activeColor="neon-blue">Developer</NavPill>
                      <NavPill active={mode === "game-design"} onClick={() => setMode("game-design")} icon={Zap} activeColor="purple-500">Game Design</NavPill>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <span className="text-[8px] font-mono text-muted-foreground tracking-[0.3em] uppercase px-1">Network</span>
                    <div className="flex flex-col gap-2">
                      <button className="flex items-center gap-2 p-3 rounded-xl bg-neon-blue/10 border border-neon-blue/20 text-[10px] font-mono text-white">
                        <Activity className="w-3.5 h-3.5 text-neon-blue" />
                        PORTFOLIO
                      </button>
                      <a href="https://error-ccx404.saptech.online/" className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 text-[10px] font-mono text-muted-foreground">
                        <Globe className="w-3.5 h-3.5" />
                        COMMUNITY
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <span className="text-[8px] font-mono text-muted-foreground tracking-[0.3em] uppercase px-1">Quick_Modules</span>
                  <div className="grid grid-cols-2 gap-2">
                    {navLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.02] transition-all hover:bg-white/[0.05] ${
                          link.label === "Terminal" ? "text-neon-green border-neon-green/20" : "text-muted-foreground"
                        }`}
                      >
                        <span className="font-mono text-[10px] uppercase truncate">{link.label}</span>
                        {link.label === "Terminal" ? <TerminalIcon className="w-3 h-3" /> : <Activity className="w-2.5 h-2.5 opacity-20" />}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
