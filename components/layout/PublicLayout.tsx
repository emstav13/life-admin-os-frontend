"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";

import { supabase } from "@/lib/supabase";
import AppHeader from "./AppHeader";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setLoggedIn(!!user);
      setLoading(false);
    }

    checkUser();
  }, []);

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
      {loading ? null : loggedIn && <AppHeader />}

      <div
        className={`
          min-h-screen
          flex
          flex-col

          ${loggedIn ? "lg:pl-[250px]" : ""}
        `}
      >
        <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
          {loading ? null : loggedIn ? null : (
            <header className="flex items-center justify-between py-6 px-6">
              <Link href="/" className="text-3xl font-bold dark:text-white">
                Life AiOS
              </Link>

              <nav className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="
                    text-gray-700
                    dark:text-white

                    hover:text-blue-600

                    transition
                  "
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="
                    rounded-xl

                    bg-blue-600

                    px-4
                    py-2

                    text-white

                    hover:bg-blue-700

                    transition
                  "
                >
                  Create Account
                </Link>
              </nav>
            </header>
          )}

          <div className="flex-1 px-6 py-10">{children}</div>

          <footer className="mt-12 pb-3 px-6">
            <div
              className="
              border-t
              border-slate-200

              px-2
              py-8

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