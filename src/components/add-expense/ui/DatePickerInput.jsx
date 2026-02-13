import { useEffect, useRef } from "react";
import flatpickr from "flatpickr";

export default function DatePickerInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!inputRef.current) return;

    const fp = flatpickr(inputRef.current, {
      dateFormat: "Y-m-d",
      defaultDate: new Date(),
      allowInput: true,
    });

    return () => fp.destroy();
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      id="date"
      placeholder="Select date"
      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
      required
    />
  );
}
