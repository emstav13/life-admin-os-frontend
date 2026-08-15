"use client";

import { useState } from "react";
import { toast } from "sonner";

import { API_URL } from "@/lib/api";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function AskAllDocuments() {
  const { t } = useLanguage();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAll() {
    if (!question.trim() || loading) return;

    setLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/ask-all-documents`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();

      setAnswer(data.answer);
      setQuestion("");

      toast.success(t.aiResponseGenerated);
    } catch (error) {
      console.error(error);

      toast.error(t.aiRequestFailed);
    } finally {
      setLoading(false);
    }
  }

  function useSuggestion(text: string) {
    setQuestion(text);
  }

  return (
    <div
      className="
        relative
        min-h-[calc(100vh-220px)]

        flex
        flex-col

        overflow-hidden

        rounded-[28px]

        border
        border-slate-200
        dark:border-[#3D3834]

        bg-white
        dark:bg-[#24211F]

        shadow-sm

        transition-colors
        duration-300
      "
    >

      {/* ================================= */}
      {/* BACKGROUND GLOW */}
      {/* ================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -top-40
          left-1/2
          -translate-x-1/2

          h-[420px]
          w-[700px]

          rounded-full

          bg-blue-500/[0.06]

          blur-3xl

          dark:bg-blue-500/[0.04]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[-200px]
          right-[-150px]

          h-[400px]
          w-[400px]

          rounded-full

          bg-indigo-500/[0.04]

          blur-3xl
        "
      />


      {/* ================================= */}
      {/* CONTENT */}
      {/* ================================= */}

      <div
        className="
          relative
          z-10

          flex
          flex-1
          flex-col

          px-5
          py-10

          sm:px-8
          md:px-12
          lg:px-16
        "
      >

        {/* ================================= */}
        {/* HERO */}
        {/* ================================= */}

        <div
          className="
            flex
            flex-col
            items-center

            text-center

            pt-6
            md:pt-12
          "
        >

          {/* AI ICON */}

          <div
            className="
              mb-6

              flex
              h-14
              w-14

              items-center
              justify-center

              rounded-2xl

              border
              border-slate-200
              dark:border-[#45403B]

              bg-white
              dark:bg-[#34302D]

              shadow-sm
            "
          >

            <svg
              width="27"
              height="27"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 3L13.8 8.2L19 10L13.8 11.8L12 17L10.2 11.8L5 10L10.2 8.2L12 3Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
                className="
                  text-blue-600
                  dark:text-blue-400
                "
              />

              <path
                d="M19 15L19.8 17.2L22 18L19.8 18.8L19 21L18.2 18.8L16 18L18.2 17.2L19 15Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
                className="
                  text-indigo-500
                  dark:text-indigo-400
                "
              />
            </svg>

          </div>


          {/* TITLE */}

          <h1
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl

              font-semibold
              tracking-tight

              text-slate-900
              dark:text-white
            "
          >
            {t.askYourDocumentBrain}
          </h1>


          {/* DESCRIPTION */}

          <p
            className="
              mt-4

              max-w-2xl

              text-base
              md:text-lg

              leading-7

              text-slate-500
              dark:text-gray-400
            "
          >
            {t.askAllDocuments}
          </p>

        </div>


        {/* ================================= */}
        {/* ANSWER */}
        {/* ================================= */}

        {answer && (

          <div
            className="
              mx-auto

              mt-10

              w-full
              max-w-4xl

              rounded-3xl

              border
              border-slate-200
              dark:border-[#3D3834]

              bg-slate-50
              dark:bg-[#2B2724]

              p-5
              sm:p-7

              shadow-sm
            "
          >

            {/* ANSWER HEADER */}

            <div
              className="
                flex
                items-center
                gap-3

                mb-5
              "
            >

              <div
                className="
                  flex
                  h-9
                  w-9

                  items-center
                  justify-center

                  rounded-xl

                  bg-blue-100
                  dark:bg-blue-500/10

                  text-blue-600
                  dark:text-blue-400
                "
              >

                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 3L13.8 8.2L19 10L13.8 11.8L12 17L10.2 11.8L5 10L10.2 8.2L12 3Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />
                </svg>

              </div>

              <span
                className="
                  text-sm
                  font-semibold

                  text-slate-700
                  dark:text-gray-200
                "
              >
                Life AiOS
              </span>

            </div>


            {/* ANSWER */}

            <div
              className="
                whitespace-pre-wrap

                text-[15px]
                sm:text-base

                leading-7

                text-slate-700
                dark:text-gray-200
              "
            >
              {answer}
            </div>

          </div>

        )}


        {/* ================================= */}
        {/* SUGGESTIONS */}
        {/* ================================= */}

        {!answer && !loading && (

          <div
            className="
              mx-auto

              mt-10

              w-full
              max-w-4xl
            "
          >

            <p
              className="
                mb-4

                text-center

                text-xs
                font-semibold

                uppercase
                tracking-wider

                text-slate-400
                dark:text-gray-500
              "
            >
              Try asking
            </p>


            <div
              className="
                grid

                grid-cols-1
                sm:grid-cols-2

                gap-3
              "
            >

              {/* SUGGESTION 1 */}

              <button
                type="button"
                onClick={() =>
                  useSuggestion(
                    "What documents require my attention?"
                  )
                }
                className="
                  group

                  rounded-2xl

                  border
                  border-slate-200
                  dark:border-[#3D3834]

                  bg-white
                  dark:bg-[#2B2724]

                  px-5
                  py-4

                  text-left

                  hover:border-blue-300
                  hover:shadow-md

                  dark:hover:border-blue-500/30

                  transition-all
                  duration-200
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >

                  <span
                    className="
                      text-sm
                      font-medium

                      text-slate-700
                      dark:text-gray-200
                    "
                  >
                    What needs my attention?
                  </span>

                  <span
                    className="
                      text-slate-400

                      group-hover:text-blue-500

                      transition
                    "
                  >
                    →
                  </span>

                </div>

              </button>


              {/* SUGGESTION 2 */}

              <button
                type="button"
                onClick={() =>
                  useSuggestion(
                    "What deadlines are coming up?"
                  )
                }
                className="
                  group

                  rounded-2xl

                  border
                  border-slate-200
                  dark:border-[#3D3834]

                  bg-white
                  dark:bg-[#2B2724]

                  px-5
                  py-4

                  text-left

                  hover:border-blue-300
                  hover:shadow-md

                  dark:hover:border-blue-500/30

                  transition-all
                  duration-200
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >

                  <span
                    className="
                      text-sm
                      font-medium

                      text-slate-700
                      dark:text-gray-200
                    "
                  >
                    What deadlines are coming up?
                  </span>

                  <span
                    className="
                      text-slate-400

                      group-hover:text-blue-500

                      transition
                    "
                  >
                    →
                  </span>

                </div>

              </button>


              {/* SUGGESTION 3 */}

              <button
                type="button"
                onClick={() =>
                  useSuggestion(
                    "Summarize my important documents."
                  )
                }
                className="
                  group

                  rounded-2xl

                  border
                  border-slate-200
                  dark:border-[#3D3834]

                  bg-white
                  dark:bg-[#2B2724]

                  px-5
                  py-4

                  text-left

                  hover:border-blue-300
                  hover:shadow-md

                  dark:hover:border-blue-500/30

                  transition-all
                  duration-200
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >

                  <span
                    className="
                      text-sm
                      font-medium

                      text-slate-700
                      dark:text-gray-200
                    "
                  >
                    Summarize my documents
                  </span>

                  <span
                    className="
                      text-slate-400

                      group-hover:text-blue-500

                      transition
                    "
                  >
                    →
                  </span>

                </div>

              </button>


              {/* SUGGESTION 4 */}

              <button
                type="button"
                onClick={() =>
                  useSuggestion(
                    "What should I take care of today?"
                  )
                }
                className="
                  group

                  rounded-2xl

                  border
                  border-slate-200
                  dark:border-[#3D3834]

                  bg-white
                  dark:bg-[#2B2724]

                  px-5
                  py-4

                  text-left

                  hover:border-blue-300
                  hover:shadow-md

                  dark:hover:border-blue-500/30

                  transition-all
                  duration-200
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >

                  <span
                    className="
                      text-sm
                      font-medium

                      text-slate-700
                      dark:text-gray-200
                    "
                  >
                    What should I do today?
                  </span>

                  <span
                    className="
                      text-slate-400

                      group-hover:text-blue-500

                      transition
                    "
                  >
                    →
                  </span>

                </div>

              </button>

            </div>

          </div>

        )}


        {/* ================================= */}
        {/* LOADING */}
        {/* ================================= */}

        {loading && (

          <div
            className="
              mx-auto

              mt-10

              flex
              items-center
              gap-3

              text-sm

              text-slate-500
              dark:text-gray-400
            "
          >

            <div
              className="
                flex
                gap-1
              "
            >

              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-blue-500

                  animate-bounce
                "
              />

              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-blue-500

                  animate-bounce

                  [animation-delay:120ms]
                "
              />

              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-blue-500

                  animate-bounce

                  [animation-delay:240ms]
                "
              />

            </div>

            <span>
              {t.thinking}
            </span>

          </div>

        )}


        {/* ================================= */}
        {/* INPUT */}
        {/* ================================= */}

        <div
          className="
            mt-auto

            pt-10

            mx-auto

            w-full
            max-w-4xl
          "
        >

          <div
            className="
              relative

              rounded-[24px]

              border
              border-slate-300
              dark:border-[#45403B]

              bg-white
              dark:bg-[#2B2724]

              shadow-sm

              focus-within:border-blue-400
              focus-within:shadow-lg
              focus-within:shadow-blue-500/5

              transition-all
              duration-200
            "
          >

            <textarea
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
              onKeyDown={(e) => {

                if (
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  !loading &&
                  question.trim()
                ) {
                  e.preventDefault();

                  askAll();
                }

              }}
              placeholder={t.askAllPlaceholder}
              rows={1}
              className="
                w-full

                resize-none

                bg-transparent

                px-5
                pt-5
                pb-16

                text-[15px]

                text-slate-900
                dark:text-white

                placeholder:text-slate-400
                dark:placeholder:text-gray-500

                focus:outline-none
              "
            />


            {/* SEND BUTTON */}

            <button
              type="button"
              onClick={askAll}
              disabled={
                loading ||
                !question.trim()
              }
              className="
                absolute

                bottom-3
                right-3

                flex
                h-10
                w-10

                items-center
                justify-center

                rounded-xl

                bg-slate-900
                dark:bg-white

                text-white
                dark:text-slate-900

                hover:bg-blue-600
                dark:hover:bg-blue-100

                disabled:cursor-not-allowed
                disabled:opacity-30

                transition-all
                duration-200
              "
              aria-label="Send"
            >

              {loading ? (

                <div
                  className="
                    h-4
                    w-4

                    rounded-full

                    border-2
                    border-white/30
                    border-t-white

                    dark:border-slate-900/30
                    dark:border-t-slate-900

                    animate-spin
                  "
                />

              ) : (

                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4 4L21 12L4 20L7 13L16 12L7 11L4 4Z"
                    fill="currentColor"
                  />
                </svg>

              )}

            </button>

          </div>


          <p
            className="
              mt-3

              text-center

              text-[11px]

              text-slate-400
              dark:text-gray-500
            "
          >
            Life AiOS can make mistakes. Check important information
            in your original documents.
          </p>

        </div>

      </div>

    </div>
  );
}