export default function Toast({ open, message, type = "success" }) {
  if (!open) return null;

  const base =
    "fixed top-4 right-4 z-50 max-w-sm rounded-xl px-4 py-3 text-sm font-medium shadow-lg ring-1";

  const cls =
    type === "success"
      ? `${base} bg-emerald-50 text-emerald-800 ring-emerald-200`
      : `${base} bg-rose-50 text-rose-800 ring-rose-200`;

  return <div className={cls}>{message}</div>;
}
