"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InterviewStart() {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");

  function startInterview() {
    if (!role || !experience) return alert("Select all fields");

    localStorage.setItem(
      "mockInterviewConfig",
      JSON.stringify({ role, experience })
    );

    router.push("/mock-interview/session");
  }

  return (
    <div className="max-w-xl mx-auto py-20 px-6">
      <h2 className="text-3xl font-bold mb-6">Interview Setup</h2>

      <label className="block mb-2">Job Role</label>
      <select
        className="w-full border p-2 mb-4 text-black "
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="" className="text-black">
          Select role
        </option>
        <option>Frontend Developer</option>
        <option>Backend Developer</option>
        <option>Full Stack Developer</option>
      </select>

      <label className="block mb-2">Experience Level</label>
      <select
        className="w-full border p-2 mb-6 text-black"
        onChange={(e) => setExperience(e.target.value)}
      >
        <option value="">Select experience</option>
        <option>Fresher</option>
        <option>1-3 Years</option>
        <option>3+ Years</option>
      </select>

      <button
        onClick={startInterview}
        className="w-full bg-black text-white py-3 rounded-lg"
      >
        Begin Interview
      </button>
    </div>
  );
}
