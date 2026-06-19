import { Header } from "./Header";
import { Toast } from "../components/Toast";

// MainLayout — har bir sahifani o'rab turadigan umumiy qatlam:
// Header yuqorida, children (sahifa) o'rtada, Toast pastki burchakda
export function MainLayout({ children, onOpenAdmin, toasts, onRemoveToast }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-slate-100 font-sans">
      <Header onOpenAdmin={onOpenAdmin} />

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-5">{children}</main>

      <Toast toasts={toasts} onRemove={onRemoveToast} />
    </div>
  );
}
