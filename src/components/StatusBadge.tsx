import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  FileCheck,
  UserCheck,
  Wrench,
} from 'lucide-react';
import { useComplaints } from '../store/ComplaintContext';
import { ComplaintStatus, EscalationLevel } from '../types';

export function StatusBadge({ status }: { status: ComplaintStatus }) {
  const { t } = useComplaints();

  const styles: Record<ComplaintStatus, string> = {
    Registered:
      'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600',
    Assigned:
      'bg-blue-50 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-200 dark:border-blue-800',
    'In progress':
      'bg-amber-50 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-800',
    'Job done':
      'bg-indigo-50 text-indigo-900 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-200 dark:border-indigo-800',
    Resolved:
      'bg-emerald-50 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-800',
    Closed:
      'bg-slate-200 text-slate-900 border-slate-400 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600',
  };

  const Icon =
    status === 'Registered'
      ? Clock
      : status === 'Assigned'
        ? UserCheck
        : status === 'In progress'
          ? Wrench
          : status === 'Job done'
            ? ClipboardCheck
            : status === 'Resolved'
              ? CheckCircle2
              : FileCheck;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${styles[status]}`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>{t.statuses[status]}</span>
    </span>
  );
}

export function OverdueBadge() {
  const { t } = useComplaints();
  return (
    <span className="inline-flex items-center gap-1 rounded border border-red-300 bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-800 dark:border-red-800 dark:bg-red-950/60 dark:text-red-200 whitespace-nowrap">
      <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>{t.track.overdueFlag}</span>
    </span>
  );
}

export function EscalationBadge({ level }: { level: EscalationLevel }) {
  const { t } = useComplaints();
  if (level === 0) return null;

  const levelStyles: Record<1 | 2 | 3, string> = {
    1: 'border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-200',
    2: 'border-orange-300 bg-orange-50 text-orange-900 dark:border-orange-800 dark:bg-orange-950/60 dark:text-orange-200',
    3: 'border-red-400 bg-red-100 text-red-900 dark:border-red-800 dark:bg-red-950/80 dark:text-red-200',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${levelStyles[level]}`}
    >
      <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>{t.escalation[level]}</span>
    </span>
  );
}
