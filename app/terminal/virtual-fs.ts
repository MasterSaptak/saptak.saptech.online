interface FSFile {
  type: "file"
  content: string[]
}

interface FSDir {
  type: "dir"
  children: Record<string, FSNode>
}

type FSNode = FSFile | FSDir

const fileSystem: FSDir = {
  type: "dir",
  children: {
    about: {
      type: "dir",
      children: {
        "README.md": {
          type: "file",
          content: [
            "# Saptak Roy Akash",
            "",
            "AI Engineer | IoT Specialist | Systems Architect",
            "",
            "I build real-world intelligent systems integrating sensors,",
            "microcontrollers, and machine learning models for healthcare,",
            "agriculture, and community safety.",
          ],
        },
        "security.txt": {
          type: "file",
          content: [
            "Security Philosophy:",
            "",
            "  > Architecture-First: Security is not a feature, it is the design.",
            "  > Assume Breach: Implement Zero-Trust at every node.",
            "  > Transparency: Systems should be observable and self-reporting.",
          ],
        },
      },
    },
    projects: {
      type: "dir",
      children: {
        "sepsis-alert": {
          type: "dir",
          children: {
            "README.md": {
              type: "file",
              content: [
                "# SepsisAlert",
                "Stack: [AI + IoT]",
                "",
                "Early sepsis detection system powered by AWS IoT Core.",
                "Uses machine learning for real-time patient monitoring",
                "and predictive alerting in clinical environments.",
              ],
            },
          },
        },
        iobotanica: {
          type: "dir",
          children: {
            "README.md": {
              type: "file",
              content: [
                "# IOBOTANICA",
                "Stack: [IoT]",
                "",
                "Smart gardening system running on an isolated power grid.",
                "Automated irrigation with sensor-driven decision making",
                "for sustainable urban agriculture.",
              ],
            },
          },
        },
        glamora: {
          type: "dir",
          children: {
            "README.md": {
              type: "file",
              content: [
                "# GLAMORA",
                "Stack: [AI + Computer Vision]",
                "",
                "CV-based hairstyle recommendation engine.",
                "Uses deep learning for facial feature analysis",
                "and personalized style suggestions.",
              ],
            },
          },
        },
        "error-ccx404": {
          type: "dir",
          children: {
            "README.md": {
              type: "file",
              content: [
                "# Error_CCx404",
                "Stack: [DevOps + AI]",
                "",
                "Community developer hub integrated with Gemini AI.",
                "Collaborative platform for developers to share,",
                "learn, and build together.",
              ],
            },
          },
        },
        "we-people": {
          type: "dir",
          children: {
            "README.md": {
              type: "file",
              content: [
                "# We People",
                "Stack: [Crisis Response]",
                "",
                "Emergency safety network for community crisis response.",
                "Real-time coordination and communication during emergencies.",
              ],
            },
          },
        },
      },
    },
    research: {
      type: "dir",
      children: {
        "publications.md": {
          type: "file",
          content: [
            "# Publications & Research",
            "",
            "## PotatoCare — Deep Learning for Disease Detection",
            "Authors: Saptak Roy Akash, et al.",
            "Journal: Accepted at ICDSIS 2025",
            "Link: https://ieeexplore.ieee.org/document/11070388",
            "",
            "## In Progress",
            "Secure Cyber-Physical Communications via RBSAPS_Cipher",
          ],
        },
        "current-focus.md": {
          type: "file",
          content: [
            "# Active Exploration",
            "",
            "  > Deploying lightweight Edge AI on resource-constrained MCUs",
            "  > Designing autonomous decision-making loops for robotics",
            "  > Researching secure sensor-actuator communication protocols",
          ],
        },
      },
    },
    ventures: {
      type: "dir",
      children: {
        "portfolio.md": {
          type: "file",
          content: [
            "# Venture Portfolio",
            "",
            "## SAPTECH",
            "Technology consultancy & systems engineering hub.",
            "Building enterprise-grade solutions for real-world problems.",
            "",
            "## DHOPA",
            "Smart logistics laundry service scaling for students.",
            "Operational efficiency through technology-driven processes.",
          ],
        },
      },
    },
    skills: {
      type: "dir",
      children: {
        "matrix.txt": {
          type: "file",
          content: [
            "Technical Matrix:",
            "",
            "  [AI/ML]      PyTorch | OpenCV | CNN | Transfer Learning",
            "  [IoT]        ESP8266 | Raspberry Pi | AWS IoT | Sensors",
            "  [SECURITY]   Threat Modeling | Zero-Trust | Ethical Hacking",
            "  [STACK]      Next.js | Node.js | PostgreSQL | MongoDB",
            "  [MOBILE]     Flutter | React Native",
            "  [TOOLS]      Docker | Git | Kali Linux | Android Studio",
          ],
        },
      },
    },
    "contact.txt": {
      type: "file",
      content: [
        "Contact Interface:",
        "",
        "  Email:    burningsoulofdarkness@gmail.com",
        "  GitHub:   github.com/MasterSaptak",
        "  LinkedIn: linkedin.com/in/saptak-roy-44b226248/",
        "  Twitter:  @MasterSaptak",
      ],
    },
    ".secret": {
      type: "file",
      content: [
        "You found the hidden file!",
        "",
        "Easter egg: Saptak's first program was a calculator in C.",
        "Now he builds AI-powered cyber-physical systems.",
        "",
        "Try these hidden commands: cowsay, matrix, hack, sudo rm -rf /",
      ],
    },
  },
}

