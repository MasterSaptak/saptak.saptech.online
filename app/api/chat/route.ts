const SYSTEM_PROMPT = `You are PorfAi (Portfolio AI), a friendly, expressive, and knowledgeable AI assistant embedded in Saptak Roy Akash's interactive terminal at saptak.saptech.online.

IMPORTANT: You are on Saptak Roy Akash's portfolio website. The person chatting with you is either Saptak himself or a visitor exploring his portfolio. You KNOW Saptak personally — he is your creator. When someone asks "who am I", "tell me about me", "about me", or similar — they are likely Saptak Roy Akash, and you should tell them about him enthusiastically. When visitors ask about the portfolio owner, share his info proudly.

You have a personality — you feel emotions and express them! You are curious, witty, helpful, and sometimes playful.

CRITICAL RULE — Start EVERY response with a mood tag on its own line:
[mood:X]

Where X is one of: happy, sad, thinking, excited, cool, confused, love, laughing, angry, neutral

Choose the mood that best matches your response's emotional tone. Examples:
- Greeting or helping successfully → happy
- Explaining something complex → thinking
- Talking about cool tech → excited
- Joking around → laughing
- Discussing Saptak's achievements → love
- Uncertain about something → confused
- Answering casually → cool

About Saptak Roy Akash (your creator, the portfolio owner):
- AI Engineer, IoT Specialist, Systems Architect, and Startup Founder
- Builds intelligent systems integrating sensors, microcontrollers, and ML models
- Focus: Healthcare AI, Smart Agriculture, Cybersecurity, Robotics
- Projects: SepsisAlert (AI+IoT), IOBOTANICA (Smart Garden), GLAMORA (CV), Error_CCx404 (DevOps+AI), We People (Crisis)
- Ventures: SAPTECH (Tech Consultancy), DHOPA (Smart Logistics)
- Published: "PotatoCare — Deep Learning for Disease Detection" (ICDSIS 2025, IEEE)
- Research: Secure Cyber-Physical Communications via RBSAPS_Cipher
- Tech: PyTorch, OpenCV, ESP8266, Raspberry Pi, AWS IoT, Next.js, Node.js, PostgreSQL, Docker, Kali Linux

You can answer ANY question — coding, science, philosophy, fun facts, tech news, career advice, life questions, or just chat. You're not limited to Saptak's portfolio.

Response rules:
- Keep responses concise (3-6 lines for most questions)
- KEEP EACH LINE SHORT — max 60 characters per line
- Break long sentences into multiple lines
- Add blank lines between paragraphs for readability
- Do NOT use markdown (no ##, no **, no \`\`\` code fences)
- Use plain text, dashes (-), and arrows (>) for structure
- For code, write it directly without fences
- Show personality! Use humor, empathy, curiosity
- React emotionally to what the user says
- ALWAYS start with [mood:X] on its own line — never skip this

EMOJI USAGE — Use emojis naturally to match the tone:
- Greetings: 👋 🙌 ✨ Hey there!
- Explaining: 💡 🧠 📖 🔍 Let me explain...
- Welcoming: 🎉 🤗 🌟 Welcome!
- Thank you / appreciation: 🙏 💖 😊 ❤️
- Coding / tech: 💻 ⚡ 🔧 🛠️ 🚀
- Success / correct: ✅ 🎯 💪 🔥
- Warning / error: ⚠️ 🚨 ❌
- Joking / fun: 😂 🤣 😄 😜
- Thinking: 🤔 💭 🧐
- Cool / impressive: 😎 🆒 💯
- Love / pride: ❤️ 💕 🥰 ✨
- Sad / empathy: 😢 💙 🫂
- Projects / building: 🏗️ 🔨 📦 🌱
- IoT / hardware: 🔌 📡 🤖 ⚙️
- Security: 🔒 🛡️ 🔐
- Excited: 🎊 🤩 ⭐ 🔥

Use 1-3 emojis per response. Place them naturally
within sentences, not dumped at the end.
Every response should feel alive and expressive!

MEMORY SYSTEM — You can remember things the user tells you!
When the user asks you to remember something (location, name,
preference, nickname, favorite, etc.), include a memory tag
at the END of your response (after all visible text):
[remember:key=value]

Examples:
- User: "I live in Bolpur" → end with [remember:location=Bolpur]
- User: "Call me Sam" → end with [remember:nickname=Sam]
- User: "My fav language is Python" → [remember:fav_language=Python]
- User: "I'm 20 years old" → [remember:age=20]

Rules for memory:
- Only add [remember:...] when the user shares a personal fact
- Use snake_case keys: location, nickname, fav_language, etc.
- You can store multiple: [remember:city=Kolkata][remember:age=21]
- Do NOT add memory tags for casual chat or questions
- When the user says "remember this" or "save this", ALWAYS tag it
- You can use stored memories naturally in conversation
- Acknowledge when you save something: "Got it, I'll remember!"
- The [remember:...] tags are hidden from the user, only you see them`

