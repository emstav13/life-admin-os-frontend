"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/lib/api-auth";

type Reminder = {
  id: string;
  document_id: string;
  user_id: string;
  document_name: string;
  title: string;
  message: string;
  due_date: string;
  reminder_time?: string | null;
  repeat_type?: string;
  dashboard_notification: boolean;
  email_notification: boolean;
  mobile_push: boolean;
  read: boolean;
  dashboard_shown: boolean;
  created_at: string;
};

export default function NotificationCenter() {
  const [visibleReminder, setVisibleReminder] =
    useState<Reminder | null>(null);

  // =========================================================
  // CHECK IF REMINDER IS ACTUALLY DUE
  // =========================================================

  function isReminderDue(reminder: Reminder): boolean {
    if (!reminder.due_date) {
      return false;
    }

    try {
      const now = new Date();

      /*
       * Backend normally gives:
       *
       * due_date:
       * 2026-08-10
       *
       * reminder_time:
       * 14:30
       *
       * If reminder_time exists, we compare the exact
       * date + time.
       *
       * If reminder_time does not exist, the reminder
       * becomes eligible starting on the due date.
       */

      const dateOnly = reminder.due_date.slice(0, 10);

      if (reminder.reminder_time) {
        const timeOnly = reminder.reminder_time.slice(0, 5);

        const reminderDate = new Date(
          `${dateOnly}T${timeOnly}:00`
        );

        if (Number.isNaN(reminderDate.getTime())) {
          return false;
        }

        return reminderDate <= now;
      }

      /*
       * No specific time:
       *
       * We only allow the notification from the due date
       * onwards.
       *
       * IMPORTANT:
       * A reminder for tomorrow will NOT appear today.
       */

      const today = new Date();

      const todayDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );

      const dueDate = new Date(
        `${dateOnly}T00:00:00`
      );

      if (Number.isNaN(dueDate.getTime())) {
        return false;
      }

      return dueDate <= todayDate;
    } catch (error) {
      console.error(
        "Failed to calculate reminder date:",
        error
      );

      return false;
    }
  }

  // =========================================================
  // LOAD REMINDERS
  // =========================================================

  async function loadReminders() {
    try {
      const response = await authFetch("/reminders");

      if (!response.ok) {
        const errorData =
          await response.json().catch(() => null);

        console.error(
          "Failed to load reminders:",
          errorData
        );

        return;
      }

      const data = await response.json();

      const reminders: Reminder[] =
        Array.isArray(data) ? data : [];

      // =======================================================
      // FIND A REMINDER THAT IS ACTUALLY DUE
      // =======================================================

      const newReminder = reminders.find(
        (reminder) =>
          reminder.dashboard_notification &&
          !reminder.read &&
          !reminder.dashboard_shown &&
          isReminderDue(reminder)
      );

      if (newReminder) {
        setVisibleReminder(newReminder);
      }
    } catch (error) {
      console.error(
        "NotificationCenter error:",
        error
      );
    }
  }

  // =========================================================
  // INITIAL LOAD + POLLING
  // =========================================================

  useEffect(() => {
    loadReminders();

    /*
     * Check every 30 seconds.
     *
     * This allows a reminder to appear when its exact
     * scheduled time arrives without refreshing the page.
     */

    const interval = window.setInterval(
      loadReminders,
      30000
    );

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  // =========================================================
  // MARK AS SHOWN
  // =========================================================

  async function markAsShown(
    reminder: Reminder
  ) {
    try {
      const response = await authFetch(
        `/reminders/${reminder.id}/shown`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        const errorData =
          await response.json().catch(() => null);

        console.error(
          "Failed to mark reminder as shown:",
          errorData
        );
      }
    } catch (error) {
      console.error(
        "Failed to mark reminder as shown:",
        error
      );
    }
  }

  // =========================================================
  // CLOSE NOTIFICATION
  // =========================================================

  async function closeNotification() {
    if (!visibleReminder) {
      return;
    }

    await markAsShown(visibleReminder);

    setVisibleReminder(null);
  }

  // =========================================================
  // VIEW DOCUMENT
  // =========================================================

  async function viewDocument() {
    if (!visibleReminder) {
      return;
    }

    const documentId =
      visibleReminder.document_id;

    if (!documentId) {
      console.error(
        "Missing document ID:",
        visibleReminder
      );

      return;
    }

    await markAsShown(visibleReminder);

    window.location.href =
      `/documents/${documentId}`;
  }

  // =========================================================
  // DISPLAY HELPERS
  // =========================================================

  function getRepeatLabel(repeatType?: string): string | null {
    switch ((repeatType || "").toLowerCase()) {
      case "daily":
        return "Every day";
      case "weekly":
        return "Every week";
      case "monthly":
        return "Every month";
      default:
        return null;
    }
  }

  function formatDueDate(
    dateString: string,
    timeString?: string | null
  ): string {
    try {
      const dateOnly = dateString.slice(0, 10);
      const date = new Date(`${dateOnly}T00:00:00`);

      if (Number.isNaN(date.getTime())) {
        return dateString;
      }

      const today = new Date();
      const startToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      const startTomorrow = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1
      );
      const startDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );

      let label: string;

      if (startDate.getTime() === startToday.getTime()) {
        label = "Today";
      } else if (startDate.getTime() === startTomorrow.getTime()) {
        label = "Tomorrow";
      } else {
        label = new Intl.DateTimeFormat(undefined, {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }).format(date);
      }

      return timeString
        ? `${label} · ${timeString.slice(0, 5)}`
        : label;
    } catch {
      return dateString;
    }
  }

  function getDocumentDisplayName(documentName: string): string {
    const clean = documentName.trim();

    if (!clean) return "Document";

    return (
      clean
        .replace(/\.(pdf|docx?|xlsx?|pptx?)$/i, "")
        .replace(/_+/g, " ")
        .replace(/\s+/g, " ")
        .trim() || "Document"
    );
  }

  // =========================================================
  // NOTHING TO SHOW
  // =========================================================

  if (!visibleReminder) {
    return null;
  }

  const repeatLabel = getRepeatLabel(
    visibleReminder.repeat_type
  );

  const documentDisplayName = getDocumentDisplayName(
    visibleReminder.document_name
  );

  const dueLabel = formatDueDate(
    visibleReminder.due_date,
    visibleReminder.reminder_time
  );

  // =========================================================
  // PREMIUM UI
  // =========================================================

  return (
    <div
      className="
        fixed
        right-5
        top-5
        z-[9999]
        w-[420px]
        max-w-[calc(100vw-2rem)]
        overflow-hidden
        rounded-[22px]
        border
        border-slate-200
        dark:border-[#403A35]
        bg-white
        dark:bg-[#25211F]
        shadow-[0_24px_70px_rgba(15,23,42,0.18)]
        animate-in
        slide-in-from-right-5
        fade-in
        duration-300
      "
    >
      <div
        className="
          border-b
          border-slate-200
          dark:border-[#3A3531]
          bg-gradient-to-br
          from-slate-50
          via-white
          to-blue-50/70
          dark:from-[#2A2522]
          dark:via-[#25211F]
          dark:to-[#252C38]
          px-5
          pb-5
          pt-5
        "
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-blue-600
                text-xl
                text-white
                shadow-lg
              "
            >
              🔔
            </div>

            <div className="min-w-0">
              <p
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-blue-600
                  dark:text-blue-300
                "
              >
                Reminder
              </p>

              <h3
                className="
                  mt-0.5
                  truncate
                  text-lg
                  font-bold
                  tracking-tight
                  text-slate-950
                  dark:text-white
                "
              >
                Life AiOS
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={closeNotification}
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              text-slate-400
              hover:bg-slate-100
              hover:text-slate-700
              dark:hover:bg-[#35302C]
              dark:hover:text-white
              transition
            "
            aria-label="Close reminder"
          >
            ×
          </button>
        </div>

        <p
          className="
            mt-4
            text-sm
            leading-6
            text-slate-600
            dark:text-slate-300
          "
        >
          Your reminder is due now.
        </p>
      </div>

      <div className="p-5">
        <div
          className="
            rounded-2xl
            border
            border-slate-200
            dark:border-[#403A35]
            bg-slate-50
            dark:bg-[#2E2926]
            p-4
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-slate-200
                dark:border-[#48413B]
                bg-white
                dark:bg-[#25211F]
                text-lg
                shadow-sm
              "
            >
              📄
            </div>

            <div className="min-w-0">
              <p
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-400
                  dark:text-slate-500
                "
              >
                Document
              </p>

              <p
                className="
                  mt-1
                  truncate
                  text-sm
                  font-semibold
                  text-slate-900
                  dark:text-white
                "
                title={visibleReminder.document_name}
              >
                {documentDisplayName}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <p
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-wide
              text-slate-400
              dark:text-slate-500
            "
          >
            Reminder
          </p>

          <h4
            className="
              mt-1.5
              text-base
              font-semibold
              leading-6
              text-slate-950
              dark:text-white
            "
          >
            {visibleReminder.title
              ? visibleReminder.title.replace(
                  /^Reminder for\s+/i,
                  ""
                )
              : documentDisplayName}
          </h4>

          {visibleReminder.message &&
            !/^Reminder for\s+/i.test(
              visibleReminder.message
            ) && (
              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-slate-600
                  dark:text-slate-300
                "
              >
                {visibleReminder.message}
              </p>
            )}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-200
              dark:border-[#403A35]
              bg-white
              dark:bg-[#2B2724]
              px-3
              py-2
              text-xs
              font-medium
              text-slate-600
              dark:text-slate-300
            "
          >
            <span>📅</span>
            <span>{dueLabel}</span>
          </div>

          {repeatLabel && (
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-blue-100
                dark:border-blue-900
                bg-blue-50
                dark:bg-blue-950/40
                px-3
                py-2
                text-xs
                font-semibold
                text-blue-700
                dark:text-blue-300
              "
            >
              <span>↻</span>
              <span>{repeatLabel}</span>
            </div>
          )}
        </div>

        <div
          className="
            mt-6
            flex
            items-center
            justify-end
            gap-2
          "
        >
          <button
            type="button"
            onClick={closeNotification}
            className="
              rounded-xl
              border
              border-slate-200
              dark:border-[#403A35]
              bg-white
              dark:bg-[#2B2724]
              px-4
              py-2.5
              text-sm
              font-semibold
              text-slate-600
              dark:text-slate-200
              hover:bg-slate-50
              dark:hover:bg-[#35302C]
              transition
            "
          >
            Dismiss
          </button>

          <button
            type="button"
            onClick={viewDocument}
            className="
              rounded-xl
              bg-blue-600
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-blue-600/20
              hover:bg-blue-700
              transition
            "
          >
            View document →
          </button>
        </div>
      </div>
    </div>
  );
}