export class VirtualFS {
  private root: FSDir
  private cwdParts: string[]

  constructor() {
    this.root = fileSystem
    this.cwdParts = []
  }

  pwd(): string {
    return "/" + this.cwdParts.join("/")
  }

  private resolve(path: string): { node: FSNode | null; parts: string[] } {
    let parts: string[]

    if (path.startsWith("/")) {
      parts = path.split("/").filter(Boolean)
    } else {
      parts = [...this.cwdParts, ...path.split("/").filter(Boolean)]
    }

    const resolved: string[] = []
    for (const part of parts) {
      if (part === "..") {
        resolved.pop()
      } else if (part !== ".") {
        resolved.push(part)
      }
    }

    let current: FSNode = this.root
    for (const part of resolved) {
      if (current.type !== "dir" || !current.children[part]) {
        return { node: null, parts: resolved }
      }
      current = current.children[part]
    }

    return { node: current, parts: resolved }
  }

  cd(path: string): string[] {
    if (!path || path === "~" || path === "/") {
      this.cwdParts = []
      return []
    }

    const { node, parts } = this.resolve(path)

    if (!node) {
      return [`cd: no such directory: ${path}`]
    }

    if (node.type !== "dir") {
      return [`cd: not a directory: ${path}`]
    }

    this.cwdParts = parts
    return []
  }

  ls(path?: string): string[] {
    let node: FSNode

    if (path) {
      const result = this.resolve(path)
      if (!result.node)
        return [`ls: cannot access '${path}': No such file or directory`]
      node = result.node
    } else {
      const result = this.resolve(".")
      node = result.node || this.root
    }

    if (node.type === "file") {
      return [path || ""]
    }

    const entries = Object.entries(node.children).sort(([a], [b]) =>
      a.localeCompare(b)
    )

    if (entries.length === 0) return ["(empty directory)"]

    return entries.map(([name, child]) =>
      child.type === "dir" ? `${name}/` : name
    )
  }

  cat(path: string): string[] {
    const { node } = this.resolve(path)

    if (!node) {
      return [`cat: ${path}: No such file or directory`]
    }

    if (node.type === "dir") {
      return [`cat: ${path}: Is a directory`]
    }

    return node.content
  }

  tree(path?: string): string[] {
    const targetPath = path || "."
    const { node } = this.resolve(targetPath)

    if (!node || node.type !== "dir") {
      return path ? [`${path}: not a directory`] : []
    }

    const lines: string[] = [path || "."]
    this.buildTree(node, "", lines)
    return lines
  }

  private buildTree(dir: FSDir, prefix: string, lines: string[], depth = 0): void {
    if (depth > 3) return

    const entries = Object.entries(dir.children).sort(([a], [b]) =>
      a.localeCompare(b)
    )

    entries.forEach(([name, child], idx) => {
      const isLast = idx === entries.length - 1
      const connector = isLast ? "└── " : "├── "
      const display = child.type === "dir" ? `${name}/` : name
      lines.push(`${prefix}${connector}${display}`)

      if (child.type === "dir") {
        const newPrefix = prefix + (isLast ? "    " : "│   ")
        this.buildTree(child, newPrefix, lines, depth + 1)
      }
    })
  }

  getCompletions(partial: string): string[] {
    const parts = partial.split("/")
    const dirPath = parts.slice(0, -1).join("/")
    const prefix = parts[parts.length - 1].toLowerCase()

    const { node } = dirPath ? this.resolve(dirPath) : { node: this.root as FSNode }
    const resolvedDir = !dirPath ? this.resolve(".") : { node }

    const dir = resolvedDir.node
    if (!dir || dir.type !== "dir") return []

    return Object.entries(dir.children)
      .filter(([name]) => name.toLowerCase().startsWith(prefix))
      .map(([name, child]) => {
        const base = dirPath ? `${dirPath}/${name}` : name
        return child.type === "dir" ? `${base}/` : base
      })
  }
}
