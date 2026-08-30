"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useLanguage } from "@/components/providers/LanguageProvider";

/* =========================================================
   MINIMAL LINE ICONS
   ========================================================= */

function IconHome({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9" />
    </svg>
  );
}

function IconDocuments({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 3.5h7l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V5A1.5 1.5 0 0 1 7 3.5Z" />
      <path d="M14 3.5V8h4" />
      <path d="M9 12.5h6M9 16h4" />
    </svg>
  );
}

function IconUpload({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 15V4" />
      <path d="M8 8l4-4 4 4" />
      <path d="M5 15v3.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V15" />
    </svg>
  );
}

function IconSparkle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3.5c.5 3 2 4.5 5 5-3 .5-4.5 2-5 5-.5-3-2-4.5-5-5 3-.5 4.5-2 5-5Z" />
      <path d="M18.5 15c.25 1.4.95 2.1 2.35 2.35-1.4.25-2.1.95-2.35 2.35-.25-1.4-.95-2.1-2.35-2.35 1.4-.25 2.1-.95 2.35-2.35Z" />
    </svg>
  );
}

function IconClock({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.5l3 2" />
    </svg>
  );
}

function IconSettings({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="2.75" />
      <path d="M19.4 13.5a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.56V19.5a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.11-1.56 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1.04H4.5a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.56-1.11 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H10.5a1.7 1.7 0 0 0 1.04-1.56V4.5a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1.04 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.09c.18.72.78 1.27 1.56 1.04h.09a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.56 1.04Z" />
    </svg>
  );
}

