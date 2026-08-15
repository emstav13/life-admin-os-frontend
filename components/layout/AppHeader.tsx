"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import LogoutButton from "@/components/ui/LogoutButton";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function AppHeader() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const linkClass = (href: string) =>
    `px-2.5 py-1.5 text-sm rounded-lg shadow transition whitespace-nowrap ${
      pathname === href
        ? "bg-black text-white"
        : `
          bg-white
          dark:bg-[#2B2724]

          text-gray-700
          dark:text-white

          border
          border-gray-200
          dark:border-[#3D3834]

          hover:bg-blue-50
          dark:hover:bg-[#3A3531]
        `
    }`;

  return (
    <header className="mb-8">
      <div className="flex items-center justify-between gap-6">
        <Link
          href="/"
          className="flex-shrink-0"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-sky-600 dark:text-sky-400 whitespace-nowrap">
            {t.appName}
          </h1>
        </Link>

        <nav className="flex items-center justify-end gap-2 flex-1">
          <Link href="/" className={linkClass("/")}>
             {t.dashboard}
          </Link>

          <Link
            href="/documents"
            className={linkClass("/documents")}
          >
             {t.documents}
          </Link>

          <Link
            href="/upload"
            className={linkClass("/upload")}
          >
             {t.upload}
          </Link>

          <Link
            href="/ai"
            className={linkClass("/ai")}
          >
             {t.useAI}
          </Link>

          <Link
            href="/briefing"
            className={linkClass("/briefing")}
          >
             {t.briefing}
          </Link>

          <Link
            href="/settings"
            className={linkClass("/settings")}
          >
             {t.settings}
          </Link>

          <LogoutButton />
        </nav>
      </div>
    </header>
  );
}