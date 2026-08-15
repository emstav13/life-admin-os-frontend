"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import {
  FiSend,
  FiCopy,
  FiUser,
} from "react-icons/fi";
import { BsRobot } from "react-icons/bs";

import { API_URL } from "@/lib/api";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { supabase } from "@/lib/supabase";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AskDocument({
  documentId,
}: {
  documentId: string;
}) {
  const { t } = useLanguage();

  const [question, setQuestion] = useState("");

  const [messages, setMessages] =
    useState<Message[]>([]);

  const [loading, setLoading] =
    useState(false);

  const messagesEndRef =
    useRef<HTMLDivElement | null>(null);

  // =====================================================
  // AUTO SCROLL
  // =====================================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // =====================================================
  // ASK AI
  // =====================================================

  async function askAI() {
    if (!question.trim() || loading) {
      return;
    }

    const currentQuestion =
      question.trim();

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: currentQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      // =================================================
      // GET AUTHENTICATED SESSION
      // =================================================

      const {
        data: sessionData,
        error: sessionError,
      } = await supabase.auth.getSession();

      if (
        sessionError ||
        !sessionData.session
      ) {
        throw new Error(
          "Authentication required"
        );
      }

      const accessToken =
        sessionData.session.access_token;

      if (!accessToken) {
        throw new Error(
          "Missing access token"
        );
      }

      // =================================================
      // ASK BACKEND
      // =================================================

      const res = await fetch(
        `${API_URL}/ask-document`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${accessToken}`,
          },

          body: JSON.stringify({
            document_id: documentId,
            question: currentQuestion,
          }),
        }
      );

      // =================================================
      // HANDLE HTTP ERRORS
      // =================================================

      if (!res.ok) {

        if (res.status === 401) {
          throw new Error(
            "Authentication expired"
          );
        }

        if (res.status === 403) {
          throw new Error(
            "Access denied"
          );
        }

        throw new Error(
          "Request failed"
        );
      }

      // =================================================
      // PARSE RESPONSE
      // =================================================

      const data = await res.json();

      if (
        !data ||
        typeof data.answer !== "string"
      ) {
        throw new Error(
          "Invalid AI response"
        );
      }

      // =================================================
      // ADD AI RESPONSE
      // =================================================

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
        },
      ]);

    } catch (error) {

      console.error(
        "Ask document error:",
        error
      );

      toast.error(
        t.aiRequestFailed
      );

    } finally {

      setLoading(false);

    }
  }

  // =====================================================
  // COPY MESSAGE
  // =====================================================

  async function copy(text: string) {
    try {

      await navigator.clipboard.writeText(
        text
      );

      toast.success(
        t.copied
      );

    } catch (error) {

      console.error(
        "Copy error:",
        error
      );

      toast.error(
        "Unable to copy text"
      );
    }
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div
      className="
        mt-10

        rounded-2xl

        bg-white
        dark:bg-[#2B2724]

        border
        border-gray-200
        dark:border-[#3D3834]

        shadow-sm

        transition-colors
      "
    >

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div
        className="
          border-b
          border-gray-200
          dark:border-[#3D3834]
          p-6
        "
      >

        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              text-white
            "
          >
            <BsRobot size={24} />
          </div>

          <div>

            <h2
              className="
                text-2xl
                font-bold
                dark:text-white
              "
            >
              {t.aiAssistant}
            </h2>

            <p
              className="
                text-gray-500
                dark:text-gray-400
              "
            >
              {t.askAnything}
            </p>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* MESSAGES */}
      {/* ================================================= */}

      <div
        className="
          h-[450px]
          overflow-y-auto
          p-6
          space-y-6
        "
      >

        {messages.map(
          (message, index) => (

            <div
              key={index}
              className={`flex ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              {/* ========================================= */}
              {/* AI AVATAR */}
              {/* ========================================= */}

              {message.role ===
                "assistant" && (

                <div
                  className="
                    mr-3
                    mt-1
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-r
                    from-blue-600
                    to-indigo-600
                    text-white
                    flex-shrink-0
                  "
                >
                  <BsRobot size={18} />
                </div>

              )}

              {/* ========================================= */}
              {/* MESSAGE */}
              {/* ========================================= */}

              <div
                className={`max-w-[80%] rounded-2xl px-5 py-4 shadow-sm ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-[#34302D] border border-gray-200 dark:border-[#3D3834] dark:text-white"
                }`}
              >

                {message.role ===
                "assistant" ? (

                  <>
                    {/* ================================= */}
                    {/* MARKDOWN */}
                    {/* ================================= */}

                    <div
                      className="
                        prose
                        prose-sm
                        max-w-none
                        dark:prose-invert
                      "
                    >
                      <ReactMarkdown>
                        {message.content}
                      </ReactMarkdown>
                    </div>

                    {/* ================================= */}
                    {/* COPY */}
                    {/* ================================= */}

                    <button
                      type="button"
                      onClick={() =>
                        copy(
                          message.content
                        )
                      }
                      className="
                        mt-4
                        flex
                        items-center
                        gap-2
                        text-xs
                        text-gray-500
                        dark:text-gray-400
                        hover:text-black
                        dark:hover:text-white
                        transition
                      "
                    >
                      <FiCopy />

                      {t.copy}
                    </button>
                  </>

                ) : (

                  <p
                    className="
                      whitespace-pre-wrap
                    "
                  >
                    {message.content}
                  </p>

                )}

              </div>

              {/* ========================================= */}
              {/* USER AVATAR */}
              {/* ========================================= */}

              {message.role ===
                "user" && (

                <div
                  className="
                    ml-3
                    mt-1
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-black
                    text-white
                    flex-shrink-0
                  "
                >
                  <FiUser size={18} />
                </div>

              )}

            </div>

          )
        )}

        {/* ================================================= */}
        {/* LOADING */}
        {/* ================================================= */}

        {loading && (

          <div
            className="
              flex
              justify-start
            "
          >

            <div
              className="
                mr-3
                mt-1
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                text-white
              "
            >
              <BsRobot size={18} />
            </div>

            <div
              className="
                rounded-2xl
                border
                border-gray-200
                dark:border-[#3D3834]
                bg-gray-100
                dark:bg-[#34302D]
                px-5
                py-4
              "
            >

              <div
                className="
                  flex
                  gap-2
                  dark:text-white
                "
              >

                <span className="animate-bounce">
                  ●
                </span>

                <span
                  className="animate-bounce"
                  style={{
                    animationDelay:
                      "0.2s",
                  }}
                >
                  ●
                </span>

                <span
                  className="animate-bounce"
                  style={{
                    animationDelay:
                      "0.4s",
                  }}
                >
                  ●
                </span>

              </div>

            </div>

          </div>

        )}

        <div ref={messagesEndRef} />

      </div>

      {/* ================================================= */}
      {/* INPUT */}
      {/* ================================================= */}

      <div
        className="
          border-t
          border-gray-200
          dark:border-[#3D3834]
          p-5
        "
      >

        <div className="flex gap-3">

          <input
            value={question}
            onChange={(e) =>
              setQuestion(
                e.target.value
              )
            }
            onKeyDown={(e) => {

              if (
                e.key === "Enter" &&
                !e.shiftKey &&
                !loading &&
                question.trim()
              ) {

                e.preventDefault();

                askAI();
              }

            }}
            placeholder={
              t.askPlaceholder
            }
            disabled={loading}
            autoComplete="off"
            className="
              flex-1

              rounded-xl

              border
              border-gray-300
              dark:border-[#3D3834]

              bg-white
              dark:bg-[#34302D]

              px-5
              py-4

              dark:text-white
              dark:placeholder:text-gray-400

              shadow-sm

              focus:outline-none
              focus:ring-2
              focus:ring-blue-500

              disabled:opacity-50
            "
          />

          <button
            type="button"
            onClick={askAI}
            disabled={
              loading ||
              !question.trim()
            }
            className="
              flex
              items-center
              gap-2

              rounded-xl

              bg-gradient-to-r
              from-blue-600
              to-indigo-600

              px-6
              py-4

              text-white
              font-semibold

              hover:opacity-90

              transition

              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >

            <FiSend />

            {loading
              ? t.thinking
              : t.ask}

          </button>

        </div>

      </div>

    </div>
  );
}