"use client";

import AccountCard from "./AccountCard";
import AppearanceCard from "./AppearanceCard";
import LanguageCard from "./LanguageCard";
import NotificationCard from "./NotificationCard";
import SubscriptionCard from "./SubscriptionCard";
import DangerZoneCard from "./DangerZoneCard";
import ContactCard from "./ContactCard";

export default function SettingsPage() {
  return (
    <div className="w-full">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="mb-10">

  <div>

    

    <h1
      className="
        text-3xl
        md:text-4xl
        font-bold
        tracking-tight
        text-slate-900
        dark:text-white
      "
    >
    </h1>

  </div>

  <p
    className="
      max-w-2xl
      text-base
      leading-7
      text-slate-500
      dark:text-gray-400
      mt-2
    "
  >
    Manage your account, preferences, notifications and
    Life AiOS experience.
  </p>

</div>


      {/* ==========================================
          SETTINGS CONTENT
      ========================================== */}

      <div className="space-y-8">


        {/* ==========================================
            ACCOUNT
        ========================================== */}

        <section>

          <div className="mb-4">

            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.16em]

                text-slate-400
                dark:text-gray-500
              "
            >
              Account
            </p>

          </div>

          <AccountCard />

        </section>


        {/* ==========================================
            APPEARANCE
        ========================================== */}

        <section>

          <div className="mb-4">

            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.16em]

                text-slate-400
                dark:text-gray-500
              "
            >
              Appearance
            </p>

          </div>

          <AppearanceCard />

        </section>


        {/* ==========================================
            PREFERENCES
        ========================================== */}

        <section>

          <div className="mb-4">

            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.16em]

                text-slate-400
                dark:text-gray-500
              "
            >
              Preferences
            </p>

          </div>

          <LanguageCard />

        </section>


        {/* ==========================================
            NOTIFICATIONS
        ========================================== */}

        <section>

          <div className="mb-4">

            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.16em]

                text-slate-400
                dark:text-gray-500
              "
            >
              Notifications
            </p>

          </div>

          <NotificationCard />

        </section>


        {/* ==========================================
            PLAN
        ========================================== */}

        <section>

          <div className="mb-4">

            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.16em]

                text-slate-400
                dark:text-gray-500
              "
            >
              Plan
            </p>

          </div>

          <SubscriptionCard />

        </section>


        {/* ==========================================
            CONTACT
        ========================================== */}

        <section>

          <div className="mb-4">

            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.16em]

                text-slate-400
                dark:text-gray-500
              "
            >
              Support
            </p>

          </div>

          <ContactCard />

        </section>


        {/* ==========================================
            DANGER ZONE
        ========================================== */}

        <section>

          <div className="mb-4">

            
          </div>

          <DangerZoneCard />

        </section>

      </div>

    </div>
  );
}