export type SupportedLanguage = 'en' | 'hi' | 'as';

export interface TranslationStrings {
  appName: string;
  appSubtitle: string;
  loginTitle: string;
  driverId: string;
  password: string;
  loginButton: string;
  secureDriverAccess: string;
  goodMorning: string;
  currentDelivery: string;
  priority: string;
  critical: string;
  destination: string;
  eta: string;
  route: string;
  open: string;
  degraded: string;
  highRisk: string;
  blocked: string;
  connectivity: string;
  connection: string;
  online: string;
  offline: string;
  startTrip: string;
  endTrip: string;
  gpsActive: string;
  gpsUnavailable: string;
  enableLocation: string;
  lastUpdated: string;
  routeScreenTitle: string;
  yourRoute: string;
  distance: string;
  reportTitle: string;
  takePhoto: string;
  addPhoto: string;
  locationAuto: string;
  timeAuto: string;
  descriptionOptional: string;
  submitReport: string;
  offlineMode: string;
  offlineBannerSub: string;
  savedOffline: string;
  savedOfflineSub: string;
  syncStatus: string;
  pendingReports: string;
  pendingGps: string;
  pendingPhotos: string;
  lastSync: string;
  syncing: string;
  syncComplete: string;
  syncNow: string;
  acceptSaferRoute: string;
  routeUpdated: string;
  continueSaferRoute: string;
  criticalDeliveryAlert: string;
  criticalDeliveryMsg: string;
  criticalFindingSafer: string;
  roadBlocked: string;
  flood: string;
  landslide: string;
  roadDamage: string;
  heavyRain: string;
  bridgeDamage: string;
  accident: string;
  other: string;
  driverProfile: string;
  language: string;
  logout: string;
  shipmentsTitle: string;
  currentShipment: string;
  upcomingShipments: string;
  completedShipments: string;
  cargoDetails: string;
  pickup: string;
  delivery: string;
  emergencyContact: string;
  instructions: string;
}

