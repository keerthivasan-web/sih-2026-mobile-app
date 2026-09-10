import React from 'react';
import { useApp } from '../context/AppContext';
import { OpenStreetMap } from './OpenStreetMap';

export const WebDashboard: React.FC = () => {
  const {
    driver,
    activeShipment,
    routeMetrics,
    currentGps,
    incidents,
    gpsBuffer,
    isOffline,
    isTripActive,
    simulateRoadBlock,
    triggerSync,
    setViewMode,
  } = useApp();

  return (
    <div className="flex-1 bg-[#090e16] text-[#dee2ee] flex flex-col overflow-y-auto select-none">
      {/* Web Command HQ Top Navigation Bar */}
      <header className="h-16 px-6 bg-[#0f141c] border-b border-[#1b2028] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded bg-[#10b981] flex items-center justify-center font-black text-[#003824] text-xl">
              EX
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-wider text-white uppercase leading-none font-sans">
                EXTRICATE COMMAND HQ
              </span>
              <span className="text-[11px] font-mono text-[#4edea3] tracking-widest uppercase mt-0.5">
                TACTICAL LOGISTICS MONITOR • CENTRAL DISPATCH
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 pl-6 border-l border-[#252a33]">
            <span className="px-2.5 py-1 rounded bg-[#171c24] text-[11px] font-mono text-[#4edea3] border border-[#252a33] flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse" />
              API GATEWAY: ACTIVE (FASTAPI/EXPRESS)
            </span>
            <span className="px-2.5 py-1 rounded bg-[#171c24] text-[11px] font-mono text-[#bbcabf] border border-[#252a33]">
              SECTOR 04-B DISPATCH NODE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode('mobile')}
            className="px-3 py-1.5 rounded-lg bg-[#252a33] hover:bg-[#30353e] text-white text-[12px] font-mono uppercase font-bold flex items-center gap-1.5 border border-[#3c4a42] transition-colors"
          >
            <span className="material-symbols-outlined text-[16px] text-[#4edea3]">
              smartphone
            </span>
            SWITCH TO CAB APP
          </button>

          <button
            onClick={() => triggerSync()}
            className="px-3 py-1.5 rounded-lg bg-[#10b981] hover:bg-[#4edea3] text-[#002113] text-[12px] font-mono uppercase font-bold flex items-center gap-1.5 shadow transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">
              sync
            </span>
            POLL FLEET INGEST
          </button>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <div className="p-6 grid grid-cols-1 xl:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
        {/* Left 2 Cols: Live Fleet Map & Telemetry Stream */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          {/* Top Quick Fleet Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#171c24] p-4 rounded-xl border border-[#252a33] flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between text-[#bbcabf] text-[11px] font-mono">
                <span className="uppercase">FIELD UNIT</span>
                <span className="text-[#4edea3] font-bold">MONITORED</span>
              </div>
              <div className="mt-2">
                <span className="text-xl font-extrabold text-white font-sans">
                  {driver.vehicleId}
                </span>
                <div className="text-[12px] text-[#bbcabf] mt-0.5">
                  Driver: {driver.name} ({driver.driverId})
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-[#252a33] flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#bbcabf]">GPS STATUS</span>
                <span className="text-[#4edea3] font-bold">
                  {isTripActive ? 'ACTIVE TRACKING' : 'IDLE / HALT'}
                </span>
              </div>
            </div>

            <div className="bg-[#171c24] p-4 rounded-xl border border-[#252a33] flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between text-[#bbcabf] text-[11px] font-mono">
                <span className="uppercase">ACTIVE SHIPMENT</span>
                <span className="text-[#ec6a06] font-bold uppercase">
                  {activeShipment.priority}
                </span>
              </div>
              <div className="mt-2">
                <span className="text-xl font-extrabold text-[#4edea3] font-mono">
                  {activeShipment.manifestCode}
                </span>
                <div className="text-[12px] text-white truncate mt-0.5">
                  {activeShipment.commodity}
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-[#252a33] flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#bbcabf]">COLD CHAIN</span>
                <span className="text-[#4edea3] font-bold">
                  {activeShipment.currentTemp}
                </span>
              </div>
            </div>

            <div className="bg-[#171c24] p-4 rounded-xl border border-[#252a33] flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between text-[#bbcabf] text-[11px] font-mono">
                <span className="uppercase">CORRIDOR RISK</span>
                <span className="text-[#ffb95f] font-bold">SECTOR 04</span>
              </div>
              <div className="mt-2">
                <span
                  className={`text-xl font-extrabold font-sans uppercase ${
                    routeMetrics.activeRoute === 'ALTERNATIVE'
                      ? 'text-[#4edea3]'
                      : 'text-[#ffb690]'
                  }`}
                >
                  {routeMetrics.activeRoute === 'ALTERNATIVE' ? 'LOW-RISK (BYPASS)' : 'HIGH-RISK'}
                </span>
                <div className="text-[12px] text-[#bbcabf] truncate mt-0.5">
                  {routeMetrics.activeRoute === 'ALTERNATIVE'
                    ? 'East Pass Corridor Active'
                    : 'NH-108 Blockage Detected'}
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-[#252a33] flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#bbcabf]">CAB CONNECTIVITY</span>
                <span
                  className={`font-bold uppercase ${
                    isOffline ? 'text-[#ffb690]' : 'text-[#4edea3]'
                  }`}
                >
                  {isOffline ? 'OFFLINE (STORE & FORWARD)' : 'ONLINE'}
                </span>
              </div>
            </div>
          </div>

          {/* Central Live Tactical GIS Map */}
          <div className="bg-[#171c24] rounded-xl border border-[#252a33] overflow-hidden flex flex-col shadow-lg">
            <div className="p-3.5 bg-[#1b2028] border-b border-[#252a33] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3] text-[20px]">
                  map
                </span>
                <span className="font-sans font-extrabold text-sm text-white uppercase tracking-wider">
                  TACTICAL CORRIDOR RADAR & ROUTE INTEGRITY
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={simulateRoadBlock}
                  className="px-2.5 py-1 rounded bg-[#ec6a06]/20 hover:bg-[#ec6a06]/30 text-[#ffb690] border border-[#ec6a06]/40 text-[11px] font-mono font-bold uppercase transition-colors"
                >
                  TRIGGER DISPATCH ADVISORY
                </button>
              </div>
            </div>

            <div className="relative w-full p-2 bg-[#090e16]">
              <OpenStreetMap
                height="340px"
                isRerouted={routeMetrics.activeRoute === 'ALTERNATIVE'}
                incidents={incidents}
                currentGps={{ latitude: currentGps.lat, longitude: currentGps.lon }}
              />
            </div>
          </div>
        </div>

        {/* Right Col: Ingested Incident Reports & Audit Stream */}
        <div className="flex flex-col gap-6">
          {/* Incident Feed */}
          <div className="bg-[#171c24] rounded-xl border border-[#252a33] overflow-hidden flex flex-col shadow-lg">
            <div className="p-3.5 bg-[#1b2028] border-b border-[#252a33] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ffb95f] text-[20px]">
                  warning
                </span>
                <span className="font-sans font-extrabold text-sm text-white uppercase tracking-wider">
                  FIELD INCIDENT INGESTION
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#090e16] text-[10px] font-mono text-[#4edea3] border border-[#252a33] font-bold">
                {incidents.length} INCIDENTS
              </span>
            </div>

            <div className="p-4 flex flex-col gap-3.5 max-h-[500px] overflow-y-auto">
              {incidents.map((inc) => (
                <div
                  key={inc.id}
                  className="p-3.5 rounded-xl bg-[#1b2028] border border-[#252a33] flex flex-col gap-2.5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-mono text-white font-bold">
                        {inc.incidentCode}
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-[#ec6a06]/20 text-[#ffb690] border border-[#ec6a06]/40 uppercase font-bold">
                        {inc.category}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        inc.syncStatus === 'SYNCED'
                          ? 'bg-[#10b981]/20 text-[#4edea3] border border-[#10b981]/40'
                          : 'bg-[#ec6a06]/20 text-[#ffb690] border border-[#ec6a06]/40'
                      }`}
                    >
                      {inc.syncStatus}
                    </span>
                  </div>

                  {/* Photo thumbnail with EXIF preview */}
                  {inc.photoUrl && (
                    <div className="relative w-full h-32 rounded-lg overflow-hidden border border-[#252a33] bg-[#090e16]">
                      <img
                        src={inc.photoUrl}
                        alt="Incident Photo"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 left-1 right-1 bg-[#090e16]/85 backdrop-blur p-1 rounded text-[9px] font-mono text-[#bbcabf] flex justify-between">
                        <span>LAT: {inc.latitude}°N LON: {inc.longitude}°E</span>
                        <span className="text-[#4edea3]">SHA-256 VALID</span>
                      </div>
                    </div>
                  )}

                  <p className="text-[12px] text-[#dee2ee] font-sans leading-relaxed">
                    {inc.description}
                  </p>

                  <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-[#bbcabf] border-t border-[#252a33]">
                    <span>REPORTED BY: {inc.driverName}</span>
                    <span>{inc.timestamp}</span>
                  </div>

                  {inc.aiDetectionLabel && (
                    <div className="flex items-center justify-between bg-[#090e16] px-2 py-1 rounded text-[10px] font-mono">
                      <span className="text-[#4edea3]">
                        AI DETECTION: {inc.aiDetectionLabel}
                      </span>
                      <span className="text-[#ffb95f] font-bold">
                        {inc.aiConfidence}% CONFIDENCE
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* GPS Breadcrumb Buffer Inspector */}
          <div className="bg-[#171c24] rounded-xl border border-[#252a33] p-4 flex flex-col gap-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-white uppercase font-bold tracking-wider">
                TELEMETRY BREADCRUMB STREAM
              </span>
              <span className="text-[10px] font-mono text-[#4edea3] bg-[#090e16] px-2 py-0.5 rounded border border-[#252a33]">
                {gpsBuffer.length} STORED POINTS
              </span>
            </div>

            <div className="flex flex-col gap-1 text-[10px] font-mono text-[#bbcabf] bg-[#090e16] p-2.5 rounded-lg border border-[#252a33] max-h-36 overflow-y-auto font-mono">
              {gpsBuffer.slice(-5).reverse().map((pt, idx) => (
                <div key={idx} className="flex items-center justify-between py-0.5 border-b border-[#1b2028] last:border-none">
                  <span>{pt.timestamp.slice(11, 19)}</span>
                  <span className="text-white">{pt.latitude.toFixed(4)}°N, {pt.longitude.toFixed(4)}°E</span>
                  <span className="text-[#4edea3]">{pt.speedKmh} km/h</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
