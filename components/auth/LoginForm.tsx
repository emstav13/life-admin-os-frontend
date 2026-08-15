"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      /*
       * IMPORTANT SECURITY RULE:
       *
       * The password is sent only to Supabase Auth.
       * It is NEVER stored in localStorage, sessionStorage,
       * cookies created by our application, or React state
       * beyond the current login form lifecycle.
       */

      const { error } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (error) {
        setErrorMessage(
          "Invalid email or password."
        );
        return;
      }

      /*
       * Remember Me
       *
       * We do NOT store the password.
       *
       * We store only the user's preference so that the
       * authentication layer can use it consistently.
       */

      try {
        if (rememberMe) {
          window.localStorage.setItem(
            "lifeaios_remember_me",
            "true"
          );
        } else {
          window.localStorage.removeItem(
            "lifeaios_remember_me"
          );
        }
      } catch {
        /*
         * Storage failure must never expose credentials
         * or prevent a successful authentication.
         */
      }

      /*
       * Clear the password from React state after
       * successful authentication.
       */

      setPassword("");

      router.push("/");
      router.refresh();
    } catch {
      setErrorMessage(
        "Unable to sign in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold dark:text-white">
        Welcome back
      </h1>

      <p className="mt-3 text-gray-500 dark:text-gray-400">
        Sign in to continue using Life AiOS.
      </p>

      {errorMessage && (
        <div
          role="alert"
          className="
            mt-6
            rounded-xl
            border
            border-red-200
            dark:border-red-900/50
            bg-red-50
            dark:bg-red-950/30
            px-4
            py-3
            text-sm
            text-red-700
            dark:text-red-400
          "
        >
          {errorMessage}
        </div>
      )}

      <form
        onSubmit={handleLogin}
        className="mt-10 space-y-6"
      >
        <div>
          <label
            htmlFor="email"
            className="
              block
              text-sm
              font-medium
              mb-2
              dark:text-gray-300
            "
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Enter your email"
            required
            autoComplete="email"
            disabled={loading}
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
              dark:placeholder:text-gray-400
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="
              block
              text-sm
              font-medium
              mb-2
              dark:text-gray-300
            "
          >
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Enter your password"
            required
            autoComplete="current-password"
            disabled={loading}
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
              dark:placeholder:text-gray-400
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          />
        </div>

        <div className="flex items-center justify-between">
          <label
            htmlFor="remember-me"
            className="
              flex
              items-center
              gap-2
              text-sm
              dark:text-gray-300
              cursor-pointer
            "
          >
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) =>
                setRememberMe(e.target.checked)
              }
              disabled={loading}
              className="rounded"
            />

            Remember me
          </label>

          <Link
            href="/forgot-password"
            className="
              text-blue-600
              hover:underline
              text-sm
            "
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={
            loading ||
            !email.trim() ||
            !password
          }
          className="
            w-full
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            py-3
            font-semibold
            text-white
            hover:opacity-90
            transition
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {loading
            ? "Signing in..."
            : "Login"}
        </button>
      </form>

      <p
        className="
          mt-8
          text-center
          text-gray-500
          dark:text-gray-400
        "
      >
        Don't have an account?

        <Link
          href="/register"
          className="
            ml-2
            text-blue-600
            hover:underline
            font-semibold
          "
        >
          Create account
        </Link>
      </p>
    </>
  );
}