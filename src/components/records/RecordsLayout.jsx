import { useEffect, useState } from "react";
import Toast from "../ui/Toast.jsx";
import RecordsSkeleton from "./RecordsSkeleton.jsx";
import RecordsTable from "./RecordsTable.jsx";
import { fetchLast10Records } from "../../lib/recordsApi.js";

// ✅ same as your JS
function formatDateOnly(value) {
  if (!value) return "";

  if (typeof value === "string" && value.includes("-") && value.length >= 10) {
    return value.slice(0, 10);
  }

  try {
    const d = new Date(value);
    if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  } catch (_) {}

  return String(value);
}

export default function RecordsLayout() {
  const [toast, setToast] = useState({ open: false, message: "", type: "success" });

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [statusText, setStatusText] = useState("");

  function showToast(message, type) {
    setToast({ open: true, message: (type === "success" ? "✅ " : "❌ ") + message, type });
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast((t) => ({ ...t, open: false })), 3000);
  }

  async function loadLast10() {
    setLoading(true);
    setStatusText("");

    try {
      const data = await fetchLast10Records();

      if (!data || !data.length) {
        setRows([]);
        setStatusText("No records found.");
        setLoading(false);
        return;
      }

      // ✅ format dates same as JS
      const formatted = data.map((r, i) => ({
        ...r,
        sr: r?.sr ?? i + 1,
        date: formatDateOnly(r?.date),
        paidAli: r?.paidAli ?? 0,
        paidNabeel: r?.paidNabeel ?? 0,
        paidZain: r?.paidZain ?? 0,
        shareAli: r?.shareAli ?? 0,
        shareNabeel: r?.shareNabeel ?? 0,
        shareZain: r?.shareZain ?? 0,
      }));

      setRows(formatted);
      setStatusText("");
    } catch (err) {
      setRows([]);
      setStatusText("Network error / Access issue.");
      showToast("Network error: " + (err?.message || String(err)), "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLast10();
  }, []);

  return (
    <>
      <Toast open={toast.open} message={toast.message} type={toast.type} />

      <section className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        <div className="p-6 sm:p-8">
          {loading ? (
            <RecordsSkeleton />
          ) : (
            <div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mt-2">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Last 10 Records
                  </h2>
                </div>
              </div>

              <RecordsTable rows={rows} />

              {statusText && (
                <p className="mt-4 text-sm text-slate-500">{statusText}</p>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