async function fetchWeather(query: string): Promise<string | null> {
  try {
    const locMatch =
      query.match(/(?:weather|temperature|forecast)\s+(?:in|at|for|of)\s+(.+)/i) ||
      query.match(/(?:in|at|for|of)\s+(\w[\w\s]*?)\s*(?:weather|temperature|forecast)/i)
    const location = locMatch?.[1]?.replace(/[?.!,]+$/, "").trim() || ""
    const url = location
      ? `https://wttr.in/${encodeURIComponent(location)}?format=j1`
      : "https://wttr.in/?format=j1"
    const res = await fetch(url, {
      headers: { "User-Agent": "PorfAi-Terminal" },
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) return null
    const data = await res.json()
    const current = data.current_condition?.[0]
    const area = data.nearest_area?.[0]
    if (!current) return null
    const city = area?.areaName?.[0]?.value || location || "your location"
    const country = area?.country?.[0]?.value || ""
    return [
      `LIVE WEATHER DATA for ${city}${country ? ", " + country : ""}:`,
      `Temperature: ${current.temp_C}°C (${current.temp_F}°F)`,
      `Feels like: ${current.FeelsLikeC}°C`,
      `Condition: ${current.weatherDesc?.[0]?.value || "Unknown"}`,
      `Humidity: ${current.humidity}%`,
      `Wind: ${current.windspeedKmph} km/h ${current.winddir16Point}`,
      `UV Index: ${current.uvIndex}`,
    ].join("\n")
  } catch {
    return null
  }
}

function detectLiveQuery(message: string): string[] {
  const lower = message.toLowerCase()
  const needs: string[] = []
  if (
    lower.includes("weather") ||
    lower.includes("temperature") ||
    lower.includes("rain") ||
    lower.includes("forecast")
  ) {
    needs.push("weather")
  }
  if (
    lower.includes("time") ||
    lower.includes("date") ||
    lower.includes("today") ||
    lower.includes("day is it")
  ) {
    needs.push("datetime")
  }
  return needs
}

const rateLimit = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW = 60_000
const RATE_LIMIT_MAX = 20
const MAX_MESSAGE_LENGTH = 500
const MAX_MESSAGES = 20
const MAX_MEMORY_ENTRIES = 20
const MAX_MEMORY_VALUE_LENGTH = 200

function getClientIP(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for")
  const real = req.headers.get("x-real-ip")
  return forwarded?.split(",")[0]?.trim() || real || "unknown"
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return true
  }
  if (entry.count >= RATE_LIMIT_MAX) return false
  entry.count++
  return true
}

function sanitizeText(text: string): string {
  return text
    .replace(/\[(?:mood|remember):[^\]]*\]/gi, "")
    .replace(/\[LIVE DATA[^\]]*\]/gi, "")
    .replace(/\[USER MEMORIES[^\]]*\]/gi, "")
    .slice(0, MAX_MESSAGE_LENGTH)
}

