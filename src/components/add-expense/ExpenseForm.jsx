import BasicFields from "./sections/BasicFields.jsx";
import PaidSection from "./sections/PaidSection.jsx";
import ShareSection from "./sections/ShareSection.jsx";

export default function ExpenseForm() {
  return (
    <form id="expenseForm" className="mt-6 space-y-8">
      <BasicFields />
      <PaidSection />
      <ShareSection />
    </form>
  );
}
