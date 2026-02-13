import { useEffect, useMemo, useState } from "react";
import Toast from "../ui/Toast.jsx";
import ItemsTable from "./ItemsTable.jsx";
import AddItemModal from "./AddItemModal.jsx";
import DeleteConfirmModal from "./DeleteConfirmModal.jsx";
import { fetchItems, addItem, deleteItem } from "../../lib/itemsApi.js";

function normalizeItemName(s) {
  return String(s || "").trim().toLowerCase();
}

export default function ItemsLayout() {
  // UI state
  const [toast, setToast] = useState({ open: false, message: "", type: "success" });

  const [loading, setLoading] = useState(true); // skeleton
  const [items, setItems] = useState([]); // cache list (duplicate check)

  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [pendingDeleteItem, setPendingDeleteItem] = useState("");

  const count = items.length;

  const leftStatus = useMemo(() => {
    if (!count) return "Empty list";
    return "Click trash to delete";
  }, [count]);

  function showToast(message, type) {
    setToast({ open: true, message: (type === "success" ? "✅ " : "❌ ") + message, type });
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast((t) => ({ ...t, open: false })), 3000);
  }

  function isDuplicateItem(name) {
    const n = normalizeItemName(name);
    if (!n) return false;
    return items.some((x) => normalizeItemName(x) === n);
  }

  async function loadItems() {
    setLoading(true);
    try {
      const list = await fetchItems();
      setItems(list);
    } catch (err) {
      showToast("Items load failed: " + (err?.message || String(err)), "error");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Actions
  function openAddModal() {
    if (isDeleting) return;
    setAddOpen(true);
  }

  function closeAddModal() {
    if (isAdding) return;
    setAddOpen(false);
  }

  function openDeleteModal(name) {
    if (isDeleting) return;
    setPendingDeleteItem(name);
    setDeleteOpen(true);
  }

  function closeDeleteModal() {
    if (isDeleting) return;
    setPendingDeleteItem("");
    setDeleteOpen(false);
  }

  async function onAddSubmit(name) {
    const v = String(name || "").trim();
    if (!v) {
      showToast("Please enter item name.", "error");
      return;
    }

    // ✅ duplicate check same as your JS
    if (isDuplicateItem(v)) {
      showToast("This item already exists in the list.", "error");
      return;
    }

    if (isAdding || isDeleting) return;

    setIsAdding(true);
    try {
      await addItem(v);
      showToast("Item added!", "success");
      setAddOpen(false);
      await loadItems();
    } catch (err) {
      showToast("Add failed: " + (err?.message || String(err)), "error");
    } finally {
      setIsAdding(false);
    }
  }

  async function onDeleteConfirm() {
    const name = String(pendingDeleteItem || "").trim();
    if (!name) return;

    setIsDeleting(true);
    try {
      const res = await deleteItem(name);

      if (res && res.success) {
        showToast("Item deleted!", "success");
        setDeleteOpen(false);
        setPendingDeleteItem("");
        await loadItems();
      } else {
        showToast(res?.message || "Delete failed", "error");
      }
    } catch (err) {
      showToast("Delete failed: " + (err?.message || String(err)), "error");
    } finally {
      setIsDeleting(false);
    }
  }

  // Skeleton UI (same structure)
  const Skeleton = () => (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="h-4 w-32 rounded bg-slate-200 animate-pulse"></div>
          <div className="mt-2 h-3 w-56 rounded bg-slate-100 animate-pulse"></div>
        </div>
        <div className="h-10 w-28 rounded-xl bg-slate-200 animate-pulse"></div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-4">
            <div className="flex items-center justify-between">
              <div className="h-3 w-28 rounded bg-slate-200 animate-pulse"></div>
              <div className="h-6 w-12 rounded-full bg-slate-100 animate-pulse"></div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3 space-y-3">
              <div className="h-9 w-full rounded-xl bg-slate-100 animate-pulse"></div>
              <div className="h-9 w-full rounded-xl bg-slate-100 animate-pulse"></div>
              <div className="h-9 w-full rounded-xl bg-slate-100 animate-pulse"></div>
              <div className="h-9 w-full rounded-xl bg-slate-100 animate-pulse"></div>
              <div className="h-9 w-full rounded-xl bg-slate-100 animate-pulse"></div>
            </div>

            <div className="mt-3 h-3 w-40 rounded bg-slate-100 animate-pulse"></div>
          </div>
        </aside>

        <div className="lg:col-span-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col items-center justify-center min-h-[420px]">
            <div className="text-center max-w-md w-full">
              <div className="mx-auto h-4 w-36 rounded bg-slate-200 animate-pulse"></div>
              <div className="mx-auto mt-3 h-3 w-80 rounded bg-slate-100 animate-pulse"></div>
              <div className="mx-auto mt-2 h-3 w-72 rounded bg-slate-100 animate-pulse"></div>
              <div className="mx-auto mt-6 h-10 w-36 rounded-xl bg-slate-200 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Toast open={toast.open} message={toast.message} type={toast.type} />

      <section className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        <div className="p-6 sm:p-8">
          {loading ? (
            <Skeleton />
          ) : (
            <div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Items</h2>
                  <p className="text-sm text-slate-500">Items to buy list</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* Left table */}
                <aside className="lg:col-span-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-slate-900">Items to buy</h3>
                      <span className="text-xs font-bold text-slate-600 bg-white border border-slate-200 px-2 py-1 rounded-full">
                        {count}
                      </span>
                    </div>

                    <ItemsTable
                      items={items}
                      leftStatus={leftStatus}
                      onDeleteClick={openDeleteModal}
                      isDeleting={isDeleting}
                    />
                  </div>
                </aside>

                {/* Right */}
                <div className="lg:col-span-8">
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col items-center justify-center min-h-[420px]">
                    <div className="text-center max-w-md">
                      <h3 className="text-base font-semibold text-slate-900">Manage Items</h3>
                      <p className="mt-2 text-sm text-slate-500">
                        Add new item to your “Items to buy” list. Item Google Sheet me bhi save hoga.
                      </p>

                      {/* ✅ same behavior: while deleting hide Add button */}
                      {!isDeleting && (
                        <button
                          onClick={openAddModal}
                          disabled={isDeleting}
                          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          <span className="hidden h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin"></span>
                          <span>+ Add Item</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modals */}
              <AddItemModal
                open={addOpen}
                onClose={closeAddModal}
                onSubmit={onAddSubmit}
                isAdding={isAdding}
                isDeleting={isDeleting}
              />

              <DeleteConfirmModal
                open={deleteOpen}
                itemName={pendingDeleteItem}
                onClose={closeDeleteModal}
                onConfirm={onDeleteConfirm}
                isDeleting={isDeleting}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
