"use client"

import { useEffect, useState, useRef } from "react"

/**
 * Floating binary/hex data stream along the right edge of the viewport.
 * Creates a "Matrix-like" data waterfall effect with a robotic feel.
 */
export function DataStream() {
    const [columns, setColumns] = useState<
        Array<{ id: number; chars: string[]; x: number; speed: number; opacity: number }>
    >([])
    const containerRef = useRef<HTMLDivElement>(null)
    const animRef = useRef<number>(0)
    const columnsRef = useRef(columns)
    columnsRef.current = columns

    useEffect(() => {
        const hexChars = "0123456789ABCDEF"
        const binChars = "01"
        const symbols = "⟨⟩◊◈⬡⬢△▽⊕⊗"

        const generateColumn = (id: number, side: "left" | "right"): typeof columns[0] => {
            const charSet = Math.random() > 0.5 ? hexChars : binChars
            const mixedSet = Math.random() > 0.8 ? symbols : charSet
            const length = 8 + Math.floor(Math.random() * 12)
            const chars: string[] = []
            for (let i = 0; i < length; i++) {
                chars.push(mixedSet[Math.floor(Math.random() * mixedSet.length)])
            }
            const x = side === "right"
                ? 85 + Math.random() * 14
                : Math.random() * 14 + 1
            return {
                id,
                chars,
                x,
                speed: 15 + Math.random() * 25,
                opacity: 0.03 + Math.random() * 0.06,
            }
        }

        let nextId = 0
        const initialCols: typeof columns = []
        for (let i = 0; i < 6; i++) {
            initialCols.push(generateColumn(nextId++, i % 2 === 0 ? "right" : "left"))
        }
        setColumns(initialCols)

        // Periodically add new columns
        const interval = setInterval(() => {
            if (columnsRef.current.length < 10) {
                const side = Math.random() > 0.5 ? "right" : "left"
                setColumns((prev) => [...prev, generateColumn(nextId++, side as "left" | "right")])
            }
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
            aria-hidden="true"
        >
            {columns.map((col) => (
                <div
                    key={col.id}
                    className="absolute top-0 data-stream-column"
                    style={{
                        left: `${col.x}%`,
                        opacity: col.opacity,
                        animationDuration: `${col.speed}s`,
                    }}
                >
                    <div className="font-mono text-[9px] leading-[14px] text-neon-blue tracking-widest whitespace-nowrap">
                        {col.chars.map((char, i) => (
                            <div
                                key={i}
                                style={{
                                    opacity: i === 0 ? 1 : 0.3 + (i / col.chars.length) * 0.7,
                                    color: i === 0 ? "rgba(0, 229, 255, 0.9)" : undefined,
                                    textShadow: i === 0 ? "0 0 8px rgba(0, 229, 255, 0.5)" : undefined,
                                }}
                            >
                                {char}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
