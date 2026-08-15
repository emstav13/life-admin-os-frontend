import PublicLayout from "@/components/layout/PublicLayout";

export default function CookiesPage() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-4xl py-12">

        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Cookie Policy
        </h1>

        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Last updated: August 2026
        </p>

        <div className="mt-10 space-y-10">

          {/* 1. WHAT ARE COOKIES */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              1. What Are Cookies?
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Cookies are small pieces of information stored on your device by
              a website or web application. They can be used to maintain
              sessions, remember preferences and support essential security
              functions.
            </p>
          </section>

          {/* 2. HOW LIFE AIOS USES COOKIES */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              2. How Life AiOS Uses Cookies
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Life AiOS currently uses cookies or similar browser technologies
              primarily for essential functionality, authentication, session
              management and security.
            </p>

            <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Maintain authenticated user sessions.</li>
              <li>Support account security.</li>
              <li>Maintain essential application functionality.</li>
              <li>Remember necessary application preferences where applicable.</li>
            </ul>
          </section>

          {/* 3. TYPES */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              3. Types of Cookies and Similar Technologies
            </h2>

            <div className="mt-6 space-y-6">

              <div>
                <h3 className="font-semibold dark:text-white">
                  Essential Technologies
                </h3>

                <p className="mt-2 text-gray-700 dark:text-gray-300 leading-7">
                  These technologies are necessary for authentication, account
                  security, session management and core Life AiOS functionality.
                </p>
              </div>

              <div>
                <h3 className="font-semibold dark:text-white">
                  Preference Technologies
                </h3>

                <p className="mt-2 text-gray-700 dark:text-gray-300 leading-7">
                  Where applicable, these technologies may be used to remember
                  settings or preferences required to provide a consistent user
                  experience.
                </p>
              </div>

              <div>
                <h3 className="font-semibold dark:text-white">
                  Analytics Technologies
                </h3>

                <p className="mt-2 text-gray-700 dark:text-gray-300 leading-7">
                  Life AiOS does not currently describe or rely on third-party
                  analytics cookies as an essential part of the service. If
                  analytics or other non-essential tracking technologies are
                  introduced in the future, this Cookie Policy will be updated
                  and any legally required consent mechanism will be provided.
                </p>
              </div>

            </div>
          </section>

          {/* 4. AUTHENTICATION */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              4. Authentication and Security
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Authentication-related cookies or similar browser storage
              mechanisms may be used to maintain your authenticated session and
              protect your account.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Authentication credentials such as passwords are not stored in
              cookies as plain text.
            </p>
          </section>

          {/* 5. THIRD PARTY */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              5. Third-Party Services
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Some technical services used to operate Life AiOS may use their
              own cookies, local storage or similar technologies when necessary
              to provide authentication, security, payment or other requested
              functionality.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              The use of such technologies is governed by the applicable
              provider's terms and privacy documentation.
            </p>
          </section>

          {/* 6. MANAGING */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              6. Managing Cookies
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Most modern browsers allow you to view, block or delete cookies
              through their privacy and security settings.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Blocking essential cookies or browser storage mechanisms may
              prevent authentication or cause parts of Life AiOS to stop
              functioning correctly.
            </p>
          </section>

          {/* 7. CONSENT */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              7. Consent and Non-Essential Technologies
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Essential technologies may be used where they are necessary to
              provide a service explicitly requested by the user or where
              otherwise permitted by applicable law.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              If Life AiOS introduces non-essential cookies or tracking
              technologies that require consent, users will be provided with
              the appropriate consent choices before those technologies are
              activated.
            </p>
          </section>

          {/* 8. SECURITY */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              8. Security
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Cookies and similar technologies used by Life AiOS are intended
              to support secure authentication, session management and
              application functionality.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Users should keep their devices and browsers secure and should
              avoid sharing authentication credentials with other people.
            </p>
          </section>

          {/* 9. CHANGES */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              9. Changes to This Cookie Policy
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              We may update this Cookie Policy when our technologies, services
              or legal obligations change.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              The latest version will always be published on this page together
              with the applicable update date.
            </p>
          </section>

          {/* 10. CONTACT */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              10. Contact
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              If you have questions about cookies, privacy or how Life AiOS
              processes information, please contact our support team through
              the{" "}
              <a
                href="mailto:support@lifeaios.com"
                className="text-blue-600 font-semibold hover:underline"
              >
                Life AiOS Support Center
              </a>
              .
            </p>
          </section>

        </div>
      </div>
    </PublicLayout>
  );
}