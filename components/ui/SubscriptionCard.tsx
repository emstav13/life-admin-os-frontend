"use client";

import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { authFetch } from "@/lib/api-auth";

type SubscriptionPlan = "free" | "pro" | "pro_plus";

type SubscriptionData = {
  plan: SubscriptionPlan | string;
  status: string;
  documents_used: number;
  documents_limit: number;
  remaining: number;
  current_period_start: string | null;
  current_period_end: string | null;
};

type PlanMeta = {
  name: string;
  price: string;
  cadence: string;
  limitLabel: string;
  description: string;
  badge: string;
  accent: string;
  soft: string;
  ring: string;
};

export default function SubscriptionCard() {
  const { t } = useLanguage();

  const [subscription, setSubscription] =
    useState<SubscriptionData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

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

  const planMeta = useMemo<PlanMeta>(() => {
    switch (subscription?.plan) {
      case "pro_plus":
        return {
          name: "Pro Plus",
          price: "€19.99",
          cadence: "/ month",
          limitLabel: "50 PDFs / month",
          description:
            "For power users who manage a larger volume of documents.",
          badge: "Premium",
          accent:
            "text-violet-700 dark:text-violet-300",
          soft:
            "bg-violet-50 dark:bg-violet-500/10",
          ring:
            "border-violet-200 dark:border-violet-400/20",
        };

      case "pro":
        return {
          name: "Pro",
          price: "€10",
          cadence: "/ month",
          limitLabel: "20 PDFs / month",
          description:
            "More capacity and monthly document processing.",
          badge: "Pro",
          accent:
            "text-indigo-700 dark:text-indigo-300",
          soft:
            "bg-indigo-50 dark:bg-indigo-500/10",
          ring:
            "border-indigo-200 dark:border-indigo-400/20",
        };

      default:
        return {
          name: "Free",
          price: "€0",
          cadence: "",
          limitLabel: "5 PDFs lifetime",
          description:
            "A simple way to get started with Life AiOS.",
          badge: "Free",
          accent:
            "text-emerald-700 dark:text-emerald-300",
          soft:
            "bg-emerald-50 dark:bg-emerald-500/10",
          ring:
            "border-emerald-200 dark:border-emerald-400/20",
        };
    }
  }, [subscription?.plan]);

  const usagePercentage = useMemo(() => {
    if (!subscription || subscription.documents_limit <= 0) {
      return 0;
    }

    return Math.min(
      (
        subscription.documents_used /
        subscription.documents_limit
      ) * 100,
      100
    );
  }, [subscription]);

  const isPaid =
    subscription?.plan === "pro" ||
    subscription?.plan === "pro_plus";

  const isProPlus =
    subscription?.plan === "pro_plus";

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
      subscription?.current_period_end ?? null
    );

  if (loading) {
    return (
      <div
        id="plan"
        className="
          overflow-hidden
          rounded-3xl
          border border-gray-200
          bg-white
          shadow-[0_18px_60px_rgba(15,23,42,0.08)]
          dark:border-[#3D3834]
          dark:bg-[#2B2724]
        "
      >
        <div className="border-b border-gray-100 px-7 py-6 dark:border-[#3D3834]">
          <div className="h-7 w-40 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="mt-3 h-4 w-64 animate-pulse rounded bg-gray-100 dark:bg-gray-800" />
        </div>

        <div className="p-7">
          <div className="h-32 animate-pulse rounded-2xl bg-gray-100 dark:bg-[#332F2C]" />
        </div>
      </div>
    );
  }

  if (error || !subscription) {
    return (
      <div
        id="plan"
        className="
          overflow-hidden
          rounded-3xl
          border border-gray-200
          bg-white
          shadow-[0_18px_60px_rgba(15,23,42,0.08)]
          dark:border-[#3D3834]
          dark:bg-[#2B2724]
        "
      >
        <div className="border-b border-gray-100 px-7 py-6 dark:border-[#3D3834]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
              Life AiOS
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              {t.subscription}
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {t.manageSubscription}
            </p>
          </div>
        </div>

        <div className="p-7">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-900/40 dark:bg-red-900/10">
            <p className="text-sm text-red-700 dark:text-red-300">
              {t.operationFailed}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="plan"
      className="
        overflow-hidden
        rounded-3xl
        border border-gray-200
        bg-white
        shadow-[0_18px_60px_rgba(15,23,42,0.08)]
        dark:border-[#3D3834]
        dark:bg-[#2B2724]
      "
    >
      {/* HEADER */}
      <div className="border-b border-gray-100 px-7 py-6 dark:border-[#3D3834]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
              Life AiOS
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.subscription}
            </h2>

            <p className="mt-1 max-w-xl text-sm text-gray-500 dark:text-gray-400">
              {t.manageSubscription}
            </p>
          </div>

          <div
            className={`
              inline-flex
              shrink-0
              items-center
              gap-2
              rounded-full
              border
              px-3.5
              py-1.5
              text-xs
              font-semibold
              ${planMeta.soft}
              ${planMeta.ring}
              ${planMeta.accent}
            `}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {planMeta.badge}
          </div>
        </div>
      </div>

      {/* CURRENT PLAN HERO */}
      <div className="p-7">
        <div
          className={`
            relative
            overflow-hidden
            rounded-2xl
            border
            p-6
            ${planMeta.ring}
            ${planMeta.soft}
          `}
        >
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/60 blur-3xl dark:bg-white/5" />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
                {t.currentPlan}
              </p>

              <div className="mt-3 flex items-end gap-3">
                <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {planMeta.name}
                </h3>

                <div className="pb-1 text-right">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    {planMeta.price}
                  </span>

                  {planMeta.cadence && (
                    <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                      {planMeta.cadence}
                    </span>
                  )}
                </div>
              </div>

              <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600 dark:text-gray-300">
                {planMeta.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-black/5 bg-white/70 px-3 py-1.5 text-xs font-medium text-gray-700 dark:border-white/5 dark:bg-white/5 dark:text-gray-300">
                  {planMeta.limitLabel}
                </span>

                <span className="rounded-full border border-black/5 bg-white/70 px-3 py-1.5 text-xs font-medium text-gray-700 dark:border-white/5 dark:bg-white/5 dark:text-gray-300">
                  AI-assisted workflows
                </span>

                <span className="rounded-full border border-black/5 bg-white/70 px-3 py-1.5 text-xs font-medium text-gray-700 dark:border-white/5 dark:bg-white/5 dark:text-gray-300">
                  Smart reminders
                </span>
              </div>
            </div>

            <div className="min-w-[220px] rounded-2xl border border-black/5 bg-white/75 p-5 backdrop-blur dark:border-white/5 dark:bg-black/10">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Document usage
                </span>

                <span className="text-xs font-semibold text-slate-900 dark:text-white">
                  {subscription.documents_used} / {subscription.documents_limit}
                </span>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className={`
                    h-full
                    rounded-full
                    transition-all
                    ${
                      isProPlus
                        ? "bg-violet-500"
                        : isPaid
                          ? "bg-indigo-500"
                          : "bg-emerald-500"
                    }
                  `}
                  style={{
                    width: `${usagePercentage}%`,
                  }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {subscription.remaining}{" "}
                  {t.remaining || "remaining"}
                </span>

                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  {Math.round(usagePercentage)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER ROW */}
        <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-gray-200 bg-gray-50/70 p-5 dark:border-[#3D3834] dark:bg-[#302C29] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {isPaid
                ? "Your subscription is active."
                : "You are currently on the Free plan."}
            </p>

            <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
              {isPaid && periodEnd
                ? `Current billing period ends ${periodEnd}.`
                : "Upgrade to unlock more monthly document capacity."}
            </p>
          </div>

          <button
            type="button"
            className="
              inline-flex
              items-center
              justify-center
              rounded-xl
              bg-slate-900
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition
              hover:-translate-y-0.5
              hover:bg-slate-800
              dark:bg-white
              dark:text-slate-900
              dark:hover:bg-gray-100
            "
            onClick={() => {
              window.location.href = "/settings#pricing";
            }}
          >
            {isPaid
              ? "Manage plan"
              : "View plans"}
            <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
