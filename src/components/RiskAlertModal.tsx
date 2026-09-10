import React from 'react';
import { useApp } from '../context/AppContext';

export const RiskAlertModal: React.FC = () => {
  const { activeAlert, dismissAlert, acceptReroute, setActiveTab } = useApp();

  if (!activeAlert || !activeAlert.active) return null;

  return (
    <div className="fixed top-18 inset-x-0 z-50 px-4 max-w-md mx-auto pointer-events-auto transition-all animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="w-full bg-[#1b2028] border-2 border-[#ec6a06] rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(236,106,6,0.3)]">
        {/* Urgent Header Strip */}
        <div className="bg-[#ec6a06] px-3.5 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#341100] text-[22px] font-bold animate-bounce">
              warning
            </span>
            <span className="text-[13px] font-mono text-[#341100] tracking-wider uppercase font-extrabold">
              ⚠ ROUTE RISK DETECTED
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#341100] bg-white/30 px-2 py-0.5 rounded font-bold">
            CRITICAL DISPATCH
          </span>
        </div>

        {/* Content Body */}
        <div className="p-3.5 flex flex-col gap-3 text-[#dee2ee]">
          <div>
            <span className="text-[11px] font-mono text-[#bbcabf] uppercase tracking-wider block">
              CAUSE
            </span>
            <p className="text-[14px] font-medium text-white leading-snug mt-0.5">
              {activeAlert.cause}
            </p>
          </div>

          {/* Current vs Alternative Status Grid */}
          <div className="grid grid-cols-2 gap-2 bg-[#090e16] p-2.5 rounded-lg border border-[#252a33]">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-[#bbcabf] uppercase">
                CURRENT CORRIDOR
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ec6a06] animate-pulse" />
                <span className="text-[13px] font-mono font-bold text-[#ffb690]">
                  {activeAlert.currentRisk}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#bbcabf] mt-0.5">
                Delay: +{activeAlert.impactDelayMins}m
              </span>
            </div>

            <div className="flex flex-col border-l border-[#252a33] pl-2.5">
              <span className="text-[10px] font-mono text-[#4edea3] uppercase">
                ALTERNATIVE BYPASS
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                <span className="text-[13px] font-mono font-bold text-[#4edea3]">
                  {activeAlert.alternativeRisk}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#4edea3] mt-0.5">
                {activeAlert.alternativeRouteName}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => {
                setActiveTab('route');
              }}
              className="h-12 rounded-lg bg-[#252a33] hover:bg-[#30353e] text-[#dee2ee] text-[12px] font-mono uppercase font-bold flex items-center justify-center gap-1.5 border border-[#3c4a42] active:scale-98 transition-transform"
            >
              <span className="material-symbols-outlined text-[18px] text-[#ffb95f]">
                visibility
              </span>
              VIEW ALT
            </button>

            <button
              onClick={() => acceptReroute()}
              className="h-12 rounded-lg bg-[#10b981] hover:bg-[#4edea3] text-[#002113] text-[12px] font-mono uppercase font-extrabold flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-transform"
            >
              <span className="material-symbols-outlined text-[18px]">
                alt_route
              </span>
              ACCEPT REROUTE
            </button>
          </div>

          <button
            onClick={() => dismissAlert()}
            className="text-[11px] font-mono text-[#bbcabf] hover:text-white py-0.5 text-center uppercase tracking-wider"
          >
            Dismiss advisory
          </button>
        </div>
      </div>
    </div>
  );
};
