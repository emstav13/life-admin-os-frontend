"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";

import { supabase } from "@/lib/supabase";
import AppHeader from "./AppHeader";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({
  children,
}: PublicLayoutProps) {

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
      <div className="max-w-6xl mx-auto min-h-screen flex flex-col">

        {loading ? null : loggedIn ? (

          <AppHeader />

        ) : (

          <header className="flex items-center justify-between py-6 px-6">

            <Link
              href="/"
              className="text-3xl font-bold dark:text-white"
            >
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

        <div className="flex-1 px-6 py-10">

          {children}

        </div>
                <footer className="px-6 pb-8">

          <div
            className="
              rounded-2xl

              bg-white
              dark:bg-[#2B2724]

              border
              border-gray-200
              dark:border-[#3D3834]

              shadow-md

              p-6

              text-center
            "
          >

            <h3 className="text-xl font-bold dark:text-white">
              Life AOS
            </h3>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              AI-powered document management platform.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-5">

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

            <div className="w-20 h-px bg-gray-300 dark:bg-[#45403B] mx-auto my-5" />

            <p className="text-xs text-gray-400 dark:text-gray-500">
              © 2026 Life AiOS • Version 1.0.0
            </p>

          </div>

        </footer>

      </div>

    </main>
  );
}