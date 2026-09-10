import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';

interface OpenStreetMapProps {
  center?: [number, number];
  zoom?: number;
  height?: string;
  isRerouted?: boolean;
  incidents?: Array<{
    id: string;
    latitude: number;
    longitude: number;
    categoryLabel?: string;
    description?: string;
    roadLocation?: string;
  }>;
  currentGps?: {
    latitude?: number;
    longitude?: number;
    heading?: number;
  };
  onMarkerClick?: (hazard: any) => void;
  className?: string;
}

export const OpenStreetMap: React.FC<OpenStreetMapProps> = ({
  center = [27.163, 88.318],
  zoom = 12,
  height = '320px',
  isRerouted = false,
  incidents = [],
  currentGps,
  onMarkerClick,
  className = '',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const routePolylineRef = useRef<L.Polyline | null>(null);
  const altPolylineRef = useRef<L.Polyline | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const [mapStyle, setMapStyle] = useState<'dark' | 'osm' | 'satellite'>('dark');

  // Tile layer URL definitions
  const tileUrls = {
    dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    osm: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  };

  const tileAttributions = {
    dark: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    osm: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    satellite: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  };

  // Primary NH-108 Corridor coordinates (Gangtok - Dikchu valley pass)
  const primaryRouteCoords: L.LatLngTuple[] = [
    [27.125, 88.300],
    [27.140, 88.310],
    [27.155, 88.318],
    [27.170, 88.324], // Landslide KM 74
    [27.185, 88.330],
    [27.200, 88.345],
  ];

  // East Pass Bypass Alternate Corridor
  const alternateRouteCoords: L.LatLngTuple[] = [
    [27.125, 88.300],
    [27.135, 88.285],
    [27.150, 88.280],
    [27.172, 88.295],
    [27.190, 88.320],
    [27.200, 88.345],
  ];

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: center as L.LatLngTuple,
        zoom,
        zoomControl: false,
        attributionControl: false,
      });

      // Add zoom control at bottom right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Add default Dark Tile Layer
      const initialLayer = L.tileLayer(tileUrls.dark, {
        maxZoom: 19,
        attribution: tileAttributions.dark,
      }).addTo(map);

      tileLayerRef.current = initialLayer;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Tile Layer when style changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }

    const newLayer = L.tileLayer(tileUrls[mapStyle], {
      maxZoom: 19,
      attribution: tileAttributions[mapStyle],
    }).addTo(mapInstanceRef.current);

    tileLayerRef.current = newLayer;
  }, [mapStyle]);

  // Update Routes & Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing polylines
    if (routePolylineRef.current) map.removeLayer(routePolylineRef.current);
    if (altPolylineRef.current) map.removeLayer(altPolylineRef.current);

    // Clear existing markers
    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = [];

    // Draw Primary Route
    routePolylineRef.current = L.polyline(primaryRouteCoords, {
      color: isRerouted ? '#ff5449' : '#ec6a06',
      weight: isRerouted ? 3 : 5,
      dashArray: isRerouted ? '6, 8' : undefined,
      opacity: isRerouted ? 0.6 : 0.9,
    }).addTo(map);

    // Draw Alternate Route
    altPolylineRef.current = L.polyline(alternateRouteCoords, {
      color: '#10b981',
      weight: isRerouted ? 5 : 3,
      dashArray: isRerouted ? undefined : '6, 8',
      opacity: isRerouted ? 0.95 : 0.5,
    }).addTo(map);

    // Custom Icon Creators
    const createCustomIcon = (emoji: string, bgHex: string) => {
      return L.divIcon({
        className: 'custom-leaflet-icon',
        html: `
          <div style="
            background: ${bgHex};
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            border: 2px solid #ffffff;
            box-shadow: 0 4px 12px rgba(0,0,0,0.6);
          ">
            ${emoji}
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });
    };

    // Add Incident Markers
    incidents.forEach((inc) => {
      if (inc.latitude && inc.longitude) {
        const marker = L.marker([inc.latitude, inc.longitude], {
          icon: createCustomIcon('🚧', '#dc2626'),
        })
          .addTo(map)
          .bindPopup(`
            <div style="font-family: monospace; font-size: 12px; color: #090e16;">
              <strong style="color: #dc2626;">${inc.categoryLabel || 'HAZARD'}</strong><br/>
              ${inc.roadLocation || 'NH-108 Corridor'}<br/>
              <small>${inc.description || ''}</small>
            </div>
          `);

        if (onMarkerClick) {
          marker.on('click', () => onMarkerClick(inc));
        }
        markersRef.current.push(marker);
      }
    });

    // Add Truck Live Marker
    const truckLat = currentGps?.latitude || 27.140;
    const truckLng = currentGps?.longitude || 88.310;
    const truckMarker = L.marker([truckLat, truckLng], {
      icon: L.divIcon({
        className: 'truck-live-marker',
        html: `
          <div style="
            background: #10b981;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #002113;
            border: 3px solid #ffffff;
            box-shadow: 0 0 16px #10b981;
          ">
            <span style="font-size: 20px; font-weight: bold;">🚚</span>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      }),
    })
      .addTo(map)
      .bindPopup('<div style="font-family: monospace;"><strong>TRK-2045</strong><br/>Status: ACTIVE IN-TRANSIT</div>');

    markersRef.current.push(truckMarker);
  }, [isRerouted, incidents, currentGps]);

  return (
    <div className={`relative rounded-2xl overflow-hidden border border-[#252a33] ${className}`} style={{ height }}>
      {/* Map Element */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Map Layer Switcher Bar */}
      <div className="absolute top-2 right-2 z-10 flex items-center bg-[#090e16]/90 backdrop-blur-md border border-[#252a33] p-1 rounded-lg text-[10px] font-mono shadow-xl">
        <button
          onClick={() => setMapStyle('dark')}
          className={`px-2 py-1 rounded transition-colors ${
            mapStyle === 'dark' ? 'bg-[#10b981] text-[#002113] font-bold' : 'text-[#bbcabf] hover:text-white'
          }`}
        >
          DARK MAP
        </button>
        <button
          onClick={() => setMapStyle('osm')}
          className={`px-2 py-1 rounded transition-colors ${
            mapStyle === 'osm' ? 'bg-[#10b981] text-[#002113] font-bold' : 'text-[#bbcabf] hover:text-white'
          }`}
        >
          OSM
        </button>
        <button
          onClick={() => setMapStyle('satellite')}
          className={`px-2 py-1 rounded transition-colors ${
            mapStyle === 'satellite' ? 'bg-[#10b981] text-[#002113] font-bold' : 'text-[#bbcabf] hover:text-white'
          }`}
        >
          SATELLITE
        </button>
      </div>

      {/* OpenStreetMap Attribution Tag */}
      <div className="absolute bottom-1 left-2 z-10 text-[9px] font-mono text-[#bbcabf]/70 bg-[#090e16]/80 px-2 py-0.5 rounded backdrop-blur-xs">
        Map data &copy; <a href="https://www.openstreetmap.org/" target="_blank" rel="noreferrer" className="underline hover:text-white">OpenStreetMap</a>
      </div>
    </div>
  );
};
