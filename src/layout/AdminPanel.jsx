import { Icons } from "../components/Icons";
import { BASE_URL } from "../api";

const PAGE_SIZE = 10;

// Admin panel — o'ng tomondan chiqadigan drawer (layout elementi)
export function AdminPanel({ stats, allTasks, onClose }) {
  const pct = stats.total ? Math.round((stats.done / stats.total) * 100) : 0;
  const recent = [...allTasks].sort((a, b) => b.id - a.id).slice(0, 8);

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 h-full z-50 w-full max-w-md bg-slate-900 text-white shadow-2xl flex flex-col overflow-hidden"
        style={{ animation: "slideInRight 0.3s cubic-bezier(0.16,1,0.3,1)" }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center">
              <Icons.Shield />
            </div>
            <div>
              <p className="font-black text-base">Admin Panel</p>
              <p className="text-[10px] text-slate-400 font-medium">TaskAdmin Dashboard</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition text-slate-400 hover:text-white"
          >
            <Icons.X />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Jami", val: stats.total, emoji: "📋", color: "bg-violet-800/60" },
              { label: "Bajarilgan", val: stats.done, emoji: "✅", color: "bg-emerald-800/60" },
              { label: "Jarayonda", val: stats.pending, emoji: "🕐", color: "bg-amber-800/60" },
            ].map((s) => (
              <div key={s.label} className={`${s.color} rounded-2xl p-3 text-center`}>
                <p className="text-2xl">{s.emoji}</p>
                <p className="text-2xl font-black mt-1">{s.val}</p>
                <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="bg-slate-800 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-slate-300">Umumiy progress</p>
              <span className="text-lg font-black text-violet-400">{pct}%</span>
            </div>
            <div className="h-2.5 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-emerald-400 rounded-full transition-all duration-1000"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">
              {stats.done} ta bajarildi · {stats.pending} ta qoldi
            </p>
          </div>

          {/* Bar chart */}
          <div className="bg-slate-800 rounded-2xl p-4">
            <p className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
              <Icons.BarChart /> Nisbat
            </p>
            <div className="space-y-2.5">
              {[
                { label: "Bajarilgan", val: stats.done, color: "bg-emerald-500" },
                { label: "Jarayonda", val: stats.pending, color: "bg-amber-400" },
              ].map((b) => (
                <div key={b.label}>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>{b.label}</span>
                    <span>{b.val} ta</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${b.color} rounded-full transition-all duration-700`}
                      style={{ width: stats.total ? `${(b.val / stats.total) * 100}%` : "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sahifalar soni */}
          <div className="bg-slate-800 rounded-2xl p-4">
            <p className="text-sm font-semibold text-slate-300 mb-1">Sahifalar</p>
            <p className="text-3xl font-black text-violet-400">
              {Math.ceil(stats.total / PAGE_SIZE) || 0}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">Har sahifada {PAGE_SIZE} ta task</p>
          </div>

          {/* Recent tasks */}
          <div className="bg-slate-800 rounded-2xl p-4">
            <p className="text-sm font-semibold text-slate-300 mb-3">So'nggi tasklar</p>
            <div className="space-y-2">
              {recent.length === 0 && (
                <p className="text-slate-500 text-sm text-center py-4">Task yo'q</p>
              )}
              {recent.map((t) => (
                <div key={t.id} className="flex items-center gap-3 py-2 border-b border-slate-700 last:border-0">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${t.completed ? "bg-emerald-400" : "bg-amber-400"}`} />
                  <span className={`flex-1 text-sm truncate ${t.completed ? "line-through text-slate-500" : "text-slate-200"}`}>
                    {t.title}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${t.completed ? "bg-emerald-900 text-emerald-400" : "bg-amber-900/60 text-amber-400"}`}>
                    {t.completed ? "✓ done" : "pending"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dev note */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 text-xs space-y-1.5">
            <p className="text-slate-300 font-bold text-sm">📚 useRef vs useState</p>
            <p className="text-slate-400">
              <span className="text-violet-400 font-semibold">useRef</span> — re-render qilmaydi. Title input, focus, DOM murojaat uchun.
            </p>
            <p className="text-slate-400">
              <span className="text-emerald-400 font-semibold">useState</span> — har o'zgarishda re-render. Description, toggle, search uchun.
            </p>
            <p className="text-slate-600 pt-1 font-mono break-all">{BASE_URL}/</p>
          </div>
        </div>
      </div>
    </>
  );
}
