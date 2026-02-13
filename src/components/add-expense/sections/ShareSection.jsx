export default function ShareSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {/* Left */}
        <div className="flex items-center gap-6">
          <h3 className="text-sm font-semibold text-slate-900">Share</h3>

          <div className="flex items-center gap-5">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" id="shareAliPick" className="h-4 w-4 accent-slate-900" />
              <span className="text-sm font-medium text-slate-700">Ali</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" id="shareNabeelPick" className="h-4 w-4 accent-slate-900" />
              <span className="text-sm font-medium text-slate-700">Nabeel</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" id="shareZainPick" className="h-4 w-4 accent-slate-900" />
              <span className="text-sm font-medium text-slate-700">Zain</span>
            </label>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-3 sm:items-end">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-slate-700">Decide Later</span>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" id="decideLater" className="peer sr-only" />
              <div className="h-6 w-11 rounded-full bg-slate-200 peer-checked:bg-slate-900 transition"></div>
              <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5"></div>
            </label>
          </div>
        </div>
      </div>

      {/* shareBoxes */}
      <div id="shareBoxes" className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Ali */}
        <div>
          <label htmlFor="shareAli" className="block text-sm font-medium text-slate-700">Ali share</label>

          <input
            type="number"
            id="shareAli"
            min="0"
            step="0.01"
            placeholder="Ali share"
            className="share-manual mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
          />

          <div
            id="shareAliAutoWrap"
            className="share-auto hidden mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900"
          >
            <span id="shareAliAuto">0</span>
          </div>
        </div>

        {/* Nabeel */}
        <div>
          <label htmlFor="shareNabeel" className="block text-sm font-medium text-slate-700">Nabeel share</label>

          <input
            type="number"
            id="shareNabeel"
            min="0"
            step="0.01"
            placeholder="Nabeel share"
            className="share-manual mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
          />

          <div
            id="shareNabeelAutoWrap"
            className="share-auto hidden mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900"
          >
            <span id="shareNabeelAuto">0</span>
          </div>
        </div>

        {/* Zain */}
        <div>
          <label htmlFor="shareZain" className="block text-sm font-medium text-slate-700">Zain share</label>

          <input
            type="number"
            id="shareZain"
            min="0"
            step="0.01"
            placeholder="Zain share"
            className="share-manual mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
          />

          <div
            id="shareZainAutoWrap"
            className="share-auto hidden mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900"
          >
            <span id="shareZainAuto">0</span>
          </div>
        </div>
      </div>

      <div
        id="shareError"
        className="mt-3 hidden rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700"
      />
    </div>
  );
}
