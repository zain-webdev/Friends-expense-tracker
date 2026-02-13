import { useEffect, useMemo, useRef, useState } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Toast from "../ui/Toast.jsx";
import { submitExpense } from "../../lib/expenseApi.js";

function round2(n) {
  return Math.round((Number(n) || 0) * 100) / 100;
}

function num(v) {
  return Number(v) || 0;
}

function todayYMD() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

const DEFAULT_CHIPS = ["Milk", "Egg", "Pizza", "Bread", "Sugar"];

export default function AddExpenseForm() {
  // Form state
  const [date, setDate] = useState(todayYMD());
  const [item, setItem] = useState("");

  const [paidAli, setPaidAli] = useState("");
  const [paidNabeel, setPaidNabeel] = useState("");
  const [paidZain, setPaidZain] = useState("");

  const [shareAli, setShareAli] = useState("");
  const [shareNabeel, setShareNabeel] = useState("");
  const [shareZain, setShareZain] = useState("");

  // Picks
  const [shareAliPick, setShareAliPick] = useState(false);
  const [shareNabeelPick, setShareNabeelPick] = useState(false);
  const [shareZainPick, setShareZainPick] = useState(false);
  const [decideLater, setDecideLater] = useState(false);

  // UI
  const [isSaving, setIsSaving] = useState(false);
  const [shareError, setShareError] = useState(""); // text => error visible
  const [toast, setToast] = useState({ open: false, message: "", type: "success" });

  // Flatpickr
  const dateRef = useRef(null);

  useEffect(() => {
    if (!dateRef.current) return;

    const fp = flatpickr(dateRef.current, {
      dateFormat: "Y-m-d",
      defaultDate: new Date(),
      onChange: (selectedDates, dateStr) => setDate(dateStr),
    });

    // set initial
    fp.setDate(date, true);

    return () => fp.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helpers
  const totalPaid = useMemo(() => {
    return round2(num(paidAli) + num(paidNabeel) + num(paidZain));
  }, [paidAli, paidNabeel, paidZain]);

  const selectedCount = useMemo(() => {
    if (decideLater) return 0;
    let c = 0;
    if (shareAliPick) c++;
    if (shareNabeelPick) c++;
    if (shareZainPick) c++;
    return c;
  }, [decideLater, shareAliPick, shareNabeelPick, shareZainPick]);

  const isAutoMode = useMemo(() => !decideLater && selectedCount > 0, [decideLater, selectedCount]);
  const isManualMode = useMemo(() => !decideLater && selectedCount === 0, [decideLater, selectedCount]);

  function showToast(message, type) {
    setToast({ open: true, message: (type === "success" ? "✅ " : "❌ ") + message, type });
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast((t) => ({ ...t, open: false })), 3000);
  }

  function clearShareErrorUI() {
    setShareError("");
  }

  // Manual validation (same logic)
  function validateManualShares(next = { shareAli, shareNabeel, shareZain }) {
    const total = totalPaid;

    const aFilled = String(next.shareAli ?? "").trim() !== "";
    const nFilled = String(next.shareNabeel ?? "").trim() !== "";
    const zFilled = String(next.shareZain ?? "").trim() !== "";

    const a = aFilled ? round2(num(next.shareAli)) : 0;
    const n = nFilled ? round2(num(next.shareNabeel)) : 0;
    const z = zFilled ? round2(num(next.shareZain)) : 0;

    const sum = round2(a + n + z);

    const badIndividual = (aFilled && a > total) || (nFilled && n > total) || (zFilled && z > total);
    const anyFilled = aFilled || nFilled || zFilled;
    const badSum = anyFilled && sum > total;

    if (badIndividual || badSum) {
      setShareError("Your share value exceeded the paid amount.");
      return false;
    }

    clearShareErrorUI();
    return true;
  }

  // Auto shares apply (same)
  useEffect(() => {
    if (!isAutoMode) return;

    const total = totalPaid;
    const c = selectedCount;

    let a = 0, n = 0, z = 0;
    if (c > 0) {
      const each = round2(total / c);
      if (shareAliPick) a = each;
      if (shareNabeelPick) n = each;
      if (shareZainPick) z = each;
    }

    // In auto mode: inputs hidden, but payload should have these values
    setShareAli(String(a));
    setShareNabeel(String(n));
    setShareZain(String(z));

    clearShareErrorUI();
  }, [isAutoMode, totalPaid, selectedCount, shareAliPick, shareNabeelPick, shareZainPick]);

  // Decide later => force shares 0 + hide
  useEffect(() => {
    if (!decideLater) return;

    setShareAli("0");
    setShareNabeel("0");
    setShareZain("0");
    clearShareErrorUI();
  }, [decideLater]);

  // Manual mode => validate on changes
  useEffect(() => {
    if (!isManualMode) return;
    validateManualShares();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isManualMode, shareAli, shareNabeel, shareZain, totalPaid]);

  function handlePickChange(setter) {
    return (e) => {
      // If decideLater ON => turn it OFF (same behavior)
      if (decideLater) setDecideLater(false);
      setter(e.target.checked);
    };
  }

  function clearForm() {
    setItem("");
    setPaidAli("");
    setPaidNabeel("");
    setPaidZain("");

    setShareAli("");
    setShareNabeel("");
    setShareZain("");

    setShareAliPick(false);
    setShareNabeelPick(false);
    setShareZainPick(false);
    setDecideLater(false);

    setDate(todayYMD());
    if (dateRef.current?._flatpickr) dateRef.current._flatpickr.setDate(new Date(), true);

    clearShareErrorUI();
  }

  function buildPayload() {
    let sA = num(shareAli);
    let sN = num(shareNabeel);
    let sZ = num(shareZain);

    if (decideLater) {
      sA = 0; sN = 0; sZ = 0;
    }

    return {
      date: String(date || "").trim(),
      item: String(item || "").trim(),
      paidAli: num(paidAli),
      paidNabeel: num(paidNabeel),
      paidZain: num(paidZain),
      shareAli: sA,
      shareNabeel: sN,
      shareZain: sZ,
    };
  }

  async function onSubmit(e) {
    e.preventDefault();

    // Re-run validation
    if (isManualMode) {
      const ok = validateManualShares();
      if (!ok) {
        showToast("Please fix the share values.", "error");
        return;
      }
    } else {
      // auto/decideLater never invalid by logic
      clearShareErrorUI();
    }

    if (shareError) {
      showToast("Please fix the share values.", "error");
      return;
    }

    if (isSaving) return;
    setIsSaving(true);

    const payload = buildPayload();

    if (!payload.date || !payload.item) {
      showToast("Date and Item required.", "error");
      setIsSaving(false);
      return;
    }

    const tp = round2(payload.paidAli + payload.paidNabeel + payload.paidZain);
    if (tp <= 0) {
      showToast("Please enter at least one Paid value (Ali/Nabeel/Zain).", "error");
      setIsSaving(false);
      return;
    }

    try {
      await submitExpense(payload);
      showToast("Saved! (Check Google Sheet)", "success");
      clearForm();
    } catch (err) {
      showToast("Network error: " + (err?.message || String(err)), "error");
    } finally {
      // same as your JS (700ms)
      setTimeout(() => setIsSaving(false), 700);
    }
  }

  // RED outline rules (same feel)
  const manualRed = isManualMode && !!shareError;
  const inputBase =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100";

  // force red even focus (same as JS inline style)
  const redStyle = manualRed
    ? { borderColor: "#fca5a5", boxShadow: "0 0 0 2px rgba(244,63,94,.55)" }
    : undefined;

  // Auto display values (same as HTML spans)
  const autoAli = shareAliPick ? round2(totalPaid / selectedCount || 0) : 0;
  const autoNabeel = shareNabeelPick ? round2(totalPaid / selectedCount || 0) : 0;
  const autoZain = shareZainPick ? round2(totalPaid / selectedCount || 0) : 0;

  const disableSave = isSaving || !!shareError;
  const disableClear = isSaving;

  return (
    <>
      <Toast open={toast.open} message={toast.message} type={toast.type} />

      <form onSubmit={onSubmit} className="space-y-8">
        {/* Top buttons */}
        <div className="flex items-center gap-2 justify-end">
          <button
            type="button"
            onClick={() => {
              if (isSaving) return;
              clearForm();
              showToast("Cleared", "success");
            }}
            disabled={disableClear}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Clear
          </button>

          <button
            type="submit"
            disabled={disableSave}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {/* Spinner */}
            <svg className={`${isSaving ? "" : "hidden"} h-4 w-4 animate-spin`} viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4"></path>
            </svg>
            <span>{isSaving ? "Saving..." : "Save Expense"}</span>
          </button>
        </div>

        {/* Basic */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">Date</label>
            <input
              ref={dateRef}
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Select date"
              className={inputBase}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Item / Description</label>
            <input
              type="text"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              placeholder="e.g., Pizza, Grocery, Petrol"
              className={inputBase}
              required
            />

            <div className="mt-3 flex flex-wrap gap-2">
              {DEFAULT_CHIPS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setItem(c)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-100 active:scale-95 flex items-center gap-2"
                >
                  <span></span>
                  <span>{c}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Paid */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Paid</h3>
            </div>
            <span className="text-xs text-slate-500">PKR</span>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-slate-700">Paid by Ali</label>
              <input
                type="number"
                min="0"
                step="1"
                value={paidAli}
                onChange={(e) => setPaidAli(e.target.value)}
                placeholder="Paid by Ali"
                className={inputBase}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Paid by Nabeel</label>
              <input
                type="number"
                min="0"
                step="1"
                value={paidNabeel}
                onChange={(e) => setPaidNabeel(e.target.value)}
                placeholder="Paid by Nabeel"
                className={inputBase}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Paid by Zain</label>
              <input
                type="number"
                min="0"
                step="1"
                value={paidZain}
                onChange={(e) => setPaidZain(e.target.value)}
                placeholder="Paid by Zain"
                className={inputBase}
              />
            </div>
          </div>
        </div>

        {/* Share */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            {/* Left */}
            <div className="flex items-center gap-6">
              <h3 className="text-sm font-semibold text-slate-900">Share</h3>

              <div className="flex items-center gap-5">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={shareAliPick}
                    onChange={handlePickChange(setShareAliPick)}
                    className="h-4 w-4 accent-slate-900"
                  />
                  <span className="text-sm font-medium text-slate-700">Ali</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={shareNabeelPick}
                    onChange={handlePickChange(setShareNabeelPick)}
                    className="h-4 w-4 accent-slate-900"
                  />
                  <span className="text-sm font-medium text-slate-700">Nabeel</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={shareZainPick}
                    onChange={handlePickChange(setShareZainPick)}
                    className="h-4 w-4 accent-slate-900"
                  />
                  <span className="text-sm font-medium text-slate-700">Zain</span>
                </label>
              </div>
            </div>

            {/* Right: Decide Later */}
            <div className="flex flex-col gap-3 sm:items-end">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-slate-700">Decide Later</span>

                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={decideLater}
                    onChange={(e) => {
                      const on = e.target.checked;
                      setDecideLater(on);
                      if (on) {
                        setShareAliPick(false);
                        setShareNabeelPick(false);
                        setShareZainPick(false);
                      }
                    }}
                    className="peer sr-only"
                  />
                  <div className="h-6 w-11 rounded-full bg-slate-200 peer-checked:bg-slate-900 transition"></div>
                  <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Share boxes */}
          {!decideLater && (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {/* Ali */}
              <div>
                <label className="block text-sm font-medium text-slate-700">Ali share</label>

                {/* manual input */}
                {isManualMode && (
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={shareAli}
                    onChange={(e) => setShareAli(e.target.value)}
                    onBlur={() => validateManualShares()}
                    placeholder="Ali share"
                    className={inputBase}
                    style={redStyle}
                  />
                )}

                {/* auto wrap */}
                {isAutoMode && (
                  <div
                    className={`mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 ${
                      shareAliPick && shareError ? "border-rose-300 ring-2 ring-rose-500" : ""
                    }`}
                  >
                    <span>{String(autoAli)}</span>
                  </div>
                )}
              </div>

              {/* Nabeel */}
              <div>
                <label className="block text-sm font-medium text-slate-700">Nabeel share</label>

                {isManualMode && (
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={shareNabeel}
                    onChange={(e) => setShareNabeel(e.target.value)}
                    onBlur={() => validateManualShares()}
                    placeholder="Nabeel share"
                    className={inputBase}
                    style={redStyle}
                  />
                )}

                {isAutoMode && (
                  <div className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900">
                    <span>{String(autoNabeel)}</span>
                  </div>
                )}
              </div>

              {/* Zain */}
              <div>
                <label className="block text-sm font-medium text-slate-700">Zain share</label>

                {isManualMode && (
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={shareZain}
                    onChange={(e) => setShareZain(e.target.value)}
                    onBlur={() => validateManualShares()}
                    placeholder="Zain share"
                    className={inputBase}
                    style={redStyle}
                  />
                )}

                {isAutoMode && (
                  <div className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900">
                    <span>{String(autoZain)}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Error message */}
          {shareError && (
            <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700">
              {shareError}
            </div>
          )}
        </div>
      </form>
    </>
  );
}
