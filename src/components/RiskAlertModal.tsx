import React from 'react';
import { useApp } from '../context/AppContext';

export const RiskAlertModal: React.FC = () => {
  const { activeAlert, dismissAlert, acceptReroute, setActiveTab, t } = useApp();

  if (!activeAlert || !activeAlert.active) return null;

  return (
    <div className="fixed top-16 inset-x-0 z-50 px-4 max-w-md mx-auto pointer-events-auto transition-all animate-in fade-in slide-in-from-top-4 duration-300 font-sans">
      <div className="w-full bg-white border-2 border-rose-600 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header Alert Strip */}
        <div className="bg-rose-600 px-4 py-3 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] font-black animate-bounce">
              warning
            </span>
            <span className="text-base font-black uppercase tracking-wider">
              ⚠ {t.roadBlocked.toUpperCase()}
            </span>
          </div>
          <button
            onClick={() => dismissAlert()}
            className="text-white/80 hover:text-white font-bold text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Alert Content */}
        <div className="p-4 flex flex-col gap-3 text-slate-900">
          <div>
            <h3 className="text-base font-bold text-rose-900 leading-snug">
              {activeAlert.cause || t.landslide}
            </h3>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              Current route is unavailable.
            </p>
          </div>

          {/* Safe Alternative Box */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-col gap-1">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
              {t.autoSuggestedRoute}
            </span>
            <div className="flex items-center justify-between font-extrabold text-sm text-slate-900 mt-0.5">
              <span>{t.eta}: 18:45</span>
              <span className="text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full text-xs">
                {t.open}
              </span>
            </div>
          </div>

          {/* Primary & Secondary Actions */}
          <div className="flex flex-col gap-2 pt-1">
            <button
              onClick={async () => {
                await acceptReroute();
              }}
              className="w-full h-14 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md active:scale-98 transition-transform cursor-pointer"
            >
              {t.useSafeRoute}
            </button>

            <button
              onClick={() => {
                setActiveTab('route');
              }}
              className="w-full h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider flex items-center justify-center border border-slate-300 active:scale-98 transition-transform cursor-pointer"
            >
              {t.viewMap}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
