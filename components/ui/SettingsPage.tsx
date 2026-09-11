"use client";

import AccountCard from "./AccountCard";
import AppearanceCard from "./AppearanceCard";
import LanguageCard from "./LanguageCard";
import NotificationCard from "./NotificationCard";
import SubscriptionCard from "./SubscriptionCard";
import PricingPlans from "./PricingPlans";
import DangerZoneCard from "./DangerZoneCard";
import ContactCard from "./ContactCard";

export default function SettingsPage() {
  return (
    <div className="w-full">
      <div className="mb-10">
        <div>
          <h1
            className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl"
          >
            Settings
          </h1>
        </div>

        <p className="mt-2 max-w-2xl text-base leading-7 text-slate-500 dark:text-gray-400">
          Manage your account, preferences, notifications and Life AiOS experience.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-gray-500">
              Account
            </p>
          </div>
          <AccountCard />
        </section>

        <section>
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-gray-500">
              Appearance
            </p>
          </div>
          <AppearanceCard />
        </section>

        <section>
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-gray-500">
              Preferences
            </p>
          </div>
          <LanguageCard />
        </section>

        <section>
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-gray-500">
              Notifications
            </p>
          </div>
          <NotificationCard />
        </section>

        <section>
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-gray-500">
              Plan
            </p>
          </div>
          <SubscriptionCard />
        </section>

        <section>
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-gray-500">
              Pricing
            </p>
          </div>
          <PricingPlans />
        </section>

        <section>
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-gray-500">
              Support
            </p>
          </div>
          <ContactCard />
        </section>

        <section>
          <div className="mb-4" />
          <DangerZoneCard />
        </section>
      </div>
    </div>
  );
}
