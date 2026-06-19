import { useState, useRef, useEffect } from "react";
import { Icons } from "./Icons";

// useRef  → title input (uncontrolled) — re-render qilmaydi
// useState → description, completed (controlled) — re-render qiladi
export function TaskForm({ initial, onSubmit, onCancel, loading }) {
  const titleRef = useRef(null); // useRef: faqat DOM kerak, re-render shart emas
  const [description, setDescription] = useState(initial?.description ?? "");
  const [completed, setCompleted] = useState(initial?.completed ?? false);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.value = initial?.title ?? "";
      titleRef.current.focus();
    }
    setDescription(initial?.description ?? "");
    setCompleted(initial?.completed ?? false);
  }, [initial]);

  const handleSubmit = () => {
    const title = titleRef.current?.value.trim();
    if (!title) {
      titleRef.current?.focus();
      return;
    }
    onSubmit({ title, description: description.trim(), completed });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-800">
          {initial ? "✏️ Tahrirlash" : "➕ Yangi task"}
        </h3>
        {onCancel && (
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 transition">
            <Icons.X />
          </button>
        )}
      </div>

      <div className="space-y-3">
        {/* useRef — uncontrolled input */}
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
            Sarlavha <span className="text-red-400">*</span>
            <span className="bg-violet-100 text-violet-600 px-1.5 py-0.5 rounded text-[9px] font-semibold">
              useRef
            </span>
          </label>
          <input
            ref={titleRef}
            type="text"
            placeholder="Task nomini kiriting..."
            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
          />
        </div>

        {/* useState — controlled textarea */}
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
            Tavsif
            <span className="bg-emerald-100 text-emerald-600 px-1.5 py-0.5 rounded text-[9px] font-semibold">
              useState
            </span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="Qisqacha tavsif..."
            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
          />
        </div>

        <button
          onClick={() => setCompleted((v) => !v)}
          className={`flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-xl border transition ${
            completed
              ? "border-emerald-300 bg-emerald-50 text-emerald-700"
              : "border-slate-200 text-slate-500 hover:border-slate-300"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              completed ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300"
            }`}
          >
            {completed && <Icons.Check />}
          </div>
          {completed ? "Bajarilgan" : "Jarayonda"}
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white rounded-xl py-2 text-sm font-semibold transition"
        >
          {loading ? <Icons.Loader /> : initial ? <Icons.Check /> : <Icons.Plus />}
          {initial ? "Saqlash" : "Qo'shish"}
        </button>
        {onCancel && (
          <button
            onClick={onCancel}
            className="px-4 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition"
          >
            Bekor
          </button>
        )}
      </div>
    </div>
  );
}
