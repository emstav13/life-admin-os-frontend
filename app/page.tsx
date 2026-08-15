


"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { authFetch } from "@/lib/api-auth";

import AppLayout from "@/components/layout/AppLayout";
import ExecutiveDashboard from "@/components/ui/ExecutiveDashboard";
import AIInsights from "@/components/ui/AIInsights";
import { API_URL } from "@/lib/api";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Home() {
  const { t } = useLanguage();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState<any[]>([]);

  const [showAuthModal, setShowAuthModal] = useState(false);



  const loadDocuments = useCallback(
    async (currentUser?: any) => {
      try {
        let userToUse = currentUser;

        // -----------------------------------------------------
        // GET CURRENT USER IF NOT PROVIDED
        // -----------------------------------------------------

        if (!userToUse) {
          const {
            data: { user: authenticatedUser },
          } = await supabase.auth.getUser();

          userToUse = authenticatedUser;
        }

        // -----------------------------------------------------
        // NO USER
        // -----------------------------------------------------

        if (!userToUse) {
          setDocuments([]);
          return;
        }

        // -----------------------------------------------------
        // LOAD DOCUMENTS
        // -----------------------------------------------------

        const response = await authFetch(
          `${API_URL}/documents`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (!response.ok) {
          const errorText =
            await response.text();

          console.error(
            "Failed to load documents:",
            response.status,
            errorText
          );

          return;
        }

        const data =
          await response.json();

        // -----------------------------------------------------
        // SUPPORT BOTH BACKEND FORMATS
        // -----------------------------------------------------

        const documentList =
          Array.isArray(data)
            ? data
            : Array.isArray(data?.documents)
            ? data.documents
            : [];

        console.log(
          "DASHBOARD DOCUMENTS UPDATED:",
          documentList.length
        );

        setDocuments(documentList);
      } catch (error) {
        console.error(
          "Dashboard document refresh error:",
          error
        );
      }
    },
    []
  );

  // =========================================================
  // AUTHENTICATION + LIVE DOCUMENT REFRESH
  // =========================================================

  useEffect(() => {
    let mounted = true;

    // -------------------------------------------------------
    // INITIAL AUTHENTICATION
    // -------------------------------------------------------

    async function initializeDashboard() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!mounted) {
          return;
        }

        setUser(user);

        // ---------------------------------------------------
        // LOAD DOCUMENTS
        // ---------------------------------------------------

        if (user) {
          await loadDocuments(user);
        } else {
          setDocuments([]);
        }

        if (mounted) {
          setLoading(false);
        }
      } catch (error) {
        console.error(
          "Failed to initialize dashboard:",
          error
        );

        if (mounted) {
          setUser(null);
          setDocuments([]);
          setLoading(false);
        }
      }
    }

    initializeDashboard();

    // -------------------------------------------------------
    // AUTH STATE CHANGES
    // -------------------------------------------------------

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) {
          return;
        }

        const nextUser =
          session?.user ?? null;

        setUser(nextUser);

        if (!nextUser) {
          setDocuments([]);
          return;
        }

        await loadDocuments(nextUser);
      }
    );

    // -------------------------------------------------------
    // REFRESH WHEN TAB BECOMES ACTIVE
    // -------------------------------------------------------

    function handleVisibilityChange() {
      if (
        document.visibilityState ===
        "visible"
      ) {
        loadDocuments();
      }
    }

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    // -------------------------------------------------------
    // REFRESH WHEN WINDOW GETS FOCUS
    // -------------------------------------------------------

    function handleWindowFocus() {
      loadDocuments();
    }

    window.addEventListener(
      "focus",
      handleWindowFocus
    );

    // -------------------------------------------------------
    // AUTOMATIC REFRESH EVERY 15 SECONDS
    // -------------------------------------------------------

    const interval =
      window.setInterval(() => {
        loadDocuments();
      }, 15000);

    // -------------------------------------------------------
    // CLEANUP
    // -------------------------------------------------------

    return () => {
      mounted = false;

      subscription.unsubscribe();

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      window.removeEventListener(
        "focus",
        handleWindowFocus
      );

      window.clearInterval(interval);
    };
  }, [loadDocuments]);

 

  useEffect(() => {
    if (loading || user) {
      return;
    }

    const timer = setTimeout(() => {
      setShowAuthModal(true);
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [loading, user]);

  

  if (loading) {
    return (
      <main
        className="
          min-h-screen
          flex
          items-center
          justify-center

          bg-gradient-to-br
          from-slate-50
          via-blue-50
          to-gray-100

          dark:from-[#1E1B18]
          dark:via-[#24201D]
          dark:to-[#191715]
        "
      >
        <div className="text-gray-500 dark:text-gray-400">
          {t.loading}
        </div>
      </main>
    );
  }

  /*
   * ==========================================
   * GUEST / PUBLIC EXPERIENCE
   * ==========================================
   */

  if (!user) {
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

          text-slate-900
          dark:text-white

          transition-colors
          duration-300
        "
      >

        <div className="max-w-6xl mx-auto px-6">

          {/* ==================================
              HEADER
          ================================== */}

          <header
            className="
              flex
              items-center
              justify-between

              py-6
            "
          >

            <a
              href="/"
              className="
                text-3xl
                font-extrabold
                tracking-tight
              "
            >
              Life AiOS
            </a>

            <nav className="flex items-center gap-3">

              <a
                href="/login"
                className="
                  px-4
                  py-2

                  rounded-xl

                  text-gray-700
                  dark:text-gray-200

                  hover:text-blue-600

                  transition
                "
              >
                Login
              </a>

              <a
                href="/register"
                className="
                  rounded-xl

                  bg-blue-600

                  px-5
                  py-2.5

                  font-semibold
                  text-white

                  hover:bg-blue-700

                  transition

                  shadow-lg
                "
              >
                {t.createAccount}
              </a>

            </nav>

          </header>

          {/* ==================================
              HERO / PRODUCT INTRO
          ================================== */}

          <section
            className="
              pt-12
              pb-8
            "
          >

            <div
              className="
                inline-flex
                items-center

                rounded-full

                border
                border-blue-200
                dark:border-blue-900

                bg-blue-50
                dark:bg-blue-950/40

                px-4
                py-2

                text-sm
                font-medium

                text-blue-700
                dark:text-blue-300

                mb-6
              "
            >
               {t.intelligentPersonalAdministration}
            </div>

            <h1
              className="
                max-w-4xl

                text-4xl
                md:text-6xl

                font-extrabold
                tracking-tight

                leading-tight

                text-slate-900
                dark:text-white
              "
            >
              {t.yourAIPowered}

              <span className="block text-blue-600">
                {t.personalCommandCenter}
              </span>
            </h1>

            <p
              className="
                max-w-2xl

                mt-6

                text-lg
                md:text-xl

                leading-8

                text-gray-600
                dark:text-gray-300
              "
            >
              {t.heroDescription}
            </p>

          </section>

          {/* ==================================
              QUICK ACTION CARDS
          ================================== */}

          <section
            className="
              grid
              grid-cols-1
              md:grid-cols-3

              gap-5

              mt-6
            "
          >

            {/* {t.importPDF} */}

            <div
  className="
    rounded-2xl

    bg-white
    dark:bg-[#2B2724]

    border
    border-gray-200
    dark:border-[#3D3834]

    shadow-lg

    p-6

    text-left
  "
>

              <div
                className="
                  w-12
                  h-12

                  rounded-xl

                  bg-blue-100
                  dark:bg-blue-950/40

                  flex
                  items-center
                  justify-center

                  text-2xl

                  mb-4
                "
              >
                📤
              </div>

              <h2
                className="
                  text-lg
                  font-bold

                  text-slate-900
                  dark:text-white
                "
              >
                {t.importPDF}
              </h2>

              <p
                className="
                  mt-2

                  text-sm

                  text-gray-500
                  dark:text-gray-400

                  leading-6
                "
              >
                {t.importPDFDescription}
              </p>

            </div>

            {/* {t.askAI} */}

            <div
              className="
                rounded-2xl

                bg-white
                dark:bg-[#2B2724]

                border
                border-gray-200
                dark:border-[#3D3834]

                shadow-lg

                p-6

                text-left
              "
            >

              <div
                className="
                  w-12
                  h-12

                  rounded-xl

                  bg-indigo-100
                  dark:bg-indigo-950/40

                  flex
                  items-center
                  justify-center

                  text-2xl

                  mb-4
                "
              >
                🤖
              </div>

              <h2
                className="
                  text-lg
                  font-bold

                  text-slate-900
                  dark:text-white
                "
              >
                {t.askAI}
              </h2>

              <p
                className="
                  mt-2

                  text-sm

                  text-gray-500
                  dark:text-gray-400

                  leading-6
                "
              >
                {t.askAIDescription}
              </p>

            </div>

            {/* {t.dailyBriefing} */}

            <div
              className="
                rounded-2xl

                bg-white
                dark:bg-[#2B2724]

                border
                border-gray-200
                dark:border-[#3D3834]

                shadow-lg

                p-6

                text-left
              "
            >

              <div
                className="
                  w-12
                  h-12

                  rounded-xl

                  bg-purple-100
                  dark:bg-purple-950/40

                  flex
                  items-center
                  justify-center

                  text-2xl

                  mb-4
                "
              >
                🧠
              </div>

              <h2
                className="
                  text-lg
                  font-bold

                  text-slate-900
                  dark:text-white
                "
              >
                {t.dailyBriefing}
              </h2>

              <p
                className="
                  mt-2

                  text-sm

                  text-gray-500
                  dark:text-gray-400

                  leading-6
                "
              >
                {t.dailyBriefingDescription}
              </p>

            </div>

          </section>

          {/* ==================================
              DOCUMENTS
          ================================== */}

          <section
            className="
              mt-8

              rounded-3xl

              bg-white
              dark:bg-[#2B2724]

              border
              border-gray-200
              dark:border-[#3D3834]

              shadow-xl

              overflow-hidden
            "
          >

            <div
              className="
                flex
                items-center
                justify-between

                px-7
                py-5

                border-b
                border-gray-200
                dark:border-[#3D3834]
              "
            >

              <div>

                <h2
                  className="
                    text-xl
                    font-bold

                    text-slate-900
                    dark:text-white
                  "
                >
                  📄 Documents
                </h2>

                <p
                  className="
                    mt-1

                    text-sm

                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  {t.documentsDescription}
                </p>

              </div>

              <a
                href="/register"
                className="
                  rounded-xl

                  bg-gradient-to-r
                  from-blue-600
                  to-indigo-600

                  px-5
                  py-2.5

                  text-sm
                  font-semibold

                  text-white

                  shadow-lg

                  hover:opacity-90

                  transition
                "
              >
                📤 {t.importPDF}
              </a>

            </div>

            <div className="p-7">

              <div className="space-y-3">

                {[
                  {
                    name: "Invoice_2026.pdf",
                    type: t.invoice,
                    status: t.aiReady,
                  },
                  {
                    name: "Insurance_Contract.pdf",
                    type: t.contract,
                    status: t.aiReady,
                  },
                  {
                    name: "Administrative_Document.pdf",
                    type: t.document,
                    status: t.aiReady,
                  },
                ].map((document) => (
                  <div
                    key={document.name}
                    className="
                      flex
                      items-center
                      justify-between

                      rounded-xl

                      border
                      border-gray-200
                      dark:border-[#3D3834]

                      px-5
                      py-4

                      hover:bg-gray-50
                      dark:hover:bg-[#34302D]

                      transition
                    "
                  >

                    <div className="flex items-center gap-4">

                      <div
                        className="
                          w-11
                          h-11

                          rounded-xl

                          bg-gray-100
                          dark:bg-[#3A3531]

                          flex
                          items-center
                          justify-center

                          text-xl
                        "
                      >
                        📄
                      </div>

                      <div>

                        <p
                          className="
                            font-semibold

                            text-slate-900
                            dark:text-white
                          "
                        >
                          {document.name}
                        </p>

                        <p
                          className="
                            text-sm

                            text-gray-500
                            dark:text-gray-400
                          "
                        >
                          {document.type}
                        </p>

                      </div>

                    </div>

                    <span
                      className="
                        rounded-full

                        bg-green-100
                        dark:bg-green-900/30

                        px-3
                        py-1

                        text-xs
                        font-semibold

                        text-green-700
                        dark:text-green-400
                      "
                    >
                      {document.status}
                    </span>

                  </div>
                ))}

              </div>

            </div>

          </section>

          {/* ==================================
              AI ASSISTANT + AI INSIGHTS
          ================================== */}

          <section
            className="
              grid
              grid-cols-1
              lg:grid-cols-2

              gap-6

              mt-8
            "
          >

           {/* =================================
    AI ASSISTANT
================================= */}

<div
  className="
    rounded-3xl

    bg-white
    dark:bg-[#2B2724]

    border
    border-gray-200
    dark:border-[#3D3834]

    shadow-lg

    p-7
  "
>
  <div className="flex items-center gap-3">

    <div
      className="
        w-11
        h-11

        rounded-xl

        bg-indigo-100
        dark:bg-indigo-950/40

        flex
        items-center
        justify-center

        text-xl
      "
    >
      🤖
    </div>

    <div>

      <h2
        className="
          text-xl
          font-bold

          text-slate-900
          dark:text-white
        "
      >
        {t.aiAssistant}
      </h2>

      <p
        className="
          text-sm

          text-gray-500
          dark:text-gray-400
        "
      >
        {t.aiAssistantDescription}
      </p>

    </div>

  </div>

  <div className="mt-6 space-y-4">

    {/* User Question */}

    <div
      className="
        rounded-xl

        border
        border-gray-200
        dark:border-[#3D3834]

        bg-gray-50
        dark:bg-[#34302D]

        p-4
      "
    >

      <p
        className="
          font-medium

          text-slate-800
          dark:text-gray-200
        "
      >
        💬 What are my upcoming deadlines?
      </p>

    </div>

    {/* AI Answer */}

    <div
      className="
        rounded-xl
        
        border
        border-gray-200
        dark:border-[#3D3834]

        p-4
      "
    >

      <div className="flex items-center gap-2">

        <span className="text-lg">
          🤖
        </span>

        <p
          className="
            font-semibold

            text-slate-900
            dark:text-white
          "
        >
          {t.aiAssistant}
        </p>

      </div>

      <p
        className="
          mt-2

          text-sm

          text-gray-600
          dark:text-gray-300

          leading-6
        "
      >
        {t.upcomingDeadlinesAnswer}
      </p>

    </div>

  </div>

</div>
            {/* =================================
                AI INSIGHTS
            ================================= */}

            <div
              className="
                rounded-3xl

                bg-white
                dark:bg-[#2B2724]

                border
                border-gray-200
                dark:border-[#3D3834]

                shadow-lg

                p-7
              "
            >

              <h2
                className="
                  text-xl
                  font-bold

                  text-slate-900
                  dark:text-white
                "
              >
                📊 {t.aiInsights}
              </h2>

              <p
                className="
                  mt-2

                  text-sm

                  text-gray-500
                  dark:text-gray-400
                "
              >
                {t.aiInsightsDescription}
              </p>

              <div className="mt-6 space-y-4">

                {/* Upcoming Deadline */}

                <div
                  className="
                    rounded-xl

                    border
                    border-gray-200
                    dark:border-[#3D3834]

                    p-4
                  "
                >

                  <p
                    className="
                      font-semibold

                      text-slate-900
                      dark:text-white
                    "
                  >
                    📅 Upcoming deadline
                  </p>

                  <p
                    className="
                      mt-1

                      text-sm

                      text-gray-500
                      dark:text-gray-400

                      leading-6
                    "
                  >
                    {t.upcomingDeadlineDescription}
                  </p>

                </div>

                {/* Document Insight */}

                <div
                  className="
                    rounded-xl

                    border
                    border-gray-200
                    dark:border-[#3D3834]

                    p-4
                  "
                >

                  <p
                    className="
                      font-semibold

                      text-slate-900
                      dark:text-white
                    "
                  >
                    📄 Document insight
                  </p>

                  <p
                    className="
                      mt-1

                      text-sm

                      text-gray-500
                      dark:text-gray-400

                      leading-6
                    "
                  >
                    {t.documentInsightDescription}
                  </p>

                </div>

              </div>

            </div>

          </section>

          {/* ==================================
              PREMIUM CTA
          ================================== */}

          <section
            className="
              mt-8

              rounded-3xl

              bg-gradient-to-r
              from-blue-600
              to-indigo-600

              p-8
              md:p-10

              text-white

              shadow-2xl

              text-center
            "
          >

            <h2
              className="
                text-3xl
                font-bold
              "
            >
              {t.premiumTitle}
            </h2>

            <p
              className="
                mt-3

                text-white/80

                max-w-xl
                mx-auto
              "
            >
              {t.premiumDescription}
            </p>

            <a
              href="/register"
              className="
                inline-block

                mt-6

                rounded-xl

                bg-white

                px-7
                py-3

                font-semibold

                text-blue-600

                shadow-lg

                hover:bg-gray-100

                transition
              "
            >
              {t.startUsingLifeAIOS}
            </a>

          </section>

          {/* ==================================
              FOOTER
          ================================== */}

          <footer
            className="
              mt-12

              border-t
              border-gray-200
              dark:border-[#3D3834]

              py-8

              text-center

              text-sm

              text-gray-500
              dark:text-gray-400
            "
          >
            © 2026 Life AiOS • Version 1.0.0
          </footer>

        </div>

        {/* ====================================
            VIDEO / AUTH MODAL
        ==================================== */}

        {showAuthModal && (
          <div
            className="
              fixed
              inset-0
              z-50

              flex
              items-center
              justify-center

              bg-black/60

              backdrop-blur-md

              p-4
              md:p-6
            "
            onClick={() => setShowAuthModal(false)}
          >

            <div
              className="
                relative

                w-full
                max-w-3xl

                max-h-[95vh]

                overflow-y-auto

                rounded-3xl

                bg-white
                dark:bg-[#2B2724]

                border
                border-gray-200
                dark:border-[#3D3834]

                shadow-2xl
              "
              onClick={(event) => {
                event.stopPropagation();
              }}
            >

              {/* Close Button */}

              <button
                type="button"
                onClick={() => setShowAuthModal(false)}
                className="
                  absolute
                  right-4
                  top-4

                  z-20

                  w-10
                  h-10

                  rounded-full

                  bg-black/50

                  text-white

                  text-xl

                  hover:bg-black/70

                  transition
                "
                aria-label={t.close}
              >
                ×
              </button>

              {/* =================================
                  VIDEO
              ================================= */}

              <div
                className="
                  w-full

                  bg-black

                  rounded-t-3xl

                  overflow-hidden
                "
              >

                <video
  src="/life-aios-demo.mp4"
  autoPlay
  muted
  playsInline
  controls
  className="w-full aspect-video object-cover"
/>

              </div>

              {/* =================================
                  MODAL CONTENT
              ================================= */}

              <div className="p-7 md:p-8">

                <div className="text-center">

                  {/* Icon */}

                 

                  {/* Title */}

                  <h2
                    className="
                      mt-5

                      text-2xl
                      md:text-3xl

                      font-bold

                      text-slate-900
                      dark:text-white
                    "
                  >
                    {t.startUsingLifeAIOS}
                  </h2>

                  {/* Description */}

                  <p
                    className="
                      mt-3

                      max-w-lg
                      mx-auto

                      text-gray-500
                      dark:text-gray-400

                      leading-6
                    "
                  >
                    {t.createAccountDescription}
                  </p>

                </div>

                {/* =================================
                    BENEFITS
                ================================= */}

                <div
                  className="
                    grid
                    md:grid-cols-3

                    gap-3

                    mt-6
                  "
                >

                  <div
                    className="
                      rounded-xl

                      bg-gray-50
                      dark:bg-[#34302D]

                      p-4
                    "
                  >

                    <div className="text-lg">
                      ✓
                    </div>

                    <p
                      className="
                        mt-2

                        text-sm
                        font-medium

                        dark:text-gray-200
                      "
                    >
                      5 free PDFs for life
                    </p>

                  </div>

                  <div
                    className="
                      rounded-xl

                      bg-gray-50
                      dark:bg-[#34302D]

                      p-4
                    "
                  >

                    <div className="text-lg">
                      ✓
                    </div>

                    <p
                      className="
                        mt-2

                        text-sm
                        font-medium

                        dark:text-gray-200
                      "
                    >
                      AI-powered document management
                    </p>

                  </div>

                  <div
                    className="
                      rounded-xl

                      bg-gray-50
                      dark:bg-[#34302D]

                      p-4
                    "
                  >

                    <div className="text-lg">
                      ✓
                    </div>

                    <p
                      className="
                        mt-2

                        text-sm
                        font-medium

                        dark:text-gray-200
                      "
                    >
                      {t.noCreditCardRequired}
                    </p>

                  </div>

                </div>

                {/* =================================
                    REGISTER
                ================================= */}

                <a
                  href="/register"
                  className="
                    block

                    w-full

                    mt-7

                    rounded-xl

                    bg-gradient-to-r
                    from-blue-600
                    to-indigo-600

                    py-3.5

                    text-center

                    font-semibold

                    text-white

                    shadow-lg

                    hover:opacity-90

                    transition
                  "
                >
                  {t.createFreeAccount}
                </a>

                {/* =================================
                    LOGIN
                ================================= */}

                <p
                  className="
                    mt-5

                    text-center

                    text-sm

                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  Already have an account?

                  <a
                    href="/login"
                    className="
                      ml-2

                      font-semibold

                      text-blue-600

                      hover:underline
                    "
                  >
                    Login
                  </a>
                </p>

              </div>

            </div>

          </div>
        )}

      </main>
    );
  }

  /*
   * ==========================================
   * LOGGED-IN USER / REAL DASHBOARD
   * ==========================================
   */

  return (
    <AppLayout>

      <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
        {t.yourAIPowered} document and task manager.
      </p>

      <ExecutiveDashboard />

      <AIInsights
        documents={documents}
      />

    </AppLayout>
  );
}