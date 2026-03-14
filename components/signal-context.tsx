"use client"

import React, { createContext, useContext, useState, useCallback, useRef } from "react"
import { v4 as uuidv4 } from "uuid"

interface Signal {
  id: string
  startX: number
  startY: number
  color: "blue" | "green"
}

interface SignalContextType {
  emitSignal: (x: number, y: number, color?: "blue" | "green") => void
  signals: Signal[]
  removeSignal: (id: string) => void
}

const SignalContext = createContext<SignalContextType | undefined>(undefined)

export function SignalProvider({ children }: { children: React.ReactNode }) {
  const [signals, setSignals] = useState<Signal[]>([])

  const removeSignal = useCallback((id: string) => {
    setSignals(prev => prev.filter(s => s.id !== id))
  }, [])

  const emitSignal = useCallback((x: number, y: number, color: "blue" | "green" = "blue") => {
    const id = Math.random().toString(36).substring(2, 9)
    setSignals(prev => [...prev, { id, startX: x, startY: y, color }])
  }, [])

  return (
    <SignalContext.Provider value={{ emitSignal, signals, removeSignal }}>
      {children}
    </SignalContext.Provider>
  )
}

export function useSignal() {
  const context = useContext(SignalContext)
  if (!context) {
    throw new Error("useSignal must be used within a SignalProvider")
  }
  return context
}
