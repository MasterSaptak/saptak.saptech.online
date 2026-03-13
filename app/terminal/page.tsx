"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const commandResponses: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  whoami       - About me",
    "  skills       - Technical matrix",
    "  projects     - Systems built",
    "  ventures     - Venture portfolio",
    "  research     - Publication & Research",
    "  current      - Active exploration",
    "  security     - Security philosophy",
    "  fetch-cv     - View career overview",
    "  contact      - Contact info",
    "  clear        - Clear terminal",
  ],
  whoami: [
    "Saptak Roy Akash",
    "AI Engineer | IoT Specialist | Systems Architect",
    "",
    "I build real-world intelligent systems integrating sensors,",
    "microcontrollers, and machine learning models for healthcare,",
    "agriculture, and community safety.",
  ],
  skills: [
    "Technical Matrix:",
    "  [AI/ML]      PyTorch | OpenCV | CNN | Transfer Learning",
    "  [IoT]        ESP8266 | Raspberry Pi | AWS IoT | Sensors",
    "  [SECURITY]   Threat Modeling | Zero-Trust | Ethical Hacking",
    "  [STACK]      Next.js | Node.js | PostgreSQL | MongoDB",
    "  [MOBILE]     Flutter | React Native",
    "  [TOOLS]      Docker | Git | Kali Linux | Android Studio",
  ],
  projects: [
    "Featured Systems:",
    "",
    "  01. SepsisAlert  [AI + IoT] Early detection with AWS IoT Core",
    "  02. IOBOTANICA   [IoT] Smart gardening on isolated power grid",
    "  03. GLAMORA      [AI] CV-based hairstyle recommendation",
    "  04. Error_CCx404 [DevOps] Community hub with Gemini AI",
    "  05. We People    [Crisis] Emergency safety network",
  ],
  ventures: [
    "Venture Portfolio:",
    "",
    "  > SAPTECH - Technology consultancy & systems engineering hub",
    "  > DHOPA - Smart logistics laundry service scaling for students",
  ],
  research: [
    "Publication & Research:",
    "",
    "  Title: PotatoCare — Deep Learning for Disease Detection",
    "  Authors: Saptak Roy Akash, et al.",
    "  Journal: Accepted at ICDSIS 2025",
    "  Link: https://ieeexplore.ieee.org/document/11070388",
    "",
    "  In Progress: Secure Cyber-Physical Communications via RBSAPS_Cipher",
  ],
  current: [
    "Active Exploration:",
    "  > Deploying lightweight Edge AI on resource-constrained MCUs",
    "  > Designing autonomous decision-making loops for robotics",
    "  > Researching secure sensor-actuator communication protocols",
  ],
  security: [
    "Security Philosophy:",
    "  > Architecture-First: Security is not a feature, it is the design.",
    "  > Assume Breach: Implement Zero-Trust at every node.",
    "  > Transparency: Systems should be observable and self-reporting.",
  ],
  "fetch-cv": [
    "Generating career overview...",
    "--------------------------------------------------",
    "Name:       Saptak Roy Akash",
    "Focus:      AI & Cyber-Physical Systems",
    "Status:     Building the future at Saptech",
    "Location:   Global Interface",
    "--------------------------------------------------",
    "Data packet generated successfully. Viewing port available at /",
  ],
  contact: [
    "Contact Interface:",
    "  Email:    burningsoulofdarkness@gmail.com",
    "  GitHub:   github.com/MasterSaptak",
    "  LinkedIn: linkedin.com/in/saptak-roy-44b226248/",
    "  Twitter:  @MasterSaptak",
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
