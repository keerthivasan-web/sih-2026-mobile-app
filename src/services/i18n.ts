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
  fromLocation: string;
  toLocation: string;
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
  viewRoute: string;
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
  retakePhoto: string;
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
  autoSuggestedRoute: string;
  clickMapToReroute: string;
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
  suggestedRoutes: string;
  shipmentsTitle: string;
  currentShipment: string;
  upcomingShipments: string;
  completedShipments: string;
  cargoDetails: string;
  pickup: string;
  delivery: string;
  emergencyContact: string;
  instructions: string;
  tabHome: string;
  tabRoute: string;
  tabReport: string;
  tabProfile: string;
  driverDashboard: string;
  routeNavigation: string;
  reportCondition: string;
  useSafeRoute: string;
  viewMap: string;
  modeTruck: string;
  modeExpress: string;
  modeRail: string;
  viewAll: string;
  hideManifest: string;
  viewManifest: string;
  travelTime: string;
  origin: string;
  stationSector: string;
  saferRouteMessage: string;
  reportAnotherProblem: string;
  cameraPreview: string;
  confirmPhoto: string;
  cancel: string;
  cameraViewfinder: string;
  sensorSimulatorReady: string;
  sensorSimulatorSubtext: string;
  tacticalPresetsTitle: string;
  presetRockfall: string;
  presetFlood: string;
  presetCones: string;
  usePreset: string;
  captureFrame: string;
  uploadPhoto: string;
  useVerifiedShot: string;
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
    goodMorning: 'Good Morning, Arun',
    currentDelivery: 'CURRENT DELIVERY',
    priority: 'Priority',
    critical: 'CRITICAL',
    destination: 'Destination',
    fromLocation: 'From',
    toLocation: 'To',
    eta: 'ETA',
    route: 'Route Status',
    open: 'SAFE ROUTE',
    degraded: 'MODERATE RISK',
    highRisk: 'HIGH RISK',
    blocked: 'BLOCKED',
    connectivity: 'Connectivity',
    connection: 'Connection',
    online: 'Connected',
    offline: 'Offline',
    startTrip: '[ START TRIP ]',
    endTrip: '[ END TRIP ]',
    viewRoute: '[ VIEW ROUTE ]',
    gpsActive: 'GPS ACTIVE',
    gpsUnavailable: 'GPS unavailable',
    enableLocation: 'ENABLE LOCATION',
    lastUpdated: 'Last Updated',
    routeScreenTitle: 'YOUR ROUTE',
    yourRoute: 'YOUR ROUTE',
    distance: 'Distance',
    reportTitle: 'REPORT ROAD CONDITION',
    takePhoto: 'TAKE PHOTO',
    addPhoto: 'Add Photo',
    retakePhoto: 'RETAKE',
    locationAuto: 'Captured automatically',
    timeAuto: 'Captured automatically',
    descriptionOptional: 'Add a short note...',
    submitReport: '[ SUBMIT REPORT ]',
    offlineMode: 'OFFLINE MODE',
    offlineBannerSub: 'Your report will be saved and sent automatically when connection returns.',
    savedOffline: '✓ SAVED OFFLINE',
    savedOfflineSub: 'Your report will sync automatically when internet returns.',
    syncStatus: 'SYNC STATUS',
    pendingReports: 'Pending Reports',
    pendingGps: 'Pending GPS',
    pendingPhotos: 'Pending Photos',
    lastSync: 'Last Sync',
    syncing: 'SYNCING...',
    syncComplete: '✓ SYNCED',
    syncNow: 'SYNC NOW',
    acceptSaferRoute: '[ ACCEPT ROUTE ]',
    routeUpdated: 'ROUTE UPDATED',
    autoSuggestedRoute: 'Auto-Suggested Safe Route',
    clickMapToReroute: 'Click on any route on the map to switch routes',
    continueSaferRoute: 'Continue using the safer route.',
    criticalDeliveryAlert: 'CRITICAL DELIVERY',
    criticalDeliveryMsg: 'Your shipment has high priority.',
    criticalFindingSafer: 'EXTRICATE is finding a safer route for this delivery.',
    roadBlocked: 'Road Blocked',
    flood: 'Flood',
    landslide: 'Landslide',
    roadDamage: 'Road Damage',
    heavyRain: 'Heavy Rain',
    bridgeDamage: 'Bridge Damage',
    accident: 'Accident',
    other: 'Other',
    driverProfile: 'DRIVER PROFILE',
    language: 'LANGUAGE',
    logout: 'Logout',
    suggestedRoutes: 'Suggested Routes & Deliveries',
    shipmentsTitle: 'ASSIGNED SHIPMENTS',
    currentShipment: 'CURRENT SHIPMENT',
    upcomingShipments: 'UPCOMING SHIPMENTS',
    completedShipments: 'COMPLETED SHIPMENTS',
    cargoDetails: 'CARGO DETAILS',
    pickup: 'Pickup',
    delivery: 'Delivery',
    emergencyContact: 'Emergency Contact',
    instructions: 'Instructions',
    tabHome: 'Home',
    tabRoute: 'Route',
    tabReport: 'Report',
    tabProfile: 'Profile',
    driverDashboard: 'Driver Dashboard',
    routeNavigation: 'Route Navigation',
    reportCondition: 'Report Condition',
    useSafeRoute: '[ USE SAFE ROUTE ]',
    viewMap: '[ VIEW MAP ]',
    modeTruck: 'Truck',
    modeExpress: 'Express',
    modeRail: 'Rail',
    viewAll: 'View All',
    hideManifest: 'Hide Shipment Manifest',
    viewManifest: '[ VIEW MANIFEST DETAILS ]',
    travelTime: 'Travel time',
    origin: 'Origin',
    stationSector: 'Sector 3 Corridor',
    saferRouteMessage: '"14 minutes longer, but significantly safer."',
    reportAnotherProblem: 'REPORT ANOTHER PROBLEM',
    cameraPreview: 'Camera Live Preview',
    confirmPhoto: 'CONFIRM PHOTO',
    cancel: 'CANCEL',
    cameraViewfinder: 'RAW CAMERA VIEWFINDER • 1080P',
    sensorSimulatorReady: 'OPTICAL SENSOR SIMULATOR READY',
    sensorSimulatorSubtext: 'Select a field hazard preset capture below or upload a custom image. EXIF telemetry will be dynamically authenticated and stamped.',
    tacticalPresetsTitle: 'TACTICAL HAZARD PRESETS (FIELD CAMERA SHOTS)',
    presetRockfall: 'Mountain Rockfall Debris',
    presetFlood: 'Flooded Culvert Overflow',
    presetCones: 'Road Hazard Obstruction',
    usePreset: 'USE PRESET →',
    captureFrame: 'CAPTURE FRAME',
    uploadPhoto: 'UPLOAD PHOTO',
    useVerifiedShot: 'USE VERIFIED SHOT',
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
    priority: 'प्राथमिकता',
    critical: 'अति महत्वपूर्ण',
    destination: 'गंतव्य',
    fromLocation: 'प्रारंभिक स्थान',
    toLocation: 'गंतव्य स्थान',
    eta: 'अनुमानित समय (ETA)',
    route: 'मार्ग स्थिति',
    open: 'सुरक्षित मार्ग',
    degraded: 'मध्यम जोखिम',
    highRisk: 'उच्च जोखिम',
    blocked: 'अवरुद्ध',
    connectivity: 'नेटवर्क',
    connection: 'कनेक्शन',
    online: 'कनेक्टेड',
    offline: 'ऑफ़लाइन',
    startTrip: '[ यात्रा शुरू करें ]',
    endTrip: '[ यात्रा समाप्त करें ]',
    viewRoute: '[ मार्ग देखें ]',
    gpsActive: 'जीपीएस सक्रिय',
    gpsUnavailable: 'जीपीएस अनुपलब्ध',
    enableLocation: 'स्थान चालू करें',
    lastUpdated: 'अंतिम अपडेट',
    routeScreenTitle: 'आपका मार्ग',
    yourRoute: 'आपका मार्ग',
    distance: 'दूरी',
    reportTitle: 'सड़क की स्थिति रिपोर्ट करें',
    takePhoto: 'फोटो खींचे',
    addPhoto: 'फोटो जोड़ें',
    retakePhoto: 'पुनः फोटो खींचे',
    locationAuto: 'स्थान स्वतः दर्ज किया गया',
    timeAuto: 'समय स्वतः दर्ज किया गया',
    descriptionOptional: 'संक्षिप्त विवरण दर्ज करें...',
    submitReport: '[ रिपोर्ट सबमिट करें ]',
    offlineMode: 'ऑफ़लाइन मोड',
    offlineBannerSub: 'इंटरनेट लौटने पर आपकी रिपोर्ट अपने आप भेज दी जाएगी।',
    savedOffline: '✓ ऑफ़लाइन सुरक्षित',
    savedOfflineSub: 'कनेक्शन मिलते ही रिपोर्ट अपने आप सिंक हो जाएगी।',
    syncStatus: 'सिंक स्थिति',
    pendingReports: 'लंबित रिपोर्ट',
    pendingGps: 'लंबित जीपीएस',
    pendingPhotos: 'लंबित फोटो',
    lastSync: 'अंतिम सिंक',
    syncing: 'सिंक हो रहा है...',
    syncComplete: '✓ सिंक पूर्ण',
    syncNow: 'अभी सिंक करें',
    acceptSaferRoute: '[ मार्ग स्वीकार करें ]',
    routeUpdated: 'मार्ग अपडेट हुआ',
    autoSuggestedRoute: 'स्वचालित सुझाया गया सुरक्षित मार्ग',
    clickMapToReroute: 'मार्ग बदलने के लिए मानचित्र पर किसी भी मार्ग पर क्लिक करें',
    continueSaferRoute: 'सुरक्षित मार्ग का उपयोग जारी रखें।',
    criticalDeliveryAlert: 'अति आवश्यक डिलीवरी',
    criticalDeliveryMsg: 'आपकी खेप उच्च प्राथमिकता वाली है।',
    criticalFindingSafer: 'EXTRICATE इस डिलीवरी के लिए सुरक्षित मार्ग खोज रहा है।',
    roadBlocked: 'सड़क अवरुद्ध',
    flood: 'बाढ़',
    landslide: 'भूस्खलन',
    roadDamage: 'सड़क क्षति',
    heavyRain: 'भारी बारिश',
    bridgeDamage: 'पुल क्षतिग्रस्त',
    accident: 'दुर्घटना',
    other: 'अन्य',
    driverProfile: 'ड्राइवर प्रोफाइल',
    language: 'भाषा',
    logout: 'लॉग आउट',
    suggestedRoutes: 'सुझाए गए मार्ग एवं डिलीवरी',
    shipmentsTitle: 'आवंटित खेप',
    currentShipment: 'वर्तमान खेप',
    upcomingShipments: 'आगामी खेप',
    completedShipments: 'पूर्ण हुई खेप',
    cargoDetails: 'कार्गो विवरण',
    pickup: 'पिकअप',
    delivery: 'वितरण',
    emergencyContact: 'आपातकालीन संपर्क',
    instructions: 'निर्देश',
    tabHome: 'होम',
    tabRoute: 'मार्ग',
    tabReport: 'रिपोर्ट',
    tabProfile: 'प्रोफ़ाइल',
    driverDashboard: 'ड्राइवर डैशबोर्ड',
    routeNavigation: 'मार्ग नेविगेशन',
    reportCondition: 'रिपोर्ट स्थिति',
    useSafeRoute: '[ सुरक्षित मार्ग का उपयोग करें ]',
    viewMap: '[ मानचित्र देखें ]',
    modeTruck: 'ट्रक',
    modeExpress: 'एक्सप्रेस',
    modeRail: 'रेलवे',
    viewAll: 'सभी देखें',
    hideManifest: 'मैनिफेस्ट विवरण छिपाएं',
    viewManifest: '[ मैनिफेस्ट विवरण देखें ]',
    travelTime: 'यात्रा समय',
    origin: 'प्रारंभिक स्थान',
    stationSector: 'सेक्टर 3 कॉरिडोर',
    saferRouteMessage: '"14 मिनट अधिक, लेकिन बहुत अधिक सुरक्षित।"',
    reportAnotherProblem: 'दूसरी समस्या रिपोर्ट करें',
    cameraPreview: 'कैमरा लाइव पूर्वावलोकन',
    confirmPhoto: 'फोटो की पुष्टि करें',
    cancel: 'रद्द करें',
    cameraViewfinder: 'कैमरा लाइव व्यूफ़ाइंडर • 1080P',
    sensorSimulatorReady: 'ऑप्टिकल सेंसर सिमुलेटर तैयार',
    sensorSimulatorSubtext: 'नीचे फ़ील्ड ख़तरे का प्रीसेट चुनें या अपनी फ़ोटो अपलोड करें। EXIF डेटा स्वतः सत्यापित होगा।',
    tacticalPresetsTitle: 'फ़ील्ड कैमरा प्रीसेट (फ़ील्ड फ़ोटो)',
    presetRockfall: 'पहाड़ी भूस्खलन मलबे',
    presetFlood: 'जलभराव / बाढ़',
    presetCones: 'सड़क बाधा',
    usePreset: 'प्रीसेट चुनें →',
    captureFrame: 'फ़ोटो खींचें',
    uploadPhoto: 'फ़ोटो अपलोड करें',
    useVerifiedShot: 'सत्यापित फ़ोटो चुनें',
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
    priority: 'অগ্ৰাধিকাৰ',
    critical: 'জৰুৰী',
    destination: 'গন্তব্যস্থান',
    fromLocation: 'প্ৰাৰম্ভিক স্থান',
    toLocation: 'গন্তব্য স্থান',
    eta: 'সময় (ETA)',
    route: 'পথৰ অৱস্থা',
    open: 'সুৰক্ষিত পথ',
    degraded: 'মধ্যম সংকট',
    highRisk: 'উচ্চ সংকট',
    blocked: 'অৱৰোধ',
    connectivity: 'সংযোগ',
    connection: 'সংযোগ',
    online: 'সংযুক্ত',
    offline: 'অফলাইন',
    startTrip: '[ যাত্ৰা আৰম্ভ কৰক ]',
    endTrip: '[ যাত্ৰা সমাপ্ত কৰক ]',
    viewRoute: '[ পথ চাওক ]',
    gpsActive: 'জিপিএছ সক্ৰিয়',
    gpsUnavailable: 'জিপিএছ উপলব্ধ নহয়',
    enableLocation: 'স্থান সক্ষম কৰক',
    lastUpdated: 'অন্তিম নবীকৰণ',
    routeScreenTitle: 'আপোনাৰ পথ',
    yourRoute: 'আপোনাৰ পথ',
    distance: 'দূৰত্ব',
    reportTitle: 'পথৰ অৱস্থাৰ প্ৰতিবেদন দিয়ক',
    takePhoto: 'ফটো তোলক',
    addPhoto: 'ফটো যোগ কৰক',
    retakePhoto: 'পুনৰ ফটো তোলক',
    locationAuto: 'স্বয়ংক্রিয়ভাৱে সংগ্ৰহ কৰা হৈছে',
    timeAuto: 'স্বয়ংক্রিয়ভাৱে সংগ্ৰহ কৰা হৈছে',
    descriptionOptional: 'চমু টোকা যোগ কৰক...',
    submitReport: '[ প্ৰতিবেদন জমা দিয়ক ]',
    offlineMode: 'অফলাইন মোড',
    offlineBannerSub: 'সংযোগ ঘূৰি আহিলে প্ৰতিবেদন স্বয়ংক্ৰিয়ভাৱে প্ৰেৰণ কৰা হ’ব।',
    savedOffline: '✓ অফলাইনত সংৰক্ষিত',
    savedOfflineSub: 'ইন্টাৰনেট ঘূৰি আহিলে স্বয়ংক্ৰিয়ভাৱে ছিংক হ’ব।',
    syncStatus: 'ছিংক অৱস্থা',
    pendingReports: 'বাকী থকা প্ৰতিবেদন',
    pendingGps: 'বাকী থকা জিপিএছ',
    pendingPhotos: 'বাকী থকা ফটো',
    lastSync: 'অন্তিম ছিংক',
    syncing: 'ছিংক হৈ আছে...',
    syncComplete: '✓ ছিংক সম্পূৰ্ণ',
    syncNow: 'এতিয়াই ছিংক কৰক',
    acceptSaferRoute: '[ পথ গ্ৰহণ কৰক ]',
    routeUpdated: 'পথ নবীকৰণ কৰা হ’ল',
    autoSuggestedRoute: 'স্বয়ংক্ৰিয়ভাৱে পৰামৰ্শ দিয়া সুৰক্ষিত পথ',
    clickMapToReroute: 'পথ সলনি কৰিবলৈ মেপত যিকোনো পথত ক্লিক কৰক',
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
    language: 'ভাষা',
    logout: 'লগআউট',
    suggestedRoutes: 'পৰামৰ্শিত পথ আৰু বিতৰণ',
    shipmentsTitle: 'নিৰ্ধাৰিত সামগ্ৰী',
    currentShipment: 'বৰ্তমান সামগ্ৰী',
    upcomingShipments: 'আগন্তুক সামগ্ৰী',
    completedShipments: 'সম্পূৰ্ণ হোৱা সামগ্ৰী',
    cargoDetails: 'সামগ্ৰীৰ বিৱৰণ',
    pickup: 'সংগ্ৰহ স্থান',
    delivery: 'বিতৰণ স্থান',
    emergencyContact: 'জৰুৰীকালীন যোগাযোগ',
    instructions: 'নিৰ্দেশনাৱলী',
    tabHome: 'হোম',
    tabRoute: 'পথ',
    tabReport: 'ৰিপোৰ্ট',
    tabProfile: 'প্ৰফাইল',
    driverDashboard: 'চালক ডেশ্বব’ৰ্ড',
    routeNavigation: 'পথ নেভিগেচন',
    reportCondition: 'প্ৰতিবেদন দিঅ’ক',
    useSafeRoute: '[ সুৰক্ষিত পথ ব্যৱহাৰ কৰক ]',
    viewMap: '[ মেপ চাওক ]',
    modeTruck: 'ট্ৰাক',
    modeExpress: 'এক্সপ্ৰেছ',
    modeRail: 'ৰেলৱে',
    viewAll: 'সকলো চাওক',
    hideManifest: 'বিৱৰণ লুকুৱাওক',
    viewManifest: '[ বিৱৰণ চাওক ]',
    travelTime: 'ভ্ৰমণৰ সময়',
    origin: 'প্ৰাৰম্ভিক স্থান',
    stationSector: 'ছেক্টৰ ৩ কৰিডৰ',
    saferRouteMessage: '"১৪ মিনিট বেছি, কিন্তু যথেষ্ট সুৰক্ষিত।"',
    reportAnotherProblem: 'অন্য সমস্যা ৰিপোৰ্ট কৰক',
    cameraPreview: 'কেমেৰা লাইভ প্ৰাকদৰ্শন',
    confirmPhoto: 'ফটো নিশ্চিত কৰক',
    cancel: 'বাতিল কৰক',
    cameraViewfinder: 'কেমেৰা লাইভ ভিউফ্ৰেম • 1080P',
    sensorSimulatorReady: 'অপ্টিকেল চেঞ্চৰ প্ৰস্তুত',
    sensorSimulatorSubtext: 'তলত থকা ফিল্ড দৃশ্য নিৰ্বাচন কৰক বা অন্য ফটো আপলোড কৰক। EXIF ডাটা স্বয়ংক্ৰিয়ভাৱে স্থানান্তৰ কৰা হ’ব।',
    tacticalPresetsTitle: 'ফিল্ড কেমেৰা প্ৰিছেট (ফিল্ড ফটো)',
    presetRockfall: 'পাহাৰীয়া ভূমিস্খলন',
    presetFlood: 'বানপানীৰ পানী',
    presetCones: 'পথৰ অৱৰোধ',
    usePreset: 'প্ৰিছেট বাছক →',
    captureFrame: 'ফটো তোলক',
    uploadPhoto: 'ফটো আপলোড কৰক',
    useVerifiedShot: 'যাচাই কৰা ফটো বাছক',
  },
};
