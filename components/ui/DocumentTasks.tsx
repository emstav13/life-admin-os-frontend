"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";
import { toast } from "sonner";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function DocumentTasks({
  documentId,
}: {
  documentId: string;
}) {
  const { t } = useLanguage();

  const [tasks, setTasks] = useState<any[]>([]);

  async function loadTasks() {
    const res = await fetch(`${API_URL}/tasks/${documentId}`);
    const data = await res.json();
    setTasks(data);
  }

  useEffect(() => {
    loadTasks();
  }, [documentId]);

  async function completeTask(taskId: string) {
    try {
      await fetch(`${API_URL}/tasks/${taskId}/complete`, {
        method: "PATCH",
      });

      toast.success(t.taskCompleted);

      loadTasks();

    } catch {

      toast.error(t.taskCompleteError);

    }
  }

  const completed = tasks.filter((t) => t.completed).length;
  const total = tasks.length;

  const progress =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  return (
    <div className="mb-10">

      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        ✅ {t.tasks}
      </h2>

      {total > 0 && (
        <>

          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">

            <span>
              {completed} / {total} {t.completed}
            </span>

            <span>
              {progress}%
            </span>

          </div>

          <div className="w-full h-3 bg-gray-200 dark:bg-[#3D3834] rounded-full overflow-hidden mb-6">

            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </>
      )}

      {total === 0 && (

        <div
          className="
            text-center
            py-8

            bg-gray-50
            dark:bg-[#2B2724]

            border
            border-gray-200
            dark:border-[#3D3834]

            rounded-xl
          "
        >

          <div className="text-5xl mb-3">
            📋
          </div>

          <p className="font-semibold dark:text-white">
            {t.noTasksGenerated}
          </p>

        </div>

      )}

      {tasks.length > 0 && (

        <div className="space-y-3">

          {tasks.map((task) => (

            <div
              key={task.id}
              className={`flex items-center justify-between p-4 rounded-xl border transition ${
                task.completed
                  ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700"
                  : "bg-white dark:bg-[#2B2724] border-gray-200 dark:border-[#3D3834]"
              }`}
            >

              <div className="flex items-center gap-3">

                <span className="text-xl">
                  {task.completed ? "✅" : "☐"}
                </span>

                <span
                  className={`${
                    task.completed
                      ? "line-through text-gray-500 dark:text-gray-400"
                      : "dark:text-white"
                  }`}
                >
                  {task.title}
                </span>

              </div>
                            {!task.completed && (

                <button
                  onClick={() => completeTask(task.id)}
                  className="
                    bg-green-600
                    hover:bg-green-700

                    text-white

                    px-4
                    py-2

                    rounded-lg

                    transition
                  "
                >
                  {t.complete}
                </button>

              )}

            </div>

          ))}

        </div>

      )}

      {total > 0 && completed === total && (

        <div
          className="
            mt-6

            bg-green-100
            dark:bg-green-900/20

            border
            border-green-300
            dark:border-green-700

            rounded-xl

            p-5

            text-center
          "
        >

          <div className="text-4xl mb-2">
            🎉
          </div>

          <p className="font-bold text-green-700 dark:text-green-300">
            {t.allTasksCompleted}
          </p>

        </div>

      )}

    </div>
  );
}