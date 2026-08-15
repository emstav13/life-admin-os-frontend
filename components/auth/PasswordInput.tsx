"use client";

import { InputHTMLAttributes, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface PasswordInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function PasswordInput({
  label,
  className = "",
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <div>

      <label className="block text-sm font-medium mb-2 dark:text-gray-300">
        {label}
      </label>

      <div className="relative">

        <input
          {...props}
          type={
            showPassword
              ? "text"
              : "password"
          }
          className={`
            w-full

            rounded-xl

            border
            border-gray-300
            dark:border-[#3D3834]

            bg-white
            dark:bg-[#34302D]

            px-4
            py-3
            pr-14

            dark:text-white
            dark:placeholder:text-gray-400

            focus:outline-none
            focus:ring-2
            focus:ring-blue-500

            transition

            ${className}
          `}
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
        >
          {showPassword ? (
            <FiEyeOff size={20} />
          ) : (
            <FiEye size={20} />
          )}
        </button>

      </div>

    </div>
  );
}