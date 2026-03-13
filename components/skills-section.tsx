"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Code, Database, Smartphone, BrainCircuit, Cpu, Shield, Wrench, Terminal, Activity } from "lucide-react"
import { DecryptEffect, FloatingStatus } from "./tech-animations"

const skillCategories = [
  {
    title: "Programming",
    icon: Code,
    skills: ["Python", "JavaScript", "C++", "Java", "MATLAB"],
    color: "neon-blue" as const,
  },
  {
    title: "Full-Stack Development",
    icon: Database,
    skills: ["React", "Next.js", "Node.js", "Express", "MongoDB"],
    color: "neon-green" as const,
  },
  {
    title: "Mobile Development",
    icon: Smartphone,
    skills: ["Flutter"],
    color: "neon-blue" as const,
  },
  {
    title: "AI & Computer Vision",
    icon: BrainCircuit,
    skills: ["PyTorch", "OpenCV", "Deep Learning Models", "CNNs"],
    color: "neon-green" as const,
  },
  {
    title: "Embedded Systems & IoT",
    icon: Cpu,
    skills: ["ESP8266 NodeMCU", "Raspberry Pi", "Sensor Integration", "Relay Control", "IoT Data Systems"],
    color: "neon-blue" as const,
  },
  {
    title: "Cybersecurity",
    icon: Shield,
    skills: ["Kali Linux", "Network Security", "Ethical Hacking"],
    color: "neon-green" as const,
  },
  {
    title: "Tools & Cloud",
    icon: Wrench,
    skills: ["Git", "Docker", "Android Studio", "Google Cloud", "AWS"],
    color: "neon-blue" as const,
  },
]

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const staggerItem = {
  hidden: { opacity: 0, scale: 0.95, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export function SkillsSection() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isHeadingInView = useInView(headingRef, { once: true })

  return (
    <section id="skills" className="relative py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-mono text-neon-blue tracking-widest uppercase mb-3 block">
            {"// Technical Arsenal"}
          </span>
          <h2
            className={`text-3xl lg:text-4xl font-bold text-foreground text-balance transition-all duration-1000 mx-auto ${isHeadingInView ? "heading-glow" : ""
              }`}
          >
            <DecryptEffect>Technical Skills Matrix</DecryptEffect>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto leading-relaxed">
            A comprehensive overview of the programming languages, frameworks, and tools used to build intelligent systems.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category) => {
            const isBlue = category.color === "neon-blue";
            return (
              <motion.div
                key={category.title}
                variants={staggerItem}
                className="glass-card rounded-xl p-6 group transition-all duration-500 hover-elevate glow-border-hover"
              >
                <div className={`flex items-center gap-3 mb-4`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${isBlue ? "bg-neon-blue/10 border border-neon-blue/20 group-hover:bg-neon-blue/20 text-neon-blue" : "bg-neon-green/10 border border-neon-green/20 group-hover:bg-neon-green/20 text-neon-green"}`}>
                    <category.icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold text-foreground">
                    <DecryptEffect>{category.title}</DecryptEffect>
                  </h3>
                </div>
                
                {/* Tech Status Tag */}
                <div className="flex justify-end mb-4">
                  <FloatingStatus 
                    label="Proficiency" 
                    value={isBlue ? "95%" : "89%"} 
                    color={isBlue ? "blue" : "green"}
                    className="opacity-60 group-hover:opacity-100"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-2.5 py-1 text-xs font-mono rounded-md border transition-all duration-300 ${isBlue
                          ? "border-neon-blue/20 bg-neon-blue/5 text-neon-blue/80 group-hover:border-neon-blue/40 group-hover:bg-neon-blue/10"
                          : "border-neon-green/20 bg-neon-green/5 text-neon-green/80 group-hover:border-neon-green/40 group-hover:bg-neon-green/10"
                        }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
