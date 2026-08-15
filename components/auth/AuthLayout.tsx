"use client";

import { ReactNode } from "react";

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main
      className="
        min-h-screen

        bg-gradient-to-br
        from-slate-50
        via-blue-50
        to-gray-100

        dark:from-[#1E1B18]
        dark:via-[#24201D]
        dark:to-[#191715]

        flex
        items-center
        justify-center

        p-6
      "
    >
      <div
        className="
          w-full
          max-w-5xl

          grid
          lg:grid-cols-2

          overflow-hidden

          rounded-3xl

          shadow-2xl

          bg-white
          dark:bg-[#2B2724]

          border
          border-gray-200
          dark:border-[#3D3834]
        "
      >
        {/* Left Side */}

        <div
          className="
            hidden
            lg:flex

            flex-col
            justify-center

            bg-[radial-gradient(circle_at_20%_20%,#4F46E5_0%,transparent_50%),radial-gradient(circle_at_80%_0%,#7C3AED_0%,transparent_45%),linear-gradient(135deg,#2563EB_0%,#4F46E5_45%,#6D28D9_100%)]

            text-white

            p-12

            relative
            overflow-hidden
          "
        >
          {/* subtle grid texture for uniform depth */}
          <div
            className="
              absolute inset-0
              opacity-[0.07]
              [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)]
              [background-size:40px_40px]
            "
          />

          {/* soft glow accents */}
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-cyan-300/10 blur-3xl" />

          <div className="relative z-10">
            <h1 className="text-5xl font-extrabold tracking-tight">
              Life AiOS 
            </h1>

            <p className="mt-3 text-base text-white/70 font-medium">
              All your documents.
One AI Operating System.           </p>

            <div className="mt-16 flex flex-col gap-4">
              {[
                { icon: "📄", label: "Smart Documents" },
                { icon: "🤖", label: "AI Assistant" },
                { icon: "🧠", label: "Daily Briefing" },
                { icon: "📊", label: "AI Insights" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="
                    flex items-center gap-4

                    rounded-2xl
                    px-4 py-3.5

                    bg-white/[0.07]
                    border border-white/10
                    backdrop-blur-sm

                    transition-colors
                    hover:bg-white/[0.12]
                  "
                >
                  <span
                    className="
                      flex items-center justify-center
                      w-11 h-11
                      rounded-xl
                      bg-white/10
                      border border-white/10
                      text-xl
                      shrink-0
                    "
                  >
                    {item.icon}
                  </span>
                  <span className="text-lg font-semibold tracking-tight">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}

        <div
          className="
            flex
            items-center
            justify-center

            p-8
            md:p-10
          "
        >
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>

      </div>
    </main>
  );
}