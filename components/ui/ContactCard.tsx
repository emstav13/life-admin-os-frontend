"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function ContactCard() {
  const { t } = useLanguage();

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
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
        📩 {t.contact}
      </h2>

      <p className="text-gray-500 dark:text-gray-400 mb-8">{t.needHelp}</p>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 rounded-xl border border-gray-200 dark:border-[#3D3834] p-6">
        <div>
          <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
            {t.sendEmail}
          </h3>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {t.contactDescription}
          </p>
        </div>

        <a
          href="mailto:support@lifeaios.com"
          className="
            px-6
            py-3

            rounded-xl

            bg-gradient-to-r
            from-blue-600
            to-indigo-600

            text-white
            font-semibold

            hover:opacity-90

            transition

            whitespace-nowrap
          "
        >
          📧 {t.sendEmail}
        </a>
      </div>
    </div>
  );
}