function IconSupport({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="8.25" />
      <path d="M9.6 9.6a2.4 2.4 0 1 1 3.15 2.28c-.6.24-1.05.75-1.05 1.62v.3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

/* =========================================================
   LEGAL ICONS
   ========================================================= */

function IconPrivacy({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3.5 19 6v5.5c0 4.4-2.9 7.5-7 9-4.1-1.5-7-4.6-7-9V6l7-2.5Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function IconTerms({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 3.5h7l4 4V20H7a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2Z" />
      <path d="M14 3.5V8h4" />
      <path d="M8.5 12h7M8.5 15.5h7" />
    </svg>
  );
}

function IconCookies({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19.5 12.5a7.5 7.5 0 1 1-8-8c.2 2.1 1.9 3.8 4 4 1.3.1 2.5-.2 3.4-.9.4 1.5.6 3 .6 4.9Z" />
      <circle cx="9" cy="14" r="1" />
      <circle cx="14" cy="17" r="1" />
      <circle cx="8" cy="9" r="1" />
    </svg>
  );
}

export default function AppHeader() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const itemClass = (href: string) =>
    `
      group
      relative
      flex
      w-full
      items-center
      gap-3
      rounded-xl
      px-3
      py-2.5
      text-sm
      font-medium
      transition-all
      duration-200
      ${
        isActive(href)
          ? `
            bg-blue-50
            text-blue-700
            dark:bg-blue-950/40
            dark:text-blue-300
          `
          : `
            text-slate-600
            hover:bg-slate-100
            hover:text-slate-950
            dark:text-slate-300
            dark:hover:bg-[#2E2A26]
            dark:hover:text-white
          `
      }
    `;

  const iconWrapClass = (href: string) =>
    `
      flex
      h-5
      w-5
      shrink-0
      items-center
      justify-center
      transition-colors
      duration-200
      ${
        isActive(href)
          ? "text-blue-600 dark:text-blue-300"
          : "text-slate-400 group-hover:text-slate-700 dark:text-slate-500 dark:group-hover:text-slate-200"
      }
    `;

  const legalItemClass = (href: string) =>
    `
      group
      flex
      w-full
      items-center
      gap-3
      rounded-lg
      px-3
      py-2
      text-xs
      font-medium
      transition-all
      duration-200
      ${
        isActive(href)
          ? `
            bg-slate-100
            text-slate-900
            dark:bg-[#302B27]
            dark:text-white
          `
          : `
            text-slate-500
            hover:bg-slate-100
            hover:text-slate-800
            dark:text-slate-400
            dark:hover:bg-[#2E2A26]
            dark:hover:text-slate-200
          `
      }
    `;

  const navItems = [
    { href: "/", label: t.dashboard, icon: IconHome },
    {
      href: "/documents",
      label: t.documents,
      icon: IconDocuments,
    },
    {
      href: "/upload",
      label: t.upload,
      icon: IconUpload,
    },
    {
      href: "/ai",
      label: t.useAI,
      icon: IconSparkle,
    },
    {
      href: "/briefing",
      label: t.briefing,
      icon: IconClock,
    },
  ];

  const systemItems = [
    {
      href: "/settings",
      label: t.settings,
      icon: IconSettings,
    },
    {
      href: "/support",
      label: "Support",
      icon: IconSupport,
    },
  ];

  const legalItems = [
    {
      href: "/privacy",
      label: "Privacy Policy",
      icon: IconPrivacy,
    },
    {
      href: "/terms",
      label: "Terms of Service",
      icon: IconTerms,
    },
    {
      href: "/cookies",
      label: "Cookie Policy",
      icon: IconCookies,
    },
  ];

  return (
    <aside
      className="
        fixed
        inset-y-0
        left-0
        z-40
        hidden
        w-[250px]
        flex-col
        border-r
        border-slate-200
        bg-white
        dark:border-[#3D3834]
        dark:bg-[#25211F]
        lg:flex
      "
    >
      {/* =====================================================
          BRAND
          ===================================================== */}

      <div
        className="
          flex
          h-[88px]
          shrink-0
          items-center
          border-b
          border-slate-200
          px-5
          dark:border-[#3D3834]
        "
      >
        <Link href="/" className="group min-w-0">
          <h1
            className="
              text-[20px]
              font-bold
              tracking-tight
              text-slate-950
              dark:text-white
            "
          >
            {t.appName}
          </h1>

          <p
            className="
              mt-1
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.17em]
              text-slate-400
              dark:text-slate-500
            "
          >
            AI Workspace
          </p>
        </Link>
      </div>

      {/* =====================================================
          NAVIGATION
          ===================================================== */}

      <nav
        className="
          flex-1
          overflow-y-auto
          px-4
          py-6
        "
      >
        <p
          className="
            mb-2
            px-3
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-slate-400
            dark:text-slate-500
          "
        >
          Workspace
        </p>

        <div className="space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={itemClass(href)}>
              {isActive(href) && (
                <span
                  className="
                      absolute
                      left-0
                      top-1/2
                      h-4
                      w-[3px]
                      -translate-y-1/2
                      rounded-full
                      bg-blue-600
                      dark:bg-blue-400
                    "
                />
              )}

              <span className={iconWrapClass(href)}>
                <Icon className="h-[18px] w-[18px]" />
              </span>

              <span>{label}</span>
            </Link>
          ))}
        </div>

        {/* =====================================================
            SYSTEM
            ===================================================== */}

        <p
          className="
            mb-2
            mt-8
            px-3
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-slate-400
            dark:text-slate-500
          "
        >
          System
        </p>

        <div className="space-y-1">
          {systemItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={itemClass(href)}>
              {isActive(href) && (
                <span
                  className="
                      absolute
                      left-0
                      top-1/2
                      h-4
                      w-[3px]
                      -translate-y-1/2
                      rounded-full
                      bg-blue-600
                      dark:bg-blue-400
                    "
                />
              )}

              <span className={iconWrapClass(href)}>
                <Icon className="h-[18px] w-[18px]" />
              </span>

              <span>{label}</span>
            </Link>
          ))}
        </div>

        {/* =====================================================
            LEGAL
            ===================================================== */}

        <p
          className="
            mb-2
            mt-7
            px-3
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-slate-400
            dark:text-slate-500
          "
        >
          Legal
        </p>

        <div className="space-y-0.5">
          {legalItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={legalItemClass(href)}>
              <span
                className="
                    flex
                    h-5
                    w-5
                    shrink-0
                    items-center
                    justify-center
                    text-slate-400
                    transition-colors
                    group-hover:text-slate-700
                    dark:text-slate-500
                    dark:group-hover:text-slate-200
                  "
              >
                <Icon className="h-4 w-4" />
              </span>

              <span>{label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* =====================================================
          ACCOUNT
          ===================================================== */}

      <div
        className="
          shrink-0
          border-t
          border-slate-200
          p-4
          dark:border-[#3D3834]
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            p-3
            dark:border-[#403A35]
            dark:bg-[#2E2926]
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-slate-800
              to-slate-950
              text-xs
              font-bold
              text-white
              dark:from-white
              dark:to-slate-200
              dark:text-slate-900
            "
          >
            U
          </div>

          <div className="min-w-0">
            <p
              className="
                truncate
                text-xs
                font-semibold
                text-slate-900
                dark:text-white
              "
            >
              Your account
            </p>

            <p
              className="
                mt-0.5
                truncate
                text-[11px]
                text-slate-500
                dark:text-slate-400
              "
            >
              Life AiOS workspace
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}