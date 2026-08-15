"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function DocumentsHeader({
  category,
}: {
  category?: string;
}) {
  const { t } = useLanguage();

  return (
    <>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
        📄 {t.documents}
      </h1>

      <p className="text-gray-600 dark:text-gray-400 mb-8">
        {category
          ? `Category: ${category}`
          : t.documentsDescription}
      </p>
    </>
  );
}