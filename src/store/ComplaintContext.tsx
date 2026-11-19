import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  STAFF_LIST,
  STORAGE_KEY_AUTH_USER,
  STORAGE_KEY_COMPLAINTS,
  STORAGE_KEY_LANGUAGE,
} from '../constants';
import { createSeedComplaints } from '../data/seedComplaints';
import { TRANSLATIONS, Translations } from '../translations';
import { CategoryKey, Complaint, Language, Staff, ToastMessage } from '../types';
import {
  getCategoryConfig,
  getStaffDisplayName,
  getStaffMember,
} from '../utils/complaintHelpers';

interface NewComplaintInput {
  mobile: string;
  name: string;
  ward: string;
  category: CategoryKey;
  locationText: string;
  lat?: number;
  lng?: number;
  description: string;
  photo?: string;
}

interface ComplaintContextValue {
  complaints: Complaint[];
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  currentUser: Staff | null;
  loginAsStaff: (staffId: string) => void;
  logoutStaff: () => void;
  toasts: ToastMessage[];
  dismissToast: (id: string) => void;
  notifySms: (message: string, title?: string) => void;
  addComplaint: (input: NewComplaintInput) => Complaint;
  assignComplaintByOfficer: (params: {
    id: string;
    fieldStaffId: string;
    remark: string;
    actorLabel: string;
  }) => void;
  acceptRequestByFieldStaff: (params: {
    id: string;
    remark: string;
    actorLabel: string;
  }) => void;
  submitJobDoneByFieldStaff: (params: {
    id: string;
    afterPhoto: string;
    remark: string;
    actorLabel: string;
  }) => void;
  verifyJobByOfficer: (params: {
    id: string;
    approved: boolean;
    remark: string;
    actorLabel: string;
  }) => void;
  submitCitizenFeedback: (params: {
    id: string;
    rating?: number;
    action: 'close' | 'reopen';
    comment?: string;
  }) => void;
  resetDemoData: () => void;
}

const ComplaintContext = createContext<ComplaintContextValue | undefined>(undefined);

function loadInitialComplaints(): Complaint[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COMPLAINTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // Fallback to seed data
  }
  return createSeedComplaints();
}

function loadInitialLanguage(): Language {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LANGUAGE);
    if (raw === 'hi' || raw === 'en') return raw;
  } catch {
    // Ignore storage error
  }
  return 'hi';
}

function loadInitialAuthUser(): Staff | null {
  try {
    const rawId = localStorage.getItem(STORAGE_KEY_AUTH_USER);
    if (rawId) {
      return STAFF_LIST.find((s) => s.id === rawId) || null;
    }
  } catch {
    // Ignore storage error
  }
  return null;
}

