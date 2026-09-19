"use client";

import { Check, Loader2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { authFetch } from "@/lib/api-auth";
import { useLanguage } from "@/components/providers/LanguageProvider";

type PricingPlansProps = {
  currentPlan?: string;
};

type Plan = {
  id: "free" | "pro" | "pro_plus";
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  badge?: string;
};

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "€0",
    cadence: "",
    description: "A simple way to get started with Life AiOS.",
    features: [
      "5 PDFs lifetime",
      "AI-assisted workflows",
      "Smart reminders",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "€10",
    cadence: "/ month",
    description: "For users who need more document capacity every month.",
    features: [
      "20 PDFs / month",
      "AI-assisted workflows",
      "Smart reminders",
      "Priority plan capacity",
    ],
  },
  {
    id: "pro_plus",
    name: "Pro Plus",
    price: "€19.99",
    cadence: "/ month",
    description: "For power users who manage a larger volume of documents.",
    features: [
      "50 PDFs / month",
      "AI-assisted workflows",
      "Smart reminders",
      "Higher monthly capacity",
    ],
    badge: "Premium",
  },
];

export default function PricingPlans({ currentPlan }: PricingPlansProps) {
  const { t } = useLanguage();

  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState("");

  const [loadedCurrentPlan, setLoadedCurrentPlan] = useState<
    string | undefined
  >(currentPlan);

  useEffect(() => {
    if (currentPlan) {
      setLoadedCurrentPlan(currentPlan);
    }
  }, [currentPlan]);

  useEffect(() => {
    if (currentPlan) {
      return;
    }

    let mounted = true;

    async function loadCurrentPlan() {
      try {
        const response = await authFetch("/subscription");

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        if (
          mounted &&
          typeof data?.plan === "string"
        ) {
          setLoadedCurrentPlan(data.plan);
        }
      } catch (error) {
        console.error(
          "Pricing subscription error:",
          error
        );
      }
    }

    loadCurrentPlan();

    return () => {
      mounted = false;
    };
  }, [currentPlan]);

  const effectiveCurrentPlan =
    loadedCurrentPlan ?? currentPlan;

  async function startCheckout(plan: Plan["id"]) {
    if (plan === "free" || plan === effectiveCurrentPlan) {
      return;
    }

    try {
      setLoadingPlan(plan);
      setError("");

      const response = await authFetch(
        "/subscription/checkout",
        {
          method: "POST",
          body: JSON.stringify({ plan }),
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          typeof data?.detail === "string"
            ? data.detail
            : "Unable to start checkout."
        );
      }

      if (!data?.url) {
        throw new Error(
          "Stripe did not return a checkout URL."
        );
      }

      window.location.href = data.url;
    } catch (checkoutError) {
      console.error(
        "Checkout error:",
        checkoutError
      );

      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Unable to start checkout."
      );
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <section
      id="pricing"
      className="scroll-mt-24 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)] dark:border-[#3D3834] dark:bg-[#2B2724]"
    >
      <div className="border-b border-gray-100 px-7 py-7 dark:border-[#3D3834]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
              Pricing
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Choose the plan that fits you
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
              Start free and upgrade when you need more monthly document capacity.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700 dark:border-violet-400/20 dark:bg-violet-500/10 dark:text-violet-300 sm:self-auto">
            <Sparkles className="h-3.5 w-3.5" />
            Simple plans
          </div>
        </div>
      </div>

      <div className="grid gap-5 p-7 lg:grid-cols-3">
        {plans.map((plan) => {
          const isCurrent =
            effectiveCurrentPlan === plan.id;

          const isPro = plan.id === "pro";
          const isProPlus = plan.id === "pro_plus";
          const isLoading = loadingPlan === plan.id;

          return (
            <article
              key={plan.id}
              className={`relative flex flex-col rounded-2xl border p-6 transition-transform duration-200 hover:-translate-y-0.5 ${
                isProPlus
                  ? "border-violet-300 bg-violet-50/60 shadow-[0_14px_40px_rgba(124,58,237,0.10)] dark:border-violet-400/25 dark:bg-violet-500/5"
                  : isPro
                    ? "border-indigo-300 bg-indigo-50/50 shadow-[0_14px_40px_rgba(79,70,229,0.08)] dark:border-indigo-400/25 dark:bg-indigo-500/5"
                    : "border-gray-200 bg-gray-50/70 dark:border-[#3D3834] dark:bg-[#302C29]"
              }`}
            >
              {plan.badge && (
                <div className="absolute right-5 top-5 rounded-full border border-violet-200 bg-white/80 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-violet-700 dark:border-violet-400/20 dark:bg-white/5 dark:text-violet-300">
                  {plan.badge}
                </div>
              )}

              <div className="pr-20">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  {plan.name}
                </p>

                <div className="mt-2 flex items-end gap-1.5">
                  <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {plan.price}
                  </span>

                  {plan.cadence && (
                    <span className="pb-1 text-sm text-gray-500 dark:text-gray-400">
                      {plan.cadence}
                    </span>
                  )}
                </div>

                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  {plan.description}
                </p>
              </div>

              <div className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-2.5"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/80 dark:bg-white/5">
                      <Check className="h-3.5 w-3.5" />
                    </span>

                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-7 pt-1">
                {isCurrent ? (
                  <div className="flex h-11 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-sm font-semibold text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                    Current plan
                  </div>
                ) : plan.id === "free" ? (
                  <div className="flex h-11 items-center justify-center rounded-xl border border-gray-200 bg-white/70 text-sm font-semibold text-gray-600 dark:border-[#3D3834] dark:bg-white/5 dark:text-gray-300">
                    Free plan
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => startCheckout(plan.id)}
                    disabled={loadingPlan !== null}
                    className={`flex h-11 w-full items-center justify-center rounded-xl text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 ${
                      isProPlus
                        ? "bg-violet-600 hover:bg-violet-700"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Redirecting...
                      </>
                    ) : (
                      <>
                        Upgrade to {plan.name}
                        <span className="ml-2">→</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {error && (
        <div className="border-t border-red-100 bg-red-50 px-7 py-4 text-sm text-red-700 dark:border-red-900/30 dark:bg-red-950/20 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="border-t border-gray-100 px-7 py-4 text-xs text-gray-500 dark:border-[#3D3834] dark:text-gray-400">
        {t.manageSubscription}
      </div>
    </section>
  );
}
