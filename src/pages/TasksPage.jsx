import { TaskForm } from "../components/TaskForm";
import { TaskCard } from "../components/TaskCard";
import { FilterBar } from "../components/FilterBar";
import { Pagination } from "../components/Pagination";
import { Icons } from "../components/Icons";

// TasksPage — todo ro'yxati sahifasi. Barcha CRUD state'lari va handlerlar
// App.jsx dan prop sifatida keladi (bu sahifa "dumb"/presentational).
export function TasksPage({
  tasks,
  total,
  stats,
  loading,
  submitting,
  deleting,
  editTask,
  showForm,
  filter,
  search,
  page,
  onToggleForm,
  onSetFilter,
  onSetSearch,
  onCreate,
  onUpdate,
  onCancelEdit,
  onEditTask,
  onDeleteRequest,
  onToggle,
  onPageChange,
}) {
  return (
    <>
      {/* Sarlavha + Qo'shish tugmasi */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800 leading-tight">Mening Tasklarim</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {total} ta task · {stats.done} ta bajarilgan
          </p>
        </div>
        <button
          onClick={onToggleForm}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition ${
            showForm
              ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
              : "bg-violet-600 hover:bg-violet-700 text-white"
          }`}
        >
          {showForm ? <Icons.X /> : <Icons.Plus />}
          {showForm ? "Yopish" : "Qo'shish"}
        </button>
      </div>

      {/* Qo'shish formasi */}
      {showForm && !editTask && (
        <TaskForm onSubmit={onCreate} onCancel={onToggleForm} loading={submitting} />
      )}

      {/* Tahrirlash formasi */}
      {editTask && (
        <TaskForm initial={editTask} onSubmit={onUpdate} onCancel={onCancelEdit} loading={submitting} />
      )}

      {/* Filter va qidiruv */}
      <FilterBar filter={filter} onChange={onSetFilter} search={search} onSearch={onSetSearch} />

      {/* Mini progress bar */}
      {total > 0 && (
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-emerald-400 rounded-full transition-all duration-700"
              style={{ width: `${stats.total ? (stats.done / stats.total) * 100 : 0}%` }}
            />
          </div>
          <span className="text-xs font-bold text-slate-500 w-8 text-right">
            {stats.total ? Math.round((stats.done / stats.total) * 100) : 0}%
          </span>
        </div>
      )}

      {/* Task ro'yxati */}
      <div className="space-y-2.5">
        {loading && (
          <div className="flex justify-center py-16 text-violet-400">
            <svg className="w-8 h-8 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          </div>
        )}

        {!loading && tasks.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <p className="text-5xl mb-3">📭</p>
            <p className="font-bold text-slate-500">Task topilmadi</p>
            <p className="text-sm mt-1">Filter yoki qidiruvni o'zgartiring</p>
          </div>
        )}

        {!loading &&
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteRequest}
              onToggle={onToggle}
              deleting={deleting}
            />
          ))}
      </div>

      {/* Sahifalash */}
      {!search && <Pagination page={page} total={total} onPage={onPageChange} />}
    </>
  );
}
