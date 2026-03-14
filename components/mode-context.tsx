"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type ViewMode = "founder" | "research" | "game-dev"

interface ModeContextType {
  mode: ViewMode
  setMode: (mode: ViewMode) => void
}

const ModeContext = createContext<ModeContextType>({
  mode: "founder",
  setMode: () => {},
})

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ViewMode>("founder")
  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  )
}

export function useMode() {
  return useContext(ModeContext)
}
