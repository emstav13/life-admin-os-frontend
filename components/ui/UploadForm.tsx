"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";

import { supabase } from "@/lib/supabase";
import { API_URL } from "@/lib/api";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function UploadForm() {
  const { t } = useLanguage();

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const [converting, setConverting] = useState(false);
  const conversionInputRef = useRef<HTMLInputElement | null>(null);

  const [priority, setPriority] = useState("");

  const [enableReminder, setEnableReminder] =
    useState(false);

  const [reminderDate, setReminderDate] =
    useState("");

  const [reminderTime, setReminderTime] =
    useState("");

  const [repeat, setRepeat] =
    useState("none");

  const [
    dashboardNotification,
    setDashboardNotification,
  ] = useState(true);

  const [
    emailNotification,
    setEmailNotification,
  ] = useState(true);

  const [uploadError, setUploadError] = useState<{
    code: string;
    message: string;
    plan: string;
    used: number;
    limit: number;
  } | null>(null);

  async function handleConvertFile(
    selectedFile: File | null
  ) {
    if (!selectedFile) {
      return;
    }

    const allowedExtensions = [
      ".docx",
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
      ".txt",
    ];

    const lowerName =
      selectedFile.name.toLowerCase();

    const isAllowed = allowedExtensions.some(
      (extension) =>
        lowerName.endsWith(extension)
    );

    if (!isAllowed) {
      toast.error(
        "Supported formats: DOCX, JPG, JPEG, PNG, WEBP and TXT."
      );

      if (conversionInputRef.current) {
        conversionInputRef.current.value = "";
      }

      return;
    }

    try {
      setConverting(true);

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

      const formData = new FormData();

      formData.append(
        "file",
        selectedFile
      );

      const response = await fetch(
        `${API_URL}/convert-to-pdf`,
        {
          method: "POST",

          headers: {
            Authorization:
              `Bearer ${session.access_token}`,
          },

          body: formData,
        }
      );

      if (!response.ok) {
        let message =
          "PDF conversion failed.";

        try {
          const errorData =
            await response.json();

          if (
            typeof errorData?.detail ===
            "string"
          ) {
            message = errorData.detail;
          } else if (
            typeof errorData?.detail?.message ===
            "string"
          ) {
            message =
              errorData.detail.message;
          }
        } catch {
          // Keep the generic message.
        }

        throw new Error(message);
      }

      const blob =
        await response.blob();

      if (
        !blob.size ||
        blob.type ===
          "application/json"
      ) {
        throw new Error(
          "The server did not return a valid PDF."
        );
      }

      let downloadName =
        selectedFile.name.replace(
          /\.[^/.]+$/,
          ""
        ) + ".pdf";

      const disposition =
        response.headers.get(
          "content-disposition"
        );

      if (disposition) {
        const utf8Match =
          disposition.match(
            /filename\*=UTF-8''([^;]+)/i
          );

        const plainMatch =
          disposition.match(
            /filename="?([^"]+)"?/i
          );

        const filename =
          utf8Match?.[1] ||
          plainMatch?.[1];

        if (filename) {
          try {
            downloadName =
              decodeURIComponent(
                filename
              );
          } catch {
            downloadName = filename;
          }
        }
      }

      const blobUrl =
        window.URL.createObjectURL(
          blob
        );

      const link =
        document.createElement("a");

      link.href = blobUrl;
      link.download = downloadName;

      document.body.appendChild(
        link
      );

      link.click();
      link.remove();

      window.URL.revokeObjectURL(
        blobUrl
      );

      toast.success(
        "PDF created successfully."
      );
    } catch (error) {
      console.error(
        "PDF conversion error:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "PDF conversion failed."
      );
    } finally {
      setConverting(false);

      if (conversionInputRef.current) {
        conversionInputRef.current.value =
          "";
      }
    }
  }

  async function handleUpload() {
    /*
     * ==========================================
     * VALIDATE FILE
     * ==========================================
     */

    if (!file) {
      toast.error(t.selectPDF);
      return;
    }

    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      toast.error(t.pdfOnly);
      return;
    }

    try {
      setUploadError(null);
      setUploading(true);

      /*
       * ==========================================
       * GET CURRENT SUPABASE SESSION
       * ==========================================
       *
       * We DO NOT send user_id anymore.
       *
       * The backend gets the authenticated user
       * from the Supabase access token.
       */

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (
        sessionError ||
        !session?.access_token
      ) {
        console.error(
          "Upload authentication error:",
          sessionError
        );

        toast.error(t.loginFirst);

        return;
      }

      /*
       * ==========================================
       * CREATE FORM DATA
       * ==========================================
       */

      const formData = new FormData();

      formData.append(
        "file",
        file
      );

      /*
       * IMPORTANT:
       *
       * NO user_id HERE.
       *
       * The backend uses:
       *
       * current_user.id
       */

      formData.append(
        "priority",
        priority
      );

      formData.append(
        "reminder_enabled",
        enableReminder.toString()
      );

      formData.append(
        "reminder_date",
        reminderDate
      );

      formData.append(
        "reminder_time",
        reminderTime
      );

      formData.append(
        "repeat",
        repeat
      );

      formData.append(
        "dashboard_notification",
        dashboardNotification.toString()
      );

      formData.append(
        "email_notification",
        emailNotification.toString()
      );

      formData.append(
        "mobile_push",
        "false"
      );

      /*
       * ==========================================
       * SEND REQUEST
       * ==========================================
       */

      const response = await fetch(
        `${API_URL}/upload`,
        {
          method: "POST",

          headers: {
            Authorization:
              `Bearer ${session.access_token}`,
          },

          body: formData,
        }
      );

      /*
       * ==========================================
       * HANDLE BACKEND ERROR
       * ==========================================
       */

      if (!response.ok) {
        const errorText =
          await response.text();

        console.error(
          "Upload failed:",
          response.status,
          errorText
        );

        let errorData: any = null;

        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = null;
        }

        const detail = errorData?.detail;
        const code =
          typeof detail?.code === "string"
            ? detail.code
            : "";

        const isFreeLimit =
          code === "FREE_LIMIT_REACHED";

        const isProLimit =
          code === "PRO_MONTHLY_LIMIT_REACHED" ||
          code === "PRO_LIMIT_REACHED";

        if (isFreeLimit || isProLimit) {
          setUploadError({
            code,
            message:
              typeof detail?.message === "string"
                ? detail.message
                : isFreeLimit
                ? "You have reached the 5-document Free plan limit."
                : "You have reached your monthly Pro document limit.",
            plan:
              typeof detail?.plan === "string"
                ? detail.plan
                : isFreeLimit
                ? "free"
                : "pro",
            used:
              typeof detail?.used === "number"
                ? detail.used
                : isFreeLimit
                ? 5
                : 20,
            limit:
              typeof detail?.limit === "number"
                ? detail.limit
                : isFreeLimit
                ? 5
                : 20,
          });

          return;
        }

        toast.error(
          response.status === 403
            ? "Upload not available"
            : "Upload failed",
          {
            description:
              typeof detail?.message === "string"
                ? detail.message
                : "We couldn't upload your document. Please try again.",
          }
        );

        return;
      }

      setUploadError(null);

      /*
       * ==========================================
       * SUCCESS
       * ==========================================
       */

      const data =
        await response.json();

      console.log(
        "Upload successful:",
        data
      );

      toast.success(
        t.uploadSuccess
      );

      /*
       * ==========================================
       * REDIRECT TO DASHBOARD
       * ==========================================
       */

      setTimeout(() => {
        window.location.href = "/";
      }, 1200);

    } catch (error) {

      console.error(
        "Upload error:",
        error
      );

      toast.error(
        t.uploadFailed
      );

    } finally {

      setUploading(false);
    }
  }

  return (
    <div
      className="
        relative
        overflow-hidden

        bg-white/90
        dark:bg-[#2B2724]

        border
        border-slate-200
        dark:border-[#3D3834]

        rounded-3xl

        shadow-xl
        shadow-slate-200/40
        dark:shadow-black/20

        p-6
        md:p-8

        transition-all
        duration-300
      "
    >

      {/* ========================================== */}
      {/* PDF CONVERTER */}
      {/* ========================================== */}

      <div className="relative z-20 flex justify-end">
        <div className="flex flex-col items-end">
          <button
            type="button"
            onClick={() =>
              conversionInputRef.current?.click()
            }
            disabled={
              uploading ||
              converting
            }
            className="
              inline-flex
              items-center
              gap-2

              rounded-xl
              border
              border-indigo-200
              dark:border-indigo-500/30

              bg-indigo-50
              dark:bg-indigo-500/10

              px-4
              py-2.5

              text-sm
              font-semibold

              text-indigo-700
              dark:text-indigo-300

              shadow-sm

              hover:bg-indigo-100
              dark:hover:bg-indigo-500/15

              hover:border-indigo-300
              dark:hover:border-indigo-400/40

              transition-all
              duration-200

              disabled:cursor-not-allowed
              disabled:opacity-60
            "
            aria-label="Convert a file to PDF"
          >
            <span
              aria-hidden="true"
              className="text-base"
            >
              {converting ? "⏳" : "🔄"}
            </span>

            <span>
              {converting
                ? "Converting..."
                : "Convert to PDF"}
            </span>
          </button>

          <p
            className="
              mt-1.5
              text-[11px]
              text-slate-400
              dark:text-gray-500
              text-right
            "
          >
            DOCX · JPG · PNG · WEBP · TXT
          </p>

          <input
            ref={conversionInputRef}
            type="file"
            accept=".docx,.jpg,.jpeg,.png,.webp,.txt"
            className="hidden"
            disabled={
              uploading ||
              converting
            }
            onChange={(event) => {
              const selectedFile =
                event.target.files?.[0] ||
                null;

              void handleConvertFile(
                selectedFile
              );
            }}
          />
        </div>
      </div>

      {/* ========================================== */}
      {/* SUBTLE BACKGROUND */}
      {/* ========================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -top-32
          -right-32

          h-72
          w-72

          rounded-full

          bg-blue-500/5

          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          -left-32

          h-72
          w-72

          rounded-full

          bg-indigo-500/5

          blur-3xl
        "
      />

      {/* ========================================== */}
      {/* PDF UPLOAD */}
      {/* ========================================== */}

      <label
        className="
          group
          mt-6
          relative
          block

          overflow-hidden

          rounded-2xl

          border-2
          border-dashed
          border-slate-200
          dark:border-[#403B37]

          bg-slate-50/70
          dark:bg-[#302C29]

          cursor-pointer

          hover:border-blue-400
          dark:hover:border-blue-500

          hover:bg-blue-50/40
          dark:hover:bg-blue-500/5

          transition-all
          duration-300
        "
      >

        <div
          className="
            pointer-events-none
            absolute
            inset-0

            bg-gradient-to-br
            from-blue-500/5
            via-transparent
            to-indigo-500/5

            opacity-0
            group-hover:opacity-100

            transition-opacity
            duration-300
          "
        />

        <div
          className="
            relative

            flex
            min-h-[185px]

            flex-col
            items-center
            justify-center

            px-6
            py-10

            text-center
          "
        >

          {/* ICON */}

          <div
            className="
              mb-5

              flex
              h-16
              w-16

              items-center
              justify-center

              rounded-2xl

              bg-gradient-to-br
              from-blue-100
              to-indigo-100

              dark:from-blue-500/15
              dark:to-indigo-500/15

              border
              border-blue-200/70
              dark:border-blue-500/20

              shadow-sm

              group-hover:scale-105

              transition-transform
              duration-300
            "
          >

            {file ? (

              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-emerald-500"
              >
                <path
                  d="M5 12.5L9.5 17L19 7.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

            ) : (

              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="
                  text-blue-600
                  dark:text-blue-400
                "
              >
                <path
                  d="M12 16V4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                <path
                  d="M8 8L12 4L16 8"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M5 14V18C5 19.1046 5.89543 20 7 20H17C18.1046 20 19 19.1046 19 18V14"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>

            )}

          </div>

          {file ? (

            <>
              <p
                className="
                  max-w-full

                  font-semibold
                  text-lg

                  text-slate-900
                  dark:text-white

                  break-all
                "
              >
                {file.name}
              </p>

              <p
                className="
                  text-sm

                  text-blue-600
                  dark:text-blue-400

                  mt-3

                  font-medium
                "
              >
                {t.changePDF}
              </p>
            </>

          ) : (

            <>
              <p
                className="
                  font-semibold
                  text-lg

                  text-slate-900
                  dark:text-white
                "
              >
                {t.choosePDF}
              </p>

              <p
                className="
                  text-sm

                  text-slate-500
                  dark:text-gray-400

                  mt-2
                "
              >
                {t.pdfOnly}
              </p>

              <span
                className="
                  mt-4

                  inline-flex
                  items-center

                  rounded-full

                  border
                  border-slate-200
                  dark:border-[#45403B]

                  bg-white
                  dark:bg-[#34302D]

                  px-3
                  py-1

                  text-xs
                  font-medium

                  text-slate-500
                  dark:text-gray-400
                "
              >
                PDF
              </span>
            </>

          )}

          <input
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {

              const selectedFile =
                e.target.files?.[0] || null;

              if (
                selectedFile &&
                (
                  selectedFile.type !==
                    "application/pdf" &&
                  !selectedFile.name
                    .toLowerCase()
                    .endsWith(".pdf")
                )
              ) {
                toast.error(
                  t.pdfOnly
                );

                e.target.value = "";

                setFile(null);

                return;
              }

              setUploadError(null);

              setFile(
                selectedFile
              );
            }}
          />

        </div>

      </label>

      {/* ========================================== */}
      {/* PRIORITY */}
      {/* ========================================== */}

      <div className="mt-8">

        <div className="mb-4">

          <h3
            className="
              font-bold
              text-lg

              text-slate-900
              dark:text-white
            "
          >
            {t.optionalPriority}
          </h3>

          <p
            className="
              text-sm
              text-slate-500
              dark:text-gray-400

              mt-1
            "
          >
            Choose the importance of this document.
          </p>

        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2

            gap-4
          "
        >

          {/* HIGH */}

          <button
            type="button"
            onClick={() =>
              setPriority(
                priority === "high"
                  ? ""
                  : "high"
              )
            }
            disabled={uploading}
            className={`
              group
              relative

              rounded-2xl
              border

              p-5

              text-left

              transition-all
              duration-300

              disabled:cursor-not-allowed
              disabled:opacity-60

              ${
                priority === "high"
                  ? `
                    border-red-400
                    bg-red-50
                    dark:bg-red-900/10
                    shadow-md
                  `
                  : `
                    border-slate-200
                    dark:border-[#3D3834]

                    bg-white
                    dark:bg-[#302C29]

                    hover:border-red-300
                    hover:shadow-md
                  `
              }
            `}
          >

            <div className="flex items-center gap-4">

              <div
                className="
                  flex
                  h-11
                  w-11

                  items-center
                  justify-center

                  rounded-xl

                  bg-red-50
                  dark:bg-red-500/10

                  border
                  border-red-100
                  dark:border-red-500/20
                "
              >
                <span
                  className="
                    h-3.5
                    w-3.5

                    rounded-full

                    bg-gradient-to-br
                    from-red-400
                    to-rose-600

                    shadow-sm
                  "
                />
              </div>

              <div>

                <div
                  className="
                    font-bold
                    text-slate-900
                    dark:text-white
                  "
                >
                  {t.high}
                </div>

                <div
                  className="
                    text-sm
                    text-slate-500
                    dark:text-gray-400

                    mt-0.5
                  "
                >
                  {t.urgentDocument}
                </div>

              </div>

            </div>

          </button>

          {/* LOW */}

          <button
            type="button"
            onClick={() =>
              setPriority(
                priority === "low"
                  ? ""
                  : "low"
              )
            }
            disabled={uploading}
            className={`
              group
              relative

              rounded-2xl
              border

              p-5

              text-left

              transition-all
              duration-300

              disabled:cursor-not-allowed
              disabled:opacity-60

              ${
                priority === "low"
                  ? `
                    border-emerald-400
                    bg-emerald-50
                    dark:bg-emerald-900/10
                    shadow-md
                  `
                  : `
                    border-slate-200
                    dark:border-[#3D3834]

                    bg-white
                    dark:bg-[#302C29]

                    hover:border-emerald-300
                    hover:shadow-md
                  `
              }
            `}
          >

            <div className="flex items-center gap-4">

              <div
                className="
                  flex
                  h-11
                  w-11

                  items-center
                  justify-center

                  rounded-xl

                  bg-emerald-50
                  dark:bg-emerald-500/10

                  border
                  border-emerald-100
                  dark:border-emerald-500/20
                "
              >
                <span
                  className="
                    h-3.5
                    w-3.5

                    rounded-full

                    bg-gradient-to-br
                    from-emerald-300
                    to-emerald-500

                    shadow-sm
                  "
                />
              </div>

              <div>

                <div
                  className="
                    font-bold
                    text-slate-900
                    dark:text-white
                  "
                >
                  {t.low}
                </div>

                <div
                  className="
                    text-sm
                    text-slate-500
                    dark:text-gray-400

                    mt-0.5
                  "
                >
                  {t.standardDocument}
                </div>

              </div>

            </div>

          </button>

        </div>

        <p
          className="
            text-sm
            text-slate-500
            dark:text-gray-400

            mt-3
          "
        >
          {t.automaticClassification}
        </p>

      </div>

      {/* ========================================== */}
      {/* REMINDER */}
      {/* ========================================== */}

      <div className="mt-10">

        <div
          className="
            flex
            items-center
            justify-between

            rounded-2xl

            border
            border-slate-200
            dark:border-[#3D3834]

            bg-slate-50/60
            dark:bg-[#302C29]

            p-5
          "
        >

          <div className="flex items-center gap-4">

            <div
              className="
                flex
                h-11
                w-11

                shrink-0

                items-center
                justify-center

                rounded-xl

                bg-blue-100
                dark:bg-blue-500/10

                border
                border-blue-200
                dark:border-blue-500/20
              "
            >

              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="
                  text-blue-600
                  dark:text-blue-400
                "
              >
                <path
                  d="M18 8C18 5.79086 16.2091 4 14 4H10C7.79086 4 6 5.79086 6 8V12.5L4.5 15H19.5L18 12.5V8Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M9.5 18C9.9 19.2 10.8 20 12 20C13.2 20 14.1 19.2 14.5 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>

            </div>

            <div>

              <h3
                className="
                  font-bold
                  text-lg

                  text-slate-900
                  dark:text-white
                "
              >
                {t.reminder}
              </h3>

              <p
                className="
                  text-sm

                  text-slate-500
                  dark:text-gray-400

                  mt-1
                "
              >
                {t.reminderDescription}
              </p>

            </div>

          </div>

          {/* TOGGLE */}

          <button
            type="button"
            onClick={() =>
              setEnableReminder(
                !enableReminder
              )
            }
            disabled={uploading}
            aria-pressed={
              enableReminder
            }
            className={`
              relative
              inline-flex

              h-7
              w-14

              shrink-0

              items-center

              rounded-full

              transition-all
              duration-300

              disabled:cursor-not-allowed
              disabled:opacity-60

              ${
                enableReminder
                  ? "bg-blue-600 shadow-lg shadow-blue-500/20"
                  : "bg-slate-300 dark:bg-[#45403B]"
              }
            `}
          >

            <span
              className={`
                inline-block

                h-6
                w-6

                rounded-full

                bg-white

                shadow-sm

                transform

                transition-transform
                duration-300

                ${
                  enableReminder
                    ? "translate-x-7"
                    : "translate-x-1"
                }
              `}
            />

          </button>

        </div>

        {enableReminder && (

          <div
            className="
              mt-5

              rounded-2xl

              border
              border-blue-100
              dark:border-blue-500/20

              bg-blue-50/50
              dark:bg-blue-500/5

              p-5
            "
          >

            <div
              className="
                grid
                md:grid-cols-2

                gap-5
              "
            >

              {/* DATE */}

              <div>

                <label
                  className="
                    block
                    mb-2

                    text-sm
                    font-semibold

                    text-slate-900
                    dark:text-white
                  "
                >
                  {t.reminderDate}
                </label>

                <input
                  type="date"
                  value={reminderDate}
                  onChange={(e) =>
                    setReminderDate(
                      e.target.value
                    )
                  }
                  disabled={uploading}
                  className="
                    w-full

                    rounded-xl

                    border
                    border-slate-200
                    dark:border-[#45403B]

                    bg-white
                    dark:bg-[#34302D]

                    px-4
                    py-3

                    text-slate-900
                    dark:text-white

                    shadow-sm

                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500/30
                    focus:border-blue-500

                    transition

                    disabled:opacity-60
                  "
                />

              </div>

              {/* TIME */}

              <div>

                <label
                  className="
                    block
                    mb-2

                    text-sm
                    font-semibold

                    text-slate-900
                    dark:text-white
                  "
                >
                  {t.reminderTime}
                </label>

                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) =>
                    setReminderTime(
                      e.target.value
                    )
                  }
                  disabled={uploading}
                  className="
                    w-full

                    rounded-xl

                    border
                    border-slate-200
                    dark:border-[#45403B]

                    bg-white
                    dark:bg-[#34302D]

                    px-4
                    py-3

                    text-slate-900
                    dark:text-white

                    shadow-sm

                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500/30
                    focus:border-blue-500

                    transition

                    disabled:opacity-60
                  "
                />

              </div>

              {/* REPEAT */}

              <div className="md:col-span-2">

                <label
                  className="
                    block
                    mb-2

                    text-sm
                    font-semibold

                    text-slate-900
                    dark:text-white
                  "
                >
                  {t.repeat}
                </label>

                <select
                  value={repeat}
                  onChange={(e) =>
                    setRepeat(
                      e.target.value
                    )
                  }
                  disabled={uploading}
                  className="
                    w-full

                    rounded-xl

                    border
                    border-slate-200
                    dark:border-[#45403B]

                    bg-white
                    dark:bg-[#34302D]

                    px-4
                    py-3

                    text-slate-900
                    dark:text-white

                    shadow-sm

                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500/30
                    focus:border-blue-500

                    transition

                    disabled:opacity-60
                  "
                >

                  <option value="none">
                    {t.none}
                  </option>

                  <option value="daily">
                    {t.daily}
                  </option>

                  <option value="weekly">
                    {t.weekly}
                  </option>

                  <option value="monthly">
                    {t.monthly}
                  </option>

                </select>

              </div>

            </div>

          </div>

        )}

      </div>

      {/* ========================================== */}
      {/* NOTIFICATION TYPE */}
      {/* ========================================== */}

      <div className="mt-10">

        <div className="flex items-center gap-3 mb-5">

          <div
            className="
              flex
              h-10
              w-10

              items-center
              justify-center

              rounded-xl

              bg-indigo-100
              dark:bg-indigo-500/10

              border
              border-indigo-200
              dark:border-indigo-500/20
            "
          >

            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="
                text-indigo-600
                dark:text-indigo-400
              "
            >
              <path
                d="M4 6.5C4 5.67157 4.67157 5 5.5 5H18.5C19.3284 5 20 5.67157 20 6.5V15.5C20 16.3284 19.3284 17 18.5 17H13L9 20V17H5.5C4.67157 17 4 16.3284 4 15.5V6.5Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

          </div>

          <div>

            <h3
              className="
                font-bold
                text-lg

                text-slate-900
                dark:text-white
              "
            >
              {t.notificationType}
            </h3>

            <p
              className="
                text-sm
                text-slate-500
                dark:text-gray-400

                mt-0.5
              "
            >
              Choose how Life AiOS should notify you.
            </p>

          </div>

        </div>

        <div className="space-y-3">

          {/* DASHBOARD */}

          <label
            className={`
              flex
              items-center
              justify-between

              rounded-2xl

              border

              p-5

              cursor-pointer

              transition-all
              duration-200

              ${
                dashboardNotification
                  ? `
                    border-blue-200
                    dark:border-blue-500/20

                    bg-blue-50/50
                    dark:bg-blue-500/5
                  `
                  : `
                    border-slate-200
                    dark:border-[#3D3834]

                    bg-white
                    dark:bg-[#302C29]

                    hover:border-slate-300
                  `
              }
            `}
          >

            <div className="flex items-center gap-4">

              <div
                className="
                  flex
                  h-10
                  w-10

                  items-center
                  justify-center

                  rounded-xl

                  bg-blue-100
                  dark:bg-blue-500/10
                "
              >

                <span
                  className="
                    text-blue-600
                    dark:text-blue-400
                  "
                >
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6 10C6 6.68629 8.68629 4 12 4C15.3137 4 18 6.68629 18 10V14L20 17H4L6 14V10Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M10 20H14"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>

              </div>

              <div>

                <p
                  className="
                    font-semibold

                    text-slate-900
                    dark:text-white
                  "
                >
                  {t.dashboardNotification}
                </p>

                <p
                  className="
                    text-sm

                    text-slate-500
                    dark:text-gray-400

                    mt-1
                  "
                >
                  {t.dashboardNotifications}
                </p>

              </div>

            </div>

            <input
              type="checkbox"
              checked={
                dashboardNotification
              }
              onChange={(e) =>
                setDashboardNotification(
                  e.target.checked
                )
              }
              disabled={uploading}
              className="
                h-5
                w-5

                rounded

                accent-blue-600

                cursor-pointer
              "
            />

          </label>

          {/* EMAIL */}

          <label
            className={`
              flex
              items-center
              justify-between

              rounded-2xl

              border

              p-5

              cursor-pointer

              transition-all
              duration-200

              ${
                emailNotification
                  ? `
                    border-indigo-200
                    dark:border-indigo-500/20

                    bg-indigo-50/50
                    dark:bg-indigo-500/5
                  `
                  : `
                    border-slate-200
                    dark:border-[#3D3834]

                    bg-white
                    dark:bg-[#302C29]

                    hover:border-slate-300
                  `
              }
            `}
          >

            <div className="flex items-center gap-4">

              <div
                className="
                  flex
                  h-10
                  w-10

                  items-center
                  justify-center

                  rounded-xl

                  bg-indigo-100
                  dark:bg-indigo-500/10
                "
              >

                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="
                    text-indigo-600
                    dark:text-indigo-400
                  "
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />

                  <path
                    d="M4 7L12 13L20 7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

              </div>

              <div>

                <p
                  className="
                    font-semibold

                    text-slate-900
                    dark:text-white
                  "
                >
                  {t.emailNotification}
                </p>

                <p
                  className="
                    text-sm

                    text-slate-500
                    dark:text-gray-400

                    mt-1
                  "
                >
                  {t.emailNotifications}
                </p>

              </div>

            </div>

            <input
              type="checkbox"
              checked={
                emailNotification
              }
              onChange={(e) =>
                setEmailNotification(
                  e.target.checked
                )
              }
              disabled={uploading}
              className="
                h-5
                w-5

                rounded

                accent-indigo-600

                cursor-pointer
              "
            />

          </label>

          {/* MOBILE */}

          <div
            className="
              flex
              items-center
              justify-between

              rounded-2xl

              border
              border-dashed
              border-slate-300
              dark:border-[#3D3834]

              bg-slate-50/60
              dark:bg-[#302C29]

              p-5

              opacity-70
            "
          >

            <div className="flex items-center gap-4">

              <div
                className="
                  flex
                  h-10
                  w-10

                  items-center
                  justify-center

                  rounded-xl

                  bg-slate-200
                  dark:bg-[#3A3531]

                  text-slate-500
                  dark:text-gray-400
                "
              >

                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect
                    x="7"
                    y="3"
                    width="10"
                    height="18"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />

                  <path
                    d="M10 18H14"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>

              </div>

              <div>

                <p
                  className="
                    font-semibold

                    text-slate-900
                    dark:text-white
                  "
                >
                  {t.mobilePush}
                </p>

                <p
                  className="
                    text-sm

                    text-slate-500
                    dark:text-gray-400

                    mt-1
                  "
                >
                  {t.comingSoon}
                </p>

              </div>

            </div>

            <div
              className="
                h-5
                w-9

                rounded-full

                bg-slate-200
                dark:bg-[#45403B]

                relative
              "
            >
              <div
                className="
                  absolute
                  left-0.5
                  top-0.5

                  h-4
                  w-4

                  rounded-full

                  bg-white

                  shadow-sm
                "
              />
            </div>

          </div>

        </div>

      </div>

      {/* ========================================== */}
      {/* UPLOAD LIMIT / ERROR */}
      {/* ========================================== */}

      {uploadError && (
        <div
          className={`
            mt-10
            rounded-2xl
            border
            p-5
            shadow-sm
            ${
              uploadError.plan === "free"
                ? `
                    border-amber-200
                    bg-amber-50
                    dark:border-amber-500/20
                    dark:bg-amber-500/5
                  `
                : `
                    border-purple-200
                    bg-purple-50
                    dark:border-purple-500/20
                    dark:bg-purple-500/5
                  `
            }
          `}
        >
          <div className="flex items-start gap-4">
            <div
              className={`
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                text-lg
                ${
                  uploadError.plan === "free"
                    ? `
                        bg-amber-100
                        text-amber-700
                        dark:bg-amber-500/10
                        dark:text-amber-300
                      `
                    : `
                        bg-purple-100
                        text-purple-700
                        dark:bg-purple-500/10
                        dark:text-purple-300
                      `
                }
              `}
            >
              {uploadError.plan === "free" ? "!" : "✓"}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3
                    className="
                      font-bold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    {uploadError.plan === "free"
                      ? "Free plan limit reached"
                      : "Monthly Pro limit reached"}
                  </h3>

                  <p
                    className="
                      mt-1.5
                      text-sm
                      leading-6
                      text-slate-600
                      dark:text-gray-300
                    "
                  >
                    {uploadError.message}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setUploadError(null)}
                  className="
                    shrink-0
                    rounded-lg
                    px-2
                    py-1
                    text-slate-400
                    transition
                    hover:bg-black/5
                    hover:text-slate-700
                    dark:hover:bg-white/5
                    dark:hover:text-white
                  "
                  aria-label="Dismiss upload limit message"
                >
                  &times;
                </button>
              </div>

              <div
                className="
                  mt-4
                  flex
                  flex-col
                  gap-3
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <p
                  className="
                    text-sm
                    font-medium
                    text-slate-700
                    dark:text-gray-200
                  "
                >
                  {uploadError.used} / {uploadError.limit} documents used
                </p>

                {uploadError.plan === "free" ? (
                  <a
                    href="/settings#plan"
                    className="
                      inline-flex
                      items-center
                      justify-center
                      rounded-xl
                      bg-gradient-to-r
                      from-blue-600
                      to-indigo-600
                      px-4
                      py-2.5
                      text-sm
                      font-semibold
                      text-white
                      shadow-md
                      transition
                      hover:-translate-y-0.5
                      hover:shadow-lg
                    "
                  >
                     Upgrade to Pro
                  </a>
                ) : (
                  <span
                    className="
                      inline-flex
                      items-center
                      rounded-xl
                      border
                      border-purple-200
                      bg-white/70
                      px-4
                      py-2.5
                      text-sm
                      font-semibold
                      text-purple-700
                      dark:border-purple-500/20
                      dark:bg-[#302C29]
                      dark:text-purple-300
                    "
                  >
                    Resets with your next billing period
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* ANALYZE / UPLOAD BUTTON */}
      {/* ========================================== */}

      <button
        type="button"
        onClick={handleUpload}
        disabled={
          uploading ||
          !file
        }
        className="
          group
          relative

          mt-10

          w-full

          overflow-hidden

          rounded-2xl

          bg-gradient-to-r
          from-blue-600
          to-indigo-600

          py-4

          text-lg
          font-bold
          text-white

          shadow-lg
          shadow-blue-500/20

          hover:shadow-xl
          hover:shadow-blue-500/25

          hover:-translate-y-0.5

          transition-all
          duration-300

          disabled:opacity-50
          disabled:cursor-not-allowed
          disabled:hover:translate-y-0
        "
      >

        <span
          className="
            absolute
            inset-0

            bg-white/10

            translate-y-full
            group-hover:translate-y-0

            transition-transform
            duration-300
          "
        />

        <span className="relative">

          {uploading
            ? t.analyzing
            : t.analyzeDocument}

        </span>

      </button>

    </div>
  );
}