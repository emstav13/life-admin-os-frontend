"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "sonner";

import { supabase } from "@/lib/supabase";
import PasswordStrength from "@/components/auth/PasswordStrength";
import { validatePassword } from "@/lib/password";

export default function RegisterForm() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [
    acceptTerms,
    setAcceptTerms,
  ] = useState(false);

  const [loading, setLoading] = useState(false);

  /*
   * ==========================================
   * VALIDATION
   * ==========================================
   */

  const passwordValidation =
    validatePassword(password);

  const passwordsMatch =
    password === confirmPassword &&
    confirmPassword.length > 0;

  const emailValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email
    );

  const fullNameValid =
    /^[A-Za-zÀ-ÿΑ-Ωα-ω' -]{2,}$/.test(
      fullName
    );

  /*
   * ==========================================
   * REGISTER
   * ==========================================
   */

  async function handleRegister(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!fullNameValid) {
      toast.error(
        "Please enter your full name."
      );
      return;
    }

    if (!emailValid) {
      toast.error(
        "Please enter a valid email."
      );
      return;
    }

    if (!passwordValidation.valid) {
      toast.error(
        "Please choose a stronger password."
      );
      return;
    }

    if (!passwordsMatch) {
      toast.error(
        "Passwords do not match."
      );
      return;
    }

    if (!acceptTerms) {
      toast.error(
        "You must accept the Terms and Privacy Policy."
      );
      return;
    }

    setLoading(true);

    const { error } =
  await supabase.auth.signUp({
    email,
    password,

    options: {
      emailRedirectTo:
        `${window.location.origin}/verify-email`,

      data: {
        full_name: fullName,

        terms_accepted: true,

        privacy_accepted: true,

        accepted_at:
          new Date().toISOString(),
      },
    },
  });

    setLoading(false);

    if (error) {
      toast.error(
        "Unable to create your account. Please try again."
      );
      return;
    }

    toast.success(
      "Account created successfully."
    );

    router.push("/verify-email");
  }

  return (
    <>
      {/* ======================================
          HEADER
      ====================================== */}

      <h1
        className="
          text-4xl
          font-bold

          dark:text-white
        "
      >
        Create your account
      </h1>

      <p
        className="
          mt-2

          text-gray-500
          dark:text-gray-400
        "
      >
        Start managing your documents with AI.
      </p>

      {/* ======================================
          FORM
      ====================================== */}

      <form
        onSubmit={handleRegister}
        className="
          mt-6
          space-y-4
        "
      >

        {/* ==================================
            FULL NAME
        ================================== */}

        <div>

          <label
            className="
              block

              text-sm
              font-medium

              mb-1.5

              dark:text-gray-300
            "
          >
            Full Name
          </label>

          <input
            type="text"
            autoComplete="name"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
            placeholder="John Doe"
            required
            className="
              w-full

              rounded-xl

              border
              border-gray-300
              dark:border-[#3D3834]

              bg-white
              dark:bg-[#34302D]

              px-4
              py-2.5

              dark:text-white
              dark:placeholder:text-gray-400

              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          {fullName.length > 0 && (
            <p
              className={`
                mt-1

                text-xs

                ${
                  fullNameValid
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }
              `}
            >
              {fullNameValid
                ? "✔ Valid name"
                : "✖ Please enter your full name"}
            </p>
          )}

        </div>

        {/* ==================================
            EMAIL
        ================================== */}

        <div>

          <label
            className="
              block

              text-sm
              font-medium

              mb-1.5

              dark:text-gray-300
            "
          >
            Email
          </label>

          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="example@email.com"
            required
            className="
              w-full

              rounded-xl

              border
              border-gray-300
              dark:border-[#3D3834]

              bg-white
              dark:bg-[#34302D]

              px-4
              py-2.5

              dark:text-white
              dark:placeholder:text-gray-400

              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          {email.length > 0 && (
            <p
              className={`
                mt-1

                text-xs

                ${
                  emailValid
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }
              `}
            >
              {emailValid
                ? "✔ Valid email"
                : "✖ Invalid email address"}
            </p>
          )}

        </div>

        {/* ==================================
            PASSWORD
        ================================== */}

        <div>

          <label
            className="
              block

              text-sm
              font-medium

              mb-1.5

              dark:text-gray-300
            "
          >
            Password
          </label>

          <div className="relative">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              autoComplete="new-password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Create a strong password"
              required
              className="
                w-full

                rounded-xl

                border
                border-gray-300
                dark:border-[#3D3834]

                bg-white
                dark:bg-[#34302D]

                px-4
                py-2.5
                pr-14

                dark:text-white
                dark:placeholder:text-gray-400

                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="
                absolute

                right-4
                top-1/2

                -translate-y-1/2

                text-gray-500

                hover:text-blue-600

                transition
              "
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <FiEyeOff size={19} />
              ) : (
                <FiEye size={19} />
              )}
            </button>

          </div>

          <div className="mt-1.5">
            <PasswordStrength
              password={password}
            />
          </div>

        </div>

        {/* ==================================
            CONFIRM PASSWORD
        ================================== */}

        <div>

          <label
            className="
              block

              text-sm
              font-medium

              mb-1.5

              dark:text-gray-300
            "
          >
            Confirm Password
          </label>

          <div className="relative">

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              onPaste={(e) =>
                e.preventDefault()
              }
              placeholder="Confirm your password"
              required
              className="
                w-full

                rounded-xl

                border
                border-gray-300
                dark:border-[#3D3834]

                bg-white
                dark:bg-[#34302D]

                px-4
                py-2.5
                pr-14

                dark:text-white
                dark:placeholder:text-gray-400

                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="
                absolute

                right-4
                top-1/2

                -translate-y-1/2

                text-gray-500

                hover:text-blue-600

                transition
              "
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
            >
              {showConfirmPassword ? (
                <FiEyeOff size={19} />
              ) : (
                <FiEye size={19} />
              )}
            </button>

          </div>

          {confirmPassword.length > 0 && (
            <p
              className={`
                mt-1

                text-xs

                ${
                  passwordsMatch
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }
              `}
            >
              {passwordsMatch
                ? "✔ Passwords match"
                : "✖ Passwords do not match"}
            </p>
          )}

        </div>

        {/* ==================================
            TERMS
        ================================== */}

        <label
          className="
            flex
            items-start
            gap-2.5

            text-sm

            dark:text-gray-300
          "
        >

          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) =>
              setAcceptTerms(
                e.target.checked
              )
            }
            className="mt-1"
          />

          <span className="leading-5">

            I agree to the{" "}

            <Link
              href="/terms"
              className="
                font-medium
                text-blue-600
                hover:underline
              "
            >
              Terms of Service
            </Link>

            {" "}and{" "}

            <Link
              href="/privacy"
              className="
                font-medium
                text-blue-600
                hover:underline
              "
            >
              Privacy Policy
            </Link>

          </span>

        </label>

        {/* ==================================
            CREATE ACCOUNT
        ================================== */}

        <button
          type="submit"
          disabled={
            loading ||
            !passwordValidation.valid ||
            !passwordsMatch ||
            !acceptTerms ||
            !emailValid ||
            !fullNameValid
          }
          className="
            w-full

            rounded-xl

            bg-gradient-to-r
            from-blue-600
            to-indigo-600

            py-2.5

            font-semibold

            text-white

            hover:opacity-90

            transition

            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading
            ? "Creating account..."
            : "Create Account"}
        </button>

      </form>

      {/* ======================================
          LOGIN LINK
      ====================================== */}

      <p
        className="
          mt-5

          text-center

          text-sm

          text-gray-500
          dark:text-gray-400
        "
      >
        Already have an account?

        <Link
          href="/login"
          className="
            ml-2

            font-semibold

            text-blue-600

            hover:underline
          "
        >
          Login
        </Link>

      </p>
    </>
  );
}