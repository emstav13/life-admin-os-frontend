"use client";

import { useEffect, useState } from "react";

import { API_URL } from "@/lib/api";
import { authFetch } from "@/lib/api-auth";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function DailyBriefing() {
  const { t } = useLanguage();

  const [briefing, setBriefing] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBriefing = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await authFetch(
        `${API_URL}/daily-briefing`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();

        console.error(
          "Daily briefing failed:",
          response.status,
          errorText
        );

        throw new Error(
          `Failed to load briefing: ${response.status}`
        );
      }

      const data = await response.json();

      setBriefing(
        typeof data?.briefing === "string"
          ? data.briefing
          : ""
      );
    } catch (err) {
      console.error(
        "Daily briefing error:",
        err
      );

      setError(t.briefingError);
      setBriefing("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBriefing();
  }, []);

  if (loading) {
    return (
      <div className="mb-8 rounded-xl bg-blue-50 p-6 shadow dark:bg-[#2B2724]">
        <div className="mb-4 h-6 w-48 animate-pulse rounded bg-blue-200 dark:bg-gray-700" />

        <div className="mb-2 h-4 w-full animate-pulse rounded bg-blue-100 dark:bg-gray-600" />

        <div className="h-4 w-5/6 animate-pulse rounded bg-blue-100 dark:bg-gray-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900/50 dark:bg-red-950/20">
        <p className="mb-4 text-red-600 dark:text-red-300">
          {error}
        </p>

        <button
          type="button"
          onClick={loadBriefing}
          className="
            rounded-xl
            bg-black
            px-5
            py-2
            text-white
            transition
            hover:opacity-90
            dark:bg-white
            dark:text-black
          "
        >
          {t.retry}
        </button>
      </div>
    );
  }

  return (
    <div
      className="
        mb-8
        rounded-xl
        border
        border-blue-200
        bg-blue-50
        p-6
        shadow
        transition
        duration-200
        hover:shadow-lg
        dark:border-[#3D3834]
        dark:bg-[#2B2724]
      "
    >
      <h2 className="mb-4 text-2xl font-bold dark:text-white">
        🧠 {t.dailyBriefing}
      </h2>

      {briefing ? (
        <p className="whitespace-pre-wrap leading-7 text-gray-700 dark:text-gray-300">
          {briefing}
        </p>
      ) : (
        <div className="py-8 text-center">
          <div className="mb-3 text-5xl">
            🤖
          </div>

          <p className="font-semibold dark:text-white">
            {t.noBriefing}
          </p>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {t.uploadDocumentsForBriefing}
          </p>
        </div>
      )}
    </div>
  );
}