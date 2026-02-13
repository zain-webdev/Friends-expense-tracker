import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `rounded-xl px-3 py-2 text-sm font-medium transition ${
    isActive ? "text-white bg-white/10" : "text-white/90 hover:text-white hover:bg-white/10"
  }`;

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-lg">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-white/10 ring-1 ring-white/15 text-white grid place-items-center font-bold">
              FE
            </div>
            <div className="text-white">
              <h1 className="text-base sm:text-lg font-semibold leading-tight">
                Friends Expense Tracker
              </h1>
              <p className="text-xs text-white/70 leading-tight"></p>
            </div>
          </div>

          {/* Right */}
          <nav className="flex items-center gap-2">
            <NavLink to="/" className={linkClass}>Add Expense</NavLink>
            <NavLink to="/records" className={linkClass}>Records</NavLink>
            <NavLink to="/report" className={linkClass}>Report</NavLink>
            <NavLink to="/items" className={linkClass}>Items</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
