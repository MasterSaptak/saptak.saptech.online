"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gamepad2, Layers, Zap, Ghost, Box, Play, Target, Sparkles, MousePointer2, ChevronRight } from "lucide-react"
import { DecryptEffect } from "./tech-animations"

const gameModules = [
  {
    icon: Gamepad2,
    label: "Engine Core",
    desc: "Unity & C# development",
    details: "High-performance architecture using ECS/DOTS for massive scale.",
    stack: ["Unity", "C#", "ECS", "NuGet"],
  },
  {
    icon: Box,
    label: "3D Physics",
    desc: "Rigid body & collision",
    details: "Custom physics solvers and optimized collision detection pipelines.",
    stack: ["PhysX", "Havok", "Collision Mat", "Raycasting"],
  },
  {
    icon: Layers,
    label: "Shaders/VFX",
    desc: "HLSL & Shader Graph",
    details: "Procedural geometry and compute shaders for realistic environments.",
    stack: ["ShaderLab", "HLSL", "URP/HDRP", "Compute"],
  },
  {
    icon: Ghost,
    label: "AI & Pathfinding",
    desc: "Goal-Oriented Action Planning",
    details: "Advanced NPC behaviors using GOAP and NavMesh navigation.",
    stack: ["A*", "NavMesh", "Finite State", "ML-Agents"],
  },
]

function PhysicsSim() {
  const [objects, setObjects] = useState<{ id: number; x: number; y: number; vx: number; vy: number }[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const spawnObject = () => {
    const newObj = {
      id: Date.now(),
      x: 50,
      y: 0,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 2 + 2,
    }
    setObjects((prev) => [...prev.slice(-10), newObj])
  }

  useEffect(() => {
    const ticker = setInterval(() => {
      setObjects((prev) =>
        prev
          .map((obj) => ({
            ...obj,
            x: obj.x + obj.vx,
            y: obj.y + obj.vy,
            vy: obj.vy + 0.1, // gravity
          }))
          .filter((obj) => obj.y < 100)
      )
    }, 16)
    return () => clearInterval(ticker)
  }, [])

  return (
    <div className="glass-card rounded-xl p-6 glow-border-hover overflow-hidden relative h-64 flex flex-col">
      <div className="flex items-center justify-between mb-4 z-10">
        <h3 className="font-mono text-sm font-semibold text-purple-400">
          <DecryptEffect>Newtonian Physics Pipeline</DecryptEffect>
        </h3>
        <button
          onClick={spawnObject}
          className="px-3 py-1 rounded-md text-xs font-mono border border-purple-500/30 text-purple-400 hover:bg-purple-500/10 transition-all flex items-center gap-2"
        >
          <Play className="w-3 h-3" /> Step Simulation
        </button>
      </div>

      <div ref={containerRef} className="flex-1 relative border border-border/50 rounded-lg bg-secondary/20 overflow-hidden">
        {objects.map((obj) => (
          <motion.div
            key={obj.id}
            className="absolute w-4 h-4 bg-purple-500 rounded-sm shadow-[0_0_10px_rgba(168,85,247,0.5)]"
            style={{ left: `${obj.x}%`, top: `${obj.y}%` }}
          />
        ))}
        {objects.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-[10px] font-mono uppercase tracking-widest opacity-30">
            Awaiting input signal...
          </div>
        )}
      </div>
    </div>
  )
}

