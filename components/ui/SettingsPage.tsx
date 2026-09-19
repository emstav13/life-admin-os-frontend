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
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div className="px-1">
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
    <main className="settings-page mx-auto w-full max-w-none pb-24">
      <header className="mb-10 pb-1">
        <div className="mt-2">
          <div>
            <h1 className="text-[40px] leading-[1.1] font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">
              Settings
            </h1>
            <p className="mt-2 text-[18px] leading-7 text-gray-500 dark:text-gray-400">
              Manage your account, preferences, subscription and security.
            </p>
          </div>
        </div>
      </header>

      <div className="space-y-12">
        <Section
          title="Profile"
          description="Your personal account information and password."
        >
          <AccountCard />
        </Section>

        <Section
          title="Preferences"
          description="Customize the appearance, language and notifications of Life AiOS."
        >
          <AppearanceCard />
          <LanguageCard />
          <NotificationCard />
        </Section>

        <Section
          title="Subscription & Billing"
          description="Review your current plan, document usage and subscription."
        >
          <SubscriptionCard />
          <PricingPlans currentPlan={currentPlan} />
        </Section>

        <Section
          title="Support"
          description="Get help with your account or contact the Life AiOS team."
        >
          <ContactCard />
        </Section>

        <Section
          title="Security & Data"
          description="Manage sensitive account actions and your stored data."
        >
          <DangerZoneCard />
        </Section>
      </div>
    </main>
  );
}
