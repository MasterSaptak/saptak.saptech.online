"use client"

import { useEffect, useRef } from "react"

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const isMobile = window.innerWidth < 768
    let animationId: number
    let particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }

    const createParticles = () => {
      particles = []
      const area = window.innerWidth * window.innerHeight
      const count = Math.floor(area / (isMobile ? 40000 : 20000))
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        })
      }
    }

    const connectionDist = isMobile ? 80 : 120
    let lastFrame = 0
    const targetInterval = isMobile ? 33 : 16

    const draw = (time: number) => {
      animationId = requestAnimationFrame(draw)

      if (time - lastFrame < targetInterval) return
      lastFrame = time

      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 229, 255, ${p.opacity})`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x
          const dy = particles[j].y - p.y
          if (Math.abs(dx) > connectionDist || Math.abs(dy) > connectionDist) continue
          const distSq = dx * dx + dy * dy
          if (distSq < connectionDist * connectionDist) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0, 229, 255, ${0.06 * (1 - Math.sqrt(distSq) / connectionDist)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    resize()
    createParticles()
    animationId = requestAnimationFrame(draw)

    const onResize = () => {
      resize()
      createParticles()
    }
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
