"use client";

interface Props {
  checked: boolean;
  onChange: (
    value: boolean
  ) => void;
  children: React.ReactNode;
}

export default function AuthCheckbox({
  checked,
  onChange,
  children,
}: Props) {
  return (
    <label className="flex items-start gap-3 text-sm dark:text-gray-300">

      <input
        type="checkbox"
        checked={checked}
        onChange={(e)=>
          onChange(e.target.checked)
        }
        className="mt-1"
      />

      <span>{children}</span>

    </label>
  );
}