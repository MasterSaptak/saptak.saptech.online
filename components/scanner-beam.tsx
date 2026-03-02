"use client"

import { useEffect, useRef } from "react"

/**
 * A horizontal scanning beam that sweeps down the page,
 * reminiscent of a robotic eye / security scanner.
 */
export function ScannerBeam() {
    const beamRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const beam = beamRef.current
        if (!beam) return

        let y = -200
        let direction = 1
        let animId: number
        const speed = 0.35

        const animate = () => {
            y += speed * direction
            const maxY = window.innerHeight

            if (y > maxY + 200) {
                direction = -1
            } else if (y < -200) {
                direction = 1
            }

            beam.style.transform = `translateY(${y}px)`
            animId = requestAnimationFrame(animate)
        }

        animId = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animId)
    }, [])

    return (
        <div
            ref={beamRef}
            className="fixed left-0 right-0 z-[2] pointer-events-none"
            style={{ top: 0 }}
            aria-hidden="true"
        >
            {/* Main beam line */}
            <div
                className="w-full h-[1px]"
                style={{
                    background:
                        "linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.05) 10%, rgba(0,229,255,0.15) 50%, rgba(0,229,255,0.05) 90%, transparent 100%)",
                }}
            />
            {/* Glow above */}
            <div
                className="w-full h-8 -mt-8"
                style={{
                    background:
                        "linear-gradient(180deg, transparent, rgba(0,229,255,0.02))",
                }}
            />
            {/* Glow below */}
            <div
                className="w-full h-12"
                style={{
                    background:
                        "linear-gradient(0deg, transparent, rgba(0,229,255,0.015))",
                }}
            />
        </div>
    )
}
