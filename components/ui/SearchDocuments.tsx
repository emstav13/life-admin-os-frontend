"use client";

import { useState } from "react";
import Link from "next/link";

export default function SearchDocuments({
  documents,
}: {
  documents: any[];
}) {
  const [search, setSearch] = useState("");

  const filtered = documents.filter((doc) => {
    const query = search.toLowerCase();

    return (
      (doc.filename || "")
        .toLowerCase()
        .includes(query) ||
      (doc.document_type || "")
        .toLowerCase()
        .includes(query) ||
      (doc.summary || "")
        .toLowerCase()
        .includes(query) ||
      (doc.ai_json?.provider || "")
        .toLowerCase()
        .includes(query)
    );
  });

  return (
    <div className="space-y-6">

      {/* ============================= */}
      {/* SEARCH */}
      {/* ============================= */}

      <div className="relative">

        <div
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2

            flex
            h-9
            w-9
            items-center
            justify-center

            rounded-xl

            bg-slate-100
            dark:bg-[#34302D]

            text-slate-500
            dark:text-gray-400
          "
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="11"
              cy="11"
              r="6.5"
              stroke="currentColor"
              strokeWidth="1.8"
            />

            <path
              d="M16 16L21 21"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <input
          type="text"
          placeholder="Search your documents..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full

            rounded-2xl

            border
            border-slate-200
            dark:border-[#3D3834]

            bg-white
            dark:bg-[#2B2724]

            py-4
            pl-16
            pr-5

            text-slate-900
            dark:text-white

            placeholder:text-slate-400
            dark:placeholder:text-gray-500

            shadow-sm

            focus:outline-none
            focus:ring-2
            focus:ring-blue-500/20
            focus:border-blue-400

            transition-all
            duration-200
          "
        />

        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2

              flex
              h-8
              w-8
              items-center
              justify-center

              rounded-lg

              text-slate-400

              hover:bg-slate-100
              hover:text-slate-700

              dark:hover:bg-[#3A3531]
              dark:hover:text-white

              transition
            "
          >
            ×
          </button>
        )}

      </div>


      {/* ============================= */}
      {/* RESULT COUNT */}
      {/* ============================= */}

      <div
        className="
          flex
          items-center
          justify-between

          px-1
        "
      >

        <div>

          <p
            className="
              text-sm
              font-medium

              text-slate-500
              dark:text-gray-400
            "
          >
            {filtered.length}{" "}
            {filtered.length === 1
              ? "document"
              : "documents"}
          </p>

        </div>

        {search && (
          <p
            className="
              text-xs

              text-slate-400
              dark:text-gray-500
            "
          >
            Results for "{search}"
          </p>
        )}

      </div>


      {/* ============================= */}
      {/* EMPTY STATE */}
      {/* ============================= */}

      {filtered.length === 0 && (

        <div
          className="
            relative
            overflow-hidden

            rounded-3xl

            border
            border-slate-200
            dark:border-[#3D3834]

            bg-white
            dark:bg-[#2B2724]

            shadow-sm

            p-12

            text-center
          "
        >

          <div
            className="
              absolute
              -top-20
              left-1/2
              -translate-x-1/2

              h-40
              w-40

              rounded-full

              bg-blue-500/5

              blur-3xl
            "
          />

          <div
            className="
              relative

              mx-auto
              mb-5

              flex
              h-16
              w-16

              items-center
              justify-center

              rounded-2xl

              bg-slate-100
              dark:bg-[#34302D]

              text-slate-400
              dark:text-gray-500
            "
          >

            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 3.5H14L19 8.5V20.5H6V3.5Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />

              <path
                d="M14 3.5V8.5H19"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />

              <path
                d="M9 12H16"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />

              <path
                d="M9 15.5H14"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>

          </div>


          <h3
            className="
              relative

              text-xl
              font-bold

              text-slate-900
              dark:text-white
            "
          >
            No documents found
          </h3>

          <p
            className="
              relative

              mt-2

              text-sm

              text-slate-500
              dark:text-gray-400
            "
          >
            Try another search or upload a new document.
          </p>

        </div>

      )}


      {/* ============================= */}
      {/* DOCUMENTS */}
      {/* ============================= */}

      <div className="space-y-4">

        {filtered.map((doc) => {

          const urgency =
            doc.ai_json?.urgency || "low";

          const isHigh =
            urgency === "high";

          const isMedium =
            urgency === "medium";

          return (

            <Link
              key={doc.id}
              href={`/documents/${doc.id}`}
              className="
                group
                relative
                block

                overflow-hidden

                rounded-3xl

                border
                border-slate-200
                dark:border-[#3D3834]

                bg-white
                dark:bg-[#2B2724]

                shadow-sm

                hover:shadow-xl
                hover:-translate-y-0.5

                transition-all
                duration-300
              "
            >

              {/* subtle hover gradient */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0

                  bg-gradient-to-r
                  from-blue-500/[0.03]
                  via-transparent
                  to-indigo-500/[0.03]

                  opacity-0
                  group-hover:opacity-100

                  transition-opacity
                  duration-300
                "
              />


              <div
                className="
                  relative

                  p-6
                  md:p-7
                "
              >

                {/* ============================= */}
                {/* TOP */}
                {/* ============================= */}

                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-5
                  "
                >

                  <div
                    className="
                      flex
                      min-w-0
                      items-start
                      gap-4
                    "
                  >

                    {/* DOCUMENT ICON */}

                    <div
                      className="
                        flex
                        h-12
                        w-12
                        shrink-0

                        items-center
                        justify-center

                        rounded-2xl

                        bg-blue-50
                        dark:bg-blue-500/10

                        border
                        border-blue-100
                        dark:border-blue-500/20

                        text-blue-600
                        dark:text-blue-400
                      "
                    >

                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6 3.5H14L19 8.5V20.5H6V3.5Z"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinejoin="round"
                        />

                        <path
                          d="M14 3.5V8.5H19"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinejoin="round"
                        />

                        <path
                          d="M9 12H16"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                        />

                        <path
                          d="M9 15.5H14"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                        />
                      </svg>

                    </div>


                    <div className="min-w-0">

                      <h3
                        className="
                          truncate

                          text-lg
                          md:text-xl

                          font-bold

                          text-slate-900
                          dark:text-white
                        "
                        title={doc.filename}
                      >
                        {doc.filename}
                      </h3>

                      <p
                        className="
                          mt-1

                          text-sm

                          text-slate-500
                          dark:text-gray-400
                        "
                      >
                        {doc.document_type ||
                          "Document"}
                      </p>

                    </div>

                  </div>


                  {/* OPEN */}

                  <div
                    className="
                      hidden
                      sm:flex

                      shrink-0

                      items-center
                      gap-2

                      rounded-xl

                      border
                      border-slate-200
                      dark:border-[#45403B]

                      bg-white
                      dark:bg-[#34302D]

                      px-3.5
                      py-2

                      text-sm
                      font-semibold

                      text-slate-700
                      dark:text-gray-200

                      group-hover:border-blue-300
                      group-hover:text-blue-600

                      dark:group-hover:border-blue-500/30
                      dark:group-hover:text-blue-400

                      transition
                    "
                  >
                    Open

                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M5 12H19"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />

                      <path
                        d="M13 6L19 12L13 18"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                  </div>

                </div>


                {/* ============================= */}
                {/* TAGS */}
                {/* ============================= */}

                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-2

                    mt-5
                  "
                >

                  {doc.document_type && (

                    <span
                      className="
                        rounded-full

                        bg-blue-50
                        dark:bg-blue-500/10

                        border
                        border-blue-100
                        dark:border-blue-500/20

                        px-3
                        py-1

                        text-xs
                        font-semibold

                        text-blue-700
                        dark:text-blue-400
                      "
                    >
                      {doc.document_type}
                    </span>

                  )}


                  {doc.ai_json?.provider && (

                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1.5

                        rounded-full

                        bg-purple-50
                        dark:bg-purple-500/10

                        border
                        border-purple-100
                        dark:border-purple-500/20

                        px-3
                        py-1

                        text-xs
                        font-semibold

                        text-purple-700
                        dark:text-purple-400
                      "
                    >

                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M4 21V5C4 4.44772 4.44772 4 4.5 4H19.5C20.0523 4 20.5 4.44772 20.5 5V21"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />

                        <path
                          d="M8 8H16"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />

                        <path
                          d="M8 12H16"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>

                      {doc.ai_json.provider}

                    </span>

                  )}


                  {/* PRIORITY */}

                  <span
                    className={`
                      inline-flex
                      items-center
                      gap-1.5

                      rounded-full

                      border

                      px-3
                      py-1

                      text-xs
                      font-semibold

                      ${
                        isHigh
                          ? `
                            border-red-200
                            bg-red-50
                            text-red-700

                            dark:border-red-500/20
                            dark:bg-red-500/10
                            dark:text-red-400
                          `
                          : isMedium
                          ? `
                            border-amber-200
                            bg-amber-50
                            text-amber-700

                            dark:border-amber-500/20
                            dark:bg-amber-500/10
                            dark:text-amber-400
                          `
                          : `
                            border-emerald-200
                            bg-emerald-50
                            text-emerald-700

                            dark:border-emerald-500/20
                            dark:bg-emerald-500/10
                            dark:text-emerald-400
                          `
                      }
                    `}
                  >

                    <span
                      className={`
                        h-1.5
                        w-1.5
                        rounded-full

                        ${
                          isHigh
                            ? "bg-red-500"
                            : isMedium
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                        }
                      `}
                    />

                    {urgency.toUpperCase()}

                  </span>

                </div>


                {/* ============================= */}
                {/* SUMMARY */}
                {/* ============================= */}

                <p
                  className="
                    mt-5

                    line-clamp-2

                    text-sm
                    leading-6

                    text-slate-600
                    dark:text-gray-300
                  "
                >
                  {doc.summary ||
                    "No summary available."}
                </p>


                {/* ============================= */}
                {/* META */}
                {/* ============================= */}

                <div
                  className="
                    mt-6
                    pt-5

                    border-t
                    border-slate-100
                    dark:border-[#3A3531]

                    flex
                    flex-wrap
                    items-center
                    gap-x-6
                    gap-y-3

                    text-sm
                    text-slate-500
                    dark:text-gray-400
                  "
                >

                  {/* DATE */}

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <rect
                        x="4"
                        y="5"
                        width="16"
                        height="15"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />

                      <path
                        d="M8 3V7"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />

                      <path
                        d="M16 3V7"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />

                      <path
                        d="M4 10H20"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                    </svg>

                    <span>
                      {doc.ai_json?.due_date ||
                        "No due date"}
                    </span>

                  </div>


                  {/* AMOUNT */}

                  {doc.ai_json?.amount && (

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >

                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        />

                        <path
                          d="M12 7V17"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />

                        <path
                          d="M15 9.5C15 8.4 13.7 8 12 8C10.3 8 9 8.6 9 10C9 12.5 15 11.5 15 14C15 15.4 13.7 16 12 16C10.3 16 9 15.5 9 14"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>

                      <span>
                        {doc.ai_json.amount}
                      </span>

                    </div>

                  )}


                  {/* MOBILE OPEN */}

                  <div
                    className="
                      flex
                      sm:hidden

                      ml-auto

                      items-center
                      gap-1

                      font-semibold

                      text-blue-600
                      dark:text-blue-400
                    "
                  >
                    Open

                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M5 12H19"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />

                      <path
                        d="M13 6L19 12L13 18"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                  </div>

                </div>

              </div>

            </Link>

          );
        })}

      </div>

    </div>
  );
}