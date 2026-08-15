"use client";

import { useState } from "react";
import { toast } from "sonner";

import { API_URL } from "@/lib/api";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function EditDocumentCard({
  document,
  onCancel,
  onSaved,
}: {
  document: any;
  onCancel: () => void;
  onSaved?: (updatedDocument: any) => void;
}) {
  const { t } = useLanguage();

  const documentId = document?.id;

  const [provider, setProvider] = useState(
    document?.ai_json?.provider || ""
  );

  const [amount, setAmount] = useState(
    document?.ai_json?.amount || ""
  );

  const [dueDate, setDueDate] = useState(
    document?.ai_json?.due_date || ""
  );

  const [priority, setPriority] = useState(
    document?.ai_json?.urgency === "high"
      ? "high"
      : "low"
  );

  const [saving, setSaving] = useState(false);

  async function saveChanges() {
    if (!documentId) {
      console.error(
        "EDIT ERROR: document.id is missing",
        document
      );

      toast.error(t.updateFailed);
      return;
    }

    try {
      setSaving(true);

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (
        sessionError ||
        !session?.access_token
      ) {
        toast.error(t.loginFirst);
        return;
      }

      const response = await fetch(
        `${API_URL}/documents/${encodeURIComponent(
          documentId
        )}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },

          body: JSON.stringify({
            provider,
            amount,
            due_date: dueDate,
            priority,
          }),
        }
      );

      if (!response.ok) {
        const errorText =
          await response.text();

        console.error(
          "Failed to update document:",
          response.status,
          errorText
        );

        throw new Error(
          `Update failed: ${response.status}`
        );
      }

      const updatedResponse =
        await fetch(
          `${API_URL}/documents/${encodeURIComponent(
            documentId
          )}`,
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${session.access_token}`,
            },

            cache: "no-store",
          }
        );

      if (!updatedResponse.ok) {
        toast.success(
          t.documentUpdated
        );

        onCancel();
        return;
      }

      const updatedDocument =
        await updatedResponse.json();

      console.log(
        "UPDATED DOCUMENT:",
        updatedDocument
      );

      if (onSaved) {
        onSaved(updatedDocument);
      }

      toast.success(
        t.documentUpdated
      );

      onCancel();
    } catch (error) {
      console.error(
        "Edit document error:",
        error
      );

      toast.error(
        t.updateFailed
      );
    } finally {
      setSaving(false);
    }
  }

  if (!documentId) {
    return null;
  }

  return (
    <div
      className="
        w-full
        overflow-hidden
        bg-white
        dark:bg-[#25221F]
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          relative
          overflow-hidden
          px-7
          pb-7
          pt-8

          sm:px-9
          sm:pt-9

          dark:bg-[#25221F]
        "
      >
        {/* subtle glow */}

        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-24
            h-48
            w-48
            rounded-full
            bg-blue-500/10
            blur-3xl
          "
        />

        <div
          className="
            relative
            flex
            items-start
            gap-4
          "
        >
          {/* ICON */}

          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center

              rounded-2xl

              bg-gradient-to-br
              from-blue-600
              via-indigo-600
              to-violet-600

              text-xl
              text-white

              shadow-[0_10px_30px_rgba(79,70,229,0.25)]
            "
          >
            ✦
          </div>

          {/* TITLE */}

          <div className="min-w-0">
            <div
              className="
                mb-1.5
                text-[11px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-blue-600
                dark:text-blue-400
              "
            >
              AI Document
            </div>

            <h2
              className="
                text-2xl
                font-bold
                tracking-tight
                text-slate-950
                dark:text-white
              "
            >
              {t.editDocument}
            </h2>

            <p
              className="
                mt-1.5
                max-w-md
                text-sm
                leading-5
                text-slate-500
                dark:text-gray-400
              "
            >
              Update the information extracted from this document.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          FORM
      ===================================================== */}

      <div
        className="
          space-y-7
          px-7
          pb-8

          sm:px-9
        "
      >
        {/* ===================================================
            BASIC INFORMATION
        =================================================== */}

        <div>
          <div
            className="
              mb-4
              flex
              items-center
              gap-3
            "
          >
            <span
              className="
                h-px
                flex-1
                bg-slate-100
                dark:bg-[#3B3733]
              "
            />

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-slate-400
                dark:text-gray-500
              "
            >
              Document information
            </span>

            <span
              className="
                h-px
                flex-1
                bg-slate-100
                dark:bg-[#3B3733]
              "
            />
          </div>

          <div
            className="
              grid
              gap-5
              md:grid-cols-2
            "
          >
            {/* PROVIDER */}

            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-slate-800
                  dark:text-gray-200
                "
              >
                {t.provider}
              </label>

              <div className="relative">
                <input
                  value={provider}
                  onChange={(e) =>
                    setProvider(
                      e.target.value
                    )
                  }
                  placeholder="e.g. Qwenta"
                  className="
                    h-12
                    w-full

                    rounded-xl

                    border
                    border-slate-200

                    bg-slate-50

                    px-4

                    text-sm
                    font-medium
                    text-slate-900

                    outline-none

                    transition-all
                    duration-200

                    placeholder:text-slate-400

                    hover:border-slate-300

                    focus:border-blue-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-blue-500/10

                    dark:border-[#45403B]
                    dark:bg-[#302C29]
                    dark:text-white
                    dark:placeholder:text-gray-600

                    dark:hover:border-[#5A544E]

                    dark:focus:border-blue-500
                    dark:focus:bg-[#34302D]
                  "
                />
              </div>
            </div>

            {/* AMOUNT */}

            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-slate-800
                  dark:text-gray-200
                "
              >
                {t.amount}
              </label>

              <input
                value={amount}
                onChange={(e) =>
                  setAmount(
                    e.target.value
                  )
                }
                placeholder="e.g. 149.99 €"
                className="
                  h-12
                  w-full

                  rounded-xl

                  border
                  border-slate-200

                  bg-slate-50

                  px-4

                  text-sm
                  font-medium
                  text-slate-900

                  outline-none

                  transition-all
                  duration-200

                  placeholder:text-slate-400

                  hover:border-slate-300

                  focus:border-blue-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-blue-500/10

                  dark:border-[#45403B]
                  dark:bg-[#302C29]
                  dark:text-white
                  dark:placeholder:text-gray-600

                  dark:hover:border-[#5A544E]

                  dark:focus:border-blue-500
                  dark:focus:bg-[#34302D]
                "
              />
            </div>
          </div>
        </div>

        {/* ===================================================
            DATE + PRIORITY
        =================================================== */}

        <div>
          <div
            className="
              mb-4
              flex
              items-center
              gap-3
            "
          >
            <span
              className="
                h-px
                flex-1
                bg-slate-100
                dark:bg-[#3B3733]
              "
            />

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-slate-400
                dark:text-gray-500
              "
            >
              Priority & deadline
            </span>

            <span
              className="
                h-px
                flex-1
                bg-slate-100
                dark:bg-[#3B3733]
              "
            />
          </div>

          <div
            className="
              grid
              gap-5
              md:grid-cols-2
            "
          >
            {/* DATE */}

            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-slate-800
                  dark:text-gray-200
                "
              >
                {t.dueDate}
              </label>

              <input
                type="date"
                value={dueDate}
                onChange={(e) =>
                  setDueDate(
                    e.target.value
                  )
                }
                className="
                  h-12
                  w-full

                  rounded-xl

                  border
                  border-slate-200

                  bg-slate-50

                  px-4

                  text-sm
                  font-medium
                  text-slate-900

                  outline-none

                  transition-all
                  duration-200

                  hover:border-slate-300

                  focus:border-blue-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-blue-500/10

                  dark:border-[#45403B]
                  dark:bg-[#302C29]
                  dark:text-white

                  dark:hover:border-[#5A544E]

                  dark:focus:border-blue-500
                  dark:focus:bg-[#34302D]
                "
              />
            </div>

            {/* PRIORITY */}

            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-slate-800
                  dark:text-gray-200
                "
              >
                {t.priority}
              </label>

              <div
                className="
                  grid
                  grid-cols-2
                  gap-3
                "
              >
                {/* HIGH */}

                <button
                  type="button"
                  onClick={() =>
                    setPriority("high")
                  }
                  className={`
                    group
                    flex
                    h-12
                    items-center
                    gap-3
                    rounded-xl
                    border
                    px-4
                    text-left
                    transition-all
                    duration-200

                    ${
                      priority === "high"
                        ? "border-red-300 bg-red-50 shadow-sm dark:border-red-900/70 dark:bg-red-950/20"
                        : "border-slate-200 bg-slate-50 hover:border-red-200 hover:bg-red-50/50 dark:border-[#45403B] dark:bg-[#302C29] dark:hover:border-red-900/50 dark:hover:bg-red-950/10"
                    }
                  `}
                >
                  <span
                    className={`
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-lg

                      ${
                        priority === "high"
                          ? "bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400"
                          : "bg-white text-red-500 dark:bg-[#393531]"
                      }
                    `}
                  >
                    !
                  </span>

                  <span
                    className={`
                      text-sm
                      font-semibold

                      ${
                        priority === "high"
                          ? "text-red-600 dark:text-red-400"
                          : "text-slate-600 dark:text-gray-300"
                      }
                    `}
                  >
                    {t.high}
                  </span>
                </button>

                {/* LOW */}

                <button
                  type="button"
                  onClick={() =>
                    setPriority("low")
                  }
                  className={`
                    group
                    flex
                    h-12
                    items-center
                    gap-3
                    rounded-xl
                    border
                    px-4
                    text-left
                    transition-all
                    duration-200

                    ${
                      priority === "low"
                        ? "border-emerald-300 bg-emerald-50 shadow-sm dark:border-emerald-900/70 dark:bg-emerald-950/20"
                        : "border-slate-200 bg-slate-50 hover:border-emerald-200 hover:bg-emerald-50/50 dark:border-[#45403B] dark:bg-[#302C29] dark:hover:border-emerald-900/50 dark:hover:bg-emerald-950/10"
                    }
                  `}
                >
                  <span
                    className={`
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-lg

                      ${
                        priority === "low"
                          ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                          : "bg-white text-emerald-500 dark:bg-[#393531]"
                      }
                    `}
                  >
                    ✓
                  </span>

                  <span
                    className={`
                      text-sm
                      font-semibold

                      ${
                        priority === "low"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-slate-600 dark:text-gray-300"
                      }
                    `}
                  >
                    {t.low}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div
        className="
          flex
          flex-col-reverse
          gap-3

          border-t
          border-slate-100

          bg-slate-50/70

          px-7
          py-5

          sm:flex-row
          sm:items-center
          sm:justify-end
          sm:px-9

          dark:border-[#393531]
          dark:bg-[#211F1D]
        "
      >
        {/* CANCEL */}

        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="
            h-11

            rounded-xl

            px-5

            text-sm
            font-semibold

            text-slate-600
            dark:text-gray-300

            transition-all
            duration-200

            hover:bg-slate-200/70
            hover:text-slate-900

            dark:hover:bg-[#34302D]
            dark:hover:text-white

            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {t.cancel}
        </button>

        {/* SAVE */}

        <button
          type="button"
          onClick={saveChanges}
          disabled={
            saving || !documentId
          }
          className="
            inline-flex
            h-11
            items-center
            justify-center
            gap-2

            rounded-xl

            bg-gradient-to-r
            from-blue-600
            via-indigo-600
            to-indigo-600

            px-6

            text-sm
            font-semibold
            text-white

            shadow-[0_8px_24px_rgba(37,99,235,0.22)]

            transition-all
            duration-200

            hover:-translate-y-0.5
            hover:shadow-[0_12px_30px_rgba(37,99,235,0.30)]

            active:translate-y-0

            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {saving ? (
            <>
              <span
                className="
                  h-4
                  w-4
                  animate-spin
                  rounded-full
                  border-2
                  border-white/40
                  border-t-white
                "
              />

              {t.saving}
            </>
          ) : (
            <>
              <span className="text-base">
                ✦
              </span>

              {t.saveChanges}
            </>
          )}
        </button>
      </div>
    </div>
  );
}