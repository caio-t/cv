import { NextRequest, NextResponse } from "next/server";
import { profile } from "@/data/profile";

function buildSystemPrompt(): string {
  const experienceText = profile.experience
    .map(
      (exp) =>
        `- ${exp.role} at ${exp.company} (${exp.period}, ${exp.duration}, ${exp.location})\n  ${exp.highlights.join("; ")}`
    )
    .join("\n");

  const educationText = profile.education
    .map((edu) => `- ${edu.degree} at ${edu.institution} (${edu.period})`)
    .join("\n");

  return `You are an AI assistant on Caio Teixeira's professional portfolio website. Answer questions about his professional background based on the following data. Be helpful, concise, and professional. Answer in the same language the user writes in. If asked about something not in the data, say you only have information about his professional profile.

Name: ${profile.name}
Title: ${profile.title}
Location: ${profile.location}
Summary: ${profile.summary}

Skills: ${profile.skills.join(", ")}
Languages: ${profile.languages.map((l) => `${l.name} (${l.level})`).join(", ")}
Publications: ${profile.publications.join(", ")}

Experience:
${experienceText}

Education:
${educationText}`;
}

const systemPrompt = buildSystemPrompt();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_APIKEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-oss-120b",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages,
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter error:", response.status, errorText);
      return NextResponse.json(
        { error: "Failed to get response from AI" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "Empty response from AI" },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: content });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
