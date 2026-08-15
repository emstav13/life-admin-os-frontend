"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/verify-email",
  "/update-password",
  "/terms",
  "/privacy",
  "/cookies",
  "/support",
  "/contact",
];

export default function AuthGuard() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let mounted = true;

    async function checkUser() {
      if (PUBLIC_ROUTES.includes(pathname)) {
        return;
      }

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!mounted) {
        return;
      }

      if (error || !user) {
        router.replace("/login");
      }
    }

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) {
          return;
        }

        if (!session) {
          router.replace("/login");
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [pathname, router]);

  return null;
}