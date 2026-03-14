"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, X, MessageSquare } from "lucide-react"

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

const MOOD_COLORS: Record<string, string> = {
  happy: "#39ff14",
  sad: "#6b9bd2",
  thinking: "#00e5ff",
  excited: "#ffd700",
  cool: "#00e5ff",
  confused: "#ff9f43",
  love: "#ff6b81",
  laughing: "#39ff14",
  angry: "#ff4444",
  neutral: "#888",
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

function extractMood(text: string): string {
  const match = text.match(/^\[mood:(\w+)\]/) || text.match(/^\[(\w+)\]/)
  if (match && MOOD_FACES[match[1].toLowerCase()]) return match[1].toLowerCase()
  return "neutral"
}

function cleanResponse(text: string): string {
  return text
    .replace(/^\[mood:\w+\]\s*/m, "")
    .replace(/^\[\w+\]\s*/m, "")
    .replace(/\[remember:\w+=[^\]]+\]/g, "")
    .trim()
}

function VoiceWaveform({ active, color, compact = false }: { active: "idle" | "listening" | "speaking"; color: string; compact?: boolean }) {
  const bars = compact ? 16 : 24
  return (
    <div className={`flex items-center justify-center gap-[2px] ${compact ? "h-8" : "h-10"}`}>
      {Array.from({ length: bars }).map((_, i) => {
        const center = Math.abs(i - bars / 2) / (bars / 2)
        const scale = compact ? 0.5 : 1
        const baseHeight = active === "idle" ? (3 + (1 - center) * 6) * scale : (5 + (1 - center) * 16) * scale
        const animDuration = active === "idle" ? 2 + Math.random() * 2 : 0.3 + Math.random() * 0.5
        const delay = i * 0.04

        return (
          <motion.div
            key={i}
            className="rounded-full"
            style={{
              width: 2.5,
              backgroundColor: color,
              opacity: active === "idle" ? 0.3 + (1 - center) * 0.4 : 0.5 + (1 - center) * 0.5,
              boxShadow: active !== "idle" ? `0 0 ${6 + (1 - center) * 8}px ${color}40` : "none",
            }}
            animate={{
              height: active === "idle"
                ? [baseHeight, baseHeight + 4, baseHeight]
                : active === "listening"
                  ? [baseHeight * 0.3, baseHeight, baseHeight * 0.5, baseHeight * 0.8, baseHeight * 0.3]
                  : [baseHeight * 0.4, baseHeight * 1.2, baseHeight * 0.6, baseHeight, baseHeight * 0.4],
            }}
            transition={{
              duration: animDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
          />
        )
      })}
    </div>
  )
}

function CircularPulse({ active, color }: { active: boolean; color: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[0, 1, 2].map((ring) => (
        <motion.div
          key={ring}
          className="absolute rounded-full border"
          style={{ borderColor: `${color}${active ? "30" : "10"}` }}
          animate={active ? {
            width: [60 + ring * 30, 80 + ring * 40, 60 + ring * 30],
            height: [60 + ring * 30, 80 + ring * 40, 60 + ring * 30],
            opacity: [0.4 - ring * 0.1, 0.1, 0.4 - ring * 0.1],
          } : {
            width: [60 + ring * 30],
            height: [60 + ring * 30],
            opacity: [0.1],
          }}
          transition={{
            duration: 2 + ring * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: ring * 0.3,
          }}
        />
      ))}
    </div>
  )
}

interface ChatMessage {
  role: "user" | "model"
  content: string
  mood?: string
}

export function PorfAiWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [apiMessages, setApiMessages] = useState<{ role: string; content: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [currentMood, setCurrentMood] = useState("happy")
  const memoriesRef = useRef<Record<string, string>>({})
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    memoriesRef.current = loadMemories()
  }, [])

  useEffect(() => {
    const container = chatContainerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || loading) return

    const userMsg: ChatMessage = { role: "user", content: text }
    setMessages((prev) => [...prev, userMsg])
    const newApiMessages = [...apiMessages, { role: "user", content: text }]
    setApiMessages(newApiMessages)
    setInput("")
    setLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newApiMessages,
          memories: memoriesRef.current,
        }),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: "Service unavailable" }))
        throw new Error(err.error || `HTTP ${response.status}`)
      }

      const reader = response.body!.getReader()
      const decoder = new TextDecoder()
      let fullResponse = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        fullResponse += decoder.decode(value, { stream: true })

        const mood = extractMood(fullResponse)
        setCurrentMood(mood)

        const { cleaned } = extractMemoryTags(fullResponse)
        const display = cleanResponse(cleaned)
        setMessages((prev) => {
          const updated = [...prev]
          const last = updated[updated.length - 1]
          if (last?.role === "model") {
            updated[updated.length - 1] = { role: "model", content: display, mood }
          } else {
            updated.push({ role: "model", content: display, mood })
          }
          return updated
        })
      }

      const { cleaned, newMemories } = extractMemoryTags(fullResponse)
      if (Object.keys(newMemories).length > 0) {
        memoriesRef.current = { ...memoriesRef.current, ...newMemories }
        saveMemories(memoriesRef.current)
      }

      const finalDisplay = cleanResponse(cleaned)
      const finalMood = extractMood(fullResponse)
      setCurrentMood(finalMood)
      setMessages((prev) => {
        const updated = [...prev]
        const last = updated[updated.length - 1]
        if (last?.role === "model") {
          updated[updated.length - 1] = { role: "model", content: finalDisplay, mood: finalMood }
        }
        return updated
      })
      setApiMessages((prev) => [...prev, { role: "model", content: cleaned }])
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error"
      setMessages((prev) => [...prev, { role: "model", content: msg, mood: "sad" }])
      setCurrentMood("sad")
    } finally {
      setLoading(false)
    }
  }, [apiMessages, loading])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const moodColor = MOOD_COLORS[currentMood] || MOOD_COLORS.neutral
  const moodFace = MOOD_FACES[currentMood] || MOOD_FACES.neutral
  const waveState = loading ? "speaking" as const : open ? "listening" as const : "idle" as const

  return (
    <div className="relative">
      {/* Collapsed: floating orb with waveform */}
      <AnimatePresence mode="wait">
        {!open && (
          <motion.button
            key="porfai-orb"
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setOpen(true)}
            className="group relative flex items-center gap-4 cursor-pointer px-5 py-3 rounded-2xl border"
            style={{
              borderColor: `${moodColor}20`,
              background: `rgba(10, 10, 18, 0.7)`,
              backdropFilter: "blur(12px)",
              boxShadow: `0 0 25px ${moodColor}10`,
            }}
          >
            {/* Orb */}
            <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
              <motion.div
                className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center border"
                style={{
                  borderColor: `${moodColor}40`,
                  background: `radial-gradient(circle, ${moodColor}15 0%, transparent 70%)`,
                  boxShadow: `0 0 20px ${moodColor}20`,
                }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-sm font-mono" style={{ color: moodColor }}>
                  {moodFace}
                </span>
              </motion.div>
            </div>

            {/* Waveform + label */}
            <div className="flex flex-col items-start gap-1">
              <div className="w-28">
                <VoiceWaveform active="idle" color={moodColor} compact />
              </div>
              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-3 h-3" style={{ color: moodColor }} />
                <span className="text-[10px] font-mono tracking-wider" style={{ color: `${moodColor}cc` }}>
                  Talk to PorfAi
                </span>
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded: chat interface */}
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            key="porfai-chat"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-[300px] sm:w-[340px] rounded-2xl border overflow-hidden"
            style={{
              borderColor: `${moodColor}25`,
              background: "rgba(10, 10, 18, 0.92)",
              backdropFilter: "blur(20px)",
              boxShadow: `0 0 40px ${moodColor}15, 0 20px 60px rgba(0,0,0,0.5)`,
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-3 py-2 border-b"
              style={{ borderColor: `${moodColor}15`, background: `${moodColor}05` }}
            >
              <div className="flex items-center gap-2">
                <motion.span
                  className="text-sm font-mono"
                  style={{ color: moodColor }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {moodFace}
                </motion.span>
                <span className="text-xs font-bold text-white/90">PorfAi</span>
                <span
                  className="text-[9px] font-mono"
                  style={{ color: `${moodColor}80` }}
                >
                  · {currentMood}
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-3.5 h-3.5 text-white/40 hover:text-white/70" />
              </button>
            </div>

            {/* Voice waveform */}
            <div
              className="relative px-3 py-2 border-b flex items-center gap-3"
              style={{ borderColor: `${moodColor}10` }}
            >
              <div className="relative z-10 flex-1">
                <VoiceWaveform active={waveState} color={moodColor} />
              </div>
              {loading && (
                <motion.span
                  className="text-[9px] font-mono shrink-0"
                  style={{ color: `${moodColor}80` }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  thinking...
                </motion.span>
              )}
            </div>

            {/* Chat messages */}
            <div ref={chatContainerRef} className="h-36 overflow-y-auto px-3 py-2 space-y-2 scrollbar-thin">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center gap-1.5 text-center">
                  <motion.span
                    className="text-lg font-mono"
                    style={{ color: moodColor }}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {moodFace}
                  </motion.span>
                  <p className="text-[10px] text-white/30 font-mono">
                    Ask me anything...
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2 justify-center">
                    {["Who is Saptak?", "Weather", "Tell a joke"].map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="px-2.5 py-1 rounded-full border text-[10px] font-mono transition-colors hover:bg-white/5"
                        style={{
                          borderColor: `${moodColor}20`,
                          color: `${moodColor}90`,
                        }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "model" && (
                    <div className="flex gap-2 max-w-[85%]">
                      <span
                        className="text-xs font-mono shrink-0 mt-1"
                        style={{ color: MOOD_COLORS[msg.mood || "neutral"] }}
                      >
                        {MOOD_FACES[msg.mood || "neutral"]}
                      </span>
                      <div
                        className="px-3 py-2 rounded-xl rounded-tl-sm text-xs text-white/85 leading-relaxed whitespace-pre-wrap break-words"
                        style={{
                          background: `${MOOD_COLORS[msg.mood || "neutral"]}10`,
                          borderLeft: `2px solid ${MOOD_COLORS[msg.mood || "neutral"]}40`,
                        }}
                      >
                        {msg.content}
                      </div>
                    </div>
                  )}
                  {msg.role === "user" && (
                    <div
                      className="px-3 py-2 rounded-xl rounded-tr-sm text-xs text-white/90 max-w-[85%]"
                      style={{ background: "rgba(255,255,255,0.07)" }}
                    >
                      {msg.content}
                    </div>
                  )}
                </motion.div>
              ))}
              <div />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-3 py-2 border-t"
              style={{ borderColor: `${moodColor}15` }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                disabled={loading}
                className="flex-1 bg-transparent text-xs text-white/90 placeholder:text-white/20 outline-none font-mono"
              />
              <motion.button
                type="submit"
                disabled={loading || !input.trim()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg transition-colors disabled:opacity-30"
                style={{
                  background: `${moodColor}15`,
                  color: moodColor,
                }}
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
