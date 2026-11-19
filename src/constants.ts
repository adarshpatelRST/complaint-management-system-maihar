import { CategoryKey, ComplaintStatus, Staff } from './types';

/**
 * ============================================================================
 * MAIHAR COMPLAINT PORTAL - CONFIGURATION README
 * ============================================================================
 * How to customize Wards, Categories, SLA Hours, and Municipal Staff:
 *
 * 1. WARDS (`WARDS`):
 *    - Add, remove, or rename entries in the `WARDS` array below.
 *    - Keep `id` stable (e.g., 'ward-1' .. 'ward-15') because stored complaints
 *      reference `ward` by this `id`.
 *
 * 2. CATEGORIES & SLA (`CATEGORIES`):
 *    - Each entry maps a `key` to its Service Level Agreement (`slaHours`),
 *      localized labels (`labelHi`, `labelEn`), and `departmentOfficerId`.
 *    - When a citizen lodges a complaint, it is automatically routed to the
 *      corresponding Department Officer.
 *
 * 3. STAFF LIST (`STAFF_LIST`):
 *    - Contains Department Officers, Field Staff, and CMO test login accounts.
 *    - Department Officers assign complaints to Field Staff; Field Staff accept
 *      requests ('In progress') and upload proof ('Job done'); Department
 *      Officers verify before/after images and mark complaints 'Resolved'.
 *
 * 4. TRANSLATIONS (`src/translations.ts`):
 *    - All UI strings for Hindi (`hi`) and English (`en`) live in one file.
 * ============================================================================
 */

export interface WardConfig {
  id: string;
  number: number;
  nameHi: string;
  nameEn: string;
}

export const WARDS: WardConfig[] = [
  { id: 'ward-1', number: 1, nameHi: 'वार्ड 1 (स्टेशन रोड)', nameEn: 'Ward 1 (Station Road)' },
  { id: 'ward-2', number: 2, nameHi: 'वार्ड 2 (कटरा बाजार)', nameEn: 'Ward 2 (Katra Bazar)' },
  { id: 'ward-3', number: 3, nameHi: 'वार्ड 3 (अलाउद्दीन नगर)', nameEn: 'Ward 3 (Alauddin Nagar)' },
  { id: 'ward-4', number: 4, nameHi: 'वार्ड 4 (सिविल लाइन)', nameEn: 'Ward 4 (Civil Line)' },
  { id: 'ward-5', number: 5, nameHi: 'वार्ड 5 (देवी जी मार्ग)', nameEn: 'Ward 5 (Devi Ji Marg)' },
  { id: 'ward-6', number: 6, nameHi: 'वार्ड 6 (चंडी मंदिर क्षेत्र)', nameEn: 'Ward 6 (Chandi Mandir Area)' },
  { id: 'ward-7', number: 7, nameHi: 'वार्ड 7 (पुरानी बस्ती)', nameEn: 'Ward 7 (Purani Basti)' },
  { id: 'ward-8', number: 8, nameHi: 'वार्ड 8 (गांधी चौक)', nameEn: 'Ward 8 (Gandhi Chowk)' },
  { id: 'ward-9', number: 9, nameHi: 'वार्ड 9 (रामनगर रोड)', nameEn: 'Ward 9 (Ramnagar Road)' },
  { id: 'ward-10', number: 10, nameHi: 'वार्ड 10 (सरलानगर)', nameEn: 'Ward 10 (Sarlanagar)' },
  { id: 'ward-11', number: 11, nameHi: 'वार्ड 11 (उदयपुर कॉलोनी)', nameEn: 'Ward 11 (Udaipur Colony)' },
  { id: 'ward-12', number: 12, nameHi: 'वार्ड 12 (पटेहरा)', nameEn: 'Ward 12 (Patehra)' },
  { id: 'ward-13', number: 13, nameHi: 'वार्ड 13 (हरनामपुर)', nameEn: 'Ward 13 (Harnampur)' },
  { id: 'ward-14', number: 14, nameHi: 'वार्ड 14 (सतना रोड)', nameEn: 'Ward 14 (Satna Road)' },
  { id: 'ward-15', number: 15, nameHi: 'वार्ड 15 (ओवरब्रिज क्षेत्र)', nameEn: 'Ward 15 (Overbridge Area)' },
];

export interface CategoryConfig {
  key: CategoryKey;
  slaHours: number;
  labelHi: string;
  labelEn: string;
  departmentOfficerId: string;
}

export const CATEGORIES: CategoryConfig[] = [
  {
    key: 'water_supply',
    slaHours: 48,
    labelHi: 'पेयजल आपूर्ति',
    labelEn: 'Water supply',
    departmentOfficerId: 'staff-do-water',
  },
  {
    key: 'street_light',
    slaHours: 72,
    labelHi: 'स्ट्रीट लाइट',
    labelEn: 'Street light',
    departmentOfficerId: 'staff-do-electrical',
  },
  {
    key: 'sanitation',
    slaHours: 24,
    labelHi: 'स्वच्छता / कचरा',
    labelEn: 'Sanitation / garbage',
    departmentOfficerId: 'staff-do-sanitation',
  },
  {
    key: 'roads',
    slaHours: 120,
    labelHi: 'सड़क / गड्ढे',
    labelEn: 'Roads / potholes',
    departmentOfficerId: 'staff-do-civil',
  },
  {
    key: 'drainage',
    slaHours: 48,
    labelHi: 'नाली / जलभराव',
    labelEn: 'Drainage / water-logging',
    departmentOfficerId: 'staff-do-civil',
  },
  {
    key: 'cattle',
    slaHours: 24,
    labelHi: 'आवारा या घायल मवेशी',
    labelEn: 'Stray or injured cattle',
    departmentOfficerId: 'staff-do-sanitation',
  },
  {
    key: 'other',
    slaHours: 96,
    labelHi: 'अन्य नागरिक समस्या',
    labelEn: 'Other',
    departmentOfficerId: 'staff-do-civil',
  },
];