function VFXStudio() {
  const [intensity, setIntensity] = useState(50)

  return (
    <div className="glass-card rounded-xl p-6 glow-border-hover h-64 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-mono text-sm font-semibold text-purple-400">
          <DecryptEffect>VFX Core: Particle System</DecryptEffect>
        </h3>
        <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
      </div>

      <div className="flex-1 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-mono text-muted-foreground uppercase">
            <span>Emission Rate</span>
            <span>{intensity}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={intensity}
            onChange={(e) => setIntensity(parseInt(e.target.value))}
            className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>

        <div className="relative h-20 rounded border border-border/30 overflow-hidden flex items-center justify-center">
            {/* Visual representation of particles */}
            {[...Array(Math.floor(intensity / 10 + 1))].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-purple-400 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                    animate={{
                        x: [0, (Math.random() - 0.5) * 100],
                        y: [0, (Math.random() - 0.5) * 60],
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                    }}
                    transition={{
                        duration: Math.random() * 2 + 1,
                        repeat: Infinity,
                        ease: "easeOut",
                    }}
                />
            ))}
            <div className="text-[10px] font-mono text-purple-400/40">HLSL SHADER ACTIVE</div>
        </div>
      </div>
    </div>
  )
}

export function GameDevSection() {
  const [activeModule, setActiveModule] = useState<number | null>(null)

  return (
    <section id="game-dev" className="relative py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 border-l-4 border-purple-500 pl-8"
        >
          <div className="flex items-center gap-4 mb-3">
             <div className="w-8 h-8 rounded-full border-2 border-purple-500/50 flex items-center justify-center animate-spin [animation-duration:3s]">
               <div className="w-4 h-px bg-purple-500" />
             </div>
             <span className="text-xs font-mono text-purple-400 tracking-[0.3em] uppercase">
               Sys_Engine_Graphics_v4.0
             </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-foreground text-balance uppercase italic tracking-tighter">
            Architecting <span className="text-purple-500">Virtual</span> Realities
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Interactive Modules */}
          <div className="grid sm:grid-cols-2 gap-4">
            {gameModules.map((module, i) => (
              <motion.div
                key={module.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActiveModule(activeModule === i ? null : i)}
                className={`p-4 rounded-xl border transition-all cursor-pointer group relative overflow-hidden ${
                  activeModule === i 
                    ? "bg-purple-500/10 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.1)]" 
                    : "bg-secondary/40 border-border hover:border-purple-500/30"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${activeModule === i ? "bg-purple-500 text-black" : "bg-card text-purple-400"}`}>
                    <module.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-mono text-sm font-bold">{module.label}</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{module.desc}</p>
                
                <AnimatePresence>
                  {activeModule === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-[11px] text-foreground/70 mb-3 leading-relaxed border-t border-border pt-3">
                        {module.details}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {module.stack.map(s => (
                          <span key={s} className="px-1.5 py-0.5 text-[9px] font-mono bg-black/40 border border-border rounded text-muted-foreground">
                            {s}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Right: Real-time Previews */}
          <div className="space-y-6">
            <PhysicsSim />
            <VFXStudio />
          </div>
        </div>

        {/* Featured Project Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-black/40 border border-purple-500/20 rounded-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4">
            <Target className="w-12 h-12 text-purple-500/10" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <span className="text-[10px] font-mono text-neon-green mb-2 block tracking-tighter uppercase">Featured Engine Implementation</span>
              <h3 className="text-2xl font-bold mb-3">Cosmic Shift: VR Physics Engine</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                A custom VR experience built from the ground up prioritizing low-latency 
                kinematic interactions and volumetric lighting. Optimized for standalone hardware 
                with specialized compute shaders for fractal environments.
              </p>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 text-xs font-mono text-purple-400 border border-purple-500/30 px-4 py-2 rounded-lg hover:bg-purple-500/10 transition-all">
                  Inspect_Module <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
            
            <div className="w-full md:w-64 h-40 bg-black/60 rounded-xl border border-border p-4 flex items-center justify-center relative overflow-hidden">
                {/* 3D Wireframe Mockup */}
                <motion.div 
                  animate={{ rotateY: 360, rotateX: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border border-purple-500/50 relative transform-gpu hover:scale-110 transition-transform"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute inset-0 border border-purple-500/30 -translate-z-8" />
                  <div className="absolute inset-0 border border-purple-500/30 translate-z-8" />
                </motion.div>
                <div className="absolute inset-x-0 bottom-2 text-center text-[8px] font-mono text-purple-500/40 uppercase">Rendering_Model_v2</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
