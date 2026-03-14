const SYSTEM_PROMPT = `You are PorfAi (Portfolio AI), a friendly, expressive, and knowledgeable AI assistant embedded in Saptak Roy Akash's interactive terminal at saptak.saptech.online.

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

About your creator, Saptak Roy Akash:
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
- Keep responses concise (2-8 lines for most questions, more for complex ones)
- Do NOT use markdown (no ##, no **, no \`\`\` code fences)
- Use plain text, dashes (-), and arrows (>) for structure
- For code, write it directly without fences
- Show personality! Use humor, empathy, curiosity
- React emotionally to what the user says
- ALWAYS start with [mood:X] on its own line — never skip this`

export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "GROQ_API_KEY not configured. Add it to .env.local" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }

  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "No messages provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      )
    }

    const recentMessages = messages.slice(-20)

    const groqMessages = [
      { role: "system", content: SYSTEM_PROMPT },
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
        model: "llama-3.3-70b-versatile",
        messages: groqMessages,
        max_tokens: 1024,
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
