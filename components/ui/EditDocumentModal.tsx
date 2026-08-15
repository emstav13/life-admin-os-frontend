"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import EditDocumentCard from "@/components/documents/EditDocumentCard";

export default function EditDocumentModal({
  document,
  onSaved,
}: {
  document: any;
  onSaved?: (updatedDocument: any) => void;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // =========================================================
  // CLIENT MOUNT
  // =========================================================

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  // =========================================================
  // VALID DOCUMENT
  // =========================================================

  if (!document?.id) {
    console.error(
      "EditDocumentModal: document.id is missing",
      document
    );

    return null;
  }

  // =========================================================
  // SAVE
  // =========================================================

  function handleSaved(updatedDocument: any) {
    if (onSaved) {
      onSaved(updatedDocument);
    }

    setOpen(false);
  }

  // =========================================================
  // MODAL
  // =========================================================

  const modal = (
    <div
      className="
        fixed
        inset-0
        z-[999999]

        flex
        items-center
        justify-center

        bg-black/75

        p-4
        sm:p-6
        lg:p-8

        backdrop-blur-md
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          setOpen(false);
        }
      }}
    >
      {/* =====================================================
          MODAL CONTAINER
      ===================================================== */}

      <div
        className="
          relative

          flex
          w-full
          max-w-[760px]

          max-h-[90vh]

          flex-col

          overflow-hidden

          rounded-[28px]

          border
          border-white/10

          bg-white

          shadow-[0_30px_100px_rgba(0,0,0,0.55)]

          dark:border-[#46413C]
          dark:bg-[#25221F]
        "
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
      >
        {/* =================================================
            TOP GRADIENT
        ================================================= */}

        <div
          className="
            absolute
            left-0
            right-0
            top-0

            z-30

            h-[3px]

            bg-gradient-to-r
            from-blue-500
            via-indigo-500
            to-violet-500
          "
        />

        {/* =================================================
            CLOSE
        ================================================= */}

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="
            absolute

            right-5
            top-5

            z-[100]

            flex
            h-10
            w-10

            items-center
            justify-center

            rounded-xl

            border
            border-slate-200/80

            bg-white

            text-xl
            font-medium
            text-slate-500

            shadow-sm

            transition-all
            duration-200

            hover:border-red-200
            hover:bg-red-50
            hover:text-red-500
            hover:shadow-md

            dark:border-[#45403B]
            dark:bg-[#302C29]
            dark:text-gray-400

            dark:hover:border-red-900/60
            dark:hover:bg-red-950/30
            dark:hover:text-red-400
          "
          aria-label="Close"
        >
          ×
        </button>

        {/* =================================================
            EDIT CONTENT
        ================================================= */}

        <div
          className="
            min-h-0
            flex-1

            overflow-y-auto

            overscroll-contain
          "
        >
          <EditDocumentCard
            document={document}
            onCancel={() => setOpen(false)}
            onSaved={handleSaved}
          />
        </div>
      </div>
    </div>
  );

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <>
      {/* =====================================================
          EDIT BUTTON
      ===================================================== */}

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="
          inline-flex
          items-center
          gap-2

          rounded-xl

          bg-gradient-to-r
          from-blue-600
          to-indigo-600

          px-4
          py-2.5

          text-sm
          font-semibold
          text-white

          shadow-[0_8px_24px_rgba(37,99,235,0.22)]

          transition-all
          duration-200

          hover:-translate-y-0.5
          hover:from-blue-500
          hover:to-indigo-500
          hover:shadow-[0_12px_30px_rgba(37,99,235,0.30)]

          active:translate-y-0
        "
      >
        <span className="text-base">
          ✏️
        </span>

        <span>
          Edit
        </span>
      </button>

      {/* =====================================================
          PORTAL
      ===================================================== */}

      {mounted &&
        open &&
        createPortal(
          modal,
          window.document.body
        )}
    </>
  );
}