"use client";

import { validatePassword } from "@/lib/password";

export default function PasswordStrength({
  password,
}: {
  password: string;
}) {
  const { errors } = validatePassword(password);

  const rules = [
    {
      ok: password.length >= 12,
      text: "At least 12 characters",
    },
    {
      ok: /[A-Z]/.test(password),
      text: "One uppercase letter",
    },
    {
      ok: /[a-z]/.test(password),
      text: "One lowercase letter",
    },
    {
      ok: /[0-9]/.test(password),
      text: "One number",
    },
    {
      ok: /[!@#$%^&*(),.?\":{}|<>_\-+=/\\[\]`~;]/.test(
        password
      ),
      text: "One special character",
    },
  ];

  const score =
    rules.filter((r) => r.ok).length;

  return (
    <div className="mt-4 space-y-2">

      <div className="h-2 rounded-full bg-gray-200 dark:bg-[#3D3834] overflow-hidden">

        <div
          className={`h-full transition-all duration-300 ${
            score <= 2
              ? "bg-red-500"
              : score <= 4
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
          style={{
            width: `${(score / 5) * 100}%`,
          }}
        />

      </div>

      <div className="space-y-1 text-sm">

        {rules.map((rule) => (
          <div
            key={rule.text}
            className={`flex items-center gap-2 ${
              rule.ok
                ? "text-green-600 dark:text-green-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <span>
              {rule.ok ? "✔" : "○"}
            </span>

            {rule.text}
          </div>
        ))}

      </div>

      {score === 5 && (
        <p className="pt-2 font-semibold text-green-600 dark:text-green-400">
          Strong password
        </p>
      )}

      {score >= 3 && score < 5 && (
        <p className="pt-2 font-semibold text-yellow-600">
          Medium password
        </p>
      )}

      {score < 3 && (
        <p className="pt-2 font-semibold text-red-600">
          Weak password
        </p>
      )}

    </div>
  );
}