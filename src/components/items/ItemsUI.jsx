import ItemsListPanel from "./ItemsListPanel.jsx";
import ItemsManagePanel from "./ItemsManagePanel.jsx";

export default function ItemsUI() {
  return (
    <div id="itemsWrap" className="hidden">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Items</h2>
          <p className="text-sm text-slate-500">Items to buy list</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <ItemsListPanel />
        <ItemsManagePanel />
      </div>
    </div>
  );
}
