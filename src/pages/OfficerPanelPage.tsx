import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  LogOut,
  MapPin,
  RotateCcw,
  Search,
  Trash2,
  Upload,
  UserCheck,
  UserCog,
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { EscalationBadge, OverdueBadge, StatusBadge } from '../components/StatusBadge';
import { Timeline } from '../components/Timeline';
import { CATEGORIES, COMPLAINT_STATUSES, STAFF_LIST, WARDS } from '../constants';
import { useComplaints } from '../store/ComplaintContext';
import { CategoryKey, ComplaintStatus } from '../types';
import {
  formatDateTime,
  getCategoryConfig,
  getDueDate,
  getEscalationLevel,
  getSlaElapsedPercent,
  getStaffDisplayName,
  getWardName,
  isActiveComplaint,
  isComplaintOverdue,
  processImageUpload,
} from '../utils/complaintHelpers';
import { LoginPage } from './LoginPage';

export function OfficerPanelPage() {
  const {
    complaints,
    t,
    language,
    currentUser,
    logoutStaff,
    assignComplaintByOfficer,
    acceptRequestByFieldStaff,
    submitJobDoneByFieldStaff,
    verifyJobByOfficer,
  } = useComplaints();

  const [searchParams, setSearchParams] = useSearchParams();
  const initialSelected = searchParams.get('id');

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ComplaintStatus | ''>('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryKey | ''>('');
  const [wardFilter, setWardFilter] = useState('');
  const [overdueOnly, setOverdueOnly] = useState(false);

  const [selectedId, setSelectedId] = useState<string | null>(initialSelected);

  const [assignTo, setAssignTo] = useState('');
  const [actionRemark, setActionRemark] = useState('');
  const [afterPhoto, setAfterPhoto] = useState<string | undefined>(undefined);
  const [formError, setFormError] = useState('');

  const fieldStaffMembers = useMemo(
    () => STAFF_LIST.filter((s) => s.role === 'Field Staff'),
    []
  );

  // Scope complaints strictly by logged-in official's hierarchy role
  const roleScopedComplaints = useMemo(() => {
    if (!currentUser) return [];
    if (currentUser.role === 'Field Staff') {
      return complaints.filter((c) => c.assignedTo === currentUser.id);
    }
    if (currentUser.role === 'Department Officer') {
      return complaints.filter((c) => {
        const routedOfficerId =
          c.departmentOfficerId || getCategoryConfig(c.category).departmentOfficerId;
        return routedOfficerId === currentUser.id;
      });
    }
    // CMO and Mayor see all municipal complaints
    return complaints;
  }, [complaints, currentUser]);

  const filteredComplaints = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return roleScopedComplaints.filter((c) => {
      if (statusFilter && c.status !== statusFilter) return false;
      if (categoryFilter && c.category !== categoryFilter) return false;
      if (wardFilter && c.ward !== wardFilter) return false;
      if (overdueOnly && !isComplaintOverdue(c)) return false;
      if (q) {
        const matchesQuery =
          c.id.toLowerCase().includes(q) ||
          c.name.toLowerCase().includes(q) ||
          c.locationText.toLowerCase().includes(q) ||
          c.mobile.includes(q);
        if (!matchesQuery) return false;
      }
      return true;
    });
  }, [
    roleScopedComplaints,
    statusFilter,
    categoryFilter,
    wardFilter,
    overdueOnly,
    searchTerm,
  ]);

  const selectedComplaint = useMemo(
    () => filteredComplaints.find((c) => c.id === selectedId) || null,
    [filteredComplaints, selectedId]
  );

  useEffect(() => {
    const paramId = searchParams.get('id');
    if (paramId && paramId !== selectedId) {
      setSelectedId(paramId);
    }
  }, [searchParams, selectedId]);

  useEffect(() => {
    if (!selectedComplaint) return;
    const suggestedFieldStaff = fieldStaffMembers.find((fs) =>
      fs.categories?.includes(selectedComplaint.category)
    );
    setAssignTo(selectedComplaint.assignedTo || suggestedFieldStaff?.id || '');
    setActionRemark('');
    setAfterPhoto(undefined);
    setFormError('');
  }, [selectedComplaint, fieldStaffMembers]);

  if (!currentUser) {
    return <LoginPage redirectTo="/officer" />;
  }

  const actorLabel = language === 'hi' ? currentUser.nameHi : currentUser.name;
  const deptLabel =
    language === 'hi' ? currentUser.departmentNameHi : currentUser.departmentNameEn;
  const isExecutiveWithAnalytics =
    currentUser.role === 'CMO' || currentUser.role === 'Mayor';

  const handleSelectComplaint = (id: string) => {
    setSelectedId(id);
    setSearchParams({ id });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setCategoryFilter('');
    setWardFilter('');
    setOverdueOnly(false);
  };

  const handleAfterPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const res = await processImageUpload(file);
    if (res.errorKey) {
      if (res.errorKey === 'photoInvalidType') {
        setFormError(t.officer.validation.photoInvalidType);
      } else if (res.errorKey === 'photoTooLarge') {
        setFormError(t.officer.validation.photoTooLarge);
      }
      e.target.value = '';
      return;
    }
    setFormError('');
    setAfterPhoto(res.dataUrl);
  };

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint) return;
    if (!assignTo) {
      setFormError(t.officer.validation.staffRequired);
      return;
    }
    if (!actionRemark.trim()) {
      setFormError(t.officer.validation.remarkRequired);
      return;
    }
    setFormError('');
    assignComplaintByOfficer({
      id: selectedComplaint.id,
      fieldStaffId: assignTo,
      remark: actionRemark,
      actorLabel,
    });
    setActionRemark('');
  };

  const handleFieldAccept = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint) return;
    if (!actionRemark.trim()) {
      setFormError(t.officer.validation.remarkRequired);
      return;
    }
    setFormError('');
    acceptRequestByFieldStaff({
      id: selectedComplaint.id,
      remark: actionRemark,
      actorLabel,
    });
    setActionRemark('');
  };

  const handleFieldJobDone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint) return;
    if (!afterPhoto) {
      setFormError(t.officer.validation.afterPhotoRequired);
      return;
    }
    if (!actionRemark.trim()) {
      setFormError(t.officer.validation.remarkRequired);
      return;
    }
    setFormError('');
    submitJobDoneByFieldStaff({
      id: selectedComplaint.id,
      afterPhoto,
      remark: actionRemark,
      actorLabel,
    });
    setActionRemark('');
    setAfterPhoto(undefined);
  };

  const handleVerifyDecision = (approved: boolean) => {
    if (!selectedComplaint) return;
    if (!actionRemark.trim()) {
      setFormError(t.officer.validation.remarkRequired);
      return;
    }
    setFormError('');
    verifyJobByOfficer({
      id: selectedComplaint.id,
      approved,
      remark: actionRemark,
      actorLabel,
    });
    setActionRemark('');
  };

  const isOfficerOrCmo =
    currentUser.role === 'Department Officer' || currentUser.role === 'CMO';
  const isFieldStaff = currentUser.role === 'Field Staff';
  const isMayor = currentUser.role === 'Mayor';

  return (
    <div className="space-y-6">
      {/* Role-Specific Dashboard Header */}
      <section className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#0A2540] dark:text-white">
              {t.officer.roleTitles[currentUser.role]}
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {t.officer.pageSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3.5 py-2 text-xs">
              <div className="text-slate-500 dark:text-slate-400">
                {t.officer.loggedInAsLabel}
              </div>
              <div className="font-bold text-[#0A2540] dark:text-blue-300 mt-0.5">
                {actorLabel}
              </div>
              <div className="text-slate-600 dark:text-slate-400">{deptLabel}</div>
            </div>

            {isExecutiveWithAnalytics && (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 rounded bg-[#0A2540] hover:bg-[#13385f] dark:bg-blue-700 dark:hover:bg-blue-600 px-3.5 py-2.5 text-xs font-semibold text-white min-h-[42px]"
              >
                <BarChart3 className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{t.officer.openAnalyticsBtn}</span>
              </Link>
            )}

            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 px-3.5 py-2.5 text-xs font-semibold text-slate-800 dark:text-slate-200 min-h-[42px]"
            >
              <UserCog className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{t.officer.switchUserBtn}</span>
            </Link>

            <button
              type="button"
              onClick={logoutStaff}
              className="inline-flex items-center gap-1.5 rounded border border-red-300 dark:border-red-800 bg-white dark:bg-slate-900 hover:bg-red-50 dark:hover:bg-red-950/40 px-3.5 py-2.5 text-xs font-semibold text-red-800 dark:text-red-300 min-h-[42px] cursor-pointer"
            >
              <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{t.officer.logoutBtn}</span>
            </button>
          </div>
        </div>

        <div className="rounded border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40 px-3.5 py-2.5 text-xs font-medium text-blue-900 dark:text-blue-200">
          {currentUser.role === 'Field Staff'
            ? t.officer.fieldStaffNotice
            : currentUser.role === 'Department Officer'
              ? t.officer.departmentScopeNotice
              : currentUser.role === 'Mayor'
                ? t.officer.mayorNotice
                : t.officer.cmoNotice}
        </div>
      </section>

      {/* Simplified Complaint Task List & Filters (Visible for ALL Staff Roles) */}
      <section
        aria-label={t.officer.filtersTitle}
        className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="lg:col-span-2 relative">
            <label htmlFor="officer-search" className="sr-only">
              {t.officer.searchPlaceholder}
            </label>
            <Search
              className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="officer-search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.officer.searchPlaceholder}
              className="w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-white min-h-[42px]"
            />
          </div>

          <div>
            <label htmlFor="filter-status" className="sr-only">
              {t.officer.allStatuses}
            </label>
            <select
              id="filter-status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ComplaintStatus | '')}
              className="w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-slate-900 dark:text-white min-h-[42px]"
            >
              <option value="">{t.officer.allStatuses}</option>
              {COMPLAINT_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {t.statuses[s]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-category" className="sr-only">
              {t.officer.allCategories}
            </label>
            <select
              id="filter-category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as CategoryKey | '')}
              className="w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-slate-900 dark:text-white min-h-[42px]"
            >
              <option value="">{t.officer.allCategories}</option>
              {CATEGORIES.map((c) => (
                <option key={c.key} value={c.key}>
                  {t.categories[c.key]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-ward" className="sr-only">
              {t.officer.allWards}
            </label>
            <select
              id="filter-ward"
              value={wardFilter}
              onChange={(e) => setWardFilter(e.target.value)}
              className="w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-slate-900 dark:text-white min-h-[42px]"
            >
              <option value="">{t.officer.allWards}</option>
              {WARDS.map((w) => (
                <option key={w.id} value={w.id}>
                  {language === 'hi' ? w.nameHi : w.nameEn}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-4">
            <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200 cursor-pointer min-h-[36px]">
              <input
                type="checkbox"
                checked={overdueOnly}
                onChange={(e) => setOverdueOnly(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-[#0A2540]"
              />
              <span>{t.officer.overdueOnly}</span>
            </label>

            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 tabular-nums">
              {t.officer.listCountLabel} {filteredComplaints.length}
            </span>
          </div>

          {(searchTerm || statusFilter || categoryFilter || wardFilter || overdueOnly) && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-xs font-semibold text-[#0A2540] dark:text-blue-300 hover:underline cursor-pointer"
            >
              {t.officer.clearFilters}
            </button>
          )}
        </div>
      </section>

      {/* Master-Detail Task List & Action Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <section
          className={`lg:col-span-5 space-y-2.5 ${selectedComplaint ? 'hidden lg:block' : 'block'}`}
        >
          {filteredComplaints.length === 0 ? (
            <div className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center space-y-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {t.officer.emptyListTitle}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t.officer.emptyListDesc}
              </p>
              {(searchTerm || statusFilter || categoryFilter || wardFilter || overdueOnly) && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="inline-flex items-center justify-center rounded border border-slate-300 dark:border-slate-700 px-4 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer min-h-[40px]"
                >
                  {t.officer.clearFilters}
                </button>
              )}
            </div>
          ) : (
            filteredComplaints.map((item) => {
              const overdue = isComplaintOverdue(item);
              const escLevel = getEscalationLevel(item);
              const isSelected = selectedComplaint?.id === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectComplaint(item.id)}
                  className={`w-full text-left rounded border p-4 cursor-pointer space-y-2 ${
                    isSelected
                      ? 'border-[#0A2540] bg-blue-50/60 dark:border-blue-400 dark:bg-blue-950/30'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-sm text-[#0A2540] dark:text-blue-300 tabular-nums">
                      {item.id}
                    </span>
                    <StatusBadge status={item.status} />
                  </div>

                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {t.categories[item.category]} · {getWardName(item.ward, language)}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {overdue && <OverdueBadge />}
                    {escLevel > 0 && <EscalationBadge level={escLevel} />}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                    <span className="truncate">
                      {item.name} · {item.mobile}
                    </span>
                    <span className="shrink-0 tabular-nums">
                      {formatDateTime(item.createdAt, language)}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </section>

        <section
          className={`lg:col-span-7 ${selectedComplaint ? 'block' : 'hidden lg:block'}`}
        >
          {!selectedComplaint ? (
            <div className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 text-center">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {t.officer.selectPromptTitle}
              </h2>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                {t.officer.selectPromptDesc}
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <button
                type="button"
                onClick={() => {
                  setSelectedId(null);
                  setSearchParams({});
                }}
                className="lg:hidden inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A2540] dark:text-blue-300 min-h-[40px] cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>{t.common.backToList}</span>
              </button>

              {/* Detail Header & SLA Escalation Card */}
              <div className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <h2 className="text-lg font-bold text-[#0A2540] dark:text-white tabular-nums">
                      {selectedComplaint.id}
                    </h2>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      {selectedComplaint.name} ·{' '}
                      <span className="tabular-nums">{selectedComplaint.mobile}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <StatusBadge status={selectedComplaint.status} />
                    {isComplaintOverdue(selectedComplaint) && <OverdueBadge />}
                  </div>
                </div>

                {/* SLA & Escalation Box */}
                <div className="rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-3.5 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {t.officer.escalationBoxTitle}
                    </span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
                      {t.officer.slaElapsedLabel} {getSlaElapsedPercent(selectedComplaint)}%
                    </span>
                  </div>
                  <div>
                    {isActiveComplaint(selectedComplaint) ? (
                      getEscalationLevel(selectedComplaint) > 0 ? (
                        <EscalationBadge level={getEscalationLevel(selectedComplaint)} />
                      ) : (
                        <span className="text-xs font-medium text-emerald-800 dark:text-emerald-300">
                          {t.officer.withinSlaText}
                        </span>
                      )
                    ) : (
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                        {t.officer.resolvedSlaText}
                      </span>
                    )}
                  </div>
                </div>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-xs text-slate-500 dark:text-slate-400">
                      {t.track.wardLabel}
                    </dt>
                    <dd className="font-semibold text-slate-900 dark:text-white">
                      {getWardName(selectedComplaint.ward, language)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500 dark:text-slate-400">
                      {t.track.categoryLabel}
                    </dt>
                    <dd className="font-semibold text-slate-900 dark:text-white">
                      {t.categories[selectedComplaint.category]} (
                      {getCategoryConfig(selectedComplaint.category).slaHours} {t.common.hours})
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500 dark:text-slate-400">
                      {t.track.departmentOfficerLabel}
                    </dt>
                    <dd className="font-semibold text-slate-900 dark:text-white">
                      {getStaffDisplayName(
                        selectedComplaint.departmentOfficerId ||
                          getCategoryConfig(selectedComplaint.category).departmentOfficerId,
                        language
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500 dark:text-slate-400">
                      {t.track.assignedStaff}
                    </dt>
                    <dd className="font-semibold text-slate-900 dark:text-white">
                      {getStaffDisplayName(selectedComplaint.assignedTo, language) ||
                        t.track.unassigned}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500 dark:text-slate-400">
                      {t.track.filedOn}
                    </dt>
                    <dd className="font-medium text-slate-900 dark:text-white tabular-nums">
                      {formatDateTime(selectedComplaint.createdAt, language)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500 dark:text-slate-400">
                      {t.track.dueDate}
                    </dt>
                    <dd className="font-semibold text-slate-900 dark:text-white tabular-nums">
                      {formatDateTime(getDueDate(selectedComplaint).toISOString(), language)}
                    </dd>
                  </div>
                </dl>

                <div className="text-sm space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">
                      {t.track.locationLabel}
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {selectedComplaint.locationText}
                    </span>
                    {selectedComplaint.lat !== undefined && selectedComplaint.lng !== undefined && (
                      <span className="mt-0.5 inline-flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 ml-2 tabular-nums">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        {selectedComplaint.lat}, {selectedComplaint.lng}
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">
                      {t.track.descriptionLabel}
                    </span>
                    <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                      {selectedComplaint.description}
                    </p>
                  </div>
                  {selectedComplaint.photo && (
                    <div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                        {t.track.beforePhotoLabel}
                      </span>
                      <img
                        src={selectedComplaint.photo}
                        alt={t.track.beforePhotoLabel}
                        className="max-h-48 rounded border border-slate-200 dark:border-slate-700 object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* HIERARCHICAL ROLE-BASED ACTION PANEL */}
              <div className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
                <h3 className="text-base font-bold text-[#0A2540] dark:text-white">
                  {t.officer.actionPanelTitle}
                </h3>

                {isMayor && (
                  <p className="rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-3.5 text-sm text-slate-700 dark:text-slate-300">
                    {t.officer.mayorReadOnlyNote}
                  </p>
                )}

                {!isMayor && selectedComplaint.status === 'Closed' && (
                  <p className="rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-3.5 text-sm text-slate-700 dark:text-slate-300">
                    {t.officer.closedReadOnlyNote}
                  </p>
                )}

                {!isMayor && selectedComplaint.status === 'Resolved' && (
                  <p className="rounded border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 p-3.5 text-sm text-emerald-900 dark:text-emerald-200">
                    {t.officer.resolvedReadOnlyNote}
                  </p>
                )}

                {isOfficerOrCmo &&
                  (selectedComplaint.status === 'Registered' ||
                    selectedComplaint.status === 'Assigned' ||
                    selectedComplaint.status === 'In progress') && (
                    <form onSubmit={handleAssignSubmit} className="space-y-4" noValidate>
                      <div>
                        <label
                          htmlFor="officer-assign-select"
                          className="block text-sm font-semibold text-slate-800 dark:text-slate-200"
                        >
                          {t.officer.assignToLabel}
                        </label>
                        <select
                          id="officer-assign-select"
                          value={assignTo}
                          onChange={(e) => {
                            setAssignTo(e.target.value);
                            if (formError) setFormError('');
                          }}
                          className="mt-1.5 w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-slate-900 dark:text-white min-h-[44px]"
                        >
                          <option value="">{t.officer.selectStaffPlaceholder}</option>
                          {fieldStaffMembers.map((staff) => (
                            <option key={staff.id} value={staff.id}>
                              {language === 'hi' ? staff.nameHi : staff.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="assign-remark-input"
                          className="block text-sm font-semibold text-slate-800 dark:text-slate-200"
                        >
                          {t.officer.assignRemarkLabel}
                        </label>
                        <textarea
                          id="assign-remark-input"
                          rows={3}
                          value={actionRemark}
                          onChange={(e) => {
                            setActionRemark(e.target.value);
                            if (formError) setFormError('');
                          }}
                          placeholder={t.officer.assignRemarkPlaceholder}
                          className="mt-1.5 w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white"
                        />
                      </div>

                      {formError && (
                        <div
                          role="alert"
                          className="rounded border border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/60 px-3.5 py-2.5 text-sm font-medium text-red-800 dark:text-red-200"
                        >
                          {formError}
                        </div>
                      )}

                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 rounded bg-[#0A2540] hover:bg-[#13385f] dark:bg-blue-700 dark:hover:bg-blue-600 px-5 py-3 text-sm font-semibold text-white min-h-[44px] cursor-pointer"
                      >
                        <UserCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>
                          {selectedComplaint.status === 'Registered'
                            ? t.officer.assignSubmitBtn
                            : t.officer.reassignBtn}
                        </span>
                      </button>
                    </form>
                  )}

                {isOfficerOrCmo && selectedComplaint.status === 'Job done' && (
                  <div className="space-y-4">
                    <div className="rounded border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 p-3.5 space-y-1">
                      <div className="text-sm font-bold text-indigo-950 dark:text-indigo-200 flex items-center gap-1.5">
                        <ClipboardCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>{t.officer.verifyPanelTitle}</span>
                      </div>
                      <p className="text-xs text-indigo-900 dark:text-indigo-300">
                        {t.officer.verifyPanelDesc}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-3 space-y-2">
                        <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          {t.officer.beforePhotoTitle}
                        </div>
                        {selectedComplaint.photo ? (
                          <img
                            src={selectedComplaint.photo}
                            alt={t.officer.beforePhotoTitle}
                            className="w-full max-h-52 rounded border border-slate-200 dark:border-slate-700 object-contain bg-white dark:bg-slate-900"
                          />
                        ) : (
                          <div className="h-36 flex items-center justify-center rounded border border-dashed border-slate-300 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 text-center p-3">
                            {t.officer.noCitizenPhoto}
                          </div>
                        )}
                      </div>

                      <div className="rounded border border-emerald-300 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20 p-3 space-y-2">
                        <div className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                          {t.officer.afterPhotoTitle}
                        </div>
                        {selectedComplaint.afterPhoto ? (
                          <img
                            src={selectedComplaint.afterPhoto}
                            alt={t.officer.afterPhotoTitle}
                            className="w-full max-h-52 rounded border border-emerald-200 dark:border-emerald-800 object-contain bg-white dark:bg-slate-900"
                          />
                        ) : (
                          <div className="h-36 flex items-center justify-center rounded border border-dashed border-slate-300 dark:border-slate-700 text-xs text-slate-500 p-3">
                            —
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="verify-remark-input"
                        className="block text-sm font-semibold text-slate-800 dark:text-slate-200"
                      >
                        {t.officer.verifyRemarkLabel}
                      </label>
                      <textarea
                        id="verify-remark-input"
                        rows={3}
                        value={actionRemark}
                        onChange={(e) => {
                          setActionRemark(e.target.value);
                          if (formError) setFormError('');
                        }}
                        placeholder={t.officer.verifyRemarkPlaceholder}
                        className="mt-1.5 w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white"
                      />
                    </div>

                    {formError && (
                      <div
                        role="alert"
                        className="rounded border border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/60 px-3.5 py-2.5 text-sm font-medium text-red-800 dark:text-red-200"
                      >
                        {formError}
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={() => handleVerifyDecision(true)}
                        className="inline-flex items-center justify-center gap-2 rounded bg-emerald-700 hover:bg-emerald-800 px-5 py-3 text-sm font-semibold text-white min-h-[44px] cursor-pointer"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>{t.officer.verifyAndResolveBtn}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleVerifyDecision(false)}
                        className="inline-flex items-center justify-center gap-2 rounded border border-red-400 dark:border-red-700 bg-white dark:bg-slate-900 hover:bg-red-50 dark:hover:bg-red-950/40 px-5 py-3 text-sm font-semibold text-red-800 dark:text-red-300 min-h-[44px] cursor-pointer"
                      >
                        <RotateCcw className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>{t.officer.rejectJobBtn}</span>
                      </button>
                    </div>
                  </div>
                )}

                {isFieldStaff && selectedComplaint.status === 'Assigned' && (
                  <form onSubmit={handleFieldAccept} className="space-y-4" noValidate>
                    <div className="rounded border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40 p-3.5 space-y-1">
                      <div className="text-sm font-bold text-blue-950 dark:text-blue-200">
                        {t.officer.fieldAcceptTitle}
                      </div>
                      <p className="text-xs text-blue-900 dark:text-blue-300">
                        {t.officer.fieldAcceptDesc}
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="field-accept-remark"
                        className="block text-sm font-semibold text-slate-800 dark:text-slate-200"
                      >
                        {t.officer.fieldAcceptRemarkLabel}
                      </label>
                      <textarea
                        id="field-accept-remark"
                        rows={2}
                        value={actionRemark}
                        onChange={(e) => {
                          setActionRemark(e.target.value);
                          if (formError) setFormError('');
                        }}
                        placeholder={t.officer.fieldAcceptRemarkPlaceholder}
                        className="mt-1.5 w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white"
                      />
                    </div>

                    {formError && (
                      <div
                        role="alert"
                        className="rounded border border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/60 px-3.5 py-2.5 text-sm font-medium text-red-800 dark:text-red-200"
                      >
                        {formError}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded bg-[#0A2540] hover:bg-[#13385f] dark:bg-blue-700 dark:hover:bg-blue-600 px-5 py-3 text-sm font-semibold text-white min-h-[44px] cursor-pointer"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>{t.officer.fieldAcceptBtn}</span>
                    </button>
                  </form>
                )}

                {isFieldStaff && selectedComplaint.status === 'In progress' && (
                  <form onSubmit={handleFieldJobDone} className="space-y-4" noValidate>
                    <div className="rounded border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 p-3.5 space-y-1">
                      <div className="text-sm font-bold text-amber-950 dark:text-amber-200">
                        {t.officer.fieldResolveTitle}
                      </div>
                      <p className="text-xs text-amber-900 dark:text-amber-300">
                        {t.officer.fieldResolveDesc}
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="field-after-photo"
                        className="block text-sm font-semibold text-slate-800 dark:text-slate-200"
                      >
                        {t.officer.fieldResolvePhotoLabel}
                      </label>
                      <div className="mt-1.5">
                        <label
                          htmlFor="field-after-photo"
                          className="inline-flex items-center gap-2 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 px-4 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 cursor-pointer min-h-[44px]"
                        >
                          <Upload className="h-4 w-4 shrink-0" aria-hidden="true" />
                          <span>{t.officer.fieldResolvePhotoLabel}</span>
                        </label>
                        <input
                          id="field-after-photo"
                          type="file"
                          accept="image/*"
                          onChange={handleAfterPhotoUpload}
                          className="sr-only"
                        />
                      </div>
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                        {t.officer.fieldResolvePhotoHint}
                      </p>

                      {afterPhoto && (
                        <div className="mt-2.5 rounded border border-slate-200 dark:border-slate-700 p-2.5 bg-slate-50 dark:bg-slate-800/40 inline-block">
                          <img
                            src={afterPhoto}
                            alt={t.officer.afterPhotoTitle}
                            className="max-h-44 rounded object-contain border border-slate-200 dark:border-slate-700"
                          />
                          <button
                            type="button"
                            onClick={() => setAfterPhoto(undefined)}
                            className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-red-700 dark:text-red-400 hover:underline cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>{t.lodge.photoRemove}</span>
                          </button>
                        </div>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="field-resolve-remark"
                        className="block text-sm font-semibold text-slate-800 dark:text-slate-200"
                      >
                        {t.officer.fieldResolveRemarkLabel}
                      </label>
                      <textarea
                        id="field-resolve-remark"
                        rows={3}
                        value={actionRemark}
                        onChange={(e) => {
                          setActionRemark(e.target.value);
                          if (formError) setFormError('');
                        }}
                        placeholder={t.officer.fieldResolveRemarkPlaceholder}
                        className="mt-1.5 w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white"
                      />
                    </div>

                    {formError && (
                      <div
                        role="alert"
                        className="rounded border border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/60 px-3.5 py-2.5 text-sm font-medium text-red-800 dark:text-red-200"
                      >
                        {formError}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded bg-emerald-700 hover:bg-emerald-800 px-5 py-3 text-sm font-semibold text-white min-h-[44px] cursor-pointer"
                    >
                      <ClipboardCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>{t.officer.fieldJobDoneBtn}</span>
                    </button>
                  </form>
                )}

                {isFieldStaff && selectedComplaint.status === 'Job done' && (
                  <div className="space-y-3">
                    <p className="rounded border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 p-3.5 text-sm text-indigo-900 dark:text-indigo-200">
                      {t.officer.fieldAwaitingVerifyNotice}
                    </p>
                    {selectedComplaint.afterPhoto && (
                      <div>
                        <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                          {t.officer.afterPhotoTitle}
                        </div>
                        <img
                          src={selectedComplaint.afterPhoto}
                          alt={t.officer.afterPhotoTitle}
                          className="max-h-44 rounded border border-slate-200 dark:border-slate-700 object-contain"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t.track.timelineTitle}
                </h3>
                <Timeline entries={selectedComplaint.history} />
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
