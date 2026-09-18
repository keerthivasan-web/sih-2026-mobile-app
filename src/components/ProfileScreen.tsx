import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SupportedLanguage } from '../services/i18n';

export const ProfileScreen: React.FC = () => {
  const {
    driver,
    activeShipment,
    isOffline,
    toggleOffline,
    isGpsAvailable,
    pendingCounts,
    language,
    setLanguage,
    logout,
    simulateRoadBlock,
    simulateFlood,
    simulateHeavyRain,
    resetSimulation,
    showToast,
    fromLocation,
    toLocation,
    t,
  } = useApp();

  const [showDemoTools, setShowDemoTools] = useState(false);

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 py-4 gap-4 pb-28 select-none font-sans">
      {/* 1. Header Card matching sample profile style */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white p-6 rounded-[2rem] shadow-xl flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/50 text-white flex items-center justify-center text-3xl font-black shrink-0 shadow-md">
          {driver.name.charAt(0)}
        </div>
        <div className="flex flex-col min-w-0">
          <h2 className="text-2xl font-black text-white tracking-tight leading-tight">
            Arun Kumar
          </h2>
          <span className="text-xs font-bold text-white/90 mt-0.5">
            Vehicle: TN 52 AB 4521
          </span>
          <span className="text-[11px] text-white/80 font-medium">
            Phone: +91 98765 43210 • ID: ARUN-2045
          </span>
        </div>
      </div>

      {/* 2. TRIP STATUS */}
      <div className="bg-white p-4 rounded-3xl border border-indigo-50 shadow-sm flex flex-col gap-2">
        <span className="text-xs font-black text-indigo-400 uppercase tracking-wider">
          TRIP STATUS
        </span>
        <div className="flex items-center justify-between bg-indigo-50/50 p-3.5 rounded-2xl border border-indigo-100/50">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-medium">{t.currentDelivery}</span>
            <span className="text-sm font-black text-indigo-950">
              💊 {activeShipment.commodity}
            </span>
            <span className="text-xs font-semibold text-indigo-600 mt-0.5">
              {fromLocation} → {toLocation}
            </span>
          </div>
          <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold uppercase shadow-sm">
            IN TRANSIT
          </span>
        </div>
      </div>

      {/* 3. APP STATUS */}
      <div className="bg-white p-4 rounded-3xl border border-indigo-50 shadow-sm flex flex-col gap-2.5">
        <span className="text-xs font-black text-indigo-400 uppercase tracking-wider">
          {t.syncStatus}
        </span>
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex flex-col items-center">
            <span className="text-slate-400 font-normal">GPS</span>
            <span className="text-indigo-600 font-black text-sm mt-0.5">
              {isGpsAvailable ? 'ON' : 'OFF'}
            </span>
          </div>
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex flex-col items-center">
            <span className="text-slate-400 font-normal">{t.connectivity}</span>
            <span className={isOffline ? 'text-amber-600 font-black text-sm mt-0.5' : 'text-emerald-600 font-black text-sm mt-0.5'}>
              {isOffline ? t.offline : t.online}
            </span>
          </div>
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex flex-col items-center">
            <span className="text-slate-400 font-normal">{t.lastSync}</span>
            <span className="text-indigo-950 font-black text-sm mt-0.5">
              {pendingCounts.pendingReports > 0 ? `${pendingCounts.pendingReports} queued` : '13:20'}
            </span>
          </div>
        </div>
      </div>

      {/* 4. LANGUAGE SELECTOR */}
      <div className="bg-white p-4 rounded-3xl border border-indigo-50 shadow-sm flex flex-col gap-2.5">
        <span className="text-xs font-black text-indigo-400 uppercase tracking-wider">
          {t.language}
        </span>
        <div className="grid grid-cols-3 gap-2">
          {(
            [
              { code: 'en', label: 'English' },
              { code: 'hi', label: 'हिन्दी' },
              { code: 'as', label: 'অসমীয়া' },
            ] as { code: SupportedLanguage; label: string }[]
          ).map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  showToast(`Language switched to ${lang.label}`, 'success');
                }}
                className={`py-3 px-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {lang.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. LOGOUT */}
      <button
        onClick={() => {
          logout();
          showToast('Driver logged out', 'info');
        }}
        className="w-full h-14 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 border border-rose-200 active:scale-98 transition-all cursor-pointer shadow-xs"
      >
        <span className="material-symbols-outlined text-[20px]">logout</span>
        <span>{t.logout}</span>
      </button>

      {/* 6. DEVELOPER / DEMO ENTRY */}
      <div className="mt-2 pt-2 border-t border-slate-200">
        <button
          onClick={() => setShowDemoTools(!showDemoTools)}
          className="w-full py-2 text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center justify-center gap-1"
        >
          <span className="material-symbols-outlined text-[16px]">build</span>
          <span>{showDemoTools ? 'Hide Developer Demo Tools' : 'Developer / Demo Tools'}</span>
        </button>

        {showDemoTools && (
          <div className="mt-2 p-4 bg-slate-900 text-white rounded-3xl border border-slate-800 flex flex-col gap-3 animate-in fade-in duration-200">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
              DEMO SIMULATION CONTROLS
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
              <button
                onClick={() => {
                  simulateRoadBlock();
                }}
                className="p-3 rounded-2xl bg-rose-950 text-rose-300 border border-rose-800 hover:bg-rose-900 active:scale-95 transition-all text-left"
              >
                Simulate Landslide
              </button>
              <button
                onClick={() => {
                  simulateFlood();
                }}
                className="p-3 rounded-2xl bg-sky-950 text-sky-300 border border-sky-800 hover:bg-sky-900 active:scale-95 transition-all text-left"
              >
                Simulate Flood
              </button>
              <button
                onClick={() => {
                  simulateHeavyRain();
                }}
                className="p-3 rounded-2xl bg-amber-950 text-amber-300 border border-amber-800 hover:bg-amber-900 active:scale-95 transition-all text-left"
              >
                Simulate Heavy Rain
              </button>
              <button
                onClick={() => {
                  toggleOffline();
                }}
                className={`p-3 rounded-2xl border active:scale-95 transition-all text-left ${
                  isOffline
                    ? 'bg-amber-600 text-white border-amber-500'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                {isOffline ? 'Simulate Online' : 'Simulate Offline'}
              </button>
            </div>
            <button
              onClick={resetSimulation}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl text-xs font-mono font-bold border border-slate-700"
            >
              Reset Demo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
