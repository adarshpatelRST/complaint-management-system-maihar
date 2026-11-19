import React, { useState } from 'react';
import {
  CheckCircle2,
  FilePlus2,
  MapPin,
  Search,
  ShieldCheck,
  Trash2,
  Upload,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORIES, DEMO_OTP, WARDS } from '../constants';
import { useComplaints } from '../store/ComplaintContext';
import { CategoryKey, Complaint } from '../types';
import {
  formatDateTime,
  getCategoryConfig,
  getDueDate,
  getStaffDisplayName,
  processImageUpload,
} from '../utils/complaintHelpers';

interface FormErrors {
  name?: string;
  ward?: string;
  category?: string;
  locationText?: string;
  description?: string;
  photo?: string;
}

export function LodgeComplaintPage() {
  const { t, language, addComplaint, notifySms } = useComplaints();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [step1Error, setStep1Error] = useState('');

  const [name, setName] = useState('');
  const [ward, setWard] = useState('');
  const [category, setCategory] = useState<CategoryKey | ''>('');
  const [locationText, setLocationText] = useState('');
  const [lat, setLat] = useState<number | undefined>(undefined);
  const [lng, setLng] = useState<number | undefined>(undefined);
  const [gpsStatus, setGpsStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [gpsMessage, setGpsMessage] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState<FormErrors>({});

  const [submittedComplaint, setSubmittedComplaint] = useState<Complaint | null>(null);

  const validateMobile = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed) return t.lodge.errors.mobileRequired;
    if (!/^[6-9]\d{9}$/.test(trimmed)) return t.lodge.errors.mobileInvalid;
    return null;
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateMobile(mobile);
    if (err) {
      setStep1Error(err);
      return;
    }
    setStep1Error('');
    setOtpSent(true);
    notifySms(`${mobile.trim()} · ${t.sms.otpSent}`);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const mobileErr = validateMobile(mobile);
    if (mobileErr) {
      setStep1Error(mobileErr);
      return;
    }
    const trimmedOtp = otp.trim();
    if (!trimmedOtp) {
      setStep1Error(t.lodge.errors.otpRequired);
      return;
    }
    if (trimmedOtp !== DEMO_OTP) {
      setStep1Error(t.lodge.errors.otpInvalid);
      return;
    }
    setStep1Error('');
    setStep(2);
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setGpsStatus('error');
      setGpsMessage(t.lodge.gpsUnsupported);
      return;
    }
    setGpsStatus('loading');
    setGpsMessage(t.lodge.gpsFetching);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const roundedLat = Math.round(position.coords.latitude * 10000) / 10000;
        const roundedLng = Math.round(position.coords.longitude * 10000) / 10000;
        setLat(roundedLat);
        setLng(roundedLng);
        setGpsStatus('success');
        setGpsMessage(`${t.lodge.gpsCaptured}: ${roundedLat}, ${roundedLng}`);
        if (!locationText.trim()) {
          setLocationText(`GPS (${roundedLat}, ${roundedLng})`);
        }
      },
      (err) => {
        setGpsStatus('error');
        if (err.code === err.PERMISSION_DENIED) {
          setGpsMessage(t.lodge.gpsDenied);
        } else {
          setGpsMessage(t.lodge.gpsFailed);
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const result = await processImageUpload(file);
    if (result.errorKey) {
      setErrors((prev) => ({ ...prev, photo: t.lodge.errors[result.errorKey!] }));
      e.target.value = '';
      return;
    }
    setErrors((prev) => ({ ...prev, photo: undefined }));
    setPhoto(result.dataUrl);
  };

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: FormErrors = {};

    const trimmedName = name.trim();
    if (!trimmedName) nextErrors.name = t.lodge.errors.nameRequired;
    else if (trimmedName.length < 2) nextErrors.name = t.lodge.errors.nameTooShort;

    if (!ward) nextErrors.ward = t.lodge.errors.wardRequired;
    if (!category) nextErrors.category = t.lodge.errors.categoryRequired;

    const trimmedLoc = locationText.trim();
    if (!trimmedLoc) nextErrors.locationText = t.lodge.errors.locationRequired;

    const trimmedDesc = description.trim();
    if (!trimmedDesc) nextErrors.description = t.lodge.errors.descriptionRequired;
    else if (trimmedDesc.length < 10) nextErrors.description = t.lodge.errors.descriptionTooShort;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const created = addComplaint({
      mobile: mobile.trim(),
      name: trimmedName,
      ward,
      category: category as CategoryKey,
      locationText: trimmedLoc,
      lat,
      lng,
      description: trimmedDesc,
      photo,
    });

    setSubmittedComplaint(created);
    setStep(3);
  };

  const handleResetForm = () => {
    setStep(1);
    setMobile('');
    setOtpSent(false);
    setOtp('');
    setStep1Error('');
    setName('');
    setWard('');
    setCategory('');
    setLocationText('');
    setLat(undefined);
    setLng(undefined);
    setGpsStatus('idle');
    setGpsMessage('');
    setDescription('');
    setPhoto(undefined);
    setErrors({});
    setSubmittedComplaint(null);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0A2540] dark:text-white">{t.lodge.pageTitle}</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{t.lodge.pageSubtitle}</p>
      </div>

      {/* Stepper Indicator */}
      <ol className="grid grid-cols-3 gap-2 text-xs font-semibold">
        {[
          { num: 1, label: t.lodge.step1Title },
          { num: 2, label: t.lodge.step2Title },
          { num: 3, label: t.lodge.step3Title },
        ].map((item) => {
          const active = step === item.num;
          const completed = step > item.num;
          return (
            <li
              key={item.num}
              className={`rounded border px-3 py-2.5 ${
                active
                  ? 'border-[#0A2540] bg-[#0A2540] text-white dark:border-blue-500 dark:bg-blue-700'
                  : completed
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200'
                    : 'border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'
              }`}
            >
              {item.label}
            </li>
          );
        })}
      </ol>

      {/* STEP 1: MOBILE & OTP */}
      {step === 1 && (
        <section className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-5">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-[#0A2540] dark:text-blue-400" aria-hidden="true" />
            <span>{t.lodge.step1Title}</span>
          </h2>

          <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-4" noValidate>
            <div>
              <label
                htmlFor="citizen-mobile"
                className="block text-sm font-semibold text-slate-800 dark:text-slate-200"
              >
                {t.lodge.mobileLabel}
              </label>
              <div className="mt-1.5 flex flex-col sm:flex-row gap-2">
                <input
                  id="citizen-mobile"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={mobile}
                  disabled={otpSent}
                  onChange={(e) => {
                    setMobile(e.target.value.replace(/\D/g, '').slice(0, 10));
                    if (step1Error) setStep1Error('');
                  }}
                  placeholder={t.lodge.mobilePlaceholder}
                  className="flex-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-base text-slate-900 dark:text-white disabled:bg-slate-100 dark:disabled:bg-slate-800 tabular-nums min-h-[44px]"
                />
                {!otpSent ? (
                  <button
                    type="submit"
                    className="rounded bg-[#0A2540] hover:bg-[#13385f] dark:bg-blue-700 dark:hover:bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white min-h-[44px] whitespace-nowrap cursor-pointer"
                  >
                    {t.lodge.sendOtpBtn}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setOtp('');
                      setStep1Error('');
                    }}
                    className="rounded border border-slate-300 dark:border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[44px] whitespace-nowrap cursor-pointer"
                  >
                    {t.lodge.changeMobileBtn}
                  </button>
                )}
              </div>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400">
                {t.lodge.mobileHint}
              </p>
            </div>

            {otpSent && (
              <div>
                <label
                  htmlFor="citizen-otp"
                  className="block text-sm font-semibold text-slate-800 dark:text-slate-200"
                >
                  {t.lodge.otpLabel}
                </label>
                <input
                  id="citizen-otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, '').slice(0, 4));
                    if (step1Error) setStep1Error('');
                  }}
                  placeholder={t.lodge.otpPlaceholder}
                  className="mt-1.5 w-full sm:w-56 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-base text-slate-900 dark:text-white tabular-nums tracking-widest min-h-[44px]"
                />
                <p className="mt-1.5 text-xs font-medium text-blue-800 dark:text-blue-300">
                  {t.lodge.otpDemoHint}
                </p>
              </div>
            )}

            {step1Error && (
              <div
                role="alert"
                className="rounded border border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/60 px-3.5 py-2.5 text-sm font-medium text-red-800 dark:text-red-200"
              >
                {step1Error}
              </div>
            )}

            {otpSent && (
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto rounded bg-[#0A2540] hover:bg-[#13385f] dark:bg-blue-700 dark:hover:bg-blue-600 px-6 py-3 text-sm font-semibold text-white min-h-[44px] cursor-pointer"
                >
                  {t.lodge.verifyOtpBtn}
                </button>
              </div>
            )}
          </form>
        </section>
      )}

      {/* STEP 2: COMPLAINT DETAILS FORM */}
      {step === 2 && (
        <section className="rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="text-sm text-slate-700 dark:text-slate-300">
              {t.lodge.verifiedMobileText}{' '}
              <strong className="text-slate-900 dark:text-white tabular-nums">{mobile}</strong>
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs font-semibold text-blue-800 dark:text-blue-300 underline cursor-pointer"
            >
              {t.lodge.changeMobileBtn}
            </button>
          </div>

          <form onSubmit={handleSubmitComplaint} className="space-y-5" noValidate>
            <div>
              <label
                htmlFor="lodge-name"
                className="block text-sm font-semibold text-slate-800 dark:text-slate-200"
              >
                {t.lodge.nameLabel}
              </label>
              <input
                id="lodge-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                }}
                placeholder={t.lodge.namePlaceholder}
                aria-invalid={Boolean(errors.name)}
                className="mt-1.5 w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white min-h-[44px]"
              />
              {errors.name && (
                <p role="alert" className="mt-1 text-xs font-medium text-red-700 dark:text-red-400">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="lodge-ward"
                  className="block text-sm font-semibold text-slate-800 dark:text-slate-200"
                >
                  {t.lodge.wardLabel}
                </label>
                <select
                  id="lodge-ward"
                  value={ward}
                  onChange={(e) => {
                    setWard(e.target.value);
                    if (errors.ward) setErrors((p) => ({ ...p, ward: undefined }));
                  }}
                  aria-invalid={Boolean(errors.ward)}
                  className="mt-1.5 w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white min-h-[44px]"
                >
                  <option value="">{t.lodge.wardPlaceholder}</option>
                  {WARDS.map((w) => (
                    <option key={w.id} value={w.id}>
                      {language === 'hi' ? w.nameHi : w.nameEn}
                    </option>
                  ))}
                </select>
                {errors.ward && (
                  <p role="alert" className="mt-1 text-xs font-medium text-red-700 dark:text-red-400">
                    {errors.ward}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lodge-category"
                  className="block text-sm font-semibold text-slate-800 dark:text-slate-200"
                >
                  {t.lodge.categoryLabel}
                </label>
                <select
                  id="lodge-category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value as CategoryKey | '');
                    if (errors.category) setErrors((p) => ({ ...p, category: undefined }));
                  }}
                  aria-invalid={Boolean(errors.category)}
                  className="mt-1.5 w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white min-h-[44px]"
                >
                  <option value="">{t.lodge.categoryPlaceholder}</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.key} value={c.key}>
                      {language === 'hi' ? c.labelHi : c.labelEn} ({c.slaHours} {t.common.hours})
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p role="alert" className="mt-1 text-xs font-medium text-red-700 dark:text-red-400">
                    {errors.category}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="lodge-location"
                className="block text-sm font-semibold text-slate-800 dark:text-slate-200"
              >
                {t.lodge.locationLabel}
              </label>
              <input
                id="lodge-location"
                type="text"
                value={locationText}
                onChange={(e) => {
                  setLocationText(e.target.value);
                  if (errors.locationText) setErrors((p) => ({ ...p, locationText: undefined }));
                }}
                placeholder={t.lodge.locationPlaceholder}
                aria-invalid={Boolean(errors.locationText)}
                className="mt-1.5 w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white min-h-[44px]"
              />
              {errors.locationText && (
                <p role="alert" className="mt-1 text-xs font-medium text-red-700 dark:text-red-400">
                  {errors.locationText}
                </p>
              )}

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  disabled={gpsStatus === 'loading'}
                  className="inline-flex items-center gap-1.5 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 px-3.5 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 min-h-[40px] cursor-pointer disabled:opacity-60"
                >
                  <MapPin className="h-4 w-4 shrink-0 text-[#0A2540] dark:text-blue-400" aria-hidden="true" />
                  <span>{gpsStatus === 'loading' ? t.lodge.gpsFetching : t.lodge.useGpsBtn}</span>
                </button>
                {gpsMessage && (
                  <span
                    className={`text-xs ${
                      gpsStatus === 'error'
                        ? 'text-amber-800 dark:text-amber-300'
                        : 'text-emerald-800 dark:text-emerald-300 font-medium tabular-nums'
                    }`}
                  >
                    {gpsMessage}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="lodge-description"
                className="block text-sm font-semibold text-slate-800 dark:text-slate-200"
              >
                {t.lodge.descriptionLabel}
              </label>
              <textarea
                id="lodge-description"
                rows={4}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description) setErrors((p) => ({ ...p, description: undefined }));
                }}
                placeholder={t.lodge.descriptionPlaceholder}
                aria-invalid={Boolean(errors.description)}
                className="mt-1.5 w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white"
              />
              {errors.description && (
                <p role="alert" className="mt-1 text-xs font-medium text-red-700 dark:text-red-400">
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="lodge-photo"
                className="block text-sm font-semibold text-slate-800 dark:text-slate-200"
              >
                {t.lodge.photoLabel}
              </label>
              <div className="mt-1.5">
                <label
                  htmlFor="lodge-photo"
                  className="inline-flex items-center gap-2 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 px-4 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 cursor-pointer min-h-[44px]"
                >
                  <Upload className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{t.lodge.photoLabel}</span>
                </label>
                <input
                  id="lodge-photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="sr-only"
                />
              </div>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">{t.lodge.photoHint}</p>
              {errors.photo && (
                <p role="alert" className="mt-1 text-xs font-medium text-red-700 dark:text-red-400">
                  {errors.photo}
                </p>
              )}

              {photo && (
                <div className="mt-3 rounded border border-slate-200 dark:border-slate-700 p-3 bg-slate-50 dark:bg-slate-800/40 inline-block">
                  <img
                    src={photo}
                    alt={t.lodge.photoLabel}
                    className="max-h-48 rounded object-contain border border-slate-200 dark:border-slate-700"
                  />
                  <button
                    type="button"
                    onClick={() => setPhoto(undefined)}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-red-700 dark:text-red-400 hover:underline cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{t.lodge.photoRemove}</span>
                  </button>
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded bg-[#0A2540] hover:bg-[#13385f] dark:bg-blue-700 dark:hover:bg-blue-600 px-6 py-3 text-base font-semibold text-white min-h-[48px] cursor-pointer"
              >
                <FilePlus2 className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>{t.lodge.submitBtn}</span>
              </button>
            </div>
          </form>
        </section>
      )}

      {/* STEP 3: SUCCESS SCREEN */}
      {step === 3 && submittedComplaint && (
        <section className="rounded border border-emerald-300 dark:border-emerald-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-6">
          <div className="flex items-start gap-3">
            <CheckCircle2
              className="h-8 w-8 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {t.lodge.successTitle}
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {t.lodge.successSubtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-4">
            <div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                {t.lodge.complaintIdLabel}
              </div>
              <div className="mt-1 text-lg font-bold text-[#0A2540] dark:text-blue-300 tabular-nums">
                {submittedComplaint.id}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                {t.lodge.routedDeptLabel}
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                {getStaffDisplayName(submittedComplaint.departmentOfficerId, language)}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                {t.lodge.expectedSlaLabel}
              </div>
              <div className="mt-1 text-base font-semibold text-slate-900 dark:text-white tabular-nums">
                {getCategoryConfig(submittedComplaint.category).slaHours} {t.common.hours}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                {t.lodge.dueByLabel}
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-white tabular-nums">
                {formatDateTime(getDueDate(submittedComplaint).toISOString(), language)}
              </div>
            </div>
          </div>

          <p className="text-xs font-medium text-emerald-800 dark:text-emerald-300">
            ✓ {t.lodge.smsSentNotice}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to={`/track?id=${encodeURIComponent(submittedComplaint.id)}`}
              className="inline-flex items-center justify-center gap-2 rounded bg-[#0A2540] hover:bg-[#13385f] dark:bg-blue-700 dark:hover:bg-blue-600 px-5 py-3 text-sm font-semibold text-white min-h-[44px]"
            >
              <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{t.lodge.trackThisBtn}</span>
            </Link>
            <button
              type="button"
              onClick={handleResetForm}
              className="inline-flex items-center justify-center gap-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 min-h-[44px] cursor-pointer"
            >
              <FilePlus2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{t.lodge.lodgeAnotherBtn}</span>
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
