"use client";

import {
  Suspense,
  useEffect,
  useState,
} from "react";

import { useSearchParams } from "next/navigation";

import AppLayout from "@/components/layout/AppLayout";
import SearchDocuments from "@/components/ui/SearchDocuments";
import DocumentsHeader from "@/components/ui/DocumentsHeader";

import { authFetch } from "@/lib/api-auth";

// =====================================================
// DOCUMENTS CONTENT
// =====================================================

function DocumentsContent() {
  const searchParams =
    useSearchParams();

  const category =
    searchParams.get("category") ||
    undefined;

  const [documents, setDocuments] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ===================================================
  // LOAD DOCUMENTS
  // ===================================================

  async function loadDocuments() {
    try {
      setLoading(true);
      setError("");

      const response =
        await authFetch(
          "/documents"
        );

      if (!response.ok) {
        const errorData =
          await response
            .json()
            .catch(() => null);

        console.error(
          "Failed to load documents:",
          errorData
        );

        throw new Error(
          "Failed to load documents"
        );
      }

      const data =
        await response.json();

      setDocuments(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(
        "Documents error:",
        error
      );

      setError(
        "Failed to load documents."
      );

    } finally {

      setLoading(false);

    }
  }

  // ===================================================
  // INITIAL LOAD
  // ===================================================

  useEffect(() => {
    loadDocuments();
  }, []);

  // ===================================================
  // CATEGORY FILTER
  // ===================================================

  const filteredDocuments =
    category
      ? documents.filter(
          (doc: any) => {

            const type =
              doc.document_type ||
              doc.ai_json
                ?.document_type ||
              "";

            return (
              type.toLowerCase() ===
              category.toLowerCase()
            );
          }
        )
      : documents;

  // ===================================================
  // UI
  // ===================================================

  return (
    <AppLayout>

      <DocumentsHeader
        category={category}
      />

      {/* ================================================= */}
      {/* LOADING */}
      {/* ================================================= */}

      {loading && (

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-4
          "
        >

          {Array.from({
            length: 6,
          }).map((_, i) => (

            <div
              key={i}
              className="
                relative
                overflow-hidden

                bg-white
                dark:bg-[#2B2724]

                border
                border-gray-200
                dark:border-[#3D3834]

                rounded-2xl

                p-5

                shadow-sm
              "
              style={{
                animationDelay:
                  `${i * 80}ms`,
              }}
            >

              <div
                className="
                  absolute
                  inset-0

                  -translate-x-full

                  animate-[shimmer_1.6s_infinite]

                  bg-gradient-to-r
                  from-transparent
                  via-black/[0.04]
                  dark:via-white/[0.06]
                  to-transparent
                "
              />

              <div
                className="
                  flex
                  items-center
                  gap-3
                  mb-4
                "
              >

                <div
                  className="
                    h-10
                    w-10
                    rounded-xl

                    bg-gray-100
                    dark:bg-[#3D3834]
                  "
                />

                <div
                  className="
                    flex-1
                    space-y-2
                  "
                >

                  <div
                    className="
                      h-3
                      w-3/4

                      rounded-full

                      bg-gray-100
                      dark:bg-[#3D3834]
                    "
                  />

                  <div
                    className="
                      h-2.5
                      w-1/2

                      rounded-full

                      bg-gray-100
                      dark:bg-[#3D3834]
                    "
                  />

                </div>

              </div>

              <div
                className="
                  h-2.5
                  w-full

                  rounded-full

                  bg-gray-100
                  dark:bg-[#3D3834]

                  mb-2
                "
              />

              <div
                className="
                  h-2.5
                  w-5/6

                  rounded-full

                  bg-gray-100
                  dark:bg-[#3D3834]
                "
              />

            </div>

          ))}

        </div>

      )}

      {/* ================================================= */}
      {/* ERROR */}
      {/* ================================================= */}

      {!loading && error && (

        <div
          className="
            relative
            overflow-hidden

            bg-white
            dark:bg-[#2B2724]

            border
            border-red-200/70
            dark:border-red-900/50

            rounded-2xl

            p-10

            text-center

            shadow-sm
          "
        >

          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              top-0

              h-24

              bg-gradient-to-b
              from-red-500/[0.06]
              to-transparent
            "
          />

          <div
            className="
              relative

              mx-auto
              mb-5

              flex
              h-14
              w-14

              items-center
              justify-center

              rounded-2xl

              bg-red-50
              dark:bg-red-950/40

              ring-1
              ring-red-100
              dark:ring-red-900/50
            "
          >

            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="
                text-red-500
                dark:text-red-400
              "
            >

              <path
                d="
                  M12 8v5
                  m0 3.5h.01
                  M10.29 3.86l-8.18 14.18
                  A1.5 1.5 0 0 0 3.4 20.5h17.2
                  a1.5 1.5 0 0 0 1.29-2.46
                  L13.71 3.86
                  a1.5 1.5 0 0 0-2.42 0Z
                "
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

            </svg>

          </div>

          <p
            className="
              relative

              text-red-600
              dark:text-red-400

              font-semibold
              text-[15px]

              mb-1
            "
          >
            {error}
          </p>

          <p
            className="
              relative

              text-gray-500
              dark:text-gray-400

              text-sm

              mb-6
            "
          >
            Κάτι πήγε στραβά κατά τη φόρτωση
            των εγγράφων σου.
          </p>

          <button
            type="button"
            onClick={loadDocuments}
            className="
              relative

              px-6
              py-2.5

              rounded-xl

              bg-black
              dark:bg-white

              text-white
              dark:text-black

              text-sm
              font-medium

              shadow-sm

              hover:opacity-90
              hover:shadow-md

              active:scale-[0.98]

              transition
              duration-200
            "
          >
            Retry
          </button>

        </div>

      )}

      {/* ================================================= */}
      {/* DOCUMENTS */}
      {/* ================================================= */}

      {!loading && !error && (

        <div
          className="
            animate-[fadeIn_0.4s_ease-out]
          "
        >

          <SearchDocuments
            documents={
              filteredDocuments
            }
          />

        </div>

      )}

    </AppLayout>
  );
}

// =====================================================
// PAGE
// =====================================================

export default function DocumentsPage() {
  return (
    <Suspense
      fallback={
        <AppLayout>
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-4
            "
          >
            {Array.from({
              length: 6,
            }).map((_, i) => (

              <div
                key={i}
                className="
                  h-32
                  rounded-2xl

                  bg-gray-100
                  dark:bg-[#3D3834]

                  animate-pulse
                "
              />

            ))}
          </div>
        </AppLayout>
      }
    >
      <DocumentsContent />
    </Suspense>
  );
}