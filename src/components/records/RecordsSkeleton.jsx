export default function RecordsSkeleton() {
  return (
    <div className="mt-2">
      {/* fake title row */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-4 w-44 rounded bg-slate-200 animate-pulse"></div>
          <div className="mt-2 h-3 w-64 rounded bg-slate-100 animate-pulse"></div>
        </div>
        <div className="h-9 w-24 rounded-xl bg-slate-100 animate-pulse"></div>
      </div>

      {/* fake table */}
      <div className="mt-6 overflow-x-auto sm:overflow-x-visible rounded-2xl border border-slate-200">
        <div className="min-w-[1100px] sm:min-w-0">
          {/* fake header */}
          <div className="grid grid-cols-9 gap-2 bg-slate-100 p-3">
            <div className="h-3 w-10 rounded bg-slate-200 animate-pulse"></div>
            <div className="h-3 w-20 rounded bg-slate-200 animate-pulse"></div>
            <div className="h-3 w-24 rounded bg-slate-200 animate-pulse"></div>
            <div className="h-3 w-16 rounded bg-slate-200 animate-pulse justify-self-end"></div>
            <div className="h-3 w-20 rounded bg-slate-200 animate-pulse justify-self-end"></div>
            <div className="h-3 w-16 rounded bg-slate-200 animate-pulse justify-self-end"></div>
            <div className="h-3 w-16 rounded bg-slate-200 animate-pulse justify-self-end"></div>
            <div className="h-3 w-20 rounded bg-slate-200 animate-pulse justify-self-end"></div>
            <div className="h-3 w-16 rounded bg-slate-200 animate-pulse justify-self-end"></div>
          </div>

          {/* fake body rows */}
          <div className="divide-y bg-white">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="grid grid-cols-9 gap-2 p-3">
                <div className="h-3 w-8 rounded bg-slate-100 animate-pulse"></div>
                <div className="h-3 w-24 rounded bg-slate-100 animate-pulse"></div>
                <div
                  className={`h-3 rounded bg-slate-100 animate-pulse ${
                    i === 0 ? "w-40" : i === 1 ? "w-52" : i === 2 ? "w-44" : "w-60"
                  }`}
                ></div>
                <div className="h-3 w-12 rounded bg-slate-100 animate-pulse justify-self-end"></div>
                <div className="h-3 w-12 rounded bg-slate-100 animate-pulse justify-self-end"></div>
                <div className="h-3 w-12 rounded bg-slate-100 animate-pulse justify-self-end"></div>
                <div className="h-3 w-12 rounded bg-slate-100 animate-pulse justify-self-end"></div>
                <div className="h-3 w-12 rounded bg-slate-100 animate-pulse justify-self-end"></div>
                <div className="h-3 w-12 rounded bg-slate-100 animate-pulse justify-self-end"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
