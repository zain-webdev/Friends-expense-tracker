import { useEffect, useRef, useState } from "react";

export default function AddItemModal({ open, onClose, onSubmit, isAdding, isDeleting }) {
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setName("");
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl ring-1 ring-slate-200">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h4 className="text-base font-semibold text-slate-900">Add New Item</h4>
            <p className="text-xs font-semibold text-slate-500">This will be saved to Google Sheet</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100"
            disabled={isAdding || isDeleting}
          >
            ✕
          </button>
        </div>

        <form
          className="p-5 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(name);
          }}
        >
          <div>
            <label className="block text-sm font-medium text-slate-700">Item Name</label>
            <input
              ref={inputRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="e.g., Milk, Bread, Eggs..."
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              required
              disabled={isAdding || isDeleting}
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              disabled={isAdding || isDeleting}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isAdding || isDeleting}
            >
              <svg className={`${isAdding ? "" : "hidden"} h-4 w-4 animate-spin`} viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4"></path>
              </svg>
              <span>{isAdding ? "Saving..." : "Save Item"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
