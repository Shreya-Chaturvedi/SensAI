"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/* 🔥 1. GENERATE QUESTIONS (ONCE PER SESSION) */
export async function generateInterviewQuestions({ role, experience }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const prompt = `
You are a senior technical interviewer.

Generate EXACTLY 5 UNIQUE interview questions for:
Role: ${role}
Experience: ${experience}

Rules:
- Questions must NOT repeat
- Mix theory + scenario + best practices
- Avoid very common beginner questions
- Return ONLY valid JSON array

FORMAT:
[
  "Question 1",
  "Question 2",
  "Question 3",
  "Question 4",
  "Question 5"
]
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });

  let text = completion.choices[0].message.content;
  text = text.replace(/```json|```/g, "").trim();

  return JSON.parse(text);
}

/* ✅ 2. EVALUATE EACH ANSWER */
export async function evaluateAnswer({ question, answer }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const prompt = `
Evaluate the interview answer strictly in JSON only.

Question: ${question}
Answer: ${answer}

JSON FORMAT:
{
  "score": number,
  "strengths": ["string"],
  "weaknesses": ["string"],
  "improvement": "string"
}
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });

  let text = completion.choices[0].message.content;
  text = text.replace(/```json|```/g, "").trim();

  const first = text.indexOf("{");
  const last = text.lastIndexOf("}");

  return JSON.parse(text.slice(first, last + 1));
}

/* 💾 3. SAVE COMPLETE INTERVIEW SESSION */
export async function saveMockInterviewSession({
  role,
  experience,
  answers, // [{ question, answer, score, feedback }]
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error("User not found");

  const averageScore =
    answers.reduce((sum, a) => sum + a.score, 0) / answers.length;

  const session = await db.mockInterviewSession.create({
    data: {
      userId: user.id,
      role,
      experience,
      averageScore,
      answers: {
        create: answers.map((a) => ({
          question: a.question,
          answer: a.answer,
          score: a.score,
          feedback: a.feedback,
        })),
      },
    },
  });

  return session;
}

/* 📊 4. FETCH INTERVIEW HISTORY (FOR GRAPH + LIST) */
export async function getMockInterviewHistory() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error("User not found");

  return await db.mockInterviewSession.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      role: true,
      experience: true,
      averageScore: true,
      createdAt: true,
    },
  });
}
