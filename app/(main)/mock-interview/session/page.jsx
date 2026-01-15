"use client";

import { useEffect, useState } from "react";
import {
  generateInterviewQuestions,
  evaluateAnswer,
} from "@/actions/mockInterview";

export default function InterviewSession() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [results, setResults] = useState
  ([]);
  const total = questions.length;

  useEffect(() => {
    async function loadQuestions() {
      const qs = await generateInterviewQuestions({
        role: "Frontend Developer",
        experience: "Fresher",
      });
      setQuestions(qs);
    }
    loadQuestions();
  }, []);

  async function handleSubmit() {
    const feedback = await evaluateAnswer({
      question: questions[current],
      answer,
    });

    setResults((prev) => [
      ...prev,
      { question: questions[current], ...feedback },
    ]);

    setAnswer("");
    setCurrent(current + 1);
  }

  if (!questions.length)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Preparing your interview...
      </div>
    );

  if (current >= total) {
    localStorage.setItem("interviewResults", JSON.stringify(results));
    window.location.href = "/mock-interview/result";
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-secondary bg-gradient shadow-lg rounded-xl p-6 space-y-6">
        {/* Progress */}
        <div className="flex justify-between text-sm text-white">
          <span>
            Question {current + 1} / {total}
          </span>
          <span>AI Mock Interview</span>
        </div>

        {/* Question */}
        <h2 className="text-xl font-semibold text-white">
          {questions[current]}
        </h2>

        {/* Answer Box */}
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          rows={6}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black resize-none text-black"
        />

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!answer.trim()}
          className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
}
