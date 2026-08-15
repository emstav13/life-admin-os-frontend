"use client";

export default function AuthCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        w-full

        rounded-3xl

        bg-white
        dark:bg-[#2B2724]

        p-8

        shadow-xl

        border
        border-gray-200
        dark:border-[#3D3834]
      "
    >
      {children}
    </div>
  );
}