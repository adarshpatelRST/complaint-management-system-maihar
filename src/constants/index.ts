import {
  ComplaintCategoryId,
  EscalationLevel,
  OfficerStaff,
  PlaceTypeId,
} from '../types';

// Center coordinates of Maihar, Madhya Pradesh, India
export const MAIHAR_CENTER = {
  lat: 24.2655,
  lng: 80.7585,
};

// Demo OTP constant (REAL INTEGRATION NOTE: Replace with SMS OTP gateway e.g. NIC/MSG91/CDAC SMS service)
export const DEMO_OTP = '1234';

// Sample complaint photos generated locally for demo workflows
export const SAMPLE_PHOTOS = {
  pothole: '/src/assets/images/sample_road_pothole_1795151712181.jpg',
  repairedRoad: '/src/assets/images/sample_road_repaired_1795151722341.jpg',
  garbage: '/src/assets/images/sample_garbage_point_1795151713477.jpg',
  cleanStreet: '/src/assets/images/sample_clean_street_1795151712072.jpg',
};

// Editable municipal wards of Maihar Nagar Palika
export interface WardInfo {
  id: number;
  nameHi: string;
  nameEn: string;
  lat: number;
  lng: number;
}

export const WARDS: WardInfo[] = [
  { id: 1, nameHi: 'वार्ड 1 - शारदा देवी पहाड़ी मार्ग', nameEn: 'Ward 1 - Sharda Devi Hill Road', lat: 24.252, lng: 80.742 },
  { id: 2, nameHi: 'वार्ड 2 - कटनी रोड', nameEn: 'Ward 2 - Katni Road', lat: 24.258, lng: 80.752 },
  { id: 3, nameHi: 'वार्ड 3 - रेलवे स्टेशन क्षेत्र', nameEn: 'Ward 3 - Railway Station Area', lat: 24.263, lng: 80.768 },
  { id: 4, nameHi: 'वार्ड 4 - घंटाघर मुख्य बाजार', nameEn: 'Ward 4 - Ghantaghar Main Market', lat: 24.266, lng: 80.758 },
  { id: 5, nameHi: 'वार्ड 5 - सिविल लाइन', nameEn: 'Ward 5 - Civil Lines', lat: 24.271, lng: 80.755 },
  { id: 6, nameHi: 'वार्ड 6 - अलाउद्दीन खाँ नगर', nameEn: 'Ward 6 - Alauddin Khan Nagar', lat: 24.269, lng: 80.762 },
  { id: 7, nameHi: 'वार्ड 7 - पुराना बस स्टैंड', nameEn: 'Ward 7 - Old Bus Stand', lat: 24.264, lng: 80.754 },
  { id: 8, nameHi: 'वार्ड 8 - देवी जी चौराहा', nameEn: 'Ward 8 - Devi Ji Square', lat: 24.256, lng: 80.748 },
  { id: 9, nameHi: 'वार्ड 9 - सतना रोड', nameEn: 'Ward 9 - Satna Road', lat: 24.275, lng: 80.763 },
  { id: 10, nameHi: 'वार्ड 10 - पटेहरा मोहल्ला', nameEn: 'Ward 10 - Patehra Mohalla', lat: 24.261, lng: 80.761 },
  { id: 11, nameHi: 'वार्ड 11 - हरनामपुर', nameEn: 'Ward 11 - Harnampur', lat: 24.273, lng: 80.749 },
  { id: 12, nameHi: 'वार्ड 12 - सरलानगर रोड', nameEn: 'Ward 12 - Sarlanagar Road', lat: 24.259, lng: 80.772 },
  { id: 13, nameHi: 'वार्ड 13 - किला चौक', nameEn: 'Ward 13 - Qila Chowk', lat: 24.267, lng: 80.751 },
  { id: 14, nameHi: 'वार्ड 14 - नई बस्ती', nameEn: 'Ward 14 - Nai Basti', lat: 24.277, lng: 80.758 },
  { id: 15, nameHi: 'वार्ड 15 - बंधवा टोला', nameEn: 'Ward 15 - Bandhwa Tola', lat: 24.254, lng: 80.764 },
];

// Editable complaint categories and SLA durations (in hours)
export interface CategoryConfig {
  id: ComplaintCategoryId;
  slaHours: number;
  labelHi: string;
  labelEn: string;
  deptHi: string;
  deptEn: string;
}

