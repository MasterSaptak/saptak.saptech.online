"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ParticleField } from "./particle-field"
import { Shield, Bot, Terminal, FileCode, Download, Github, Linkedin, Globe } from "lucide-react"
import Image from "next/image"
import { useSignal } from "./signal-context"
import { PorfAiWidget } from "./porfai-widget"

const roles = [
  "Full-Stack Developer",
  "AI Engineer",
  "IoT/Robotics Enthusiast",
  "Cybersecurity Learner",
  "Startup Founder",
]

const stats = [
  { label: "Ventures Built", value: "5+", icon: Terminal },
  { label: "Systems Developed", value: "10+", icon: FileCode },
  { label: "Founder Since", value: "18", icon: Shield },
  { label: "Research Paper", value: "1", icon: Bot },
]

function TypewriterText() {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const role = roles[currentRole]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(role.slice(0, displayText.length + 1))
          if (displayText.length === role.length) {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          setDisplayText(role.slice(0, displayText.length - 1))
          if (displayText.length === 0) {
            setIsDeleting(false)
            setCurrentRole((prev) => (prev + 1) % roles.length)
          }
        }
      },
      isDeleting ? 40 : 80,
    )
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole])

  return (
    <span className="text-neon-blue glow-blue-text">
      {displayText}
      <span className="cursor-blink text-neon-blue">|</span>
    </span>
  )
}

function AnimatedCounter({ value, label, icon: Icon, delay }: { value: string; label: string; icon: React.ElementType; delay: number }) {
  const { emitSignal } = useSignal()
  const [count, setCount] = useState(0)
  const numericValue = parseInt(value.replace("+", ""))

  const handleMouseEnter = (e: React.MouseEvent) => {
    emitSignal(e.clientX, e.clientY, "blue")
  }

  useEffect(() => {
    let start = 0
    const duration = 2000
    const stepTime = duration / numericValue
    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start >= numericValue) clearInterval(timer)
    }, stepTime)
    return () => clearInterval(timer)
  }, [numericValue])

  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      onMouseEnter={handleMouseEnter}
      transition={{ duration: 0.6, delay }}
      className="glass-card rounded-xl p-4 lg:p-6 flex flex-col items-center gap-2 hover-elevate"
    >
      <Icon className="w-5 h-5 text-neon-blue" />
      <span className="text-2xl lg:text-3xl font-bold font-mono text-foreground">
        {count}
        {value.includes("+") ? "+" : ""}
      </span>
      <span className="text-xs lg:text-sm text-muted-foreground text-center">{label}</span>
    </motion.div>
  )
}

/* Mini canvas for neural network effect behind photo */
function NeuralNetBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const size = 280
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(dpr, dpr)

    const nodes: { x: number; y: number; vx: number; vy: number }[] = []
    for (let i = 0; i < 20; i++) {
      nodes.push({
        x: Math.random() * size,
        y: Math.random() * size,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      })
    }

    let animId: number
    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, size, size)

      // Update positions
      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy
        if (node.x < 0 || node.x > size) node.vx *= -1
        if (node.y < 0 || node.y > size) node.vy *= -1
      }

      // Draw connections
      ctx.strokeStyle = "rgba(0, 229, 255, 0.08)"
      ctx.lineWidth = 0.5
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(0, 229, 255, 0.15)"
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full rounded-full opacity-60 blur-[1px]"
      aria-hidden="true"
    />
  )
}

