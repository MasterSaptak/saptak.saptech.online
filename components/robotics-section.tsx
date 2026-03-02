"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Cpu, Cloud, Wifi, Radio, Brain, Server, X, Shield, AlertTriangle, CheckCircle } from "lucide-react"

const pipelineSteps = [
  {
    icon: Wifi,
    label: "Sensors",
    desc: "Data acquisition from physical world",
    protocols: ["MQTT", "CoAP", "I2C", "SPI"],
    security: "Hardware-level tamper detection, encrypted sensor payloads, device attestation via TPM",
    scalability: "Mesh networking for distributed sensor arrays, auto-discovery via mDNS",
  },
  {
    icon: Radio,
    label: "Microcontroller",
    desc: "Edge processing and filtering",
    protocols: ["UART", "GPIO", "PWM", "BLE"],
    security: "Secure boot chain, firmware signing, OTA updates with rollback protection",
    scalability: "Modular firmware architecture, supports multiple MCU families",
  },
  {
    icon: Cloud,
    label: "Cloud",
    desc: "Centralized analytics pipeline",
    protocols: ["HTTPS/TLS 1.3", "WebSocket", "gRPC"],
    security: "mTLS for service-to-service auth, certificate pinning, rate limiting, WAF",
    scalability: "Auto-scaling containers, event-driven serverless functions, CDN edge caching",
  },
  {
    icon: Brain,
    label: "AI Engine",
    desc: "Intelligent decision making",
    protocols: ["REST API", "Batch Processing", "Stream API"],
    security: "Model input validation, adversarial attack detection, sandboxed inference",
    scalability: "GPU-backed inference with queue management, model versioning and A/B testing",
  },
  {
    icon: Cpu,
    label: "Actuator",
    desc: "Physical world response",
    protocols: ["CAN Bus", "Modbus", "PWM", "Servo"],
    security: "Command validation and bounds checking, emergency stop protocols, watchdog timers",
    scalability: "Redundant actuator paths, graceful degradation on partial failure",
  },
  {
    icon: Server,
    label: "Dashboard",
    desc: "Monitoring and control",
    protocols: ["WebSocket", "SSE", "GraphQL"],
    security: "RBAC access control, audit logging, session management with MFA support",
    scalability: "Real-time data streaming, optimistic UI updates, offline-first architecture",
  },
]

const telemetryValues = [
  { label: "Temperature", unit: "C", base: 24.3, variance: 2 },
  { label: "Humidity", unit: "%", base: 62, variance: 5 },
  { label: "Soil pH", unit: "", base: 6.8, variance: 0.3 },
  { label: "Light", unit: "lux", base: 1420, variance: 200 },
]

const eventLogEntries = [
  { time: "14:32:01", msg: "Device sensor-node-04 connected", type: "info" },
  { time: "14:32:02", msg: "TLS certificate validated", type: "success" },
  { time: "14:32:03", msg: "MQTT handshake established", type: "success" },
  { time: "14:32:05", msg: "Telemetry stream initialized", type: "info" },
  { time: "14:32:08", msg: "Anomaly detection model loaded", type: "info" },
  { time: "14:32:10", msg: "Sensor calibration verified", type: "success" },
  { time: "14:32:12", msg: "Data pipeline nominal", type: "success" },
  { time: "14:32:15", msg: "Edge node firmware v3.2.1 confirmed", type: "info" },
  { time: "14:32:18", msg: "Cloud sync interval: 5s", type: "info" },
  { time: "14:32:20", msg: "Dashboard WebSocket opened", type: "success" },
  { time: "14:32:22", msg: "Actuator control loop active", type: "info" },
  { time: "14:32:25", msg: "System integrity: SECURE", type: "success" },
]

type ThreatPhase = "idle" | "attack" | "intercept" | "mitigated"

