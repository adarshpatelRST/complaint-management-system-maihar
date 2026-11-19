import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Globe, LogOut, Menu, MessageSquare, RotateCcw, X } from 'lucide-react';
import { useComplaints } from '../store/ComplaintContext';

export function Layout({ children }: { children: React.ReactNode }) {
  const {
    t,
    language,
    toggleLanguage,
    resetDemoData,
    toasts,
    dismissToast,
    currentUser,
    logoutStaff,
  } = useComplaints();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const canViewAnalytics =
    currentUser?.role === 'CMO' || currentUser?.role === 'Mayor';

  // Navigation items strictly follow role visibility:
  // - Default (public): Home, Lodge Complaint, Track Status, Staff Login
  // - Logged in as Department Officer / Field Staff: Home, Lodge Complaint, Track Status, My Dashboard
  // - Logged in as CMO / Mayor: Home, Lodge Complaint, Track Status, My Dashboard, Analytics Dashboard
  const navItems: { to: string; label: string; end?: boolean }[] = [
    { to: '/', label: t.nav.home, end: true },
    { to: '/lodge', label: t.nav.lodge },
    { to: '/track', label: t.nav.track },
  ];

  if (!currentUser) {
    navItems.push({ to: '/login', label: t.nav.login });
  } else {
    navItems.push({ to: '/officer', label: t.nav.myDashboard });
    if (canViewAnalytics) {
      navItems.push({ to: '/dashboard', label: t.nav.analytics });
    }
  }

  const handleReset = () => {
    resetDemoData();
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logoutStaff();
    setMobileMenuOpen(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Top thin Saffron-White-Green Tricolor Strip */}
      <div className="h-1.5 w-full flex shrink-0" aria-hidden="true">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white dark:bg-slate-200" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      {/* Thin Demo Notice & Utility Bar on Every Page */}
      <div className="bg-slate-900 text-slate-100 dark:bg-slate-900 border-b border-slate-800 text-xs">
        <div className="max-w-6xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
          <p className="font-medium text-amber-200">{t.demoBanner}</p>
          <div className="flex flex-wrap items-center gap-2">
            {currentUser && (
              <div className="inline-flex items-center gap-2 rounded border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-200">
                <span className="font-semibold text-white truncate max-w-[180px]">
                  {language === 'hi' ? currentUser.nameHi : currentUser.name}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 font-semibold cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{t.officer.logoutBtn}</span>
                </button>
              </div>
            )}
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded border border-slate-600 bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-700 whitespace-nowrap cursor-pointer min-h-[32px]"
            >
              <RotateCcw className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{t.resetDemoData}</span>
            </button>
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={`${t.languageLabel}: ${t.switchLangButton}`}
              className="inline-flex items-center gap-1.5 rounded border border-slate-600 bg-slate-800 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 whitespace-nowrap cursor-pointer min-h-[32px]"
            >
              <Globe className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{language === 'hi' ? 'English' : 'हिंदी'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Simple Official Government Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
          <NavLink to="/" className="flex items-center gap-3 min-w-0">
            <div
              className="h-11 w-11 rounded-full border-2 border-[#0A2540] dark:border-blue-400 bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 36 36"
                className="h-7 w-7 text-[#0A2540] dark:text-blue-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <circle cx="18" cy="18" r="13" />
                <path d="M18 9v18M11 23h14M13 14h10l-1 9h-8l-1-9z" />
                <circle cx="18" cy="7" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-lg font-bold text-[#0A2540] dark:text-white leading-tight truncate">
                {t.portalTitle}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 truncate">
                {t.portalSubtitle}
              </div>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded text-sm font-medium whitespace-nowrap shrink-0 min-h-[40px] inline-flex items-center ${
                    isActive
                      ? 'bg-[#0A2540] text-white dark:bg-blue-700 dark:text-white'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="lg:hidden inline-flex items-center justify-center rounded border border-slate-300 dark:border-slate-700 p-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[44px] min-w-[44px] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav
            className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2 space-y-1"
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3.5 py-3 rounded text-sm font-medium min-h-[44px] ${
                    isActive
                      ? 'bg-[#0A2540] text-white dark:bg-blue-700'
                      : 'text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 sm:py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
          <div className="space-y-1">
            <p className="font-medium text-slate-800 dark:text-slate-200">{t.footer.officeHours}</p>
            <p>{t.footer.disclaimer}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {t.footer.demoNote}
            </span>
          </div>
        </div>
      </footer>

      {/* Simulated Notification Toast Stack */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-[calc(100%-2rem)] sm:w-96 pointer-events-none"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-3.5 text-slate-900 dark:text-slate-100 flex items-start gap-3"
          >
            <MessageSquare
              className="h-5 w-5 text-[#0A2540] dark:text-blue-400 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-[#0A2540] dark:text-blue-300">
                {toast.title}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5 break-words">
                {toast.message}
              </p>
            </div>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              aria-label={t.common.close}
              className="p-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
