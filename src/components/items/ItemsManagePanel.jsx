export default function ItemsManagePanel() {
  return (
    <div className="lg:col-span-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col items-center justify-center min-h-[420px]">
        <div className="text-center max-w-md">
          <h3 className="text-base font-semibold text-slate-900">Manage Items</h3>
          <p className="mt-2 text-sm text-slate-500">
            Add new item to your “Items to buy” list. Item Google Sheet me bhi save hoga.
          </p>

          <button
            id="btnAddItem"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span
              id="addSpinner"
              className="hidden h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin"
            ></span>
            <span id="btnAddItemText">+ Add Item</span>
          </button>
        </div>
      </div>
    </div>
  );
}
