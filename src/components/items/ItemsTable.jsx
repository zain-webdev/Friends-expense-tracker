export default function ItemsTable({ items, leftStatus, onDeleteClick, isDeleting }) {
  return (
    <>
      <div className="mt-4 max-h-[420px] overflow-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-3 py-2 text-left">Item</th>
              <th className="px-3 py-2 text-right w-16">Del</th>
            </tr>
          </thead>

          <tbody className="divide-y bg-white">
            {!items.length ? (
              <tr>
                <td className="px-3 py-3 text-slate-500" colSpan={2}>
                  No items found.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item}>
                  <td className="px-3 py-2 text-slate-900 font-medium">{item}</td>
                  <td className="px-3 py-2 text-right">
                    <button
                      type="button"
                      onClick={() => !isDeleting && onDeleteClick(item)}
                      className="inline-flex items-center justify-center rounded-lg px-2 py-2 hover:bg-rose-50 text-rose-600 disabled:opacity-60 disabled:cursor-not-allowed"
                      title="Delete"
                      disabled={isDeleting}
                    >
                      {/* FontAwesome icon ki jagah simple */}
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs font-semibold text-slate-500">{leftStatus}</p>
    </>
  );
}
