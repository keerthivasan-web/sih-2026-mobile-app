import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const NER_CITIES = [
  'Guwahati',
  'Aizawl',
  'Gangtok',
  'Shillong',
  'Imphal',
  'Agartala',
  'Itanagar',
  'Dimapur',
  'Kohima',
];

export const HomeScreen: React.FC = () => {
  const {
    driver,
    activeShipment,
    routeMetrics,
    isTripActive,
    toggleTrip,
    isOffline,
    pendingCounts,
    isGpsAvailable,
    setActiveTab,
    activeAlert,
    fromLocation,
    setFromLocation,
    toLocation,
    setToLocation,
    swapLocations,
    t,
  } = useApp();

  const [showDetails, setShowDetails] = useState(false);
  const [isEditingFrom, setIsEditingFrom] = useState(false);
  const [isEditingTo, setIsEditingTo] = useState(false);

  const getRouteStatusBadge = () => {
    switch (routeMetrics.currentRisk) {
      case 'OPEN':
        return { label: `🟢 ${t.open}`, bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'DEGRADED':
        return { label: `🟡 ${t.degraded}`, bg: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'HIGH-RISK':
        return { label: `🟠 ${t.highRisk}`, bg: 'bg-orange-50 text-orange-700 border-orange-200' };
      case 'BLOCKED':
        return { label: `🔴 ${t.blocked}`, bg: 'bg-rose-50 text-rose-700 border-rose-200' };
      default:
        return { label: `🟢 ${t.open}`, bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    }
  };

  const statusBadge = getRouteStatusBadge();
  const hasRouteProblem =
    routeMetrics.currentRisk === 'HIGH-RISK' ||
    routeMetrics.currentRisk === 'BLOCKED' ||
    !!activeAlert;

  return (
    <div className="flex flex-col w-full max-w-md mx-auto select-none font-sans pb-28">
      {/* 1. TOP PURPLE GRADIENT HEADER CARD with interactive From/To */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white p-5 rounded-b-[2.5rem] shadow-xl flex flex-col gap-4 relative">
        {/* Top Control Bar inside Header */}
        <div className="flex items-center justify-between text-white/90">
          <button
            onClick={() => setActiveTab('profile')}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">menu</span>
          </button>

          <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold">
            <span>Depart at: <strong>Now</strong></span>
            <span className="material-symbols-outlined text-[14px]">expand_more</span>
          </div>

          <button
            onClick={() => setActiveTab('profile')}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors relative cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-400" />
          </button>
        </div>

        {/* User Info & Floating Route Input Card */}
        <div className="flex items-start justify-between gap-3 pt-1">
          {/* Driver Avatar & Greeting */}
          <div
            onClick={() => setActiveTab('profile')}
            className="flex flex-col items-center text-center cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center text-2xl font-bold text-white shadow-md group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[32px]">person</span>
            </div>
            <span className="text-xs font-bold mt-1 text-white/90 truncate max-w-[80px]">
              {driver.name.split(' ')[0]}
            </span>
          </div>

          {/* Floating White Input Box (Interactive From / To!) */}
          <div className="flex-1 bg-white text-slate-800 p-3.5 rounded-2xl shadow-lg border border-white/40 flex items-center justify-between gap-2 relative">
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              {/* From Location */}
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 shrink-0" />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase leading-none">
                    {t.fromLocation}
                  </span>
                  {isEditingFrom ? (
                    <select
                      value={fromLocation}
                      onChange={(e) => {
                        setFromLocation(e.target.value);
                        setIsEditingFrom(false);
                      }}
                      onBlur={() => setIsEditingFrom(false)}
                      autoFocus
                      className="text-xs font-black text-slate-900 bg-slate-100 rounded px-1 py-0.5 outline-none font-sans"
                    >
                      {NER_CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  ) : (
                    <span
                      onClick={() => setIsEditingFrom(true)}
                      className="text-xs font-black text-slate-900 truncate hover:text-indigo-600 cursor-pointer flex items-center gap-1"
                      title="Click to change origin"
                    >
                      <span>{fromLocation}</span>
                      <span className="material-symbols-outlined text-[12px] text-slate-400">edit</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Connecting Dashed Line */}
              <div className="border-l-2 border-dashed border-indigo-200 ml-1.2 -my-1.5 h-3" />

              {/* To Location */}
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full border-2 border-indigo-600 bg-white shrink-0" />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase leading-none">
                    {t.toLocation}
                  </span>
                  {isEditingTo ? (
                    <select
                      value={toLocation}
                      onChange={(e) => {
                        setToLocation(e.target.value);
                        setIsEditingTo(false);
                      }}
                      onBlur={() => setIsEditingTo(false)}
                      autoFocus
                      className="text-xs font-black text-indigo-700 bg-indigo-50 rounded px-1 py-0.5 outline-none font-sans"
                    >
                      {NER_CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  ) : (
                    <span
                      onClick={() => setIsEditingTo(true)}
                      className="text-xs font-black text-indigo-700 truncate hover:text-indigo-900 cursor-pointer flex items-center gap-1"
                      title="Click to change destination"
                    >
                      <span>{toLocation}</span>
                      <span className="material-symbols-outlined text-[12px] text-slate-400">edit</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Swap Button ⇅ */}
            <button
              onClick={swapLocations}
              className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 shadow-md active:scale-90 transition-all shrink-0 cursor-pointer"
              title="Swap From / To Locations"
            >
              <span className="material-symbols-outlined text-[20px]">swap_vert</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT BODY */}
      <div className="px-4 pt-4 flex flex-col gap-4">
        {/* Section Title */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black text-indigo-950 font-sans tracking-tight">
            {t.suggestedRoutes}
          </h2>
          <span className="text-xs font-extrabold text-indigo-600 cursor-pointer hover:underline">
            View All
          </span>
        </div>

        {/* Dynamic Route Alert when blocked / reported */}
        {hasRouteProblem && (
          <div className="bg-rose-50 border-2 border-rose-300 p-4 rounded-2xl shadow-md flex flex-col gap-2.5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between text-rose-900 font-black text-sm">
              <span className="flex items-center gap-2">
                <span className="text-xl">⚠</span>
                <span>{t.roadBlocked.toUpperCase()} ALERT</span>
              </span>
              <span className="text-[10px] bg-rose-200 text-rose-900 px-2 py-0.5 rounded-full font-bold">
                AUTO-SUGGESTED
              </span>
            </div>
            <p className="text-xs font-semibold text-rose-800 leading-snug">
              {activeAlert?.cause || 'Landslide reported ahead at KM 74 bend.'}
            </p>
            <button
              onClick={() => setActiveTab('route')}
              className="w-full h-12 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1 shadow-md active:scale-98 transition-transform cursor-pointer"
            >
              [ VIEW SAFE ROUTE ]
            </button>
          </div>
        )}

        {/* Route / Delivery Option Cards matching sample images */}
        <div className="flex flex-col gap-3">
          {/* Active Primary Shipment Card */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-indigo-100 flex flex-col gap-3 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-xl bg-indigo-100 text-indigo-800 text-xs font-black flex items-center gap-1">
                  <span>💊</span>
                  <span>MED-123</span>
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {activeShipment.commodity}
                </span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusBadge.bg}`}>
                {statusBadge.label}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 pt-1 border-t border-slate-50 font-medium">
              <span>{t.eta}: <strong className="text-slate-900 font-extrabold">{routeMetrics.currentEta || '4h 10m'}</strong></span>
              <span>{t.priority}: <strong className="text-rose-600 font-extrabold">{t.critical}</strong></span>
            </div>

            {/* View details drawer toggle */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center justify-between pt-0.5"
            >
              <span>{showDetails ? 'Hide Shipment Manifest' : '[ VIEW MANIFEST DETAILS ]'}</span>
              <span className="material-symbols-outlined text-[16px]">
                {showDetails ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {showDetails && (
              <div className="p-3 bg-indigo-50/60 rounded-xl text-xs flex flex-col gap-1 text-slate-700 font-mono">
                <div>Manifest: <strong className="text-slate-900">{activeShipment.manifestCode}</strong></div>
                <div>Consignee: <strong className="text-slate-900">{activeShipment.consignee}</strong></div>
                <div>Weight: <strong className="text-slate-900">{activeShipment.cargoWeightKg} kg</strong></div>
                <div>Driver Vehicle: <strong className="text-slate-900">{driver.vehicleId}</strong></div>
              </div>
            )}
          </div>

          {/* Secondary Option Card 2 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-indigo-50/60 flex items-center justify-between opacity-90">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-xl bg-purple-100 text-purple-800 text-xs font-black">
                🚚 124
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-slate-900">East Pass Corridor</span>
                <span className="text-[11px] text-slate-500 font-medium">Bypass Route • 4h 28m</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
              LOW RISK
            </span>
          </div>

          {/* Secondary Option Card 3 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-indigo-50/60 flex items-center justify-between opacity-80">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-black">
                🚚 125
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-slate-900">Valley Route</span>
                <span className="text-[11px] text-slate-500 font-medium">NH-108 • 4h 50m</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold border border-amber-200">
              SLIGHT DELAY
            </span>
          </div>
        </div>

        {/* App Status Footer Strip */}
        <div className="bg-white p-3 rounded-2xl border border-indigo-50 shadow-xs flex items-center justify-between text-xs font-bold text-slate-600">
          <div>{t.connectivity}: <span className="text-indigo-600 font-black">{isGpsAvailable ? t.gpsActive : t.gpsUnavailable}</span></div>
          <div>{t.connection}: <span className={isOffline ? 'text-amber-600 font-black' : 'text-emerald-600 font-black'}>{isOffline ? t.offline : t.online}</span></div>
          <div>{t.lastSync}: <span className="text-slate-800 font-black">{pendingCounts.pendingReports > 0 ? `${pendingCounts.pendingReports} queued` : '13:20'}</span></div>
        </div>

        {/* Primary Action Button */}
        <button
          onClick={() => {
            if (!isTripActive) toggleTrip();
            setActiveTab('route');
          }}
          className="w-full h-15 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 active:scale-98 transition-all cursor-pointer mt-1"
        >
          <span className="material-symbols-outlined text-[24px]">
            {isTripActive ? 'map' : 'play_arrow'}
          </span>
          <span>{isTripActive ? t.viewRoute : t.startTrip}</span>
        </button>
      </div>
    </div>
  );
};
