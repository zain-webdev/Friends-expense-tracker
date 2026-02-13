import ExpenseHeaderActions from "./ExpenseHeaderActions.jsx";
import ExpenseForm from "./ExpenseForm.jsx";

export default function AddExpenseCard() {
  return (
    <section className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Add a new expense</h2>
          </div>

          <ExpenseHeaderActions />
        </div>

        <ExpenseForm />
      </div>
    </section>
  );
}
