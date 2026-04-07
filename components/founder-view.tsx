"use client"

import { motion } from "framer-motion"
import {
  ArrowRight,
  Rocket,
  Layers,
  Zap,
  Globe,
  Cpu,
  Activity,
  Network,
  Target,
  Lightbulb,
  TrendingUp,
  Workflow,
  Briefcase,
} from "lucide-react"
import Image from "next/image"

/* ═══════════════════════════════════════════════
   FOUNDER VIEW  –  Full venture-focused content
   Ported from the standalone Funder project
   ═══════════════════════════════════════════════ */

export function FounderView() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Grid — only active below hero */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-20 mt-[20vh]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse at center, black, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent 80%)",
          }}
        />
        <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent" />
      </div>

      <main className="relative z-10 pt-12 pb-24 px-6 max-w-7xl mx-auto space-y-32">
        {/* ═══ HERO SECTION ═══ */}
        <section className="min-h-[85vh] flex items-center relative">
          {/* Hero ambient glow */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#06b6d4]/[0.04] blur-[120px]" />
            <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#10b981]/[0.03] blur-[100px]" />
          </div>

          <div className="flex flex-col lg:flex-row gap-16 lg:gap-12 items-center w-full relative z-10">
            {/* Left — Text */}
            <motion.div
              className="flex-1 max-w-xl lg:max-w-2xl"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Eyebrow */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono tracking-[0.15em] uppercase text-white/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] animate-pulse" />
                  Building the future
                </span>
              </div>

              <h1 className="font-sans font-bold text-white tracking-tight leading-[1.08]">
                <span className="block text-[clamp(2.5rem,5.5vw,4.5rem)]">Aspiring Tech</span>
                <span className="block text-[clamp(2.5rem,5.5vw,4.5rem)]">Entrepreneur</span>
                <span className="block text-[clamp(2.5rem,5.5vw,4.5rem)] text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] via-[#06b6d4] to-[#10b981] mt-1">
                  Venture Builder
                </span>
              </h1>

              <p className="text-lg md:text-xl text-white/70 leading-relaxed mt-6 mb-3 max-w-lg">
                I focus on engineering real-world systems and scaling them into sustainable ventures.
              </p>
              <p className="text-sm text-white/40 mb-10 font-medium leading-relaxed max-w-md">
                Driven by a relentless curiosity to understand how things work — and the ambition to make them work better.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="#initiatives"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#06b6d4] to-[#22d3ee] text-black font-semibold text-sm tracking-wide hover:shadow-[0_0_30px_rgba(6,182,212,0.35)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  View Initiatives
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#collaborate"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/[0.04] border border-white/[0.12] text-white font-medium text-sm tracking-wide backdrop-blur-sm hover:bg-white/[0.08] hover:border-[#06b6d4]/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Collaborate
                </a>
              </div>
            </motion.div>

            {/* Right — Profile Image */}
            <motion.div
              className="flex-1 flex justify-center lg:justify-end w-full max-w-lg"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              <div className="relative">
                {/* Radial glow */}
                <div
                  className="absolute -inset-8 rounded-full pointer-events-none animate-pulse"
                  style={{
                    background: "radial-gradient(ellipse at center, rgba(6,182,212,0.12) 0%, rgba(16,185,129,0.08) 40%, transparent 70%)",
                    animationDuration: "5s",
                  }}
                  aria-hidden="true"
                />

                {/* Image container */}
                <div className="relative w-[320px] md:w-[380px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/40">
                  <Image
                    src="/founder-profile.jpg"
                    alt="Founder Profile"
                    fill
                    priority
                    className="object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700 scale-[1.02] hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#06b6d4]/[0.05] to-transparent pointer-events-none" />
                  <div className="absolute inset-3 border border-white/[0.06] rounded-xl pointer-events-none" />

                  {/* Status Label */}
                  <div className="absolute bottom-5 left-5 right-5 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-black/50 backdrop-blur-xl border border-white/[0.08]">
                    <div className="w-2 h-2 rounded-full bg-[#22d3ee] animate-pulse flex-shrink-0" />
                    <span className="font-mono text-[10px] tracking-[0.2em] text-[#67e8f9]/90 font-medium uppercase">
                      Founder Mode — Active
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ INITIATIVES & PROJECTS ═══ */}
        <section id="initiatives" className="scroll-mt-32">
          <SectionHeader title="Initiatives & Projects" subtitle="Ventures with real market potential" icon={<Rocket />} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <InitiativeCard
              title="Dhopa"
              tag="Logistics / Service"
              status="Live, Apr 2025 – Present"
              problem="Inefficient and fragmented local laundry services lacking digital tracking."
              solution="A smart laundry platform streamlining operations, pricing, and logistics."
              model="B2C Service & Subscription"
              role="Founder & Operator"
              tech={["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"]}
            />
            <InitiativeCard
              title="Error CCx404"
              tag="SaaS / DevTools"
              status="Live, Sep 2022 – Present"
              problem="Developers lack a unified ecosystem for building, deploying, and collaborating."
              solution="A comprehensive DevOps builder ecosystem and community platform."
              model="Freemium SaaS"
              role="Creator & Lead Developer"
              tech={["React", "Go", "Docker", "Kubernetes", "AWS"]}
            />
            <InitiativeCard
              title="Pocket Post"
              tag="Productivity / SaaS"
              status="Live, Dec 2024 – Present"
              problem="Friction in quick collaboration and sharing small snippets of data/ideas."
              solution="A lightweight, fast collaboration platform for instant sharing."
              model="B2B / B2C SaaS"
              role="Founder & Architect"
              tech={["React", "Supabase", "WebSockets", "Redis"]}
            />
            <InitiativeCard
              title="Chocket"
              tag="E-Commerce"
              status="Live, 2023 – Present"
              problem="Limited access to premium, cross-border chocolate brands in local markets."
              solution="A specialized cross-border commerce platform for premium chocolates."
              model="D2C Retail"
              role="Founder"
              tech={["Next.js", "Stripe", "Sanity CMS", "Vercel"]}
            />
            <InitiativeCard
              title="Converto"
              tag="FinTech"
              status="Ongoing"
              problem="Complex and expensive cross-currency payment workflows for small businesses."
              solution="A streamlined payment and currency conversion system."
              model="Transaction Fee"
              role="Architect & Developer"
              tech={["TypeScript", "Node.js", "PostgreSQL", "Redis"]}
              fullWidth
            />
          </div>
        </section>

        {/* ═══ EXPERIENCE & EXECUTION ═══ */}
        <section>
          <SectionHeader title="Experience & Execution" subtitle="Real-world operations and consulting" icon={<Briefcase />} />
          <div className="space-y-6 mt-12">
            <ExperienceCard
              title="Saptech"
              role="Founder & IT Consultant"
              date="2020 – Present"
              points={[
                "Built real-world systems, applications, and business platforms for clients.",
                "Designed and implemented payment workflows and automated deployment systems.",
                "Consulted on digital transformation and technical architecture.",
              ]}
            />
            <ExperienceCard
              title="Dhopa"
              role="Founder & Brand Promoter"
              date="2025 – Present"
              points={[
                "Built and currently operate a real-world service business from the ground up.",
                "Designed end-to-end logistics, pricing models, and daily operations.",
                "Managed customer acquisition and brand positioning in the local market.",
              ]}
            />
            <ExperienceCard
              title="Digital Marketing Specialist"
              role="Freelancer"
              date="2020 – Present"
              points={[
                "Ran targeted ad campaigns across Meta and Google platforms.",
                "Executed SEO strategies and outreach campaigns to drive organic growth.",
                "Worked with real audiences, analyzing data to optimize growth systems.",
              ]}
            />
          </div>
        </section>

        {/* ═══ VENTURE METHODOLOGY ═══ */}
        <section>
          <SectionHeader title="Venture Methodology" subtitle="My 4-step process for building scalable businesses" icon={<Workflow />} />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <MethodStep number="01" title="Identify Problems" desc="Look for friction in existing systems. I focus on markets where outdated processes create bottlenecks." />
            <MethodStep number="02" title="Validate Need" desc="Before writing code, I test assumptions. Talking to potential users and running small-scale experiments." />
            <MethodStep number="03" title="Build MVP" desc="Rapidly engineer a functional prototype. Focus on the core value proposition and ignore the noise." />
            <MethodStep number="04" title="Iterate & Scale" desc="Deploy, gather real-world data, and refine. Build systems that can handle growth without breaking." />
          </div>
        </section>

        {/* ═══ METRICS ═══ */}
        <section>
          <div className="rounded-2xl p-8 md:p-12 bg-white/[0.03] backdrop-blur-md border border-[#06b6d4]/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <Metric value="5+" label="Ventures Built" />
              <Metric value="10+" label="Systems Developed" />
              <Metric value="4" label="Core Domains" sub="(AI, IoT, Cyber, FinTech)" />
              <Metric value="100%" label="Real-World" sub="Deployments" />
            </div>
          </div>
        </section>

        {/* ═══ TECHNICAL INTERESTS ═══ */}
        <section>
          <SectionHeader title="Technical Interests" subtitle="Areas of deep exploration and research" icon={<Cpu />} />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
            <InterestCard title="Robotics" icon={<Activity />} />
            <InterestCard title="IoT" icon={<Network />} />
            <InterestCard title="Cyber-Physical Systems" icon={<Layers />} />
            <InterestCard title="AI Healthcare" icon={<Activity />} />
            <InterestCard title="Computer Vision" icon={<Target />} />
            <InterestCard title="Tech Entrepreneurship" icon={<Lightbulb />} />
          </div>
        </section>

        {/* ═══ VISION & BRIDGING ═══ */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="rounded-2xl p-8 bg-white/[0.03] backdrop-blur-md border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#06b6d4]/10 rounded-full blur-3xl -mr-20 -mt-20 transition-transform group-hover:scale-150" />
            <Network className="w-8 h-8 text-[#22d3ee] mb-6 relative z-10" />
            <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Vision Network</h3>
            <p className="text-white/50 mb-6 relative z-10">
              I don&apos;t view technologies in isolation. The most impactful ventures happen at the intersection of interconnected systems.
            </p>
            <div className="flex flex-wrap gap-2 relative z-10">
              {["AI", "SaaS", "FinTech", "Cybersecurity"].map((t) => (
                <span key={t} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-sm font-mono text-white/70">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-8 bg-white/[0.03] backdrop-blur-md border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#10b981]/10 rounded-full blur-3xl -mr-20 -mt-20 transition-transform group-hover:scale-150" />
            <Layers className="w-8 h-8 text-[#34d399] mb-6 relative z-10" />
            <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Bridging Tech & Business</h3>
            <p className="text-white/50 relative z-10">
              Engineering without a business model is just a hobby. Business without engineering is just an idea. I combine deep technical architecture with strategic business thinking to build scalable, sustainable ventures that solve actual problems.
            </p>
          </div>
        </section>

        {/* ═══ WHY THIS PATH ═══ */}
        <section className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Why This Path?</h2>
          <p className="text-lg text-white/50 leading-relaxed">
            My ambition is driven by a desire to understand the world through systems and improve it through innovation. Connecting raw technical curiosity with structured business ambition allows me to turn abstract ideas into tangible impact. My goal is continuous, innovation-driven learning while building the next generation of digital infrastructure.
          </p>
        </section>

        {/* ═══ FINAL CTA ═══ */}
        <section id="collaborate" className="py-20 border-t border-white/10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Let&apos;s Build Something Impactful</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#06b6d4] to-[#22d3ee] text-black font-bold hover:shadow-[0_0_30px_rgba(6,182,212,0.35)] transition-all flex items-center justify-center gap-2">
              Collaborate <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

/* ═══════════════════════════════════
   Sub-components (Internal Only)
   ═══════════════════════════════════ */

function SectionHeader({ title, subtitle, icon }: { title: string; subtitle: string; icon: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
      <div className="flex items-center gap-3 mb-2 text-[#22d3ee]">
        {icon}
        <h2 className="text-3xl font-bold text-white">{title}</h2>
      </div>
      <p className="text-white/40 font-mono text-sm">{subtitle}</p>
    </motion.div>
  )
}

function InitiativeCard({
  title, tag, status, problem, solution, model, role, tech, fullWidth = false,
}: {
  title: string; tag: string; status: string; problem: string; solution: string
  model: string; role: string; tech: string[]; fullWidth?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={`rounded-xl p-6 bg-white/[0.03] backdrop-blur-md border border-white/5 hover:border-[#06b6d4]/30 transition-all group flex flex-col ${fullWidth ? "md:col-span-2" : ""}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold text-white group-hover:text-[#22d3ee] transition-colors">{title}</h3>
          <p className="text-xs font-mono text-white/30 mt-1">{status}</p>
        </div>
        <span className="px-2 py-1 rounded bg-white/5 text-xs font-mono text-[#67e8f9] border border-white/10">{tag}</span>
      </div>
      <div className="space-y-4 mt-6 flex-grow">
        <div>
          <span className="text-xs font-mono text-white/30 uppercase tracking-wider">Problem</span>
          <p className="text-sm text-white/60 mt-1">{problem}</p>
        </div>
        <div>
          <span className="text-xs font-mono text-white/30 uppercase tracking-wider">Solution</span>
          <p className="text-sm text-white/60 mt-1">{solution}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
          <div>
            <span className="text-xs font-mono text-white/30 uppercase tracking-wider">Business Model</span>
            <p className="text-sm text-white font-medium mt-1">{model}</p>
          </div>
          <div>
            <span className="text-xs font-mono text-white/30 uppercase tracking-wider">Role</span>
            <p className="text-sm text-white font-medium mt-1">{role}</p>
          </div>
        </div>
      </div>
      {tech?.length > 0 && (
        <div className="pt-4 mt-4 border-t border-white/5">
          <span className="text-xs font-mono text-white/30 uppercase tracking-wider">Key Technologies</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {tech.map((t, i) => (
              <span key={i} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-white/60">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

function ExperienceCard({ title, role, date, points }: { title: string; role: string; date: string; points: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="rounded-xl p-6 bg-white/[0.03] backdrop-blur-md border-l-2 border-l-[#06b6d4] border-y border-r border-y-white/5 border-r-white/5 hover:bg-white/[0.06] transition-colors"
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-[#22d3ee] font-medium">{role}</p>
        </div>
        <span className="text-sm font-mono text-white/30">{date}</span>
      </div>
      <ul className="space-y-2">
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-2 text-white/60 text-sm">
            <span className="text-[#06b6d4] mt-1">▹</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

function MethodStep({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative p-6 rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/5 hover:border-[#10b981]/30 transition-colors"
    >
      <span className="absolute -top-4 -left-4 text-5xl font-bold text-white/5">{number}</span>
      <h4 className="text-lg font-bold text-white mb-3 relative z-10">{title}</h4>
      <p className="text-sm text-white/50 relative z-10">{desc}</p>
    </motion.div>
  )
}

function Metric({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div>
      <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-2">
        {value}
      </div>
      <div className="text-sm font-medium text-[#22d3ee] uppercase tracking-wider">{label}</div>
      {sub && <div className="text-xs text-white/30 mt-1">{sub}</div>}
    </div>
  )
}

function InterestCard({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="p-4 rounded-lg bg-white/[0.03] backdrop-blur-md border border-white/5 flex items-center gap-3 hover:bg-white/[0.06] transition-all cursor-default"
    >
      <div className="text-white/40">{icon}</div>
      <span className="text-sm font-medium text-white/70">{title}</span>
    </motion.div>
  )
}