export const CATEGORIES: CategoryConfig[] = [
  {
    id: 'water',
    slaHours: 48,
    labelHi: 'पेयजल आपूर्ति',
    labelEn: 'Water supply',
    deptHi: 'जल प्रदाय विभाग',
    deptEn: 'Water Works Dept',
  },
  {
    id: 'streetlight',
    slaHours: 72,
    labelHi: 'स्ट्रीट लाइट',
    labelEn: 'Street light',
    deptHi: 'विद्युत शाखा',
    deptEn: 'Electrical Wing',
  },
  {
    id: 'sanitation',
    slaHours: 24,
    labelHi: 'स्वच्छता एवं कचरा',
    labelEn: 'Sanitation',
    deptHi: 'स्वास्थ्य एवं स्वच्छता विभाग',
    deptEn: 'Health & Sanitation Dept',
  },
  {
    id: 'roads',
    slaHours: 120,
    labelHi: 'सड़क मरम्मत',
    labelEn: 'Roads',
    deptHi: 'लोक निर्माण शाखा',
    deptEn: 'Public Works Dept',
  },
  {
    id: 'drainage',
    slaHours: 48,
    labelHi: 'नाली एवं जल निकासी',
    labelEn: 'Drainage',
    deptHi: 'जल निकासी एवं स्वच्छता',
    deptEn: 'Drainage & Sanitation',
  },
  {
    id: 'cattle',
    slaHours: 24,
    labelHi: 'आवारा या घायल पशु',
    labelEn: 'Stray or injured cattle',
    deptHi: 'पशु नियंत्रण दल',
    deptEn: 'Cattle Control Squad',
  },
  {
    id: 'other',
    slaHours: 96,
    labelHi: 'अन्य नगर समस्या',
    labelEn: 'Other',
    deptHi: 'सामान्य प्रशासन',
    deptEn: 'General Administration',
  },
];

export const CATEGORY_SLA_MAP: Record<ComplaintCategoryId, number> = CATEGORIES.reduce(
  (acc, item) => {
    acc[item.id] = item.slaHours;
    return acc;
  },
  {} as Record<ComplaintCategoryId, number>
);

// Escalation thresholds based on % of SLA elapsed for unresolved complaints
export const ESCALATION_THRESHOLDS = {
  dept_head: 50,
  cmo: 100,
  president: 150,
} as const;

export function getEscalationLevel(
  createdAt: string,
  category: ComplaintCategoryId,
  status: string,
  nowMs: number = Date.now()
): EscalationLevel {
  if (status === 'Resolved' || status === 'Closed') return 'none';
  const slaMs = CATEGORY_SLA_MAP[category] * 60 * 60 * 1000;
  const elapsedMs = nowMs - new Date(createdAt).getTime();
  const pct = (elapsedMs / slaMs) * 100;
  if (pct >= ESCALATION_THRESHOLDS.president) return 'president';
  if (pct >= ESCALATION_THRESHOLDS.cmo) return 'cmo';
  if (pct >= ESCALATION_THRESHOLDS.dept_head) return 'dept_head';
  return 'none';
}

export function getSlaInfo(
  createdAt: string,
  category: ComplaintCategoryId,
  status: string,
  nowMs: number = Date.now()
) {
  const slaHours = CATEGORY_SLA_MAP[category];
  const createdMs = new Date(createdAt).getTime();
  const dueMs = createdMs + slaHours * 60 * 60 * 1000;
  const remainingMs = dueMs - nowMs;
  const isClosedOrResolved = status === 'Resolved' || status === 'Closed';
  const isOverdue = !isClosedOrResolved && remainingMs < 0;
  const elapsedPct = Math.round(((nowMs - createdMs) / (slaHours * 60 * 60 * 1000)) * 100);
  return {
    slaHours,
    dueDate: new Date(dueMs),
    remainingMs,
    isOverdue,
    elapsedPct,
  };
}

// Sample field staff (fictional demo names only)
export const OFFICER_STAFF: OfficerStaff[] = [
  { id: 'staff-1', nameHi: 'अरुण कुमार साहू (फील्ड स्टाफ)', nameEn: 'Arun Kumar Sahu (Field Staff)', department: 'sanitation', wards: [1, 2, 3, 4, 8] },
  { id: 'staff-2', nameHi: 'दीपक तिवारी (फील्ड स्टाफ)', nameEn: 'Deepak Tiwari (Field Staff)', department: 'water', wards: [4, 5, 6, 7, 10] },
  { id: 'staff-3', nameHi: 'महेंद्र सिंह (फील्ड स्टाफ)', nameEn: 'Mahendra Singh (Field Staff)', department: 'streetlight', wards: [1, 3, 9, 11, 12] },
  { id: 'staff-4', nameHi: 'कविता पटेल (फील्ड स्टाफ)', nameEn: 'Kavita Patel (Field Staff)', department: 'roads', wards: [2, 5, 13, 14, 15] },
  { id: 'staff-5', nameHi: 'संतोष विश्वकर्मा (फील्ड स्टाफ)', nameEn: 'Santosh Vishwakarma (Field Staff)', department: 'drainage', wards: [6, 7, 8, 10, 13] },
];

