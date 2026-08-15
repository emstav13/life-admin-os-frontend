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
  // NOTHING TO SHOW
  // =========================================================

  if (!visibleReminder) {
    return null;
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <div
      className="
        fixed
        top-6
        right-6
        z-[9999]

        w-[420px]
        max-w-[calc(100vw-2rem)]

        overflow-hidden

        rounded-2xl

        border
        border-gray-200
        dark:border-[#3D3834]

        bg-white
        dark:bg-[#2B2724]

        shadow-2xl

        animate-in
        slide-in-from-right-5
        fade-in
        duration-300
      "
    >
      {/* TOP ACCENT */}

      <div
        className="
          h-1
          bg-gradient-to-r
          from-blue-600
          to-indigo-600
        "
      />

      <div className="p-5">

        {/* HEADER */}

        <div
          className="
            flex
            items-start
            justify-between
          "
        >
          <div
            className="
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

                bg-blue-100
                dark:bg-blue-950/50

                text-xl
              "
            >
              🔔
            </div>

            <div>
              <h3
                className="
                  font-bold
                  text-slate-900
                  dark:text-white
                "
              >
                Life AiOS Reminder
              </h3>

              <p
                className="
                  mt-0.5
                  text-xs
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Notification
              </p>
            </div>
          </div>

          {/* CLOSE */}

          <button
            type="button"
            onClick={closeNotification}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center

              rounded-lg

              text-gray-400

              hover:bg-gray-100
              hover:text-gray-700

              dark:hover:bg-[#3A3531]
              dark:hover:text-white

              transition
            "
            aria-label="Close notification"
          >
            ×
          </button>
        </div>

        {/* DOCUMENT */}

        <div
          className="
            mt-5

            rounded-xl

            border
            border-gray-200
            dark:border-[#3D3834]

            bg-gray-50
            dark:bg-[#34302D]

            p-4
          "
        >
          <div
            className="
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

                rounded-lg

                border
                border-gray-200
                dark:border-[#45403B]

                bg-white
                dark:bg-[#2B2724]
              "
            >
              📄
            </div>

            <div className="min-w-0">
              <p
                className="
                  text-xs
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Document
              </p>

              <p
                className="
                  mt-0.5
                  truncate
                  font-semibold
                  text-slate-900
                  dark:text-white
                "
                title={
                  visibleReminder.document_name
                }
              >
                {visibleReminder.document_name}
              </p>
            </div>
          </div>
        </div>

        {/* REMINDER CONTENT */}

        <div className="mt-5">
          <h4
            className="
              font-semibold
              text-slate-900
              dark:text-white
            "
          >
            {visibleReminder.title}
          </h4>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-gray-600
              dark:text-gray-300
            "
          >
            {visibleReminder.message}
          </p>
        </div>

        {/* DATE / TIME */}

        {visibleReminder.due_date && (
          <div
            className="
              mt-4

              flex
              flex-wrap
              items-center
              gap-2

              text-sm

              text-gray-500
              dark:text-gray-400
            "
          >
            <span>📅</span>

            <span>
              {visibleReminder.due_date}
            </span>

            {visibleReminder.reminder_time && (
              <>
                <span>·</span>

                <span>
                  {visibleReminder.reminder_time}
                </span>
              </>
            )}
          </div>
        )}

        {/* REPEAT */}

        {visibleReminder.repeat_type &&
          visibleReminder.repeat_type !== "none" && (
            <div
              className="
                mt-3

                inline-flex
                items-center
                gap-2

                rounded-full

                border
                border-blue-100
                dark:border-blue-900

                bg-blue-50
                dark:bg-blue-950/40

                px-3
                py-1

                text-xs
                font-medium

                text-blue-700
                dark:text-blue-300
              "
            >
              <span>↻</span>

              <span>
                Repeats:{" "}
                {visibleReminder.repeat_type}
              </span>
            </div>
          )}

        {/* ACTIONS */}

        <div
          className="
            mt-6

            flex
            items-center
            justify-end
            gap-3
          "
        >
          {/* DISMISS */}

          <button
            type="button"
            onClick={closeNotification}
            className="
              rounded-xl

              px-4
              py-2

              text-sm
              font-medium

              text-gray-600
              dark:text-gray-300

              hover:bg-gray-100
              dark:hover:bg-[#3A3531]

              transition
            "
          >
            Dismiss
          </button>

          {/* VIEW DOCUMENT */}

          <button
            type="button"
            onClick={viewDocument}
            className="
              rounded-xl

              bg-blue-600

              px-4
              py-2

              text-sm
              font-semibold

              text-white

              shadow-sm

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