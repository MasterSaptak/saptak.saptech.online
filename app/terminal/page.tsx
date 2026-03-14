"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { themes, type TerminalTheme } from "./themes"
import { VirtualFS } from "./virtual-fs"
import { SAPTAK_BANNER, getNeofetchOutput, cowsay, HACK_LINES } from "./ascii-art"

interface HistoryEntry {
  command: string
  output: string[]
  isError?: boolean
  isJS?: boolean
  isAI?: boolean
}

interface AIMessage {
  role: "user" | "model"
  content: string
}

const MOOD_FACES: Record<string, string> = {
  happy: "(◕‿◕)",
  sad: "(◕︵◕)",
  thinking: "(◑_◐)",
  excited: "(★▽★)",
  cool: "(⌐■_■)",
  confused: "(◑○◐)",
  love: "(♥‿♥)",
  laughing: "(◕▽◕)",
  angry: "(◕︿◕)",
  neutral: "(◕─◕)",
}

const getMoodColor = (mood: string, t: TerminalTheme): string => {
  const colors: Record<string, string> = {
    happy: t.success,
    sad: "#6b9bd2",
    thinking: t.accent,
    excited: "#ffd700",
    cool: t.accent,
    confused: "#ff9f43",
    love: "#ff6b81",
    laughing: t.success,
    angry: t.error,
    neutral: t.muted,
  }
  return colors[mood] || t.muted
}

const extractMood = (output: string[]): string => {
  if (output.length === 0) return "thinking"
  const first = output[0]?.trim()
  const moodMatch = first?.match(/^\[mood:(\w+)\]/) || first?.match(/^\[(\w+)\]$/)
  if (moodMatch) {
    const mood = moodMatch[1].toLowerCase()
    if (MOOD_FACES[mood]) return mood
  }
  return "neutral"
}

const getCleanOutput = (output: string[]): string[] => {
  if (output.length === 0) return []
  const first = output[0]?.trim()
  if (first?.match(/^\[mood:\w+\]/) || first?.match(/^\[\w+\]$/)) {
    const rest = output.slice(1)
    while (rest.length > 0 && rest[0] === "") rest.shift()
    return rest
  }
  return output
}

const MEMORY_KEY = "porfai-memories"

