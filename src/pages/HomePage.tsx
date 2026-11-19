import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Clock,
  FilePlus2,
  LogIn,
  Search,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useComplaints } from '../store/ComplaintContext';
import { isActiveComplaint } from '../utils/complaintHelpers';

export function HomePage() {
  const { complaints, t } = useComplaints();

  const totalCount = complaints.length;
  const pendingCount = complaints.filter((c) => isActiveComplaint(c)).length;
  const resolvedCount = complaints.filter(
    (c) => c.status === 'Resolved' || c.status === 'Closed'
  ).length;

  const sampleLinks = [
    { id: 'MHR-2026-0001', label: t.home.sampleOverdueLabel },
    { id: 'MHR-2026-0008', label: t.home.sampleJobDoneLabel },
    { id: 'MHR-2026-0004', label: t.home.sampleAwaitingFeedbackLabel },
    { id: 'MHR-2026-0006', label: t.home.sampleClosedLabel },
  ];

  return (
    <div className="space-y-8">
      {/* Hero / Primary Action Card */}
      <section className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8">
        <div className="max-w-3xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0A2540] dark:text-white tracking-tight">
            {t.home.headline}
          </h1>
          <p className="mt-3 text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            {t.home.description}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link
              to="/lodge"
              className="inline-flex items-center justify-center gap-2.5 rounded bg-[#0A2540] hover:bg-[#13385f] dark:bg-blue-700 dark:hover:bg-blue-600 px-6 py-3.5 text-base font-semibold text-white min-h-[52px]"
            >
              <FilePlus2 className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>{t.home.lodgeBtn}</span>
            </Link>

            <Link
              to="/track"
              className="inline-flex items-center justify-center gap-2.5 rounded border-2 border-[#0A2540] dark:border-blue-400 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 px-6 py-3.5 text-base font-semibold text-[#0A2540] dark:text-blue-300 min-h-[52px]"
            >
              <Search className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>{t.home.trackBtn}</span>
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 px-5 py-3.5 text-sm font-semibold text-slate-800 dark:text-slate-200 min-h-[52px]"
            >
              <LogIn className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{t.home.officialLoginBtn}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Live Counters */}
      <section aria-labelledby="live-stats-heading">
        <h2
          id="live-stats-heading"
          className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3"
        >
          {t.home.statsTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {t.home.totalComplaints}
              </div>
              <div className="mt-1 text-3xl font-bold text-[#0A2540] dark:text-white tabular-nums">
                {totalCount}
              </div>
            </div>
            <ClipboardList
              className="h-8 w-8 text-slate-400 dark:text-slate-600 shrink-0"
              aria-hidden="true"
            />
          </div>

          <div className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {t.home.pendingComplaints}
              </div>
              <div className="mt-1 text-3xl font-bold text-amber-700 dark:text-amber-400 tabular-nums">
                {pendingCount}
              </div>
            </div>
            <Clock
              className="h-8 w-8 text-amber-500/70 dark:text-amber-500/50 shrink-0"
              aria-hidden="true"
            />
          </div>

          <div className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {t.home.resolvedComplaints}
              </div>
              <div className="mt-1 text-3xl font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">
                {resolvedCount}
              </div>
            </div>
            <CheckCircle2
              className="h-8 w-8 text-emerald-600/70 dark:text-emerald-500/50 shrink-0"
              aria-hidden="true"
            />
          </div>
        </div>
      </section>

      {/* How It Works Strip */}
      <section
        aria-labelledby="how-it-works-heading"
        className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
      >
        <h2
          id="how-it-works-heading"
          className="text-lg font-bold text-[#0A2540] dark:text-white mb-4"
        >
          {t.home.howItWorksTitle}
        </h2>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {t.home.steps.map((step, index) => (
            <li
              key={index}
              className="rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4 flex flex-col justify-between"
            >
              <div>
                <div className="text-sm font-bold text-[#0A2540] dark:text-blue-300">
                  {step.title}
                </div>
                <p className="mt-1.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Quick Demo Sample Shortcuts */}
      <section className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
          {t.home.sampleTryTitle}
        </h2>
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
          {t.home.sampleTryDesc}
        </p>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {sampleLinks.map((sample) => (
            <Link
              key={sample.id}
              to={`/track?id=${encodeURIComponent(sample.id)}`}
              className="inline-flex items-center gap-2 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 px-3.5 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 min-h-[40px]"
            >
              <span className="font-bold text-[#0A2540] dark:text-blue-300 tabular-nums">
                {sample.id}
              </span>
              <span className="text-slate-600 dark:text-slate-400">· {sample.label}</span>
              <ArrowRight className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