export function ComplaintProvider({ children }: { children: React.ReactNode }) {
  const [complaints, setComplaints] = useState<Complaint[]>(loadInitialComplaints);
  const [language, setLanguageState] = useState<Language>(loadInitialLanguage);
  const [currentUser, setCurrentUser] = useState<Staff | null>(loadInitialAuthUser);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const t = TRANSLATIONS[language];

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COMPLAINTS, JSON.stringify(complaints));
    } catch {
      // Ignore quota errors
    }
  }, [complaints]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LANGUAGE, language);
      document.documentElement.lang = language;
    } catch {
      // Ignore storage error
    }
  }, [language]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEY_AUTH_USER, currentUser.id);
      } else {
        localStorage.removeItem(STORAGE_KEY_AUTH_USER);
      }
    } catch {
      // Ignore storage error
    }
  }, [currentUser]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === 'hi' ? 'en' : 'hi'));
  }, []);

  const loginAsStaff = useCallback((staffId: string) => {
    const found = STAFF_LIST.find((s) => s.id === staffId) || null;
    setCurrentUser(found);
  }, []);

  const logoutStaff = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const notifySms = useCallback(
    (message: string, title?: string) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const toastTitle = title || TRANSLATIONS[language].sms.toastTitle;
      setToasts((prev) => [...prev.slice(-3), { id, title: toastTitle, message }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((item) => item.id !== id));
      }, 5000);
    },
    [language]
  );

  const addComplaint = useCallback(
    (input: NewComplaintInput): Complaint => {
      const nowIso = new Date().toISOString();
      const maxNumeric = complaints.reduce((max, c) => {
        const match = c.id.match(/MHR-\d{4}-(\d+)/);
        if (!match) return max;
        const num = parseInt(match[1], 10);
        return Number.isNaN(num) ? max : Math.max(max, num);
      }, 0);
      const nextNum = String(maxNumeric + 1).padStart(4, '0');
      const newId = `MHR-2026-${nextNum}`;

      const catConfig = getCategoryConfig(input.category);
      const deptOfficer = getStaffMember(catConfig.departmentOfficerId);
      const deptOfficerName = deptOfficer
        ? language === 'hi'
          ? deptOfficer.nameHi
          : deptOfficer.name
        : '';

      const initialNote =
        language === 'hi'
          ? `नागरिक द्वारा शिकायत दर्ज की गई एवं ${deptOfficerName} को प्रेषित।`
          : `Complaint registered by citizen and routed to ${deptOfficerName}.`;
      const actor =
        language === 'hi' ? `${input.name} (नागरिक)` : `${input.name} (Citizen)`;

      const newComplaint: Complaint = {
        id: newId,
        mobile: input.mobile,
        name: input.name.trim(),
        ward: input.ward,
        category: input.category,
        locationText: input.locationText.trim(),
        lat: input.lat,
        lng: input.lng,
        description: input.description.trim(),
        photo: input.photo,
        createdAt: nowIso,
        status: 'Registered',
        departmentOfficerId: catConfig.departmentOfficerId,
        history: [
          {
            time: nowIso,
            status: 'Registered',
            note: initialNote,
            by: actor,
            smsSent: true,
          },
        ],
      };

      setComplaints((prev) => [newComplaint, ...prev]);
      notifySms(`${newId} · ${TRANSLATIONS[language].sms.registered}`);
      return newComplaint;
    },
    [complaints, language, notifySms]
  );

  const assignComplaintByOfficer = useCallback(
    ({
      id,
      fieldStaffId,
      remark,
      actorLabel,
    }: {
      id: string;
      fieldStaffId: string;
      remark: string;
      actorLabel: string;
    }) => {
      const nowIso = new Date().toISOString();
      const staffDisplay = getStaffDisplayName(fieldStaffId, language) || fieldStaffId;
      const prefix =
        language === 'hi'
          ? `[आवंटित: ${staffDisplay}] `
          : `[Assigned to: ${staffDisplay}] `;

      setComplaints((prev) =>
        prev.map((c) => {
          if (c.id !== id) return c;
          return {
            ...c,
            assignedTo: fieldStaffId,
            status: 'Assigned',
            history: [
              ...c.history,
              {
                time: nowIso,
                status: 'Assigned',
                note: `${prefix}${remark.trim()}`,
                by: actorLabel,
              },
            ],
          };
        })
      );
      notifySms(`${id} · ${TRANSLATIONS[language].sms.assigned}`);
    },
    [language, notifySms]
  );

  const acceptRequestByFieldStaff = useCallback(
    ({ id, remark, actorLabel }: { id: string; remark: string; actorLabel: string }) => {
      const nowIso = new Date().toISOString();
      setComplaints((prev) =>
        prev.map((c) => {
          if (c.id !== id) return c;
          return {
            ...c,
            status: 'In progress',
            history: [
              ...c.history,
              {
                time: nowIso,
                status: 'In progress',
                note: remark.trim(),
                by: actorLabel,
              },
            ],
          };
        })
      );
      notifySms(`${id} · ${TRANSLATIONS[language].sms.acceptedInProgress}`);
    },
    [language, notifySms]
  );

  const submitJobDoneByFieldStaff = useCallback(
    ({
      id,
      afterPhoto,
      remark,
      actorLabel,
    }: {
      id: string;
      afterPhoto: string;
      remark: string;
      actorLabel: string;
    }) => {
      const nowIso = new Date().toISOString();
      setComplaints((prev) =>
        prev.map((c) => {
          if (c.id !== id) return c;
          return {
            ...c,
            status: 'Job done',
            afterPhoto,
            history: [
              ...c.history,
              {
                time: nowIso,
                status: 'Job done',
                note: remark.trim(),
                by: actorLabel,
              },
            ],
          };
        })
      );
      notifySms(`${id} · ${TRANSLATIONS[language].sms.jobDoneInternal}`);
    },
    [language, notifySms]
  );

  const verifyJobByOfficer = useCallback(
    ({
      id,
      approved,
      remark,
      actorLabel,
    }: {
      id: string;
      approved: boolean;
      remark: string;
      actorLabel: string;
    }) => {
      const nowIso = new Date().toISOString();
      const nextStatus = approved ? 'Resolved' : 'In progress';
      const prefix = approved
        ? language === 'hi'
          ? '[छवि सत्यापन पूर्ण] '
          : '[Images verified] '
        : language === 'hi'
          ? '[सत्यापन अस्वीकृत — पुनः कार्य हेतु प्रेषित] '
          : '[Verification rejected — returned to Field Staff] ';

      setComplaints((prev) =>
        prev.map((c) => {
          if (c.id !== id) return c;
          return {
            ...c,
            status: nextStatus,
            history: [
              ...c.history,
              {
                time: nowIso,
                status: nextStatus,
                note: `${prefix}${remark.trim()}`,
                by: actorLabel,
                smsSent: approved,
              },
            ],
          };
        })
      );

      notifySms(
        `${id} · ${
          approved
            ? TRANSLATIONS[language].sms.resolvedCitizenSms
            : TRANSLATIONS[language].sms.jobRejectedInternal
        }`
      );
    },
    [language, notifySms]
  );

  const submitCitizenFeedback = useCallback(
    ({
      id,
      rating,
      action,
      comment,
    }: {
      id: string;
      rating?: number;
      action: 'close' | 'reopen';
      comment?: string;
    }) => {
      const nowIso = new Date().toISOString();
      setComplaints((prev) =>
        prev.map((c) => {
          if (c.id !== id) return c;
          const citizenActor =
            language === 'hi' ? `${c.name} (नागरिक)` : `${c.name} (Citizen)`;

          if (action === 'close') {
            const noteText = comment?.trim()
              ? language === 'hi'
                ? `नागरिक संतुष्ट (रेटिंग: ${rating}/5) — ${comment.trim()}`
                : `Citizen satisfied (Rating: ${rating}/5) — ${comment.trim()}`
              : language === 'hi'
                ? `नागरिक संतुष्टि (रेटिंग: ${rating}/5) के उपरांत शिकायत बंद की गई।`
                : `Complaint closed after citizen satisfaction (Rating: ${rating}/5).`;

            return {
              ...c,
              status: 'Closed',
              rating,
              citizenFeedback: comment?.trim() || c.citizenFeedback,
              history: [
                ...c.history,
                {
                  time: nowIso,
                  status: 'Closed',
                  note: noteText,
                  by: citizenActor,
                  smsSent: true,
                },
              ],
            };
          }

          const reopenNote =
            language === 'hi'
              ? `नागरिक असंतुष्ट, शिकायत पुनः खोली गई: ${comment?.trim() || ''}`
              : `Not satisfied, reopened by citizen: ${comment?.trim() || ''}`;

          return {
            ...c,
            status: 'Assigned',
            rating: rating ?? c.rating,
            citizenFeedback: comment?.trim() || c.citizenFeedback,
            history: [
              ...c.history,
              {
                time: nowIso,
                status: 'Assigned',
                note: reopenNote,
                by: citizenActor,
                smsSent: true,
              },
            ],
          };
        })
      );

      const smsDict = TRANSLATIONS[language].sms;
      notifySms(`${id} · ${action === 'close' ? smsDict.closed : smsDict.reopened}`);
    },
    [language, notifySms]
  );

  const resetDemoData = useCallback(() => {
    const fresh = createSeedComplaints();
    setComplaints(fresh);
    try {
      localStorage.setItem(STORAGE_KEY_COMPLAINTS, JSON.stringify(fresh));
    } catch {
      // Ignore storage error
    }
    notifySms(TRANSLATIONS[language].resetConfirmed, TRANSLATIONS[language].resetDemoData);
  }, [language, notifySms]);

  return (
    <ComplaintContext.Provider
      value={{
        complaints,
        language,
        setLanguage,
        toggleLanguage,
        t,
        currentUser,
        loginAsStaff,
        logoutStaff,
        toasts,
        dismissToast,
        notifySms,
        addComplaint,
        assignComplaintByOfficer,
        acceptRequestByFieldStaff,
        submitJobDoneByFieldStaff,
        verifyJobByOfficer,
        submitCitizenFeedback,
        resetDemoData,
      }}
    >
      {children}
    </ComplaintContext.Provider>
  );
}

export function useComplaints(): ComplaintContextValue {
  const ctx = useContext(ComplaintContext);
  if (!ctx) {
    throw new Error('useComplaints must be used within a ComplaintProvider');
  }
  return ctx;
}
