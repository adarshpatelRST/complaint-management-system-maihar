import { Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORIES, COMPLAINT_STATUSES, WARDS } from '../constants';
import { useComplaints } from '../store/ComplaintContext';
import {
  exportComplaintsToCsv,
  getEscalationLevel,
  getOverdueHours,
  getResolutionHours,
  getWardName,
  isActiveComplaint,
  isComplaintOverdue,
  wasResolvedWithinSla,
} from '../utils/complaintHelpers';
import { EscalationBadge, StatusBadge } from './StatusBadge';

export function AnalyticsWidgets({
  showExportHeader = true,
  onSelectComplaintId,
}: {
  showExportHeader?: boolean;
  onSelectComplaintId?: (id: string) => void;
}) {
  const { complaints, t, language } = useComplaints();

  const total = complaints.length;
  const pending = complaints.filter((c) => isActiveComplaint(c)).length;
  const overdueList = complaints
    .filter((c) => isComplaintOverdue(c))
    .sort((a, b) => getOverdueHours(b) - getOverdueHours(a));
  const overdueCount = overdueList.length;

  const resolvedOrClosed = complaints.filter(
    (c) => c.status === 'Resolved' || c.status === 'Closed'
  );
  const withinSlaCount = resolvedOrClosed.filter((c) => wasResolvedWithinSla(c) === true).length;
  const resolvedWithinSlaPct =
    resolvedOrClosed.length > 0
      ? Math.round((withinSlaCount / resolvedOrClosed.length) * 100)
      : null;

  const ratedComplaints = complaints.filter((c) => typeof c.rating === 'number' && c.rating > 0);
  const avgRating =
    ratedComplaints.length > 0
      ? (
          ratedComplaints.reduce((sum, c) => sum + (c.rating || 0), 0) / ratedComplaints.length
        ).toFixed(1)
      : null;

  const resolutionHoursList = complaints
    .map((c) => getResolutionHours(c))
    .filter((h): h is number => h !== null);
  const avgResolutionHours =
    resolutionHoursList.length > 0
      ? (
          resolutionHoursList.reduce((sum, h) => sum + h, 0) / resolutionHoursList.length
        ).toFixed(1)
      : null;

  const categoryCounts = CATEGORIES.map((cat) => {
    const count = complaints.filter((c) => c.category === cat.key).length;
    return {
      key: cat.key,
      label: t.categories[cat.key],
      count,
    };
  });
  const maxCategoryCount = Math.max(1, ...categoryCounts.map((c) => c.count));

  const statusBreakdown = COMPLAINT_STATUSES.map((status) => {
    const count = complaints.filter((c) => c.status === status).length;
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
    return { status, count, pct };
  });

  const top5Overdue = overdueList.slice(0, 5);

  const wardStats = WARDS.map((ward) => {
    const wardComplaints = complaints.filter((c) => c.ward === ward.id);
    const wardPending = wardComplaints.filter((c) => isActiveComplaint(c)).length;
    const wardOverdue = wardComplaints.filter((c) => isComplaintOverdue(c)).length;
    const wardResolved = wardComplaints.filter(
      (c) => c.status === 'Resolved' || c.status === 'Closed'
    ).length;
    return {
      id: ward.id,
      name: language === 'hi' ? ward.nameHi : ward.nameEn,
      total: wardComplaints.length,
      pending: wardPending,
      overdue: wardOverdue,
      resolvedClosed: wardResolved,
    };
  });

  return (
    <div className="space-y-6">
      {showExportHeader && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#0A2540] dark:text-white">
              {t.dashboard.pageTitle}
            </h2>
            <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
              {t.dashboard.pageSubtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => exportComplaintsToCsv(complaints, language)}
            className="inline-flex items-center justify-center gap-2 rounded bg-[#0A2540] hover:bg-[#13385f] dark:bg-blue-700 dark:hover:bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white min-h-[44px] whitespace-nowrap cursor-pointer self-start sm:self-auto"
          >
            <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{t.dashboard.exportCsvBtn}</span>
          </button>
        </div>
      )}

      {/* 6 KPI Cards */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <div className="text-xs font-medium text-slate-600 dark:text-slate-400">
            {t.dashboard.kpis.total}
          </div>
          <div className="mt-1.5 text-2xl font-bold text-[#0A2540] dark:text-white tabular-nums">
            {total}
          </div>
        </div>

        <div className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <div className="text-xs font-medium text-slate-600 dark:text-slate-400">
            {t.dashboard.kpis.pending}
          </div>
          <div className="mt-1.5 text-2xl font-bold text-amber-700 dark:text-amber-400 tabular-nums">
            {pending}
          </div>
        </div>

        <div className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <div className="text-xs font-medium text-slate-600 dark:text-slate-400">
            {t.dashboard.kpis.overdue}
          </div>
          <div className="mt-1.5 text-2xl font-bold text-red-700 dark:text-red-400 tabular-nums">
            {overdueCount}
          </div>
        </div>

        <div className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <div className="text-xs font-medium text-slate-600 dark:text-slate-400">
            {t.dashboard.kpis.resolvedWithinSla}
          </div>
          <div className="mt-1.5 text-2xl font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">
            {resolvedWithinSlaPct !== null ? `${resolvedWithinSlaPct}%` : t.dashboard.kpis.noData}
          </div>
        </div>

        <div className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <div className="text-xs font-medium text-slate-600 dark:text-slate-400">
            {t.dashboard.kpis.avgRating}
          </div>
          <div className="mt-1.5 text-2xl font-bold text-[#0A2540] dark:text-blue-300 tabular-nums">
            {avgRating !== null ? `${avgRating} ${t.dashboard.kpis.outOfFive}` : t.dashboard.kpis.noData}
          </div>
        </div>

        <div className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <div className="text-xs font-medium text-slate-600 dark:text-slate-400">
            {t.dashboard.kpis.avgResolutionTime}
          </div>
          <div className="mt-1.5 text-2xl font-bold text-[#0A2540] dark:text-white tabular-nums">
            {avgResolutionHours !== null
              ? `${avgResolutionHours} ${t.dashboard.kpis.hoursUnit}`
              : t.dashboard.kpis.noData}
          </div>
        </div>
      </section>

      {/* Category Bar Chart & Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-7 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
          <h3 className="text-base font-bold text-[#0A2540] dark:text-white">
            {t.dashboard.categoryChartTitle}
          </h3>
          <div className="space-y-3">
            {categoryCounts.map((item) => {
              const widthPct = Math.round((item.count / maxCategoryCount) * 100);
              return (
                <div key={item.key} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-slate-800 dark:text-slate-200">{item.label}</span>
                    <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                      {item.count}
                    </span>
                  </div>
                  <div className="h-3 w-full rounded bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-[#0A2540] dark:bg-blue-600"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="lg:col-span-5 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
          <h3 className="text-base font-bold text-[#0A2540] dark:text-white">
            {t.dashboard.statusBreakdownTitle}
          </h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {statusBreakdown.map((row) => (
              <div key={row.status} className="py-2.5 flex items-center justify-between gap-3">
                <StatusBadge status={row.status} />
                <div className="text-sm font-bold text-slate-900 dark:text-white tabular-nums">
                  {row.count}{' '}
                  <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                    ({row.pct}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Top 5 Most Overdue Complaints */}
      <section className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
        <h3 className="text-base font-bold text-[#0A2540] dark:text-white">
          {t.dashboard.topOverdueTitle}
        </h3>

        {top5Overdue.length === 0 ? (
          <div className="rounded border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 p-4 text-sm">
            <div className="font-semibold text-emerald-900 dark:text-emerald-200">
              {t.dashboard.noOverdueTitle}
            </div>
            <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-0.5">
              {t.dashboard.noOverdueDesc}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {top5Overdue.map((c) => {
              const overdueHrs = getOverdueHours(c);
              const esc = getEscalationLevel(c);
              return (
                <div
                  key={c.id}
                  className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-sm text-[#0A2540] dark:text-blue-300 tabular-nums">
                        {c.id}
                      </span>
                      <StatusBadge status={c.status} />
                      <EscalationBadge level={esc} />
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-300">
                      {t.categories[c.category]} · {getWardName(c.ward, language)} · {c.locationText}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-bold text-red-700 dark:text-red-400 tabular-nums">
                      +{overdueHrs} {t.dashboard.overdueByHours}
                    </span>
                    {onSelectComplaintId ? (
                      <button
                        type="button"
                        onClick={() => onSelectComplaintId(c.id)}
                        className="rounded border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-xs font-semibold text-[#0A2540] dark:text-blue-300 hover:bg-slate-100 dark:hover:bg-slate-800 whitespace-nowrap cursor-pointer"
                      >
                        {t.common.viewDetails}
                      </button>
                    ) : (
                      <Link
                        to={`/officer?id=${encodeURIComponent(c.id)}`}
                        className="rounded border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-xs font-semibold text-[#0A2540] dark:text-blue-300 hover:bg-slate-100 dark:hover:bg-slate-800 whitespace-nowrap"
                      >
                        {t.dashboard.viewInOfficer}
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Ward-Wise Count Table */}
      <section className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
        <h3 className="text-base font-bold text-[#0A2540] dark:text-white">
          {t.dashboard.wardTableTitle}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400">
                <th className="py-2.5 pr-4">{t.dashboard.wardTableCols.ward}</th>
                <th className="py-2.5 px-3 text-right">{t.dashboard.wardTableCols.total}</th>
                <th className="py-2.5 px-3 text-right">{t.dashboard.wardTableCols.pending}</th>
                <th className="py-2.5 px-3 text-right">{t.dashboard.wardTableCols.overdue}</th>
                <th className="py-2.5 pl-3 text-right">
                  {t.dashboard.wardTableCols.resolvedClosed}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {wardStats.map((w) => (
                <tr key={w.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-2.5 pr-4 font-medium text-slate-900 dark:text-slate-100">
                    {w.name}
                  </td>
                  <td className="py-2.5 px-3 text-right font-semibold tabular-nums text-slate-900 dark:text-white">
                    {w.total}
                  </td>
                  <td className="py-2.5 px-3 text-right tabular-nums text-amber-700 dark:text-amber-400">
                    {w.pending}
                  </td>
                  <td
                    className={`py-2.5 px-3 text-right tabular-nums ${
                      w.overdue > 0
                        ? 'font-bold text-red-700 dark:text-red-400'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {w.overdue}
                  </td>
                  <td className="py-2.5 pl-3 text-right tabular-nums text-emerald-700 dark:text-emerald-400">
                    {w.resolvedClosed}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
