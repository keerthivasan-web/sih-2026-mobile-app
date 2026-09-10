import {
  DriverProfile,
  Shipment,
  IncidentReport,
  GpsPoint,
  RiskAlert,
  RouteMetrics,
} from '../types';

const STORAGE_KEYS = {
  DRIVER: 'extricate_driver_profile',
  SHIPMENTS: 'extricate_shipments',
  ACTIVE_SHIPMENT_ID: 'extricate_active_shipment_id',
  INCIDENTS: 'extricate_incidents',
  GPS_BUFFER: 'extricate_gps_points',
  ROUTE_METRICS: 'extricate_route_metrics',
  ACTIVE_ALERT: 'extricate_active_alert',
  OFFLINE_MODE_FLAG: 'extricate_offline_mode_flag',
  LAST_SYNC_TIME: 'extricate_last_sync_time',
};

export const DEFAULT_DRIVER: DriverProfile = {
  id: 'DRV-882',
  driverId: 'DRV-882',
  name: 'Arun Kumar',
  licenseClass: 'Class-A CDL',
  vehicleId: 'TRK-2045',
  vehicleType: 'Heavy Hauler 16T',
  status: 'ACTIVE',
  rating: 4.95,
  completedTrips: 184,
  phone: '+91 98401 22941',
  currentZone: 'Himachal Sector 04-B',
};

export const DEFAULT_SHIPMENTS: Shipment[] = [
  {
    id: 'MED-2045-RX',
    manifestCode: '#MED-2045-RX',
    commodity: 'Emergency Medicines & Vaccines',
    priority: 'CRITICAL',
    expedited: true,
    destination: 'Remote Health Centre (Zone 4)',
    zone: 'Zone 4 North Pass',
    distanceKm: 142,
    estimatedTime: '4h 20m',
    tempRequirement: '-20°C to -15°C',
    currentTemp: '-18.4°C',
    status: 'IN_TRANSIT',
    consignee: 'District Emergency Medical Directorate',
    cargoWeightKg: 1250,
  },
  {
    id: 'SUP-1082-FD',
    manifestCode: '#SUP-1082-FD',
    commodity: 'Emergency Rations & Water Filtration',
    priority: 'HIGH',
    expedited: false,
    destination: 'Forward Relief Camp Bravo',
    zone: 'Sector 3 Valley',
    distanceKm: 98,
    estimatedTime: '2h 45m',
    status: 'ASSIGNED',
    consignee: 'National Disaster Response Unit 7',
    cargoWeightKg: 4500,
  },
  {
    id: 'ENG-3310-EQ',
    manifestCode: '#ENG-3310-EQ',
    commodity: 'High-Discharge Drainage Pumps & Hoses',
    priority: 'MEDIUM',
    expedited: false,
    destination: 'Bridge Sector 2 Base Depot',
    zone: 'South Bypass',
    distanceKm: 64,
    estimatedTime: '1h 30m',
    status: 'ASSIGNED',
    consignee: 'Border Roads Task Force',
    cargoWeightKg: 6200,
  },
];

export const DEFAULT_ROUTE_METRICS: RouteMetrics = {
  currentDistanceKm: 142,
  currentEta: '4h 20m',
  currentRisk: 'HIGH-RISK',
  currentRiskLabel: 'Heavy rainfall + road blockage at KM 74',
  altDistanceKm: 158,
  altEtaDelayMins: 18,
  altStatus: 'PAVED & CLEAR',
  surfaceType: 'TAR / ALL WEATHER',
  maxGradePercent: 6.2,
  clearanceMeters: 4.8,
  activeRoute: 'PRIMARY',
};

