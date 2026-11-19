import { Complaint } from '../types';

function hoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
}

function makeSamplePhotoSvg(
  headerLabel: string,
  titleHi: string,
  subtitleHi: string,
  statusLine: string,
  accentHex: string
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="300" viewBox="0 0 480 300">
    <rect width="480" height="300" fill="#f1f5f9"/>
    <rect x="20" y="20" width="440" height="260" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
    <rect x="20" y="20" width="440" height="44" fill="${accentHex}"/>
    <text x="36" y="48" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ffffff">${headerLabel}</text>
    <rect x="44" y="88" width="160" height="120" rx="4" fill="#e2e8f0" stroke="#94a3b8"/>
    <line x1="44" y1="88" x2="204" y2="208" stroke="#94a3b8" stroke-width="1.5"/>
    <line x1="204" y1="88" x2="44" y2="208" stroke="#94a3b8" stroke-width="1.5"/>
    <text x="124" y="153" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#475569">स्थल फोटो (Sample)</text>
    <text x="224" y="122" font-family="sans-serif" font-size="16" font-weight="bold" fill="#0f172a">${titleHi}</text>
    <text x="224" y="152" font-family="sans-serif" font-size="13" fill="#334155">${subtitleHi}</text>
    <text x="224" y="188" font-family="sans-serif" font-size="12" fill="${accentHex}">${statusLine}</text>
    <text x="36" y="258" font-family="sans-serif" font-size="12" fill="#64748b">Maihar Nagar Palika Demo Photo Placeholder</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/**
 * 12 realistic sample complaints in Hindi spread over the last 10 days.
 * Reflects the full hierarchy:
 *   Registered (Dept Officer) -> Assigned (Field Staff) -> In progress -> Job done (Back to Dept Officer) -> Resolved (Citizen SMS & Feedback) -> Closed
 */
export function createSeedComplaints(): Complaint[] {
  return [
    // 1. Overdue Level 3: Sanitation 24h SLA, created 96h ago, Assigned to Field Staff (waiting accept)
    {
      id: 'MHR-2026-0001',
      mobile: '9800000001',
      name: 'राजेश कुमार शर्मा',
      ward: 'ward-2',
      category: 'sanitation',
      locationText: 'कटरा बाजार, पुराना डाकघर के सामने',
      lat: 24.2654,
      lng: 80.7591,
      description:
        'पिछले चार दिनों से कचरा गाड़ी नहीं आई है, मुख्य मार्ग के पास कचरे का ढेर लगा हुआ है जिससे दुर्गंध फैल रही है।',
      photo: makeSamplePhotoSvg(
        'नागरिक शिकायत फोटो (Before)',
        'कचरे का ढेर जमा है',
        'वार्ड 2 · कटरा बाजार',
        'स्थिति: निवारण लंबित',
        '#b91c1c'
      ),
      createdAt: hoursAgo(96),
      status: 'Assigned',
      departmentOfficerId: 'staff-do-sanitation',
      assignedTo: 'staff-fs-1',
      history: [
        {
          time: hoursAgo(96),
          status: 'Registered',
          note: 'नागरिक द्वारा पोर्टल पर शिकायत दर्ज की गई एवं स्वच्छता विभाग अधिकारी को प्रेषित।',
          by: 'राजेश कुमार शर्मा (नागरिक)',
          smsSent: true,
        },
        {
          time: hoursAgo(88),
          status: 'Assigned',
          note: 'स्वच्छता पर्यवेक्षक रमेश तिवारी को सफाई कार्य हेतु आवंटित।',
          by: 'राजेंद्र वर्मा (स्वच्छता अधिकारी)',
        },
      ],
    },

    // 2. Overdue Level 3: Water supply 48h SLA, created 110h ago, In progress with Field Staff
    {
      id: 'MHR-2026-0002',
      mobile: '9800000002',
      name: 'सुनीता देवी पटेल',
      ward: 'ward-5',
      category: 'water_supply',
      locationText: 'देवी जी मार्ग, गली नंबर 3, सामुदायिक भवन के पास',
      lat: 24.2621,
      lng: 80.7478,
      description:
        'मुख्य पाइपलाइन में लीकेज के कारण पिछले 4 दिनों से घरों में गंदा और कम दबाव से पानी आ रहा है।',
      photo: makeSamplePhotoSvg(
        'नागरिक शिकायत फोटो (Before)',
        'पाइपलाइन लीकेज समस्या',
        'वार्ड 5 · देवी जी मार्ग',
        'स्थिति: पानी बह रहा है',
        '#b45309'
      ),
      createdAt: hoursAgo(110),
      status: 'In progress',
      departmentOfficerId: 'staff-do-water',
      assignedTo: 'staff-fs-2',
      history: [
        {
          time: hoursAgo(110),
          status: 'Registered',
          note: 'नागरिक द्वारा पेयजल आपूर्ति समस्या दर्ज की गई एवं जल प्रदाय अधिकारी को प्रेषित।',
          by: 'सुनीता देवी पटेल (नागरिक)',
          smsSent: true,
        },
        {
          time: hoursAgo(102),
          status: 'Assigned',
          note: 'जल प्रदाय लाइनमैन सुरेश पटेल को निरीक्षण के लिए भेजा गया।',
          by: 'प्रकाश मिश्रा (जल प्रदाय अधिकारी)',
        },
        {
          time: hoursAgo(62),
          status: 'In progress',
          note: 'अनुरोध स्वीकार किया गया। पाइपलाइन जॉइंट की खुदाई शुरू की गई है।',
          by: 'सुरेश पटेल (जल प्रदाय लाइनमैन)',
        },
      ],
    },

    // 3. Overdue Level 2: Drainage 48h SLA, created 60h ago, Registered (at Civil Dept Officer)
    {
      id: 'MHR-2026-0003',
      mobile: '9800000003',
      name: 'मोहम्मद इरफान अंसारी',
      ward: 'ward-3',
      category: 'drainage',
      locationText: 'अलाउद्दीन नगर, मस्जिद चौराहा',
      description:
        'सड़क किनारे की नाली चोक होने से गंदा पानी सड़क पर बह रहा है, पैदल चलना मुश्किल हो गया है।',
      createdAt: hoursAgo(60),
      status: 'Registered',
      departmentOfficerId: 'staff-do-civil',
      history: [
        {
          time: hoursAgo(60),
          status: 'Registered',
          note: 'नागरिक द्वारा जलभराव की शिकायत दर्ज की गई एवं सिविल विभाग अधिकारी को प्रेषित।',
          by: 'मोहम्मद इरफान अंसारी (नागरिक)',
          smsSent: true,
        },
      ],
    },

    // 4. Resolved (Officer verified both images & sent SMS to citizen; awaiting feedback)
    {
      id: 'MHR-2026-0004',
      mobile: '9800000004',
      name: 'अनीता गुप्ता',
      ward: 'ward-1',
      category: 'street_light',
      locationText: 'स्टेशन रोड, बस स्टैंड प्रवेश द्वार के पास',
      lat: 24.2672,
      lng: 80.7615,
      description:
        'मुख्य सड़क के दो बिजली खंभों की स्ट्रीट लाइट एक सप्ताह से बंद है, रात में अंधेरा रहता है।',
      photo: makeSamplePhotoSvg(
        'नागरिक शिकायत फोटो (Before)',
        'बंद स्ट्रीट लाइट',
        'वार्ड 1 · स्टेशन रोड खंभा #14-15',
        'रात में लाइट बंद थी',
        '#475569'
      ),
      afterPhoto: makeSamplePhotoSvg(
        'फील्ड स्टाफ प्रमाण (After)',
        'स्ट्रीट लाइट मरम्मत पूर्ण',
        'वार्ड 1 · स्टेशन रोड खंभा #14-15',
        'नई 45W LED लाइट चालू',
        '#15803d'
      ),
      createdAt: hoursAgo(84),
      status: 'Resolved',
      departmentOfficerId: 'staff-do-electrical',
      assignedTo: 'staff-fs-3',
      history: [
        {
          time: hoursAgo(84),
          status: 'Registered',
          note: 'स्ट्रीट लाइट बंद होने की शिकायत दर्ज एवं विद्युत अधिकारी को प्रेषित।',
          by: 'अनीता गुप्ता (नागरिक)',
          smsSent: true,
        },
        {
          time: hoursAgo(76),
          status: 'Assigned',
          note: 'विद्युत तकनीशियन अनिल विश्वकर्मा को आवंटित।',
          by: 'संजय दुबे (विद्युत विभाग अधिकारी)',
        },
        {
          time: hoursAgo(50),
          status: 'In progress',
          note: 'अनुरोध स्वीकार किया गया। खराब एलईडी ड्राइवर की जांच की जा रही है।',
          by: 'अनिल विश्वकर्मा (विद्युत तकनीशियन)',
        },
        {
          time: hoursAgo(42),
          status: 'Job done',
          note: 'दोनों खंभों में नई 45W एलईडी लाइट लगाकर फोटो सत्यापन हेतु भेजी गई।',
          by: 'अनिल विश्वकर्मा (विद्युत तकनीशियन)',
        },
        {
          time: hoursAgo(38),
          status: 'Resolved',
          note: 'विभाग अधिकारी द्वारा पहले व बाद की फोटो सत्यापित कर शिकायत निराकृत घोषित। नागरिक को SMS भेजा गया।',
          by: 'संजय दुबे (विद्युत विभाग अधिकारी)',
          smsSent: true,
        },
      ],
    },

    // 5. Resolved (Sanitation, verified by officer, awaiting citizen feedback)
    {
      id: 'MHR-2026-0005',
      mobile: '9800000005',
      name: 'प्रमोद सिंह बघेल',
      ward: 'ward-8',
      category: 'sanitation',
      locationText: 'गांधी चौक, सब्जी मंडी मोड़',
      description: 'सब्जी मंडी मोड़ पर कचरा पेटी भर जाने से आसपास गंदगी फैली हुई है।',
      photo: makeSamplePhotoSvg(
        'नागरिक शिकायत फोटो (Before)',
        'ओवरफ्लो कचरा पेटी',
        'वार्ड 8 · गांधी चौक',
        'कचरा बाहर फैला हुआ था',
        '#b91c1c'
      ),
      afterPhoto: makeSamplePhotoSvg(
        'फील्ड स्टाफ प्रमाण (After)',
        'सफाई एवं कचरा उठाव पूर्ण',
        'वार्ड 8 · गांधी चौक मंडी मोड़',
        'सफाई व चूना छिड़काव पूर्ण',
        '#15803d'
      ),
      createdAt: hoursAgo(42),
      status: 'Resolved',
      departmentOfficerId: 'staff-do-sanitation',
      assignedTo: 'staff-fs-1',
      history: [
        {
          time: hoursAgo(42),
          status: 'Registered',
          note: 'कचरा उठाव हेतु शिकायत पंजीकृत।',
          by: 'प्रमोद सिंह बघेल (नागरिक)',
          smsSent: true,
        },
        {
          time: hoursAgo(39),
          status: 'Assigned',
          note: 'रमेश तिवारी को तत्काल सफाई निर्देश जारी।',
          by: 'राजेंद्र वर्मा (स्वच्छता अधिकारी)',
        },
        {
          time: hoursAgo(33),
          status: 'In progress',
          note: 'सफाई वाहन व दल स्थल पर पहुंचा।',
          by: 'रमेश तिवारी (स्वच्छता पर्यवेक्षक)',
        },
        {
          time: hoursAgo(27),
          status: 'Job done',
          note: 'ट्रैक्टर-ट्रॉली से कचरा उठवाकर फोटो अपलोड की गई।',
          by: 'रमेश तिवारी (स्वच्छता पर्यवेक्षक)',
        },
        {
          time: hoursAgo(24),
          status: 'Resolved',
          note: 'पहले व बाद की छवि सत्यापित। कार्य पूर्ण होने का SMS नागरिक को भेजा गया।',
          by: 'राजेंद्र वर्मा (स्वच्छता अधिकारी)',
          smsSent: true,
        },
      ],
    },

    // 6. Closed with rating 5
    {
      id: 'MHR-2026-0006',
      mobile: '9800000006',
      name: 'विवेक कुमार मिश्रा',
      ward: 'ward-4',
      category: 'water_supply',
      locationText: 'सिविल लाइन, शासकीय अस्पताल रोड',
      description: 'हैंडपंप का वाशर खराब होने के कारण पानी नहीं निकल रहा है।',
      createdAt: hoursAgo(216),
      status: 'Closed',
      departmentOfficerId: 'staff-do-water',
      assignedTo: 'staff-fs-2',
      rating: 5,
      citizenFeedback: 'बहुत त्वरित कार्रवाई हुई, हैंडपंप अब सही चल रहा है।',
      afterPhoto: makeSamplePhotoSvg(
        'फील्ड स्टाफ प्रमाण (After)',
        'हैंडपंप मरम्मत कार्य पूर्ण',
        'वार्ड 4 · सिविल लाइन',
        'पानी सुचारु रूप से आ रहा है',
        '#0f766e'
      ),
      history: [
        {
          time: hoursAgo(216),
          status: 'Registered',
          note: 'हैंडपंप खराब होने की शिकायत दर्ज।',
          by: 'विवेक कुमार मिश्रा (नागरिक)',
          smsSent: true,
        },
        {
          time: hoursAgo(208),
          status: 'Assigned',
          note: 'सुरेश पटेल को मरम्मत कार्य सौंपा गया।',
          by: 'प्रकाश मिश्रा (जल प्रदाय अधिकारी)',
        },
        {
          time: hoursAgo(196),
          status: 'In progress',
          note: 'स्थल निरीक्षण व नया वाशर लगाने का कार्य प्रारंभ।',
          by: 'सुरेश पटेल (जल प्रदाय लाइनमैन)',
        },
        {
          time: hoursAgo(188),
          status: 'Job done',
          note: 'नया सिलेंडर व वाशर बदलकर हैंडपंप चालू किया गया व फोटो भेजी गई।',
          by: 'सुरेश पटेल (जल प्रदाय लाइनमैन)',
        },
        {
          time: hoursAgo(186),
          status: 'Resolved',
          note: 'अधिकारी द्वारा फोटो सत्यापित एवं निराकृत घोषित।',
          by: 'प्रकाश मिश्रा (जल प्रदाय अधिकारी)',
          smsSent: true,
        },
        {
          time: hoursAgo(172),
          status: 'Closed',
          note: 'नागरिक संतुष्टि (रेटिंग: 5/5) के उपरांत शिकायत बंद।',
          by: 'विवेक कुमार मिश्रा (नागरिक)',
          smsSent: true,
        },
      ],
    },

    // 7. Closed with rating 4
    {
      id: 'MHR-2026-0007',
      mobile: '9800000007',
      name: 'कमलेश प्रसाद यादव',
      ward: 'ward-10',
      category: 'cattle',
      locationText: 'सरलानगर, मुख्य सीमेंट रोड',
      description: 'सड़क पर एक आवारा बैल के पैर में चोट लगी है और यातायात बाधित हो रहा है।',
      createdAt: hoursAgo(168),
      status: 'Closed',
      departmentOfficerId: 'staff-do-sanitation',
      assignedTo: 'staff-fs-1',
      rating: 4,
      citizenFeedback: 'टीम समय पर पहुंची और मवेशी को सुरक्षित गौशाला भेजा गया।',
      afterPhoto: makeSamplePhotoSvg(
        'फील्ड स्टाफ प्रमाण (After)',
        'मवेशी सुरक्षित गौशाला प्रेषित',
        'वार्ड 10 · सरलानगर',
        'पशु चिकित्सा व यातायात सुचारु',
        '#15803d'
      ),
      history: [
        {
          time: hoursAgo(168),
          status: 'Registered',
          note: 'घायल मवेशी सहायता शिकायत दर्ज।',
          by: 'कमलेश प्रसाद यादव (नागरिक)',
          smsSent: true,
        },
        {
          time: hoursAgo(165),
          status: 'Assigned',
          note: 'रमेश तिवारी व कांजी हाउस दल को आवंटित।',
          by: 'राजेंद्र वर्मा (स्वच्छता अधिकारी)',
        },
        {
          time: hoursAgo(158),
          status: 'In progress',
          note: 'वाहन सहित टीम मौके पर पहुंची।',
          by: 'रमेश तिवारी (स्वच्छता पर्यवेक्षक)',
        },
        {
          time: hoursAgo(154),
          status: 'Job done',
          note: 'मवेशी को प्राथमिक उपचार कर गौशाला पहुंचाया गया, फोटो अपलोड।',
          by: 'रमेश तिवारी (स्वच्छता पर्यवेक्षक)',
        },
        {
          time: hoursAgo(152),
          status: 'Resolved',
          note: 'सत्यापन उपरांत शिकायत निराकृत।',
          by: 'राजेंद्र वर्मा (स्वच्छता अधिकारी)',
          smsSent: true,
        },
        {
          time: hoursAgo(144),
          status: 'Closed',
          note: 'नागरिक द्वारा रेटिंग 4/5 देकर शिकायत बंद की गई।',
          by: 'कमलेश प्रसाद यादव (नागरिक)',
          smsSent: true,
        },
      ],
    },

    // 8. Job done (Awaiting Civil Department Officer verification!) — Roads 120h SLA, 72h elapsed
    {
      id: 'MHR-2026-0008',
      mobile: '9800000008',
      name: 'दीपक सोनी',
      ward: 'ward-14',
      category: 'roads',
      locationText: 'सतना रोड, पेट्रोल पंप के सामने',
      description: 'सड़क के बीच में बड़ा गड्ढा हो गया है जिससे दोपहिया वाहन चालक गिर रहे हैं।',
      photo: makeSamplePhotoSvg(
        'नागरिक शिकायत फोटो (Before)',
        'सड़क पर गहरा गड्ढा',
        'वार्ड 14 · सतना रोड',
        'यातायात हेतु असुरक्षित',
        '#b91c1c'
      ),
      afterPhoto: makeSamplePhotoSvg(
        'फील्ड स्टाफ प्रमाण (After)',
        'गड्ढा पैच वर्क पूर्ण',
        'वार्ड 14 · सतना रोड',
        'डामर/गिट्टी से समतलीकरण पूर्ण',
        '#15803d'
      ),
      createdAt: hoursAgo(72),
      status: 'Job done',
      departmentOfficerId: 'staff-do-civil',
      assignedTo: 'staff-fs-4',
      history: [
        {
          time: hoursAgo(72),
          status: 'Registered',
          note: 'सड़क गड्ढे की शिकायत दर्ज एवं सिविल उप-यंत्री को प्रेषित।',
          by: 'दीपक सोनी (नागरिक)',
          smsSent: true,
        },
        {
          time: hoursAgo(64),
          status: 'Assigned',
          note: 'सिविल निरीक्षक महेश कुशवाहा को पैच वर्क हेतु आवंटित।',
          by: 'विनोद शर्मा (सिविल उप-यंत्री)',
        },
        {
          time: hoursAgo(40),
          status: 'In progress',
          note: 'अनुरोध स्वीकार किया गया। सामग्री के साथ पैच मरम्मत कार्य प्रारंभ।',
          by: 'महेश कुशवाहा (सिविल एवं नाली निरीक्षक)',
        },
        {
          time: hoursAgo(6),
          status: 'Job done',
          note: 'गड्ढा भरकर सड़क समतल कर दी गई है। सत्यापन हेतु फोटो संलग्न है।',
          by: 'महेश कुशवाहा (सिविल एवं नाली निरीक्षक)',
        },
      ],
    },

    // 9. Job done (Awaiting Electrical Department Officer verification!) — Street light 72h SLA, 28h elapsed
    {
      id: 'MHR-2026-0009',
      mobile: '9800000009',
      name: 'संध्या द्विवेदी',
      ward: 'ward-6',
      category: 'street_light',
      locationText: 'चंडी मंदिर क्षेत्र, प्राथमिक शाला के पास',
      description: 'स्कूल के पास ट्रांसफार्मर लाइन से जुड़ा स्ट्रीट लाइट फेज बार-बार ट्रिप हो रहा है।',
      photo: makeSamplePhotoSvg(
        'नागरिक शिकायत फोटो (Before)',
        'ट्रिप होता स्ट्रीट लाइट फेज',
        'वार्ड 6 · चंडी मंदिर क्षेत्र',
        'जंक्शन बॉक्स में स्पार्किंग',
        '#b45309'
      ),
      afterPhoto: makeSamplePhotoSvg(
        'फील्ड स्टाफ प्रमाण (After)',
        'केबल व स्विच मरम्मत पूर्ण',
        'वार्ड 6 · चंडी मंदिर क्षेत्र',
        'नया MCB व टाइमर स्विच स्थापित',
        '#15803d'
      ),
      createdAt: hoursAgo(28),
      status: 'Job done',
      departmentOfficerId: 'staff-do-electrical',
      assignedTo: 'staff-fs-3',
      history: [
        {
          time: hoursAgo(28),
          status: 'Registered',
          note: 'शिकायत पंजीकृत की गई।',
          by: 'संध्या द्विवेदी (नागरिक)',
          smsSent: true,
        },
        {
          time: hoursAgo(20),
          status: 'Assigned',
          note: 'अनिल विश्वकर्मा को आवंटित।',
          by: 'संजय दुबे (विद्युत विभाग अधिकारी)',
        },
        {
          time: hoursAgo(12),
          status: 'In progress',
          note: 'अनुरोध स्वीकार, केबल जॉइंट जांच प्रारंभ।',
          by: 'अनिल विश्वकर्मा (विद्युत तकनीशियन)',
        },
        {
          time: hoursAgo(4),
          status: 'Job done',
          note: 'नया टाइमर स्विच व MCB लगाकर लाइट परीक्षण पूर्ण। अधिकारी सत्यापन प्रतीक्षारत।',
          by: 'अनिल विश्वकर्मा (विद्युत तकनीशियन)',
        },
      ],
    },

    // 10. Active Registered within SLA: Drainage 48h SLA, created 12h ago (waiting Civil Officer assignment)
    {
      id: 'MHR-2026-0010',
      mobile: '9800000010',
      name: 'हरीश चंद्र वर्मा',
      ward: 'ward-7',
      category: 'drainage',
      locationText: 'पुरानी बस्ती, कुम्हार मोहल्ला',
      description: 'नाली की जाली टूट जाने से नाली में प्लास्टिक भर रहा है और पानी बाहर निकल रहा है।',
      createdAt: hoursAgo(12),
      status: 'Registered',
      departmentOfficerId: 'staff-do-civil',
      history: [
        {
          time: hoursAgo(12),
          status: 'Registered',
          note: 'नागरिक द्वारा नाली मरम्मत की शिकायत दर्ज एवं सिविल उप-यंत्री को प्रेषित।',
          by: 'हरीश चंद्र वर्मा (नागरिक)',
          smsSent: true,
        },
      ],
    },

    // 11. Active Assigned within SLA: Water supply 48h SLA, created 16h ago (waiting Suresh Patel accept)
    {
      id: 'MHR-2026-0011',
      mobile: '9800000011',
      name: 'ममता केसरवानी',
      ward: 'ward-11',
      category: 'water_supply',
      locationText: 'उदयपुर कॉलोनी, सामुदायिक पार्क गेट',
      description: 'पार्क के बाहर सार्वजनिक नल का वॉल्व टूटने से सुबह पानी बर्बाद हो रहा है।',
      createdAt: hoursAgo(16),
      status: 'Assigned',
      departmentOfficerId: 'staff-do-water',
      assignedTo: 'staff-fs-2',
      history: [
        {
          time: hoursAgo(16),
          status: 'Registered',
          note: 'जल रिसाव हेतु शिकायत दर्ज एवं जल प्रदाय अधिकारी को प्रेषित।',
          by: 'ममता केसरवानी (नागरिक)',
          smsSent: true,
        },
        {
          time: hoursAgo(10),
          status: 'Assigned',
          note: 'जल प्रदाय लाइनमैन सुरेश पटेल को वॉल्व बदलने हेतु आवंटित।',
          by: 'प्रकाश मिश्रा (जल प्रदाय अधिकारी)',
        },
      ],
    },

    // 12. Closed within SLA (recent): Sanitation 24h SLA, created 140h ago
    {
      id: 'MHR-2026-0012',
      mobile: '9800000001',
      name: 'राजेश कुमार शर्मा',
      ward: 'ward-15',
      category: 'sanitation',
      locationText: 'ओवरब्रिज क्षेत्र, टैक्सी स्टैंड के पास',
      description: 'टैक्सी स्टैंड के पास सार्वजनिक शौचालय के बाहर सफाई नहीं होने से गंदगी है।',
      createdAt: hoursAgo(140),
      status: 'Closed',
      departmentOfficerId: 'staff-do-sanitation',
      assignedTo: 'staff-fs-1',
      rating: 5,
      citizenFeedback: 'शौचालय परिसर की अच्छी सफाई कर दी गई है। धन्यवाद।',
      history: [
        {
          time: hoursAgo(140),
          status: 'Registered',
          note: 'स्वच्छता शिकायत पंजीकृत।',
          by: 'राजेश कुमार शर्मा (नागरिक)',
          smsSent: true,
        },
        {
          time: hoursAgo(134),
          status: 'Assigned',
          note: 'रमेश तिवारी को आवंटित।',
          by: 'राजेंद्र वर्मा (स्वच्छता अधिकारी)',
        },
        {
          time: hoursAgo(128),
          status: 'In progress',
          note: 'सफाई दल द्वारा धुलाई व स्वच्छता कार्य प्रारंभ।',
          by: 'रमेश तिवारी (स्वच्छता पर्यवेक्षक)',
        },
        {
          time: hoursAgo(125),
          status: 'Job done',
          note: 'सफाई पूर्ण, फोटो अधिकारी को प्रेषित।',
          by: 'रमेश तिवारी (स्वच्छता पर्यवेक्षक)',
        },
        {
          time: hoursAgo(124),
          status: 'Resolved',
          note: 'विभाग अधिकारी द्वारा सत्यापित एवं निराकृत घोषित।',
          by: 'राजेंद्र वर्मा (स्वच्छता अधिकारी)',
          smsSent: true,
        },
        {
          time: hoursAgo(118),
          status: 'Closed',
          note: 'नागरिक ने 5/5 रेटिंग देकर शिकायत बंद की।',
          by: 'राजेश कुमार शर्मा (नागरिक)',
          smsSent: true,
        },
      ],
    },
  ];
}
