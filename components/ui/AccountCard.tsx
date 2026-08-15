"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useLanguage } from "@/components/providers/LanguageProvider";

type UserType = {
  email?: string;
  user_metadata?: {
    full_name?: string;
  };
};

export default function AccountCard() {
  const { t } = useLanguage();

  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user as UserType | null);
    }

    loadUser();
  }, []);

  async function changePassword() {
    if (!user?.email) return;

    const { error } =
      await supabase.auth.resetPasswordForEmail(
        user.email,
        {
          redirectTo:
            "http://localhost:3000/update-password",
        }
      );

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(
      t.passwordResetSent ??
        "Password reset email sent."
    );
  }

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
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          👤 {t.account ?? "Account"}
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          {t.manageAccount ??
            "Manage your personal account information."}
        </p>
      </div>

      <div className="space-y-8">

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {t.name ?? "Name"}
          </p>

          <div
            className="
              inline-flex
              items-center
              gap-2

              rounded-full

              px-4
              py-2

              font-semibold

              bg-gray-100
              dark:bg-[#34302D]

              text-slate-900
              dark:text-white
            "
          >
            👤

            {user?.user_metadata?.full_name ??
              t.completeProfile ??
              "Complete your profile"}
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {t.email ?? "Email"}
          </p>

          <div
            className="
              inline-flex
              items-center
              gap-2

              rounded-full

              px-4
              py-2

              font-medium

              bg-blue-50
              dark:bg-blue-900/20

              text-blue-700
              dark:text-blue-300
            "
          >
            📧

            {user?.email ??
              t.noEmail ??
              "No email"}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <div>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t.password ?? "Password"}
            </p>

            <p className="font-semibold mt-1 text-slate-900 dark:text-white">
              {t.securedWithSupabase ??
                "Secured with Supabase Auth"}
            </p>

          </div>

          <button
            onClick={changePassword}
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
            "
          >
            {t.changePassword ??
              "Change Password"}
          </button>

        </div>

      </div>
    </div>
  );
}