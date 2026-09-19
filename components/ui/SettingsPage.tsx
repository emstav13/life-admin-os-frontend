"use client";

import { useEffect, useState } from "react";

import AccountCard from "./AccountCard";
import AppearanceCard from "./AppearanceCard";
import LanguageCard from "./LanguageCard";
import NotificationCard from "./NotificationCard";
import SubscriptionCard from "./SubscriptionCard";
import PricingPlans from "./PricingPlans";
import DangerZoneCard from "./DangerZoneCard";
import ContactCard from "./ContactCard";

import { authFetch } from "@/lib/api-auth";

type SubscriptionData = {
  plan: "free" | "pro" | "pro_plus" | string;
};

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 dark:border-[#3D3834] md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
          {eyebrow}
        </p>
        <h2 className="mt-1.5 text-lg font-semibold tracking-[-0.02em] text-slate-900 dark:text-white">
          {title}
        </h2>
      </div>
      <p className="max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400 md:text-right">
        {description}
      </p>
    </div>
  );
}

export default function SettingsPage() {
  const [currentPlan, setCurrentPlan] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    let mounted = true;

    async function loadSubscription() {
      try {
        const response = await authFetch("/subscription");

        if (!response.ok) {
          return;
        }

        const data: SubscriptionData = await response.json();

        if (mounted) {
          setCurrentPlan(data.plan);
        }
      } catch (error) {
        console.error("Settings subscription error:", error);
      }
    }

    loadSubscription();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="mx-auto w-full max-w-[1240px] pb-20">
      <header className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white px-6 py-7 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.35)] dark:border-[#3D3834] dark:bg-[#24211F] dark:shadow-none md:px-8 md:py-8">
        <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-slate-100/80 blur-3xl dark:bg-[#3D3834]/40" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:border-[#48423E] dark:bg-[#2B2825] dark:text-slate-400">
              Account settings
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-slate-950 dark:text-white md:text-4xl">
              Settings
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400 md:text-[15px]">
              Configure your account, preferences, notifications, subscription,
              and security controls from one place.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 dark:border-[#48423E] dark:bg-[#2B2825]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
              Workspace
            </p>
            <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-200">
              Personal account
            </p>
          </div>
        </div>
      </header>

      <div className="mt-10 space-y-14">
        <section>
          <SectionHeader
            eyebrow="01 · Profile"
            title="Account & preferences"
            description="Manage your personal details and the way Life AiOS looks and behaves."
          />

          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            <AccountCard />
            <AppearanceCard />
            <LanguageCard />
            <NotificationCard />
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="02 · Billing"
            title="Subscription & plans"
            description="Review your current plan, document allowance, and available subscription options."
          />

          <div className="mt-6 space-y-6">
            <SubscriptionCard />
            <PricingPlans currentPlan={currentPlan} />
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="03 · Support"
            title="Help & assistance"
            description="Get in touch with support or find the right place for account-related help."
          />

          <div className="mt-6">
            <ContactCard />
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="04 · Security"
            title="Security & data"
            description="Manage account protection and the actions that affect your stored data."
          />

          <div className="mt-6">
            <DangerZoneCard />
          </div>
        </section>
      </div>
    </main>
  );
}
