import Link from "next/link";
import PublicLayout from "@/components/layout/PublicLayout";

export default function StripeSuccessPage() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <div className="rounded-3xl border border-emerald-200 bg-white p-10 shadow-[0_18px_60px_rgba(15,23,42,0.08)] dark:border-emerald-400/20 dark:bg-[#2B2724]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-2xl dark:bg-emerald-500/10">
            ✓
          </div>

          <h1 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">
            Payment successful
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Your subscription is being activated. Please return to your
            settings to see the updated plan.
          </p>

          <Link
            href="/settings"
            className="mt-8 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-gray-100"
          >
            Return to settings
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
}
