export default function RecordsTable({ rows }) {
  return (
    <div className="mt-6 overflow-x-auto sm:overflow-x-visible rounded-2xl border border-slate-200">
      <table className="w-full text-sm min-w-[1100px] sm:min-w-0">
        <thead className="bg-slate-100 text-slate-700">
          <tr>
            <th className="px-3 py-2 text-left">Sr#</th>
            <th className="px-3 py-2 text-left">Date</th>
            <th className="px-3 py-2 text-left">Item</th>
            <th className="px-3 py-2 text-right">Paid Ali</th>
            <th className="px-3 py-2 text-right">Paid Nabeel</th>
            <th className="px-3 py-2 text-right">Paid Zain</th>
            <th className="px-3 py-2 text-right">Share Ali</th>
            <th className="px-3 py-2 text-right">Share Nabeel</th>
            <th className="px-3 py-2 text-right">Share Zain</th>
          </tr>
        </thead>

        <tbody className="divide-y bg-white">
          {!rows.length ? (
            <tr>
              <td className="px-3 py-3 text-slate-500" colSpan={9}>
                No records found.
              </td>
            </tr>
          ) : (
            rows.map((r, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="px-3 py-2">{r.sr}</td>
                <td className="px-3 py-2">{r.date}</td>
                <td className="px-3 py-2">{r.item}</td>
                <td className="px-3 py-2 text-right">{r.paidAli}</td>
                <td className="px-3 py-2 text-right">{r.paidNabeel}</td>
                <td className="px-3 py-2 text-right">{r.paidZain}</td>
                <td className="px-3 py-2 text-right">{r.shareAli}</td>
                <td className="px-3 py-2 text-right">{r.shareNabeel}</td>
                <td className="px-3 py-2 text-right">{r.shareZain}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
