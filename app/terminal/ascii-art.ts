export const SAPTAK_BANNER = [
  "",
  "  ███████╗ █████╗ ██████╗ ████████╗ █████╗ ██╗  ██╗",
  "  ██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗██║ ██╔╝",
  "  ███████╗███████║██████╔╝   ██║   ███████║█████╔╝ ",
  "  ╚════██║██╔══██║██╔═══╝    ██║   ██╔══██║██╔═██╗ ",
  "  ███████║██║  ██║██║        ██║   ██║  ██║██║  ██╗",
  "  ╚══════╝╚═╝  ╚═╝╚═╝        ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝",
  "",
  "  Systems Architect | AI Engineer | IoT Specialist",
  "",
]

const NEOFETCH_ART = [
  "    ┌──────────────┐",
  "    │  ┏━━━━━━━━┓  │",
  "    │  ┃ S.R.A  ┃  │",
  "    │  ┗━━━━━━━━┛  │",
  "    │              │",
  "    │   ┌──────┐   │",
  "    │   │  >_  │   │",
  "    │   └──────┘   │",
  "    └──────────────┘",
  "                    ",
  "                    ",
  "                    ",
  "                    ",
  "                    ",
]

export function getNeofetchOutput(themeName: string): string[] {
  const w = typeof window !== "undefined" ? window.innerWidth : 1920
  const h = typeof window !== "undefined" ? window.innerHeight : 1080

  const info = [
    "sra@systems",
    "───────────────────────────",
    `OS: SaptakOS (Next.js 15 / React 19)`,
    `Host: saptak.saptech.online`,
    `Kernel: TypeScript 5.7`,
    `Shell: Terminal v2.0`,
    `Theme: ${themeName}`,
    `Resolution: ${w}x${h}`,
    `CPU: Neural Processing Unit`,
    `Memory: Unlimited Creativity`,
    `Uptime: Since 2003`,
    `Packages: 42+ npm modules`,
    "",
    "████ ████ ████ ████ ████ ████",
  ]

  const maxArtWidth = Math.max(...NEOFETCH_ART.map((l) => l.length))
  const lines: string[] = []
  const maxLines = Math.max(NEOFETCH_ART.length, info.length)

  for (let i = 0; i < maxLines; i++) {
    const artLine = (NEOFETCH_ART[i] || "").padEnd(maxArtWidth + 2)
    const infoLine = info[i] || ""
    lines.push(artLine + infoLine)
  }

  return lines
}

export function cowsay(text: string): string[] {
  const maxWidth = 40
  const words = text.split(" ")
  const lines: string[] = []
  let currentLine = ""

  for (const word of words) {
    if (currentLine.length + word.length + 1 > maxWidth) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = currentLine ? `${currentLine} ${word}` : word
    }
  }
  if (currentLine) lines.push(currentLine)

  const width = Math.max(...lines.map((l) => l.length))
  const border = "─".repeat(width + 2)

  const result: string[] = []
  result.push(` ┌${border}┐`)

  if (lines.length === 1) {
    result.push(` │ ${lines[0].padEnd(width)} │`)
  } else {
    lines.forEach((line, i) => {
      const padded = line.padEnd(width)
      if (i === 0) result.push(` / ${padded} \\`)
      else if (i === lines.length - 1) result.push(` \\ ${padded} /`)
      else result.push(` | ${padded} |`)
    })
  }

  result.push(` └${border}┘`)
  result.push("        \\   ^__^")
  result.push("         \\  (oo)\\_______")
  result.push("            (__)\\       )\\/\\")
  result.push("                ||----w |")
  result.push("                ||     ||")

  return result
}

export const HACK_LINES = [
  { text: "[*] Initializing exploit framework v3.7.1...", delay: 300 },
  { text: "[*] Loading modules: recon, exploit, payload", delay: 700 },
  { text: "[*] Target acquired: saptak.saptech.online", delay: 1200 },
  { text: "[*] Running port scan...", delay: 1700 },
  { text: "[+] Port 443  OPEN   [HTTPS]", delay: 2200 },
  { text: "[+] Port 22   OPEN   [SSH]", delay: 2500 },
  { text: "[+] Port 3000 OPEN   [Next.js]", delay: 2800 },
  { text: "[*] Fingerprinting services...", delay: 3300 },
  { text: "[+] Server: nginx/1.25.0", delay: 3700 },
  { text: "[+] Runtime: Node.js v20.x", delay: 3900 },
  { text: "[+] Framework: Next.js 15", delay: 4100 },
  { text: "[*] Scanning for vulnerabilities...", delay: 4600 },
  { text: "[!] CVE scan complete: 0 vulnerabilities found", delay: 5400 },
  { text: "[*] Attempting authentication bypass...", delay: 5900 },
  { text: "[!] FAILED — Multi-factor authentication detected", delay: 6500 },
  { text: "[*] Attempting SQL injection...", delay: 7000 },
  { text: "[!] FAILED — Input sanitization active", delay: 7500 },
  { text: "[*] Attempting brute force...", delay: 8000 },
  { text: "[!] BLOCKED — Rate limiting triggered", delay: 8500 },
  { text: "[!] ALERT: Intrusion Detection System activated", delay: 9000 },
  { text: "[!] ALERT: Honeypot engaged — IP logged", delay: 9500 },
  { text: "[!] CONNECTION TERMINATED BY REMOTE HOST", delay: 10000 },
  { text: "", delay: 10300 },
  { text: "Nice try. This system was built with security-first architecture.", delay: 10600 },
  { text: 'Type "security" to learn about my approach.', delay: 11000 },
]
