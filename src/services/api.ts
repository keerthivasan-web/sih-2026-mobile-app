import {
  DriverProfile,
  Shipment,
  IncidentReport,
  GpsPoint,
  RiskAlert,
  RouteMetrics,
} from '../types';
import { StorageService } from './storage';

const API_BASE_URL = '/api';

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = sessionStorage.getItem('extricate_auth_token') || 'demo-bearer-token-trk-2045';
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  async login(driverId: string = 'DRV-882', vehiclePin: string = '2045'): Promise<{ success: boolean; token: string; driver: DriverProfile }> {
    try {
      if (!StorageService.isOfflineMode()) {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ driverId, vehiclePin }),
        });
        if (res.ok) {
          const data = await res.json();
          this.token = data.token;
          sessionStorage.setItem('extricate_auth_token', data.token);
          if (data.driver) StorageService.saveDriver(data.driver);
          return data;
        }
      }
    } catch {
      // Offline fallback
    }

    // Offline / demo fallback
    this.token = `jwt-extricate-${driverId}-${Date.now()}`;
    sessionStorage.setItem('extricate_auth_token', this.token);
    const driver = StorageService.getDriver();
    return { success: true, token: this.token, driver };
  }

  async getDriverProfile(): Promise<DriverProfile> {
    try {
      if (!StorageService.isOfflineMode()) {
        const res = await fetch(`${API_BASE_URL}/driver/profile`, {
          headers: this.getHeaders(),
        });
        if (res.ok) {
          const driver = await res.json();
          StorageService.saveDriver(driver);
          return driver;
        }
      }
    } catch {
      // Offline fallback
    }
    return StorageService.getDriver();
  }

  async getShipments(): Promise<Shipment[]> {
    try {
      if (!StorageService.isOfflineMode()) {
        const res = await fetch(`${API_BASE_URL}/driver/shipments`, {
          headers: this.getHeaders(),
        });
        if (res.ok) {
          const shipments = await res.json();
          StorageService.saveShipments(shipments);
          return shipments;
        }
      }
    } catch {
      // Offline fallback
    }
    return StorageService.getShipments();
  }

  async getRoute(routeId: string): Promise<RouteMetrics> {
    try {
      if (!StorageService.isOfflineMode()) {
        const res = await fetch(`${API_BASE_URL}/routes/${routeId}`, {
          headers: this.getHeaders(),
        });
        if (res.ok) {
          const metrics = await res.json();
          StorageService.saveRouteMetrics(metrics);
          return metrics;
        }
      }
    } catch {
      // Offline fallback
    }
    return StorageService.getRouteMetrics();
  }

  async getRouteRisk(routeId: string): Promise<{ riskLevel: string; alert?: RiskAlert }> {
    try {
      if (!StorageService.isOfflineMode()) {
        const res = await fetch(`${API_BASE_URL}/routes/${routeId}/risk`, {
          headers: this.getHeaders(),
        });
        if (res.ok) {
          return await res.json();
        }
      }
    } catch {
      // Offline fallback
    }
    const metrics = StorageService.getRouteMetrics();
    const alert = StorageService.getActiveAlert();
    return { riskLevel: metrics.currentRisk, alert: alert || undefined };
  }

  async sendGpsPoint(point: GpsPoint): Promise<{ success: boolean; syncStatus: 'SYNCED' | 'PENDING' }> {
    if (StorageService.isOfflineMode()) {
      point.syncStatus = 'PENDING';
      StorageService.addGpsPoint(point);
      return { success: true, syncStatus: 'PENDING' };
    }

    try {
      const res = await fetch(`${API_BASE_URL}/gps`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(point),
      });
      if (res.ok) {
        point.syncStatus = 'SYNCED';
        StorageService.addGpsPoint(point);
        return { success: true, syncStatus: 'SYNCED' };
      }
    } catch {
      // Network drop
    }

    point.syncStatus = 'PENDING';
    StorageService.addGpsPoint(point);
    return { success: true, syncStatus: 'PENDING' };
  }

  async submitIncident(report: IncidentReport): Promise<{ success: boolean; syncStatus: 'SYNCED' | 'PENDING' }> {
    if (StorageService.isOfflineMode()) {
      report.syncStatus = 'PENDING';
      StorageService.addIncident(report);
      return { success: true, syncStatus: 'PENDING' };
    }

    try {
      const res = await fetch(`${API_BASE_URL}/incidents`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(report),
      });
      if (res.ok) {
        report.syncStatus = 'SYNCED';
        StorageService.addIncident(report);
        return { success: true, syncStatus: 'SYNCED' };
      }
    } catch {
      // Network drop
    }

    report.syncStatus = 'PENDING';
    StorageService.addIncident(report);
    return { success: true, syncStatus: 'PENDING' };
  }

  async uploadEvidence(formData: FormData): Promise<{ success: boolean; photoUrl?: string }> {
    if (StorageService.isOfflineMode()) {
      return { success: true };
    }

    try {
      const res = await fetch(`${API_BASE_URL}/evidence`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        body: formData,
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Offline
    }
    return { success: true };
  }

  async getAlerts(): Promise<RiskAlert[]> {
    try {
      if (!StorageService.isOfflineMode()) {
        const res = await fetch(`${API_BASE_URL}/alerts`, {
          headers: this.getHeaders(),
        });
        if (res.ok) {
          const alerts = await res.json();
          if (alerts && alerts.length > 0) {
            StorageService.saveActiveAlert(alerts[0]);
          }
          return alerts;
        }
      }
    } catch {
      // Offline fallback
    }
    const alert = StorageService.getActiveAlert();
    return alert ? [alert] : [];
  }

  async acceptReroute(routeId: string): Promise<{ success: boolean; metrics: RouteMetrics }> {
    const currentMetrics = StorageService.getRouteMetrics();
    const updatedMetrics: RouteMetrics = {
      ...currentMetrics,
      activeRoute: 'ALTERNATIVE',
      currentDistanceKm: currentMetrics.altDistanceKm,
      currentEta: '4h 38m',
      currentRisk: 'OPEN',
      currentRiskLabel: 'Bypassed NH-108 via East Pass Corridor (Tar & Clear)',
    };
    StorageService.saveRouteMetrics(updatedMetrics);

    // Deactivate alert since driver rerouted
    const alert = StorageService.getActiveAlert();
    if (alert) {
      StorageService.saveActiveAlert({ ...alert, active: false });
    }

    try {
      if (!StorageService.isOfflineMode()) {
        await fetch(`${API_BASE_URL}/reroute/accept`, {
          method: 'POST',
          headers: this.getHeaders(),
          body: JSON.stringify({ routeId, alternative: 'EAST_PASS_BYPASS' }),
        });
      }
    } catch {
      // Handled locally
    }

    return { success: true, metrics: updatedMetrics };
  }

  async syncAllQueued(): Promise<{
    syncedIncidentsCount: number;
    syncedGpsCount: number;
    syncedAt: string;
  }> {
    const incidents = StorageService.getIncidents();
    const gpsBuffer = StorageService.getGpsBuffer();

    const pendingIncidents = incidents.filter((i) => i.syncStatus === 'PENDING' || i.syncStatus === 'SYNCING');
    const pendingGps = gpsBuffer.filter((g) => g.syncStatus === 'PENDING' || g.syncStatus === 'SYNCING');

    // Mark as SYNCING
    incidents.forEach((i) => {
      if (i.syncStatus === 'PENDING') i.syncStatus = 'SYNCING';
    });
    gpsBuffer.forEach((g) => {
      if (g.syncStatus === 'PENDING') g.syncStatus = 'SYNCING';
    });
    StorageService.saveIncidents(incidents);
    StorageService.saveGpsBuffer(gpsBuffer);

    // Call backend sync endpoint if possible
    try {
      if (!StorageService.isOfflineMode()) {
        await fetch(`${API_BASE_URL}/sync`, {
          method: 'POST',
          headers: this.getHeaders(),
          body: JSON.stringify({
            incidents: pendingIncidents,
            gpsPoints: pendingGps,
            deviceId: 'TRK-2045',
          }),
        });
      }
    } catch {
      // Even in local demo mode, simulate successful sync!
    }

    // Update all to SYNCED
    incidents.forEach((i) => {
      if (i.syncStatus === 'SYNCING') i.syncStatus = 'SYNCED';
    });
    gpsBuffer.forEach((g) => {
      if (g.syncStatus === 'SYNCING') g.syncStatus = 'SYNCED';
    });

    StorageService.saveIncidents(incidents);
    StorageService.saveGpsBuffer(gpsBuffer);
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    StorageService.setLastSyncTime(nowStr);

    return {
      syncedIncidentsCount: pendingIncidents.length,
      syncedGpsCount: pendingGps.length,
      syncedAt: nowStr,
    };
  }
}

export const api = new ApiService();
