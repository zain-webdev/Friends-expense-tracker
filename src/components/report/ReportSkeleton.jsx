export default function ReportSkeleton() {
  return (
    <div id="reportSkeleton">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="h-4 w-44 rounded bg-slate-200 animate-pulse"></div>
          <div className="mt-2 h-3 w-72 rounded bg-slate-100 animate-pulse"></div>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-10 w-28 rounded-xl bg-slate-100 animate-pulse"></div>
          <div className="h-10 w-28 rounded-xl bg-slate-200 animate-pulse"></div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 max-h-[520px] overflow-hidden">
        <div className="flex flex-col items-center gap-10">
          {[1, 2, 3].map((k) => (
            <div
              key={k}
              className="w-[520px] max-w-full rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="grid grid-cols-3 gap-3">
                <div className="h-3 rounded bg-slate-200 animate-pulse"></div>
                <div className="h-3 rounded bg-slate-200 animate-pulse"></div>
                <div className="h-3 rounded bg-slate-200 animate-pulse"></div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="h-4 rounded bg-slate-100 animate-pulse"></div>
                <div className="h-4 rounded bg-slate-100 animate-pulse"></div>
                <div className="h-4 rounded bg-slate-100 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
