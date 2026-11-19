import React, { useState } from 'react';
import { Eye, EyeOff, KeyRound, LogIn, UserCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { STAFF_LIST } from '../constants';
import { useComplaints } from '../store/ComplaintContext';
import { Staff } from '../types';

export function LoginPage({ redirectTo = '/officer' }: { redirectTo?: string }) {
  const { t, language, loginAsStaff, currentUser } = useComplaints();
  const navigate = useNavigate();

  // Credentials Login State
  const [userId, setUserId] = useState(currentUser?.userId || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [credError, setCredError] = useState('');

  // Quick Test User Dropdown State
  const [selectedTestStaffId, setSelectedTestStaffId] = useState(currentUser?.id || '');
  const [testUserError, setTestUserError] = useState('');

  const executiveList = STAFF_LIST.filter((s) => s.role === 'Mayor' || s.role === 'CMO');
  const departmentOfficers = STAFF_LIST.filter((s) => s.role === 'Department Officer');
  const fieldStaff = STAFF_LIST.filter((s) => s.role === 'Field Staff');

  const completeLogin = (staff: Staff) => {
    loginAsStaff(staff.id);
    navigate(redirectTo);
  };

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUserId = userId.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedUserId) {
      setCredError(t.login.errors.userIdRequired);
      return;
    }
    if (!trimmedPassword) {
      setCredError(t.login.errors.passwordRequired);
      return;
    }

    const matched = STAFF_LIST.find(
      (s) => s.userId.toLowerCase() === trimmedUserId && s.password === trimmedPassword
    );
    if (!matched) {
      setCredError(t.login.errors.invalidCredentials);
      return;
    }

    setCredError('');
    completeLogin(matched);
  };

  const handleTestDropdownChange = (staffId: string) => {
    setSelectedTestStaffId(staffId);
    setTestUserError('');
    setCredError('');
    const found = STAFF_LIST.find((s) => s.id === staffId);
    if (found) {
      setUserId(found.userId);
      setPassword(found.password);
    }
  };

  const handleTestUserLogin = () => {
    if (!selectedTestStaffId) {
      setTestUserError(t.login.errors.testUserRequired);
      return;
    }
    const found = STAFF_LIST.find((s) => s.id === selectedTestStaffId);
    if (!found) {
      setTestUserError(t.login.errors.testUserRequired);
      return;
    }
    setTestUserError('');
    completeLogin(found);
  };

  const formatStaffOption = (staff: Staff) => {
    const name = language === 'hi' ? staff.nameHi : staff.name;
    return `${name} — [${staff.userId}]`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header & Citizen Notice */}
      <section className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3">
        <h1 className="text-2xl font-bold text-[#0A2540] dark:text-white">{t.login.pageTitle}</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">{t.login.pageSubtitle}</p>

        <div className="rounded border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <span className="font-medium text-blue-900 dark:text-blue-200">
            {t.login.citizenNote}
          </span>
          <Link
            to="/lodge"
            className="font-bold text-[#0A2540] dark:text-blue-300 underline whitespace-nowrap"
          >
            {t.login.citizenLodgeLink} →
          </Link>
        </div>
      </section>

      {/* Two-Column Login Layout: Credentials Form + Quick Test User Dropdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: User ID & Password Login Form */}
        <section className="lg:col-span-7 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-5">
          <h2 className="text-lg font-bold text-[#0A2540] dark:text-white flex items-center gap-2">
            <KeyRound className="h-5 w-5 text-[#0A2540] dark:text-blue-400" aria-hidden="true" />
            <span>{t.login.credentialsHeading}</span>
          </h2>

          <form onSubmit={handleCredentialsSubmit} className="space-y-4" noValidate>
            <div>
              <label
                htmlFor="staff-user-id"
                className="block text-sm font-semibold text-slate-800 dark:text-slate-200"
              >
                {t.login.userIdLabel}
              </label>
              <input
                id="staff-user-id"
                type="text"
                autoComplete="username"
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);
                  if (credError) setCredError('');
                }}
                placeholder={t.login.userIdPlaceholder}
                className="mt-1.5 w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white min-h-[44px]"
              />
            </div>

            <div>
              <label
                htmlFor="staff-password"
                className="block text-sm font-semibold text-slate-800 dark:text-slate-200"
              >
                {t.login.passwordLabel}
              </label>
              <div className="mt-1.5 relative">
                <input
                  id="staff-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (credError) setCredError('');
                  }}
                  placeholder={t.login.passwordPlaceholder}
                  className="w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 pl-3.5 pr-11 py-2.5 text-sm text-slate-900 dark:text-white min-h-[44px]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400">
                {t.login.demoPasswordHint}
              </p>
            </div>

            {credError && (
              <div
                role="alert"
                className="rounded border border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/60 px-3.5 py-2.5 text-sm font-medium text-red-800 dark:text-red-200"
              >
                {credError}
              </div>
            )}

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded bg-[#0A2540] hover:bg-[#13385f] dark:bg-blue-700 dark:hover:bg-blue-600 px-6 py-3 text-sm font-semibold text-white min-h-[44px] cursor-pointer"
            >
              <LogIn className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{t.login.signInBtn}</span>
            </button>
          </form>
        </section>

        {/* Right: Test User Dropdown + Instant Login */}
        <section className="lg:col-span-5 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
          <div>
            <h2 className="text-base font-bold text-[#0A2540] dark:text-white flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-[#0A2540] dark:text-blue-400" aria-hidden="true" />
              <span>{t.login.testUserHeading}</span>
            </h2>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {t.login.testUserDesc}
            </p>
          </div>

          <div>
            <label
              htmlFor="test-user-dropdown"
              className="block text-sm font-semibold text-slate-800 dark:text-slate-200"
            >
              {t.login.testUserSelectLabel}
            </label>
            <select
              id="test-user-dropdown"
              value={selectedTestStaffId}
              onChange={(e) => handleTestDropdownChange(e.target.value)}
              className="mt-1.5 w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2.5 text-sm text-slate-900 dark:text-white min-h-[44px]"
            >
              <option value="">{t.login.testUserPlaceholder}</option>
              <optgroup label={t.login.executiveHeading}>
                {executiveList.map((s) => (
                  <option key={s.id} value={s.id}>
                    {formatStaffOption(s)}
                  </option>
                ))}
              </optgroup>
              <optgroup label={t.login.departmentOfficersHeading}>
                {departmentOfficers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {formatStaffOption(s)}
                  </option>
                ))}
              </optgroup>
              <optgroup label={t.login.fieldStaffHeading}>
                {fieldStaff.map((s) => (
                  <option key={s.id} value={s.id}>
                    {formatStaffOption(s)}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {testUserError && (
            <div
              role="alert"
              className="rounded border border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/60 px-3.5 py-2 text-xs font-medium text-red-800 dark:text-red-200"
            >
              {testUserError}
            </div>
          )}

          <button
            type="button"
            onClick={handleTestUserLogin}
            className="w-full inline-flex items-center justify-center gap-2 rounded border-2 border-[#0A2540] dark:border-blue-400 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 px-5 py-3 text-sm font-semibold text-[#0A2540] dark:text-blue-300 min-h-[44px] cursor-pointer"
          >
            <LogIn className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{t.login.testUserLoginBtn}</span>
          </button>
        </section>
      </div>

      {/* Hierarchy Workflow Overview */}
      <section className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-2.5">
        <h2 className="text-sm font-bold text-[#0A2540] dark:text-white">
          {t.login.hierarchySummaryTitle}
        </h2>
        <ol className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
          {t.login.hierarchySummarySteps.map((stepText, idx) => (
            <li key={idx} className="leading-relaxed">
              {stepText}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
