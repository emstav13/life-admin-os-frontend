"use client";

interface AuthHeaderProps {
  title: string;
  description: string;
}

export default function AuthHeader({
  title,
  description,
}: AuthHeaderProps) {
  return (
    <div className="mb-10">

      <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
        {title}
      </h1>

      <p className="mt-3 text-gray-500 dark:text-gray-400 leading-7">
        {description}
      </p>

    </div>
  );
}