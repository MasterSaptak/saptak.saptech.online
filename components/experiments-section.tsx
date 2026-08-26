"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { FlaskConical } from "lucide-react"
import { DecryptEffect, SystemStatus } from "./tech-animations"
import { ProjectGrid } from "./project-grid"
import { allExperiments } from "@/lib/projects"

export function ExperimentsSection() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isHeadingInView = useInView(headingRef, { once: true })

  return (
    <section id="experiments" className="relative py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <SystemStatus message="Loading experiment log..." color="green" />
          <span className="text-xs font-mono text-neon-green tracking-widest uppercase mb-3 flex items-center gap-2">
            <FlaskConical className="w-3.5 h-3.5" aria-hidden="true" />
            {"// Experiments"}
          </span>
          <h2
            className={`text-3xl lg:text-4xl font-bold text-foreground text-balance transition-all duration-1000 ${
              isHeadingInView ? "heading-glow" : ""
            }`}
          >
            <DecryptEffect>Prototypes & Probes</DecryptEffect>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
            Smaller builds where the point was to learn something specific — firmware on real hardware,
            a cipher construction, an interaction model worth testing before committing to it. Kept
            here honestly, at the scale they were actually built.
          </p>
        </motion.div>

        <ProjectGrid items={allExperiments} track="experiment" compact accentColor="neon-green" />
      </div>
    </section>
  )
}
