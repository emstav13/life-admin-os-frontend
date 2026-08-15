import Link from "next/link";
import PublicLayout from "@/components/layout/PublicLayout";

export default function PrivacyPage() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-4xl py-12">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Privacy Policy
        </h1>

        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Last updated: August 2026
        </p>

        <div className="mt-10 space-y-10">

          {/* 1. INTRODUCTION */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              1. Introduction
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Life AiOS is a document organization and information assistance
              platform designed to help users organize, understand and manage
              their personal documents.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              We respect your privacy and are committed to protecting personal
              data in accordance with the General Data Protection Regulation
              (GDPR) and other applicable data protection laws.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              This Privacy Policy explains what information we collect, why we
              process it, how it is protected, and what rights you have in
              relation to your personal data.
            </p>
          </section>

          {/* 2. DATA CONTROLLER */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              2. Data Controller
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              The entity responsible for the processing of personal data through
              Life AiOS is the Life AiOS service operator.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              For privacy-related questions or requests, you can contact us
              through our{" "}
              <Link
                href="/support"
                className="text-blue-600 font-semibold hover:underline"
              >
                Support Center
              </Link>
              .
            </p>
          </section>

          {/* 3. INFORMATION WE COLLECT */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              3. Information We Collect
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Depending on how you use Life AiOS, we may process the following
              categories of information:
            </p>

            <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                Account information, such as your name and email address.
              </li>

              <li>
                Authentication and account security information.
              </li>

              <li>
                Documents and files that you voluntarily upload to the
                platform.
              </li>

              <li>
                Text extracted from uploaded documents for the purpose of
                providing the requested services.
              </li>

              <li>
                AI requests, generated summaries, extracted information and
                other AI-assisted results.
              </li>

              <li>
                Tasks, reminders and document-related preferences created by
                you.
              </li>

              <li>
                Subscription and billing-related information necessary to
                provide paid services.
              </li>

              <li>
                Technical and security information such as browser type,
                device information and authentication/security logs.
              </li>
            </ul>
          </section>

          {/* 4. SENSITIVE INFORMATION */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              4. Documents and Potentially Sensitive Information
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Uploaded documents may contain personal or confidential
              information. Depending on the documents provided by a user, this
              may include financial, insurance, administrative, identification,
              employment or health-related information.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Users should only upload documents that they are authorized to
              provide and should avoid uploading information that is not
              necessary for the requested service.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Where applicable, additional legal requirements may apply to
              special categories of personal data under the GDPR.
            </p>
          </section>

          {/* 5. HOW WE USE INFORMATION */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              5. How We Use Your Information
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              We process personal information only for purposes connected with
              providing and securing Life AiOS services.
            </p>

            <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                Create and manage your Life AiOS account.
              </li>

              <li>
                Store and organize documents uploaded by you.
              </li>

              <li>
                Extract and process document information.
              </li>

              <li>
                Provide AI-assisted summaries, analysis and information
                extraction requested by you.
              </li>

              <li>
                Create document-related tasks and reminders.
              </li>

              <li>
                Provide customer support.
              </li>

              <li>
                Manage subscriptions and payments.
              </li>

              <li>
                Protect the platform against abuse, fraud and unauthorized
                access.
              </li>

              <li>
                Comply with applicable legal obligations.
              </li>
            </ul>
          </section>

          {/* 6. LEGAL BASES */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              6. Legal Bases for Processing
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Depending on the circumstances, personal data may be processed on
              the following legal bases permitted by the GDPR:
            </p>

            <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                Performance of a contract, where processing is necessary to
                provide the Life AiOS service requested by you.
              </li>

              <li>
                Compliance with legal obligations.
              </li>

              <li>
                Legitimate interests, where applicable, including service
                security, fraud prevention and protection of the platform.
              </li>

              <li>
                Consent, where consent is required by applicable law.
              </li>
            </ul>
          </section>

          {/* 7. AI PROCESSING */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              7. AI Processing
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Life AiOS uses artificial intelligence services to provide
              features such as document analysis, summaries, information
              extraction and question answering.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              When an AI feature is requested, relevant document information may
              be processed by the AI service provider necessary to perform that
              request.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              AI-generated information may contain errors or omissions. Users
              should verify important information before relying on it,
              particularly where documents concern financial, legal, medical,
              insurance or administrative matters.
            </p>
          </section>

          {/* 8. SERVICE PROVIDERS */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              8. Service Providers and Data Sharing
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              We do not sell your personal information.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Personal data may be processed by trusted service providers that
              are necessary to operate Life AiOS. Depending on the service
              being used, these providers may include:
            </p>

            <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                Authentication and database infrastructure providers.
              </li>

              <li>
                Cloud infrastructure and hosting providers.
              </li>

              <li>
                Artificial intelligence service providers.
              </li>

              <li>
                Payment and subscription providers.
              </li>

              <li>
                Security, email or other technical service providers required
                to operate the platform.
              </li>
            </ul>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Service providers process information only for the purposes
              necessary to provide their services to Life AiOS and are subject
              to applicable contractual and data protection requirements.
            </p>
          </section>

          {/* 9. INTERNATIONAL TRANSFERS */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              9. International Data Transfers
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Some service providers used by Life AiOS may process personal
              data outside the European Economic Area (EEA).
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Where personal data is transferred outside the EEA, we will rely
              on an appropriate legal mechanism under applicable data protection
              law, such as an adequacy decision or appropriate contractual
              safeguards where required.
            </p>
          </section>

          {/* 10. SECURITY */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              10. Data Security
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              We implement technical and organizational measures designed to
              protect personal information against unauthorized access,
              disclosure, alteration, loss or destruction.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Depending on the type of information, security measures may
              include authenticated access controls, encrypted processing and
              storage of sensitive application data, secure authentication
              mechanisms and server-side authorization checks.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              No internet-based service can guarantee absolute security.
              Users are responsible for maintaining the security of their
              account credentials.
            </p>
          </section>

          {/* 11. DATA RETENTION */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              11. Data Retention
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Personal information is retained only for as long as necessary to
              provide the requested services, maintain account functionality,
              comply with legal obligations, resolve disputes and enforce
              applicable agreements.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              When an account is deleted, Life AiOS is designed to delete the
              application data associated with that account in accordance with
              the applicable deletion process, subject to information that must
              be retained by law.
            </p>
          </section>

          {/* 12. YOUR RIGHTS */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              12. Your GDPR Rights
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Subject to applicable legal conditions and limitations, you may
              have the right to:
            </p>

            <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                Access your personal data.
              </li>

              <li>
                Request correction of inaccurate or incomplete information.
              </li>

              <li>
                Request deletion of your personal data.
              </li>

              <li>
                Request restriction of processing.
              </li>

              <li>
                Object to certain processing activities.
              </li>

              <li>
                Request portability of personal data where applicable.
              </li>

              <li>
                Withdraw consent where processing is based on consent.
              </li>
            </ul>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              You may also have the right to lodge a complaint with a competent
              data protection supervisory authority.
            </p>
          </section>

          {/* 13. ACCOUNT DELETION AND EXPORT */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              13. Account Deletion and Data Export
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Life AiOS provides functionality designed to allow users to
              delete their account and associated application data.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Where available, users may also request or use the data export
              functionality to obtain application data associated with their
              authenticated account.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Requests relating to privacy rights can also be submitted through
              our{" "}
              <Link
                href="/support"
                className="text-blue-600 font-semibold hover:underline"
              >
                Support Center
              </Link>
              .
            </p>
          </section>

          {/* 14. COOKIES */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              14. Cookies and Similar Technologies
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Life AiOS may use cookies or similar technologies that are
              necessary for authentication, security, session management and
              core functionality.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              For more information, please read our{" "}
              <Link
                href="/cookies"
                className="text-blue-600 font-semibold hover:underline"
              >
                Cookie Policy
              </Link>
              .
            </p>
          </section>

          {/* 15. CHILDREN */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              15. Children
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              Life AiOS is not intended to be used by children in circumstances
              where applicable law requires parental authorization or other
              safeguards.
            </p>
          </section>

          {/* 16. POLICY CHANGES */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              16. Changes to This Privacy Policy
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              We may update this Privacy Policy from time to time to reflect
              changes to our services, technology, legal requirements or data
              processing practices.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              The updated version will be published on this page together with
              the relevant update date.
            </p>
          </section>

          {/* 17. CONTACT */}

          <section>
            <h2 className="text-2xl font-semibold dark:text-white">
              17. Contact
            </h2>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              If you have questions about this Privacy Policy, want to exercise
              a data protection right, or have a privacy-related request,
              please contact the Life AiOS support team.
            </p>

            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
              You can reach us through our{" "}
              <Link
                href="/support"
                className="text-blue-600 font-semibold hover:underline"
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