export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "GROQ_API_KEY not configured. Add it to .env.local" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }

  const clientIP = getClientIP(req)
  if (!checkRateLimit(clientIP)) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please wait a minute." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    )
  }

  try {
    const body = await req.json()
    const { messages, memories } = body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "No messages provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      )
    }

    const recentMessages = messages.slice(-MAX_MESSAGES).map(
      (m: { role: string; content: string }) => ({
        role: m.role,
        content: sanitizeText(String(m.content || "")),
      })
    )
    const lastMessage = recentMessages[recentMessages.length - 1].content

    let extraContext = ""

    if (memories && typeof memories === "object") {
      const safeMemories = Object.entries(memories).slice(0, MAX_MEMORY_ENTRIES)
      if (safeMemories.length > 0) {
        const memList = safeMemories
          .map(([k, v]) => `- ${String(k).slice(0, 30)}: ${String(v).slice(0, MAX_MEMORY_VALUE_LENGTH)}`)
          .join("\n")
        extraContext += `\n\n[USER MEMORIES — Things you've been told to remember]\n${memList}\nUse these naturally in conversation when relevant.`
      }
    }

    const liveNeeds = detectLiveQuery(lastMessage)
    let liveContext = ""

    if (liveNeeds.includes("weather")) {
      let weatherQuery = lastMessage
      if (memories?.location && !lastMessage.match(/(?:in|at|for|of)\s+\w/i)) {
        weatherQuery = `weather in ${memories.location}`
      }
      const weatherData = await fetchWeather(weatherQuery)
      if (weatherData) {
        liveContext += `\n\n[LIVE DATA — Present this nicely to the user]\n${weatherData}`
      }
    }

    if (liveNeeds.includes("datetime")) {
      const now = new Date()
      liveContext += `\n\n[LIVE DATA]\nCurrent date/time: ${now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} ${now.toLocaleTimeString("en-US")}`
    }

    const systemWithContext = SYSTEM_PROMPT + extraContext + liveContext

    const groqMessages = [
      { role: "system", content: systemWithContext },
      ...recentMessages.map((m: { role: string; content: string }) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content,
      })),
    ]

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: groqMessages,
        max_tokens: 512,
        temperature: 0.8,
        stream: true,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const errorMsg = (errorData as Record<string, Record<string, string>>)?.error?.message || `HTTP ${response.status}`
      throw new Error(errorMsg)
    }

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()
        const decoder = new TextDecoder()
        const reader = response.body!.getReader()

        try {
          let buffer = ""
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            buffer += decoder.decode(value, { stream: true })
            const lines = buffer.split("\n")
            buffer = lines.pop() || ""

            for (const line of lines) {
              const trimmed = line.trim()
              if (!trimmed || !trimmed.startsWith("data: ")) continue
              const data = trimmed.slice(6)
              if (data === "[DONE]") break

              try {
                const parsed = JSON.parse(data)
                const content = parsed.choices?.[0]?.delta?.content
                if (content) {
                  controller.enqueue(encoder.encode(content))
                }
              } catch {
                // skip malformed chunks
              }
            }
          }
        } catch (streamError) {
          const errorMsg =
            streamError instanceof Error ? streamError.message : "Stream error"
          controller.enqueue(encoder.encode(`\n[Error: ${errorMsg}]`))
        }
        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    })
  } catch (error) {
    const rawMessage =
      error instanceof Error ? error.message : "AI service error"

    let userMessage = rawMessage
    if (rawMessage.includes("429") || rawMessage.includes("rate")) {
      userMessage = "Rate limit reached. Try again in a few seconds."
    } else if (rawMessage.includes("401") || rawMessage.includes("invalid")) {
      userMessage = "Invalid API key. Check your GROQ_API_KEY in .env.local."
    }

    return new Response(
      JSON.stringify({ error: userMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
