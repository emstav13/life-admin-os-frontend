"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function ContactCard() {
  const { t } = useLanguage();

  return (
    <div
      className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)] dark:border-[#3D3834] dark:bg-[#2B2724]"
    >
      <div className="border-b border-gray-100 px-7 py-6 dark:border-[#3D3834]">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
          Life AiOS
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {t.contact}
        </h2>
        <p className="mt-1 max-w-xl text-sm text-gray-500 dark:text-gray-400">
          {t.needHelp}
        </p>
      </div>

      <div className="p-7">
        <div className="flex flex-col gap-6 rounded-xl border border-gray-200 bg-gray-50/70 p-6 dark:border-[#403B37] dark:bg-[#24211F] md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
            {t.sendEmail}
          </h3>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {t.contactDescription}
          </p>
        </div>

        <a
          href="mailto:support@lifeaios.online"
          className="
            px-6
            py-3

            rounded-xl

            bg-gradient-to-r
            from-blue-600
            to-indigo-600

            text-white
            font-semibold

            hover:-translate-y-0.5
            hover:shadow-lg
            hover:shadow-blue-500/15

            transition

            whitespace-nowrap
          "
        >
          📧 {t.sendEmail}
        </a>
        </div>
      </div>
    </div>
  );
}
