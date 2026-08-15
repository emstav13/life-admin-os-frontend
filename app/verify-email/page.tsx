import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";

export default function VerifyEmailPage() {
  return (
    <AuthLayout>
      <div className="text-center">

        <div className="text-7xl mb-6">
          📧
        </div>

        <h1 className="text-4xl font-bold dark:text-white">
          Verify your email
        </h1>

        <p className="mt-5 text-gray-500 dark:text-gray-400 leading-7">
          Your account has been created successfully.
          <br />
          Please check your inbox and click the verification link
          before logging in.
        </p>

        <Link
          href="/login"
          className="
            mt-10
            inline-flex
            items-center
            justify-center

            rounded-xl

            bg-gradient-to-r
            from-blue-600
            to-indigo-600

            px-8
            py-3

            font-semibold
            text-white

            hover:opacity-90

            transition
          "
        >
          Back to Login
        </Link>

      </div>
    </AuthLayout>
  );
}