function ThreatSimulation() {
  const [phase, setPhase] = useState<ThreatPhase>("idle")

  const runSimulation = useCallback(() => {
    setPhase("attack")
    setTimeout(() => setPhase("intercept"), 1800)
    setTimeout(() => setPhase("mitigated"), 3600)
    setTimeout(() => setPhase("idle"), 6000)
  }, [])

  const nodes = ["Client", "API Gateway", "Auth / Firewall", "Database"]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-xl p-6 glow-border-hover hover-elevate"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-mono text-sm font-semibold text-neon-blue">
          Threat Simulation
        </h3>
        <button
          onClick={runSimulation}
          disabled={phase !== "idle"}
          className={`lab-button px-3 py-1 rounded-md text-xs font-mono transition-all ${phase === "idle"
              ? "border border-destructive/40 text-destructive hover:bg-destructive/10 cursor-pointer"
              : "border border-border text-muted-foreground cursor-not-allowed"
            }`}
        >
          {phase === "idle" ? "Simulate Attack" : phase === "attack" ? "Attacking..." : phase === "intercept" ? "Intercepting..." : "Mitigated"}
        </button>
      </div>

      {/* Node chain */}
      <div className="flex items-center gap-0">
        {nodes.map((node, i) => (
          <div key={node} className="flex items-center">
            <div
              className={`px-3 py-2 rounded-lg border text-xs font-mono transition-all duration-300 ${phase === "attack" && i === 0
                  ? "border-destructive/60 bg-destructive/10 text-destructive threat-active"
                  : phase === "attack" && i === 1
                    ? "border-destructive/40 bg-destructive/5 text-destructive/70"
                    : phase === "intercept" && i === 2
                      ? "border-neon-blue/60 bg-neon-blue/10 text-neon-blue glow-blue"
                      : phase === "mitigated"
                        ? "border-neon-green/40 bg-neon-green/5 text-neon-green"
                        : "border-border bg-secondary/30 text-muted-foreground"
                }`}
            >
              {node}
            </div>
            {i < nodes.length - 1 && (
              <div className="relative w-6 h-px mx-0.5">
                <div className="absolute inset-0 bg-border" />
                {phase === "attack" && i < 2 && (
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-destructive"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.5, delay: i * 0.3 }}
                  />
                )}
                {phase === "intercept" && i === 1 && (
                  <div className="absolute inset-0 bg-neon-blue/60" />
                )}
                {phase === "mitigated" && (
                  <div className="absolute inset-0 bg-neon-green/40" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Status */}
      <div className="mt-4 flex items-center gap-2">
        {phase === "idle" && (
          <>
            <CheckCircle className="w-3.5 h-3.5 text-neon-green" />
            <span className="text-xs font-mono text-neon-green">All systems nominal</span>
          </>
        )}
        {phase === "attack" && (
          <>
            <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
            <span className="text-xs font-mono text-destructive">Under Attack -- Unauthorized request detected</span>
          </>
        )}
        {phase === "intercept" && (
          <>
            <Shield className="w-3.5 h-3.5 text-neon-blue" />
            <span className="text-xs font-mono text-neon-blue">Firewall interception active</span>
          </>
        )}
        {phase === "mitigated" && (
          <>
            <CheckCircle className="w-3.5 h-3.5 text-neon-green" />
            <span className="text-xs font-mono text-neon-green">Threat Mitigated -- System secured</span>
          </>
        )}
      </div>
    </motion.div>
  )
}

function TelemetryDashboard() {
  const [values, setValues] = useState(
    telemetryValues.map((t) => t.base)
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setValues((prev) =>
        prev.map((v, i) => {
          const t = telemetryValues[i]
          const delta = (Math.random() - 0.5) * t.variance
          return Math.round((v + delta) * 10) / 10
        })
      )
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-xl p-6 glow-border-hover hover-elevate"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-mono text-sm font-semibold text-neon-green">
          IoT Telemetry
        </h3>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-neon-green pulse-glow" />
          <span className="text-xs font-mono text-neon-green">SECURE</span>
        </div>
      </div>

      {/* Telemetry grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {telemetryValues.map((t, i) => (
          <div key={t.label} className="bg-secondary/40 rounded-lg p-3 border border-border">
            <span className="text-xs text-muted-foreground block mb-1">{t.label}</span>
            <span className="font-mono text-lg text-foreground telemetry-value">
              {values[i]}
              {t.unit && <span className="text-xs text-muted-foreground ml-1">{t.unit}</span>}
            </span>
          </div>
        ))}
      </div>

      {/* Event Log */}
      <div className="border-t border-border pt-4">
        <span className="text-xs font-mono text-muted-foreground block mb-2">Event Log</span>
        <div className="h-28 overflow-hidden relative">
          <div className="scroll-log">
            {[...eventLogEntries, ...eventLogEntries].map((entry, i) => (
              <div key={i} className="flex items-start gap-2 py-0.5">
                <span className="text-xs font-mono text-muted-foreground shrink-0 w-16">
                  {entry.time}
                </span>
                <span
                  className={`text-xs font-mono ${entry.type === "success" ? "text-neon-green" : "text-foreground/70"
                    }`}
                >
                  {entry.msg}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-card to-transparent pointer-events-none" />
        </div>
      </div>
    </motion.div>
  )
}

function NodeDetailPanel({
  node,
  onClose,
}: {
  node: (typeof pipelineSteps)[0]
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="glass-card rounded-xl p-6 border border-neon-blue/20 glow-blue"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center">
            <node.icon className="w-5 h-5 text-neon-blue" />
          </div>
          <div>
            <h3 className="font-mono text-sm font-bold text-neon-blue">{node.label}</h3>
            <p className="text-xs text-muted-foreground">{node.desc}</p>
          </div>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Close panel">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <span className="text-xs font-mono text-neon-blue/70 uppercase tracking-wider block mb-2">Protocols</span>
          <div className="flex flex-wrap gap-1.5">
            {node.protocols.map((p) => (
              <span key={p} className="px-2 py-0.5 text-xs font-mono rounded border border-border bg-secondary/40 text-foreground/80">
                {p}
              </span>
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs font-mono text-neon-blue/70 uppercase tracking-wider block mb-2">Security Controls</span>
          <p className="text-xs text-muted-foreground leading-relaxed">{node.security}</p>
        </div>

        <div>
          <span className="text-xs font-mono text-neon-blue/70 uppercase tracking-wider block mb-2">Scalability</span>
          <p className="text-xs text-muted-foreground leading-relaxed">{node.scalability}</p>
        </div>
      </div>
    </motion.div>
  )
}

const archStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const archItem = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export function RoboticsSection() {
  const [selectedNode, setSelectedNode] = useState<number | null>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const isHeadingInView = useInView(headingRef, { once: true })

  return (
    <section id="robotics" className="relative py-24 lg:py-32">
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
            {"// Robotics & IoT"}
          </span>
          <h2
            className={`text-3xl lg:text-4xl font-bold text-foreground text-balance transition-all duration-1000 ${isHeadingInView ? "heading-glow" : ""
              }`}
          >
            IoT Systems Architecture
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl leading-relaxed">
            Building end-to-end IoT pipelines from sensor data acquisition
            through cloud analytics to real-world actuation. Click any node to inspect.
          </p>
        </motion.div>

        {/* Pipeline Visualization with clickable nodes */}
        <div className="relative mb-10">
          {/* Connection line with data pulse */}
          <div className="hidden lg:block absolute top-1/2 left-[8%] right-[8%] h-px bg-border -translate-y-1/2" aria-hidden="true">
            <motion.div
              className="h-full bg-neon-blue/40"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3 }}
              style={{ transformOrigin: "left" }}
            />
            {/* Animated data packets */}
            <div className="absolute inset-y-0 w-full overflow-hidden">
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-8 h-0.5 bg-neon-blue rounded-full"
                style={{ boxShadow: "0 0 8px rgba(0,229,255,0.6)" }}
                animate={{ x: ["-10%", "110%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
              />
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-5 h-0.5 bg-neon-green/60 rounded-full"
                style={{ boxShadow: "0 0 6px rgba(57,255,20,0.4)" }}
                animate={{ x: ["-10%", "110%"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 2.5, delay: 2 }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {pipelineSteps.map((step, i) => (
              <motion.button
                key={step.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                onClick={() => setSelectedNode(selectedNode === i ? null : i)}
                className={`relative flex flex-col items-center text-center cursor-pointer group ${selectedNode === i ? "scale-105" : ""
                  } transition-transform`}
              >
                <div
                  className={`w-16 h-16 rounded-xl border flex items-center justify-center mb-3 relative z-10 transition-all duration-300 node-pulse ${selectedNode === i
                      ? "bg-neon-blue/15 border-neon-blue/50 glow-blue"
                      : "bg-secondary border-border group-hover:border-neon-blue/40 group-hover:bg-neon-blue/5"
                    }`}
                >
                  <step.icon className="w-7 h-7 text-neon-blue" />
                </div>
                <span className="font-mono text-sm font-semibold text-foreground mb-1">
                  {step.label}
                </span>
                <span className="text-xs text-muted-foreground leading-relaxed">
                  {step.desc}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Expandable node detail */}
        <AnimatePresence>
          {selectedNode !== null && (
            <div className="mb-10">
              <NodeDetailPanel
                node={pipelineSteps[selectedNode]}
                onClose={() => setSelectedNode(null)}
              />
            </div>
          )}
        </AnimatePresence>

        {/* Telemetry + Threat Sim row */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <TelemetryDashboard />
          <ThreatSimulation />
        </div>

        {/* Architecture details with staggered reveal */}
        <motion.div
          variants={archStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            {
              title: "Data Pipeline",
              content:
                "Multi-sensor data fusion with real-time streaming. Noise filtering at the edge to minimize bandwidth, with cloud aggregation for historical analysis and pattern recognition.",
            },
            {
              title: "Automation Logic",
              content:
                "Event-driven architecture with configurable rule engines. Sensors trigger automated responses through microcontrollers, with AI-powered anomaly detection for complex decision trees.",
            },
            {
              title: "Edge vs Cloud",
              content:
                "Latency-critical decisions execute on edge devices. Complex ML inference and long-term analytics run in the cloud. Hybrid approach ensures reliability during connectivity gaps.",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={archItem}
              className="glass-card rounded-xl p-6 glow-border-hover hover-elevate"
            >
              <h4 className="font-mono text-sm font-semibold text-neon-blue mb-3">{item.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.content}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
