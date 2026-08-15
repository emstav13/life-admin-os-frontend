"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

type AIInsightsProps = {
  documents?: any[];
};

export default function AIInsights({
  documents = [],
}: AIInsightsProps) {
  const { t } = useLanguage();

  const safeDocuments = Array.isArray(documents)
    ? documents
    : [];

  // =========================================================
  // TOTAL DOCUMENTS
  // =========================================================

  const totalDocuments =
    safeDocuments.length;

  // =========================================================
  // HIGH PRIORITY
  // =========================================================

  const highPriority = safeDocuments.filter(
    (document) =>
      String(
        document?.ai_json?.urgency || ""
      ).toLowerCase() === "high"
  );

  // =========================================================
  // OVERDUE PAYMENTS
  // =========================================================

  const overduePayments =
    safeDocuments.filter(
      (document) => {
        const dueDate =
          document?.ai_json?.due_date;

        if (!dueDate) {
          return false;
        }

        const match =
          String(dueDate).match(
            /^(\d{4})-(\d{2})-(\d{2})$/
          );

        let due: Date;

        if (match) {
          due = new Date(
            Number(match[1]),
            Number(match[2]) - 1,
            Number(match[3])
          );
        } else {
          const parsed =
            new Date(dueDate);

          if (
            Number.isNaN(
              parsed.getTime()
            )
          ) {
            return false;
          }

          due = new Date(
            parsed.getFullYear(),
            parsed.getMonth(),
            parsed.getDate()
          );
        }

        const now =
          new Date();

        const today =
          new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
          );

        return due < today;
      }
    ).length;

  // =========================================================
  // PAYMENT TEXT
  // =========================================================

  const paymentText =
    overduePayments === 1
      ? `1 ${t.overduePayment}`
      : `${overduePayments} ${t.overduePayments}`;

  // =========================================================
  // SMART AI MESSAGE
  // =========================================================

  let aiMessage =
    "Your AI is on top of things.";

  let aiDescription =
    "Life AiOS is continuously monitoring your documents and deadlines.";

  if (overduePayments > 0) {
    aiMessage =
      "Something needs your attention.";

    aiDescription =
      `Life AiOS found ${overduePayments} overdue ${
        overduePayments === 1
          ? "payment"
          : "payments"
      }.`;
  } else if (
    highPriority.length > 0
  ) {
    aiMessage =
      "Your priorities are under control.";

    aiDescription =
      `${highPriority.length} ${
        highPriority.length === 1
          ? "document is"
          : "documents are"
      } marked as high priority.`;
  } else if (
    totalDocuments > 0
  ) {
    aiMessage =
      "Your administration is under control.";

    aiDescription =
      "Life AiOS is keeping an eye on your documents for you.";
  }

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div
      className="
        rounded-3xl

        border
        border-gray-200
        dark:border-[#3D3834]

        bg-white
        dark:bg-[#2B2724]

        p-7

        shadow-lg

        transition-colors
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          mb-7

          flex
          items-start
          gap-4
        "
      >
       

        <div>
          <h2
            className="
              text-2xl
              font-bold
              tracking-tight

              text-slate-900
              dark:text-white
            "
          >
            {t.aiInsights}
          </h2>

          <p
            className="
              mt-1

              text-sm
              leading-6

              text-gray-500
              dark:text-gray-400
            "
          >
            {t.aiInsightsDescription}
          </p>
        </div>
      </div>

      {/* =====================================================
          MAIN INSIGHTS
      ===================================================== */}

      <div className="space-y-4">

        {/* ===================================================
            DOCUMENTS
        =================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-4

            rounded-2xl

            border
            border-red-200
            dark:border-red-900/30

            bg-red-50
            dark:bg-red-900/20

            p-5
          "
        >
          <div
            className="
              flex
              items-center
              gap-4
            "
          >
            <div
              className="
                flex
                h-11
                w-11

                items-center
                justify-center

                rounded-xl

                bg-red-100
                dark:bg-red-950/40

                text-xl
              "
            >
              📄
            </div>

            <div>
              <p
                className="
                  font-semibold

                  text-red-700
                  dark:text-red-300
                "
              >
                {totalDocuments}{" "}
                {t.documents}
              </p>

              <p
                className="
                  mt-1

                  text-xs

                  text-red-500
                  dark:text-red-400
                "
              >
                {highPriority.length}{" "}
                {highPriority.length === 1
                  ? "high priority"
                  : "high priority documents"}
              </p>
            </div>
          </div>

          <span
            className="
              text-3xl
              font-bold

              text-red-600
              dark:text-red-400
            "
          >
            {totalDocuments}
          </span>
        </div>

        {/* ===================================================
            OVERDUE PAYMENTS
        =================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-4

            rounded-2xl

            border
            border-blue-200
            dark:border-blue-900/30

            bg-blue-50
            dark:bg-blue-900/20

            p-5
          "
        >
          <div
            className="
              flex
              items-center
              gap-4
            "
          >
            <div
              className="
                flex
                h-11
                w-11

                items-center
                justify-center

                rounded-xl

                bg-blue-100
                dark:bg-blue-950/40

                text-xl
              "
            >
              💳
            </div>

            <div>
              <p
                className="
                  font-semibold

                  text-blue-700
                  dark:text-blue-300
                "
              >
                {paymentText}
              </p>

              <p
                className="
                  mt-1

                  text-xs

                  text-gray-500
                  dark:text-gray-400
                "
              >
                Based on document due dates
              </p>
            </div>
          </div>

          <span
            className="
              text-3xl
              font-bold

              text-blue-600
              dark:text-blue-400
            "
          >
            {overduePayments}
          </span>
        </div>

        {/* ===================================================
            SMART AI INSIGHT
        =================================================== */}

        <div
          className="
            relative
            overflow-hidden

            rounded-2xl

            border
            border-indigo-200
            dark:border-indigo-900/40

            bg-gradient-to-br
            from-indigo-50
            via-white
            to-blue-50

            p-5

            dark:from-indigo-950/30
            dark:via-[#2B2724]
            dark:to-blue-950/20
          "
        >
          <div
            className="
              absolute
              -right-8
              -top-8

              h-24
              w-24

              rounded-full

              bg-blue-400/10

              blur-2xl
            "
          />

          <div
            className="
              relative

              flex
              items-start
              gap-4
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                shrink-0

                items-center
                justify-center

                rounded-xl

                bg-indigo-100
                dark:bg-indigo-950/50

                text-xl
              "
            >
              ✨
            </div>

            <div>
              <p
                className="
                  font-semibold

                  text-indigo-700
                  dark:text-indigo-300
                "
              >
                {aiMessage}
              </p>

              <p
                className="
                  mt-1

                  text-sm
                  leading-6

                  text-gray-600
                  dark:text-gray-400
                "
              >
                {aiDescription}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* =====================================================
          LINK
      ===================================================== */}

      <div
        className="
          mt-7
          flex
          justify-end
        "
      >
        <Link
          href="/documents"
          className="
            inline-flex
            items-center
            gap-2

            rounded-xl

            bg-gradient-to-r
            from-blue-600
            to-indigo-600

            px-5
            py-3

            font-semibold
            text-white

            shadow-lg

            transition-all
            duration-200

            hover:-translate-y-0.5
            hover:opacity-95

            active:translate-y-0
          "
        >
          {t.reviewDocuments} →
        </Link>
      </div>
    </div>
  );
}