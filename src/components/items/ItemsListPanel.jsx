export default function ItemsListPanel() {
  return (
    <aside className="lg:col-span-4">
      <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">Items to buy</h3>
          <span
            id="countBadge"
            className="text-xs font-bold text-slate-600 bg-white border border-slate-200 px-2 py-1 rounded-full"
          >
            0
          </span>
        </div>

        <div className="list-wrap mt-4 max-h-[420px] overflow-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-3 py-2 text-left">Item</th>
                <th className="px-3 py-2 text-right w-16">Del</th>
              </tr>
            </thead>

            <tbody id="itemsRows" className="divide-y bg-white">
              {/* JS/React will load */}
            </tbody>
          </table>
        </div>

        <p id="leftStatus" className="mt-3 text-xs font-semibold text-slate-500"></p>
      </div>
    </aside>
  );
}
