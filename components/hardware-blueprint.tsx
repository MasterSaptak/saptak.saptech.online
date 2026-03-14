"use client"

import { motion } from "framer-motion"

interface BlueprintProps {
  type: "sepsis" | "iobotanica"
  className?: string
}

export function HardwareBlueprint({ type, className }: BlueprintProps) {
  if (type === "sepsis") {
    return (
      <div className={`relative aspect-video rounded-lg overflow-hidden bg-cyber-black/40 border border-neon-blue/20 p-4 ${className}`}>
        <svg viewBox="0 0 400 225" className="w-full h-full opacity-60">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 229, 255, 0.05)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Node: Sensors */}
          <motion.rect
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            x="30" y="80" width="80" height="60" rx="4"
            fill="none" stroke="#00e5ff" strokeWidth="1" strokeDasharray="4 2"
          />
          <text x="70" y="115" textAnchor="middle" fill="#00e5ff" fontSize="10" className="font-mono">SENSORS</text>
          <text x="70" y="128" textAnchor="middle" fill="#00e5ff" fontSize="6" className="font-mono opacity-60">HeartRate | SpO2</text>

          {/* Connection: Sensors to ESP */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 2 }}
            d="M 110 110 L 150 110"
            fill="none" stroke="#00e5ff" strokeWidth="1"
          />

          {/* Node: NodeMCU */}
          <motion.rect
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            x="150" y="70" width="100" height="85" rx="4"
            fill="rgba(0, 229, 255, 0.05)" stroke="#00e5ff" strokeWidth="1.5"
          />
          <text x="200" y="95" textAnchor="middle" fill="#00e5ff" fontSize="10" fontWeight="bold" className="font-mono">NodeMCU</text>
          <text x="200" y="115" textAnchor="middle" fill="#00e5ff" fontSize="8" className="font-mono opacity-80">ESP8266</text>
          <circle cx="230" cy="85" r="3" fill="#00e5ff" className="animate-pulse" />

          {/* Connection: ESP to Cloud */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 2.5 }}
            d="M 250 110 L 300 110"
            fill="none" stroke="#00e5ff" strokeWidth="1"
          />

          {/* Node: AWS Cloud */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
            d="M 300 110 Q 300 80 330 80 T 360 110 Q 360 140 330 140 T 300 110"
            fill="none" stroke="#00e5ff" strokeWidth="1"
          />
          <text x="330" y="105" textAnchor="middle" fill="#00e5ff" fontSize="10" className="font-mono">AWS IoT</text>
          <text x="330" y="120" textAnchor="middle" fill="#00e5ff" fontSize="6" className="font-mono opacity-60">MIMIC-IV AI</text>

          {/* Data Packets */}
          <motion.circle
            r="2" fill="#00e5ff"
            animate={{
              cx: [70, 200, 330],
              cy: [110, 110, 110],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </svg>
        <div className="absolute bottom-2 right-2 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-ping" />
          <span className="text-[8px] font-mono text-neon-blue uppercase tracking-widest">Live Stream Active</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative aspect-video rounded-lg overflow-hidden bg-cyber-black/40 border border-neon-green/20 p-4 ${className}`}>
      <svg viewBox="0 0 400 225" className="w-full h-full opacity-60">
        <rect width="100%" height="100%" fill="url(#grid-green)" />
        <defs>
          <pattern id="grid-green" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(57, 255, 20, 0.05)" strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* Node: Battery Grid */}
        <motion.rect
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          x="30" y="30" width="60" height="40" rx="2"
          fill="none" stroke="#39ff14" strokeWidth="1"
        />
        <text x="60" y="55" textAnchor="middle" fill="#39ff14" fontSize="8" className="font-mono">18650 GRID</text>

        {/* Node: ESP8266 */}
        <motion.rect
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          x="150" y="70" width="100" height="100" rx="4"
          fill="rgba(57, 255, 20, 0.05)" stroke="#39ff14" strokeWidth="1.5"
        />
        <text x="200" y="110" textAnchor="middle" fill="#39ff14" fontSize="10" className="font-mono font-bold">IOBOTANICA</text>
        <text x="200" y="130" textAnchor="middle" fill="#39ff14" fontSize="6" className="font-mono opacity-80">v2.1 STANDALONE</text>

        {/* Connectors */}
        <motion.path
          animate={{ strokeDashoffset: [0, -20] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          d="M 60 70 L 60 120 L 150 120"
          fill="none" stroke="#39ff14" strokeWidth="1" strokeDasharray="4 2"
        />

        {/* Node: Actuators */}
        <motion.circle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          cx="330" cy="120" r="30"
          fill="none" stroke="#39ff14" strokeWidth="1" strokeDasharray="2 2"
        />
        <text x="330" y="125" textAnchor="middle" fill="#39ff14" fontSize="8" className="font-mono">PUMP</text>

        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          d="M 250 120 L 300 120"
          fill="none" stroke="#39ff14" strokeWidth="1"
        />
      </svg>
      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-neon-green/10 border border-neon-green/30">
        <span className="text-[8px] font-mono text-neon-green uppercase tracking-widest">Battery: 94%</span>
      </div>
    </div>
  )
}
