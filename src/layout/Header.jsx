import { Icons } from "../components/Icons";

export function Header({ onOpenAdmin }) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-100 shadow-sm">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-violet-600 rounded-lg flex items-center justify-center text-white text-xs font-black">
            ✓
          </div>
          <span className="font-black text-slate-800 text-lg tracking-tight">TaskApp</span>
          <span className="hidden sm:inline text-xs text-slate-400 font-medium ml-1">
            React · CRUD
          </span>
        </div>

        {/* Admin Panel ochish tugmasi */}
        <button
          onClick={onOpenAdmin}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-sm"
        >
          <Icons.Shield />
          Admin Panel
        </button>
      </div>
    </header>
  );
}
