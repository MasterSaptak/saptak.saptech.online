"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

/**
 * Glitch text effect for section headings.
 * Creates a cyberpunk-style glitch/decode animation when heading scrolls into view.
 */
export function GlitchText({
    children,
    className = "",
    as: Tag = "h2",
}: {
    children: string
    className?: string
    as?: "h1" | "h2" | "h3" | "span"
}) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-10px" })
    const [displayText, setDisplayText] = useState(children)
    const [isDecoding, setIsDecoding] = useState(false)

    useEffect(() => {
        if (!isInView) return

        setIsDecoding(true)
        const target = children
        const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?01"
        let iteration = 0
        const maxIterations = target.length

        const interval = setInterval(() => {
            setDisplayText(
                target
                    .split("")
                    .map((char, i) => {
                        if (char === " ") return " "
                        if (i < iteration) return target[i]
                        return chars[Math.floor(Math.random() * chars.length)]
                    })
                    .join("")
            )
            iteration += 1
            if (iteration > maxIterations) {
                clearInterval(interval)
                setDisplayText(target)
                setIsDecoding(false)
            }
        }, 35)

        return () => clearInterval(interval)
    }, [isInView, children])

    return (
        <div ref={ref} className="relative">
            <Tag className={`${className} ${isDecoding ? "glitch-active" : ""}`}>
                {displayText}
            </Tag>
            {isDecoding && (
                <>
                    <Tag
                        className={`${className} absolute inset-0 glitch-copy-1`}
                        aria-hidden="true"
                    >
                        {displayText}
                    </Tag>
                    <Tag
                        className={`${className} absolute inset-0 glitch-copy-2`}
                        aria-hidden="true"
                    >
                        {displayText}
                    </Tag>
                </>
            )}
        </div>
    )
}

/**
 * Robotic section reveal — slides in with a tech "boot-up" animation.
 */
export function RoboReveal({
    children,
    className = "",
    direction = "up",
}: {
    children: React.ReactNode
    className?: string
    direction?: "up" | "left" | "right"
}) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-10px" })

    const initial = {
        opacity: 0,
        y: direction === "up" ? 40 : 0,
        x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
        filter: "blur(4px)",
    }

    const animate = {
        opacity: 1,
        y: 0,
        x: 0,
        filter: "blur(0px)",
    }

    return (
        <div ref={ref}>
            <motion.div
                initial={initial}
                animate={isInView ? animate : initial}
                transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className={className}
            >
                {/* Tech scan-line on reveal */}
                {isInView && (
                    <motion.div
                        className="absolute inset-x-0 top-0 h-[2px] z-10 pointer-events-none"
                        style={{
                            background:
                                "linear-gradient(90deg, transparent, rgba(0,229,255,0.4), transparent)",
                        }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: [0, 1, 0] }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                )}
                {children}
            </motion.div>
        </div>
    )
}

/**
 * Typing cursor status bar — shows a "system status" message
 * at the start of each section, typed out character by character.
 */
export function SystemStatus({ message, color = "blue" }: { message: string; color?: "blue" | "green" }) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-10px" })
    const [text, setText] = useState("")

    useEffect(() => {
        if (!isInView) return
        let i = 0
        const interval = setInterval(() => {
            setText(message.slice(0, i + 1))
            i++
            if (i >= message.length) clearInterval(interval)
        }, 25)
        return () => clearInterval(interval)
    }, [isInView, message])

    const neonColor = color === "blue" ? "text-neon-blue" : "text-neon-green"
    const dotColor = color === "blue" ? "bg-neon-blue" : "bg-neon-green"

    return (
        <div ref={ref} className="flex items-center gap-2 mb-6">
            <span className={`w-1.5 h-1.5 rounded-full ${dotColor} pulse-glow`} />
            <span className={`text-[10px] font-mono ${neonColor} tracking-[0.2em] uppercase`}>
                {text}
                {isInView && text.length < message.length && (
                    <span className="cursor-blink">▋</span>
                )}
            </span>
        </div>
    )
}

/**
 * Corner brackets decoration — adds tech-style corner brackets to any container.
 */
export function TechCorners({
    children,
    className = "",
    color = "blue",
}: {
    children: React.ReactNode
    className?: string
    color?: "blue" | "green"
}) {
    const borderColor = color === "blue" ? "border-neon-blue/20" : "border-neon-green/20"

    return (
        <div className={`relative ${className}`}>
            {/* Top-left bracket */}
            <div
                className={`absolute top-0 left-0 w-4 h-4 border-t border-l ${borderColor}`}
                aria-hidden="true"
            />
            {/* Top-right bracket */}
            <div
                className={`absolute top-0 right-0 w-4 h-4 border-t border-r ${borderColor}`}
                aria-hidden="true"
            />
            {/* Bottom-left bracket */}
            <div
                className={`absolute bottom-0 left-0 w-4 h-4 border-b border-l ${borderColor}`}
                aria-hidden="true"
            />
            {/* Bottom-right bracket */}
            <div
                className={`absolute bottom-0 right-0 w-4 h-4 border-b border-r ${borderColor}`}
                aria-hidden="true"
            />
            {children}
        </div>
    )
}
