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
        bg-red-600
        hover:bg-red-700
        text-white
        px-4
        py-2
        rounded
        transition
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}