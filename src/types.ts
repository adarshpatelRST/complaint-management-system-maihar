export type Language = 'hi' | 'en';

export type ComplaintStatus =
  | 'Registered'
  | 'Assigned'
  | 'In progress'
  | 'Job done'
  | 'Resolved'
  | 'Closed';

export type CategoryKey =
  | 'water_supply'
  | 'street_light'
  | 'sanitation'
  | 'roads'
  | 'drainage'
  | 'cattle'
  | 'other';

export type OfficerRole = 'Department Officer' | 'Field Staff' | 'CMO' | 'Mayor';

export type EscalationLevel = 0 | 1 | 2 | 3;

export interface Staff {
  id: string;
  userId: string;
  password: string;
  name: string;
  nameHi: string;
  role: OfficerRole;
  departmentNameEn: string;
  departmentNameHi: string;
  categories?: CategoryKey[];
}

export interface ComplaintHistoryEntry {
  time: string;
  status: ComplaintStatus;
  note: string;
  by: string;
  smsSent?: boolean;
}

export interface Complaint {
  id: string;
  mobile: string;
  name: string;
  ward: string;
  category: CategoryKey;
  locationText: string;
  lat?: number;
  lng?: number;
  description: string;
  photo?: string;
  afterPhoto?: string;
  createdAt: string;
  status: ComplaintStatus;
  departmentOfficerId?: string;
  assignedTo?: string;
  rating?: number;
  citizenFeedback?: string;
  history: ComplaintHistoryEntry[];
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
}
