"use client";

export default function EditDocumentButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
    >
      ✏️ Edit
    </button>
  );
}