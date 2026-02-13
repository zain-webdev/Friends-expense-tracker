import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Toast from "../ui/Toast.jsx"

export default function PageShell({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <Toast />

      {/* main takes remaining height */}
      <main className="mx-auto max-w-4xl px-4 py-8 flex-1 w-full">
        {children}
      </main>

      <Footer />
    </div>
  );
}
