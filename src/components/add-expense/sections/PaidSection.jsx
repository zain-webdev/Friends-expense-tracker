export default function PaidSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
      <div className="flex items-start justify-between gap-3">
        <div><h3 className="text-sm font-semibold text-slate-900">Paid</h3></div>
        <span className="text-xs text-slate-500">PKR</span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="paidAli" className="block text-sm font-medium text-slate-700">Paid by Ali</label>
          <input
            type="number"
            id="paidAli"
            min="0"
            step="1"
            placeholder="Paid by Ali"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
          />
        </div>

        <div>
          <label htmlFor="paidNabeel" className="block text-sm font-medium text-slate-700">Paid by Nabeel</label>
          <input
            type="number"
            id="paidNabeel"
            min="0"
            step="1"
            placeholder="Paid by Nabeel"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
          />
        </div>

        <div>
          <label htmlFor="paidZain" className="block text-sm font-medium text-slate-700">Paid by Zain</label>
          <input
            type="number"
            id="paidZain"
            min="0"
            step="1"
            placeholder="Paid by Zain"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
          />
        </div>
      </div>
    </div>
  );
}
