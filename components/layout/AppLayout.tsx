"use client";

import { ReactNode } from "react";
import Link from "next/link";

import AuthGuard from "@/components/AuthGuard";
import AppHeader from "./AppHeader";
import NotificationCenter from "@/components/notifications/NotificationCenter";
import LogoutButton from "@/components/ui/LogoutButton";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({
  children,
}: AppLayoutProps) {
  return (
    <main
      className="
        min-h-screen

        bg-gradient-to-br
        from-slate-50
        via-blue-50
        to-gray-100

        dark:from-[#1E1B18]
        dark:via-[#24201D]
        dark:to-[#191715]

        transition-colors
        duration-300
      "
    >
      <AuthGuard />

      <NotificationCenter />

      {/* =====================================================
          SIDEBAR
          ===================================================== */}

      <AppHeader />

      {/* =====================================================
          MAIN AREA
          ===================================================== */}

      <div
        className="
          min-h-screen
          lg:pl-[250px]
        "
      >
        <div
          className="
            mx-auto
            flex
            min-h-screen
            w-full
            max-w-[1600px]
            flex-col

            px-4
            py-5

            sm:px-6
            sm:py-6

            lg:px-8
            lg:py-7

            xl:px-10
          "
        >
          {/* =================================================
              TOP BAR
              ================================================= */}

          <div
            className="
              mb-7
              flex
              items-center
              justify-between
              gap-4
            "
          >
            {/* MOBILE BRAND */}

            <Link
              href="/"
              className="
                flex
                items-center
                gap-3
                lg:hidden
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-600
                  text-lg
                  font-bold
                  text-white
                  shadow-lg
                  shadow-blue-600/20
                "
              >
                L
              </div>

              <div>
                <div
                  className="
                    text-lg
                    font-bold
                    tracking-tight
                    text-slate-950
                    dark:text-white
                  "
                >
                  Life AiOS
                </div>

                <div
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-slate-400
                    dark:text-slate-500
                  "
                >
                  AI Workspace
                </div>
              </div>
            </Link>

            {/* DESKTOP SPACER */}

            <div className="hidden flex-1 lg:block" />

            {/* LOGOUT */}

            <div
              className="
                flex
                shrink-0
                items-center
              "
            >
              <LogoutButton />
            </div>
          </div>

          {/* =================================================
              PAGE CONTENT
              ================================================= */}

          <div className="flex-1">
            {children}
          </div>

          {/* =================================================
              PREMIUM FOOTER
              ================================================= */}

          <footer className="mt-30 pb-2">
            <div
              className="
                border-t
                border-slate-200

                px-2
                pt-10
                pb-2

                text-center

                dark:border-[#3D3834]
              "
            >
              {/* BRAND */}

              <p
                className="
                  text-lg
                  font-bold
                  tracking-tight
                  text-slate-900

                  dark:text-white
                "
              >
                Life AiOS
              </p>

              <p
                className="
                  mt-1.5
                  text-sm
                  text-slate-500

                  dark:text-slate-400
                "
              >
                AI-powered administration workspace
              </p>

              {/* LINKS */}

              <nav
                className="
                  mt-5
                  flex
                  flex-wrap
                  items-center
                  justify-center
                  gap-2
                "
              >
                <Link
                  href="/privacy"
                  className="
                    rounded-full
                    border
                    border-slate-200
                    bg-white

                    px-3.5
                    py-1.5

                    text-xs
                    font-medium
                    text-slate-600

                    transition
                    hover:border-blue-200
                    hover:bg-blue-50
                    hover:text-blue-600

                    dark:border-[#3D3834]
                    dark:bg-[#2A2622]
                    dark:text-slate-300
                    dark:hover:border-blue-900/50
                    dark:hover:bg-blue-950/30
                    dark:hover:text-blue-300
                  "
                >
                  Privacy Policy
                </Link>

                <Link
                  href="/terms"
                  className="
                    rounded-full
                    border
                    border-slate-200
                    bg-white

                    px-3.5
                    py-1.5

                    text-xs
                    font-medium
                    text-slate-600

                    transition
                    hover:border-blue-200
                    hover:bg-blue-50
                    hover:text-blue-600

                    dark:border-[#3D3834]
                    dark:bg-[#2A2622]
                    dark:text-slate-300
                    dark:hover:border-blue-900/50
                    dark:hover:bg-blue-950/30
                    dark:hover:text-blue-300
                  "
                >
                  Terms of Service
                </Link>

                <Link
                  href="/cookies"
                  className="
                    rounded-full
                    border
                    border-slate-200
                    bg-white

                    px-3.5
                    py-1.5

                    text-xs
                    font-medium
                    text-slate-600

                    transition
                    hover:border-blue-200
                    hover:bg-blue-50
                    hover:text-blue-600

                    dark:border-[#3D3834]
                    dark:bg-[#2A2622]
                    dark:text-slate-300
                    dark:hover:border-blue-900/50
                    dark:hover:bg-blue-950/30
                    dark:hover:text-blue-300
                  "
                >
                  Cookie Policy
                </Link>

                <Link
                  href="/support"
                  className="
                    rounded-full
                    border
                    border-slate-200
                    bg-white

                    px-3.5
                    py-1.5

                    text-xs
                    font-medium
                    text-slate-600

                    transition
                    hover:border-blue-200
                    hover:bg-blue-50
                    hover:text-blue-600

                    dark:border-[#3D3834]
                    dark:bg-[#2A2622]
                    dark:text-slate-300
                    dark:hover:border-blue-900/50
                    dark:hover:bg-blue-950/30
                    dark:hover:text-blue-300
                  "
                >
                  Support
                </Link>
              </nav>

              {/* META */}

              <p
                className="
                  mt-6
                  text-[11px]
                  text-slate-400

                  dark:text-slate-500
                "
              >
                © 2026 Life AiOS <span className="mx-1.5">•</span> Version 1.0.0
              </p>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}