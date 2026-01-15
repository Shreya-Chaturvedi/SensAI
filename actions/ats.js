"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function analyzeResumeATS({ resumeText, jobDescription }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const prompt = `
    You are an ATS (Applicant Tracking System).

Return ONLY valid JSON. No text. No markdown.

Schema:
{
  "score": number,
  "missingKeywords": string[],
  "matchedKeywords": string[],
  "summary": string,
  "suggestions": string[]
}

JOB DESCRIPTION:
${jobDescription}

RESUME:
${resumeText}
`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are an ATS engine. Output strict JSON only.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
    });

    // ✅ FIX 1: correct response access
    const text = completion.choices?.[0]?.message?.content;

    if (!text) {
      throw new Error("Empty ATS response from model");
    }

    // ✅ FIX 2: robust JSON extraction
    const match = text.match(/\{[\s\S]*\}/);

    if (!match) {
      console.error("ATS raw response:", text);
      throw new Error("No JSON object found in ATS response");
    }

    const result = JSON.parse(match[0]);

    return result;
  } catch (error) {
    console.error("Error analyzing ATS:", error);
    throw new Error("Failed to analyze resume ATS score");
  }
}
