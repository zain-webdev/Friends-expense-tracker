import ItemChips from "../ui/ItemChips.jsx";
import DatePickerInput from "../ui/DatePickerInput.jsx";

export default function BasicFields() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-slate-700">Date</label>

        <DatePickerInput />
      </div>

      <div>
        <label htmlFor="item" className="block text-sm font-medium text-slate-700">
          Item / Description
        </label>

        <input
          type="text"
          id="item"
          placeholder="e.g., Pizza, Grocery, Petrol"
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
          required
        />

        <ItemChips />
      </div>
    </div>
  );
}
