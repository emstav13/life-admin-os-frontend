"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import AppLayout from "@/components/layout/AppLayout";
import EditDocumentModal from "@/components/ui/EditDocumentModal";

import { authFetch } from "@/lib/api-auth";
import { API_URL } from "@/lib/api";

type DocumentData = {
  id?: string;
  filename?: string;
  raw_text?: string;
  summary?: string;

  ai_json?: {
    provider?: string;
    amount?: string | number | null;
    due_date?: string | null;
    urgency?: string | null;
    short_summary?: string | null;

    [key: string]: unknown;
  } | null;

  [key: string]: unknown;
};

export default function DocumentPage() {
  const params = useParams();
  const router = useRouter();

  const documentId =
    typeof params.id === "string"
      ? params.id
      : "";

  const [document, setDocument] =
    useState<DocumentData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [deleting, setDeleting] =
    useState(false);

  // =========================================================
  // LOAD DOCUMENT
  // =========================================================

  useEffect(() => {
    if (!documentId) {
      setError("Document ID is missing");
      setLoading(false);
      return;
    }

    async function loadDocument() {
      try {
        setLoading(true);
        setError("");

        const response = await authFetch(
          `${API_URL}/documents/${documentId}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          const errorText =
            await response.text();

          console.error(
            "Failed to load document:",
            response.status,
            errorText
          );

          throw new Error(
            "Failed to load document"
          );
        }

        const data =
          await response.json();

        console.log(
          "DOCUMENT LOADED:",
          data
        );

        setDocument(data);
      } catch (error) {
        console.error(
          "Document loading error:",
          error
        );

        setError(
          "Unable to load document."
        );

        toast.error(
          "Failed to load document"
        );
      } finally {
        setLoading(false);
      }
    }

    loadDocument();
  }, [documentId]);

  // =========================================================
  // DELETE DOCUMENT
  // =========================================================

  async function handleDeleteDocument() {
    if (!documentId || deleting) {
      return;
    }

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this document? This action cannot be undone."
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);

      const response = await authFetch(
        `${API_URL}/documents/${documentId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorText =
          await response.text();

        console.error(
          "Failed to delete document:",
          response.status,
          errorText
        );

        throw new Error(
          "Failed to delete document"
        );
      }

      toast.success(
        "Document deleted successfully"
      );

      router.push("/documents");
    } catch (error) {
      console.error(
        "Delete document error:",
        error
      );

      toast.error(
        "Failed to delete document"
      );
    } finally {
      setDeleting(false);
    }
  }

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <AppLayout>
        <div
          className="
            flex
            min-h-[60vh]
            items-center
            justify-center
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                h-5
                w-5
                animate-spin
                rounded-full
                border-2
                border-slate-200
                border-t-blue-600
                dark:border-[#45403B]
                dark:border-t-blue-400
              "
            />

            <span
              className="
                text-sm
                font-medium
                text-slate-500
                dark:text-gray-400
              "
            >
              Loading document...
            </span>
          </div>
        </div>
      </AppLayout>
    );
  }

  // =========================================================
  // ERROR / NOT FOUND
  // =========================================================

  if (error || !document) {
    return (
      <AppLayout>
        <div
          className="
            flex
            min-h-[60vh]
            flex-col
            items-center
            justify-center
            text-center
          "
        >
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              border
              border-slate-200
              bg-white
              text-3xl
              shadow-sm
              dark:border-[#3D3834]
              dark:bg-[#2B2724]
            "
          >
            📄
          </div>

          <h1
            className="
              mt-5
              text-2xl
              font-bold
              tracking-tight
              text-slate-900
              dark:text-white
            "
          >
            Document not found
          </h1>

          <p
            className="
              mt-2
              max-w-md
              text-sm
              leading-6
              text-slate-500
              dark:text-gray-400
            "
          >
            {error ||
              "The requested document could not be found."}
          </p>

          <button
            type="button"
            onClick={() =>
              router.push("/documents")
            }
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-[0_8px_24px_rgba(37,99,235,0.20)]
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:shadow-[0_12px_30px_rgba(37,99,235,0.28)]
            "
          >
            ← Back to Documents
          </button>
        </div>
      </AppLayout>
    );
  }

  // =========================================================
  // DOCUMENT VALUES
  // =========================================================

  const filename =
    document.filename ||
    "Untitled document";

  const provider =
    document.ai_json?.provider ||
    "Unknown";

  const amount =
    document.ai_json?.amount ??
    "No Amount";

  const dueDate =
    document.ai_json?.due_date ||
    "No Due Date";

  const priority =
    document.ai_json?.urgency ||
    "Unknown";

  const summary =
    document.summary ||
    document.ai_json?.short_summary ||
    "No summary available.";

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <AppLayout>
      <div className="space-y-7">

        {/* =====================================================
            DOCUMENT HEADER
        ===================================================== */}

        <div
          className="
            relative
            overflow-hidden
            rounded-3xl

            border
            border-slate-200/80

            bg-white/90

            p-6

            shadow-[0_8px_40px_rgba(15,23,42,0.06)]

            backdrop-blur-xl

            dark:border-[#3D3834]
            dark:bg-[#2B2724]/95
            dark:shadow-black/20

            md:p-7
          "
        >
          {/* AI GLOW */}

          <div
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-48
              w-48
              rounded-full
              bg-blue-500/10
              blur-3xl
            "
          />

          {/* =================================================
              HEADER GRID
          ================================================= */}

          <div
            className="
              relative

              grid
              gap-6

              lg:grid-cols-[minmax(0,1fr)_auto]
              lg:items-start
            "
          >
            {/* =================================================
                DOCUMENT TITLE
            ================================================= */}

            <div
              className="
                min-w-0
                max-w-4xl
              "
            >
              {/* LABEL */}

              <div
                className="
                  mb-3
                  flex
                  items-center
                  gap-2
                "
              >
                <span
                  className="
                    inline-flex
                    h-7
                    items-center
                    rounded-full

                    border
                    border-blue-200/80

                    bg-blue-50

                    px-3

                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.14em]

                    text-blue-600

                    dark:border-blue-900/60
                    dark:bg-blue-950/30
                    dark:text-blue-400
                  "
                >
                  AI Document
                </span>

                <span
                  className="
                    h-1
                    w-1
                    rounded-full
                    bg-slate-300
                    dark:bg-[#5A544F]
                  "
                />

                <span
                  className="
                    text-xs
                    font-medium
                    text-slate-400
                    dark:text-gray-500
                  "
                >
                  Life AiOS
                </span>
              </div>

              {/* FILENAME */}

              <h1
                className="
                  max-w-4xl
                  break-words
                  text-2xl
                  font-bold
                  leading-tight
                  tracking-[-0.025em]

                  text-slate-950
                  dark:text-white

                  sm:text-3xl
                  lg:text-4xl
                "
              >
                {filename}
              </h1>

              <p
                className="
                  mt-3
                  text-sm
                  text-slate-500
                  dark:text-gray-400
                "
              >
                AI-extracted information and document insights
              </p>
            </div>

            {/* =================================================
                ACTIONS
            ================================================= */}

            <div
              className="
                flex
                shrink-0
                flex-wrap
                items-center
                gap-2.5

                lg:max-w-[340px]
                lg:justify-end
              "
            >
              {/* DOCUMENTS */}

              <button
                type="button"
                onClick={() =>
                  router.push("/documents")
                }
                className="
                  inline-flex
                  items-center
                  gap-2

                  rounded-xl

                  border
                  border-slate-200/90

                  bg-white

                  px-4
                  py-2.5

                  text-sm
                  font-medium

                  text-slate-700

                  shadow-sm

                  transition-all
                  duration-200

                  hover:-translate-y-0.5
                  hover:border-slate-300
                  hover:shadow-md

                  active:translate-y-0

                  dark:border-[#45403B]
                  dark:bg-[#312D2A]
                  dark:text-gray-200

                  dark:hover:border-[#56504A]
                  dark:hover:bg-[#37322F]
                "
              >
                <span className="text-base">
                  ←
                </span>

                <span>
                  Documents
                </span>
              </button>

              {/* EDIT */}

              <EditDocumentModal
                document={document}
                onSaved={(updatedDocument) => {
                  console.log(
                    "DOCUMENT STATE UPDATED:",
                    updatedDocument
                  );

                  setDocument(
                    updatedDocument
                  );
                }}
              />

              {/* DELETE */}

              <button
                type="button"
                onClick={
                  handleDeleteDocument
                }
                disabled={deleting}
                className="
                  inline-flex
                  items-center
                  gap-2

                  rounded-xl

                  border
                  border-red-200/80

                  bg-red-50/80

                  px-4
                  py-2.5

                  text-sm
                  font-semibold
                  text-red-600

                  shadow-sm

                  transition-all
                  duration-200

                  hover:-translate-y-0.5
                  hover:border-red-300
                  hover:bg-red-50
                  hover:shadow-md

                  active:translate-y-0

                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  disabled:hover:translate-y-0

                  dark:border-red-900/60
                  dark:bg-red-950/20
                  dark:text-red-400

                  dark:hover:border-red-800
                  dark:hover:bg-red-950/30
                "
              >
                <span className="text-base">
                  {deleting ? "…" : "🗑"}
                </span>

                <span>
                  {deleting
                    ? "Deleting..."
                    : "Delete"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* =====================================================
            DOCUMENT INFORMATION
        ===================================================== */}

        <div
          className="
            overflow-hidden
            rounded-3xl

            border
            border-slate-200/80

            bg-white

            shadow-[0_6px_30px_rgba(15,23,42,0.04)]

            dark:border-[#3D3834]
            dark:bg-[#2B2724]
          "
        >
          {/* DETAILS HEADER */}

          <div
            className="
              flex
              items-center
              justify-between

              border-b
              border-slate-100

              px-6
              py-4

              dark:border-[#3D3834]
            "
          >
            <div>
              <p
                className="
                  text-sm
                  font-semibold
                  text-slate-900
                  dark:text-white
                "
              >
                Document details
              </p>

              <p
                className="
                  mt-0.5
                  text-xs
                  text-slate-400
                  dark:text-gray-500
                "
              >
                Information extracted by Life AiOS
              </p>
            </div>

            <div
              className="
                hidden
                items-center
                gap-2

                rounded-full

                bg-emerald-50

                px-3
                py-1.5

                text-xs
                font-semibold
                text-emerald-600

                dark:bg-emerald-950/25
                dark:text-emerald-400

                sm:flex
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-emerald-500
                "
              />

              AI Ready
            </div>
          </div>

          {/* DETAILS GRID */}

          <div
            className="
              grid

              divide-y
              divide-slate-100

              md:grid-cols-2
              md:divide-y-0
              md:divide-x

              lg:grid-cols-4

              dark:divide-[#3D3834]
            "
          >
            {/* PROVIDER */}

            <div className="p-6">
              <p
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.12em]

                  text-slate-400
                  dark:text-gray-500
                "
              >
                Provider
              </p>

              <p
                className="
                  mt-3
                  truncate
                  text-base
                  font-semibold

                  text-slate-900
                  dark:text-white
                "
              >
                {provider}
              </p>
            </div>

            {/* AMOUNT */}

            <div className="p-6">
              <p
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.12em]

                  text-slate-400
                  dark:text-gray-500
                "
              >
                Amount
              </p>

              <p
                className="
                  mt-3
                  truncate
                  text-base
                  font-semibold

                  text-slate-900
                  dark:text-white
                "
              >
                {String(amount)}
              </p>
            </div>

            {/* DUE DATE */}

            <div className="p-6">
              <p
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.12em]

                  text-slate-400
                  dark:text-gray-500
                "
              >
                Due Date
              </p>

              <div
                className="
                  mt-3
                  flex
                  items-center
                  gap-2
                "
              >
                <span className="text-sm">
                  📅
                </span>

                <p
                  className="
                    truncate
                    text-base
                    font-semibold

                    text-slate-900
                    dark:text-white
                  "
                >
                  {dueDate}
                </p>
              </div>
            </div>

            {/* PRIORITY */}

            <div className="p-6">
              <p
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.12em]

                  text-slate-400
                  dark:text-gray-500
                "
              >
                Priority
              </p>

              <div className="mt-3">
                <span
                  className={`
                    inline-flex
                    items-center
                    gap-2

                    rounded-full

                    px-3
                    py-1.5

                    text-xs
                    font-bold

                    ${
                      priority === "high"
                        ? "bg-red-50 text-red-600 dark:bg-red-950/25 dark:text-red-400"
                        : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/25 dark:text-emerald-400"
                    }
                  `}
                >
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-current
                    "
                  />

                  {priority}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            AI SUMMARY
        ===================================================== */}

        <div
          className="
            relative
            overflow-hidden

            rounded-3xl

            border
            border-slate-200/80

            bg-white

            p-7

            shadow-[0_6px_30px_rgba(15,23,42,0.04)]

            dark:border-[#3D3834]
            dark:bg-[#2B2724]

            md:p-8
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-40
              w-40
              rounded-full
              bg-indigo-500/5
              blur-3xl
            "
          />

          <div
            className="
              relative
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center

                rounded-xl

                bg-gradient-to-br
                from-blue-600
                to-indigo-600

                text-lg

                shadow-[0_6px_18px_rgba(37,99,235,0.20)]
              "
            >
              ✦
            </div>

            <div>
              <h2
                className="
                  text-lg
                  font-bold
                  tracking-tight

                  text-slate-900
                  dark:text-white
                "
              >
                AI Summary
              </h2>

              <p
                className="
                  text-xs
                  text-slate-400
                  dark:text-gray-500
                "
              >
                Key information extracted from your document
              </p>
            </div>
          </div>

          <p
            className="
              relative
              mt-6

              whitespace-pre-wrap

              text-[15px]
              leading-7

              text-slate-600
              dark:text-gray-300
            "
          >
            {summary}
          </p>
        </div>

        {/* =====================================================
            RAW DOCUMENT TEXT
        ===================================================== */}

        {document.raw_text && (
          <div
            className="
              overflow-hidden
              rounded-3xl

              border
              border-slate-200/80

              bg-white

              shadow-[0_6px_30px_rgba(15,23,42,0.04)]

              dark:border-[#3D3834]
              dark:bg-[#2B2724]
            "
          >
            <details>
              <summary
                className="
                  flex
                  cursor-pointer
                  list-none
                  items-center
                  justify-between

                  px-7
                  py-5

                  text-sm
                  font-semibold

                  text-slate-900
                  dark:text-white

                  transition-colors

                  hover:bg-slate-50
                  dark:hover:bg-[#34302D]
                "
              >
                <span
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  <span
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center

                      rounded-lg

                      bg-slate-100

                      text-base

                      dark:bg-[#34302D]
                    "
                  >
                    📄
                  </span>

                  <span>
                    Original document text
                  </span>
                </span>

                <span
                  className="
                    text-xs
                    font-medium

                    text-slate-400
                    dark:text-gray-500
                  "
                >
                  View
                </span>
              </summary>

              <div
                className="
                  border-t
                  border-slate-100

                  p-6

                  dark:border-[#3D3834]
                "
              >
                <div
                  className="
                    max-h-[500px]
                    overflow-y-auto

                    rounded-2xl

                    border
                    border-slate-200

                    bg-slate-50

                    p-5

                    dark:border-[#45403B]
                    dark:bg-[#34302D]
                  "
                >
                  <p
                    className="
                      whitespace-pre-wrap

                      text-sm
                      leading-7

                      text-slate-600
                      dark:text-gray-300
                    "
                  >
                    {document.raw_text}
                  </p>
                </div>
              </div>
            </details>
          </div>
        )}
      </div>
    </AppLayout>
  );
}