export const COMPLAINT_STATUSES: ComplaintStatus[] = [
  'Registered',
  'Assigned',
  'In progress',
  'Job done',
  'Resolved',
  'Closed',
];

// Demo-only staff & official test login accounts (no real personal data)
export const STAFF_LIST: Staff[] = [
  // Department Officers
  {
    id: 'staff-do-sanitation',
    userId: 'sanitation.officer',
    password: 'Password@123',
    name: 'Rajendra Verma (Sanitation Officer)',
    nameHi: 'राजेंद्र वर्मा (स्वच्छता अधिकारी)',
    role: 'Department Officer',
    departmentNameEn: 'Sanitation & Cattle Dept',
    departmentNameHi: 'स्वच्छता एवं पशु नियंत्रण विभाग',
    categories: ['sanitation', 'cattle'],
  },
  {
    id: 'staff-do-water',
    userId: 'water.officer',
    password: 'Password@123',
    name: 'Prakash Mishra (Water Works Officer)',
    nameHi: 'प्रकाश मिश्रा (जल प्रदाय अधिकारी)',
    role: 'Department Officer',
    departmentNameEn: 'Water Supply Dept',
    departmentNameHi: 'पेयजल आपूर्ति विभाग',
    categories: ['water_supply'],
  },
  {
    id: 'staff-do-electrical',
    userId: 'electrical.officer',
    password: 'Password@123',
    name: 'Sanjay Dubey (Electrical Officer)',
    nameHi: 'संजय दुबे (विद्युत विभाग अधिकारी)',
    role: 'Department Officer',
    departmentNameEn: 'Street Light & Electrical Dept',
    departmentNameHi: 'स्ट्रीट लाइट एवं विद्युत विभाग',
    categories: ['street_light'],
  },
  {
    id: 'staff-do-civil',
    userId: 'civil.officer',
    password: 'Password@123',
    name: 'Vinod Sharma (Civil Sub-Engineer)',
    nameHi: 'विनोद शर्मा (सिविल उप-यंत्री)',
    role: 'Department Officer',
    departmentNameEn: 'Roads, Drainage & General Works',
    departmentNameHi: 'सड़क, नाली एवं सामान्य निर्माण विभाग',
    categories: ['roads', 'drainage', 'other'],
  },

  // Field Staff
  {
    id: 'staff-fs-1',
    userId: 'ramesh.fs',
    password: 'Password@123',
    name: 'Ramesh Tiwari (Sanitation Supervisor)',
    nameHi: 'रमेश तिवारी (स्वच्छता पर्यवेक्षक)',
    role: 'Field Staff',
    departmentNameEn: 'Sanitation & Cattle Dept',
    departmentNameHi: 'स्वच्छता एवं पशु नियंत्रण विभाग',
    categories: ['sanitation', 'cattle'],
  },
  {
    id: 'staff-fs-2',
    userId: 'suresh.fs',
    password: 'Password@123',
    name: 'Suresh Patel (Water Works Lineman)',
    nameHi: 'सुरेश पटेल (जल प्रदाय लाइनमैन)',
    role: 'Field Staff',
    departmentNameEn: 'Water Supply Dept',
    departmentNameHi: 'पेयजल आपूर्ति विभाग',
    categories: ['water_supply'],
  },
  {
    id: 'staff-fs-3',
    userId: 'anil.fs',
    password: 'Password@123',
    name: 'Anil Vishwakarma (Electrical Technician)',
    nameHi: 'अनिल विश्वकर्मा (विद्युत तकनीशियन)',
    role: 'Field Staff',
    departmentNameEn: 'Street Light & Electrical Dept',
    departmentNameHi: 'स्ट्रीट लाइट एवं विद्युत विभाग',
    categories: ['street_light'],
  },
  {
    id: 'staff-fs-4',
    userId: 'mahesh.fs',
    password: 'Password@123',
    name: 'Mahesh Kushwaha (Civil & Drainage Overseer)',
    nameHi: 'महेश कुशवाहा (सिविल एवं नाली निरीक्षक)',
    role: 'Field Staff',
    departmentNameEn: 'Roads, Drainage & General Works',
    departmentNameHi: 'सड़क, नाली एवं सामान्य निर्माण विभाग',
    categories: ['roads', 'drainage', 'other'],
  },

  // Chief Municipal Officer (CMO) & Mayor
  {
    id: 'staff-cmo-1',
    userId: 'cmo',
    password: 'Password@123',
    name: 'Chief Municipal Officer (CMO)',
    nameHi: 'मुख्य नगर पालिका अधिकारी (CMO)',
    role: 'CMO',
    departmentNameEn: 'All Municipal Departments',
    departmentNameHi: 'समस्त नगर पालिका विभाग',
  },
  {
    id: 'staff-mayor-1',
    userId: 'mayor',
    password: 'Password@123',
    name: 'Mayor / Nagar Palika President (Demo)',
    nameHi: 'महापौर / नगर पालिका अध्यक्ष (डेमो)',
    role: 'Mayor',
    departmentNameEn: 'Executive Oversight & Analytics',
    departmentNameHi: 'शीर्ष प्रशासनिक निगरानी एवं एनालिटिक्स',
  },
];

export const DEMO_OTP = '1234';
export const MAX_PHOTO_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB
export const STORAGE_KEY_COMPLAINTS = 'maihar_portal_complaints_v2';
export const STORAGE_KEY_LANGUAGE = 'maihar_portal_lang_v1';
export const STORAGE_KEY_AUTH_USER = 'maihar_portal_auth_user_v1';
