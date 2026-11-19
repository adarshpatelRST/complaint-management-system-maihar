import { MessageSquare } from 'lucide-react';
import { useComplaints } from '../store/ComplaintContext';
import { ComplaintHistoryEntry } from '../types';
import { formatDateTime } from '../utils/complaintHelpers';
import { StatusBadge } from './StatusBadge';

export function Timeline({ entries }: { entries: ComplaintHistoryEntry[] }) {
  const { language, t } = useComplaints();
  // Display newest first or chronological? Chronological vertical timeline is intuitive for civic tracking
  return (
    <ol className="relative border-l border-slate-300 dark:border-slate-700 ml-3 space-y-6">
      {entries.map((entry, idx) => (
        <li key={`${entry.time}-${idx}`} className="pl-6 relative">
          <span
            className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-slate-900 bg-blue-900 dark:bg-blue-400"
            aria-hidden="true"
          />
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={entry.status} />
            <time
              dateTime={entry.time}
              className="text-xs font-medium text-slate-600 dark:text-slate-400 tabular-nums"
            >
              {formatDateTime(entry.time, language)}
            </time>
          </div>
          <p className="mt-2 text-sm text-slate-900 dark:text-slate-100 leading-relaxed">
            {entry.note}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
            <span>{entry.by}</span>
            {entry.smsSent && (
              <span className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-300">
                <MessageSquare className="h-3 w-3 shrink-0" aria-hidden="true" />
                <span>{t.track.smsRecordedBadge}</span>
              </span>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
