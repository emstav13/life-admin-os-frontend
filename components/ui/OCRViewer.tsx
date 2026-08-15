"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function OCRViewer({
  text,
}: {
  text: string;
}) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="mt-8">

      <button
        onClick={() => setOpen(!open)}
        className="
          flex
          items-center
          gap-2

          text-blue-600
          dark:text-blue-400

          font-semibold

          hover:text-blue-800
          dark:hover:text-blue-300

          transition-colors
        "
      >
        {open
          ? `📄 ${t.hideText}`
          : `📄 ${t.showText}`}
      </button>

      {open && (
        <div
          className="
            mt-4

            bg-gray-50
            dark:bg-[#34302D]

            border
            border-gray-200
            dark:border-[#3D3834]

            rounded-xl

            p-5

            max-h-[500px]
            overflow-y-auto

            shadow-inner

            transition-colors
          "
        >
          <pre
            className="
              whitespace-pre-wrap

              text-sm
              leading-7

              text-gray-700
              dark:text-gray-200

              font-mono
            "
          >
            {text}
          </pre>
        </div>
      )}

    </div>
  );
}