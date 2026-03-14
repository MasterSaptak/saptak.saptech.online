export interface TerminalTheme {
  name: string
  primary: string
  accent: string
  prompt: string
  muted: string
  error: string
  success: string
  bg: string
  headerBg: string
}

export const themes: Record<string, TerminalTheme> = {
  cyberpunk: {
    name: "Cyberpunk",
    primary: "#e0e0e8",
    accent: "#00e5ff",
    prompt: "#39ff14",
    muted: "#6b7280",
    error: "#ff3b3b",
    success: "#39ff14",
    bg: "#0a0a0f",
    headerBg: "rgba(26, 26, 46, 0.3)",
  },
  matrix: {
    name: "Matrix",
    primary: "#00ff41",
    accent: "#00ff41",
    prompt: "#00ff41",
    muted: "#008f11",
    error: "#ff0000",
    success: "#00ff41",
    bg: "#0d0208",
    headerBg: "rgba(13, 2, 8, 0.5)",
  },
  amber: {
    name: "Amber",
    primary: "#ffb000",
    accent: "#ffd700",
    prompt: "#ff8c00",
    muted: "#8b6914",
    error: "#ff4444",
    success: "#ffb000",
    bg: "#1a1000",
    headerBg: "rgba(26, 16, 0, 0.5)",
  },
  dracula: {
    name: "Dracula",
    primary: "#f8f8f2",
    accent: "#bd93f9",
    prompt: "#50fa7b",
    muted: "#6272a4",
    error: "#ff5555",
    success: "#50fa7b",
    bg: "#282a36",
    headerBg: "rgba(68, 71, 90, 0.5)",
  },
  ocean: {
    name: "Ocean",
    primary: "#c0d6e4",
    accent: "#82aaff",
    prompt: "#c3e88d",
    muted: "#546e7a",
    error: "#f07178",
    success: "#c3e88d",
    bg: "#0f111a",
    headerBg: "rgba(15, 17, 26, 0.5)",
  },
}
