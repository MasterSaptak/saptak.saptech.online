"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const events = [
  {
    year: "2020",
    title: "Saptech - Founder & IT Consultant",
    description: "Founded a technology consultancy building real-world digital systems, full-stack web applications, mobile apps, and scalable business software.",
    color: "neon-blue",
  },
  {
    year: "2025",
    title: "Dhopa - Founder & Brand Promoter",
    description: "Built a student-focused smart laundry pickup and delivery service. Designed the service workflow, logistics, and pricing strategy.",
    color: "neon-green",
  },
  {
    year: "Community",
    title: "Leadership & Tech Events",
    description: "Founding member of Bangladesh Academy of Geological Sciences. DevFest Kolkata 2023 outreach. Organizer of Anandamela cultural festival. Founder of Shantibuzz Chess Squad.",
    color: "neon-blue",
  },
  {
    year: "Now",
    title: "AI, Cyber & Robotics Systems",
    description: "Converging security, IoT, and applied AI research. Building intelligent systems that operate in the real world with safety, intelligence, and scale.",
    color: "neon-green",
  },
]

export function TimelineSection() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isHeadingInView = useInView(headingRef, { once: true })
  const lineRef = useRef<HTMLDivElement>(null)
  const isLineInView = useInView(lineRef, { once: true, margin: "-10px" })

  return (
    <section id="timeline" className="relative py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-neon-blue tracking-widest uppercase mb-3 block">
            {"// Growth Arc"}
          </span>
          <h2
            className={`text-3xl lg:text-4xl font-bold text-foreground text-balance transition-all duration-1000 ${isHeadingInView ? "heading-glow" : ""
              }`}
          >
            Experience & Leadership
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl leading-relaxed">
            From hardware repair to AI research. A story of continuous building.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={lineRef} className="relative">
          {/* Vertical line with animated draw */}
          <div
            className={`absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-border lg:-translate-x-px transition-all duration-1000 ${isLineInView ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
              }`}
            style={{ transformOrigin: "top" }}
            aria-hidden="true"
          />

          <div className="space-y-12">
            {events.map((event, i) => (
              <motion.div
                key={`${event.year}-${event.title}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`relative flex flex-col lg:flex-row items-start ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-6 lg:gap-12`}
              >
                {/* Dot with pulse */}
                <div
                  className={`absolute left-4 lg:left-1/2 w-3 h-3 rounded-full bg-background border-2 ${event.color === "neon-blue" ? "border-neon-blue" : "border-neon-green"
                    } -translate-x-1.5 lg:-translate-x-1.5 mt-1.5 z-10 node-pulse`}
                />

                {/* Year */}
                <div className={`pl-10 lg:pl-0 lg:w-1/2 ${i % 2 === 0 ? "lg:text-right lg:pr-12" : "lg:text-left lg:pl-12"}`}>
                  <span className={`font-mono text-2xl font-bold ${event.color === "neon-blue" ? "text-neon-blue" : "text-neon-green"}`}>
                    {event.year}
                  </span>
                </div>

                {/* Content */}
                <div className={`pl-10 lg:pl-0 lg:w-1/2 ${i % 2 === 0 ? "lg:pl-12" : "lg:pr-12 lg:text-right"}`}>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
