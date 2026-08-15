"use client";

interface AuthFormProps {
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>
  ) => void;

  children: React.ReactNode;
}

export default function AuthForm({
  onSubmit,
  children,
}: AuthFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="
        mt-10
        space-y-6
      "
    >
      {children}
    </form>
  );
}