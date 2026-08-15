"use client";

import { InputHTMLAttributes } from "react";

interface AuthInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function AuthInput({
  label,
  className = "",
  ...props
}: AuthInputProps) {
  return (
    <div>

      <label className="block text-sm font-medium mb-2 dark:text-gray-300">
        {label}
      </label>

      <input
        {...props}
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

          dark:text-white
          dark:placeholder:text-gray-400

          focus:outline-none
          focus:ring-2
          focus:ring-blue-500

          transition

          ${className}
        `}
      />

    </div>
  );
}