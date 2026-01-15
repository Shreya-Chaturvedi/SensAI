import Link from "next/link";
import { getMockInterviewHistory } from "@/actions/mockInterview";

export default async function InterviewLanding() {
  const history = await getMockInterviewHistory();

  return (
    <div className="min-h-screen px-6 py-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">AI Mock Interview</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Practice real interview questions with AI feedback, scoring, and
          improvement suggestions.
        </p>

        <Link href="/mock-interview/start">
          <button className="mt-6 px-6 py-3 bg-black text-white rounded-lg">
            Start New Interview
          </button>
        </Link>
      </div>

      {/* Previous Results */}
      {history.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-4">
            Previous Interview Performance
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {history.map((session) => (
              <div
                key={session.id}
                className="border rounded-lg p-4 bg-white shadow-sm"
              >
                <p className="font-medium">{session.role}</p>
                <p className="text-sm text-gray-500">
                  Experience: {session.experience}
                </p>
                <p className="mt-2">
                  Avg Score:{" "}
                  <span className="font-semibold">
                    {session.averageScore}/10
                  </span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(session.createdAt).toDateString()}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
