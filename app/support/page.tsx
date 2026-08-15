import Link from "next/link";
import PublicLayout from "@/components/layout/PublicLayout";

export default function SupportPage() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-4xl py-12">

        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Support Center
        </h1>

        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Need help using Life AiOS? Find answers to common questions,
          information about your account and subscription, or contact our
          support team.
        </p>

        <div className="mt-12 space-y-10">

          {/* FAQ */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              Frequently Asked Questions
            </h2>

            <div className="mt-6 space-y-6">

              {/* Upload */}

              <div className="rounded-2xl border border-gray-200 dark:border-[#3D3834] p-6">
                <h3 className="font-semibold dark:text-white">
                  📄 How do I upload a document?
                </h3>

                <p className="mt-3 text-gray-700 dark:text-gray-300 leading-7">
                  Go to the Upload page and select a PDF document. Life AiOS
                  extracts the document text and uses AI-assisted processing to
                  organize and analyze the information.
                </p>

                <p className="mt-3 text-gray-700 dark:text-gray-300 leading-7">
                  Upload limits depend on your current subscription plan.
                </p>
              </div>

              {/* AI */}

              <div className="rounded-2xl border border-gray-200 dark:border-[#3D3834] p-6">
                <h3 className="font-semibold dark:text-white">
                  🤖 How does AI work?
                </h3>

                <p className="mt-3 text-gray-700 dark:text-gray-300 leading-7">
                  Life AiOS can use AI to analyze uploaded documents, generate
                  summaries, extract relevant information and help identify
                  tasks, reminders and other useful information.
                </p>

                <p className="mt-3 text-gray-700 dark:text-gray-300 leading-7">
                  AI-generated information may contain errors. Always verify
                  important financial, legal, medical, insurance or
                  administrative information before relying on it.
                </p>
              </div>

              {/* Password */}

              <div className="rounded-2xl border border-gray-200 dark:border-[#3D3834] p-6">
                <h3 className="font-semibold dark:text-white">
                  🔐 How do I reset my password?
                </h3>

                <p className="mt-3 text-gray-700 dark:text-gray-300 leading-7">
                  Go to the Login page and select{" "}
                  <strong>Forgot Password</strong>. You will receive an email
                  containing a secure password reset link.
                </p>
              </div>

              {/* Account deletion */}

              <div className="rounded-2xl border border-gray-200 dark:border-[#3D3834] p-6">
                <h3 className="font-semibold dark:text-white">
                  🗑 Can I delete my account?
                </h3>

                <p className="mt-3 text-gray-700 dark:text-gray-300 leading-7">
                  Yes. Life AiOS provides an account deletion process designed
                  to remove application data associated with your authenticated
                  account.
                </p>

                <p className="mt-3 text-gray-700 dark:text-gray-300 leading-7">
                  Certain information may need to be retained where required by
                  applicable law.
                </p>

                <p className="mt-3 text-gray-700 dark:text-gray-300 leading-7">
                  You can manage your account from the{" "}
                  <Link
                    href="/settings"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Settings
                  </Link>{" "}
                  page.
                </p>
              </div>

              {/* Data export */}

              <div className="rounded-2xl border border-gray-200 dark:border-[#3D3834] p-6">
                <h3 className="font-semibold dark:text-white">
                  📦 Can I export my data?
                </h3>

                <p className="mt-3 text-gray-700 dark:text-gray-300 leading-7">
                  Life AiOS includes functionality for exporting application
                  data associated with your authenticated account.
                </p>

                <p className="mt-3 text-gray-700 dark:text-gray-300 leading-7">
                  If you need assistance with a data access or portability
                  request, contact our support team.
                </p>
              </div>

              {/* Security */}

              <div className="rounded-2xl border border-gray-200 dark:border-[#3D3834] p-6">
                <h3 className="font-semibold dark:text-white">
                  🔒 Is my data secure?
                </h3>

                <p className="mt-3 text-gray-700 dark:text-gray-300 leading-7">
                  Life AiOS uses authenticated access controls and security
                  measures designed to protect your account and application
                  data.
                </p>

                <p className="mt-3 text-gray-700 dark:text-gray-300 leading-7">
                  Sensitive document information stored by the application is
                  protected using encryption mechanisms. Passwords are handled
                  through the authentication system and are not stored by
                  Life AiOS as plain-text passwords.
                </p>
              </div>

              {/* Subscription */}

              <div className="rounded-2xl border border-gray-200 dark:border-[#3D3834] p-6">
                <h3 className="font-semibold dark:text-white">
                  💳 What subscription plans are available?
                </h3>

                <p className="mt-3 text-gray-700 dark:text-gray-300 leading-7">
                  Life AiOS currently supports a Free plan and a Pro
                  subscription.
                </p>

                <ul className="mt-3 list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>Free:</strong> up to 5 document uploads.
                  </li>

                  <li>
                    <strong>Pro:</strong> up to 20 document uploads per
                    subscription period.
                  </li>
                </ul>

                <p className="mt-3 text-gray-700 dark:text-gray-300 leading-7">
                  Your current plan and document usage are displayed in the
                  Settings page.
                </p>
              </div>

              {/* Document limit */}

              <div className="rounded-2xl border border-gray-200 dark:border-[#3D3834] p-6">
                <h3 className="font-semibold dark:text-white">
                  📊 What happens when I reach my document limit?
                </h3>

                <p className="mt-3 text-gray-700 dark:text-gray-300 leading-7">
                  New uploads are blocked when the document allowance for your
                  current plan has been reached.
                </p>

                <p className="mt-3 text-gray-700 dark:text-gray-300 leading-7">
                  For the Pro plan, the allowance is calculated according to
                  the active subscription period.
                </p>
              </div>

              {/* AI disclaimer */}

              <div className="rounded-2xl border border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/20 p-6">
                <h3 className="font-semibold text-amber-900 dark:text-amber-200">
                  ⚠️ Can I rely on Life AiOS for legal, financial or medical
                  decisions?
                </h3>

                <p className="mt-3 text-amber-900/80 dark:text-amber-100/80 leading-7">
                  No. Life AiOS is an organizational and information-assistance
                  tool. It does not provide professional legal, tax, financial
                  or medical advice.
                </p>

                <p className="mt-3 text-amber-900/80 dark:text-amber-100/80 leading-7">
                  AI-generated information should be independently verified,
                  especially when a document contains deadlines, financial
                  obligations, legal requirements, insurance information or
                  health-related information.
                </p>
              </div>

            </div>
          </section>

          {/* CONTACT */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              Contact Support
            </h2>

            <div className="mt-6 rounded-2xl border border-gray-200 dark:border-[#3D3834] p-6">

              <p className="text-gray-700 dark:text-gray-300">
                Need additional help?
              </p>

              <p className="mt-3 text-gray-700 dark:text-gray-300">
                📧{" "}
                <a
                  href="mailto:support@lifeaios.com"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  support@lifeaios.com
                </a>
              </p>

              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Response time: within 24–48 business hours.
              </p>

              <p className="mt-4 text-gray-700 dark:text-gray-300 leading-7">
                For privacy, GDPR, account deletion or data export requests,
                please clearly mention the nature of your request so that we
                can direct it to the appropriate process.
              </p>

            </div>
          </section>

          {/* LEGAL */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              Legal & Privacy
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-3">

              <Link
                href="/privacy"
                className="rounded-2xl border border-gray-200 dark:border-[#3D3834] p-6 hover:bg-gray-50 dark:hover:bg-[#332F2C] transition"
              >
                <h3 className="font-semibold dark:text-white">
                  🔐 Privacy Policy
                </h3>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Learn how Life AiOS collects and processes personal data.
                </p>
              </Link>

              <Link
                href="/terms"
                className="rounded-2xl border border-gray-200 dark:border-[#3D3834] p-6 hover:bg-gray-50 dark:hover:bg-[#332F2C] transition"
              >
                <h3 className="font-semibold dark:text-white">
                  📄 Terms of Service
                </h3>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Read the terms governing use of Life AiOS.
                </p>
              </Link>

              <Link
                href="/cookies"
                className="rounded-2xl border border-gray-200 dark:border-[#3D3834] p-6 hover:bg-gray-50 dark:hover:bg-[#332F2C] transition"
              >
                <h3 className="font-semibold dark:text-white">
                  🍪 Cookie Policy
                </h3>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Learn how cookies and similar technologies are used.
                </p>
              </Link>

            </div>
          </section>

          {/* DOCUMENTATION */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              Documentation
            </h2>

            <div className="mt-6 rounded-2xl border border-gray-200 dark:border-[#3D3834] p-6">

              <p className="text-gray-700 dark:text-gray-300 leading-7">
                Additional user guides and documentation will be added as Life
                AiOS evolves.
              </p>

              <p className="mt-3 text-gray-700 dark:text-gray-300 leading-7">
                For questions that are not covered here, please contact our
                support team.
              </p>

            </div>
          </section>

        </div>
      </div>
    </PublicLayout>
  );
}