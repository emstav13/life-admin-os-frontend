"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";

export default function UpcomingDeadlines() {
  const [reminders, setReminders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadReminders = async () => {
    try {
      setLoading(true);
      setError("");

const response = await fetch(
  `${API_URL}/reminders`
);
      if (!response.ok) {
        throw new Error("Failed to load reminders");
      }

      const data = await response.json();

      setReminders(data);
    } catch (err) {
      console.error(err);
      setError("Couldn't load reminders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReminders();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow mb-8 animate-pulse">
        <div className="h-6 w-48 bg-gray-200 rounded mb-6"></div>

        {[1, 2, 3].map((item) => (
          <div key={item} className="mb-4">
            <div className="h-4 w-40 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 w-24 bg-[#f8fafc] rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 p-6 rounded-lg mb-8 text-center">
        <p className="text-red-600 mb-4">{error}</p>

        <button
          onClick={loadReminders}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-200 mb-8">
      <h2 className="text-xl font-semibold mb-4">📅 Upcoming Deadlines</h2>

      <div className="space-y-3">
        {reminders.length === 0 && (
          <div className="text-center py-8">
            <div className="text-5xl mb-3">🎉</div>

            <p className="font-semibold">No upcoming deadlines</p>

            <p className="text-gray-500 mt-2">You're all caught up.</p>
          </div>
        )}

        {reminders.map((reminder) => (
          <div
            key={reminder.id}
            className="border-l-4 border-orange-500 bg-orange-50 rounded-r-lg p-4 hover:bg-orange-100 transition"
          >
            <p className="font-semibold">{reminder.title}</p>

            <p className="text-sm text-gray-500 mt-1">📅 {reminder.due_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