export const DEFAULT_INCIDENTS: IncidentReport[] = [
  {
    id: 'INC-2025-0941',
    localId: 'LOC-INC-0941',
    incidentCode: 'INC-2025-0941',
    category: 'ROAD_BLOCKED',
    categoryLabel: 'Road Blocked (NH-108 KM 74)',
    description: 'Mudslide and boulder debris blocking both lanes near bridge approach. Heavy water runoff over pavement.',
    latitude: 27.1751,
    longitude: 88.3245,
    altitudeMeters: 2410,
    timestamp: '10:43 AM',
    driverId: 'DRV-882',
    driverName: 'Arun Kumar',
    vehicleId: 'TRK-2045',
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-mOIg44pcTCA8CwyjR7dvwrrh2pT34C-L2GzMuvMXFqGnrx_oPIOqMHco4o7pkv3ry-5ABMFqatma37oA4Bs-YU0yJJ1_z-UEIQLdj_jVLU6_ErUz1mTzclcPlvubOsxqV-nqUKgPKtqU8xqtvd_vKozR5P4QfilV2UZpsPPlbtI2LAxmGHPsKvGl5YN4S23ULAzLKj61LUb5z27NSKm23AxkGvk0NJA7loBI77WK5Z77iBCAx0geZA',
    aiDetectionLabel: 'Road Blockage & Rock Debris',
    aiConfidence: 87,
    syncStatus: 'PENDING',
    payloadSizeKb: 1200,
    roadLocation: 'NH-108 Corridor at KM 74',
  },
  {
    id: 'INC-2025-0938',
    localId: 'LOC-INC-0938',
    incidentCode: 'INC-2025-0938',
    category: 'FLOOD_WATER',
    categoryLabel: 'Heavy Rain / Runoff (Sector 3)',
    description: 'Washed out drainage culvert with turbulent overflow crossing shoulder. High hydroplaning hazard.',
    latitude: 27.1528,
    longitude: 88.3102,
    altitudeMeters: 2280,
    timestamp: '10:15 AM',
    driverId: 'DRV-882',
    driverName: 'Arun Kumar',
    vehicleId: 'TRK-2045',
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeoX-auHZ7vu1v2JfNhbEITlSNm4h31BQSvPMPxmB88wktIqr7FQCbemkNlIbBhaMGPShCbU9Jys-kxbv57cgf_14rq5OkCYoSWiXa7AM0fji39-iZw3a-mZeMdF4BC9BT-W2-j3gXX_sAeci86str89pLeCJ1dU-3LJFXMkgYe8nEWascb3wZkKZo-7-AQpB2gfGikecMSyNmCbFoJYFRyzlLqmJqU0vc1WZ2Vngd_koor6-1EEHU-g',
    aiDetectionLabel: 'Culvert Flooding & Water Hazard',
    aiConfidence: 92,
    syncStatus: 'PENDING',
    payloadSizeKb: 840,
    roadLocation: 'Drainage Culvert 14B',
  },
  {
    id: 'INC-2025-0929',
    localId: 'LOC-INC-0929',
    incidentCode: 'INC-2025-0929',
    category: 'BRIDGE_DAMAGE',
    categoryLabel: 'Minor Bridge Expansion Crack',
    description: 'Expansion joint concrete fissure observed at Sector 2 culvert. Passable under 20 km/h load restriction.',
    latitude: 27.1294,
    longitude: 88.2988,
    altitudeMeters: 2150,
    timestamp: '09:50 AM',
    driverId: 'DRV-882',
    driverName: 'Arun Kumar',
    vehicleId: 'TRK-2045',
    syncStatus: 'SYNCED',
    payloadSizeKb: 340,
    roadLocation: 'Sector 2 Concrete Span',
  },
];

export const DEFAULT_ALERT: RiskAlert = {
  id: 'ALT-7701',
  active: true,
  title: 'ROUTE RISK DETECTED',
  cause: 'Heavy rainfall + road blockage on NH-108 Corridor at KM 74',
  currentRisk: 'HIGH-RISK',
  alternativeRisk: 'OPEN',
  location: 'NH-108 KM 74',
  impactDelayMins: 45,
  timestamp: 'JUST NOW',
  alternativeRouteName: 'East Pass Bypass Corridor',
  alternativeDistanceKm: 158,
};

