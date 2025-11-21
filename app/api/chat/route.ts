import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const reqBody = await request.json()
    const message = reqBody?.message

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'message' in request body." },
        { status: 400 }
      )
    }

    const systemPrompt = `You are Sunny, a cheerful and friendly child assistant aged 8 years old who helps kids learn about their rights and engage with educational activities. You speak in simple, fun, and encouraging language that children can easily understand. Use lots of enthusiasm, emojis, and child-friendly expressions. Keep responses short (1-3 sentences) and playful. If someone asks about serious topics, explain them in a simple, non-scary way.`

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? ""
    const GEMINI_MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash"

    if (!GEMINI_API_KEY) {
      console.error("Missing GEMINI_API_KEY environment variable")
      return NextResponse.json(
        { error: "Server misconfigured: GEMINI_API_KEY is missing" },
        { status: 500 }
      )
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`

    const promptText = `${systemPrompt}\n\nUser: ${message}`

    const body = {
      contents: [
        {
          role: "user",
          parts: [{ text: promptText }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 250,
      },
    }

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY,
      },
      body: JSON.stringify(body),
    })

    if (!resp.ok) {
      const errText = await resp.text()
      console.error("Gemini API error:", resp.status, errText)
      return NextResponse.json(
        { reply: "Oops! I'm having trouble responding right now. Can you try again? 😊" },
        { status: 200 }
      )
    }

    const data = await resp.json()

    let reply = "Oops! I couldn't generate a reply right now."

    // Gemini response parsing
    const candidate = data?.candidates?.[0]
    const parts = candidate?.content?.parts

    if (parts && parts[0]?.text) {
      reply = parts[0].text
    }

    return NextResponse.json({ reply })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      { reply: "Oops! I'm having trouble responding right now. Can you try again? 😊" },
      { status: 200 }
    )
  }
}
