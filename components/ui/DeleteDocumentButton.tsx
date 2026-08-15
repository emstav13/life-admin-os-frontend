"use client";

import { useTransition } from "react";

export default function DeleteDocumentButton({
  action,
}: {
  action: () => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        const ok = window.confirm(
          "Are you sure you want to delete this document?\n\nThis action cannot be undone."
        );

        if (!ok) return;

        startTransition(() => {
          action();
        });
      }}
      className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition"
    >
      {isPending ? "Deleting..." : "🗑 Delete"}
    </button>
  );
}