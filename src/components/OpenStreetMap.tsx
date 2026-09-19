import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';

export type RouteTypeOption = 'PRIMARY' | 'ALTERNATIVE' | 'WEST_RIDGE';

interface OpenStreetMapProps {
  center?: [number, number];
  zoom?: number;
  height?: string;
  isRerouted?: boolean;
  activeRoute?: RouteTypeOption;
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
  onRouteSelect?: (routeType: RouteTypeOption) => void;
  onRecenter?: () => void;
  className?: string;
}

export const OpenStreetMap: React.FC<OpenStreetMapProps> = ({
  center = [27.163, 88.318],
  zoom = 12,
  height = '360px',
  isRerouted = false,
  activeRoute = 'PRIMARY',
  incidents = [],
  currentGps,
  onMarkerClick,
  onRouteSelect,
  onRecenter,
  className = '',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const routePolylineRef = useRef<L.Polyline | null>(null);
  const altPolylineRef = useRef<L.Polyline | null>(null);
  const westPolylineRef = useRef<L.Polyline | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const [mapStyle, setMapStyle] = useState<'osm' | 'dark' | 'satellite'>('osm');

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleRecenter = () => {
    const lat = currentGps?.latitude || center[0];
    const lng = currentGps?.longitude || center[1];
    mapInstanceRef.current?.flyTo([lat, lng], 14, { animate: true });
    if (onRecenter) onRecenter();
  };

  const tileUrls = {
    osm: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  };

  const tileAttributions = {
    osm: '&copy; OpenStreetMap contributors',
    dark: '&copy; CARTO',
    satellite: 'Source: Esri, Maxar',
  };

  // Route 1: Primary NH-108 Valley Corridor
  const primaryRouteCoords: L.LatLngTuple[] = [
    [27.125, 88.300],
    [27.140, 88.310],
    [27.155, 88.318],
    [27.170, 88.324], // Landslide KM 74
    [27.185, 88.330],
    [27.200, 88.345],
  ];

  // Route 2: East Pass Bypass Alternate Corridor
  const alternateRouteCoords: L.LatLngTuple[] = [
    [27.125, 88.300],
    [27.135, 88.285],
    [27.150, 88.280],
    [27.172, 88.295],
    [27.190, 88.320],
    [27.200, 88.345],
  ];

  // Route 3: Western Ridge Highway Corridor
  const westRidgeCoords: L.LatLngTuple[] = [
    [27.125, 88.300],
    [27.115, 88.320],
    [27.135, 88.340],
    [27.165, 88.355],
    [27.188, 88.350],
    [27.200, 88.345],
  ];

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: center as L.LatLngTuple,
        zoom,
        zoomControl: false,
        attributionControl: false,
      });

      const initialLayer = L.tileLayer(tileUrls.osm, {
        maxZoom: 19,
        attribution: tileAttributions.osm,
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

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (routePolylineRef.current) map.removeLayer(routePolylineRef.current);
    if (altPolylineRef.current) map.removeLayer(altPolylineRef.current);
    if (westPolylineRef.current) map.removeLayer(westPolylineRef.current);

    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = [];

    const currentSelected = activeRoute || (isRerouted ? 'ALTERNATIVE' : 'PRIMARY');

    // Route 1: NH-108 Valley (Green if selected & safe, Red dashed if blocked)
    const isPrimaryActive = currentSelected === 'PRIMARY';
    const isPrimaryBlocked = isRerouted;
    const primaryPoly = L.polyline(primaryRouteCoords, {
      color: isPrimaryBlocked ? '#dc2626' : isPrimaryActive ? '#16a34a' : '#86efac',
      weight: isPrimaryActive ? 8 : 4,
      dashArray: isPrimaryBlocked ? '6, 8' : undefined,
      opacity: isPrimaryActive ? 0.95 : 0.6,
    }).addTo(map);

    primaryPoly.bindTooltip('Route 1: NH-108 Primary Valley Route (180 km • 4h 10m) - Click to Switch!', { sticky: true });
    primaryPoly.on('click', () => {
      if (onRouteSelect) onRouteSelect('PRIMARY');
    });
    routePolylineRef.current = primaryPoly;

    // Route 2: East Pass Bypass (Blue)
    const isAltActive = currentSelected === 'ALTERNATIVE';
    const altPoly = L.polyline(alternateRouteCoords, {
      color: isAltActive ? '#2563eb' : '#93c5fd',
      weight: isAltActive ? 8 : 4,
      opacity: isAltActive ? 0.95 : 0.6,
    }).addTo(map);

    altPoly.bindTooltip('Route 2: East Pass Bypass Corridor (195 km • 4h 28m • Safe Bypass) - Click to Switch!', { sticky: true });
    altPoly.on('click', () => {
      if (onRouteSelect) onRouteSelect('ALTERNATIVE');
    });
    altPolylineRef.current = altPoly;

    // Route 3: Western Ridge Highway (Purple)
    const isWestActive = currentSelected === 'WEST_RIDGE';
    const westPoly = L.polyline(westRidgeCoords, {
      color: isWestActive ? '#9333ea' : '#d8b4fe',
      weight: isWestActive ? 8 : 4,
      opacity: isWestActive ? 0.95 : 0.6,
    }).addTo(map);

    westPoly.bindTooltip('Route 3: Western Ridge Highway (210 km • 4h 45m • High Elevation Safe) - Click to Switch!', { sticky: true });
    westPoly.on('click', () => {
      if (onRouteSelect) onRouteSelect('WEST_RIDGE');
    });
    westPolylineRef.current = westPoly;

    const createCustomIcon = (emoji: string, bgHex: string) => {
      return L.divIcon({
        className: 'custom-leaflet-icon',
        html: `
          <div style="
            background: ${bgHex};
            width: 34px;
            height: 34px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            border: 3px solid #ffffff;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            cursor: pointer;
          ">
            ${emoji}
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });
    };

    // Incident Markers
    incidents.forEach((inc) => {
      if (inc.latitude && inc.longitude) {
        const marker = L.marker([inc.latitude, inc.longitude], {
          icon: createCustomIcon('🚧', '#dc2626'),
        })
          .addTo(map)
          .bindPopup(`
            <div style="font-family: sans-serif; font-size: 13px; color: #0f172a;">
              <strong style="color: #dc2626;">${inc.categoryLabel || 'ROAD BLOCKED'}</strong><br/>
              ${inc.roadLocation || 'KM 74'}<br/>
              <small>${inc.description || 'Landslide reported ahead'}</small>
            </div>
          `);

        if (onMarkerClick) {
          marker.on('click', () => onMarkerClick(inc));
        }
        markersRef.current.push(marker);
      }
    });

    // Destination Marker
    const destMarker = L.marker([27.200, 88.345], {
      icon: createCustomIcon('🏁', '#16a34a'),
    })
      .addTo(map)
      .bindPopup('<div style="font-family: sans-serif;"><strong>Destination: Aizawl</strong></div>');
    markersRef.current.push(destMarker);

    // Driver Truck Live Marker
    const truckLat = currentGps?.latitude || 27.140;
    const truckLng = currentGps?.longitude || 88.310;
    const truckMarker = L.marker([truckLat, truckLng], {
      icon: L.divIcon({
        className: 'truck-live-marker',
        html: `
          <div style="
            background: #4f46e5;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            border: 3px solid #ffffff;
            box-shadow: 0 0 16px rgba(79,70,229,0.6);
            cursor: pointer;
          ">
            <span style="font-size: 22px;">🚚</span>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      }),
    })
      .addTo(map)
      .bindPopup('<div style="font-family: sans-serif;"><strong>Driver Location</strong><br/>Status: IN TRANSIT</div>');

    markersRef.current.push(truckMarker);
  }, [isRerouted, activeRoute, incidents, currentGps, onRouteSelect]);

  const currentSelected = activeRoute || (isRerouted ? 'ALTERNATIVE' : 'PRIMARY');

  return (
    <div className={`relative rounded-2xl overflow-hidden border border-slate-200 shadow-md ${className}`} style={{ height }}>
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Style Toggle Bar (Compact & Small) */}
      <div className="absolute top-2 right-2 z-10 flex items-center bg-white/95 backdrop-blur-xs border border-slate-200 p-0.5 rounded-lg text-[10px] font-bold shadow-xs">
        <button
          onClick={() => setMapStyle('osm')}
          className={`px-1.5 py-0.5 rounded transition-colors ${
            mapStyle === 'osm' ? 'bg-indigo-600 text-white font-black' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          LIGHT
        </button>
        <button
          onClick={() => setMapStyle('dark')}
          className={`px-1.5 py-0.5 rounded transition-colors ${
            mapStyle === 'dark' ? 'bg-indigo-600 text-white font-black' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          DARK
        </button>
        <button
          onClick={() => setMapStyle('satellite')}
          className={`px-1.5 py-0.5 rounded transition-colors ${
            mapStyle === 'satellite' ? 'bg-indigo-600 text-white font-black' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          SATELLITE
        </button>
      </div>

      {/* Stacked Map Controls (Recenter ON TOP of Zoom In / Zoom Out) */}
      <div className="absolute bottom-3 right-3 z-10 flex flex-col items-center gap-1.5">
        {/* Recenter Button on Top */}
        <button
          onClick={handleRecenter}
          title="Recenter on Vehicle"
          className="w-9 h-9 rounded-xl bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">my_location</span>
        </button>

        {/* Zoom In & Zoom Out Buttons */}
        <div className="flex flex-col rounded-xl bg-white/95 backdrop-blur-xs border border-slate-200 shadow-md overflow-hidden text-slate-800 font-bold">
          <button
            onClick={handleZoomIn}
            title="Zoom In"
            className="w-8 h-8 flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 transition-colors border-b border-slate-100 text-base active:bg-slate-100 cursor-pointer"
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            title="Zoom Out"
            className="w-8 h-8 flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 transition-colors text-base active:bg-slate-100 cursor-pointer"
          >
            −
          </button>
        </div>
      </div>

      {/* Interactive 3 Suggested Routes Overlay Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 max-w-[190px]">
        <button
          onClick={() => onRouteSelect?.('PRIMARY')}
          className={`px-2 py-1 rounded-lg border text-[10px] font-black uppercase flex items-center gap-1 shadow-xs transition-transform active:scale-95 cursor-pointer ${
            currentSelected === 'PRIMARY'
              ? 'bg-emerald-600 text-white border-emerald-700 ring-2 ring-emerald-300'
              : 'bg-white/95 text-emerald-800 border-emerald-200 hover:bg-emerald-50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          <span className="truncate">R1: Valley (180 km)</span>
        </button>

        <button
          onClick={() => onRouteSelect?.('ALTERNATIVE')}
          className={`px-2 py-1 rounded-lg border text-[10px] font-black uppercase flex items-center gap-1 shadow-xs transition-transform active:scale-95 cursor-pointer ${
            currentSelected === 'ALTERNATIVE'
              ? 'bg-blue-600 text-white border-blue-700 ring-2 ring-blue-300'
              : 'bg-white/95 text-blue-800 border-blue-200 hover:bg-blue-50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
          <span className="truncate">R2: East Pass (195 km)</span>
        </button>

        <button
          onClick={() => onRouteSelect?.('WEST_RIDGE')}
          className={`px-2 py-1 rounded-lg border text-[10px] font-black uppercase flex items-center gap-1 shadow-xs transition-transform active:scale-95 cursor-pointer ${
            currentSelected === 'WEST_RIDGE'
              ? 'bg-purple-600 text-white border-purple-700 ring-2 ring-purple-300'
              : 'bg-white/95 text-purple-800 border-purple-200 hover:bg-purple-50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
          <span className="truncate">R3: West Ridge (210 km)</span>
        </button>
      </div>

      <div className="absolute bottom-1 left-2 z-10 text-[9px] text-slate-700 bg-white/90 px-1.5 py-0.5 rounded-md border border-slate-200 backdrop-blur-xs font-bold shadow-xs">
        💡 Click on any of the 3 route lines or buttons to switch route
      </div>
    </div>
  );
};