function loadMemories(): Record<string, string> {
  if (typeof window === "undefined") return {}
  try {
    const raw = localStorage.getItem(MEMORY_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveMemories(memories: Record<string, string>) {
  if (typeof window === "undefined") return
  localStorage.setItem(MEMORY_KEY, JSON.stringify(memories))
}

function extractMemoryTags(text: string): { cleaned: string; newMemories: Record<string, string> } {
  const newMemories: Record<string, string> = {}
  const cleaned = text.replace(/\[remember:(\w+)=([^\]]+)\]/g, (_, key, value) => {
    newMemories[key] = value.trim()
    return ""
  }).trim()
  return { cleaned, newMemories }
}

type MoodAnimation = {
  animate: Record<string, number[]>
  transition: Record<string, unknown>
}

const MOOD_ANIMATIONS: Record<string, MoodAnimation> = {
  happy: {
    animate: { y: [0, -6, 0], scale: [1, 1.15, 1] },
    transition: { repeat: Infinity, duration: 1.2, ease: "easeInOut" },
  },
  sad: {
    animate: { y: [0, 3, 0], opacity: [1, 0.6, 1] },
    transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
  },
  thinking: {
    animate: { rotate: [0, 15, -15, 0], scale: [1, 1.05, 1] },
    transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
  },
  excited: {
    animate: { x: [-3, 3, -3, 3, 0], y: [0, -5, 0, -5, 0], scale: [1, 1.2, 1, 1.2, 1] },
    transition: { repeat: Infinity, duration: 0.8, ease: "easeInOut" },
  },
  cool: {
    animate: { scale: [1, 1.08, 1] },
    transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
  },
  confused: {
    animate: { rotate: [0, -10, 10, -5, 5, 0] },
    transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
  },
  love: {
    animate: { scale: [1, 1.25, 1, 1.2, 1] },
    transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
  },
  laughing: {
    animate: { y: [0, -4, 0, -4, 0], rotate: [0, 5, -5, 3, 0] },
    transition: { repeat: Infinity, duration: 0.6, ease: "easeInOut" },
  },
  angry: {
    animate: { x: [-2, 2, -2, 2, 0], scale: [1, 1.1, 1] },
    transition: { repeat: Infinity, duration: 0.4, ease: "easeInOut" },
  },
  neutral: {
    animate: { opacity: [1, 0.7, 1] },
    transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
  },
}

const stringify = (val: unknown): string => {
  if (val === undefined) return "undefined"
  if (val === null) return "null"
  if (typeof val === "function") return val.toString()
  if (typeof val === "object") {
    try {
      return JSON.stringify(val, null, 2)
    } catch {
      return String(val)
    }
  }
  return String(val)
}

const executeJS = (code: string): { output: string[]; error: boolean } => {
  const logs: string[] = []
  const origLog = console.log
  const origError = console.error
  const origWarn = console.warn
  const origInfo = console.info

  console.log = (...args: unknown[]) => logs.push(args.map(stringify).join(" "))
  console.error = (...args: unknown[]) => logs.push(`Error: ${args.map(stringify).join(" ")}`)
  console.warn = (...args: unknown[]) => logs.push(`Warn: ${args.map(stringify).join(" ")}`)
  console.info = (...args: unknown[]) => logs.push(args.map(stringify).join(" "))

  try {
    const result = (0, eval)(code)
    if (result !== undefined) {
      logs.push(stringify(result))
    }
    return { output: logs.length > 0 ? logs : ["undefined"], error: false }
  } catch (err: unknown) {
    const e = err as Error
    return { output: [...logs, `${e.name}: ${e.message}`], error: true }
  } finally {
    console.log = origLog
    console.error = origError
    console.warn = origWarn
    console.info = origInfo
  }
}

const ALL_COMMANDS = [
  "help", "whoami", "skills", "projects", "ventures", "research",
  "current", "security", "fetch-cv", "contact", "clear",
  "ls", "cd", "cat", "pwd", "tree",
  "js", "run",
  "neofetch", "date", "echo", "history", "uptime", "uname",
  "matrix", "hack", "cowsay", "banner", "ping", "sudo",
  "theme", "themes", "exit",
  "ai", "chat", "memory", "memories", "forget",
]

const STATIC_COMMANDS: Record<string, string[]> = {
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
    "",
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
    "",
    '  Tip: "cd projects && ls" to explore the filesystem',
  ],
  ventures: [
    "Venture Portfolio:",
    "",
    "  > SAPTECH — Technology consultancy & systems engineering hub",
    "  > DHOPA — Smart logistics laundry service scaling for students",
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
    "",
    "  > Deploying lightweight Edge AI on resource-constrained MCUs",
    "  > Designing autonomous decision-making loops for robotics",
    "  > Researching secure sensor-actuator communication protocols",
  ],
  security: [
    "Security Philosophy:",
    "",
    "  > Architecture-First: Security is not a feature, it is the design.",
    "  > Assume Breach: Implement Zero-Trust at every node.",
    "  > Transparency: Systems should be observable and self-reporting.",
  ],
  "fetch-cv": [
    "Generating career overview...",
    "──────────────────────────────────────────────────",
    "Name:       Saptak Roy Akash",
    "Focus:      AI & Cyber-Physical Systems",
    "Status:     Building the future at Saptech",
    "Location:   Global Interface",
    "──────────────────────────────────────────────────",
    "Data packet generated successfully. Viewing port available at /",
  ],
  contact: [
    "Contact Interface:",
    "",
    "  Email:    burningsoulofdarkness@gmail.com",
    "  GitHub:   github.com/MasterSaptak",
    "  LinkedIn: linkedin.com/in/saptak-roy-44b226248/",
    "  Twitter:  @MasterSaptak",
  ],
}

export default function TerminalPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [input, setInput] = useState("")
  const [bootComplete, setBootComplete] = useState(false)
  const [theme, setTheme] = useState<TerminalTheme>(themes.cyberpunk)
  const [jsMode, setJsMode] = useState(false)
  const [matrixActive, setMatrixActive] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const [tabHints, setTabHints] = useState<string[]>([])
  const [aiMode, setAiMode] = useState(false)
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([])
  const [aiLoading, setAiLoading] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const fsRef = useRef(new VirtualFS())
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const memoriesRef = useRef<Record<string, string>>({})

  useEffect(() => {
    memoriesRef.current = loadMemories()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setBootComplete(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (bootComplete && inputRef.current) inputRef.current.focus()
  }, [bootComplete])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout)
    }
  }, [])

  // Matrix rain
  useEffect(() => {
    if (!matrixActive || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array.from({ length: columns }, () =>
      Math.floor(Math.random() * -50)
    )
    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>/{}()=+*"

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]

        ctx.fillStyle = "#fff"
        ctx.font = `${fontSize}px monospace`
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)

        ctx.fillStyle = theme.prompt
        ctx.font = `${fontSize}px monospace`
        ctx.fillText(
          chars[Math.floor(Math.random() * chars.length)],
          i * fontSize,
          (drops[i] - 1) * fontSize
        )

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 33)

    const dismiss = () => setMatrixActive(false)
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== "F11" && e.key !== "F12") dismiss()
    }

    window.addEventListener("keydown", handleKey)
    canvas.addEventListener("click", dismiss)

    return () => {
      clearInterval(interval)
      window.removeEventListener("keydown", handleKey)
      canvas.removeEventListener("click", dismiss)
    }
  }, [matrixActive, theme.prompt])

  const addAnimatedLines = useCallback(
    (
      command: string,
      lines: { text: string; delay: number }[],
      totalDuration: number
    ) => {
      setIsAnimating(true)
      setHistory((prev) => [...prev, { command, output: [] }])

      const newTimeouts: ReturnType<typeof setTimeout>[] = []

      lines.forEach(({ text, delay }) => {
        const t = setTimeout(() => {
          setHistory((prev) => {
            const updated = [...prev]
            const lastIdx = updated.length - 1
            updated[lastIdx] = {
              ...updated[lastIdx],
              output: [...updated[lastIdx].output, text],
            }
            return updated
          })
        }, delay)
        newTimeouts.push(t)
      })

      const endTimeout = setTimeout(() => {
        setIsAnimating(false)
        inputRef.current?.focus()
      }, totalDuration)
      newTimeouts.push(endTimeout)

      timeoutsRef.current = newTimeouts
    },
    []
  )

  const sendAIMessage = useCallback(async (message: string) => {
    const newMessages: AIMessage[] = [...aiMessages, { role: "user", content: message }]
    setAiMessages(newMessages)
    setAiLoading(true)

    setHistory((prev) => [
      ...prev,
      { command: message, output: [], isAI: true },
    ])

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          memories: memoriesRef.current,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "AI service unavailable" }))
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      const reader = response.body!.getReader()
      const decoder = new TextDecoder()
      let fullResponse = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        fullResponse += chunk

        const { cleaned } = extractMemoryTags(fullResponse)
        const lines = cleaned.split("\n")
        setHistory((prev) => {
          const updated = [...prev]
          const lastIdx = updated.length - 1
          updated[lastIdx] = {
            ...updated[lastIdx],
            output: lines,
            isAI: true,
          }
          return updated
        })
      }

      const { cleaned, newMemories } = extractMemoryTags(fullResponse)
      if (Object.keys(newMemories).length > 0) {
        memoriesRef.current = { ...memoriesRef.current, ...newMemories }
        saveMemories(memoriesRef.current)
      }

      const finalLines = cleaned.split("\n")
      setHistory((prev) => {
        const updated = [...prev]
        const lastIdx = updated.length - 1
        updated[lastIdx] = { ...updated[lastIdx], output: finalLines, isAI: true }
        return updated
      })

      setAiMessages((prev) => [...prev, { role: "model", content: cleaned }])
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error"
      setHistory((prev) => {
        const updated = [...prev]
        const lastIdx = updated.length - 1
        updated[lastIdx] = {
          ...updated[lastIdx],
          output: [`[Error] ${message}`],
          isError: true,
          isAI: true,
        }
        return updated
      })
    } finally {
      setAiLoading(false)
      inputRef.current?.focus()
    }
  }, [aiMessages])

  const processCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim()
      const lower = trimmed.toLowerCase()
      const parts = trimmed.split(/\s+/)
      const command = parts[0]?.toLowerCase() || ""
      const rest = trimmed.slice(command.length).trim()

      if (jsMode) {
        if (lower === "exit" || lower === ".exit") {
          setJsMode(false)
          setHistory((prev) => [
            ...prev,
            { command: cmd, output: ["Exited JavaScript REPL."] },
          ])
          return
        }

        if (!trimmed) {
          setHistory((prev) => [...prev, { command: "", output: [] }])
          return
        }

        const { output, error } = executeJS(trimmed)
        setHistory((prev) => [
          ...prev,
          { command: cmd, output, isJS: true, isError: error },
        ])
        return
      }

      if (aiMode) {
        if (lower === "exit" || lower === ".exit") {
          setAiMode(false)
          setAiMessages([])
          setHistory((prev) => [
            ...prev,
            { command: cmd, output: ["(◕︵◕) PorfAi: See you later! Conversation cleared."] },
          ])
          return
        }

        if (lower === "clear") {
          setAiMessages([])
          setHistory([])
          return
        }

        if (!trimmed) {
          setHistory((prev) => [...prev, { command: "", output: [] }])
          return
        }

        sendAIMessage(trimmed)
        return
      }

      if (STATIC_COMMANDS[command] && !rest) {
        setHistory((prev) => [
          ...prev,
          { command: cmd, output: STATIC_COMMANDS[command] },
        ])
        return
      }

      switch (command) {
        case "clear":
          setHistory([])
          break

        case "help":
          setHistory((prev) => [
            ...prev,
            {
              command: cmd,
              output: [
                "╔══════════════════════════════════════════════╗",
                "║           TERMINAL v2.0 — COMMANDS           ║",
                "╚══════════════════════════════════════════════╝",
                "",
                "  [INFO]",
                "  whoami        About me",
                "  skills        Technical matrix",
                "  projects      Systems built",
                "  ventures      Venture portfolio",
                "  research      Publications",
                "  current       Active exploration",
                "  security      Security philosophy",
                "  fetch-cv      Career overview",
                "  contact       Contact info",
                "",
                "  [FILESYSTEM]",
                "  ls [path]     List directory",
                "  cd <path>     Change directory",
                "  cat <file>    Read file",
                "  pwd           Current directory",
                "  tree          Directory tree",
                "",
                "  [AI CHAT] — Talk to PorfAi",
                "  ai            Chat with PorfAi",
                "  chat          Alias for ai",
                "  memory        Show saved memories",
                "  forget        Clear all memories",
                "",
                "  [CODING] — Yes, you can actually code here!",
                "  js            Enter JavaScript REPL",
                "  run <code>    Execute JS one-liner",
                "",
                "  [SYSTEM]",
                "  neofetch      System info",
                "  date          Current date/time",
                "  echo <text>   Echo text",
                "  history       Command history",
                "",
                "  [FUN]",
                "  matrix        Enter the Matrix",
                "  hack          Hacking simulation",
                "  cowsay <msg>  ASCII cow says things",
                "  banner        ASCII banner",
                "  ping <host>   Simulated ping",
                "",
                "  [TERMINAL]",
                "  theme <name>  Switch color theme",
                "  themes        List available themes",
                "  clear         Clear screen",
                "  exit          Back to portfolio",
                "",
                "  Shortcuts: ↑↓ History | Tab Autocomplete | Ctrl+L Clear | Ctrl+C Cancel",
              ],
            },
          ])
          break

        case "js":
          setJsMode(true)
          setHistory((prev) => [
            ...prev,
            {
              command: cmd,
              output: [
                "╔══════════════════════════════════════════════╗",
                "║         JavaScript REPL v1.0                 ║",
                "║  Write real JS — it executes in your browser ║",
                "╠══════════════════════════════════════════════╣",
                "║  Try:                                        ║",
                '║    console.log("Hello, World!")              ║',
                "║    [1,2,3].map(x => x ** 2)                 ║",
                "║    Math.PI * Math.E                         ║",
                "║    new Date().toLocaleDateString()           ║",
                "║    document.title                            ║",
                "║                                              ║",
                '║  Type "exit" to leave                        ║',
                "╚══════════════════════════════════════════════╝",
              ],
            },
          ])
          break

        case "ai":
        case "chat":
          setAiMode(true)
          setAiMessages([])
          setHistory((prev) => [
            ...prev,
            {
              command: cmd,
              output: [
                "╔══════════════════════════════════════════════╗",
                "║      (◕‿◕) PorfAi — Terminal Chat           ║",
                "║      Portfolio AI, powered by Groq           ║",
                "╠══════════════════════════════════════════════╣",
                "║  I'm PorfAi — I know about Saptak's work,   ║",
                "║  but I can answer ANYTHING you ask.          ║",
                "║                                              ║",
                "║  I have emotions and MEMORY! I remember      ║",
                "║  what you tell me, even after refresh.       ║",
                "║                                              ║",
                '║  Type "exit" to leave                        ║',
                "╚══════════════════════════════════════════════╝",
              ],
            },
          ])
          break

        case "memory":
        case "memories": {
          const mems = memoriesRef.current
          const keys = Object.keys(mems)
          if (keys.length === 0) {
            setHistory((prev) => [
              ...prev,
              { command: cmd, output: [
                "(◕─◕) PorfAi has no saved memories yet.",
                "",
                "Chat with PorfAi and tell it things to remember!",
                'Example: "I live in Bolpur, remember that"',
              ] },
            ])
          } else {
            setHistory((prev) => [
              ...prev,
              { command: cmd, output: [
                "╔══════════════════════════════════════════════╗",
                "║      (♥‿♥) PorfAi — Saved Memories          ║",
                "╚══════════════════════════════════════════════╝",
                "",
                ...keys.map((k) => `  ${k}: ${mems[k]}`),
                "",
                `  Total: ${keys.length} memor${keys.length === 1 ? "y" : "ies"}`,
                '  Type "forget" to clear all memories.',
              ] },
            ])
          }
          break
        }

        case "forget": {
          memoriesRef.current = {}
          saveMemories({})
          setHistory((prev) => [
            ...prev,
            { command: cmd, output: [
              "(◕︵◕) PorfAi: All memories cleared...",
              "I won't remember anything from before.",
              "But hey, we can make new memories! 💫",
            ] },
          ])
          break
        }

        case "run":
          if (!rest) {
            setHistory((prev) => [
              ...prev,
              {
                command: cmd,
                output: [
                  "Usage: run <javascript code>",
                  "",
                  "Examples:",
                  '  run console.log("Hello!")',
                  "  run [1,2,3,4,5].reduce((a,b) => a+b)",
                  "  run Math.random().toFixed(4)",
                ],
                isError: true,
              },
            ])
          } else {
            const { output, error } = executeJS(rest)
            setHistory((prev) => [
              ...prev,
              { command: cmd, output, isJS: true, isError: error },
            ])
          }
          break

        case "ls":
          setHistory((prev) => [
            ...prev,
            { command: cmd, output: fsRef.current.ls(rest || undefined) },
          ])
          break

        case "cd": {
          const cdOut = fsRef.current.cd(rest)
          setHistory((prev) => [
            ...prev,
            {
              command: cmd,
              output: cdOut.length > 0 ? cdOut : [],
              isError: cdOut.length > 0,
            },
          ])
          break
        }

        case "cat":
          if (!rest) {
            setHistory((prev) => [
              ...prev,
              { command: cmd, output: ["Usage: cat <file>"], isError: true },
            ])
          } else {
            setHistory((prev) => [
              ...prev,
              { command: cmd, output: fsRef.current.cat(rest) },
            ])
          }
          break

        case "pwd":
          setHistory((prev) => [
            ...prev,
            { command: cmd, output: [fsRef.current.pwd()] },
          ])
          break

        case "tree":
          setHistory((prev) => [
            ...prev,
            { command: cmd, output: fsRef.current.tree(rest || undefined) },
          ])
          break

        case "neofetch":
          setHistory((prev) => [
            ...prev,
            { command: cmd, output: getNeofetchOutput(theme.name) },
          ])
          break

        case "matrix":
          setMatrixActive(true)
          setHistory((prev) => [
            ...prev,
            { command: cmd, output: ["Entering the Matrix... (click or press any key to exit)"] },
          ])
          break

        case "hack":
          addAnimatedLines("hack", HACK_LINES, 11500)
          break

        case "ping": {
          const host = rest || "saptak.saptech.online"
          const pingLines = [
            { text: `PING ${host} (104.26.10.78): 56 data bytes`, delay: 0 },
            {
              text: `64 bytes from 104.26.10.78: seq=0 ttl=57 time=${(Math.random() * 20 + 8).toFixed(1)} ms`,
              delay: 1000,
            },
            {
              text: `64 bytes from 104.26.10.78: seq=1 ttl=57 time=${(Math.random() * 20 + 8).toFixed(1)} ms`,
              delay: 2000,
            },
            {
              text: `64 bytes from 104.26.10.78: seq=2 ttl=57 time=${(Math.random() * 20 + 8).toFixed(1)} ms`,
              delay: 3000,
            },
            { text: "", delay: 3300 },
            { text: `--- ${host} ping statistics ---`, delay: 3400 },
            {
              text: "3 packets transmitted, 3 received, 0% packet loss",
              delay: 3500,
            },
          ]
          addAnimatedLines(cmd, pingLines, 4000)
          break
        }

        case "cowsay":
          setHistory((prev) => [
            ...prev,
            {
              command: cmd,
              output: cowsay(rest || "Moo! Try: cowsay <your message>"),
            },
          ])
          break

        case "banner":
          setHistory((prev) => [
            ...prev,
            { command: cmd, output: SAPTAK_BANNER },
          ])
          break

        case "theme":
          if (!rest || !themes[rest]) {
            setHistory((prev) => [
              ...prev,
              {
                command: cmd,
                output: [
                  `Unknown theme "${rest}".`,
                  `Available: ${Object.keys(themes).join(", ")}`,
                  "",
                  "Usage: theme <name>",
                ],
                isError: true,
              },
            ])
          } else {
            setTheme(themes[rest])
            setHistory((prev) => [
              ...prev,
              {
                command: cmd,
                output: [
                  `Theme switched to: ${themes[rest].name}`,
                  `Background, text, and accent colors updated.`,
                ],
              },
            ])
          }
          break

        case "themes":
          setHistory((prev) => [
            ...prev,
            {
              command: cmd,
              output: [
                "Available themes:",
                "",
                ...Object.entries(themes).map(
                  ([key, t]) => `  ${key.padEnd(12)} ${t.name}`
                ),
                "",
                "Usage: theme <name>",
              ],
            },
          ])
          break

        case "date":
          setHistory((prev) => [
            ...prev,
            { command: cmd, output: [new Date().toString()] },
          ])
          break

        case "uptime":
          setHistory((prev) => [
            ...prev,
            {
              command: cmd,
              output: [
                "up since 2003, load average: ∞ ideas, ∞ projects, ∞ passion",
              ],
            },
          ])
          break

        case "uname":
          setHistory((prev) => [
            ...prev,
            {
              command: cmd,
              output: [
                "SaptakOS 2.0 Neural-Processing-Unit aarch-creative x86_innovation",
              ],
            },
          ])
          break

        case "echo":
          setHistory((prev) => [
            ...prev,
            { command: cmd, output: [rest || ""] },
          ])
          break

        case "history":
          setHistory((prev) => [
            ...prev,
            {
              command: cmd,
              output:
                cmdHistory.length > 0
                  ? cmdHistory.map(
                      (c, i) => `  ${String(i + 1).padStart(4)}  ${c}`
                    )
                  : ["No commands in history yet."],
            },
          ])
          break

        case "exit":
          window.location.href = "/"
          break

        case "sudo":
          setHistory((prev) => [
            ...prev,
            {
              command: cmd,
              output: [
                "╔══════════════════════════════════════════════╗",
                "║  Nice try. You are not in the sudoers file.  ║",
                "║  This incident will be reported.             ║",
                "╚══════════════════════════════════════════════╝",
              ],
              isError: true,
            },
          ])
          break

        case "python":
          setHistory((prev) => [
            ...prev,
            {
              command: cmd,
              output: [
                "Python is not installed in this terminal.",
                "This is JavaScript territory. Try: js",
                "",
                "  > But Python is cooler!",
                "  < Not in the browser it isn't.",
              ],
            },
          ])
          break

        case "vim":
        case "nano":
        case "vi":
          setHistory((prev) => [
            ...prev,
            {
              command: cmd,
              output: [
                `${command}: this is a read-only terminal.`,
                "Real developers use VS Code anyway.",
                '(just kidding — vim users are elite. But try "js" instead)',
              ],
            },
          ])
          break

        case "curl":
        case "wget":
          setHistory((prev) => [
            ...prev,
            {
              command: cmd,
              output: [
                "HTTP/1.1 200 OK",
                "Content-Type: application/json",
                "X-Powered-By: Saptak Roy Akash",
                "X-Security: Zero-Trust",
                "",
                "{",
                '  "name": "Saptak Roy Akash",',
                '  "title": "AI Engineer | IoT Specialist",',
                '  "status": "Building the future",',
                '  "portfolio": "https://saptak.saptech.online"',
                "}",
              ],
            },
          ])
          break

        default:
          if (lower.startsWith("rm ")) {
            setHistory((prev) => [
              ...prev,
              {
                command: cmd,
                output: [
                  "Permission denied: Nice try.",
                  "This system is protected by Zero-Trust architecture.",
                  "Your attempt has been logged. Have a nice day.",
                ],
                isError: true,
              },
            ])
          } else if (trimmed === "") {
            setHistory((prev) => [...prev, { command: "", output: [] }])
          } else {
            setHistory((prev) => [
              ...prev,
              {
                command: cmd,
                output: [
                  `Command not found: ${trimmed}`,
                  'Type "help" for available commands.',
                ],
                isError: true,
              },
            ])
          }
      }
    },
    [jsMode, aiMode, theme, cmdHistory, addAnimatedLines, sendAIMessage]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isAnimating || aiLoading) return

    const cmd = input
    setInput("")
    setHistoryIdx(-1)
    setTabHints([])

    if (cmd.trim()) {
      setCmdHistory((prev) => [...prev, cmd])
    }

    processCommand(cmd)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault()
      const current = input.trim().toLowerCase()
      if (!current) return

      const matches = ALL_COMMANDS.filter((c) => c.startsWith(current))
      if (matches.length === 1) {
        setInput(matches[0])
        setTabHints([])
      } else if (matches.length > 1) {
        setTabHints(matches)
        const prefix = matches.reduce((a, b) => {
          let i = 0
          while (i < a.length && i < b.length && a[i] === b[i]) i++
          return a.slice(0, i)
        })
        if (prefix.length > current.length) {
          setInput(prefix)
        }
      }
      return
    }

    setTabHints([])

    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (cmdHistory.length === 0) return
      const newIdx =
        historyIdx < cmdHistory.length - 1 ? historyIdx + 1 : historyIdx
      setHistoryIdx(newIdx)
      setInput(cmdHistory[cmdHistory.length - 1 - newIdx])
      return
    }

    if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIdx <= 0) {
        setHistoryIdx(-1)
        setInput("")
        return
      }
      const newIdx = historyIdx - 1
      setHistoryIdx(newIdx)
      setInput(cmdHistory[cmdHistory.length - 1 - newIdx])
      return
    }

    if (e.key === "l" && e.ctrlKey) {
      e.preventDefault()
      setHistory([])
      return
    }

    if (e.key === "c" && e.ctrlKey) {
      e.preventDefault()
      if (jsMode) {
        setJsMode(false)
        setHistory((prev) => [
          ...prev,
          { command: "^C", output: ["Exited JavaScript REPL."] },
        ])
      } else if (aiMode) {
        setAiMode(false)
        setAiMessages([])
        setHistory((prev) => [
          ...prev,
          { command: "^C", output: ["(◕︵◕) PorfAi: Goodbye! Come back anytime."] },
        ])
      } else {
        setInput("")
      }
    }
  }

  const getLineColor = (line: string, entry: HistoryEntry): string => {
    if (entry.isError && !line.startsWith("[")) return theme.error
    if (entry.isAI && !entry.isError) return theme.primary
    if (entry.isJS) return entry.isError ? theme.error : theme.accent

    if (line.startsWith("  [") && line.includes("]")) return theme.accent
    if (line.startsWith("[+]")) return theme.success
    if (line.startsWith("[*]")) return theme.accent
    if (line.startsWith("[!]")) return theme.error

    if (line.startsWith("  >") || line.startsWith("> ")) return theme.success

    if (/^[╔║╚╠╗╝╣═]/.test(line)) return theme.accent

    if (/^[├└│]/.test(line)) return theme.muted
    if (line.endsWith("/")) return theme.accent

    if (line.startsWith("#")) return theme.accent
    if (line.startsWith("──")) return theme.muted

    if (line.startsWith("████")) return theme.prompt

    return theme.muted
  }

  const promptSymbol = aiMode ? "ai>" : jsMode ? "js>" : ">"
  const cwdDisplay = fsRef.current.pwd()

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-500"
      style={{ backgroundColor: theme.bg }}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b"
        style={{
          backgroundColor: theme.headerBg,
          borderColor: `${theme.accent}22`,
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: theme.error }}
            />
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "#eab308" }}
            />
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: theme.success }}
            />
          </div>
          <span
            className="font-mono text-xs"
            style={{ color: theme.muted }}
          >
            sra@systems:{cwdDisplay}
          </span>
          {(jsMode || aiMode) && (
            <span
              className="font-mono text-xs px-2 py-0.5 rounded flex items-center gap-1.5"
              style={{
                backgroundColor: `${theme.accent}22`,
                color: theme.accent,
              }}
            >
              {jsMode ? "JS REPL" : (
                <>
                  <motion.span
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  >
                    {MOOD_FACES.happy}
                  </motion.span>
                  PorfAi
                </>
              )}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span
            className="font-mono text-xs hidden sm:inline"
            style={{ color: theme.muted }}
          >
            {theme.name}
          </span>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-mono transition-colors hover:opacity-80"
            style={{ color: theme.muted }}
          >
            <ArrowLeft className="w-3 h-3" />
            Portfolio
          </Link>
        </div>
      </div>

      {/* Terminal body */}
      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="flex-1 overflow-y-auto p-4 lg:p-6 font-mono text-sm cursor-text"
        style={{ color: theme.primary }}
      >
        {/* Boot sequence */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 space-y-1"
        >
          <p style={{ color: theme.accent }}>
            Saptak Roy Akash — Terminal v2.0
          </p>
          <p style={{ color: theme.muted }}>Initializing secure session...</p>
          {bootComplete && (
            <>
              <p style={{ color: theme.success }}>
                Session established. Welcome.
              </p>
              <p style={{ color: theme.muted }} className="mt-2">
                Type &quot;help&quot; for commands. Try &quot;ai&quot; to chat with PorfAi or &quot;js&quot; to code.
              </p>
              <br />
            </>
          )}
        </motion.div>

        {/* Command history */}
        {bootComplete &&
          history.map((entry, i) => (
            <div key={i} className="mb-3">
              {entry.command !== undefined && (
                <div className="flex items-center gap-2">
                  <span style={{ color: theme.prompt }}>
                    {entry.isAI ? "ai>" : entry.isJS ? "js>" : ">"}
                  </span>
                  <span style={{ color: theme.primary }}>{entry.command}</span>
                </div>
              )}
              {entry.isAI && entry.output.length > 0 ? (
                <div className="mt-2 mb-1">
                  {(() => {
                    const mood = extractMood(entry.output)
                    const cleanLines = getCleanOutput(entry.output)
                    const face = MOOD_FACES[mood] || MOOD_FACES.neutral
                    const moodColor = getMoodColor(mood, theme)
                    const moodAnim = MOOD_ANIMATIONS[mood] || MOOD_ANIMATIONS.neutral
                    return (
                      <>
                        <motion.div
                          initial={{ scale: 0, opacity: 0, y: 10 }}
                          animate={{ scale: 1, opacity: 1, y: 0 }}
                          transition={{ type: "spring", stiffness: 400, damping: 15 }}
                          className="flex items-center gap-3 mb-2"
                        >
                          <motion.div
                            animate={moodAnim.animate}
                            transition={moodAnim.transition}
                            className="flex items-center justify-center rounded-lg px-2 py-1 font-mono"
                            style={{
                              color: moodColor,
                              backgroundColor: `${moodColor}15`,
                              boxShadow: `0 0 12px ${moodColor}30, 0 0 4px ${moodColor}20`,
                              fontSize: "18px",
                            }}
                          >
                            {face}
                          </motion.div>
                          <div className="flex flex-col">
                            <span
                              className="font-mono text-xs font-bold"
                              style={{ color: theme.accent }}
                            >
                              PorfAi
                            </span>
                            <span
                              className="font-mono"
                              style={{ color: moodColor, fontSize: "10px" }}
                            >
                              feeling {mood}
                            </span>
                          </div>
                        </motion.div>
                        <div
                          className="ml-1 pl-3 border-l-2"
                          style={{ borderColor: `${moodColor}40` }}
                        >
                          {cleanLines.map((line, j) => (
                            <motion.p
                              key={j}
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: j * 0.03 }}
                              className="whitespace-pre-wrap break-words font-mono"
                              style={{ color: theme.primary }}
                            >
                              {line || "\u00A0"}
                            </motion.p>
                          ))}
                        </div>
                      </>
                    )
                  })()}
                </div>
              ) : (
                entry.output.map((line, j) => (
                  <p
                    key={j}
                    className="whitespace-pre font-mono"
                    style={{ color: getLineColor(line, entry) }}
                  >
                    {line || "\u00A0"}
                  </p>
                ))
              )}
            </div>
          ))}

        {/* Tab completion hints */}
        {tabHints.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-3">
            {tabHints.map((hint) => (
              <span
                key={hint}
                className="font-mono text-xs px-1"
                style={{ color: theme.accent }}
              >
                {hint}
              </span>
            ))}
          </div>
        )}

        {/* PorfAi thinking indicator */}
        {aiLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 flex items-center gap-3"
          >
            <motion.div
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.15, 0.95, 1],
              }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="flex items-center justify-center rounded-lg px-2 py-1 font-mono"
              style={{
                color: theme.accent,
                backgroundColor: `${theme.accent}15`,
                boxShadow: `0 0 15px ${theme.accent}25`,
                fontSize: "18px",
              }}
            >
              {MOOD_FACES.thinking}
            </motion.div>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold" style={{ color: theme.accent }}>
                PorfAi
              </span>
              <motion.div className="flex gap-1">
                {[0, 1, 2].map((dot) => (
                  <motion.span
                    key={dot}
                    animate={{ y: [0, -4, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8,
                      delay: dot * 0.2,
                      ease: "easeInOut",
                    }}
                    className="font-mono"
                    style={{ color: theme.accent, fontSize: "16px" }}
                  >
                    ●
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Input line */}
        {bootComplete && (
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span style={{ color: theme.prompt }}>{promptSymbol}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isAnimating || aiLoading}
              className="flex-1 bg-transparent outline-none font-mono"
              style={{
                color: theme.primary,
                caretColor: theme.accent,
                opacity: isAnimating || aiLoading ? 0.5 : 1,
              }}
              autoFocus
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              aria-label="Terminal input"
            />
            <span
              className="cursor-blink font-mono"
              style={{ color: theme.accent }}
            >
              █
            </span>
          </form>
        )}
      </div>

      {/* Matrix rain overlay */}
      <AnimatePresence>
        {matrixActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50"
          >
            <canvas
              ref={canvasRef}
              className="w-full h-full cursor-pointer"
              style={{ display: "block" }}
            />
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-sm animate-pulse"
              style={{ color: theme.prompt }}
            >
              Press any key or click to exit the Matrix
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
