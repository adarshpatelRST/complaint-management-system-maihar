import { CategoryKey, ComplaintStatus, EscalationLevel, Language, OfficerRole } from './types';

export interface Translations {
  portalTitle: string;
  portalSubtitle: string;
  demoBanner: string;
  resetDemoData: string;
  resetConfirmed: string;
  languageLabel: string;
  switchLangButton: string;
  nav: {
    home: string;
    lodge: string;
    track: string;
    login: string;
    myDashboard: string;
    analytics: string;
  };
  footer: {
    disclaimer: string;
    officeHours: string;
    demoNote: string;
  };
  home: {
    headline: string;
    description: string;
    lodgeBtn: string;
    trackBtn: string;
    officialLoginBtn: string;
    statsTitle: string;
    totalComplaints: string;
    pendingComplaints: string;
    resolvedComplaints: string;
    howItWorksTitle: string;
    steps: {
      title: string;
      desc: string;
    }[];
    sampleTryTitle: string;
    sampleTryDesc: string;
    sampleOverdueLabel: string;
    sampleJobDoneLabel: string;
    sampleAwaitingFeedbackLabel: string;
    sampleClosedLabel: string;
  };
  lodge: {
    pageTitle: string;
    pageSubtitle: string;
    step1Title: string;
    step2Title: string;
    step3Title: string;
    mobileLabel: string;
    mobilePlaceholder: string;
    mobileHint: string;
    sendOtpBtn: string;
    otpLabel: string;
    otpPlaceholder: string;
    otpDemoHint: string;
    verifyOtpBtn: string;
    changeMobileBtn: string;
    verifiedMobileText: string;
    nameLabel: string;
    namePlaceholder: string;
    wardLabel: string;
    wardPlaceholder: string;
    categoryLabel: string;
    categoryPlaceholder: string;
    slaHoursSuffix: string;
    locationLabel: string;
    locationPlaceholder: string;
    useGpsBtn: string;
    gpsFetching: string;
    gpsCaptured: string;
    gpsDenied: string;
    gpsUnsupported: string;
    gpsFailed: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    photoLabel: string;
    photoHint: string;
    photoRemove: string;
    submitBtn: string;
    errors: {
      mobileRequired: string;
      mobileInvalid: string;
      otpRequired: string;
      otpInvalid: string;
      nameRequired: string;
      nameTooShort: string;
      wardRequired: string;
      categoryRequired: string;
      locationRequired: string;
      descriptionRequired: string;
      descriptionTooShort: string;
      photoInvalidType: string;
      photoTooLarge: string;
      photoReadError: string;
    };
    successTitle: string;
    successSubtitle: string;
    complaintIdLabel: string;
    routedDeptLabel: string;
    expectedSlaLabel: string;
    dueByLabel: string;
    smsSentNotice: string;
    trackThisBtn: string;
    lodgeAnotherBtn: string;
  };
  track: {
    pageTitle: string;
    pageSubtitle: string;
    searchLabel: string;
    searchPlaceholder: string;
    searchBtn: string;
    quickSamplesLabel: string;
    multipleFoundTitle: string;
    selectToView: string;
    emptyPromptTitle: string;
    emptyPromptDesc: string;
    notFoundTitle: string;
    notFoundDesc: string;
    lodgeNewBtn: string;
    searchErrorEmpty: string;
    detailsTitle: string;
    filedOn: string;
    dueDate: string;
    departmentOfficerLabel: string;
    assignedStaff: string;
    unassigned: string;
    wardLabel: string;
    categoryLabel: string;
    locationLabel: string;
    gpsLabel: string;
    citizenLabel: string;
    descriptionLabel: string;
    beforePhotoLabel: string;
    afterPhotoLabel: string;
    overdueFlag: string;
    timelineTitle: string;
    smsRecordedBadge: string;
    jobDoneCitizenNotice: string;
    feedbackSectionTitle: string;
    resolutionSummaryLabel: string;
    rateLabel: string;
    ratingRequiredError: string;
    feedbackCommentLabel: string;
    feedbackCommentPlaceholder: string;
    satisfiedCloseBtn: string;
    reopenBtn: string;
    reopenNoteRequired: string;
    closedFeedbackTitle: string;
    yourRatingLabel: string;
  };
  login: {
    pageTitle: string;
    pageSubtitle: string;
    citizenNote: string;
    citizenLodgeLink: string;
    credentialsHeading: string;
    userIdLabel: string;
    userIdPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    signInBtn: string;
    testUserHeading: string;
    testUserDesc: string;
    testUserSelectLabel: string;
    testUserPlaceholder: string;
    testUserLoginBtn: string;
    demoPasswordHint: string;
    errors: {
      userIdRequired: string;
      passwordRequired: string;
      invalidCredentials: string;
      testUserRequired: string;
    };
    departmentOfficersHeading: string;
    fieldStaffHeading: string;
    executiveHeading: string;
    analyticsBadge: string;
    hierarchySummaryTitle: string;
    hierarchySummarySteps: string[];
  };
  officer: {
    roleTitles: Record<OfficerRole, string>;
    pageSubtitle: string;
    loggedInAsLabel: string;
    switchUserBtn: string;
    logoutBtn: string;
    openAnalyticsBtn: string;
    departmentScopeNotice: string;
    fieldStaffNotice: string;
    cmoNotice: string;
    mayorNotice: string;
    filtersTitle: string;
    searchPlaceholder: string;
    allStatuses: string;
    allCategories: string;
    allWards: string;
    overdueOnly: string;
    clearFilters: string;
    listCountLabel: string;
    emptyListTitle: string;
    emptyListDesc: string;
    selectPromptTitle: string;
    selectPromptDesc: string;
    escalationBoxTitle: string;
    slaElapsedLabel: string;
    withinSlaText: string;
    resolvedSlaText: string;
    actionPanelTitle: string;
    assignToLabel: string;
    selectStaffPlaceholder: string;
    assignRemarkLabel: string;
    assignRemarkPlaceholder: string;
    assignSubmitBtn: string;
    reassignBtn: string;
    fieldAcceptTitle: string;
    fieldAcceptDesc: string;
    fieldAcceptRemarkLabel: string;
    fieldAcceptRemarkPlaceholder: string;
    fieldAcceptBtn: string;
    fieldResolveTitle: string;
    fieldResolveDesc: string;
    fieldResolvePhotoLabel: string;
    fieldResolvePhotoHint: string;
    fieldResolveRemarkLabel: string;
    fieldResolveRemarkPlaceholder: string;
    fieldJobDoneBtn: string;
    fieldAwaitingVerifyNotice: string;
    verifyPanelTitle: string;
    verifyPanelDesc: string;
    beforePhotoTitle: string;
    afterPhotoTitle: string;
    noCitizenPhoto: string;
    verifyRemarkLabel: string;
    verifyRemarkPlaceholder: string;
    verifyAndResolveBtn: string;
    rejectJobBtn: string;
    resolvedReadOnlyNote: string;
    closedReadOnlyNote: string;
    mayorReadOnlyNote: string;
    validation: {
      staffRequired: string;
      remarkRequired: string;
      afterPhotoRequired: string;
      photoInvalidType: string;
      photoTooLarge: string;
    };
  };
  dashboard: {
    pageTitle: string;
    pageSubtitle: string;
    restrictedTitle: string;
    restrictedDesc: string;
    restrictedLoginBtn: string;
    exportCsvBtn: string;
    kpis: {
      total: string;
      pending: string;
      overdue: string;
      resolvedWithinSla: string;
      avgRating: string;
      avgResolutionTime: string;
      noData: string;
      hoursUnit: string;
      outOfFive: '/ 5';
    };
    categoryChartTitle: string;
    statusBreakdownTitle: string;
    topOverdueTitle: string;
    noOverdueTitle: string;
    noOverdueDesc: string;
    overdueByHours: string;
    wardTableTitle: string;
    wardTableCols: {
      ward: string;
      total: string;
      pending: string;
      overdue: string;
      resolvedClosed: string;
    };
    viewInOfficer: string;
  };
  statuses: Record<ComplaintStatus, string>;
  categories: Record<CategoryKey, string>;
  roles: Record<OfficerRole, string>;
  escalation: Record<EscalationLevel, string>;
  sms: {
    toastTitle: string;
    otpSent: string;
    registered: string;
    assigned: string;
    acceptedInProgress: string;
    jobDoneInternal: string;
    jobRejectedInternal: string;
    resolvedCitizenSms: string;
    reopened: string;
    closed: string;
  };
  common: {
    hours: string;
    viewDetails: string;
    backToList: string;
    close: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  hi: {
    portalTitle: 'मैहर नगर पालिका · शिकायत पोर्टल',
    portalSubtitle: 'मैहर, मध्य प्रदेश — नागरिक जन-शिकायत निवारण प्रणाली',
    demoBanner: 'डेमो संस्करण (सैंपल डेटा सहित)। नागरिक OTP: 1234 | स्टाफ लॉगिन से भूमिका-आधारित डैशबोर्ड देखें।',
    resetDemoData: 'डेमो डेटा रीसेट करें',
    resetConfirmed: 'डेमो डेटा प्रारंभिक स्थिति में रीसेट किया गया।',
    languageLabel: 'भाषा',
    switchLangButton: 'English',
    nav: {
      home: 'मुखपृष्ठ',
      lodge: 'शिकायत दर्ज करें',
      track: 'स्थिति जांचें',
      login: 'स्टाफ लॉगिन',
      myDashboard: 'मेरा डैशबोर्ड',
      analytics: 'एनालिटिक्स डैशबोर्ड',
    },
    footer: {
      disclaimer: 'यह मैहर नगर पालिका के अधिकारियों के अवलोकन हेतु एक कार्यशील डेमो प्रोटोटाइप है। वास्तविक व्यक्तिगत डेटा या भुगतान एकीकृत नहीं हैं।',
      officeHours: 'नागरिक सहायता डेस्क: सोमवार से शनिवार, प्रातः 10:00 से सायं 5:30 बजे (डेमो)',
      demoNote: 'नागरिक सैंपल OTP: 1234',
    },
    home: {
      headline: 'नागरिक जन-शिकायत निवारण पोर्टल',
      description: 'मैहर नगर पालिका के सभी 15 वार्डों में पेयजल, स्वच्छता, स्ट्रीट लाइट, सड़क व नाली की शिकायत दर्ज करें। विभागीय अधिकारी, फील्ड स्टाफ व सत्यापन प्रक्रिया द्वारा समयबद्ध निवारण पाएं।',
      lodgeBtn: 'नई शिकायत दर्ज करें',
      trackBtn: 'शिकायत की स्थिति जांचें',
      officialLoginBtn: 'स्टाफ लॉगिन',
      statsTitle: 'वर्तमान पोर्टल स्थिति (सजीव आंकड़े)',
      totalComplaints: 'कुल शिकायतें',
      pendingComplaints: 'लंबित शिकायतें',
      resolvedComplaints: 'निराकृत / बंद शिकायतें',
      howItWorksTitle: 'पदानुक्रमित निवारण प्रक्रिया (Hierarchy)',
      steps: [
        { title: '1. पंजीकृत', desc: 'शिकायत संबंधित विभाग अधिकारी के पास पहुंचती है' },
        { title: '2. आवंटित', desc: 'विभाग अधिकारी फील्ड कर्मचारी को कार्य सौंपते हैं' },
        { title: '3. प्रगति पर', desc: 'फील्ड स्टाफ अनुरोध स्वीकार कर स्थल पर कार्य करता है' },
        { title: '4. कार्य पूर्ण (Job done)', desc: 'फील्ड स्टाफ निवारण फोटो अपलोड कर अधिकारी को भेजता है' },
        { title: '5. सत्यापित व निराकृत', desc: 'अधिकारी पहले/बाद की फोटो जांचकर निराकृत करते हैं और नागरिक को SMS जाता है' },
      ],
      sampleTryTitle: 'डेमो परीक्षण के लिए त्वरित शिकायत आईडी',
      sampleTryDesc: 'प्रक्रिया के विभिन्न चरण देखने के लिए नीचे दिए गए सैंपल नंबर पर क्लिक करें:',
      sampleOverdueLabel: 'समयसीमा पार (Overdue)',
      sampleJobDoneLabel: 'अधिकारी सत्यापन प्रतीक्षारत (Job done)',
      sampleAwaitingFeedbackLabel: 'फीडबैक प्रतीक्षारत (Resolved)',
      sampleClosedLabel: 'बंद व रेटेड (Closed)',
    },
    lodge: {
      pageTitle: 'नई शिकायत दर्ज करें',
      pageSubtitle: 'दो आसान चरणों में अपनी नागरिक समस्या दर्ज करें',
      step1Title: 'चरण 1: मोबाइल सत्यापन (OTP)',
      step2Title: 'चरण 2: शिकायत विवरण',
      step3Title: 'शिकायत सफलतापूर्वक दर्ज',
      mobileLabel: 'मोबाइल नंबर (10 अंक)',
      mobilePlaceholder: 'उदा. 9800000001',
      mobileHint: '6 से 9 के बीच अंक से शुरू होने वाला 10 अंकों का नंबर दर्ज करें।',
      sendOtpBtn: 'OTP भेजें',
      otpLabel: 'OTP दर्ज करें',
      otpPlaceholder: '4 अंकों का OTP (1234)',
      otpDemoHint: 'डेमो मोड: कृपया OTP 1234 दर्ज करें।',
      verifyOtpBtn: 'OTP सत्यापित करें व आगे बढ़ें',
      changeMobileBtn: 'नंबर बदलें',
      verifiedMobileText: 'सत्यापित मोबाइल नंबर:',
      nameLabel: 'नागरिक का पूरा नाम *',
      namePlaceholder: 'अपना पूरा नाम लिखें',
      wardLabel: 'वार्ड चुनें *',
      wardPlaceholder: '-- वार्ड चुनें --',
      categoryLabel: 'शिकायत श्रेणी *',
      categoryPlaceholder: '-- श्रेणी चुनें --',
      slaHoursSuffix: 'घंटे निवारण समय',
      locationLabel: 'स्थान / लैंडमार्क *',
      locationPlaceholder: 'उदा. कटरा बाजार, मुख्य मंदिर के पास',
      useGpsBtn: 'मेरा वर्तमान स्थान (GPS) जोड़ें',
      gpsFetching: 'स्थान प्राप्त किया जा रहा है...',
      gpsCaptured: 'GPS निर्देशांक जोड़े गए',
      gpsDenied: 'लोकेशन अनुमति अस्वीकार की गई। कृपया ऊपर स्थान का नाम हाथ से लिखें।',
      gpsUnsupported: 'इस ब्राउज़र में GPS उपलब्ध नहीं है। कृपया स्थान का नाम लिखें।',
      gpsFailed: 'वर्तमान स्थान प्राप्त नहीं हो सका। कृपया स्थान का नाम हाथ से दर्ज करें।',
      descriptionLabel: 'समस्या का विवरण *',
      descriptionPlaceholder: 'समस्या के बारे में स्पष्ट जानकारी लिखें (कम से कम 10 अक्षर)...',
      photoLabel: 'समस्या की फोटो संलग्न करें (वैकल्पिक)',
      photoHint: 'केवल JPG/PNG/WebP छवि, अधिकतम आकार 2 MB।',
      photoRemove: 'फोटो हटाएं',
      submitBtn: 'शिकायत सबमिट करें',
      errors: {
        mobileRequired: 'कृपया अपना 10 अंकों का मोबाइल नंबर दर्ज करें।',
        mobileInvalid: 'अमान्य मोबाइल नंबर। नंबर 6, 7, 8 या 9 से शुरू होना चाहिए और ठीक 10 अंकों का होना चाहिए।',
        otpRequired: 'कृपया 4 अंकों का OTP दर्ज करें।',
        otpInvalid: 'गलत OTP। डेमो पोर्टल में कृपया 1234 दर्ज करें।',
        nameRequired: 'कृपया नागरिक का नाम दर्ज करें।',
        nameTooShort: 'नाम कम से कम 2 अक्षरों का होना चाहिए।',
        wardRequired: 'कृपया सूची में से अपना वार्ड चुनें।',
        categoryRequired: 'कृपया शिकायत की श्रेणी चुनें।',
        locationRequired: 'कृपया समस्या का स्थान या पास का लैंडमार्क लिखें।',
        descriptionRequired: 'कृपया समस्या का विवरण लिखें।',
        descriptionTooShort: 'कृपया कम से कम 10 अक्षरों में समस्या का स्पष्ट विवरण लिखें।',
        photoInvalidType: 'अमान्य फाइल प्रकार। कृपया केवल छवि फाइल (JPG, PNG, WebP) चुनें।',
        photoTooLarge: 'फोटो का आकार 2 MB से अधिक है। कृपया छोटी फोटो चुनें।',
        photoReadError: 'फोटो पढ़ने में त्रुटि हुई। कृपया दूसरी फोटो आज़माएं।',
      },
      successTitle: 'आपकी शिकायत दर्ज हो गई है',
      successSubtitle: 'शिकायत सीधे संबंधित विभाग अधिकारी को प्रेषित कर दी गई है।',
      complaintIdLabel: 'शिकायत पंजीकरण संख्या',
      routedDeptLabel: 'प्रेषित विभाग अधिकारी',
      expectedSlaLabel: 'अपेक्षित निवारण अवधि (SLA)',
      dueByLabel: 'अनुमानित अंतिम तिथि',
      smsSentNotice: 'नागरिक को पंजीकरण SMS सूचना भेजी गई (सिम्युलेटेड)',
      trackThisBtn: 'इस शिकायत को ट्रैक करें',
      lodgeAnotherBtn: 'एक और शिकायत दर्ज करें',
    },
    track: {
      pageTitle: 'शिकायत की स्थिति जांचें',
      pageSubtitle: 'शिकायत संख्या (जैसे MHR-2026-0001) या 10 अंकों के मोबाइल नंबर से खोजें',
      searchLabel: 'शिकायत संख्या या मोबाइल नंबर',
      searchPlaceholder: 'उदा. MHR-2026-0001 या 9800000001',
      searchBtn: 'खोजें',
      quickSamplesLabel: 'सैंपल शिकायतें देखें:',
      multipleFoundTitle: 'इस मोबाइल नंबर पर दर्ज शिकायतें',
      selectToView: 'विवरण देखने के लिए शिकायत चुनें:',
      emptyPromptTitle: 'अपनी शिकायत खोजें',
      emptyPromptDesc: 'स्थिति, विभाग अधिकारी, आवंटित कर्मी, समयसीमा और कार्य प्रगति देखने के लिए ऊपर शिकायत संख्या या मोबाइल नंबर दर्ज करें।',
      notFoundTitle: 'कोई शिकायत नहीं मिली',
      notFoundDesc: 'दर्ज की गई शिकायत संख्या या मोबाइल नंबर से कोई रिकॉर्ड मेल नहीं खाया। कृपया संख्या दोबारा जांचें या नई शिकायत दर्ज करें।',
      lodgeNewBtn: 'नई शिकायत दर्ज करें',
      searchErrorEmpty: 'कृपया खोजने के लिए शिकायत संख्या या 10 अंकों का मोबाइल नंबर दर्ज करें।',
      detailsTitle: 'शिकायत का पूर्ण विवरण',
      filedOn: 'दर्ज दिनांक',
      dueDate: 'निवारण अंतिम तिथि (SLA)',
      departmentOfficerLabel: 'संबंधित विभाग अधिकारी',
      assignedStaff: 'आवंटित फील्ड कर्मचारी',
      unassigned: 'विभाग अधिकारी द्वारा आवंटन प्रतीक्षारत',
      wardLabel: 'वार्ड',
      categoryLabel: 'श्रेणी',
      locationLabel: 'स्थान',
      gpsLabel: 'GPS निर्देशांक',
      citizenLabel: 'शिकायतकर्ता',
      descriptionLabel: 'विवरण',
      beforePhotoLabel: 'नागरिक द्वारा अपलोड फोटो (Before)',
      afterPhotoLabel: 'निवारण के बाद की फोटो (After)',
      overdueFlag: 'समयसीमा पार (Overdue)',
      timelineTitle: 'कार्रवाई का क्रमवार विवरण (टाइमलाइन)',
      smsRecordedBadge: 'SMS सूचना भेजी गई',
      jobDoneCitizenNotice: 'फील्ड टीम द्वारा कार्य पूर्ण होने की रिपोर्ट विभाग अधिकारी को भेजी गई है। अधिकारी द्वारा फोटो सत्यापन के बाद इसे निराकृत घोषित किया जाएगा।',
      feedbackSectionTitle: 'नागरिक संतुष्टि एवं फीडबैक',
      resolutionSummaryLabel: 'अधिकारी सत्यापन टिप्पणी:',
      rateLabel: 'निवारण की गुणवत्ता को रेटिंग दें (1 से 5) *',
      ratingRequiredError: 'शिकायत बंद करने से पहले कृपया 1 से 5 तक रेटिंग चुनें।',
      feedbackCommentLabel: 'आपकी टिप्पणी (पुनः खोलने के लिए कारण लिखना आवश्यक है)',
      feedbackCommentPlaceholder: 'कार्य के बारे में अपनी राय या असंतुष्टि का कारण लिखें...',
      satisfiedCloseBtn: 'संतुष्ट हूँ, शिकायत बंद करें',
      reopenBtn: 'असंतुष्ट हूँ, शिकायत पुनः खोलें',
      reopenNoteRequired: 'शिकायत पुनः खोलने के लिए कृपया असंतुष्टि का कारण लिखें।',
      closedFeedbackTitle: 'नागरिक फीडबैक दर्ज है',
      yourRatingLabel: 'दी गई रेटिंग:',
    },
    login: {
      pageTitle: 'स्टाफ एवं अधिकारी लॉगिन',
      pageSubtitle: 'अपने यूज़र आईडी व पासवर्ड से लॉगिन करें, या डेमो परीक्षण के लिए नीचे टेस्ट यूज़र ड्रॉपडाउन से भूमिका चुनें।',
      citizenNote: 'क्या आप नागरिक हैं? शिकायत दर्ज करने या स्थिति जांचने के लिए किसी लॉगिन की आवश्यकता नहीं है।',
      citizenLodgeLink: 'नागरिक शिकायत पृष्ठ पर जाएं',
      credentialsHeading: 'यूज़र आईडी और पासवर्ड से लॉगिन करें',
      userIdLabel: 'यूज़र आईडी (User ID)',
      userIdPlaceholder: 'उदा. mayor, cmo, water.officer, ramesh.fs',
      passwordLabel: 'पासवर्ड (Password)',
      passwordPlaceholder: 'पासवर्ड दर्ज करें (डेमो: Password@123)',
      signInBtn: 'लॉगिन करें',
      testUserHeading: 'त्वरित टेस्ट यूज़र लॉगिन (डेमो)',
      testUserDesc: 'ड्रॉपडाउन से कोई भी अधिकारी या स्टाफ खाता चुनें — यूज़र आईडी स्वतः भर जाएगी या सीधे लॉगिन करें।',
      testUserSelectLabel: 'टेस्ट यूज़र चुनें',
      testUserPlaceholder: '-- टेस्ट यूज़र चुनें --',
      testUserLoginBtn: 'चयनित टेस्ट यूज़र से लॉगिन करें',
      demoPasswordHint: 'सभी टेस्ट खातों का पासवर्ड: Password@123',
      errors: {
        userIdRequired: 'कृपया अपना यूज़र आईडी दर्ज करें।',
        passwordRequired: 'कृपया अपना पासवर्ड दर्ज करें।',
        invalidCredentials: 'गलत यूज़र आईडी या पासवर्ड। कृपया सही विवरण दर्ज करें या टेस्ट यूज़र ड्रॉपडाउन का उपयोग करें।',
        testUserRequired: 'कृपया पहले ड्रॉपडाउन से एक टेस्ट यूज़र चुनें।',
      },
      departmentOfficersHeading: 'विभाग अधिकारी (Department Officers)',
      fieldStaffHeading: 'फील्ड कर्मचारी (Field Staff)',
      executiveHeading: 'शीर्ष प्रशासन (महापौर एवं CMO — एनालिटिक्स डैशबोर्ड सहित)',
      analyticsBadge: 'एनालिटिक्स डैशबोर्ड उपलब्ध',
      hierarchySummaryTitle: 'कार्यप्रवाह पदानुक्रम (Workflow Hierarchy)',
      hierarchySummarySteps: [
        '1. नागरिक शिकायत दर्ज करता है -> संबंधित विभाग अधिकारी के पास जाती है (Registered)',
        '2. विभाग अधिकारी फील्ड कर्मचारी को सौंपते हैं (Assigned)',
        '3. फील्ड कर्मचारी अनुरोध स्वीकार करता है -> कार्य शुरू होता है (In progress)',
        '4. फील्ड कर्मचारी स्थान पर निवारण कर फोटो अपलोड करता है -> अधिकारी के पास जाती है (Job done)',
        '5. विभाग अधिकारी पहले और बाद की दोनों फोटो सत्यापित कर निराकृत (Resolved) करते हैं -> नागरिक को SMS जाता है',
      ],
    },
    officer: {
      roleTitles: {
        'Department Officer': 'विभाग अधिकारी डैशबोर्ड',
        'Field Staff': 'फील्ड स्टाफ डैशबोर्ड',
        CMO: 'CMO शिकायत निगरानी डैशबोर्ड',
        Mayor: 'महापौर शिकायत निगरानी डैशबोर्ड',
      },
      pageSubtitle: 'पदानुक्रम के अनुसार शिकायत आवंटन, स्थल निवारण, और छवि सत्यापन',
      loggedInAsLabel: 'वर्तमान लॉगिन:',
      switchUserBtn: 'अन्य भूमिका से लॉगिन करें',
      logoutBtn: 'लॉगआउट',
      openAnalyticsBtn: 'एनालिटिक्स डैशबोर्ड खोलें',
      departmentScopeNotice: 'विभाग अधिकारी डैशबोर्ड: आपको आपके विभाग से संबंधित शिकायतें दिखाई दे रही हैं। नई शिकायतें आवंटित करें और "Job done" शिकायतों का फोटो सत्यापन करें।',
      fieldStaffNotice: 'फील्ड स्टाफ डैशबोर्ड: आपको केवल वे शिकायतें दिखाई दे रही हैं जो आपके नाम पर आवंटित हैं। अनुरोध स्वीकार करें और कार्य पूर्ण होने पर फोटो अपलोड करें।',
      cmoNotice: 'CMO डैशबोर्ड: आप समस्त विभागों की शिकायतें, SLA उल्लंघन देख सकते हैं तथा एनालिटिक्स डैशबोर्ड का उपयोग कर सकते हैं।',
      mayorNotice: 'महापौर डैशबोर्ड: आप नगर पालिका की समस्त शिकायतों व स्तर-3 एस्केलेशन की निगरानी कर सकते हैं तथा एनालिटिक्स डैशबोर्ड देख सकते हैं।',
      filtersTitle: 'शिकायत खोज एवं फ़िल्टर',
      searchPlaceholder: 'आईडी, नाम, स्थान या मोबाइल से खोजें...',
      allStatuses: 'सभी स्थितियां',
      allCategories: 'सभी श्रेणियां',
      allWards: 'सभी वार्ड',
      overdueOnly: 'केवल समयसीमा पार (Overdue)',
      clearFilters: 'फ़िल्टर हटाएं',
      listCountLabel: 'कुल प्राप्त शिकायतें:',
      emptyListTitle: 'फ़िल्टर के अनुसार कोई शिकायत नहीं मिली',
      emptyListDesc: 'कृपया खोज शब्द बदलें या सभी फ़िल्टर हटाकर पूरी सूची देखें।',
      selectPromptTitle: 'कार्रवाई के लिए शिकायत चुनें',
      selectPromptDesc: 'विवरण देखने व अपनी भूमिका के अनुसार अगला चरण पूरा करने के लिए बाईं सूची से किसी शिकायत पर क्लिक करें।',
      escalationBoxTitle: 'SLA एवं एस्केलेशन स्थिति',
      slaElapsedLabel: 'SLA समय व्यतीत:',
      withinSlaText: 'सामान्य (समयसीमा के भीतर)',
      resolvedSlaText: 'निराकरण पूर्ण हो चुका है',
      actionPanelTitle: 'अगली कार्रवाई (पदानुक्रम)',
      assignToLabel: 'फील्ड कर्मचारी चुनें',
      selectStaffPlaceholder: '-- फील्ड कर्मचारी चुनें --',
      assignRemarkLabel: 'आवंटन निर्देश / टिप्पणी *',
      assignRemarkPlaceholder: 'फील्ड कर्मचारी के लिए स्थल निरीक्षण या कार्य निर्देश लिखें...',
      assignSubmitBtn: 'फील्ड कर्मचारी को आवंटित करें (Assigned)',
      reassignBtn: 'फील्ड कर्मचारी बदलें / निर्देश जोड़ें',
      fieldAcceptTitle: 'चरण 1: अनुरोध स्वीकार करें',
      fieldAcceptDesc: 'कार्य प्रारंभ करने के लिए इस शिकायत अनुरोध को स्वीकार करें। स्थिति "प्रगति पर (In progress)" हो जाएगी।',
      fieldAcceptRemarkLabel: 'स्वीकृति / निरीक्षण टिप्पणी *',
      fieldAcceptRemarkPlaceholder: 'उदा. अनुरोध स्वीकार किया गया, स्थल निरीक्षण हेतु रवाना हो रहे हैं।',
      fieldAcceptBtn: 'अनुरोध स्वीकार करें व कार्य शुरू करें (In progress)',
      fieldResolveTitle: 'चरण 2: कार्य पूर्ण रिपोर्ट व फोटो अपलोड करें',
      fieldResolveDesc: 'स्थल पर समस्या हल करने के बाद निवारण की फोटो अपलोड करें। यह अनुरोध सत्यापन के लिए विभाग अधिकारी को भेजा जाएगा।',
      fieldResolvePhotoLabel: 'निवारण के बाद की फोटो अपलोड करें (अनिवार्य) *',
      fieldResolvePhotoHint: 'केवल JPG/PNG/WebP छवि, अधिकतम 2 MB।',
      fieldResolveRemarkLabel: 'किए गए कार्य का विवरण *',
      fieldResolveRemarkPlaceholder: 'उदा. नया वाल्व लगाकर लीकेज बंद किया गया / सफाई पूर्ण की गई।',
      fieldJobDoneBtn: 'कार्य पूर्ण (Job done) — अधिकारी सत्यापन हेतु भेजें',
      fieldAwaitingVerifyNotice: 'आपने इस कार्य की फोटो जमा कर दी है। वर्तमान में यह विभाग अधिकारी के सत्यापन हेतु लंबित है।',
      verifyPanelTitle: 'अधिकारी सत्यापन: पहले व बाद की फोटो जांचें',
      verifyPanelDesc: 'फील्ड कर्मचारी ने कार्य पूर्ण होने की रिपोर्ट भेजी है। दोनों छवियों का मिलान कर इसे निराकृत घोषित करें या पुनः कार्य हेतु वापस भेजें।',
      beforePhotoTitle: 'नागरिक की फोटो (Before)',
      afterPhotoTitle: 'फील्ड स्टाफ की फोटो (After)',
      noCitizenPhoto: 'नागरिक द्वारा प्रारंभिक फोटो अपलोड नहीं की गई थी।',
      verifyRemarkLabel: 'सत्यापन टिप्पणी *',
      verifyRemarkPlaceholder: 'उदा. दोनों फोटो की जांच की गई, कार्य संतोषजनक पाया गया।',
      verifyAndResolveBtn: 'सत्यापित करें व निराकृत (Resolved) घोषित करें',
      rejectJobBtn: 'असंतुष्ट — फील्ड स्टाफ को वापस भेजें',
      resolvedReadOnlyNote: 'यह शिकायत निराकृत घोषित हो चुकी है और नागरिक के फीडबैक हेतु उपलब्ध है।',
      closedReadOnlyNote: 'यह शिकायत नागरिक की संतुष्टि के बाद बंद (Closed) हो चुकी है।',
      mayorReadOnlyNote: 'महापौर भूमिका में आप सभी शिकायतों व एस्केलेशन की स्थिति देख सकते हैं। दैनिक आवंटन व सत्यापन संबंधित विभाग अधिकारी द्वारा किया जाता है।',
      validation: {
        staffRequired: 'कृपया सूची में से एक फील्ड कर्मचारी चुनें।',
        remarkRequired: 'कृपया आगे बढ़ने से पहले स्पष्ट टिप्पणी दर्ज करें।',
        afterPhotoRequired: 'कार्य पूर्ण (Job done) भेजने के लिए कृपया निवारण के बाद की फोटो अपलोड करें।',
        photoInvalidType: 'कृपया केवल छवि फाइल (JPG, PNG, WebP) अपलोड करें।',
        photoTooLarge: 'फोटो का आकार 2 MB से अधिक नहीं होना चाहिए।',
      },
    },
    dashboard: {
      pageTitle: 'एनालिटिक्स डैशबोर्ड (महापौर एवं CMO)',
      pageSubtitle: 'मैहर नगर पालिका शिकायत निवारण प्रदर्शन, SLA अनुपालन व वार्ड-वार समीक्षा',
      restrictedTitle: 'सीमित पहुंच — केवल महापौर एवं CMO के लिए',
      restrictedDesc: 'एनालिटिक्स डैशबोर्ड केवल महापौर (Mayor) या मुख्य नगर पालिका अधिकारी (CMO) लॉगिन के लिए उपलब्ध है। कृपया उपयुक्त भूमिका से लॉगिन करें।',
      restrictedLoginBtn: 'स्टाफ लॉगिन पृष्ठ पर जाएं',
      exportCsvBtn: 'CSV डाउनलोड करें',
      kpis: {
        total: 'कुल शिकायतें',
        pending: 'लंबित शिकायतें',
        overdue: 'समयसीमा पार (Overdue)',
        resolvedWithinSla: 'समय पर निराकरण (SLA %)',
        avgRating: 'औसत नागरिक रेटिंग',
        avgResolutionTime: 'औसत निवारण समय',
        noData: 'डेटा नहीं',
        hoursUnit: 'घंटे',
        outOfFive: '/ 5',
      },
      categoryChartTitle: 'श्रेणी-वार शिकायत संख्या',
      statusBreakdownTitle: 'स्थिति-वार वितरण',
      topOverdueTitle: 'शीर्ष 5 सर्वाधिक विलंबित (Overdue) शिकायतें',
      noOverdueTitle: 'कोई भी सक्रिय शिकायत समयसीमा से बाहर नहीं है',
      noOverdueDesc: 'सभी लंबित शिकायतें निर्धारित SLA समयसीमा के भीतर हैं।',
      overdueByHours: 'घंटे विलंबित',
      wardTableTitle: 'वार्ड-वार शिकायत तालिका (वार्ड 1 से 15)',
      wardTableCols: {
        ward: 'वार्ड',
        total: 'कुल',
        pending: 'लंबित',
        overdue: 'विलंबित',
        resolvedClosed: 'निराकृत / बंद',
      },
      viewInOfficer: 'निगरानी पैनल में देखें',
    },
    statuses: {
      Registered: 'पंजीकृत (Registered)',
      Assigned: 'आवंटित (Assigned)',
      'In progress': 'प्रगति पर (In progress)',
      'Job done': 'कार्य पूर्ण (Job done)',
      Resolved: 'निराकृत (Resolved)',
      Closed: 'बंद (Closed)',
    },
    categories: {
      water_supply: 'पेयजल आपूर्ति',
      street_light: 'स्ट्रीट लाइट',
      sanitation: 'स्वच्छता / कचरा',
      roads: 'सड़क / गड्ढे',
      drainage: 'नाली / जलभराव',
      cattle: 'आवारा या घायल मवेशी',
      other: 'अन्य',
    },
    roles: {
      'Department Officer': 'विभाग अधिकारी (Department Officer)',
      'Field Staff': 'फील्ड कर्मचारी (Field Staff)',
      CMO: 'मुख्य नगर पालिका अधिकारी (CMO)',
      Mayor: 'महापौर / नगर पालिका अध्यक्ष (Mayor)',
    },
    escalation: {
      0: 'सामान्य (50% से कम SLA)',
      1: 'स्तर 1: विभागाध्यक्ष (50%+ SLA)',
      2: 'स्तर 2: मुख्य नगर पालिका अधिकारी (100%+ SLA)',
      3: 'स्तर 3: नगर पालिका अध्यक्ष / महापौर (150%+ SLA)',
    },
    sms: {
      toastTitle: 'सूचना (डेमो)',
      otpSent: 'नागरिक मोबाइल पर OTP 1234 भेजा गया।',
      registered: 'शिकायत पंजीकृत — नागरिक को SMS भेजा गया व विभाग अधिकारी को प्रेषित।',
      assigned: 'फील्ड कर्मचारी आवंटित — कर्मचारी को कार्य सौंपा गया।',
      acceptedInProgress: 'फील्ड स्टाफ ने अनुरोध स्वीकार किया — स्थिति प्रगति पर है।',
      jobDoneInternal: 'कार्य पूर्ण (Job done) — सत्यापन हेतु विभाग अधिकारी को भेजा गया।',
      jobRejectedInternal: 'सत्यापन अस्वीकृत — पुनः कार्य हेतु फील्ड स्टाफ को वापस भेजा गया।',
      resolvedCitizenSms: 'अधिकारी द्वारा सत्यापित व निराकृत — नागरिक को SMS सूचना भेजी गई।',
      reopened: 'शिकायत पुनः खोली गई — विभाग अधिकारी व स्टाफ को सूचना भेजी गई।',
      closed: 'शिकायत बंद — नागरिक को धन्यवाद SMS भेजा गया।',
    },
    common: {
      hours: 'घंटे',
      viewDetails: 'विवरण देखें',
      backToList: 'सूची पर वापस जाएं',
      close: 'बंद करें',
    },
  },
  en: {
    portalTitle: 'Maihar Nagar Palika · Complaint Portal',
    portalSubtitle: 'Maihar, Madhya Pradesh — Citizen Grievance Redressal System',
    demoBanner: 'Demo version with sample data. Citizen OTP: 1234 | Use Staff Login for role-based dashboards.',
    resetDemoData: 'Reset demo data',
    resetConfirmed: 'Demo data has been restored to initial sample records.',
    languageLabel: 'Language',
    switchLangButton: 'हिंदी',
    nav: {
      home: 'Home',
      lodge: 'Lodge Complaint',
      track: 'Track Status',
      login: 'Staff Login',
      myDashboard: 'My Dashboard',
      analytics: 'Analytics Dashboard',
    },
    footer: {
      disclaimer: 'Working prototype built for Maihar Nagar Palika official review. No real SMS, authentication, or payments are connected.',
      officeHours: 'Citizen Helpdesk: Monday to Saturday, 10:00 AM to 5:30 PM (Demo)',
      demoNote: 'Citizen Demo OTP: 1234',
    },
    home: {
      headline: 'Citizen Grievance Redressal Portal',
      description: 'Lodge civic complaints across all 15 wards of Maihar Nagar Palika. Complaints route to the concerned Department Officer, get assigned to Field Staff, and are verified before final resolution.',
      lodgeBtn: 'Lodge a complaint',
      trackBtn: 'Track complaint status',
      officialLoginBtn: 'Staff Login',
      statsTitle: 'Live Portal Summary',
      totalComplaints: 'Total Complaints',
      pendingComplaints: 'Pending Complaints',
      resolvedComplaints: 'Resolved / Closed',
      howItWorksTitle: 'Hierarchical Redressal Workflow',
      steps: [
        { title: '1. Registered', desc: 'Routes automatically to the Department Officer' },
        { title: '2. Assigned', desc: 'Department Officer assigns Field Staff' },
        { title: '3. In progress', desc: 'Field Staff accepts request & visits site' },
        { title: '4. Job done', desc: 'Field Staff uploads resolved photo for officer review' },
        { title: '5. Verified & Resolved', desc: 'Officer verifies both images, marks Resolved & notifies citizen' },
      ],
      sampleTryTitle: 'Quick Sample Complaint IDs for Review',
      sampleTryDesc: 'Click any sample ID below to inspect different stages of the workflow:',
      sampleOverdueLabel: 'Overdue sample',
      sampleJobDoneLabel: 'Job done (awaiting officer verification)',
      sampleAwaitingFeedbackLabel: 'Resolved (awaiting citizen feedback)',
      sampleClosedLabel: 'Closed with rating',
    },
    lodge: {
      pageTitle: 'Lodge a Complaint',
      pageSubtitle: 'Submit your civic grievance in two simple steps',
      step1Title: 'Step 1: Mobile Verification (OTP)',
      step2Title: 'Step 2: Complaint Details',
      step3Title: 'Complaint Registered',
      mobileLabel: 'Mobile Number (10 digits)',
      mobilePlaceholder: 'e.g. 9800000001',
      mobileHint: 'Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.',
      sendOtpBtn: 'Send OTP',
      otpLabel: 'Enter OTP',
      otpPlaceholder: '4-digit OTP (1234)',
      otpDemoHint: 'Demo mode: Please enter OTP 1234.',
      verifyOtpBtn: 'Verify OTP & Continue',
      changeMobileBtn: 'Change Number',
      verifiedMobileText: 'Verified Mobile Number:',
      nameLabel: 'Citizen Full Name *',
      namePlaceholder: 'Enter your full name',
      wardLabel: 'Select Ward *',
      wardPlaceholder: '-- Select Ward --',
      categoryLabel: 'Complaint Category *',
      categoryPlaceholder: '-- Select Category --',
      slaHoursSuffix: 'hours SLA',
      locationLabel: 'Location / Landmark *',
      locationPlaceholder: 'e.g. Near Katra Bazar Main Temple',
      useGpsBtn: 'Use my current location',
      gpsFetching: 'Fetching location...',
      gpsCaptured: 'GPS coordinates attached',
      gpsDenied: 'Location permission was denied. Please type the location landmark above.',
      gpsUnsupported: 'Geolocation is not supported by this browser. Please enter the location manually.',
      gpsFailed: 'Could not detect current location. Please enter the location manually.',
      descriptionLabel: 'Complaint Description *',
      descriptionPlaceholder: 'Describe the issue clearly (minimum 10 characters)...',
      photoLabel: 'Upload Photo (Optional)',
      photoHint: 'Image files only (JPG, PNG, WebP). Maximum size 2 MB.',
      photoRemove: 'Remove photo',
      submitBtn: 'Submit Complaint',
      errors: {
        mobileRequired: 'Please enter your 10-digit mobile number.',
        mobileInvalid: 'Invalid mobile number. It must be 10 digits starting with 6, 7, 8, or 9.',
        otpRequired: 'Please enter the 4-digit OTP.',
        otpInvalid: 'Incorrect OTP. For this demo, please enter 1234.',
        nameRequired: 'Please enter your full name.',
        nameTooShort: 'Name must be at least 2 characters long.',
        wardRequired: 'Please select a ward from the list.',
        categoryRequired: 'Please select a complaint category.',
        locationRequired: 'Please enter the location or nearest landmark.',
        descriptionRequired: 'Please enter a description of the complaint.',
        descriptionTooShort: 'Please provide at least 10 characters describing the issue.',
        photoInvalidType: 'Unsupported file type. Please upload an image file (JPG, PNG, WebP).',
        photoTooLarge: 'Photo exceeds the 2 MB limit. Please select a smaller image.',
        photoReadError: 'Failed to read the image file. Please try another photo.',
      },
      successTitle: 'Your complaint has been registered',
      successSubtitle: 'Your complaint has been routed to the concerned Department Officer.',
      complaintIdLabel: 'Complaint ID',
      routedDeptLabel: 'Routed to Department Officer',
      expectedSlaLabel: 'Expected Resolution Time (SLA)',
      dueByLabel: 'Expected Due Date',
      smsSentNotice: 'Registration SMS sent to citizen (simulated)',
      trackThisBtn: 'Track this complaint',
      lodgeAnotherBtn: 'Lodge another',
    },
    track: {
      pageTitle: 'Track Complaint Status',
      pageSubtitle: 'Search by Complaint ID (e.g. MHR-2026-0001) or 10-digit mobile number',
      searchLabel: 'Complaint ID or Mobile Number',
      searchPlaceholder: 'e.g. MHR-2026-0001 or 9800000001',
      searchBtn: 'Search',
      quickSamplesLabel: 'Try sample IDs:',
      multipleFoundTitle: 'Complaints found for this mobile number',
      selectToView: 'Select a complaint to view details:',
      emptyPromptTitle: 'Search for a complaint',
      emptyPromptDesc: 'Enter your Complaint ID or mobile number above to check current status, department officer, assigned staff, due date, and timeline.',
      notFoundTitle: 'No matching complaint found',
      notFoundDesc: 'No complaint matched that ID or mobile number. Please check the number and try again, or lodge a new complaint.',
      lodgeNewBtn: 'Lodge a complaint',
      searchErrorEmpty: 'Please enter a Complaint ID or 10-digit mobile number to search.',
      detailsTitle: 'Complaint Details',
      filedOn: 'Filed On',
      dueDate: 'Due Date (SLA)',
      departmentOfficerLabel: 'Department Officer',
      assignedStaff: 'Assigned Field Staff',
      unassigned: 'Awaiting assignment by Department Officer',
      wardLabel: 'Ward',
      categoryLabel: 'Category',
      locationLabel: 'Location',
      gpsLabel: 'GPS Coordinates',
      citizenLabel: 'Citizen Name',
      descriptionLabel: 'Description',
      beforePhotoLabel: 'Citizen Photo (Before)',
      afterPhotoLabel: 'Resolved Proof Photo (After)',
      overdueFlag: 'Overdue',
      timelineTitle: 'Status History Timeline',
      smsRecordedBadge: 'SMS sent to citizen',
      jobDoneCitizenNotice: 'Field staff has submitted the completion photo to the Department Officer. It will be marked Resolved once the officer verifies both images.',
      feedbackSectionTitle: 'Citizen Feedback & Closure',
      resolutionSummaryLabel: 'Officer Verification Remark:',
      rateLabel: 'Rate the resolution (1 to 5) *',
      ratingRequiredError: 'Please select a rating from 1 to 5 before closing the complaint.',
      feedbackCommentLabel: 'Comments (required if reopening)',
      feedbackCommentPlaceholder: 'Share feedback or explain why the issue is not resolved...',
      satisfiedCloseBtn: 'Satisfied, close',
      reopenBtn: 'Not satisfied, reopen',
      reopenNoteRequired: 'Please enter a reason in the comment box before reopening the complaint.',
      closedFeedbackTitle: 'Citizen Feedback Recorded',
      yourRatingLabel: 'Your Rating:',
    },
    login: {
      pageTitle: 'Staff & Official Login',
      pageSubtitle: 'Sign in using your User ID and Password, or select a Test User from the dropdown for instant demo login.',
      citizenNote: 'Are you a citizen? No login is needed to lodge or track a complaint.',
      citizenLodgeLink: 'Go to Citizen Complaint Form',
      credentialsHeading: 'Sign In with User ID & Password',
      userIdLabel: 'User ID',
      userIdPlaceholder: 'e.g. mayor, cmo, water.officer, ramesh.fs',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter password (Demo: Password@123)',
      signInBtn: 'Sign In',
      testUserHeading: 'Quick Test User Login (Demo)',
      testUserDesc: 'Select any role from the dropdown to autofill credentials or sign in directly.',
      testUserSelectLabel: 'Select Test User',
      testUserPlaceholder: '-- Select Test User --',
      testUserLoginBtn: 'Login Selected Test User',
      demoPasswordHint: 'Demo password for all test accounts: Password@123',
      errors: {
        userIdRequired: 'Please enter your User ID.',
        passwordRequired: 'Please enter your password.',
        invalidCredentials: 'Invalid User ID or password. Please verify your credentials or use the Test User dropdown.',
        testUserRequired: 'Please select a test user from the dropdown first.',
      },
      departmentOfficersHeading: 'Department Officers',
      fieldStaffHeading: 'Field Staff',
      executiveHeading: 'Executive Leadership (Mayor & CMO — Analytics Access)',
      analyticsBadge: 'Includes Analytics Dashboard',
      hierarchySummaryTitle: 'Complaint Hierarchy Workflow',
      hierarchySummarySteps: [
        '1. Citizen registers complaint -> routes to matching Department Officer (Registered)',
        '2. Department Officer assigns complaint to Field Staff (Assigned)',
        '3. Field Staff accepts request & starts work (In progress)',
        '4. Field Staff resolves on site & uploads proof photo -> returns to Department Officer (Job done)',
        '5. Department Officer verifies before & after images and marks Resolved -> Citizen receives SMS notification',
      ],
    },
    officer: {
      roleTitles: {
        'Department Officer': 'Department Officer Dashboard',
        'Field Staff': 'Field Staff Dashboard',
        CMO: 'CMO Complaint Oversight Dashboard',
        Mayor: 'Mayor Complaint Oversight Dashboard',
      },
      pageSubtitle: 'Hierarchical assignment, field execution, and image verification',
      loggedInAsLabel: 'Logged in as:',
      switchUserBtn: 'Switch Role / Account',
      logoutBtn: 'Logout',
      openAnalyticsBtn: 'Open Analytics Dashboard',
      departmentScopeNotice: 'Department Officer Dashboard: Showing complaints routed to your department. Assign Registered items and verify Job done proof photos.',
      fieldStaffNotice: 'Field Staff Dashboard: Showing only complaints assigned to you. Accept Assigned requests and upload proof photo when work is done.',
      cmoNotice: 'CMO Dashboard: Full oversight across all municipal departments, SLA escalations, and access to the Analytics Dashboard.',
      mayorNotice: 'Mayor Dashboard: Executive monitoring across all wards, Level 3 escalations, and access to the Analytics Dashboard.',
      filtersTitle: 'Search & Filters',
      searchPlaceholder: 'Search by ID, name, location, or mobile...',
      allStatuses: 'All Statuses',
      allCategories: 'All Categories',
      allWards: 'All Wards',
      overdueOnly: 'Overdue only',
      clearFilters: 'Clear filters',
      listCountLabel: 'Matching complaints:',
      emptyListTitle: 'No complaints match these filters',
      emptyListDesc: 'Adjust your search or clear active filters to view available complaints.',
      selectPromptTitle: 'Select a complaint to view or act on',
      selectPromptDesc: 'Choose any complaint from the list to view details and perform your role’s actions.',
      escalationBoxTitle: 'SLA & Escalation Status',
      slaElapsedLabel: 'SLA Elapsed:',
      withinSlaText: 'Normal (Within SLA)',
      resolvedSlaText: 'Complaint resolved',
      actionPanelTitle: 'Next Action (Hierarchy)',
      assignToLabel: 'Select Field Staff',
      selectStaffPlaceholder: '-- Select Field Staff --',
      assignRemarkLabel: 'Assignment Instructions / Remark *',
      assignRemarkPlaceholder: 'Provide instructions or inspection notes for Field Staff...',
      assignSubmitBtn: 'Assign to Field Staff (Assigned)',
      reassignBtn: 'Reassign / Update Note',
      fieldAcceptTitle: 'Step 1: Accept Request',
      fieldAcceptDesc: 'Accept this assignment to begin field work. Status will change to In progress.',
      fieldAcceptRemarkLabel: 'Acceptance / Inspection Note *',
      fieldAcceptRemarkPlaceholder: 'e.g. Accepted request, proceeding to site for inspection.',
      fieldAcceptBtn: 'Accept Request & Start Work (In progress)',
      fieldResolveTitle: 'Step 2: Submit Completion Proof',
      fieldResolveDesc: 'After resolving the issue at the location, upload the resolved photo. Status will change to Job done for Department Officer verification.',
      fieldResolvePhotoLabel: 'Upload Resolved / After Photo (Required) *',
      fieldResolvePhotoHint: 'Image only (JPG, PNG, WebP), max 2 MB.',
      fieldResolveRemarkLabel: 'Work Completion Remark *',
      fieldResolveRemarkPlaceholder: 'e.g. Replaced damaged valve and restored water supply.',
      fieldJobDoneBtn: 'Mark Job Done & Send for Officer Verification',
      fieldAwaitingVerifyNotice: 'You have submitted the resolved photo. It is awaiting verification by the Department Officer.',
      verifyPanelTitle: 'Officer Verification: Compare Before & After Images',
      verifyPanelDesc: 'Field Staff marked this job done. Verify both images below and either mark as Resolved (notifies citizen) or return to Field Staff.',
      beforePhotoTitle: 'Citizen Photo (Before)',
      afterPhotoTitle: 'Field Staff Photo (After)',
      noCitizenPhoto: 'Citizen did not upload a before photo.',
      verifyRemarkLabel: 'Verification Remark *',
      verifyRemarkPlaceholder: 'e.g. Verified before and after images; work completed satisfactorily.',
      verifyAndResolveBtn: 'Verify & Mark as Resolved (Notify Citizen)',
      rejectJobBtn: 'Reject & Return to Field Staff',
      resolvedReadOnlyNote: 'This complaint has been verified and marked Resolved. Citizen feedback is now enabled.',
      closedReadOnlyNote: 'This complaint has been closed with citizen confirmation.',
      mayorReadOnlyNote: 'As Mayor, you can monitor all complaints and SLA escalations across wards. Operational assignment and verification are handled by Department Officers.',
      validation: {
        staffRequired: 'Please select a Field Staff member.',
        remarkRequired: 'Please enter a clear remark before submitting.',
        afterPhotoRequired: 'Please upload the resolved/after photo before marking Job done.',
        photoInvalidType: 'Invalid file type. Please upload an image file (JPG, PNG, WebP).',
        photoTooLarge: 'Photo exceeds the 2 MB size limit.',
      },
    },
    dashboard: {
      pageTitle: 'Analytics Dashboard (Mayor & CMO)',
      pageSubtitle: 'Maihar Nagar Palika grievance overview, SLA compliance, and ward analytics',
      restrictedTitle: 'Restricted Access — Mayor & CMO Only',
      restrictedDesc: 'The Analytics Dashboard is only visible and accessible to the Mayor and Chief Municipal Officer (CMO). Please log in with an executive role.',
      restrictedLoginBtn: 'Go to Staff Login',
      exportCsvBtn: 'Export CSV',
      kpis: {
        total: 'Total Complaints',
        pending: 'Pending',
        overdue: 'Overdue',
        resolvedWithinSla: 'Resolved Within SLA',
        avgRating: 'Average Citizen Rating',
        avgResolutionTime: 'Average Resolution Time',
        noData: 'N/A',
        hoursUnit: 'hrs',
        outOfFive: '/ 5',
      },
      categoryChartTitle: 'Complaints by Category',
      statusBreakdownTitle: 'Status Breakdown',
      topOverdueTitle: 'Top 5 Most Overdue Complaints',
      noOverdueTitle: 'No active overdue complaints',
      noOverdueDesc: 'All pending complaints are currently within their SLA window.',
      overdueByHours: 'hrs overdue',
      wardTableTitle: 'Ward-Wise Complaint Count (Wards 1–15)',
      wardTableCols: {
        ward: 'Ward',
        total: 'Total',
        pending: 'Pending',
        overdue: 'Overdue',
        resolvedClosed: 'Resolved / Closed',
      },
      viewInOfficer: 'Open in Oversight Panel',
    },
    statuses: {
      Registered: 'Registered',
      Assigned: 'Assigned',
      'In progress': 'In progress',
      'Job done': 'Job done',
      Resolved: 'Resolved',
      Closed: 'Closed',
    },
    categories: {
      water_supply: 'Water supply',
      street_light: 'Street light',
      sanitation: 'Sanitation / garbage',
      roads: 'Roads / potholes',
      drainage: 'Drainage / water-logging',
      cattle: 'Stray or injured cattle',
      other: 'Other',
    },
    roles: {
      'Department Officer': 'Department Officer',
      'Field Staff': 'Field Staff',
      CMO: 'Chief Municipal Officer (CMO)',
      Mayor: 'Mayor / Nagar Palika President',
    },
    escalation: {
      0: 'Normal (< 50% SLA)',
      1: 'Level 1: Department head (50%+ SLA)',
      2: 'Level 2: Chief Municipal Officer (100%+ SLA)',
      3: 'Level 3: Mayor / Nagar Palika President (150%+ SLA)',
    },
    sms: {
      toastTitle: 'Portal Notification (Demo)',
      otpSent: 'OTP 1234 sent to citizen mobile.',
      registered: 'Complaint registered — SMS sent to citizen & routed to Department Officer.',
      assigned: 'Complaint assigned to Field Staff.',
      acceptedInProgress: 'Field Staff accepted request — status is now In progress.',
      jobDoneInternal: 'Marked Job done — sent to Department Officer for image verification.',
      jobRejectedInternal: 'Verification rejected — returned to Field Staff.',
      resolvedCitizenSms: 'Verified & Resolved — SMS sent to citizen!',
      reopened: 'Complaint reopened — notified Department Officer and Field Staff.',
      closed: 'Complaint closed — thank you SMS sent to citizen.',
    },
    common: {
      hours: 'hours',
      viewDetails: 'View Details',
      backToList: 'Back to list',
      close: 'Close',
    },
  },
};
