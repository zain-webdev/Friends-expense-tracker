import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageShell from "./components/layout/PageShell.jsx";
import AddExpensePage from "./pages/AddExpensePage.jsx";

// later pages (abhi placeholder)
import RecordsPage from "./pages/RecordsPage.jsx";
import ReportPage from "./pages/ReportPage.jsx";
import ItemsPage from "./pages/ItemsPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <PageShell>
        <Routes>
          <Route path="/" element={<AddExpensePage />} />
          <Route path="/records" element={<RecordsPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/items" element={<ItemsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PageShell>
    </BrowserRouter>
  );
}
