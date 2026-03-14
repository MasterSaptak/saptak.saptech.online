"use client"

import { useEffect, useRef } from "react"

/**
 * Animated circuit-board trace background.
 * Draws PCB-style traces with glowing data packets traveling along them.
 */
export function CircuitBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animId: number
        let w = 0
        let h = 0

        // Circuit nodes and edges
        interface Node {
            x: number
            y: number
        }
        interface Edge {
            from: number
            to: number
            progress: number
            speed: number
            active: boolean
            delay: number
            elapsed: number
        }

        let nodes: Node[] = []
        let edges: Edge[] = []

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            w = window.innerWidth
            h = window.innerHeight
            canvas.width = w * dpr
            canvas.height = h * dpr
            canvas.style.width = `${w}px`
            canvas.style.height = `${h}px`
            ctx.scale(dpr, dpr)
            generateCircuit()
        }

        const generateCircuit = () => {
            nodes = []
            edges = []

            const isMobileGen = w < 768
            const spacing = isMobileGen ? 180 : 120
            const skipChance = isMobileGen ? 0.6 : 0.4
            const cols = Math.floor(w / spacing)
            const rows = Math.floor(h / spacing)
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    if (Math.random() > skipChance) {
                        nodes.push({
                            x: (c + 0.5) * (w / cols) + (Math.random() - 0.5) * 40,
                            y: (r + 0.5) * (h / rows) + (Math.random() - 0.5) * 40,
                        })
                    }
                }
            }

            // Connect nearby nodes with circuit-style right-angle paths
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = Math.abs(nodes[j].x - nodes[i].x)
                    const dy = Math.abs(nodes[j].y - nodes[i].y)
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < 180 && Math.random() > 0.6) {
                        edges.push({
                            from: i,
                            to: j,
                            progress: 0,
                            speed: 0.003 + Math.random() * 0.004,
                            active: Math.random() > 0.5,
                            delay: Math.random() * 8000,
                            elapsed: 0,
                        })
                    }
                }
            }
        }

        const isMobile = w < 768
        let lastTime = 0
        let lastFrame = 0
        const targetInterval = isMobile ? 50 : 16

        const draw = (time: number) => {
            const dt = lastTime ? time - lastTime : 16
            lastTime = time

            if (time - lastFrame < targetInterval) {
                animId = requestAnimationFrame(draw)
                return
            }
            lastFrame = time

            ctx.clearRect(0, 0, w, h)

            // Draw traces (static circuit lines)
            for (const edge of edges) {
                const a = nodes[edge.from]
                const b = nodes[edge.to]
                const midX = b.x
                const midY = a.y

                ctx.beginPath()
                ctx.moveTo(a.x, a.y)
                ctx.lineTo(midX, midY)
                ctx.lineTo(b.x, b.y)
                ctx.strokeStyle = "rgba(0, 229, 255, 0.04)"
                ctx.lineWidth = 0.8
                ctx.stroke()
            }

            // Draw nodes
            for (const node of nodes) {
                ctx.beginPath()
                ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2)
                ctx.fillStyle = "rgba(0, 229, 255, 0.08)"
                ctx.fill()

                // Small cross at some nodes
                if (Math.random() > 0.998) {
                    ctx.strokeStyle = "rgba(0, 229, 255, 0.15)"
                    ctx.lineWidth = 0.5
                    ctx.beginPath()
                    ctx.moveTo(node.x - 4, node.y)
                    ctx.lineTo(node.x + 4, node.y)
                    ctx.moveTo(node.x, node.y - 4)
                    ctx.lineTo(node.x, node.y + 4)
                    ctx.stroke()
                }
            }

            // Animate data packets along edges
            for (const edge of edges) {
                if (!edge.active) {
                    edge.elapsed += dt
                    if (edge.elapsed >= edge.delay) {
                        edge.active = true
                        edge.elapsed = 0
                    }
                    continue
                }

                edge.progress += edge.speed * (dt / 16)
                if (edge.progress > 1) {
                    edge.progress = 0
                    edge.active = false
                    edge.delay = 3000 + Math.random() * 6000
                    edge.elapsed = 0
                    continue
                }

                const a = nodes[edge.from]
                const b = nodes[edge.to]
                const midX = b.x
                const midY = a.y
                const p = edge.progress

                let px: number, py: number
                if (p < 0.5) {
                    const t = p * 2
                    px = a.x + (midX - a.x) * t
                    py = a.y + (midY - a.y) * t
                } else {
                    const t = (p - 0.5) * 2
                    px = midX + (b.x - midX) * t
                    py = midY + (b.y - midY) * t
                }

                // Glowing packet
                const gradient = ctx.createRadialGradient(px, py, 0, px, py, 6)
                gradient.addColorStop(0, "rgba(0, 229, 255, 0.6)")
                gradient.addColorStop(1, "rgba(0, 229, 255, 0)")
                ctx.beginPath()
                ctx.arc(px, py, 6, 0, Math.PI * 2)
                ctx.fillStyle = gradient
                ctx.fill()

                // Bright core
                ctx.beginPath()
                ctx.arc(px, py, 1, 0, Math.PI * 2)
                ctx.fillStyle = "rgba(0, 229, 255, 0.8)"
                ctx.fill()
            }

            animId = requestAnimationFrame(draw)
        }

        resize()
        animId = requestAnimationFrame(draw)

        window.addEventListener("resize", resize)
        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener("resize", resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[1] opacity-60"
            aria-hidden="true"
        />
    )
}
