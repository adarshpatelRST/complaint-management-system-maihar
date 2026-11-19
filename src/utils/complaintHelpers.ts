import { CATEGORIES, MAX_PHOTO_SIZE_BYTES, STAFF_LIST, WARDS } from '../constants';
import { TRANSLATIONS } from '../translations';
import { CategoryKey, Complaint, EscalationLevel, Language, Staff } from '../types';

export function getCategoryConfig(key: CategoryKey) {
  return CATEGORIES.find((c) => c.key === key) || CATEGORIES[CATEGORIES.length - 1];
}

export function getDepartmentOfficerForCategory(key: CategoryKey): Staff | undefined {
  const cat = getCategoryConfig(key);
  return STAFF_LIST.find((s) => s.id === cat.departmentOfficerId);
}

export function getWardName(wardId: string, lang: Language): string {
  const ward = WARDS.find((w) => w.id === wardId);
  if (!ward) return wardId;
  return lang === 'hi' ? ward.nameHi : ward.nameEn;
}

export function getStaffMember(staffId?: string): Staff | undefined {
  if (!staffId) return undefined;
  return STAFF_LIST.find((s) => s.id === staffId);
}

export function getStaffDisplayName(staffId: string | undefined, lang: Language): string | undefined {
  const member = getStaffMember(staffId);
  if (!member) return undefined;
  return lang === 'hi' ? member.nameHi : member.name;
}

export function getDueDate(complaint: Complaint): Date {
  const category = getCategoryConfig(complaint.category);
  const createdMs = new Date(complaint.createdAt).getTime();
  return new Date(createdMs + category.slaHours * 60 * 60 * 1000);
}

export function isActiveComplaint(complaint: Complaint): boolean {
  return (
    complaint.status === 'Registered' ||
    complaint.status === 'Assigned' ||
    complaint.status === 'In progress' ||
    complaint.status === 'Job done'
  );
}

export function isComplaintOverdue(complaint: Complaint, nowMs: number = Date.now()): boolean {
  if (!isActiveComplaint(complaint)) return false;
  return nowMs > getDueDate(complaint).getTime();
}

export function getOverdueHours(complaint: Complaint, nowMs: number = Date.now()): number {
  if (!isActiveComplaint(complaint)) return 0;
  const diffMs = nowMs - getDueDate(complaint).getTime();
  if (diffMs <= 0) return 0;
  return Math.round((diffMs / (60 * 60 * 1000)) * 10) / 10;
}

export function getResolutionTimestampMs(complaint: Complaint): number | null {
  const resolvedEntry = [...complaint.history]
    .reverse()
    .find((entry) => entry.status === 'Resolved');
  if (resolvedEntry) {
    return new Date(resolvedEntry.time).getTime();
  }
  if (complaint.status === 'Resolved' || complaint.status === 'Closed') {
    const lastEntry = complaint.history[complaint.history.length - 1];
    if (lastEntry) return new Date(lastEntry.time).getTime();
  }
  return null;
}

export function getResolutionHours(complaint: Complaint): number | null {
  const resolvedMs = getResolutionTimestampMs(complaint);
  if (resolvedMs === null) return null;
  const createdMs = new Date(complaint.createdAt).getTime();
  return Math.max(0.1, Math.round(((resolvedMs - createdMs) / (60 * 60 * 1000)) * 10) / 10);
}

export function wasResolvedWithinSla(complaint: Complaint): boolean | null {
  const resolvedMs = getResolutionTimestampMs(complaint);
  if (resolvedMs === null) return null;
  return resolvedMs <= getDueDate(complaint).getTime();
}

export function getSlaElapsedPercent(complaint: Complaint, nowMs: number = Date.now()): number {
  const category = getCategoryConfig(complaint.category);
  const slaMs = category.slaHours * 60 * 60 * 1000;
  const createdMs = new Date(complaint.createdAt).getTime();
  const endMs = isActiveComplaint(complaint)
    ? nowMs
    : getResolutionTimestampMs(complaint) ?? nowMs;
  const elapsedMs = Math.max(0, endMs - createdMs);
  return Math.round((elapsedMs / slaMs) * 100);
}

export function getEscalationLevel(complaint: Complaint, nowMs: number = Date.now()): EscalationLevel {
  if (!isActiveComplaint(complaint)) return 0;
  const pct = getSlaElapsedPercent(complaint, nowMs);
  if (pct >= 150) return 3;
  if (pct >= 100) return 2;
  if (pct >= 50) return 1;
  return 0;
}

export function formatDateTime(isoString: string, lang: Language): string {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return isoString;
  return date.toLocaleString(lang === 'hi' ? 'hi-IN' : 'en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export async function processImageUpload(
  file: File
): Promise<{ dataUrl?: string; errorKey?: 'photoInvalidType' | 'photoTooLarge' | 'photoReadError' }> {
  if (!file.type.startsWith('image/')) {
    return { errorKey: 'photoInvalidType' };
  }
  if (file.size > MAX_PHOTO_SIZE_BYTES) {
    return { errorKey: 'photoTooLarge' };
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onerror = () => resolve({ errorKey: 'photoReadError' });
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== 'string') {
        resolve({ errorKey: 'photoReadError' });
        return;
      }

      const img = new Image();
      img.onerror = () => resolve({ dataUrl: result });
      img.onload = () => {
        const maxDim = 960;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width >= height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve({ dataUrl: result });
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', 0.72);
        resolve({ dataUrl: compressed.length < result.length ? compressed : result });
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  });
}

function escapeCsvCell(value: string | number | undefined): string {
  const str = value === undefined ? '' : String(value);
  const escaped = str.replace(/"/g, '""');
  return `"${escaped}"`;
}

export function exportComplaintsToCsv(complaints: Complaint[], lang: Language): void {
  const t = TRANSLATIONS[lang];
  const headers = [
    'Complaint ID',
    'Created At',
    'Due Date',
    'Status',
    'Overdue',
    'Escalation Level',
    'Ward',
    'Category',
    'SLA Hours',
    'Location',
    'Latitude',
    'Longitude',
    'Citizen Name',
    'Mobile',
    'Department Officer',
    'Assigned Field Staff',
    'Rating',
    'Description',
  ];

  const rows = complaints.map((c) => {
    const cat = getCategoryConfig(c.category);
    const due = getDueDate(c).toISOString();
    const overdue = isComplaintOverdue(c) ? 'Yes' : 'No';
    const esc = getEscalationLevel(c);
    const deptOfficer =
      getStaffDisplayName(c.departmentOfficerId || cat.departmentOfficerId, lang) || '';
    const staffName = getStaffDisplayName(c.assignedTo, lang) || '';

    return [
      c.id,
      c.createdAt,
      due,
      t.statuses[c.status],
      overdue,
      t.escalation[esc],
      getWardName(c.ward, lang),
      t.categories[c.category],
      cat.slaHours,
      c.locationText,
      c.lat ?? '',
      c.lng ?? '',
      c.name,
      c.mobile,
      deptOfficer,
      staffName,
      c.rating ?? '',
      c.description,
    ]
      .map(escapeCsvCell)
      .join(',');
  });

  const csvContent = '\uFEFF' + [headers.map(escapeCsvCell).join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `maihar-complaints-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
