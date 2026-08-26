"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Github, ExternalLink, ArrowUpRight, Lock } from "lucide-react"
import { HardwareBlueprint } from "./hardware-blueprint"
import { useSignal } from "./signal-context"
import { DecryptEffect } from "./tech-animations"
import type { Accent, Project, ProjectStatus } from "@/lib/projects"

export function accentClasses(accent: Accent) {
  if (accent === "green") {
    return {
      text: "text-neon-green",
      dot: "bg-neon-green/70",
      glow: "bg-neon-green",
      ring: "hover:border-neon-green/30",
      panel: "bg-gradient-to-br from-neon-green/10 via-transparent to-transparent",
      tag: "border-neon-green/20 bg-neon-green/[0.08] text-neon-green/80",
      pill: "border-neon-green/25 bg-neon-green/10 text-neon-green/85",
      button: "border-neon-green/25 bg-neon-green/10 text-neon-green hover:bg-neon-green/20",
      chip: "border-neon-green/40 bg-neon-green/15 text-neon-green",
    }
  }
  if (accent === "purple") {
    return {
      text: "text-purple-300",
      dot: "bg-purple-400/70",
      glow: "bg-purple-400",
      ring: "hover:border-purple-400/30",
      panel: "bg-gradient-to-br from-purple-400/10 via-transparent to-transparent",
      tag: "border-purple-400/20 bg-purple-400/[0.08] text-purple-300/80",
      pill: "border-purple-400/25 bg-purple-400/10 text-purple-300/85",
      button: "border-purple-400/25 bg-purple-400/10 text-purple-300 hover:bg-purple-400/20",
      chip: "border-purple-400/40 bg-purple-400/15 text-purple-300",
    }
  }
  return {
    text: "text-neon-blue",
    dot: "bg-neon-blue/70",
    glow: "bg-neon-blue",
    ring: "hover:border-neon-blue/30",
    panel: "bg-gradient-to-br from-neon-blue/10 via-transparent to-transparent",
    tag: "border-neon-blue/20 bg-neon-blue/[0.08] text-neon-blue/80",
    pill: "border-neon-blue/25 bg-neon-blue/10 text-neon-blue/85",
    button: "border-neon-blue/25 bg-neon-blue/10 text-neon-blue hover:bg-neon-blue/20",
    chip: "border-neon-blue/40 bg-neon-blue/15 text-neon-blue",
  }
}

/** Live gets a pulsing dot; everything else reads as a plain state label. */
export function StatusPill({ status, accent }: { status: ProjectStatus; accent: Accent }) {
  const a = accentClasses(accent)
  const muted = status === "Archived" || status === "Concept"
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.2em] uppercase px-2.5 py-1 rounded-full border ${
        muted ? "border-border bg-secondary/40 text-muted-foreground" : a.pill
      }`}
    >
      {status === "Live" && (
        <span className={`w-1.5 h-1.5 rounded-full ${a.glow} pulse-glow`} aria-hidden="true" />
      )}
      {status}
    </span>
  )
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
}

/** Fallback header for projects with no screenshot — costs nothing to load. */
function SignalPanel({ project }: { project: Project }) {
  const a = accentClasses(project.accent)
  return (
    <div className={`relative h-full w-full overflow-hidden ${a.panel}`}>
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          color: "rgba(255,255,255,0.12)",
        }}
        aria-hidden="true"
      />
      <div
        className={`absolute -top-20 -right-16 w-52 h-52 blur-[90px] opacity-20 group-hover:opacity-35 transition-opacity duration-500 ${a.glow}`}
        aria-hidden="true"
      />
      <div className="relative h-full flex flex-col justify-between p-5">
        <span className={`font-mono text-[10px] tracking-[0.3em] uppercase ${a.text} opacity-70`}>
          {project.categories[0]}
        </span>
        <span className="font-mono text-[11px] text-muted-foreground/60 tracking-wider">
          {"// "}
          {project.slug}
        </span>
      </div>
    </div>
  )
}

export function ProjectCard({
  project,
  onOpen,
  compact = false,
}: {
  project: Project
  onOpen: (project: Project) => void
  compact?: boolean
}) {
  const { emitSignal } = useSignal()
  const a = accentClasses(project.accent)

  const handleMouseEnter = (e: React.MouseEvent) => {
    emitSignal(e.clientX, e.clientY, project.accent === "green" ? "green" : "blue")
  }

  return (
    <motion.article
      variants={cardVariants}
      onMouseEnter={handleMouseEnter}
      className={`group relative flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-card/40 backdrop-blur-md project-card transition-colors duration-300 ${a.ring}`}
    >
      <div className={compact ? "relative h-28 overflow-hidden" : "relative h-48 sm:h-56 overflow-hidden"}>
        {project.blueprint ? (
          <HardwareBlueprint
            type={project.blueprint}
            className="w-full h-full border-none rounded-none"
          />
        ) : project.image ? (
          <>
            <Image
              src={project.image}
              alt=""
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
          </>
        ) : (
          <SignalPanel project={project} />
        )}
      </div>

      <div className={`flex flex-col flex-1 ${compact ? "p-5" : "p-6"}`}>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <StatusPill status={project.status} accent={project.accent} />
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
            {project.year}
          </span>
        </div>

        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className={`text-lg lg:text-xl font-bold ${a.text}`}>
            <DecryptEffect>{project.name}</DecryptEffect>
          </h3>
          <div className="flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity duration-300 shrink-0">
            {project.visibility === "private" && (
              <span
                className="text-muted-foreground p-1 -m-1"
                title="Private codebase — source not publicly available"
              >
                <Lock className="w-4 h-4" aria-hidden="true" />
                <span className="sr-only">Private codebase</span>
              </span>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-muted-foreground hover:text-foreground transition-colors p-1 -m-1"
                aria-label={`${project.name} source on GitHub`}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-muted-foreground hover:text-foreground transition-colors p-1 -m-1"
                aria-label={`${project.name} live demo`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <p className="text-sm text-foreground/80 leading-relaxed mb-4">{project.tagline}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.slice(0, compact ? 3 : 4).map((t) => (
            <span key={t} className={`px-2 py-0.5 text-[11px] font-mono rounded-md border ${a.tag}`}>
              {t}
            </span>
          ))}
          {project.tech.length > (compact ? 3 : 4) && (
            <span className="px-2 py-0.5 text-[11px] font-mono rounded-md border border-border text-muted-foreground">
              +{project.tech.length - (compact ? 3 : 4)}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => onOpen(project)}
          className={`mt-auto inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 border font-mono text-xs tracking-[0.15em] uppercase transition-colors ${a.button}`}
        >
          Read the breakdown
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </motion.article>
  )
}