function ProfilePhoto() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
      className="flex flex-col items-center gap-4"
    >
      <div className="relative w-52 h-52 sm:w-60 sm:h-60 lg:w-72 lg:h-72">
        {/* Neural network background */}
        <NeuralNetBg />

        {/* Outer pulsing ring */}
        <div
          className="absolute inset-[-8px] rounded-full border border-neon-blue/20 animate-ring-pulse"
          aria-hidden="true"
        />

        {/* Rotating dashed ring */}
        <svg
          className="absolute inset-[-12px] w-[calc(100%+24px)] h-[calc(100%+24px)] animate-spin-slow"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="rgba(0,229,255,0.2)"
            strokeWidth="0.4"
            strokeDasharray="6 4"
          />
        </svg>

        {/* Glassmorphism card container */}
        <div className="relative w-full h-full rounded-full overflow-hidden border border-neon-blue/20 glow-blue"
          style={{ background: "rgba(18, 18, 26, 0.5)", backdropFilter: "blur(8px)" }}
        >
          {/* Inner neon border ring */}
          <div
            className="absolute inset-[3px] rounded-full border border-neon-blue/30"
            aria-hidden="true"
          />
          {/* Actual photo */}
          <div className="absolute inset-[6px] rounded-full overflow-hidden">
            <Image
              src="/images/profile.jpg"
              alt="Saptak Roy Akash - Secure Systems Architect"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 right-2 w-3 h-3 border-t border-r border-neon-blue/40" aria-hidden="true" />
        <div className="absolute bottom-0 left-2 w-3 h-3 border-b border-l border-neon-blue/40" aria-hidden="true" />
      </div>

      {/* Identity label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="flex items-center gap-2 px-4 py-1.5 rounded-md border border-neon-blue/15 bg-card/60"
        style={{ backdropFilter: "blur(8px)" }}
      >
        <Shield className="w-3.5 h-3.5 text-neon-blue" />
        <span className="text-xs font-mono text-neon-blue/80 tracking-wider uppercase">
          Entrepreneur & Fullstack Dev
        </span>
      </motion.div>
    </motion.div>
  )
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-start md:items-center justify-center overflow-hidden grid-bg scanlines"
    >
      <ParticleField />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,229,255,0.15) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* HUD Reticle - top right */}
      <div className="absolute top-20 right-8 lg:right-16 reticle pointer-events-none" aria-hidden="true">
        <svg width="60" height="60" viewBox="0 0 60 60" className="reticle-inner" fill="none">
          <circle cx="30" cy="30" r="28" stroke="rgba(0,229,255,0.12)" strokeWidth="0.5" strokeDasharray="4 6" />
          <circle cx="30" cy="30" r="20" stroke="rgba(0,229,255,0.08)" strokeWidth="0.5" />
          <line x1="30" y1="2" x2="30" y2="12" stroke="rgba(0,229,255,0.15)" strokeWidth="0.5" />
          <line x1="30" y1="48" x2="30" y2="58" stroke="rgba(0,229,255,0.15)" strokeWidth="0.5" />
          <line x1="2" y1="30" x2="12" y2="30" stroke="rgba(0,229,255,0.15)" strokeWidth="0.5" />
          <line x1="48" y1="30" x2="58" y2="30" stroke="rgba(0,229,255,0.15)" strokeWidth="0.5" />
        </svg>
      </div>

      {/* HUD Reticle - bottom left */}
      <div className="absolute bottom-24 left-8 lg:left-16 reticle pointer-events-none" aria-hidden="true" style={{ animationDelay: "2s" }}>
        <svg width="40" height="40" viewBox="0 0 40 40" className="reticle-inner" fill="none" style={{ animationDirection: "normal" }}>
          <rect x="2" y="2" width="36" height="36" stroke="rgba(57,255,20,0.1)" strokeWidth="0.5" strokeDasharray="3 5" />
          <line x1="20" y1="2" x2="20" y2="10" stroke="rgba(57,255,20,0.12)" strokeWidth="0.5" />
          <line x1="20" y1="30" x2="20" y2="38" stroke="rgba(57,255,20,0.12)" strokeWidth="0.5" />
          <line x1="2" y1="20" x2="10" y2="20" stroke="rgba(57,255,20,0.12)" strokeWidth="0.5" />
          <line x1="30" y1="20" x2="38" y2="20" stroke="rgba(57,255,20,0.12)" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Coordinate readout */}
      <div className="absolute bottom-6 left-6 flex items-center gap-3 pointer-events-none" aria-hidden="true">
        <span className="text-[8px] font-mono text-neon-blue/20 tracking-[0.3em]">
          X:0042 Y:0089
        </span>
        <span className="w-8 h-[1px] bg-neon-blue/10" />
        <span className="text-[8px] font-mono text-neon-green/20 tracking-[0.3em]">
          SYS.ONLINE
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-40 pb-32 md:pt-48 md:pb-32">
        {/* Main hero layout: text left, photo right */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left: Text content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-blue/20 bg-neon-blue/5 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-neon-green pulse-glow" />
              <span className="text-xs font-mono text-neon-blue tracking-wider uppercase">
                System Online
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight text-foreground mb-4 text-balance leading-[0.9]"
            >
              Saptak <span className="text-stroke-neon block lg:inline">Roy Akash</span>
            </motion.h1>

            {/* Typing Role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-lg sm:text-xl lg:text-2xl font-mono mb-4 h-8"
            >
              <TypewriterText />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-muted-foreground text-sm lg:text-base max-w-2xl mx-auto lg:mx-0 mb-6 leading-relaxed"
            >
              Building real-world intelligent systems integrating sensors, embedded microcontrollers, cloud services, and machine learning models for healthcare, sustainability, and community safety.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start mb-4"
            >
              <a
                href="/terminal"
                className="group relative flex items-center gap-2 px-6 py-2.5 rounded-lg bg-neon-green/10 border border-neon-green/30 text-sm font-mono text-neon-green overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(57,255,20,0.2)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <Terminal className="w-4 h-4" />
                <span>ACCESS_TERMINAL</span>
              </a>

              <a
                href="https://error-ccx404.saptech.online/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-2 px-6 py-2.5 rounded-lg bg-neon-blue/10 border border-neon-blue/30 text-sm font-mono text-neon-blue overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <Globe className="w-4 h-4" />
                <span>COMMUNITY_NET</span>
              </a>

              <div className="w-full sm:w-auto h-px sm:h-8 bg-white/5 mx-0 sm:mx-2 hidden sm:block" />

              <a
                href="https://www.overleaf.com/read/xywdctrjzkwd#3cdf1a"
                target="_blank"
                rel="noopener noreferrer"
                className="lab-button inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-secondary/20 text-sm font-mono text-muted-foreground hover:text-white"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
              <div className="flex gap-2">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lab-button inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-secondary/20 text-sm font-mono text-muted-foreground hover:text-white"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lab-button inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-secondary/20 text-sm font-mono text-muted-foreground hover:text-white"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right: Profile photo + PorfAi */}
          <div className="flex-shrink-0 flex flex-col items-center gap-4">
            <ProfilePhoto />
            <PorfAiWidget />
          </div>
        </div>

        {/* Stats with staggered reveal */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto lg:mx-0 mt-8">
          {stats.map((stat, i) => (
            <AnimatedCounter key={stat.label} {...stat} delay={0.7 + i * 0.12} />
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-4 h-7 rounded-full border border-neon-blue/30 flex items-start justify-center p-1"
          >
            <div className="w-1 h-1.5 rounded-full bg-neon-blue" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
