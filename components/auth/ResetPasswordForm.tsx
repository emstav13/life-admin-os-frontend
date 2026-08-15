"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordForm() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleReset(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } =
      await supabase.auth.updateUser({
        password,
      });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Password updated successfully.");

    router.push("/login");
  }

  return (
    <>
      <h2 className="text-4xl font-bold dark:text-white">
        Reset password
      </h2>

      <p className="mt-3 text-gray-500 dark:text-gray-400">
        Choose a new password for your account.
      </p>

      <form
        onSubmit={handleReset}
        className="mt-10 space-y-6"
      >
        <div>
          <label className="block mb-2 text-sm font-medium dark:text-gray-300">
            New Password
          </label>

          <input
            type="password"
            required
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
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
              focus:ring-2
              focus:ring-blue-500
              focus:outline-none
            "
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium dark:text-gray-300">
            Confirm Password
          </label>

          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
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
              focus:ring-2
              focus:ring-blue-500
              focus:outline-none
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
            font-semibold
            text-white
          "
        >
          {loading
            ? "Updating..."
            : "Update Password"}
        </button>
      </form>
    </>
  );
}