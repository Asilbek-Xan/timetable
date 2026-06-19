import { useState, useEffect, useRef, useCallback } from "react";
import { api } from "./api";
import { MainLayout } from "./layout/MainLayout";
import { AdminPanel } from "./layout/AdminPanel";
import { DeleteModal } from "./components/DeleteModal";
import { TasksPage } from "./pages/TasksPage";

const PAGE_SIZE = 10;

export default function App() {
  // ── State ──────────────────────────────────────────────────────────────────
  const [tasks, setTasks] = useState([]);        // joriy sahifa tasklari
  const [allTasks, setAllTasks] = useState([]);  // statistika uchun (admin panel)
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [toasts, setToasts] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);

  // useRef: toast ID hisoblagich — re-render shart emas
  const toastId = useRef(0);

  // ── Toast ──────────────────────────────────────────────────────────────────
  const toast = useCallback((message, type = "success") => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchTasks = useCallback(
    async (p = 1) => {
      setLoading(true);
      try {
        const res = await api.list(p);
        if (res.success) {
          setTasks(res.data.results);
          setTotal(res.data.count);
          setPage(p);
        }
      } catch {
        toast("Ma'lumot yuklab bo'lmadi", "error");
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  const fetchAllForStats = useCallback(async () => {
    try {
      const r1 = await api.list(1);
      if (!r1.success) return;
      let all = r1.data.results;
      if (r1.data.next) {
        const r2 = await api.list(2);
        if (r2.success) all = [...all, ...r2.data.results];
      }
      setAllTasks(all);
    } catch {}
  }, []);

  useEffect(() => {
    fetchTasks(1);
    fetchAllForStats();
  }, [fetchTasks, fetchAllForStats]);

  // ── Computed ───────────────────────────────────────────────────────────────
  const stats = {
    total,
    done: allTasks.filter((t) => t.completed).length,
    pending: allTasks.filter((t) => !t.completed).length,
  };

  const filtered = tasks.filter((t) => {
    const mF = filter === "all" || (filter === "done" ? t.completed : !t.completed);
    const mS =
      !search ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description?.toLowerCase().includes(search.toLowerCase());
    return mF && mS;
  });

  // ── CRUD ───────────────────────────────────────────────────────────────────
  const handleCreate = async (data) => {
    setSubmitting(true);
    try {
      const res = await api.create(data);
      if (res.success || res.id) {
        toast("Task muvaffaqiyatli qo'shildi! 🎉");
        setShowForm(false);
        fetchTasks(page);
        fetchAllForStats();
      } else {
        toast("Qo'shishda xato yuz berdi", "error");
      }
    } catch {
      toast("Server bilan bog'lanib bo'lmadi", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (data) => {
    if (!editTask) return;
    setSubmitting(true);
    try {
      const res = await api.update(editTask.id, data);
      if (res.id || res.success) {
        toast("Task muvaffaqiyatli yangilandi ✅");
        setEditTask(null);
        fetchTasks(page);
        fetchAllForStats();
      } else {
        toast("Yangilashda xato", "error");
      }
    } catch {
      toast("Server xatosi", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!confirmDelete) return;
    setDeleting(confirmDelete);
    try {
      const res = await api.delete(confirmDelete);
      if (res.success) {
        toast("Task o'chirildi 🗑️", "info");
        setConfirmDelete(null);
        const newTotal = total - 1;
        const maxPage = Math.ceil(newTotal / PAGE_SIZE) || 1;
        fetchTasks(page > maxPage ? maxPage : page);
        fetchAllForStats();
      } else {
        toast("O'chirishda xato", "error");
      }
    } catch {
      toast("Server xatosi", "error");
    } finally {
      setDeleting(null);
    }
  };

  const handleToggle = async (task) => {
    try {
      const res = await api.patch(task.id, { completed: !task.completed });
      if (res.id || res.success) {
        const upd = (t) => (t.id === task.id ? { ...t, completed: !t.completed } : t);
        setTasks((p) => p.map(upd));
        setAllTasks((p) => p.map(upd));
        toast(task.completed ? "Jarayonga qaytarildi 🔄" : "Bajarildi deb belgilandi 🎯");
      }
    } catch {
      toast("Holat o'zgarmadi", "error");
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <MainLayout
        onOpenAdmin={() => {
          setShowAdmin(true);
          toast("Admin panelga xush kelibsiz! 🛡️", "info");
        }}
        toasts={toasts}
        onRemoveToast={removeToast}
      >
        <TasksPage
          tasks={filtered}
          total={total}
          stats={stats}
          loading={loading}
          submitting={submitting}
          deleting={deleting}
          editTask={editTask}
          showForm={showForm}
          filter={filter}
          search={search}
          page={page}
          onToggleForm={() => {
            setShowForm((v) => !v);
            setEditTask(null);
          }}
          onSetFilter={setFilter}
          onSetSearch={setSearch}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onCancelEdit={() => setEditTask(null)}
          onEditTask={(t) => {
            setEditTask(t);
            setShowForm(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onDeleteRequest={(id) => setConfirmDelete(id)}
          onToggle={handleToggle}
          onPageChange={fetchTasks}
        />
      </MainLayout>

      {/* Admin panel — layout darajasidagi overlay */}
      {showAdmin && (
        <AdminPanel stats={stats} allTasks={allTasks} onClose={() => setShowAdmin(false)} />
      )}

      {/* O'chirish modali */}
      {confirmDelete && (
        <DeleteModal
          taskId={confirmDelete}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setConfirmDelete(null)}
          loading={!!deleting}
        />
      )}
    </>
  );
}
