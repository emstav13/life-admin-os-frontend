import Link from "next/link";
import PublicLayout from "@/components/layout/PublicLayout";

export default function StripeCancelledPage() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-[0_18px_60px_rgba(15,23,42,0.08)] dark:border-[#3D3834] dark:bg-[#2B2724]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl dark:bg-white/5">
            ↩
          </div>

          <h1 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">
            Checkout cancelled
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-300">
            No payment was completed. You can return to the plans and choose
            again whenever you are ready.
          </p>

          <Link
            href="/settings#pricing"
            className="mt-8 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-gray-100"
          >
            View plans
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
}
