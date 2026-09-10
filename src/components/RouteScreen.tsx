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
    t,
  } = useApp();

  const [mapLayer, setMapLayer] = useState<'topo' | 'satellite'>('topo');
  const [selectedHazard, setSelectedHazard] = useState<SelectedHazard | null>(null);

  const isRerouted = routeMetrics.activeRoute === 'ALTERNATIVE';

  const hazards: SelectedHazard[] = [
    {
      id: 'h1',
      name: 'ROAD BLOCKED',
      emoji: '🚧',
      location: 'KM 74',
      explanation: 'Landslide reported at KM 74. Mud slurry and boulders across both lanes.',
      severity: 'BLOCKED',
    },
    {
      id: 'h2',
      name: 'FLOOD',
      emoji: '🌊',
      location: 'KM 82',
      explanation: 'Flash flood runoff overflowing culvert at KM 82. Water depth ~45 cm.',
      severity: 'HIGH',
    },
    {
      id: 'h3',
      name: 'LANDSLIDE',
      emoji: '⛰',
      location: 'KM 96',
      explanation: 'Active slope instability on mountain bend at KM 96. Debris falling intermittently.',
      severity: 'BLOCKED',
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-md mx-auto py-2 gap-3 pb-28 select-none font-sans">
      {/* 1. Header Route Info Card */}
      <div className="px-4">
        <div className="w-full bg-[#1b2028] rounded-xl p-3.5 border border-[#252a33] shadow-md flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] font-mono text-[#bbcabf] uppercase tracking-wider font-bold">
              {t.yourRoute}
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-extrabold text-white font-mono">
                {isRerouted ? '195 km' : '180 km'}
              </span>
              <span className="text-base font-extrabold text-[#4edea3] font-mono">
                {isRerouted ? '4h 28m' : '4h 10m'}
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#bbcabf]">
              {isRerouted ? 'Corridor: East Pass Bypass' : 'Corridor: NH-108 Valley'}
            </span>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span
              className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold uppercase ${
                isRerouted
                  ? 'bg-[#10b981]/20 text-[#4edea3] border border-[#10b981]/40'
                  : 'bg-[#ff5449]/20 text-[#ffb4ab] border border-[#ff5449]/40 animate-pulse'
              }`}
            >
              {isRerouted ? '🟢 LOW RISK' : '🔴 HIGH RISK'}
            </span>
            <span className="text-[10px] font-mono text-[#bbcabf]">
              Corridor ±25km
            </span>
          </div>
        </div>
      </div>

      {/* 2. Color Code Road Legend Strip */}
      <div className="px-4">
        <div className="grid grid-cols-4 gap-1.5 p-1.5 bg-[#171c24] rounded-xl border border-[#252a33] text-[10px] font-mono text-center">
          <div className={`p-1 rounded flex items-center justify-center gap-1 ${isRerouted ? 'bg-[#10b981]/20 text-[#4edea3] font-bold' : 'text-[#bbcabf]'}`}>
            <span>🟢</span>
            <span>Normal</span>
          </div>
          <div className="p-1 rounded flex items-center justify-center gap-1 text-[#bbcabf]">
            <span>🟡</span>
            <span>Moderate</span>
          </div>
          <div className={`p-1 rounded flex items-center justify-center gap-1 ${!isRerouted ? 'bg-[#ec6a06]/20 text-[#ffb690] font-bold' : 'text-[#bbcabf]'}`}>
            <span>🟠</span>
            <span>High Risk</span>
          </div>
          <div className="p-1 rounded flex items-center justify-center gap-1 text-[#bbcabf]">
            <span>🔴</span>
            <span>Blocked</span>
          </div>
        </div>
      </div>

      {/* 3. OpenStreetMap Live View */}
      <div className="px-4">
        <OpenStreetMap
          height="340px"
          isRerouted={isRerouted}
          incidents={[
            { id: 'h1', latitude: 27.170, longitude: 88.324, categoryLabel: 'ROAD BLOCKED', roadLocation: 'NH-108 KM 74', description: 'Mudslide & boulders' },
            { id: 'h2', latitude: 27.185, longitude: 88.330, categoryLabel: 'FLOOD HAZARD', roadLocation: 'Culvert 14B', description: 'Culvert flash flood' }
          ]}
          currentGps={currentGps}
          onMarkerClick={(h) => setSelectedHazard({
            id: h.id,
            name: h.categoryLabel || 'HAZARD',
            emoji: '🚧',
            location: h.roadLocation || 'KM 74',
            explanation: h.description || 'Active hazard on route corridor.',
            severity: 'BLOCKED'
          })}
        />
      </div>

      {/* 4. Tap on Hazard Explanation Box */}
      {selectedHazard && (
        <div className="px-4">
          <div className="bg-[#1b2028] p-3.5 rounded-xl border-2 border-[#ec6a06] shadow-xl flex items-start justify-between gap-3 animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-start gap-2.5">
              <span className="text-2xl mt-0.5">{selectedHazard.emoji}</span>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-mono font-extrabold text-white uppercase">
                    {selectedHazard.name} ({selectedHazard.location})
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-[#ff5449]/20 text-[#ffb4ab] text-[9px] font-mono font-bold">
                    {selectedHazard.severity}
                  </span>
                </div>
                <p className="text-[13px] text-[#dee2ee] mt-1 leading-snug">
                  "{selectedHazard.explanation}"
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedHazard(null)}
              className="w-7 h-7 rounded bg-[#090e16] text-[#bbcabf] hover:text-white flex items-center justify-center shrink-0"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* 5. Route Action Buttons (REQUEST REROUTE / VIEW ALTERNATIVE / ACCEPT REROUTE) */}
      <div className="px-4 flex flex-col gap-2.5 mt-1">
        {/* VIEW ALTERNATIVE / REROUTE BUTTON */}
        <button
          onClick={() => setIsRerouteModalOpen(true)}
          className="w-full h-15 bg-[#10b981] hover:bg-[#4edea3] text-[#002113] rounded-xl font-sans font-extrabold text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]">alt_route</span>
          <span>{isRerouted ? 'VIEW ACTIVE BYPASS ROUTE' : 'VIEW SAFER ALTERNATIVE ROUTE'}</span>
        </button>

        {/* Secondary Row: [REQUEST REROUTE] and [REPORT CONDITION] */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              setIsRerouteModalOpen(true);
              showToast('Opening route comparison evaluation...', 'info', 'alt_route');
            }}
            className="h-13 bg-[#252a33] hover:bg-[#30353e] text-[#dee2ee] text-[12px] font-mono font-bold uppercase rounded-xl flex items-center justify-center gap-1.5 border border-[#3c4a42] active:scale-98 transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-[#4edea3]">
              route
            </span>
            <span>REQUEST REROUTE</span>
          </button>

          <button
            onClick={() => setActiveTab('report')}
            className="h-13 bg-[#252a33] hover:bg-[#30353e] text-[#dee2ee] text-[12px] font-mono font-bold uppercase rounded-xl flex items-center justify-center gap-1.5 border border-[#3c4a42] active:scale-98 transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-[#ffb95f]">
              warning
            </span>
            <span>REPORT HAZARD</span>
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
