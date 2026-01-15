"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function InterviewResult() {
  const data = JSON.parse(localStorage.getItem("mockInterviewResult")) || [];

  const averageScore =
    data.reduce((sum, q) => sum + q.score, 0) / (data.length || 1);

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-3xl font-bold mb-4">Interview Feedback</h1>

      <p className="text-lg mb-6">
        Average Score: <b>{Math.round(averageScore)}/100</b>
      </p>

      {data.map((q, i) => (
        <div key={i} className="border p-4 mb-4 rounded">
          <p className="font-semibold">{q.question}</p>
          <p className="text-green-600">Strengths: {q.strengths.join(", ")}</p>
          <p className="text-red-500">Weaknesses: {q.weaknesses.join(", ")}</p>
          <p className="mt-2">Improvement: {q.improvement}</p>
        </div>
      ))}

      <Link href="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
}
