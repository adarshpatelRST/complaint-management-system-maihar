import React, { useEffect, useState } from 'react';
import { CheckCircle2, MapPin, RotateCcw, Search, Star } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { OverdueBadge, StatusBadge } from '../components/StatusBadge';
import { Timeline } from '../components/Timeline';
import { useComplaints } from '../store/ComplaintContext';
import { Complaint } from '../types';
import {
  formatDateTime,
  getCategoryConfig,
  getDueDate,
  getStaffDisplayName,
  getWardName,
  isComplaintOverdue,
} from '../utils/complaintHelpers';

export function TrackComplaintPage() {
  const { complaints, t, language, submitCitizenFeedback } = useComplaints();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get('id') || '';
  const [queryInput, setQueryInput] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);
  const [searchError, setSearchError] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [rating, setRating] = useState<number>(0);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackError, setFeedbackError] = useState('');

  useEffect(() => {
    const paramId = searchParams.get('id') || '';
    if (paramId && paramId !== activeQuery) {
      setQueryInput(paramId);
      setActiveQuery(paramId);
      setSelectedId(null);
      setSearchError('');
    }
  }, [searchParams, activeQuery]);

  const normalizedQuery = activeQuery.trim().toLowerCase();
  const matches: Complaint[] = normalizedQuery
    ? complaints.filter(
        (c) =>
          c.id.toLowerCase() === normalizedQuery ||
          c.mobile.toLowerCase() === normalizedQuery
      )
    : [];

  const activeComplaint: Complaint | undefined =
    matches.length === 1
      ? matches[0]
      : matches.find((m) => m.id === selectedId);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = queryInput.trim();
    if (!trimmed) {
      setSearchError(t.track.searchErrorEmpty);
      return;
    }
    setSearchError('');
    setSelectedId(null);
    setActiveQuery(trimmed);
    setSearchParams({ id: trimmed });
    setRating(0);
    setFeedbackComment('');
    setFeedbackError('');
  };

  const handleQuickSelect = (sampleId: string) => {
    setQueryInput(sampleId);
    setActiveQuery(sampleId);
    setSelectedId(null);
    setSearchError('');
    setSearchParams({ id: sampleId });
    setRating(0);
    setFeedbackComment('');
    setFeedbackError('');
  };

  const handleCloseSatisfied = () => {
    if (!activeComplaint) return;
    if (rating < 1 || rating > 5) {
      setFeedbackError(t.track.ratingRequiredError);
      return;
    }
    setFeedbackError('');
    submitCitizenFeedback({
      id: activeComplaint.id,
      rating,
      action: 'close',
      comment: feedbackComment,
    });
    setRating(0);
    setFeedbackComment('');
  };

  const handleReopen = () => {
    if (!activeComplaint) return;
    if (!feedbackComment.trim()) {
      setFeedbackError(t.track.reopenNoteRequired);
      return;
    }
    setFeedbackError('');
    submitCitizenFeedback({
      id: activeComplaint.id,
      rating: rating > 0 ? rating : undefined,
      action: 'reopen',
      comment: feedbackComment,
    });
    setRating(0);
    setFeedbackComment('');
  };

  const latestResolutionEntry = activeComplaint
    ? [...activeComplaint.history].reverse().find((h) => h.status === 'Resolved')
    : undefined;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0A2540] dark:text-white">{t.track.pageTitle}</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{t.track.pageSubtitle}</p>
      </div>

      {/* Search Card */}
      <section className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
        <form onSubmit={handleSearch} className="space-y-2" noValidate>
          <label
            htmlFor="track-search-input"
            className="block text-sm font-semibold text-slate-800 dark:text-slate-200"
          >
            {t.track.searchLabel}
          </label>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <input
              id="track-search-input"
              type="text"
              value={queryInput}
              onChange={(e) => {
                setQueryInput(e.target.value);
                if (searchError) setSearchError('');
              }}
              placeholder={t.track.searchPlaceholder}
              className="flex-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-base text-slate-900 dark:text-white min-h-[44px]"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded bg-[#0A2540] hover:bg-[#13385f] dark:bg-blue-700 dark:hover:bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white min-h-[44px] whitespace-nowrap cursor-pointer"
            >
              <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{t.track.searchBtn}</span>
            </button>
          </div>
          {searchError && (
            <p role="alert" className="text-xs font-medium text-red-700 dark:text-red-400">
              {searchError}
            </p>
          )}
        </form>

        <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-600 dark:text-slate-400 font-medium">
            {t.track.quickSamplesLabel}
          </span>
          {['MHR-2026-0001', 'MHR-2026-0008', 'MHR-2026-0004', 'MHR-2026-0006', '9800000001'].map(
            (sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => handleQuickSelect(sample)}
                className="rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 px-2.5 py-1 font-medium text-[#0A2540] dark:text-blue-300 tabular-nums cursor-pointer min-h-[32px]"
              >
                {sample}
              </button>
            )
          )}
        </div>
      </section>

      {!normalizedQuery && (
        <section className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            {t.track.emptyPromptTitle}
          </h2>
          <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            {t.track.emptyPromptDesc}
          </p>
        </section>
      )}

      {normalizedQuery && matches.length === 0 && (
        <section className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {t.track.notFoundTitle}
            </h2>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              {t.track.notFoundDesc}
            </p>
          </div>
          <Link
            to="/lodge"
            className="inline-flex items-center justify-center rounded bg-[#0A2540] hover:bg-[#13385f] dark:bg-blue-700 dark:hover:bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white min-h-[44px]"
          >
            {t.track.lodgeNewBtn}
          </Link>
        </section>
      )}

      {matches.length > 1 && (
        <section className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {t.track.multipleFoundTitle} ({matches.length})
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">{t.track.selectToView}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {matches.map((item) => {
              const isSelected = activeComplaint?.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={`text-left rounded border p-3.5 cursor-pointer ${
                    isSelected
                      ? 'border-[#0A2540] bg-blue-50/50 dark:border-blue-400 dark:bg-blue-950/30'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-sm text-[#0A2540] dark:text-blue-300 tabular-nums">
                      {item.id}
                    </span>
                    <StatusBadge status={item.status} />
                  </div>
                  <div className="mt-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    {t.categories[item.category]} · {getWardName(item.ward, language)}
                  </div>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                    {item.description}
                  </p>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {activeComplaint && (
        <div className="space-y-6">
          <section className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {t.track.detailsTitle}
                </div>
                <h2 className="mt-0.5 text-xl font-bold text-[#0A2540] dark:text-white tabular-nums">
                  {activeComplaint.id}
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={activeComplaint.status} />
                {isComplaintOverdue(activeComplaint) && <OverdueBadge />}
              </div>
            </div>

            {activeComplaint.status === 'Job done' && (
              <div className="rounded border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 px-4 py-3 text-xs font-medium text-indigo-900 dark:text-indigo-200">
                {t.track.jobDoneCitizenNotice}
              </div>
            )}

            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div>
                <dt className="text-xs text-slate-500 dark:text-slate-400">
                  {t.track.citizenLabel}
                </dt>
                <dd className="mt-0.5 font-semibold text-slate-900 dark:text-white">
                  {activeComplaint.name}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500 dark:text-slate-400">
                  {t.track.categoryLabel}
                </dt>
                <dd className="mt-0.5 font-semibold text-slate-900 dark:text-white">
                  {t.categories[activeComplaint.category]} (
                  {getCategoryConfig(activeComplaint.category).slaHours} {t.common.hours})
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500 dark:text-slate-400">
                  {t.track.wardLabel}
                </dt>
                <dd className="mt-0.5 font-semibold text-slate-900 dark:text-white">
                  {getWardName(activeComplaint.ward, language)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500 dark:text-slate-400">
                  {t.track.filedOn}
                </dt>
                <dd className="mt-0.5 font-medium text-slate-900 dark:text-white tabular-nums">
                  {formatDateTime(activeComplaint.createdAt, language)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500 dark:text-slate-400">
                  {t.track.dueDate}
                </dt>
                <dd
                  className={`mt-0.5 font-semibold tabular-nums ${
                    isComplaintOverdue(activeComplaint)
                      ? 'text-red-700 dark:text-red-400'
                      : 'text-slate-900 dark:text-white'
                  }`}
                >
                  {formatDateTime(getDueDate(activeComplaint).toISOString(), language)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500 dark:text-slate-400">
                  {t.track.departmentOfficerLabel}
                </dt>
                <dd className="mt-0.5 font-semibold text-slate-900 dark:text-white">
                  {getStaffDisplayName(
                    activeComplaint.departmentOfficerId ||
                      getCategoryConfig(activeComplaint.category).departmentOfficerId,
                    language
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500 dark:text-slate-400">
                  {t.track.assignedStaff}
                </dt>
                <dd className="mt-0.5 font-semibold text-slate-900 dark:text-white">
                  {getStaffDisplayName(activeComplaint.assignedTo, language) || t.track.unassigned}
                </dd>
              </div>
            </dl>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3 text-sm">
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {t.track.locationLabel}
                </div>
                <div className="mt-0.5 font-medium text-slate-900 dark:text-white">
                  {activeComplaint.locationText}
                </div>
                {activeComplaint.lat !== undefined && activeComplaint.lng !== undefined && (
                  <div className="mt-1 inline-flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 tabular-nums">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>
                      {t.track.gpsLabel}: {activeComplaint.lat}, {activeComplaint.lng}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {t.track.descriptionLabel}
                </div>
                <p className="mt-0.5 text-slate-800 dark:text-slate-200 leading-relaxed">
                  {activeComplaint.description}
                </p>
              </div>

              {activeComplaint.photo && (
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                    {t.track.beforePhotoLabel}
                  </div>
                  <img
                    src={activeComplaint.photo}
                    alt={t.track.beforePhotoLabel}
                    className="max-h-64 rounded border border-slate-200 dark:border-slate-700 object-contain"
                  />
                </div>
              )}
            </div>
          </section>

          {/* Resolved -> Officer verified After Photo + Citizen Feedback Section */}
          {activeComplaint.status === 'Resolved' && (
            <section className="rounded border border-emerald-300 dark:border-emerald-800 bg-white dark:bg-slate-900 p-6 space-y-5">
              <h3 className="text-lg font-bold text-[#0A2540] dark:text-white">
                {t.track.feedbackSectionTitle}
              </h3>

              {latestResolutionEntry && (
                <div className="rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4 text-sm">
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    {t.track.resolutionSummaryLabel}
                  </div>
                  <p className="mt-1 text-slate-900 dark:text-slate-100">
                    {latestResolutionEntry.note}
                  </p>
                </div>
              )}

              {activeComplaint.afterPhoto && (
                <div>
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                    {t.track.afterPhotoLabel}
                  </div>
                  <img
                    src={activeComplaint.afterPhoto}
                    alt={t.track.afterPhotoLabel}
                    className="max-h-64 rounded border border-slate-200 dark:border-slate-700 object-contain"
                  />
                </div>
              )}

              <div>
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  {t.track.rateLabel}
                </div>
                <div className="flex flex-wrap gap-2" role="group" aria-label={t.track.rateLabel}>
                  {[1, 2, 3, 4, 5].map((num) => {
                    const selected = rating === num;
                    return (
                      <button
                        key={num}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => {
                          setRating(num);
                          if (feedbackError) setFeedbackError('');
                        }}
                        className={`inline-flex items-center gap-1.5 rounded border px-4 py-2.5 text-sm font-bold min-h-[44px] min-w-[56px] justify-center cursor-pointer tabular-nums ${
                          selected
                            ? 'border-[#0A2540] bg-[#0A2540] text-white dark:border-blue-500 dark:bg-blue-700'
                            : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        <Star
                          className={`h-4 w-4 ${selected ? 'fill-current' : ''}`}
                          aria-hidden="true"
                        />
                        <span>{num}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label
                  htmlFor="citizen-feedback-comment"
                  className="block text-sm font-semibold text-slate-800 dark:text-slate-200"
                >
                  {t.track.feedbackCommentLabel}
                </label>
                <textarea
                  id="citizen-feedback-comment"
                  rows={3}
                  value={feedbackComment}
                  onChange={(e) => {
                    setFeedbackComment(e.target.value);
                    if (feedbackError) setFeedbackError('');
                  }}
                  placeholder={t.track.feedbackCommentPlaceholder}
                  className="mt-1.5 w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white"
                />
              </div>

              {feedbackError && (
                <div
                  role="alert"
                  className="rounded border border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/60 px-3.5 py-2.5 text-sm font-medium text-red-800 dark:text-red-200"
                >
                  {feedbackError}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleCloseSatisfied}
                  className="inline-flex items-center justify-center gap-2 rounded bg-emerald-700 hover:bg-emerald-800 px-5 py-3 text-sm font-semibold text-white min-h-[44px] cursor-pointer"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{t.track.satisfiedCloseBtn}</span>
                </button>
                <button
                  type="button"
                  onClick={handleReopen}
                  className="inline-flex items-center justify-center gap-2 rounded border border-red-400 dark:border-red-700 bg-white dark:bg-slate-900 hover:bg-red-50 dark:hover:bg-red-950/40 px-5 py-3 text-sm font-semibold text-red-800 dark:text-red-300 min-h-[44px] cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{t.track.reopenBtn}</span>
                </button>
              </div>
            </section>
          )}

          {activeComplaint.status === 'Closed' && (
            <section className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t.track.closedFeedbackTitle}
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="text-slate-600 dark:text-slate-400">
                  {t.track.yourRatingLabel}
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-[#0A2540] dark:text-blue-300 tabular-nums">
                  <Star className="h-4 w-4 fill-current text-amber-500" aria-hidden="true" />
                  <span>{activeComplaint.rating ?? '-'} / 5</span>
                </span>
              </div>
              {activeComplaint.citizenFeedback && (
                <p className="text-sm text-slate-800 dark:text-slate-200">
                  {activeComplaint.citizenFeedback}
                </p>
              )}
              {activeComplaint.afterPhoto && (
                <div>
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                    {t.track.afterPhotoLabel}
                  </div>
                  <img
                    src={activeComplaint.afterPhoto}
                    alt={t.track.afterPhotoLabel}
                    className="max-h-56 rounded border border-slate-200 dark:border-slate-700 object-contain"
                  />
                </div>
              )}
            </section>
          )}

          <section className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {t.track.timelineTitle}
            </h3>
            <Timeline entries={activeComplaint.history} />
          </section>
        </div>
      )}
    </div>
  );
}
