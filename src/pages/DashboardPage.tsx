import { Lock, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnalyticsWidgets } from '../components/AnalyticsWidgets';
import { useComplaints } from '../store/ComplaintContext';

export function DashboardPage() {
  const { t, currentUser } = useComplaints();

  const canViewAnalytics =
    currentUser?.role === 'CMO' || currentUser?.role === 'Mayor';

  if (!canViewAnalytics) {
    return (
      <div className="max-w-xl mx-auto">
        <section className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center space-y-4">
          <div className="mx-auto h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <Lock className="h-6 w-6 text-[#0A2540] dark:text-blue-400" aria-hidden="true" />
          </div>
          <h1 className="text-xl font-bold text-[#0A2540] dark:text-white">
            {t.dashboard.restrictedTitle}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.dashboard.restrictedDesc}
          </p>
          <div className="pt-2">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 rounded bg-[#0A2540] hover:bg-[#13385f] dark:bg-blue-700 dark:hover:bg-blue-600 px-5 py-3 text-sm font-semibold text-white min-h-[44px]"
            >
              <LogIn className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{t.dashboard.restrictedLoginBtn}</span>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return <AnalyticsWidgets showExportHeader />;
}
