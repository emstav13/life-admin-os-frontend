"use client";

import { ReactNode } from "react";
import Link from "next/link";

import AuthGuard from "@/components/AuthGuard";
import AppHeader from "./AppHeader";
import NotificationCenter from "@/components/notifications/NotificationCenter";

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

        px-4
        py-6
        md:px-8
        lg:px-10
      "
    >
      <AuthGuard />

      {/* ==========================================
          GLOBAL NOTIFICATIONS
          ========================================== */}

      <NotificationCenter />

      <div className="max-w-6xl mx-auto min-h-screen flex flex-col">

        <AppHeader />

        <div className="flex-1">
          {children}
        </div>

        {/* ==========================================
            FOOTER
            ========================================== */}

        <footer className="mt-10 pb-4">

          <div
            className="
              bg-white
              dark:bg-[#2B2724]

              border
              border-gray-200
              dark:border-[#3D3834]

              rounded-2xl
              shadow-md

              px-8
              py-5

              text-center

              transition-colors
              duration-300
            "
          >

            <h3
              className="
                text-xl
                font-bold
                text-slate-800
                dark:text-white
              "
            >
              Life AiOS
            </h3>

            <p
              className="
                text-sm
                text-gray-500
                dark:text-gray-400
                mt-1
              "
            >
              AI-powered document management platform.
            </p>

            <div
              className="
                flex
                justify-center
                flex-wrap
                gap-3
                mt-4
              "
            >

              <Link
                href="/privacy"
                className="
                  px-3
                  py-1
                  rounded-full

                  bg-gray-100
                  dark:bg-[#3A3531]

                  text-gray-700
                  dark:text-gray-200

                  hover:bg-blue-100
                  hover:text-blue-600

                  transition
                  text-sm
                "
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="
                  px-3
                  py-1
                  rounded-full

                  bg-gray-100
                  dark:bg-[#3A3531]

                  text-gray-700
                  dark:text-gray-200

                  hover:bg-blue-100
                  hover:text-blue-600

                  transition
                  text-sm
                "
              >
                Terms of Service
              </Link>

              <Link
                href="/cookies"
                className="
                  px-3
                  py-1
                  rounded-full

                  bg-gray-100
                  dark:bg-[#3A3531]

                  text-gray-700
                  dark:text-gray-200

                  hover:bg-blue-100
                  hover:text-blue-600

                  transition
                  text-sm
                "
              >
                Cookie Policy
              </Link>

              <Link
                href="/support"
                className="
                  px-3
                  py-1
                  rounded-full

                  bg-gray-100
                  dark:bg-[#3A3531]

                  text-gray-700
                  dark:text-gray-200

                  hover:bg-blue-100
                  hover:text-blue-600

                  transition
                  text-sm
                "
              >
                Support
              </Link>

            </div>

            <div
              className="
                w-20
                h-px
                bg-gray-300
                dark:bg-[#45403B]
                mx-auto
                my-4
              "
            />

            <p
              className="
                text-xs
                text-gray-400
                dark:text-gray-500
              "
            >
              © 2026 Life AiOS • Version 1.0.0
            </p>

          </div>

        </footer>

      </div>

    </main>
  );
}