import ItemsSkeleton from "./ItemsSkeleton.jsx";
import ItemsUI from "./ItemsUI.jsx";
import AddItemModal from "./modals/AddItemModal.jsx";
import DeleteConfirmModal from "./modals/DeleteConfirmModal.jsx";

export default function ItemsCard() {
  return (
    <>
      <section className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        <div className="p-6 sm:p-8">
          {/* Skeleton (shows first) */}
          <ItemsSkeleton />

          {/* Real UI (hidden until items load) */}
          <ItemsUI />
        </div>
      </section>

      {/* Modals */}
      <AddItemModal />
      <DeleteConfirmModal />
    </>
  );
}
