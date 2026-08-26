"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ProjectCard } from "./project-card"
import { ProjectDetailDialog } from "./project-detail-dialog"
import { categoriesFor, type Category, type Project, type Track } from "@/lib/projects"

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export function ProjectGrid({
  items,
  track,
  compact = false,
  accentColor = "neon-blue",
}: {
  items: Project[]
  track: Track
  compact?: boolean
  accentColor?: "neon-blue" | "neon-green"
}) {
  const [active, setActive] = useState<Category | "All">("All")
  const [selected, setSelected] = useState<Project | null>(null)

  const categories = useMemo(() => categoriesFor(track), [track])
  const filtered = useMemo(
    () => (active === "All" ? items : items.filter((p) => p.categories.includes(active))),
    [items, active],
  )

  const isBlue = accentColor === "neon-blue"
  const activeChip = isBlue
    ? "border-neon-blue/40 bg-neon-blue/15 text-neon-blue"
    : "border-neon-green/40 bg-neon-green/15 text-neon-green"

  return (
    <>
      <div
        role="group"
        aria-label={`Filter ${track === "project" ? "projects" : "experiments"} by category`}
        className="flex flex-wrap gap-2 mb-10"
      >
        {(["All", ...categories] as const).map((cat) => {
          const isActive = active === cat
          const count = cat === "All" ? items.length : items.filter((p) => p.categories.includes(cat)).length
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={isActive}
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-mono tracking-[0.15em] uppercase transition-colors duration-300 ${
                isActive
                  ? activeChip
                  : "border-border bg-secondary/25 text-muted-foreground hover:text-foreground hover:border-white/20"
              }`}
            >
              {cat}
              <span className={isActive ? "opacity-70" : "opacity-40"}>{count}</span>
            </button>
          )
        })}
      </div>

      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10px" }}
        className={`grid gap-6 ${
          compact ? "sm:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"
        }`}
      >
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} onOpen={setSelected} compact={compact} />
        ))}
      </motion.div>

      <ProjectDetailDialog project={selected} onOpenChange={(open) => !open && setSelected(null)} />
    </>
  )
}
