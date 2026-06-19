import { useRef } from "react";
import { Icons } from "./Icons";

export function FilterBar({ filter, onChange, search, onSearch }) {
  const searchRef = useRef(null); // useRef: clear bosilganda focus qaytarish uchun

  const tabs = [
    { key: "all", label: "Hammasi" },
    { key: "pending", label: "🕐 Jarayonda" },
    { key: "done", label: "✅ Bajarilgan" },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 text-xs">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`flex-1 px-3 py-1.5 rounded-lg font-semibold transition ${
              filter === key ? "bg-white text-violet-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="relative flex-1">
        <input
          ref={searchRef}
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Qidirish..."
          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm pr-8 focus:outline-none focus:ring-2 focus:ring-violet-300 transition"
        />
        {search && (
          <button
            onClick={() => { onSearch(""); searchRef.current?.focus(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <Icons.X />
          </button>
        )}
      </div>
    </div>
  );
}
