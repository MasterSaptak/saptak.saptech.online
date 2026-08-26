"use client"

import Image from "next/image"
import { Github, ExternalLink, Info, Lock } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { HardwareBlueprint } from "./hardware-blueprint"
import { StatusPill, accentClasses } from "./project-card"
import type { Project } from "@/lib/projects"

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h4 className="text-[10px] font-mono tracking-[0.25em] uppercase text-muted-foreground mb-2.5">
        {title}
      </h4>
      {children}
    </section>
  )
}

function BulletList({ items, dot }: { items: string[]; dot: string }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm text-foreground/85 leading-relaxed">
          <span className={`mt-[0.5rem] w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function ProjectDetailDialog({
  project,
  onOpenChange,
}: {
  project: Project | null
  onOpenChange: (open: boolean) => void
}) {
  const a = accentClasses(project?.accent ?? "blue")

  return (
    <Dialog open={project !== null} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-3xl w-[calc(100%-2rem)] max-h-[85vh] overflow-y-auto rounded-2xl border-white/10 bg-card/95 backdrop-blur-xl p-0"
      >
        {project && (
          <>
            <div className="relative">
              {project.blueprint ? (
                <div className="h-40 sm:h-52">
                  <HardwareBlueprint
                    type={project.blueprint}
                    className="w-full h-full border-none rounded-none rounded-t-2xl"
                  />
                </div>
              ) : project.image ? (
                <div className="relative h-40 sm:h-52 overflow-hidden rounded-t-2xl">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                </div>
              ) : (
                <div className={`h-24 sm:h-28 rounded-t-2xl ${a.panel} relative overflow-hidden`}>
                  <div className={`absolute -top-16 -right-10 w-48 h-48 blur-[80px] opacity-25 ${a.glow}`} />
                </div>
              )}

              <div className="px-6 sm:px-8 pb-2 -mt-8 relative">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <StatusPill status={project.status} accent={project.accent} />
                  <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
                    {project.kind}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-border" aria-hidden="true" />
                  <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
                    {project.year}
                  </span>
                </div>

                <DialogTitle className={`text-2xl sm:text-3xl font-black tracking-tight ${a.text}`}>
                  {project.name}
                </DialogTitle>
                <DialogDescription className="text-sm text-foreground/80 mt-1.5">
                  {project.tagline}
                </DialogDescription>
              </div>
            </div>

            <div className="px-6 sm:px-8 pb-8 pt-4 space-y-7">
              <p className="text-sm text-foreground/85 leading-relaxed">{project.summary}</p>

              {project.note && (
                <div className="flex gap-3 rounded-xl border border-amber-300/20 bg-amber-300/5 p-4">
                  <Info className="w-4 h-4 text-amber-300/80 shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-xs text-amber-100/70 leading-relaxed">{project.note}</p>
                </div>
              )}

              {(project.problem || project.solution) && (
                <div className="grid sm:grid-cols-2 gap-5">
                  {project.problem && (
                    <Block title="Problem">
                      <p className="text-sm text-foreground/80 leading-relaxed">{project.problem}</p>
                    </Block>
                  )}
                  {project.solution && (
                    <Block title="Solution">
                      <p className="text-sm text-foreground/80 leading-relaxed">{project.solution}</p>
                    </Block>
                  )}
                </div>
              )}

              {project.approach && project.approach.length > 0 && (
                <Block title="Technical approach">
                  <BulletList items={project.approach} dot={a.dot} />
                </Block>
              )}

              {project.features && project.features.length > 0 && (
                <Block title="Key features">
                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                    {project.features.map((f) => (
                      <div key={f} className="flex gap-2.5 text-sm text-foreground/80 leading-relaxed">
                        <span className={`mt-[0.5rem] w-1 h-1 rounded-full shrink-0 ${a.dot}`} aria-hidden="true" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </Block>
              )}

              <Block title="Built with">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className={`px-2.5 py-1 text-xs font-mono rounded-md border ${a.tag}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Block>

              {(project.github || project.live || project.visibility === "private") && (
                <div className="flex flex-wrap gap-3 pt-1">
                  {project.visibility === "private" && (
                    <span className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 border border-border bg-secondary/30 text-muted-foreground font-mono text-sm tracking-wide">
                      <Lock className="w-4 h-4" aria-hidden="true" />
                      Private codebase
                    </span>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 border font-mono text-sm tracking-wide transition-colors ${a.button}`}
                    >
                      <Github className="w-4 h-4" aria-hidden="true" />
                      View source
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 border border-border bg-secondary/30 text-foreground/80 font-mono text-sm tracking-wide hover:bg-secondary/50 hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      Live demo
                    </a>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
