"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const commandResponses: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  whoami       - About me",
    "  skills       - Technical skills",
    "  current      - Current focus",
    "  ventures     - Ventures built",
    "  research     - Research work",
    "  contact      - Contact info",
    "  security     - Security philosophy",
    "  stack        - Tech stack",
    "  clear        - Clear terminal",
    "  help         - Show this message",
  ],
  whoami: [
    "Saptak Roy Akash",
    "Founder. Engineer. Systems thinker.",
    "",
    "I build secure, scalable systems that operate in the real world.",
    "From hardware repair at 16 to founding ventures at 18,",
    "I approach every problem with a builder's mindset.",
  ],
  skills: [
    "Technical Skills:",
    "  [SECURITY]   Threat Modeling | Zero-Trust | Encryption | SSL",
    "  [IoT]        Sensors | Microcontrollers | Edge Computing",
    "  [AI/ML]      Deep Learning | CNN | Transfer Learning",
    "  [FULLSTACK]  Next.js | React | Node.js | PostgreSQL | AWS",
    "  [SYSTEMS]    Microservices | Event-Driven | Real-time",
    "  [PAYMENTS]   Stripe | International Gateways | PCI Awareness",
  ],
  current: [
    "Current Focus:",
    "",
    "  > Cyber Security research & application",
    "  > Robotics & IoT systems development",
    "  > Applied AI for agriculture (PotatoCare)",
    "  > Building secure, scalable infrastructure",
    "  > University admissions for CS + Robotics",
  ],
  current_focus: [
    "Redirecting to 'current'...",
  ],
  ventures: [
    "Ventures Built:",
    "",
    "  01. PC Servicing & Hardware     [2018]",
    "  02. Gaming Zone Entertainment   [2020]",
    "  03. Saptech Solutions            [2020]",
    "  04. Dhopa On-Demand Platform    [2025]",
    "  05. IOBOTANICA IoT System       [2025]",
    "",
    "  Total ventures: 5+",
    "  Systems developed: 10+",
  ],
  research: [
    "Research:",
    "",
    "  Title: PotatoCare — Deep Learning for Disease Detection",
    "  Status: Accepted at ICDSIS 2025",
    "  Domain: Computer Vision / Precision Agriculture",
    "  Stack: CNN, Transfer Learning, Python, TensorFlow",
    "",
    "  Also: RBSAPS_Cipher — Novel Encryption Methodology",
  ],
  contact: [
    "Contact:",
    "",
    "  Location: Building from everywhere",
    "  Status:   Open to opportunities",
    "  Focus:    Cyber Security + Robotics programs",
  ],
  security: [
    "Security Philosophy:",
    "",
    "  > Every system starts with threat modeling",
    "  > Zero-trust: verify everything, trust nothing",
    "  > Encryption is not optional — it is foundational",
    "  > Privacy-first: data minimization, user control",
    "  > Secure payments: SSL, gateway integration, compliance",
    "",
    "  \"Security is not a feature. It is the architecture.\"",
  ],
  stack: [
    "Preferred Tech Stack:",
    "",
    "  Frontend    : Next.js, React, TailwindCSS, TypeScript",
    "  Backend     : Node.js, Python, PostgreSQL, Redis",
    "  Cloud       : AWS, Vercel, Cloud Functions",
    "  AI/ML       : TensorFlow, PyTorch, Scikit-learn",
    "  IoT         : Arduino, Raspberry Pi, MQTT, Edge Computing",
    "  Security    : SSL/TLS, Custom Encryption, Secure Auth",
  ],
}

export default function TerminalPage() {
  const [history, setHistory] = useState<Array<{ command: string; output: string[] }>>([])
  const [input, setInput] = useState("")
  const [bootComplete, setBootComplete] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setBootComplete(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (bootComplete && inputRef.current) {
      inputRef.current.focus()
    }
  }, [bootComplete])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()

    if (trimmed === "clear") {
      setHistory([])
      return
    }

    const response = commandResponses[trimmed]

    if (response) {
      setHistory((prev) => [
        ...prev,
        { command: cmd, output: response },
      ])
    } else if (trimmed === "") {
      setHistory((prev) => [...prev, { command: "", output: [] }])
    } else {
      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: [`Command not found: ${trimmed}`, 'Type "help" for available commands.'],
        },
      ])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleCommand(input)
    setInput("")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-secondary/30">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-neon-green/60" />
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            sra@systems:~
          </span>
        </div>
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-neon-blue transition-colors font-mono"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to Portfolio
        </Link>
      </div>

      {/* Terminal body */}
      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="flex-1 overflow-y-auto p-4 lg:p-6 font-mono text-sm cursor-text"
      >
        {/* Boot sequence */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-muted-foreground mb-4 space-y-1"
        >
          <p className="text-neon-blue">Saptak Roy Akash — Terminal v1.0</p>
          <p className="text-muted-foreground">Initializing secure session...</p>
          {bootComplete && (
            <>
              <p className="text-neon-green">Session established. Welcome.</p>
              <p className="text-muted-foreground mt-2">
                {'Type "help" for available commands.'}
              </p>
              <br />
            </>
          )}
        </motion.div>

        {/* Command history */}
        {bootComplete &&
          history.map((entry, i) => (
            <div key={i} className="mb-3">
              <div className="flex items-center gap-2">
                <span className="text-neon-green">{">"}</span>
                <span className="text-foreground">{entry.command}</span>
              </div>
              {entry.output.map((line, j) => (
                <p
                  key={j}
                  className={`${
                    line.startsWith("  [")
                      ? "text-neon-blue"
                      : line.startsWith("  >")
                        ? "text-neon-green"
                        : "text-muted-foreground"
                  } whitespace-pre`}
                >
                  {line}
                </p>
              ))}
            </div>
          ))}

        {/* Input line */}
        {bootComplete && (
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span className="text-neon-green">{">"}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none text-foreground caret-neon-blue font-mono"
              autoFocus
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              aria-label="Terminal input"
            />
          </form>
        )}
      </div>
    </div>
  )
}
