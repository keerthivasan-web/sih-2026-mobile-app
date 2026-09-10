import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  DriverProfile,
  Shipment,
  IncidentReport,
  GpsPoint,
  RiskAlert,
  RouteMetrics,
  IncidentCategory,
} from '../types';
import { StorageService } from '../services/storage';
import { api } from '../services/api';
import { translations, SupportedLanguage, TranslationStrings } from '../services/i18n';

export type NavTab = 'home' | 'route' | 'report' | 'shipments' | 'profile';
export type ViewMode = 'mobile' | 'dashboard' | 'split';

interface AppContextType {
  isLoggedIn: boolean;
  login: (id?: string) => void;
  logout: () => void;

  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationStrings;

  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;

  driver: DriverProfile;
  shipments: Shipment[];
  activeShipment: Shipment;
  setActiveShipmentId: (id: string) => void;

  routeMetrics: RouteMetrics;
  incidents: IncidentReport[];
  gpsBuffer: GpsPoint[];
  currentGps: {
    lat: number;
    lon: number;
    alt: number;
    speed: number;
    heading: number;
    accuracy: number;
    sats: number;
    lockStatus: string;
  };

  isGpsAvailable: boolean;
  enableGps: () => void;
  toggleGpsAvailable: () => void;

  isTripActive: boolean;
  toggleTrip: () => void;

  isOffline: boolean;
  toggleOffline: () => void;

  isSyncing: boolean;
  triggerSync: () => Promise<void>;

  activeAlert: RiskAlert | null;
  dismissAlert: () => void;
  acceptReroute: () => Promise<void>;
  isRerouteModalOpen: boolean;
  setIsRerouteModalOpen: (open: boolean) => void;

  pendingCounts: {
    pendingReports: number;
    pendingGps: number;
    pendingMedia: number;
    totalPayloadMb: string;
  };

  submitReport: (reportData: {
    category: IncidentCategory;
    categoryLabel: string;
    description: string;
    photoUrl?: string;
    aiDetectionLabel?: string;
    aiConfidence?: number;
  }) => Promise<void>;

  // Simulation controls
  simulateRoadBlock: () => void;
  simulateFlood: () => void;
  simulateHeavyRain: () => void;
  resetSimulation: () => void;

  // 12-Step Guided Walkthrough
  demoStep: number;
  setDemoStep: (step: number) => void;
  isDemoGuideOpen: boolean;
  setIsDemoGuideOpen: (open: boolean) => void;

