import { useEffect, useMemo, useRef, useState } from "react";
import Toast from "../ui/Toast.jsx";
import ReportSkeleton from "./ReportSkeleton.jsx";
import ReportBlocks from "./ReportBlocks.jsx";
import { fetchReportK5M15 } from "../../lib/reportApi.js";
import { saveAsPDF, saveAsPNG } from "./reportExport.js";

export default function ReportLayout() {
  const [loading, setLoading] = useState(true);
  const [matrix, setMatrix] = useState([]);
  const [loadError, setLoadError] = useState("");

  const [toast, setToast] = useState({ open: false, message: "", type: "success" });

  const [exporting, setExporting] = useState(false);
  const [exportWhich, setExportWhich] = useState(null); // "png" | "pdf" | null

  const reportBoxRef = useRef(null);

  function showToast(message, type) {
    setToast({ open: true, message: (type === "success" ? "✅ " : "❌ ") + message, type });
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast((t) => ({ ...t, open: false })), 3000);
  }

  // loadReport (skeleton first)
  useEffect(() => {
    (async () => {
      setLoading(true);
      setLoadError("");

      try {
        const data = await fetchReportK5M15();
        if (!data) {
          setMatrix([]);
          setLoadError("Failed to load report.");
          showToast("Report load failed", "error");
          return;
        }
        setMatrix(data);
      } catch (e) {
        setMatrix([]);
        setLoadError("Network error / Access issue.");
        showToast("Network error: " + (e?.message || String(e)), "error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const canExport = useMemo(
    () => !loading && !loadError && Array.isArray(matrix) && matrix.length > 0,
    [loading, loadError, matrix]
  );

  function setExportLoading(which, yes) {
    setExporting(yes);
    setExportWhich(yes ? which : null);
  }

  async function onPng() {
    if (!reportBoxRef.current || exporting || !canExport) return;
    try {
      setExportLoading("png", true);
      showToast("Generating PNG...", "success");
      await saveAsPNG(reportBoxRef.current);
    } catch (e) {
      showToast("PNG error: " + (e?.message || String(e)), "error");
    } finally {
      setExportLoading("png", false);
    }
  }

  async function onPdf() {
    if (!reportBoxRef.current || exporting || !canExport) return;
    try {
      setExportLoading("pdf", true);
      showToast("Generating PDF...", "success");
      await saveAsPDF(reportBoxRef.current);
    } catch (e) {
      showToast("PDF error: " + (e?.message || String(e)), "error");
    } finally {
      setExportLoading("pdf", false);
    }
  }

  return (
    <>
      <Toast open={toast.open} message={toast.message} type={toast.type} />

      <section className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        <div className="p-6 sm:p-8">
          {loading ? (
            <ReportSkeleton />
          ) : (
            <div id="reportWrap">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Summary Report</h2>
                  <p className="text-sm text-slate-500"></p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id="btnPng"
                    onClick={onPng}
                    disabled={!canExport || exporting}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 active:scale-[0.99] flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span
                      id="pngSpinner"
                      className={
                        (exportWhich === "png" ? "" : "hidden") +
                        " h-4 w-4 rounded-full border-2 border-slate-400/40 border-t-slate-700 animate-spin"
                      }
                    />
                    <span id="btnPngText">
                      {exportWhich === "png" ? "Generating..." : "Save as PNG"}
                    </span>
                  </button>

                  <button
                    id="btnPdf"
                    onClick={onPdf}
                    disabled={!canExport || exporting}
                    className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800 active:scale-[0.99] flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span
                      id="pdfSpinner"
                      className={
                        (exportWhich === "pdf" ? "" : "hidden") +
                        " h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin"
                      }
                    />
                    <span id="btnPdfText">
                      {exportWhich === "pdf" ? "Generating..." : "Save as PDF"}
                    </span>
                  </button>
                </div>
              </div>

              <div
                id="reportBox"
                ref={reportBoxRef}
                className="mt-6 bg-white p-6 rounded-2xl border border-slate-200"
              >
                {loadError ? (
                  <p id="statusText" className="text-sm text-slate-500">
                    {loadError}
                  </p>
                ) : (
                  <>
                    <p id="statusText" className="text-sm text-slate-500"></p>
                    <ReportBlocks matrix={matrix} />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
