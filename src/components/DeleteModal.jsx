import { Icons } from "./Icons";

export function DeleteModal({ taskId, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4">
        <div className="text-center mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 text-red-500">
            <Icons.Trash />
          </div>
          <h3 className="font-bold text-slate-800 text-lg">O'chirishni tasdiqlang</h3>
          <p className="text-sm text-slate-500 mt-1">
            Task #{taskId} butunlay o'chiriladi. Bu amalni qaytarib bo'lmaydi.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 border border-slate-200 rounded-xl py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
          >
            Bekor
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white rounded-xl py-2.5 text-sm font-semibold flex items-center justify-center gap-2 transition"
          >
            {loading && <Icons.Loader />}
            O'chirish
          </button>
        </div>
      </div>
    </div>
  );
}
