import Link from "next/link";
import PublicLayout from "@/components/layout/PublicLayout";

export default function TermsPage() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-4xl py-12">

        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Terms of Service
        </h1>

        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Last updated: August 2026
        </p>

        <div className="mt-10 space-y-10">

          {/* 1. ACCEPTANCE */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              1. Acceptance of Terms
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              By creating an account or using Life AiOS, you agree to these
              Terms of Service and our Privacy Policy.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              If you do not agree with these terms, you should not create an
              account or use the service.
            </p>
          </section>

          {/* 2. ACCOUNT */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              2. Your Account
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              You are responsible for maintaining the security of your account
              credentials and for activities performed through your account.
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300">
              <li>Provide accurate registration information.</li>
              <li>Keep your authentication credentials secure.</li>
              <li>Do not share your account with unauthorized users.</li>
              <li>
                Notify us if you believe your account has been compromised.
              </li>
            </ul>
          </section>

          {/* 3. ACCEPTABLE USE */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              3. Acceptable Use
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              You agree to use Life AiOS only for lawful purposes and in a way
              that does not harm the platform, other users or third parties.
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300">
              <li>No illegal activities.</li>
              <li>No unauthorized access attempts.</li>
              <li>No malware or harmful content.</li>
              <li>No attempts to bypass security controls.</li>
              <li>No abuse of AI or platform resources.</li>
              <li>
                No use of the service to infringe the rights of another person.
              </li>
            </ul>
          </section>

          {/* 4. DOCUMENTS */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              4. Documents and User Content
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              You retain ownership of documents and other content that you
              upload to Life AiOS.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              By uploading content, you confirm that you have the necessary
              rights or authorization to provide that content to the service.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Life AiOS processes uploaded documents only to provide requested
              features such as document organization, extraction, AI-assisted
              analysis, tasks and reminders.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              You remain responsible for the content of documents you upload
              and for ensuring that your use of the service complies with
              applicable laws.
            </p>
          </section>

          {/* 5. AI */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              5. Artificial Intelligence
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Life AiOS uses artificial intelligence to provide features such
              as document analysis, summaries, information extraction and
              question answering.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              AI-generated information is provided for informational and
              organizational purposes only. AI systems may produce inaccurate,
              incomplete or outdated information.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Life AiOS does not provide professional legal, tax, financial,
              medical, insurance or other regulated professional advice.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              You are responsible for independently verifying important
              information, deadlines, amounts, obligations and decisions before
              relying on AI-generated information.
            </p>
          </section>

          {/* 6. PLANS */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              6. Plans and Document Allowances
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Life AiOS currently provides Free and Pro subscription plans.
              Available plans and limits may be displayed within the service.
            </p>

            <div className="mt-6 space-y-4">

              <div className="rounded-2xl border border-gray-200 dark:border-[#3D3834] p-6">
                <h3 className="font-semibold dark:text-white">
                  Free Plan
                </h3>

                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  The Free Plan allows up to 5 document uploads during the
                  lifetime of the account, subject to the applicable service
                  rules.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 dark:border-[#3D3834] p-6">
                <h3 className="font-semibold dark:text-white">
                  Pro Plan
                </h3>

                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  The Pro Plan allows up to 20 document uploads during each
                  active subscription period.
                </p>

                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  The current Pro subscription price is €10 per month unless a
                  different price is clearly displayed before purchase.
                </p>
              </div>

            </div>

            <p className="mt-6 leading-8 text-gray-700 dark:text-gray-300">
              Document allowances are enforced by the Life AiOS backend and
              may not be changed by the user through the frontend.
            </p>
          </section>

          {/* 7. BILLING */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              7. Billing and Payments
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Paid subscriptions are processed through our payment provider.
              Payment information is handled according to the payment
              provider's applicable terms and privacy practices.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              By purchasing a Pro subscription, you authorize the applicable
              subscription charges according to the price and billing
              frequency presented at checkout.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Subscription status and access to Pro features may be affected by
              failed, declined or otherwise unsuccessful payments.
            </p>
          </section>

          {/* 8. CANCELLATION */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              8. Subscription Cancellation
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              You may cancel your Pro subscription through the subscription
              management functionality provided by Life AiOS or through the
              payment provider where applicable.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Unless otherwise required by applicable law or expressly stated
              during purchase, cancellation prevents future renewal of the
              subscription and does not automatically create a refund for a
              billing period that has already started.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Any mandatory consumer cancellation or refund rights under
              applicable law remain unaffected.
            </p>
          </section>

          {/* 9. REFUNDS */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              9. Refunds
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Refunds are handled in accordance with applicable consumer
              protection laws and the refund terms presented at the time of
              purchase.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              If you believe you have been charged incorrectly, please contact
              our support team as soon as possible.
            </p>
          </section>

          {/* 10. PRIVACY */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              10. Privacy
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Your privacy is important to us. Personal information is
              processed according to our{" "}
              <Link
                href="/privacy"
                className="font-semibold text-blue-600 hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          {/* 11. SECURITY */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              11. Security
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              We implement technical and organizational measures designed to
              protect the service and user information against unauthorized
              access and misuse.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              However, no internet service can guarantee absolute security or
              uninterrupted availability.
            </p>
          </section>

          {/* 12. INTELLECTUAL PROPERTY */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              12. Intellectual Property
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Life AiOS, including its software, design, branding, interface,
              documentation and related materials, is protected by applicable
              intellectual property laws.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Except where expressly permitted, you may not copy, modify,
              redistribute, reverse engineer or commercially exploit protected
              parts of the service.
            </p>
          </section>

          {/* 13. SERVICE AVAILABILITY */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              13. Service Availability
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              We aim to keep Life AiOS available and reliable, but we do not
              guarantee that the service will always be available,
              uninterrupted or error-free.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              The service may occasionally be unavailable because of
              maintenance, upgrades, security measures, technical failures or
              circumstances outside our reasonable control.
            </p>
          </section>

          {/* 14. LIMITATION OF LIABILITY */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              14. Limitation of Liability
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              To the extent permitted by applicable law, Life AiOS is provided
              on an "as is" and "as available" basis.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              We are not responsible for decisions made solely on the basis of
              AI-generated information, including decisions involving financial,
              legal, medical, insurance or administrative matters.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Nothing in these Terms excludes or limits liability where such
              exclusion or limitation is prohibited by applicable law,
              including mandatory consumer protection rights.
            </p>
          </section>

          {/* 15. ACCOUNT SUSPENSION */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              15. Suspension or Termination
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              We may restrict or suspend access to an account where reasonably
              necessary to protect the service, investigate abuse, prevent
              fraud, address security issues or comply with legal obligations.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Where appropriate and legally permitted, we will provide
              information about the reason for a restriction or suspension.
            </p>
          </section>

          {/* 16. ACCOUNT DELETION */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              16. Account Deletion
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              You may request deletion of your Life AiOS account and associated
              application data through the available account deletion
              functionality.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Certain information may be retained where retention is required
              by applicable law or is otherwise legally necessary.
            </p>
          </section>

          {/* 17. CHANGES */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              17. Changes to These Terms
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              We may update these Terms from time to time to reflect changes to
              Life AiOS, our services, legal requirements or business
              practices.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              The updated version will be published on this page with a new
              "Last updated" date.
            </p>
          </section>

          {/* 18. CONTACT */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              18. Contact
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              If you have questions about these Terms, your subscription,
              payments or use of Life AiOS, please contact our support team.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              You can contact us through our{" "}
              <Link
                href="/support"
                className="font-semibold text-blue-600 hover:underline"
              >
                Support Center
              </Link>
              .
            </p>
          </section>

        </div>
      </div>
    </PublicLayout>
  );
}