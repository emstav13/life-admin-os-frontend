"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

type Props = {
  documents: any[];
};

export default function UpcomingWidget({
  documents,
}: Props) {
  const { t } = useLanguage();

  const upcoming = documents
    .filter((doc) => doc.ai_json?.due_date)
    .sort(
      (a, b) =>
        new Date(a.ai_json.due_date).getTime() -
        new Date(b.ai_json.due_date).getTime()
    )
    .slice(0, 5);

  return (
    <div
      className="
        bg-white
        dark:bg-[#2B2724]

        border
        border-gray-200
        dark:border-[#3D3834]

        rounded-2xl
        shadow

        p-6
        mb-8
        w-full

        transition-colors
      "
    >
      <div className="flex items-center justify-between mb-5">

        <h2 className="text-xl font-bold dark:text-white">
          📅 {t.upcoming}
        </h2>

        <Link
          href="/documents"
          className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {t.viewAll} →
        </Link>

      </div>

      {upcoming.length === 0 ? (

        <div className="text-center py-10">

          <div className="text-5xl mb-3">
            📭
          </div>

          <p className="text-gray-500 dark:text-gray-400">
            {t.noUpcoming}
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {upcoming.map((doc) => {

            const urgency = doc.ai_json?.urgency || "low";

            return (

              <Link
                key={doc.id}
                href={`/documents/${doc.id}`}
                className="
                  flex
                  items-center
                  justify-between

                  border
                  border-gray-200
                  dark:border-[#3D3834]

                  rounded-xl
                  p-4

                  hover:bg-gray-50
                  dark:hover:bg-[#34302D]

                  hover:shadow-md
                  transition
                "
              >

                <div>

                  <p className="font-semibold text-lg dark:text-white">
                    📄 {doc.filename}
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    🏢 {doc.ai_json?.provider || t.unknownProvider}
                  </p>

                </div>

                <div className="text-right">

                  <span
                    className={`inline-block px-4 py-2 rounded-full text-xs font-semibold ${
                      urgency === "high"
                        ? "bg-red-100 text-red-700"
                        : urgency === "medium"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {urgency === "high"
                      ? `🔴 ${t.high}`
                      : urgency === "medium"
                      ? `🟠 ${t.medium}`
                      : `🟢 ${t.low}`}
                  </span>

                  <p className="text-sm mt-3 text-gray-500 dark:text-gray-400">
                    📅 {doc.ai_json?.due_date || t.noDueDate}
                  </p>

                </div>

              </Link>

            );
          })}

        </div>

      )}

    </div>
  );
}