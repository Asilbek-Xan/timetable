import { Icons } from "./Icons";

const PAGE_SIZE = 10;

export function Pagination({ page, total, onPage }) {
  const totalPages = Math.ceil(total / PAGE_SIZE);
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
    .reduce((acc, p, i, arr) => {
      if (i > 0 && p - arr[i - 1] > 1) acc.push("…");
      acc.push(p);
      return acc;
    }, []);

  return (
    <div className="flex items-center justify-between mt-2">
      <span className="text-xs text-slate-400">
        {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} / {total}
      </span>
      <div className="flex gap-1">
        <button
          onClick={() => onPage(page - 1)}
          disabled={page === 1}
          className="p-1.5 rounded-lg border border-slate-200 hover:border-violet-300 disabled:opacity-30 transition"
        >
          <Icons.ChevronLeft />
        </button>

        {pages.map((p, i) =>
          p === "…" ? (
            <span key={i} className="px-1 text-slate-400 text-sm self-center">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onPage(p)}
              className={`w-7 h-7 rounded-lg text-xs font-bold transition ${
                p === page ? "bg-violet-600 text-white" : "border border-slate-200 text-slate-600 hover:border-violet-300"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPage(page + 1)}
          disabled={page === totalPages}
          className="p-1.5 rounded-lg border border-slate-200 hover:border-violet-300 disabled:opacity-30 transition"
        >
          <Icons.ChevronRight />
        </button>
      </div>
    </div>
  );
}
