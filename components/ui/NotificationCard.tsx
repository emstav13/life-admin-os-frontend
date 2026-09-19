"use client";

import { useEffect, useState } from "react";
import { Bell, Mail, Monitor, Smartphone } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function NotificationCard() {
  const { t } = useLanguage();
  const [dashboard, setDashboard] = useState(true);
  const [email, setEmail] = useState(true);

  useEffect(() => {
    const savedDashboard = localStorage.getItem("lifeaios_notifications_dashboard");
    const savedEmail = localStorage.getItem("lifeaios_notifications_email");
    if (savedDashboard !== null) setDashboard(savedDashboard === "true");
    if (savedEmail !== null) setEmail(savedEmail === "true");
  }, []);

  function toggleDashboard() {
    const value = !dashboard;
    setDashboard(value);
    localStorage.setItem("lifeaios_notifications_dashboard", String(value));
  }

  function toggleEmail() {
    const value = !email;
    setEmail(value);
    localStorage.setItem("lifeaios_notifications_email", String(value));
  }

  const Toggle = ({ checked, onClick, label }: { checked: boolean; onClick: () => void; label: string }) => (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onClick}
      className="shrink-0 rounded-full border border-gray-300 bg-white p-1 shadow-sm transition-all hover:border-blue-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-[#4A4540] dark:bg-[#1F1C1A]"
    >
      <span className={`flex h-7 w-14 items-center rounded-full p-0.5 transition-all ${checked ? "justify-end bg-gradient-to-r from-blue-600 to-indigo-600" : "justify-start bg-[#403B37]"}`}>
        <span className="h-6 w-6 rounded-full bg-white shadow-md" />
      </span>
    </button>
  );

  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white p-8 shadow-sm transition-all hover:border-[#4A4540] dark:border-[#3D3834] dark:bg-[#2B2724]">
      <div className="border-b border-gray-100 px-7 py-6 dark:border-[#3D3834]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
            Life AiOS
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t.notificationsTitle}
          </h2>

          <p className="mt-1 max-w-xl text-sm text-gray-500 dark:text-gray-400">
            {t.manageNotifications}
          </p>
        </div>
      </div>

      <div className="space-y-3 p-8">
        <div className="flex items-center justify-between gap-6 rounded-xl border border-gray-200 bg-gray-50/50 px-5 py-4 dark:border-[#403B37] dark:bg-[#24211F]">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              <Monitor className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">{t.dashboardNotifications}</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t.receiveDashboardNotifications}</p>
            </div>
          </div>
          <Toggle checked={dashboard} onClick={toggleDashboard} label={t.dashboardNotifications} />
        </div>

        <div className="flex items-center justify-between gap-6 rounded-xl border border-gray-200 bg-gray-50/50 px-5 py-4 dark:border-[#403B37] dark:bg-[#24211F]">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
              <Mail className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">{t.emailNotifications}</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t.receiveEmailNotifications}</p>
            </div>
          </div>
          <Toggle checked={email} onClick={toggleEmail} label={t.emailNotifications} />
        </div>

        <div className="flex items-center justify-between gap-6 rounded-xl border border-gray-200 bg-gray-50/40 px-5 py-4 opacity-60 dark:border-[#403B37] dark:bg-[#24211F]">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-500/10 text-gray-400">
              <Smartphone className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">{t.mobilePush}</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t.comingSoon}</p>
            </div>
          </div>
          <span className="shrink-0 rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-500 shadow-sm dark:border-[#4A4540] dark:bg-[#1F1C1A] dark:text-gray-400">
            {t.comingSoon}
          </span>
        </div>
      </div>
    </div>
  );
}