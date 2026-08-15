"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function NotificationCard() {
  const { t } = useLanguage();

  const [dashboard, setDashboard] = useState(true);
  const [email, setEmail] = useState(true);

  /*
   * ==========================================
   * LOAD SAVED SETTINGS
   * ==========================================
   */

  useEffect(() => {
    const savedDashboard =
      localStorage.getItem(
        "lifeaios_notifications_dashboard"
      );

    const savedEmail =
      localStorage.getItem(
        "lifeaios_notifications_email"
      );

    if (savedDashboard !== null) {
      setDashboard(
        savedDashboard === "true"
      );
    }

    if (savedEmail !== null) {
      setEmail(
        savedEmail === "true"
      );
    }
  }, []);

  /*
   * ==========================================
   * DASHBOARD NOTIFICATIONS
   * ==========================================
   */

  function toggleDashboard() {
    const newValue = !dashboard;

    setDashboard(newValue);

    localStorage.setItem(
      "lifeaios_notifications_dashboard",
      String(newValue)
    );
  }

  /*
   * ==========================================
   * EMAIL NOTIFICATIONS
   * ==========================================
   */

  function toggleEmail() {
    const newValue = !email;

    setEmail(newValue);

    localStorage.setItem(
      "lifeaios_notifications_email",
      String(newValue)
    );
  }

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

        transition-colors
      "
    >

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="mb-8">

        <h2
          className="
            text-2xl
            font-bold

            text-slate-900
            dark:text-white
          "
        >
          🔔 {t.notificationsTitle}
        </h2>

        <p
          className="
            text-gray-500
            dark:text-gray-400

            mt-2
          "
        >
          {t.manageNotifications}
        </p>

      </div>

      {/* ======================================
          NOTIFICATIONS
      ====================================== */}

      <div className="space-y-4">

        {/* ====================================
            DASHBOARD
        ==================================== */}

        <div
          className="
            flex
            items-center
            justify-between

            border
            border-gray-200
            dark:border-[#3D3834]

            rounded-xl

            p-5
          "
        >

          <div>

            <h3
              className="
                font-semibold

                text-slate-900
                dark:text-white
              "
            >
              {t.dashboardNotifications}
            </h3>

            <p
              className="
                text-sm

                text-gray-500
                dark:text-gray-400

                mt-1
              "
            >
              {t.receiveDashboardNotifications}
            </p>

          </div>

          <button
            type="button"
            role="switch"
            aria-checked={dashboard}
            onClick={toggleDashboard}
            className={`
              relative
              h-7
              w-14

              rounded-full

              transition

              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:ring-offset-2

              dark:focus:ring-offset-[#2B2724]

              ${
                dashboard
                  ? "bg-blue-600"
                  : "bg-gray-300 dark:bg-gray-600"
              }
            `}
          >

            <span
              className={`
                absolute
                top-1

                h-5
                w-5

                rounded-full

                bg-white

                shadow-sm

                transition-all

                ${
                  dashboard
                    ? "left-8"
                    : "left-1"
                }
              `}
            />

          </button>

        </div>

        {/* ====================================
            EMAIL
        ==================================== */}

        <div
          className="
            flex
            items-center
            justify-between

            border
            border-gray-200
            dark:border-[#3D3834]

            rounded-xl

            p-5
          "
        >

          <div>

            <h3
              className="
                font-semibold

                text-slate-900
                dark:text-white
              "
            >
              {t.emailNotifications}
            </h3>

            <p
              className="
                text-sm

                text-gray-500
                dark:text-gray-400

                mt-1
              "
            >
              {t.receiveEmailNotifications}
            </p>

          </div>

          <button
            type="button"
            role="switch"
            aria-checked={email}
            onClick={toggleEmail}
            className={`
              relative
              h-7
              w-14

              rounded-full

              transition

              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:ring-offset-2

              dark:focus:ring-offset-[#2B2724]

              ${
                email
                  ? "bg-blue-600"
                  : "bg-gray-300 dark:bg-gray-600"
              }
            `}
          >

            <span
              className={`
                absolute
                top-1

                h-5
                w-5

                rounded-full

                bg-white

                shadow-sm

                transition-all

                ${
                  email
                    ? "left-8"
                    : "left-1"
                }
              `}
            />

          </button>

        </div>

        {/* ====================================
            MOBILE PUSH — FUTURE
        ==================================== */}

        <div
          className="
            flex
            items-center
            justify-between

            border
            border-gray-200
            dark:border-[#3D3834]

            rounded-xl

            p-5

            opacity-60
          "
        >

          <div>

            <h3
              className="
                font-semibold

                text-slate-900
                dark:text-white
              "
            >
              {t.mobilePush}
            </h3>

            <p
              className="
                text-sm

                text-gray-500
                dark:text-gray-400

                mt-1
              "
            >
              {t.comingSoon}
            </p>

          </div>

          <div
            className="
              px-3
              py-1

              rounded-full

              bg-gray-200
              dark:bg-gray-700

              text-gray-600
              dark:text-gray-300

              text-sm
              font-medium
            "
          >
            {t.comingSoon}
          </div>

        </div>

      </div>

    </div>
  );
}