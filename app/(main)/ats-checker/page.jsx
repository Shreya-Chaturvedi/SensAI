"use client";

import { useState, useTransition } from "react";
import { analyzeResumeATS } from "@/actions/ats";

export default function ATSCheckerPage() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Simple approach: assume text or simple PDF where browser can read text
      const text = await file.text(); // modern browsers support this [web:116]
      setResumeText(text);
    } catch (err) {
      console.error("Error reading file:", err);
      setError("Failed to read resume file. Please paste text manually.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    startTransition(async () => {
      try {
        const data = await analyzeResumeATS({ resumeText, jobDescription });
        setResult(data);
      } catch (err) {
        console.error(err);
        setError("ATS analysis failed. Please try again.");
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-semibold">ATS Score Checker</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Upload button */}
        <div>
          <label className="block text-sm font-medium mb-1">Resume</label>

          {/* <div className="flex items-center gap-2 mb-2">
            <input
              type="file"
              accept=".txt,.pdf,.doc,.docx"
              onChange={handleFileChange}
              className="text-sm text-gray-300 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
            <span className="text-xs text-gray-400">
              Upload resume or paste the text below.
            </span>
          </div> */}

          <textarea
            className="w-full border rounded-md p-2 min-h-[150px]"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume text here..."
            style={{ backgroundColor: "#333", color: "#fff" }}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Job Description
          </label>
          <textarea
            className="w-full border rounded-md p-2 min-h-[150px]"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the target job description here..."
            style={{ backgroundColor: "#333", color: "#fff" }}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 rounded-md bg-blue-600 text-white disabled:opacity-50"
        >
          {isPending ? "Analyzing..." : "Analyze ATS Score"}
        </button>
      </form>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {result && (
        <div className="space-y-4 mt-6">
          <div>
            <h2 className="font-semibold mb-1">ATS Score</h2>
            <p className="text-lg">{result.score}/100</p>
          </div>

          <div>
            <h2 className="font-semibold mb-1">Missing Keywords</h2>
            {result.missingKeywords?.length ? (
              <div className="flex flex-wrap gap-2">
                {result.missingKeywords.map((k) => (
                  <span
                    key={k}
                    className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700"
                  >
                    {k}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No critical missing keywords detected.
              </p>
            )}
          </div>

          <div>
            <h2 className="font-semibold mb-1">Suggestions</h2>
            <ul className="list-disc list-inside text-sm space-y-1">
              {result.suggestions?.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
