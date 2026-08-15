"use client";

import { ButtonHTMLAttributes } from "react";

interface AuthButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
}

export default function AuthButton({
  children,
  loading = false,
  loadingText = "Loading...",
  className = "",
  ...props
}: AuthButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`
        w-full

        rounded-xl

        bg-gradient-to-r
        from-blue-600
        to-indigo-600

        py-3

        font-semibold
        text-white

        transition

        hover:opacity-90

        disabled:opacity-50
        disabled:cursor-not-allowed

        ${className}
      `}
    >
      {loading ? loadingText : children}
    </button>
  );
}