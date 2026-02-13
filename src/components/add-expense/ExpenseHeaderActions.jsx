export default function ExpenseHeaderActions() {
  return (
    <div className="flex items-center gap-2">
      <button
        id="btnClear"
        type="button"
        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 active:scale-[0.99]"
      >
        Clear
      </button>

      <button
        id="btnSave"
        type="submit"
        form="expenseForm"
        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <svg id="saveSpinner" className="hidden h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4"></path>
        </svg>

        <span id="btnSaveText">Save Expense</span>
      </button>
    </div>
  );
}
