"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, X, Send } from "lucide-react"

const predefinedPrompts = [
  { label: "What systems have you built?", key: "systems" },
  { label: "Tell me about your security approach", key: "security" },
  { label: "What is your research about?", key: "research" },
  { label: "Describe your IoT experience", key: "iot" },
  { label: "What makes you different?", key: "unique" },
]

const mockResponses: Record<string, string> = {
  systems:
    "I have built 5+ ventures and 10+ systems including We People (community safety platform), IOBOTANICA (IoT plant monitoring), RBSAPS_Cipher (novel encryption method), and Dhopa (on-demand laundry with international payments). Each system was designed with security-first architecture and scalability in mind.",
  security:
    "Security is foundational to everything I build. I start every project with threat modeling, implement zero-trust architecture, and ensure end-to-end encryption. From secure payment gateways with PCI DSS awareness to IoT device authentication with TPM attestation, I design systems where no entity is inherently trusted.",
  research:
    "My published research, PotatoCare, was accepted at ICDSIS 2025. It uses deep learning (CNNs with transfer learning) for early detection of potato plant diseases from field-collected images. I also developed RBSAPS_Cipher, a novel multi-layer encryption methodology exploring high-entropy ciphertext generation.",
  iot:
    "I build end-to-end IoT pipelines: from sensor data acquisition (MQTT, CoAP) through edge processing on microcontrollers, to cloud analytics and AI-powered decision making. My systems include secure boot chains, encrypted data transmission, and hybrid edge-cloud architectures for reliability during connectivity gaps.",
  unique:
    "I combine founder experience with deep technical capability. Starting from hardware repair at 16, founding ventures at 18, and publishing AI research -- I bring a rare blend of systems thinking, security awareness, and real-world operational experience. I do not just write code; I build and ship production systems.",
}

export function SystemsAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([])
  const [isTyping, setIsTyping] = useState(false)

  const handlePrompt = (prompt: string, key: string) => {
    setMessages((prev) => [...prev, { role: "user", content: prompt }])
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: mockResponses[key] || "I can answer questions about my systems, security approach, research, and experience." },
      ])
    }, 800 + Math.random() * 600)
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? "bg-secondary border border-border"
            : "bg-neon-blue/15 border border-neon-blue/30 glow-blue hover:bg-neon-blue/25"
        }`}
        aria-label={isOpen ? "Close assistant" : "Open systems assistant"}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-foreground" />
        ) : (
          <Bot className="w-5 h-5 text-neon-blue" />
        )}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-6 z-50 w-80 sm:w-96 max-h-[70vh] flex flex-col glass-card rounded-xl border border-neon-blue/20 overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border flex items-center gap-3 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-neon-blue" />
              </div>
              <div>
                <span className="text-sm font-semibold text-foreground block leading-tight">Systems Assistant</span>
                <span className="text-xs text-neon-green font-mono">online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
              {messages.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-xs text-muted-foreground mb-4">Ask me about my work</p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-neon-blue/15 text-neon-blue border border-neon-blue/20"
                        : "bg-secondary/60 text-foreground/90 border border-border"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-secondary/60 border border-border rounded-lg px-3 py-2">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-blue pulse-glow" />
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-blue pulse-glow" style={{ animationDelay: "0.2s" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-blue pulse-glow" style={{ animationDelay: "0.4s" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Predefined prompts */}
            <div className="px-4 pb-4 pt-2 border-t border-border shrink-0">
              <div className="flex flex-wrap gap-1.5">
                {predefinedPrompts.map((p) => (
                  <button
                    key={p.key}
                    onClick={() => handlePrompt(p.label, p.key)}
                    disabled={isTyping}
                    className="px-2.5 py-1 text-xs font-mono rounded-md border border-border bg-secondary/30 text-muted-foreground hover:text-neon-blue hover:border-neon-blue/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
