"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { authFetch } from "@/lib/api-auth";
type DashboardStats = {
  documents: number;
  high_priority: number;
  low_priority: number;
  notifications: number;
};

export default function ExecutiveDashboard() {
  const { t } = useLanguage();

  const [stats, setStats] =
    useState<DashboardStats | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      /*
       * ==========================================
       * GET CURRENT USER
       * ==========================================
       */

    const response = await authFetch(
  "/dashboard-stats"
);
      if (!response.ok) {
        throw new Error(
          "Failed to load dashboard"
        );
      }

      const data: DashboardStats =
        await response.json();

      setStats(data);

    } catch (err) {
      console.error(
        "Dashboard error:",
        err
      );

      setError(t.dashboardError);

    } finally {
      setLoading(false);
    }
  };

  /*
   * ==========================================
   * INITIAL LOAD
   * ==========================================
   */

  useEffect(() => {
    loadDashboard();
  }, []);

  /*
   * ==========================================
   * LOADING
   * ==========================================
   */

  if (loading) {
    return (
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-5
          mb-8
        "
      >
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="
              h-[150px]

              rounded-3xl

              border
              border-slate-200
              dark:border-[#3D3834]

              bg-white
              dark:bg-[#2B2724]

              p-6

              animate-pulse
            "
          >
            <div
              className="
                h-10
                w-10

                rounded-xl

                bg-slate-200
                dark:bg-[#3A3531]

                mb-6
              "
            />

            <div
              className="
                h-4
                w-28

                rounded

                bg-slate-200
                dark:bg-[#3A3531]

                mb-3
              "
            />

            <div
              className="
                h-8
                w-16

                rounded

                bg-slate-300
                dark:bg-[#45403B]
              "
            />
          </div>
        ))}
      </div>
    );
  }

  /*
   * ==========================================
   * ERROR
   * ==========================================
   */

  if (error) {
    return (
      <div
        className="
          rounded-3xl

          border
          border-red-200
          dark:border-red-500/20

          bg-red-50
          dark:bg-red-500/5

          p-8

          mb-8

          text-center
        "
      >
        <div
          className="
            mx-auto
            mb-4

            flex
            h-12
            w-12

            items-center
            justify-center

            rounded-2xl

            bg-red-100
            dark:bg-red-500/10

            text-red-600
            dark:text-red-400
          "
        >
          !
        </div>

        <p
          className="
            text-red-700
            dark:text-red-300

            font-medium

            mb-5
          "
        >
          {error}
        </p>

        <button
          type="button"
          onClick={loadDashboard}
          className="
            rounded-xl

            bg-slate-900
            dark:bg-white

            text-white
            dark:text-slate-900

            px-5
            py-2.5

            text-sm
            font-semibold

            hover:bg-blue-600
            dark:hover:bg-blue-100

            transition
          "
        >
          {t.retry}
        </button>
      </div>
    );
  }

  /*
   * ==========================================
   * SAFETY CHECK
   * ==========================================
   */

  if (!stats) {
    return null;
  }

  /*
   * ==========================================
   * DASHBOARD CARDS
   * ==========================================
   */

  const cards = [
    {
      title: t.totalDocuments,
      value: stats.documents,
      description: "Documents in your workspace",
      type: "documents",
    },

    {
      title: t.highPriority,
      value: stats.high_priority,
      description: "Require your attention",
      type: "high",
    },

    {
      title: t.lowPriority,
      value: stats.low_priority,
      description: "Low urgency items",
      type: "low",
    },

    {
      title: t.notifications,
      value: stats.notifications,
      description: "Active reminders",
      type: "notifications",
    },
  ];

  return (
    <div className="mb-8">

      {/* ================================= */}
      {/* SECTION HEADER */}
      {/* ================================= */}

      <div
        className="
          flex
          flex-col
          sm:flex-row

          sm:items-end
          sm:justify-between

          gap-3

          mb-5
        "
      >

        
        <button
          type="button"
          onClick={loadDashboard}
          className="
            self-start
            sm:self-auto

            flex
            items-center
            gap-2

            rounded-xl

            border
            border-slate-200
            dark:border-[#45403B]

            bg-white
            dark:bg-[#2B2724]

            px-3.5
            py-2

            text-sm
            font-medium

            text-slate-600
            dark:text-gray-300

            hover:border-blue-300
            hover:text-blue-600

            dark:hover:border-blue-500/30
            dark:hover:text-blue-400

            transition
          "
        >

          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M20 11A8 8 0 0 0 6.34 5.34L4 7.67"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M4 4V7.67H7.67"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M4 13A8 8 0 0 0 17.66 18.66L20 16.33"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M20 20V16.33H16.33"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          Refresh

        </button>

      </div>


      {/* ================================= */}
      {/* CARDS */}
      {/* ================================= */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4

          gap-4
        "
      >

        {cards.map((card) => {

          const isHigh =
            card.type === "high";

          const isLow =
            card.type === "low";

          const isNotifications =
            card.type === "notifications";

          return (
            <div
              key={card.title}
              className="
                group
                relative
                overflow-hidden

                rounded-3xl

                border
                border-slate-200
                dark:border-[#3D3834]

                bg-white
                dark:bg-[#2B2724]

                p-6

                shadow-sm

                hover:-translate-y-1
                hover:shadow-xl

                transition-all
                duration-300
              "
            >

              {/* subtle background */}

              <div
                className={`
                  pointer-events-none

                  absolute
                  -right-10
                  -top-10

                  h-28
                  w-28

                  rounded-full

                  blur-2xl

                  transition-opacity

                  group-hover:opacity-100

                  ${
                    isHigh
                      ? "bg-red-500/10"
                      : isLow
                      ? "bg-emerald-500/10"
                      : isNotifications
                      ? "bg-blue-500/10"
                      : "bg-indigo-500/10"
                  }
                `}
              />


              {/* TOP ROW */}

              <div
                className="
                  relative

                  flex
                  items-center
                  justify-between
                "
              >

                {/* ICON */}

                <div
                  className={`
                    flex
                    h-11
                    w-11

                    items-center
                    justify-center

                    rounded-2xl

                    ${
                      isHigh
                        ? `
                          bg-red-50
                          text-red-600

                          dark:bg-red-500/10
                          dark:text-red-400
                        `
                        : isLow
                        ? `
                          bg-emerald-50
                          text-emerald-600

                          dark:bg-emerald-500/10
                          dark:text-emerald-400
                        `
                        : isNotifications
                        ? `
                          bg-blue-50
                          text-blue-600

                          dark:bg-blue-500/10
                          dark:text-blue-400
                        `
                        : `
                          bg-indigo-50
                          text-indigo-600

                          dark:bg-indigo-500/10
                          dark:text-indigo-400
                        `
                    }
                  `}
                >

                  {card.type === "documents" && (
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M6 3.5H14L19 8.5V20.5H6V3.5Z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M14 3.5V8.5H19"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M9 12H16"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />

                      <path
                        d="M9 15.5H14"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}

                  {card.type === "high" && (
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 4L21 20H3L12 4Z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M12 9V13"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />

                      <circle
                        cx="12"
                        cy="16.5"
                        r="0.8"
                        fill="currentColor"
                      />
                    </svg>
                  )}

                  {card.type === "low" && (
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 3.5V20.5"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />

                      <path
                        d="M7 16L12 20.5L17 16"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M5 6H19"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}

                  {card.type === "notifications" && (
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M18 9C18 5.69 15.31 3 12 3C8.69 3 6 5.69 6 9C6 16 3.5 17 3.5 18H20.5C20.5 17 18 16 18 9Z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M9.5 21H14.5"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}

                </div>


                {/* VALUE */}

                <span
                  className="
                    relative

                    text-4xl
                    font-bold

                    tracking-tight

                    text-slate-900
                    dark:text-white
                  "
                >
                  {card.value}
                </span>

              </div>


              {/* TITLE */}

              <div className="relative mt-5">

                <h3
                  className="
                    text-sm
                    font-semibold

                    text-slate-800
                    dark:text-gray-100
                  "
                >
                  {card.title}
                </h3>

                <p
                  className="
                    mt-1

                    text-xs
                    leading-5

                    text-slate-500
                    dark:text-gray-400
                  "
                >
                  {card.description}
                </p>

              </div>


              {/* BOTTOM ACCENT */}

              <div
                className={`
                  absolute
                  bottom-0
                  left-0

                  h-0.5

                  w-0

                  group-hover:w-full

                  transition-all
                  duration-500

                  ${
                    isHigh
                      ? "bg-red-500"
                      : isLow
                      ? "bg-emerald-500"
                      : isNotifications
                      ? "bg-blue-500"
                      : "bg-indigo-500"
                  }
                `}
              />

            </div>
          );
        })}

      </div>

    </div>
  );
}