// Nearby Place Types (15 categories as specified)
export interface PlaceTypeConfig {
  id: PlaceTypeId;
  labelHi: string;
  labelEn: string;
}

export const PLACE_TYPES: PlaceTypeConfig[] = [
  { id: 'hospital', labelHi: 'अस्पताल', labelEn: 'Hospital' },
  { id: 'blood_bank', labelHi: 'ब्लड बैंक', labelEn: 'Blood bank' },
  { id: 'police', labelHi: 'पुलिस थाना', labelEn: 'Police station' },
  { id: 'bank_atm', labelHi: 'बैंक / एटीएम', labelEn: 'Bank/ATM' },
  { id: 'post_office', labelHi: 'डाकघर', labelEn: 'Post office' },
  { id: 'public_toilet', labelHi: 'सार्वजनिक शौचालय', labelEn: 'Public toilet' },
  { id: 'petrol_pump', labelHi: 'पेट्रोल पंप', labelEn: 'Petrol pump' },
  { id: 'lpg', labelHi: 'एलपीजी गैस', labelEn: 'LPG' },
  { id: 'parking', labelHi: 'पार्किंग', labelEn: 'Parking' },
  { id: 'bus_taxi', labelHi: 'बस / टैक्सी स्टैंड', labelEn: 'Bus/taxi stand' },
  { id: 'school', labelHi: 'विद्यालय', labelEn: 'School' },
  { id: 'library', labelHi: 'पुस्तकालय', labelEn: 'Library' },
  { id: 'market', labelHi: 'बाजार', labelEn: 'Market' },
  { id: 'dharamshala', labelHi: 'धर्मशाला', labelEn: 'Dharamshala' },
  { id: 'hotel', labelHi: 'होटल', labelEn: 'Hotel' },
];

// Emergency Helplines (Obvious sample placeholder numbers — NOT real emergency numbers)
export interface HelplineItem {
  id: string;
  titleHi: string;
  titleEn: string;
  subtitleHi: string;
  subtitleEn: string;
  sampleNumber: string;
  category: 'fire' | 'ambulance' | 'police' | 'municipal' | 'women' | 'electricity';
}

export const HELPLINES: HelplineItem[] = [
  {
    id: 'hl-fire',
    titleHi: 'अग्निशमन (फायर ब्रिगेड)',
    titleEn: 'Fire Brigade',
    subtitleHi: 'आग लगने की आपात स्थिति (नमूना नंबर)',
    subtitleEn: 'Fire emergency response (Sample number)',
    sampleNumber: '1800-000-0101',
    category: 'fire',
  },
  {
    id: 'hl-ambulance',
    titleHi: 'एम्बुलेंस सेवा',
    titleEn: 'Ambulance Service',
    subtitleHi: 'चिकित्सा आपातकाल 24×7 (नमूना नंबर)',
    subtitleEn: 'Medical emergency 24x7 (Sample number)',
    sampleNumber: '1800-000-0108',
    category: 'ambulance',
  },
  {
    id: 'hl-police',
    titleHi: 'पुलिस सहायता',
    titleEn: 'Police Helpline',
    subtitleHi: 'मैहर पुलिस नियंत्रण कक्ष (नमूना नंबर)',
    subtitleEn: 'Maihar police control room (Sample number)',
    sampleNumber: '1800-000-0100',
    category: 'police',
  },
  {
    id: 'hl-municipal',
    titleHi: 'नगर पालिका मैहर कार्यालय',
    titleEn: 'Nagar Palika Office',
    subtitleHi: 'नागरिक सुविधा एवं शिकायत केंद्र (नमूना नंबर)',
    subtitleEn: 'Citizen desk & grievance cell (Sample number)',
    sampleNumber: '07674-000-311',
    category: 'municipal',
  },
  {
    id: 'hl-women',
    titleHi: 'महिला हेल्पलाइन',
    titleEn: 'Women Helpline',
    subtitleHi: 'महिला सुरक्षा एवं परामर्श (नमूना नंबर)',
    subtitleEn: 'Women safety & assistance (Sample number)',
    sampleNumber: '1800-000-1090',
    category: 'women',
  },
  {
    id: 'hl-electricity',
    titleHi: 'विद्युत फॉल्ट शिकायत',
    titleEn: 'Electricity Fault',
    subtitleHi: 'बिजली आपूर्ति एवं ट्रांसफार्मर खराबी (नमूना नंबर)',
    subtitleEn: 'Power outage & transformer fault (Sample number)',
    sampleNumber: '1800-000-1912',
    category: 'electricity',
  },
];
