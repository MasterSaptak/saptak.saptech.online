"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type ViewMode = "founder" | "research" | "developer" | "game-design"

interface ModeContextType {
  mode: ViewMode
  setMode: (mode: ViewMode) => void
  isFounderView: boolean
  setIsFounderView: (v: boolean) => void
}

const ModeContext = createContext<ModeContextType>({
  mode: "founder",
  setMode: () => {},
  isFounderView: false,
  setIsFounderView: () => {},
})

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ViewMode>("founder")
  const [isFounderView, setIsFounderView] = useState(false)
  return (
    <ModeContext.Provider value={{ mode, setMode, isFounderView, setIsFounderView }}>
      {children}
    </ModeContext.Provider>
  )
}

export function useMode() {
  return useContext(ModeContext)
}
