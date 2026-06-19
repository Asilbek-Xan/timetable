import { Icons } from "./Icons";

export function TaskCard({ task, onEdit, onDelete, onToggle, deleting }) {
  return (
    <div
      className={`group relative flex items-start gap-3 p-4 rounded-2xl border transition-all duration-200 ${
        task.completed
          ? "bg-emerald-50/60 border-emerald-100"
          : "bg-white border-slate-100 hover:border-violet-200 hover:shadow-md"
      }`}
    >
      <button
        onClick={() => onToggle(task)}
        className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
          task.completed
            ? "bg-emerald-500 border-emerald-500 text-white"
            : "border-slate-300 hover:border-violet-400"
        }`}
      >
        {task.completed && <Icons.Check />}
      </button>

      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-sm ${task.completed ? "line-through text-slate-400" : "text-slate-800"}`}>
          {task.title}
        </p>
        {task.description && (
          <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{task.description}</p>
        )}
        <p className="text-[10px] text-slate-400 mt-1.5">
          #{task.id} · {new Date(task.created_at).toLocaleDateString("uz-UZ")}
        </p>
      </div>

      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(task)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition"
          title="Tahrirlash"
        >
          <Icons.Edit />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          disabled={deleting === task.id}
          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition disabled:opacity-40"
          title="O'chirish"
        >
          {deleting === task.id ? <Icons.Loader /> : <Icons.Trash />}
        </button>
      </div>
    </div>
  );
}
