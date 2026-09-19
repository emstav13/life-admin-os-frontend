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

type SubscriptionData = { plan: "free" | "pro" | "pro_plus" | string };

function Section({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div className="px-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400 dark:text-gray-500">
          {number}
        </p>
        <h2 className="mt-1 text-[15px] font-semibold text-slate-900 dark:text-white">
          {title}
        </h2>
        <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export default function SettingsPage() {
  const [currentPlan, setCurrentPlan] = useState<string | undefined>();

  useEffect(() => {
    let mounted = true;
    async function loadSubscription() {
      try {
        const response = await authFetch("/subscription");
        if (!response.ok) return;
        const data: SubscriptionData = await response.json();
        if (mounted) setCurrentPlan(data.plan);
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
    <main className="mx-auto w-full max-w-[920px] pb-24">
      <header className="mb-10 border-b border-gray-200 pb-7 dark:border-[#3D3834]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
          Account
        </p>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">
              Settings
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Manage your account, preferences, subscription and security.
            </p>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Life AiOS
          </p>
        </div>
      </header>

      <div className="space-y-12">
        <Section
          number="01"
          title="Profile"
          description="Your personal account information and password."
        >
          <AccountCard />
        </Section>

        <Section
          number="02"
          title="Preferences"
          description="Customize the appearance, language and notifications of Life AiOS."
        >
          <AppearanceCard />
          <LanguageCard />
          <NotificationCard />
        </Section>

        <Section
          number="03"
          title="Subscription & Billing"
          description="Review your current plan, document usage and subscription."
        >
          <SubscriptionCard />
          <PricingPlans currentPlan={currentPlan} />
        </Section>

        <Section
          number="04"
          title="Support"
          description="Get help with your account or contact the Life AiOS team."
        >
          <ContactCard />
        </Section>

        <Section
          number="05"
          title="Security & Data"
          description="Manage sensitive account actions and your stored data."
        >
          <DangerZoneCard />
        </Section>
      </div>
    </main>
  );
}
