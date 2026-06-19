import { Icons } from "./Icons";

export function Toast({ toasts, onRemove }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl text-sm font-semibold min-w-[240px] max-w-xs
            ${t.type === "success" ? "bg-emerald-500 text-white" : ""}
            ${t.type === "error" ? "bg-red-500 text-white" : ""}
            ${t.type === "info" ? "bg-slate-800 text-white" : ""}
          `}
          style={{ animation: "slideUp 0.25s ease" }}
        >
          <span className="text-base leading-none">
            {t.type === "success" && "✅"}
            {t.type === "error" && "❌"}
            {t.type === "info" && "ℹ️"}
          </span>
          <span className="flex-1">{t.message}</span>
          <button
            onClick={() => onRemove(t.id)}
            className="opacity-70 hover:opacity-100 transition ml-1"
          >
            <Icons.X />
          </button>
        </div>
      ))}
    </div>
  );
}
