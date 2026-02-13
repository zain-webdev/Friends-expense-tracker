export default function ItemsSkeleton() {
  return (
    <div id="itemsSkeleton">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="h-4 w-32 rounded bg-slate-200 animate-pulse"></div>
          <div className="mt-2 h-3 w-56 rounded bg-slate-100 animate-pulse"></div>
        </div>
        <div className="h-10 w-28 rounded-xl bg-slate-200 animate-pulse"></div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left skeleton */}
        <aside className="lg:col-span-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-4">
            <div className="flex items-center justify-between">
              <div className="h-3 w-28 rounded bg-slate-200 animate-pulse"></div>
              <div className="h-6 w-12 rounded-full bg-slate-100 animate-pulse"></div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3 space-y-3">
              <div className="h-9 w-full rounded-xl bg-slate-100 animate-pulse"></div>
              <div className="h-9 w-full rounded-xl bg-slate-100 animate-pulse"></div>
              <div className="h-9 w-full rounded-xl bg-slate-100 animate-pulse"></div>
              <div className="h-9 w-full rounded-xl bg-slate-100 animate-pulse"></div>
              <div className="h-9 w-full rounded-xl bg-slate-100 animate-pulse"></div>
            </div>

            <div className="mt-3 h-3 w-40 rounded bg-slate-100 animate-pulse"></div>
          </div>
        </aside>

        {/* Right skeleton */}
        <div className="lg:col-span-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col items-center justify-center min-h-[420px]">
            <div className="text-center max-w-md w-full">
              <div className="mx-auto h-4 w-36 rounded bg-slate-200 animate-pulse"></div>
              <div className="mx-auto mt-3 h-3 w-80 rounded bg-slate-100 animate-pulse"></div>
              <div className="mx-auto mt-2 h-3 w-72 rounded bg-slate-100 animate-pulse"></div>

              <div className="mx-auto mt-6 h-10 w-36 rounded-xl bg-slate-200 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
