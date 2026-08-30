"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error(
          "Logout failed:",
          error
        );

        return;
      }

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error(
        "Unexpected logout error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      aria-label="Logout"
      className="
        inline-flex
        items-center
        gap-2

        rounded-xl

        border
        border-slate-200
        bg-white

        px-3.5
        py-2

        text-sm
        font-semibold

        text-slate-600

        shadow-sm

        hover:border-red-200
        hover:bg-red-50
        hover:text-red-600

        dark:border-[#403A35]
        dark:bg-[#2B2724]
        dark:text-slate-300
        dark:hover:border-red-900
        dark:hover:bg-red-950/30
        dark:hover:text-red-300

        disabled:cursor-not-allowed
        disabled:opacity-50

        transition-all
        duration-200
      "
    >
      <span className="text-sm">
        ⇥
      </span>

      <span>
        {loading ? "Logging out..." : "Logout"}
      </span>
    </button>
  );
}