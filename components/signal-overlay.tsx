"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useSignal } from "./signal-context"
import { useEffect, useState } from "react"

export function SignalOverlay() {
  const { signals, removeSignal } = useSignal()
  const [target, setTarget] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Target is the Systems Assistant position (bottom right)
    const updateTarget = () => {
      setTarget({
        x: window.innerWidth - 40,
        y: window.innerHeight - 40
      })
    }
    updateTarget()
    window.addEventListener("resize", updateTarget)
    return () => window.removeEventListener("resize", updateTarget)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {signals.map((signal) => (
          <motion.div
            key={signal.id}
            initial={{ 
              x: signal.startX, 
              y: signal.startY, 
              opacity: 0, 
              scale: 0.5 
            }}
            animate={{ 
              x: target.x, 
              y: target.y, 
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1.2, 0.8, 0.5]
            }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() => removeSignal(signal.id)}
            transition={{ 
              duration: 1.2, 
              ease: "easeInOut",
              opacity: { times: [0, 0.2, 0.8, 1] }
            }}
            className={`absolute w-1.5 h-1.5 rounded-full blur-[1px] ${
              signal.color === "blue" ? "bg-neon-blue shadow-[0_0_10px_#00e5ff]" : "bg-neon-green shadow-[0_0_10px_#39ff14]"
            }`}
          >
            {/* Trail effect */}
            <motion.div 
              className={`absolute inset-0 rounded-full opacity-30 ${
                signal.color === "blue" ? "bg-neon-blue" : "bg-neon-green"
              }`}
              animate={{ scale: [1, 2], opacity: [0.3, 0] }}
              transition={{ duration: 0.4, repeat: Infinity }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
