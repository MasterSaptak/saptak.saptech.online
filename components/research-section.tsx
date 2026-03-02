"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { BookOpen, Database, FlaskConical, BarChart3 } from "lucide-react"

const pipelineStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const pipelineItem = {
  hidden: { opacity: 0, y: 25, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const badgeStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const badgeItem = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
}

export function ResearchSection() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isHeadingInView = useInView(headingRef, { once: true })

  return (
    <section id="research" className="relative py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-neon-green tracking-widest uppercase mb-3 block">
            {"// Research & Publication"}
          </span>
          <h2
            className={`text-3xl lg:text-4xl font-bold text-foreground text-balance transition-all duration-1000 ${isHeadingInView ? "heading-glow" : ""
              }`}
          >
            Applied Research
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl leading-relaxed">
            Research grounded in real-world application. From deep learning for agriculture
            to novel cryptographic methods.
          </p>
        </motion.div>

        {/* Featured Paper */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-xl p-8 lg:p-10 mb-12 relative overflow-hidden glow-border-hover"
        >
          {/* Accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/50 to-transparent" />

          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-neon-green/10 border border-neon-green/20 flex items-center justify-center shrink-0 node-pulse">
              <BookOpen className="w-6 h-6 text-neon-green" />
            </div>
            <div>
              <span className="text-xs font-mono text-neon-green tracking-wider uppercase block mb-1">
                Accepted at ICDSIS 2025
              </span>
              <h3 className="text-xl lg:text-2xl font-bold text-foreground">
                PotatoCare &mdash; Deep Learning for Disease Detection
              </h3>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
            A deep learning-based system for early detection and classification of potato plant diseases.
            Leveraging convolutional neural networks trained on field-collected datasets to enable
            precision agriculture at scale.
          </p>

          {/* Research Pipeline with stagger */}
          <motion.div
            variants={pipelineStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid md:grid-cols-4 gap-4"
          >
            {[
              {
                icon: Database,
                title: "Dataset Collection",
                desc: "Field-collected images of potato leaves across multiple disease categories and healthy specimens.",
              },
              {
                icon: FlaskConical,
                title: "Model Architecture",
                desc: "CNN-based deep learning pipeline with transfer learning for optimized accuracy on limited data.",
              },
              {
                icon: BarChart3,
                title: "Training Workflow",
                desc: "Data augmentation, cross-validation, and hyperparameter optimization for robust model performance.",
              },
              {
                icon: BookOpen,
                title: "Publication",
                desc: "Accepted for presentation at the International Conference on Data Science and Intelligent Systems 2025.",
              },
            ].map((step) => (
              <motion.div
                key={step.title}
                variants={pipelineItem}
                className="bg-secondary/50 border border-border rounded-lg p-4 hover-elevate group"
              >
                <step.icon className="w-5 h-5 text-neon-green mb-2 group-hover:drop-shadow-[0_0_6px_rgba(57,255,20,0.4)] transition-all duration-300" />
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  {step.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Badges with stagger */}
        <motion.div
          variants={badgeStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-4 justify-center"
        >
          {[
            "Encryption Enthusiast",
            "IoT Systems Builder",
            "Founder & Operator",
            "Applied AI Researcher",
          ].map((badge) => (
            <motion.div
              key={badge}
              variants={badgeItem}
              className="px-5 py-2.5 rounded-lg border border-neon-blue/20 bg-neon-blue/5 font-mono text-sm text-neon-blue hover:border-neon-blue/40 hover:bg-neon-blue/10 hover:shadow-[0_0_15px_rgba(0,229,255,0.1)] transition-all duration-300 cursor-default"
            >
              {badge}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
