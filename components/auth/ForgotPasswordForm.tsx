"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleReset(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const { error } =
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo:
          "http://localhost:3000/reset-password",
      });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setSuccess(true);
  }

  return (
    <>
      <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
        Forgot password
      </h2>

      <p className="mt-3 text-gray-500 dark:text-gray-400">
        Enter your email and we'll send you a password reset link.
      </p>

      {success ? (
        <div className="mt-10 rounded-xl bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 p-5">
          <p className="text-green-700 dark:text-green-300 font-medium">
            ✅ Password reset email sent.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleReset}
          className="mt-10 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                dark:border-[#3D3834]
                bg-white
                dark:bg-[#34302D]
                px-4
                py-3
                dark:text-white
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          <button
            disabled={loading}
            className="
              w-full
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              py-3
              text-white
              font-semibold
            "
          >
            {loading
              ? "Sending..."
              : "Send reset link"}
          </button>
        </form>
      )}

      <p className="mt-8 text-center">
        <Link
          href="/login"
          className="text-blue-600 hover:underline"
        >
          ← Back to Login
        </Link>
      </p>
    </>
  );
}