  toast: { message: string; type: 'success' | 'warning' | 'error' | 'info'; icon?: string } | null;
  showToast: (message: string, type?: 'success' | 'warning' | 'error' | 'info', icon?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const t = translations[language];

  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [viewMode, setViewMode] = useState<ViewMode>('mobile');

  const [driver, setDriver] = useState<DriverProfile>(() => StorageService.getDriver());
  const [shipments, setShipments] = useState<Shipment[]>(() => StorageService.getShipments());
  const [activeShipmentId, setActiveShipmentIdState] = useState<string>(() => StorageService.getActiveShipment().id);

  const [routeMetrics, setRouteMetrics] = useState<RouteMetrics>(() => StorageService.getRouteMetrics());
  const [incidents, setIncidents] = useState<IncidentReport[]>(() => StorageService.getIncidents());
  const [gpsBuffer, setGpsBuffer] = useState<GpsPoint[]>(() => StorageService.getGpsBuffer());

  const [isTripActive, setIsTripActive] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(() => StorageService.isOfflineMode());
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [activeAlert, setActiveAlert] = useState<RiskAlert | null>(() => StorageService.getActiveAlert());
  const [isRerouteModalOpen, setIsRerouteModalOpen] = useState<boolean>(false);

  const [isGpsAvailable, setIsGpsAvailable] = useState<boolean>(true);

  const [demoStep, setDemoStep] = useState<number>(1);
  const [isDemoGuideOpen, setIsDemoGuideOpen] = useState<boolean>(false);

  const [currentGps, setCurrentGps] = useState({
    lat: 27.1418,
    lon: 88.3104,
    alt: 2410,
    speed: 48,
    heading: 24,
    accuracy: 2.4,
    sats: 14,
    lockStatus: 'LOCKED',
  });

  const [pendingCounts, setPendingCounts] = useState(() => StorageService.getPendingCounts());
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'warning' | 'error' | 'info'; icon?: string } | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'warning' | 'error' | 'info' = 'info', icon?: string) => {
    setToast({ message, type, icon });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  }, []);

  const refreshStateFromStorage = useCallback(() => {
    setDriver(StorageService.getDriver());
    setShipments(StorageService.getShipments());
    setRouteMetrics(StorageService.getRouteMetrics());
    setIncidents(StorageService.getIncidents());
    setGpsBuffer(StorageService.getGpsBuffer());
    setActiveAlert(StorageService.getActiveAlert());
    setPendingCounts(StorageService.getPendingCounts());
  }, []);

  const setActiveShipmentId = useCallback((id: string) => {
    StorageService.setActiveShipment(id);
    setActiveShipmentIdState(id);
    showToast(`Active HUD linked to ${id}`, 'info', 'inventory_2');
  }, [showToast]);

  const activeShipment = shipments.find((s) => s.id === activeShipmentId) || shipments[0];

  // GPS breadcrumb telemetry ticker when trip is active
  useEffect(() => {
    if (!isTripActive) return;

    const interval = setInterval(() => {
      setCurrentGps((prev) => {
        const deltaLat = (Math.random() - 0.48) * 0.0006;
        const deltaLon = (Math.random() - 0.45) * 0.0006;
        const speedVar = Math.max(20, Math.min(65, prev.speed + Math.floor((Math.random() - 0.5) * 6)));
        const newLat = Number((prev.lat + deltaLat).toFixed(4));
        const newLon = Number((prev.lon + deltaLon).toFixed(4));

        const newPoint: GpsPoint = {
          id: `GPS-${Date.now()}`,
          localId: `LOC-GPS-${Date.now()}`,
          latitude: newLat,
          longitude: newLon,
          altitudeMeters: prev.alt,
          accuracyMeters: prev.accuracy,
          speedKmh: speedVar,
          headingDegrees: prev.heading,
          timestamp: new Date().toISOString(),
          syncStatus: isOffline ? 'PENDING' : 'SYNCED',
        };

        api.sendGpsPoint(newPoint).then(() => {
          setGpsBuffer(StorageService.getGpsBuffer());
          setPendingCounts(StorageService.getPendingCounts());
        });

        return {
          ...prev,
          lat: newLat,
          lon: newLon,
          speed: speedVar,
        };
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isTripActive, isOffline]);

  // Trip Toggle (START TRIP / HALT TRIP)
  const toggleTrip = useCallback(() => {
    setIsTripActive((prev) => {
      const next = !prev;
      if (next) {
        showToast('TRIP COMMENCED • AVIONICS HUD & GPS ENGAGED', 'success', 'check_circle');
        if (demoStep === 3) setDemoStep(4);
      } else {
        showToast('TRIP PAUSED • TELEMETRY FLUSHED TO LOCAL CACHE', 'info', 'pause_circle');
      }
      return next;
    });
  }, [demoStep, showToast]);

  // Offline Mode Toggle
  const toggleOffline = useCallback(() => {
    setIsOffline((prev) => {
      const next = !prev;
      StorageService.setOfflineMode(next);
      if (next) {
        showToast('OFFLINE MODE ACTIVE: Zero RF signal. Buffering locally.', 'warning', 'signal_disconnected');
        if (demoStep === 11) setDemoStep(12);
      } else {
        showToast('UPLINK RESTORED: Connected to 4G Cellular / Satellite.', 'success', 'wifi_tethering');
      }
      return next;
    });
  }, [demoStep, showToast]);

  // Trigger Force Sync
  const triggerSync = useCallback(async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    showToast('TRANSMITTING OUTBOX PACKETS VIA TLS 1.3...', 'info', 'sync');

    try {
      await api.syncAllQueued();
      refreshStateFromStorage();
      showToast('ALL SYNCHRONIZED: 0 Objects waiting in outbox queue', 'success', 'cloud_done');
      if (demoStep === 12) {
        setDemoStep(13); // Completed!
        showToast('DEMO SCENARIO COMPLETE! Synced to Web Dashboard.', 'success', 'verified');
      }
    } catch {
      showToast('SYNC FAILED: Stored in offline buffer for auto-retry', 'error', 'error');
    } finally {
      setIsSyncing(false);
    }
  }, [isSyncing, demoStep, refreshStateFromStorage, showToast]);

  // Accept Reroute
  const acceptReroute = useCallback(async () => {
    const res = await api.acceptReroute('RT-NH108');
    setRouteMetrics(res.metrics);
    setActiveAlert(null);
    showToast('HUD UPDATED: Navigating via East Pass Bypass (158 KM)', 'success', 'alt_route');
    if (demoStep === 7) setDemoStep(8);
  }, [demoStep, showToast]);

  const dismissAlert = useCallback(() => {
    setActiveAlert(null);
    showToast('RISK ALERT DISMISSED: Driver acknowledged advisory', 'info', 'close');
  }, [showToast]);

  // Submit Incident Report
  const submitReport = useCallback(
    async (reportData: {
      category: IncidentCategory;
      categoryLabel: string;
      description: string;
      photoUrl?: string;
      aiDetectionLabel?: string;
      aiConfidence?: number;
    }) => {
      const incidentId = `INC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const localId = `LOC-${incidentId}`;

      const newReport: IncidentReport = {
        id: incidentId,
        localId,
        incidentCode: incidentId,
        category: reportData.category,
        categoryLabel: reportData.categoryLabel,
        description: reportData.description,
        latitude: currentGps.lat,
        longitude: currentGps.lon,
        altitudeMeters: currentGps.alt,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        driverId: driver.driverId,
        driverName: driver.name,
        vehicleId: driver.vehicleId,
        photoUrl: reportData.photoUrl,
        aiDetectionLabel: reportData.aiDetectionLabel,
        aiConfidence: reportData.aiConfidence,
        syncStatus: isOffline ? 'PENDING' : 'SYNCED',
        payloadSizeKb: reportData.photoUrl ? 1200 : 340,
        roadLocation: `KM ${Math.floor(65 + Math.random() * 20)} Corridor Sector`,
      };

      await api.submitIncident(newReport);
      refreshStateFromStorage();

      if (isOffline) {
        showToast(`SAVED TO OFFLINE BUFFER (${incidentId}). Sync pending.`, 'warning', 'save');
      } else {
        showToast(`INCIDENT REPORTED (${incidentId}) & TRANSMITTED TO HQ`, 'success', 'check_circle');
      }

      if (demoStep === 9 || demoStep === 10) {
        setDemoStep(11); // Advance to Simulate Offline
      }
    },
    [currentGps, driver, isOffline, demoStep, refreshStateFromStorage, showToast]
  );

  // Simulation controls
  const simulateRoadBlock = useCallback(() => {
    const alert: RiskAlert = {
      id: `ALT-${Date.now()}`,
      active: true,
      title: 'ROUTE RISK DETECTED: ROAD BLOCKED',
      cause: 'Severe rockfall debris + mudslide on NH-108 Corridor at KM 74',
      currentRisk: 'BLOCKED',
      alternativeRisk: 'OPEN',
      location: 'NH-108 Corridor at KM 74',
      impactDelayMins: 55,
      timestamp: 'JUST NOW',
      alternativeRouteName: 'East Pass Bypass Corridor',
      alternativeDistanceKm: 158,
    };
    StorageService.saveActiveAlert(alert);
    setActiveAlert(alert);

    const m = StorageService.getRouteMetrics();
    m.currentRisk = 'BLOCKED';
    m.currentRiskLabel = 'NH-108 KM 74 Impassable (Rockfall)';
    StorageService.saveRouteMetrics(m);
    setRouteMetrics({ ...m });

    showToast('CRITICAL: ROAD BLOCK DETECTED. ALTERNATIVE ROUTE AVAILABLE.', 'error', 'block');
    if (demoStep === 4 || demoStep === 5) setDemoStep(6);
  }, [demoStep, showToast]);

  const simulateFlood = useCallback(() => {
    const alert: RiskAlert = {
      id: `ALT-${Date.now()}`,
      active: true,
      title: 'ROUTE RISK DETECTED: FLASH FLOOD',
      cause: 'River overflow submerged culvert at Sector 3. Water depth +1.2m.',
      currentRisk: 'HIGH-RISK',
      alternativeRisk: 'OPEN',
      location: 'Sector 3 Lowland Crossing',
      impactDelayMins: 40,
      timestamp: 'JUST NOW',
      alternativeRouteName: 'Upper Ridge Road',
      alternativeDistanceKm: 164,
    };
    StorageService.saveActiveAlert(alert);
    setActiveAlert(alert);

    const m = StorageService.getRouteMetrics();
    m.currentRisk = 'HIGH-RISK';
    m.currentRiskLabel = 'Bridge Submerged +1.2m (High Hydroplaning)';
    StorageService.saveRouteMetrics(m);
    setRouteMetrics({ ...m });

    showToast('TACTICAL ADVISORY: FORD DEPTH EXCEEDED. FLASH FLOOD.', 'warning', 'tsunami');
  }, [showToast]);

  const login = useCallback((id: string = 'ARUN-2045') => {
    setIsLoggedIn(true);
    showToast(`AUTHENTICATED: ${id} LOGGED IN`, 'success', 'person');
  }, [showToast]);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    showToast('DRIVER SESSION TERMINATED', 'info', 'logout');
  }, [showToast]);

  const enableGps = useCallback(() => {
    setIsGpsAvailable(true);
    showToast('GPS LOCATION SERVICES ENABLED', 'success', 'gps_fixed');
  }, [showToast]);

  const toggleGpsAvailable = useCallback(() => {
    setIsGpsAvailable((prev) => {
      const next = !prev;
      showToast(next ? 'GPS ACTIVE' : 'GPS UNAVAILABLE', next ? 'success' : 'warning', next ? 'gps_fixed' : 'location_disabled');
      return next;
    });
  }, [showToast]);

  const simulateHeavyRain = useCallback(() => {
    const m = StorageService.getRouteMetrics();
    m.currentRisk = 'HIGH-RISK';
    m.currentRiskLabel = 'Torrential Downpour (Visibility < 30m)';
    StorageService.saveRouteMetrics(m);
    setRouteMetrics({ ...m });
    showToast('WEATHER ALERT: Torrential downpour detected by onboard radar', 'warning', 'rainy');
  }, [showToast]);

  const resetSimulation = useCallback(() => {
    StorageService.resetToDefaults();
    refreshStateFromStorage();
    setIsTripActive(false);
    setIsOffline(false);
    setDemoStep(1);
    showToast('SIMULATION STATE RESET TO FACTORY BENCHMARK', 'info', 'restart_alt');
  }, [refreshStateFromStorage, showToast]);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        language,
        setLanguage,
        t,
        activeTab,
        setActiveTab,
        viewMode,
        setViewMode,
        driver,
        shipments,
        activeShipment,
        setActiveShipmentId,
        routeMetrics,
        incidents,
        gpsBuffer,
        currentGps,
        isGpsAvailable,
        enableGps,
        toggleGpsAvailable,
        isTripActive,
        toggleTrip,
        isOffline,
        toggleOffline,
        isSyncing,
        triggerSync,
        activeAlert,
        dismissAlert,
        acceptReroute,
        isRerouteModalOpen,
        setIsRerouteModalOpen,
        pendingCounts,
        submitReport,
        simulateRoadBlock,
        simulateFlood,
        simulateHeavyRain,
        resetSimulation,
        demoStep,
        setDemoStep,
        isDemoGuideOpen,
        setIsDemoGuideOpen,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
