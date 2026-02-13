export default function ReportActions({ pngLoading, pdfLoading, onPng, onPdf }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onPng}
        disabled={pngLoading || pdfLoading}
        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 active:scale-[0.99] flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span
          className={[
            "h-4 w-4 rounded-full border-2 border-slate-400/40 border-t-slate-700 animate-spin",
            pngLoading ? "" : "hidden",
          ].join(" ")}
        />
        <span>{pngLoading ? "Saving..." : "Save as PNG"}</span>
      </button>

      <button
        type="button"
        onClick={onPdf}
        disabled={pdfLoading || pngLoading}
        className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800 active:scale-[0.99] flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span
          className={[
            "h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin",
            pdfLoading ? "" : "hidden",
          ].join(" ")}
        />
        <span>{pdfLoading ? "Saving..." : "Save as PDF"}</span>
      </button>
    </div>
  );
}
