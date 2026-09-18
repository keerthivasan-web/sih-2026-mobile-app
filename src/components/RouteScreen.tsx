import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RerouteModal } from './RerouteModal';
import { OpenStreetMap } from './OpenStreetMap';

interface SelectedHazard {
  id: string;
  name: string;
  emoji: string;
  location: string;
  explanation: string;
  severity: 'HIGH' | 'BLOCKED';
}

export const RouteScreen: React.FC = () => {
  const {
    routeMetrics,
    currentGps,
    acceptReroute,
    setActiveTab,
    showToast,
    isRerouteModalOpen,
    setIsRerouteModalOpen,
    fromLocation,
    toLocation,
    activeAlert,
    t,
  } = useApp();

  const [selectedHazard, setSelectedHazard] = useState<SelectedHazard | null>(null);
  const isRerouted = routeMetrics.activeRoute === 'ALTERNATIVE';

  const handleRouteSelectOnMap = (routeType: 'PRIMARY' | 'ALTERNATIVE' | 'WEST_RIDGE') => {
    acceptReroute(routeType);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto select-none font-sans relative pb-28 min-h-[calc(100vh-60px)]">
      {/* 1. FLOATING TOP SEARCH / DESTINATION HEADER OVER MAP */}
      <div className="absolute top-3 inset-x-3 z-20 flex items-center gap-2">
        <button
          onClick={() => setActiveTab('home')}
          className="w-10 h-10 rounded-full bg-white text-indigo-950 flex items-center justify-center shadow-lg border border-indigo-50 hover:bg-slate-50 transition-colors shrink-0 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>

        {/* Search / Destination Input Bar */}
        <div className="flex-1 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-indigo-50/80 px-3.5 py-2 flex items-center justify-between gap-2 text-slate-800">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">{t.destination}:</span>
            <span className="text-xs font-black text-slate-900 truncate">{toLocation} ({routeMetrics.currentDistanceKm} km)</span>
          </div>
          <span className="material-symbols-outlined text-[20px] text-slate-400">search</span>
        </div>

        {/* Bell Icon */}
        <button
          onClick={() => setActiveTab('profile')}
          className="w-10 h-10 rounded-full bg-white text-indigo-950 flex items-center justify-center shadow-lg border border-indigo-50 hover:bg-slate-50 transition-colors shrink-0 cursor-pointer relative"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500" />
        </button>
      </div>

      {/* 2. FULL-SCREEN INTERACTIVE MAP WITH DIRECT POLYLINE CLICK REROUTING */}
      <div className="relative w-full h-[380px]">
        <OpenStreetMap
          height="380px"
          isRerouted={isRerouted}
          activeRoute={routeMetrics.activeRoute}
          incidents={[
            {
              id: 'h1',
              latitude: 27.170,
              longitude: 88.324,
              categoryLabel: t.roadBlocked.toUpperCase(),
              roadLocation: 'KM 74',
              description: 'Landslide reported ahead.',
            },
          ]}
          currentGps={currentGps}
          onRouteSelect={handleRouteSelectOnMap}
          onMarkerClick={(h) =>
            setSelectedHazard({
              id: h.id,
              name: h.categoryLabel || t.roadBlocked.toUpperCase(),
              emoji: '🚧',
              location: h.roadLocation || 'KM 74',
              explanation: h.description || 'Landslide reported ahead.',
              severity: 'BLOCKED',
            })
          }
        />

        {/* Floating Map Action Buttons */}
        <div className="absolute bottom-6 left-3 z-10 flex flex-col gap-2">
          <button
            onClick={() => showToast('Route saved to favorites', 'success')}
            className="w-10 h-10 rounded-full bg-white text-rose-500 flex items-center justify-center shadow-lg border border-slate-100 hover:scale-105 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">favorite</span>
          </button>
          <button
            onClick={() => showToast('Route shared with Command HQ', 'info')}
            className="w-10 h-10 rounded-full bg-white text-indigo-600 flex items-center justify-center shadow-lg border border-slate-100 hover:scale-105 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
          </button>
        </div>

        <div className="absolute bottom-6 right-3 z-10">
          <button
            onClick={() => showToast('GPS Re-centered on Vehicle', 'info')}
            className="w-11 h-11 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xl hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">my_location</span>
          </button>
        </div>
      </div>

      {/* 3. Hazard Details Popup */}
      {selectedHazard && (
        <div className="px-3 -mt-4 z-20">
          <div className="bg-rose-50 border-2 border-rose-300 p-3.5 rounded-2xl shadow-xl flex items-start justify-between gap-3 animate-in zoom-in-95">
            <div className="flex items-start gap-2.5">
              <span className="text-2xl mt-0.5">{selectedHazard.emoji}</span>
              <div className="flex flex-col">
                <span className="text-sm font-black text-rose-900 uppercase">
                  {selectedHazard.name} ({selectedHazard.location})
                </span>
                <p className="text-xs font-semibold text-rose-800 mt-0.5">
                  "{selectedHazard.explanation}"
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedHazard(null)}
              className="text-slate-400 hover:text-slate-700 text-sm font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* 4. Auto-Suggest Banner if incident was reported */}
      {activeAlert && (
        <div className="px-4 -mt-2 z-20">
          <div className="bg-indigo-600 text-white p-3 rounded-2xl shadow-xl flex items-center justify-between gap-2 animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🚨</span>
              <div className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-wider">{t.autoSuggestedRoute}</span>
                <span className="text-[11px] font-medium text-white/90">East Pass Bypass Corridor (+14 mins)</span>
              </div>
            </div>
            <button
              onClick={() => acceptReroute()}
              className="px-3 py-1.5 rounded-xl bg-white text-indigo-700 text-xs font-black uppercase shadow cursor-pointer hover:bg-indigo-50"
            >
              {t.acceptSaferRoute}
            </button>
          </div>
        </div>
      )}

      {/* 5. CURVED BOTTOM SHEET CARD matching sample image */}
      <div className="bg-white rounded-t-[2.5rem] shadow-[0_-12px_40px_rgba(0,0,0,0.12)] p-5 border-t border-indigo-50 flex flex-col gap-4 -mt-4 relative z-10">
        {/* Drag Pill indicator */}
        <div className="w-12 h-1.5 rounded-full bg-slate-200 mx-auto -mt-1" />

        {/* Mode Summary Strip */}
        <div className="bg-indigo-50/60 p-3 rounded-2xl border border-indigo-100/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600 text-[18px]">directions_walk</span>
            <span className="px-2 py-0.5 rounded-xl bg-indigo-600 text-white font-black">🚚 MED-123</span>
          </div>

          <div className="flex items-center gap-3 font-bold text-slate-700">
            <span>{t.eta}: <strong className="text-indigo-950 font-black">{isRerouted ? '4h 28m' : '4h 10m'}</strong></span>
            <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[11px]">{t.priority}: {t.critical}</span>
          </div>
        </div>

        {/* Vertical Route Timeline */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-3 text-xs">
          {/* Timeline Item 1: Start Location */}
          <div className="flex items-start gap-3">
            <span className="w-3 h-3 rounded-full bg-indigo-600 mt-0.5 shrink-0 shadow-sm" />
            <div className="flex-1 flex justify-between items-center">
              <span className="font-extrabold text-slate-900">{fromLocation} ({t.fromLocation})</span>
              <span className="text-[11px] font-mono text-slate-400 font-bold">6:55 pm</span>
            </div>
          </div>

          <div className="border-l-2 border-dashed border-indigo-300 ml-1.5 -my-1 h-4" />

          {/* Timeline Item 2: Midpoint Sector */}
          <div className="flex items-start gap-3">
            <span className="w-3 h-3 rounded-full bg-indigo-400 mt-0.5 shrink-0" />
            <div className="flex-1 flex justify-between items-center text-slate-600 font-medium">
              <span>Sector 3 Corridor</span>
              <span className="text-[11px] font-mono">Departure: 7:00</span>
            </div>
          </div>

          <div className="border-l-2 border-dashed border-indigo-300 ml-1.5 -my-1 h-4" />

          {/* Timeline Item 3: Destination */}
          <div className="flex items-start gap-3">
            <span className="w-3.5 h-3.5 rounded-full border-2 border-indigo-600 bg-white mt-0.5 shrink-0" />
            <div className="flex-1 flex justify-between items-center">
              <span className="font-extrabold text-indigo-700">{toLocation} ({t.destination})</span>
              <span className="text-[11px] font-mono text-slate-400 font-bold">7:35 pm</span>
            </div>
          </div>
        </div>

        {/* Click map hint */}
        <p className="text-[11px] font-semibold text-indigo-600 bg-indigo-50/40 p-2.5 rounded-xl border border-indigo-100/40 text-center">
          💡 {t.clickMapToReroute}
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col gap-2.5 pt-1">
          <button
            onClick={async () => {
              await acceptReroute();
              showToast(t.routeUpdated, 'success');
            }}
            className="w-full h-15 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 active:scale-98 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">alt_route</span>
            <span>{t.acceptSaferRoute}</span>
          </button>

          <button
            onClick={() => setActiveTab('report')}
            className="w-full h-12 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-300 active:scale-98 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-amber-600">
              warning
            </span>
            <span>{t.reportTitle}</span>
          </button>
        </div>
      </div>

      {/* Reroute Comparison Modal */}
      <RerouteModal
        isOpen={isRerouteModalOpen}
        onClose={() => setIsRerouteModalOpen(false)}
      />
    </div>
  );
};