export const translations: Record<SupportedLanguage, TranslationStrings> = {
  en: {
    appName: 'EXTRICATE',
    appSubtitle: 'DRIVER & FIELD APP',
    loginTitle: 'Driver Sign In',
    driverId: 'Driver ID',
    password: 'Password',
    loginButton: 'LOGIN',
    secureDriverAccess: 'Secure Driver Access',
    goodMorning: 'GOOD MORNING, ARUN',
    currentDelivery: 'CURRENT DELIVERY',
    priority: 'Priority:',
    critical: 'CRITICAL',
    destination: 'Destination:',
    eta: 'ETA:',
    route: 'Route:',
    open: 'OPEN',
    degraded: 'DEGRADED',
    highRisk: 'HIGH-RISK',
    blocked: 'BLOCKED',
    connectivity: 'Connectivity:',
    connection: 'Connection:',
    online: 'ONLINE',
    offline: 'OFFLINE',
    startTrip: 'START TRIP',
    endTrip: 'END TRIP',
    gpsActive: 'GPS ACTIVE',
    gpsUnavailable: 'GPS unavailable',
    enableLocation: 'ENABLE LOCATION',
    lastUpdated: 'Last Updated:',
    routeScreenTitle: 'YOUR ROUTE',
    yourRoute: 'YOUR ROUTE',
    distance: 'Distance:',
    reportTitle: 'REPORT ROAD CONDITION',
    takePhoto: 'TAKE PHOTO',
    addPhoto: 'Add Photo',
    locationAuto: 'Automatically captured',
    timeAuto: 'Automatically captured',
    descriptionOptional: 'Optional notes...',
    submitReport: 'SUBMIT REPORT',
    offlineMode: 'OFFLINE MODE',
    offlineBannerSub: 'Your report will be saved and sent when connection returns.',
    savedOffline: 'SAVED OFFLINE',
    savedOfflineSub: 'Your report will sync automatically when internet returns.',
    syncStatus: 'SYNC STATUS',
    pendingReports: 'Pending Reports:',
    pendingGps: 'Pending GPS:',
    pendingPhotos: 'Pending Photos:',
    lastSync: 'Last Sync:',
    syncing: 'SYNCING...',
    syncComplete: 'SYNC COMPLETE',
    syncNow: 'SYNC NOW',
    acceptSaferRoute: 'ACCEPT SAFER ROUTE',
    routeUpdated: 'ROUTE UPDATED',
    continueSaferRoute: 'Continue using the safer route.',
    criticalDeliveryAlert: 'CRITICAL DELIVERY',
    criticalDeliveryMsg: 'Your shipment has high priority.',
    criticalFindingSafer: 'EXTRICATE is finding a safer route for this delivery.',
    roadBlocked: 'ROAD BLOCKED',
    flood: 'FLOOD',
    landslide: 'LANDSLIDE',
    roadDamage: 'ROAD DAMAGE',
    heavyRain: 'HEAVY RAIN',
    bridgeDamage: 'BRIDGE DAMAGE',
    accident: 'ACCIDENT',
    other: 'OTHER',
    driverProfile: 'DRIVER PROFILE',
    language: 'LANGUAGE',
    logout: 'LOGOUT',
    shipmentsTitle: 'ASSIGNED SHIPMENTS',
    currentShipment: 'CURRENT SHIPMENT',
    upcomingShipments: 'UPCOMING SHIPMENTS',
    completedShipments: 'COMPLETED SHIPMENTS',
    cargoDetails: 'CARGO DETAILS',
    pickup: 'Pickup',
    delivery: 'Delivery',
    emergencyContact: 'Emergency Contact',
    instructions: 'Instructions',
  },
  hi: {
    appName: 'EXTRICATE',
    appSubtitle: 'ड्राइवर एवं फील्ड ऐप',
    loginTitle: 'ड्राइवर लॉगिन',
    driverId: 'ड्राइवर आईडी',
    password: 'पासवर्ड',
    loginButton: 'लॉग इन करें',
    secureDriverAccess: 'सुरक्षित ड्राइवर एक्सेस',
    goodMorning: 'शुभ प्रभात, अरुण',
    currentDelivery: 'वर्तमान डिलीवरी',
    priority: 'प्राथमिकता:',
    critical: 'अति महत्वपूर्ण (CRITICAL)',
    destination: 'गंतव्य:',
    eta: 'अनुमानित समय (ETA):',
    route: 'मार्ग स्थिति:',
    open: 'खुला (OPEN)',
    degraded: 'खराब (DEGRADED)',
    highRisk: 'उच्च जोखिम (HIGH-RISK)',
    blocked: 'अवरुद्ध (BLOCKED)',
    connectivity: 'नेटवर्क:',
    connection: 'कनेक्शन:',
    online: 'ऑनलाइन (ONLINE)',
    offline: 'ऑफ़लाइन (OFFLINE)',
    startTrip: 'यात्रा शुरू करें',
    endTrip: 'यात्रा समाप्त करें',
    gpsActive: 'जीपीएस सक्रिय (GPS ACTIVE)',
    gpsUnavailable: 'जीपीएस अनुपलब्ध',
    enableLocation: 'स्थान चालू करें',
    lastUpdated: 'अंतिम अपडेट:',
    routeScreenTitle: 'आपका मार्ग',
    yourRoute: 'आपका मार्ग',
    distance: 'दूरी:',
    reportTitle: 'सड़क की स्थिति रिपोर्ट करें',
    takePhoto: 'फोटो खींचे',
    addPhoto: 'फोटो जोड़ें',
    locationAuto: 'स्थान स्वतः दर्ज किया गया',
    timeAuto: 'समय स्वतः दर्ज किया गया',
    descriptionOptional: 'वैकल्पिक विवरण...',
    submitReport: 'रिपोर्ट सबमिट करें',
    offlineMode: 'ऑफ़लाइन मोड (OFFLINE MODE)',
    offlineBannerSub: 'इंटरनेट लौटने पर आपकी रिपोर्ट अपने आप भेज दी जाएगी।',
    savedOffline: 'ऑफ़लाइन सुरक्षित (SAVED OFFLINE)',
    savedOfflineSub: 'कनेक्शन मिलते ही रिपोर्ट अपने आप सिंक हो जाएगी।',
    syncStatus: 'सिंक स्थिति (SYNC STATUS)',
    pendingReports: 'लंबित रिपोर्ट:',
    pendingGps: 'लंबित जीपीएस:',
    pendingPhotos: 'लंबित फोटो:',
    lastSync: 'अंतिम सिंक:',
    syncing: 'सिंक हो रहा है...',
    syncComplete: 'सिंक पूर्ण (SYNC COMPLETE)',
    syncNow: 'अभी सिंक करें',
    acceptSaferRoute: 'सुरक्षित मार्ग स्वीकार करें',
    routeUpdated: 'मार्ग अपडेट हुआ',
    continueSaferRoute: 'सुरक्षित मार्ग का उपयोग जारी रखें।',
    criticalDeliveryAlert: 'अति आवश्यक डिलीवरी',
    criticalDeliveryMsg: 'आपकी खेप उच्च प्राथमिकता वाली है।',
    criticalFindingSafer: 'EXTRICATE इस डिलीवरी के लिए सुरक्षित मार्ग खोज रहा है।',
    roadBlocked: 'सड़क अवरुद्ध (ROAD BLOCKED)',
    flood: 'बाढ़ (FLOOD)',
    landslide: 'भूस्खलन (LANDSLIDE)',
    roadDamage: 'सड़क क्षति (ROAD DAMAGE)',
    heavyRain: 'भारी बारिश (HEAVY RAIN)',
    bridgeDamage: 'पुल क्षतिग्रस्त (BRIDGE DAMAGE)',
    accident: 'दुर्घटना (ACCIDENT)',
    other: 'अन्य (OTHER)',
    driverProfile: 'ड्राइवर प्रोफाइल',
    language: 'भाषा (LANGUAGE)',
    logout: 'लॉग आउट',
    shipmentsTitle: 'आवंटित खेप (SHIPMENTS)',
    currentShipment: 'वर्तमान खेप',
    upcomingShipments: 'आगामी खेप',
    completedShipments: 'पूर्ण हुई खेप',
    cargoDetails: 'कार्गो विवरण',
    pickup: 'पिकअप',
    delivery: 'वितरण',
    emergencyContact: 'आपातकालीन संपर्क',
    instructions: 'निर्देश',
  },
  as: {
    appName: 'EXTRICATE',
    appSubtitle: 'চালক আৰু ফিল্ড এপ',
    loginTitle: 'চালক প্ৰৱেশ',
    driverId: 'চালক আইডি',
    password: 'পাছৱৰ্ড',
    loginButton: 'লগইন কৰক',
    secureDriverAccess: 'সুৰক্ষিত চালক প্ৰৱেশাধিকাৰ',
    goodMorning: 'শুভ প্ৰভাত, অৰুণ',
    currentDelivery: 'বৰ্তমান বিতৰণ',
    priority: 'অগ্ৰাধিকাৰ:',
    critical: 'জৰুৰী (CRITICAL)',
    destination: 'গন্তব্যস্থান:',
    eta: 'সময় (ETA):',
    route: 'পথৰ অৱস্থা:',
    open: 'খোলা (OPEN)',
    degraded: 'ক্ষতিগ্ৰস্ত (DEGRADED)',
    highRisk: 'উচ্চ সংকট (HIGH-RISK)',
    blocked: 'অৱৰোধ (BLOCKED)',
    connectivity: 'সংযোগ:',
    connection: 'সংযোগ:',
    online: 'অনলাইন (ONLINE)',
    offline: 'অফলাইন (OFFLINE)',
    startTrip: 'যাত্ৰা আৰম্ভ কৰক',
    endTrip: 'যাত্ৰা সমাপ্ত কৰক',
    gpsActive: 'জিপিএছ সক্ৰিয়',
    gpsUnavailable: 'জিপিএছ উপলব্ধ নহয়',
    enableLocation: 'স্থান সক্ষম কৰক',
    lastUpdated: 'অন্তিম নবীকৰণ:',
    routeScreenTitle: 'আপোনাৰ পথ',
    yourRoute: 'আপোনাৰ পথ',
    distance: 'দূৰত্ব:',
    reportTitle: 'পথৰ অৱস্থাৰ প্ৰতিবেদন দিয়ক',
    takePhoto: 'ফটো তোলক',
    addPhoto: 'ফটো যোগ কৰক',
    locationAuto: 'স্বয়ংক্রিয়ভাৱে সংগ্ৰহ কৰা হৈছে',
    timeAuto: 'স্বয়ংক্রিয়ভাৱে সংগ্ৰহ কৰা হৈছে',
    descriptionOptional: 'বিকল্প টোকা...',
    submitReport: 'প্ৰতিবেদন জমা দিয়ক',
    offlineMode: 'অফলাইন মোড',
    offlineBannerSub: 'সংযোগ ঘূৰি আহিলে প্ৰতিবেদন প্ৰেৰণ কৰা হ’ব।',
    savedOffline: 'অফলাইনত সংৰক্ষিত',
    savedOfflineSub: 'ইন্টাৰনেট ঘূৰি আহিলে স্বয়ংক্ৰিয়ভাৱে ছিংক হ’ব।',
    syncStatus: 'ছিংক অৱস্থা',
    pendingReports: 'বাকী থকা প্ৰতিবেদন:',
    pendingGps: 'বাকী থকা জিপিএছ:',
    pendingPhotos: 'বাকী থকা ফটো:',
    lastSync: 'অন্তিম ছিংক:',
    syncing: 'ছিংক হৈ আছে...',
    syncComplete: 'ছিংক সম্পূৰ্ণ',
    syncNow: 'এতিয়াই ছিংক কৰক',
    acceptSaferRoute: 'সুৰক্ষিত পথ গ্ৰহণ কৰক',
    routeUpdated: 'পথ নবীকৰণ কৰা হ’ল',
    continueSaferRoute: 'সুৰক্ষিত পথ ব্যৱহাৰ অব্যাহত ৰাখক।',
    criticalDeliveryAlert: 'সংকটপূৰ্ণ বিতৰণ',
    criticalDeliveryMsg: 'আপোনাৰ সামগ্ৰী অতি অগ্ৰাধিকাৰপ্ৰাপ্ত।',
    criticalFindingSafer: 'EXTRICATE য়ে সুৰক্ষিত বিকল্প বিচাৰি আছে।',
    roadBlocked: 'পথ অৱৰোধ',
    flood: 'বানপানী',
    landslide: 'ভূমিস্খলন',
    roadDamage: 'পথ ক্ষতি',
    heavyRain: 'প্ৰৱল বৰষুণ',
    bridgeDamage: 'দলং ক্ষতি',
    accident: 'দুৰ্ঘটনা',
    other: 'অন্যান্য',
    driverProfile: 'চালকৰ প্ৰফাইল',
    language: 'ভাষা (LANGUAGE)',
    logout: 'লগআউট',
    shipmentsTitle: 'নিৰ্ধাৰিত সামগ্ৰী',
    currentShipment: 'বৰ্তমান সামগ্ৰী',
    upcomingShipments: 'আগন্তুক সামগ্ৰী',
    completedShipments: 'সম্পূৰ্ণ হোৱা সামগ্ৰী',
    cargoDetails: 'সামগ্ৰীৰ বিৱৰণ',
    pickup: 'সংগ্ৰহ স্থান',
    delivery: 'বিতৰণ স্থান',
    emergencyContact: 'জৰুৰীকালীন যোগাযোগ',
    instructions: 'নিৰ্দেশনাৱলী',
  },
};
