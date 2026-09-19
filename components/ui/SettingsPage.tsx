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

function GroupLabel({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="border-b border-slate-200 pb-3 dark:border-[#3D3834]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
        {eyebrow}
      </p>
      <h2 className="mt-1 text-sm font-semibold tracking-tight text-slate-800 dark:text-slate-200">
        {title}
      </h2>
    </div>
  );
}

export default function SettingsPage() {
  const [currentPlan, setCurrentPlan] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    let mounted = true;

    async function loadSubscription() {
      try {
        const response = await authFetch("/subscription");

        if (!response.ok) {
          return;
        }

        const data: SubscriptionData =
          await response.json();

        if (mounted) {
          setCurrentPlan(data.plan);
        }
      } catch (error) {
        console.error(
          "Settings subscription error:",
          error
        );
      }
    }

    loadSubscription();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-[1180px]">
      <header className="mb-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
          Account
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-[-0.02em] text-slate-950 dark:text-white md:text-4xl">
          Settings
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-400">
          Manage your account, preferences, notifications,
          subscription, and security settings.
        </p>
      </header>

      <div className="space-y-12">
        <section className="space-y-6">
          <GroupLabel
            eyebrow="Profile"
            title="Account and personal preferences"
          />

          <div className="space-y-6">
            <AccountCard />
            <AppearanceCard />
            <LanguageCard />
            <NotificationCard />
          </div>
        </section>

        <section className="space-y-6">
          <GroupLabel
            eyebrow="Billing"
            title="Subscription and plans"
          />

          <div className="space-y-6">
            <SubscriptionCard />
            <PricingPlans currentPlan={currentPlan} />
          </div>
        </section>

        <section className="space-y-6">
          <GroupLabel
            eyebrow="Support"
            title="Help and account assistance"
          />

          <ContactCard />
        </section>

        <section className="space-y-6">
          <GroupLabel
            eyebrow="Security"
            title="Account protection and data controls"
          />

          <DangerZoneCard />
        </section>
      </div>
    </div>
  );
}
