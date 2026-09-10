import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

// In-memory backend database for EXTRICATE
const db = {
  driver: {
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
  },
  shipments: [
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
  ],
  routes: {
    'RT-NH108': {
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
    },
  },
  alerts: [
    {
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
    },
  ],
  incidents: [
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
      syncStatus: 'SYNCED',
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
      syncStatus: 'SYNCED',
      payloadSizeKb: 840,
      roadLocation: 'Drainage Culvert 14B',
    },
  ],
  gpsTelemetry: [] as any[],
};

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // ==========================================
  // EXTRICATE BACKEND APIs
  // ==========================================

  // POST /api/auth/login
  app.post('/api/auth/login', (req, res) => {
    const { driverId, vehiclePin } = req.body;
    const token = `extricate-jwt-${driverId || 'DRV-882'}-${Date.now()}`;
    res.json({
      success: true,
      token,
      driver: db.driver,
      expiresIn: 86400,
    });
  });

  // GET /api/driver/profile
  app.get('/api/driver/profile', (req, res) => {
    res.json(db.driver);
  });

  // GET /api/driver/shipments
  app.get('/api/driver/shipments', (req, res) => {
    res.json(db.shipments);
  });

  // GET /api/routes/:id
  app.get('/api/routes/:id', (req, res) => {
    const route = db.routes['RT-NH108'];
    res.json(route);
  });

  // GET /api/routes/:id/risk
  app.get('/api/routes/:id/risk', (req, res) => {
    const route = db.routes['RT-NH108'];
    const activeAlert = db.alerts.find((a) => a.active);
    res.json({
      routeId: req.params.id,
      riskLevel: route ? route.currentRisk : 'HIGH-RISK',
      alert: activeAlert,
      timestamp: new Date().toISOString(),
    });
  });

  // POST /api/gps
  app.post('/api/gps', (req, res) => {
    const point = req.body;
    db.gpsTelemetry.push({
      ...point,
      receivedAt: new Date().toISOString(),
    });
    if (db.gpsTelemetry.length > 500) db.gpsTelemetry.shift();
    res.json({ success: true, count: db.gpsTelemetry.length });
  });

  // POST /api/incidents
  app.post('/api/incidents', (req, res) => {
    const incident = req.body;
    incident.syncStatus = 'SYNCED';
    incident.syncedAt = new Date().toISOString();

    const existingIdx = db.incidents.findIndex((i) => i.id === incident.id || i.localId === incident.localId);
    if (existingIdx >= 0) {
      db.incidents[existingIdx] = incident;
    } else {
      db.incidents.unshift(incident);
    }
    res.json({ success: true, incidentId: incident.id });
  });

  // POST /api/evidence
  app.post('/api/evidence', (req, res) => {
    res.json({
      success: true,
      message: 'Evidence image payload processed and stamped into EXIF buffer',
    });
  });

  // GET /api/alerts
  app.get('/api/alerts', (req, res) => {
    res.json(db.alerts);
  });

  // POST /api/reroute/accept
  app.post('/api/reroute/accept', (req, res) => {
    const { routeId, alternative } = req.body;
    if (db.routes['RT-NH108']) {
      db.routes['RT-NH108'].activeRoute = 'ALTERNATIVE';
      db.routes['RT-NH108'].currentRisk = 'OPEN';
      db.routes['RT-NH108'].currentDistanceKm = 158;
      db.routes['RT-NH108'].currentEta = '4h 38m';
    }
    // Deactivate alert
    db.alerts.forEach((a) => (a.active = false));

    res.json({
      success: true,
      routeId,
      alternative,
      message: 'HUD updated to East Pass Bypass Corridor',
      metrics: db.routes['RT-NH108'],
    });
  });

  // POST /api/sync
  app.post('/api/sync', (req, res) => {
    const { incidents = [], gpsPoints = [], deviceId } = req.body;

    // Ingest offline incidents into HQ db
    incidents.forEach((inc: any) => {
      inc.syncStatus = 'SYNCED';
      inc.syncedAt = new Date().toISOString();
      const idx = db.incidents.findIndex((i) => i.id === inc.id || i.localId === inc.localId);
      if (idx >= 0) {
        db.incidents[idx] = inc;
      } else {
        db.incidents.unshift(inc);
      }
    });

    // Ingest GPS breadcrumbs
    gpsPoints.forEach((g: any) => {
      db.gpsTelemetry.push({ ...g, receivedAt: new Date().toISOString() });
    });

    res.json({
      success: true,
      syncedIncidentsCount: incidents.length,
      syncedGpsCount: gpsPoints.length,
      deviceId: deviceId || 'TRK-2045',
      serverTimestamp: new Date().toISOString(),
    });
  });

  // GET /api/hq/feed (for Web Command Dashboard)
  app.get('/api/hq/feed', (req, res) => {
    res.json({
      driver: db.driver,
      shipments: db.shipments,
      incidents: db.incidents,
      gpsTelemetry: db.gpsTelemetry.slice(-30),
      alerts: db.alerts,
      route: db.routes['RT-NH108'],
    });
  });

  // ==========================================
  // VITE DEV / PRODUCTION MIDDLEWARE
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EXTRICATE Backend + Field Service active on port ${PORT}`);
  });
}

startServer();
