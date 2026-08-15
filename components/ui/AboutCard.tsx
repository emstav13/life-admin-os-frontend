"use client";

export default function AboutCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">

      <div className="mb-5">

        <h2 className="text-2xl font-bold">
          ℹ️ About
        </h2>

        <p className="text-gray-500 mt-1 text-sm">
          Information about your application.
        </p>

      </div>

      <div className="space-y-4">

        <div className="flex items-center justify-between border rounded-lg p-3">

          <span className="text-gray-500">
            Application
          </span>

          <span className="font-semibold">
            Life AiOS
          </span>

        </div>

        <div className="flex items-center justify-between border rounded-lg p-3">

          <span className="text-gray-500">
            Version
          </span>

          <span className="font-semibold">
            1.0.0
          </span>

        </div>

        <div className="flex items-center justify-between border rounded-lg p-3">

          <span className="text-gray-500">
            Built With
          </span>

          <span className="font-semibold">
            Next.js • FastAPI • Supabase • OpenAI
          </span>

        </div>

      </div>

      <div className="mt-6 pt-5 border-t text-center">

        <h3 className="font-semibold text-lg">
          Life AiOS
        </h3>

        <p className="text-gray-500 text-sm mt-1">
          AI-powered document management platform.
        </p>

        <p className="text-xs text-gray-400 mt-4">
          © 2026 Life AiOS • Version 1.0.0
        </p>

      </div>

    </div>
  );
}