export type SyncStatus = 'PENDING' | 'SYNCING' | 'SYNCED' | 'FAILED';

export type PriorityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type RouteRiskLevel = 'OPEN' | 'DEGRADED' | 'HIGH-RISK' | 'BLOCKED';

export type IncidentCategory =
  | 'ROAD_BLOCKED'
  | 'FLOOD_WATER'
  | 'LANDSLIDE'
  | 'ROAD_DAMAGE'
  | 'DOWNPOUR'
  | 'ACCIDENT'
  | 'BRIDGE_DAMAGE'
  | 'OTHER';

export interface DriverProfile {
  id: string;
  driverId: string;
  name: string;
  licenseClass: string;
  licenseNumber?: string;
  vehicleId: string;
  vehicleType: string;
  status: 'ACTIVE' | 'STANDBY' | 'OFF_DUTY';
  rating: number;
  completedTrips: number;
  phone: string;
  currentZone: string;
}

export interface Shipment {
  id: string;
  manifestCode: string;
  commodity: string;
  priority: PriorityLevel;
  expedited?: boolean;
  origin?: string;
  destination: string;
  zone?: string;
  distanceKm: number;
  estimatedTime: string;
  tempRequirement?: string;
  currentTemp?: string;
  status: 'ASSIGNED' | 'IN_TRANSIT' | 'DELIVERED' | 'REROUTED';
  consignee: string;
  cargoWeightKg: number;
  cargoDescription?: string;
  emergencyContact?: string;
  specialInstructions?: string;
}

export type ShipmentManifest = Shipment;

export interface GpsPoint {
  id: string;
  localId?: string;
  latitude: number;
  longitude: number;
  altitudeMeters: number;
  accuracyMeters: number;
  speedKmh: number;
  headingDegrees: number;
  timestamp: string;
  syncStatus: SyncStatus;
}

export interface IncidentReport {
  id: string;
  localId: string;
  incidentCode: string;
  category: IncidentCategory;
  categoryLabel: string;
  description: string;
  latitude: number;
  longitude: number;
  altitudeMeters: number;
  timestamp: string;
  driverId: string;
  driverName: string;
  vehicleId: string;
  photoUrl?: string;
  photoLocalBlob?: string;
  aiDetectionLabel?: string;
  aiConfidence?: number;
  syncStatus: SyncStatus;
  payloadSizeKb: number;
  roadLocation: string;
}

export interface RiskAlert {
  id: string;
  active: boolean;
  title: string;
  cause: string;
  currentRisk: RouteRiskLevel;
  alternativeRisk: RouteRiskLevel;
  location: string;
  impactDelayMins: number;
  timestamp: string;
  alternativeRouteName: string;
  alternativeDistanceKm: number;
}

export interface RouteMetrics {
  currentDistanceKm: number;
  currentEta: string;
  currentRisk: RouteRiskLevel;
  currentRiskLabel: string;
  altDistanceKm: number;
  altEtaDelayMins: number;
  altStatus: string;
  surfaceType: string;
  maxGradePercent: number;
  clearanceMeters: number;
  activeRoute: 'PRIMARY' | 'ALTERNATIVE';
}
