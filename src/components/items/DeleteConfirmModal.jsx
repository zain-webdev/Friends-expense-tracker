export default function DeleteConfirmModal({ open, itemName, onClose, onConfirm, isDeleting }) {
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
            <h4 className="text-base font-semibold text-slate-900">Confirm Delete</h4>
            <p className="text-xs font-semibold text-slate-500">This will be removed from Google Sheet</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100"
            disabled={isDeleting}
          >
            ✕
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-sm text-slate-700">
              Are you sure you want to delete:{" "}
              <span className="font-semibold text-slate-900">{itemName}</span> ?
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              disabled={isDeleting}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isDeleting}
            >
              <span
                className={`${isDeleting ? "" : "hidden"} h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin`}
              ></span>
              <span>{isDeleting ? "Deleting..." : "Delete"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
