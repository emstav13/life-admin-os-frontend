"use client";

import { useEffect, useState } from "react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { authFetch } from "@/lib/api-auth";

type SubscriptionData = {
  plan: "free" | "pro" | string;
  status: string;
  documents_used: number;
  documents_limit: number;
  remaining: number;
  current_period_start: string | null;
  current_period_end: string | null;
};

export default function SubscriptionCard() {
  const { t } = useLanguage();

  const [subscription, setSubscription] =
    useState<SubscriptionData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

  // =====================================================
  // LOAD SUBSCRIPTION
  // =====================================================

  useEffect(() => {
    let mounted = true;

    async function loadSubscription() {
      try {
        setLoading(true);
        setError(false);

        const response = await authFetch(
          "/subscription"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load subscription"
          );
        }

        const data =
          await response.json();

        console.log(
          "SUBSCRIPTION:",
          data
        );

        if (mounted) {
          setSubscription(data);
        }
      } catch (error) {
        console.error(
          "Subscription error:",
          error
        );

        if (mounted) {
          setError(true);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadSubscription();

    return () => {
      mounted = false;
    };
  }, []);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div
        className="
          bg-white
          dark:bg-[#2B2724]
          border
          border-gray-200
          dark:border-[#3D3834]
          rounded-2xl
          shadow-lg
          p-8
        "
      >
        <div className="mb-8">
          <h2
            className="
              text-2xl
              font-bold
              text-slate-900
              dark:text-white
            "
          >
            💳 {t.subscription}
          </h2>

          <p
            className="
              text-gray-500
              dark:text-gray-400
            "
          >
            {t.manageSubscription}
          </p>
        </div>

        <div
          className="
            rounded-xl
            border
            border-gray-200
            dark:border-[#3D3834]
            p-6
          "
        >
          <p
            className="
              text-sm
              text-gray-500
              dark:text-gray-400
            "
          >
            {t.loading}
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error || !subscription) {
    return (
      <div
        className="
          bg-white
          dark:bg-[#2B2724]
          border
          border-gray-200
          dark:border-[#3D3834]
          rounded-2xl
          shadow-lg
          p-8
        "
      >
        <div className="mb-8">
          <h2
            className="
              text-2xl
              font-bold
              text-slate-900
              dark:text-white
            "
          >
            💳 {t.subscription}
          </h2>

          <p
            className="
              text-gray-500
              dark:text-gray-400
            "
          >
            {t.manageSubscription}
          </p>
        </div>

        <div
          className="
            rounded-xl
            border
            border-red-200
            dark:border-red-900/40
            bg-red-50
            dark:bg-red-900/10
            p-6
          "
        >
          <p
            className="
              text-sm
              text-red-700
              dark:text-red-300
            "
          >
            {t.operationFailed}
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // PLAN
  // =====================================================

  const isPro =
    subscription.plan === "pro";

  const usagePercentage =
    subscription.documents_limit > 0
      ? Math.min(
          (
            subscription.documents_used /
            subscription.documents_limit
          ) * 100,
          100
        )
      : 0;

  // =====================================================
  // FORMAT DATE
  // =====================================================

  function formatDate(
    value: string | null
  ) {
    if (!value) {
      return null;
    }

    try {
      return new Intl.DateTimeFormat(
        undefined,
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      ).format(
        new Date(value)
      );
    } catch {
      return value;
    }
  }

  const periodEnd =
    formatDate(
      subscription.current_period_end
    );

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div
      id="plan"
      className="
        bg-white
        dark:bg-[#2B2724]

        border
        border-gray-200
        dark:border-[#3D3834]

        rounded-2xl
        shadow-lg

        p-8

        transition-colors
      "
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-8">

        <h2
          className="
            text-2xl
            font-bold
            text-slate-900
            dark:text-white
          "
        >
          💳 {t.subscription}
        </h2>

        <p
          className="
            text-gray-500
            dark:text-gray-400
          "
        >
          {t.manageSubscription}
        </p>

      </div>

      {/* =================================================
          SUBSCRIPTION CONTENT
      ================================================= */}

      <div
        className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-8

          rounded-xl

          border
          border-gray-200
          dark:border-[#3D3834]

          p-6
        "
      >

        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="space-y-6">

          {/* CURRENT PLAN */}

          <div>

            <p
              className="
                text-sm
                text-gray-500
                dark:text-gray-400
              "
            >
              {t.currentPlan}
            </p>

            <div
              className={`
                mt-2
                inline-flex
                items-center
                rounded-full
                px-4
                py-2
                font-semibold

                ${
                  isPro
                    ? `
                      bg-purple-100
                      dark:bg-purple-900/20
                      text-purple-700
                      dark:text-purple-300
                    `
                    : `
                      bg-green-100
                      dark:bg-green-900/20
                      text-green-700
                      dark:text-green-300
                    `
                }
              `}
            >
              {isPro
                ? "🟣 Pro"
                : `🟢 ${t.free}`}
            </div>

          </div>

          {/* DOCUMENT USAGE */}

          <div>

            <p
              className="
                text-sm
                text-gray-500
                dark:text-gray-400
              "
            >
              {t.storage}
            </p>

            <p
              className="
                mt-2
                font-semibold
                text-slate-900
                dark:text-white
              "
            >
              {subscription.documents_used}
              {" / "}
              {subscription.documents_limit}
              {" "}
              {t.documentsPlural}
            </p>

            {/* PROGRESS BAR */}

            <div
              className="
                mt-3
                w-full
                max-w-xs
                h-2
                rounded-full
                bg-gray-200
                dark:bg-gray-700
                overflow-hidden
              "
            >
              <div
                className={`
                  h-full
                  rounded-full
                  transition-all
                  ${
                    isPro
                      ? "bg-purple-500"
                      : "bg-green-500"
                  }
                `}
                style={{
                  width:
                    `${usagePercentage}%`,
                }}
              />
            </div>

            <p
              className="
                mt-2
                text-xs
                text-gray-500
                dark:text-gray-400
              "
            >
              {subscription.remaining}{" "}
              {t.remaining || "remaining"}
            </p>

          </div>

          {/* PRO STATUS */}

          {isPro && (
            <div>

              <p
                className="
                  text-sm
                  font-medium
                  text-green-700
                  dark:text-green-400
                "
              >
                ✅ {t.enabled}
              </p>

              {periodEnd && (
                <p
                  className="
                    mt-1
                    text-xs
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  {periodEnd}
                </p>
              )}

            </div>
          )}

        </div>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div>

          {!isPro ? (

            <button
              type="button"
              className="
                px-6
                py-3

                rounded-xl

                bg-gradient-to-r
                from-indigo-500
                to-purple-600

                text-white
                font-semibold

                shadow-md

                hover:scale-[1.02]

                transition-all

                whitespace-nowrap
              "
              onClick={() => {
                window.location.href = "/settings#plan";
              }}
            >
               {t.upgradeToPro}
            </button>

          ) : (

            <button
              type="button"
              className="
                px-6
                py-3

                rounded-xl

                border
                border-gray-300
                dark:border-[#4A4541]

                text-slate-900
                dark:text-white

                font-semibold

                hover:bg-gray-50
                dark:hover:bg-[#332E2A]

                transition-all

                whitespace-nowrap
              "
              onClick={() => {
                window.location.href = "/settings#plan";
              }}
            >
              ⚙️ {t.manageSubscription}
            </button>

          )}

        </div>

      </div>

    </div>
  );
}