// Storage helper functions
export const StorageService = {
  getDriver(): DriverProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DRIVER);
      return data ? JSON.parse(data) : DEFAULT_DRIVER;
    } catch {
      return DEFAULT_DRIVER;
    }
  },

  saveDriver(driver: DriverProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.DRIVER, JSON.stringify(driver));
    } catch (e) {
      console.warn('Storage saveDriver error', e);
    }
  },

  getShipments(): Shipment[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SHIPMENTS);
      return data ? JSON.parse(data) : DEFAULT_SHIPMENTS;
    } catch {
      return DEFAULT_SHIPMENTS;
    }
  },

  saveShipments(shipments: Shipment[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SHIPMENTS, JSON.stringify(shipments));
    } catch (e) {
      console.warn('Storage saveShipments error', e);
    }
  },

  getActiveShipment(): Shipment {
    const shipments = this.getShipments();
    const activeId = localStorage.getItem(STORAGE_KEYS.ACTIVE_SHIPMENT_ID);
    return shipments.find((s) => s.id === activeId) || shipments[0] || DEFAULT_SHIPMENTS[0];
  },

  setActiveShipment(id: string): void {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_SHIPMENT_ID, id);
  },

  getIncidents(): IncidentReport[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INCIDENTS);
      return data ? JSON.parse(data) : DEFAULT_INCIDENTS;
    } catch {
      return DEFAULT_INCIDENTS;
    }
  },

  saveIncidents(incidents: IncidentReport[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.INCIDENTS, JSON.stringify(incidents));
    } catch (e) {
      console.warn('Storage saveIncidents error', e);
    }
  },

  addIncident(incident: IncidentReport): void {
    const incidents = this.getIncidents();
    // Check for duplicate local ID
    const existingIndex = incidents.findIndex((i) => i.localId === incident.localId || i.id === incident.id);
    if (existingIndex >= 0) {
      incidents[existingIndex] = incident;
    } else {
      incidents.unshift(incident);
    }
    this.saveIncidents(incidents);
  },

  getGpsBuffer(): GpsPoint[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.GPS_BUFFER);
      if (!data) {
        // Generate initial 28 breadcrumb points
        const initialPoints: GpsPoint[] = Array.from({ length: 28 }, (_, i) => ({
          id: `GPS-PTS-${1000 + i}`,
          localId: `LOC-GPS-${1000 + i}`,
          latitude: 27.1418 + (i * 0.0012),
          longitude: 88.3104 + (i * 0.0009),
          altitudeMeters: 2410 - (i * 12),
          accuracyMeters: 1.8,
          speedKmh: 42 + Math.floor(Math.sin(i) * 8),
          headingDegrees: 42,
          timestamp: new Date(Date.now() - (28 - i) * 10000).toISOString(),
          syncStatus: i > 25 ? 'PENDING' : 'SYNCED',
        }));
        this.saveGpsBuffer(initialPoints);
        return initialPoints;
      }
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  saveGpsBuffer(points: GpsPoint[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.GPS_BUFFER, JSON.stringify(points));
    } catch (e) {
      console.warn('Storage saveGpsBuffer error', e);
    }
  },

  addGpsPoint(point: GpsPoint): void {
    const buffer = this.getGpsBuffer();
    buffer.push(point);
    // Keep last 150 points in local ring buffer
    if (buffer.length > 150) {
      buffer.shift();
    }
    this.saveGpsBuffer(buffer);
  },

  getRouteMetrics(): RouteMetrics {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ROUTE_METRICS);
      return data ? JSON.parse(data) : DEFAULT_ROUTE_METRICS;
    } catch {
      return DEFAULT_ROUTE_METRICS;
    }
  },

  saveRouteMetrics(metrics: RouteMetrics): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ROUTE_METRICS, JSON.stringify(metrics));
    } catch (e) {
      console.warn('Storage saveRouteMetrics error', e);
    }
  },

  getActiveAlert(): RiskAlert | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_ALERT);
      return data ? JSON.parse(data) : DEFAULT_ALERT;
    } catch {
      return DEFAULT_ALERT;
    }
  },

  saveActiveAlert(alert: RiskAlert | null): void {
    try {
      if (alert) {
        localStorage.setItem(STORAGE_KEYS.ACTIVE_ALERT, JSON.stringify(alert));
      } else {
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_ALERT);
      }
    } catch (e) {
      console.warn('Storage saveActiveAlert error', e);
    }
  },

  isOfflineMode(): boolean {
    return localStorage.getItem(STORAGE_KEYS.OFFLINE_MODE_FLAG) === 'true';
  },

  setOfflineMode(offline: boolean): void {
    localStorage.setItem(STORAGE_KEYS.OFFLINE_MODE_FLAG, offline ? 'true' : 'false');
  },

  getLastSyncTime(): string {
    return localStorage.getItem(STORAGE_KEYS.LAST_SYNC_TIME) || '14 MIN AGO';
  },

  setLastSyncTime(timeStr: string): void {
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC_TIME, timeStr);
  },

  getPendingCounts() {
    const incidents = this.getIncidents();
    const gps = this.getGpsBuffer();

    const pendingReports = incidents.filter((i) => i.syncStatus === 'PENDING' || i.syncStatus === 'SYNCING').length;
    const pendingGps = gps.filter((g) => g.syncStatus === 'PENDING' || g.syncStatus === 'SYNCING').length;
    const pendingMedia = incidents.filter((i) => (i.syncStatus === 'PENDING' || i.syncStatus === 'SYNCING') && (i.photoUrl || i.photoLocalBlob)).length;

    const totalPayloadKb = incidents
      .filter((i) => i.syncStatus === 'PENDING')
      .reduce((acc, curr) => acc + (curr.payloadSizeKb || 400), 0) + pendingGps * 1.5;

    return {
      pendingReports,
      pendingGps,
      pendingMedia,
      totalPayloadMb: (totalPayloadKb / 1024).toFixed(1),
    };
  },

  resetToDefaults(): void {
    localStorage.setItem(STORAGE_KEYS.DRIVER, JSON.stringify(DEFAULT_DRIVER));
    localStorage.setItem(STORAGE_KEYS.SHIPMENTS, JSON.stringify(DEFAULT_SHIPMENTS));
    localStorage.setItem(STORAGE_KEYS.INCIDENTS, JSON.stringify(DEFAULT_INCIDENTS));
    localStorage.setItem(STORAGE_KEYS.ROUTE_METRICS, JSON.stringify(DEFAULT_ROUTE_METRICS));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_ALERT, JSON.stringify(DEFAULT_ALERT));
    localStorage.removeItem(STORAGE_KEYS.GPS_BUFFER);
    localStorage.setItem(STORAGE_KEYS.OFFLINE_MODE_FLAG, 'false');
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC_TIME, 'JUST NOW');
  },
};
