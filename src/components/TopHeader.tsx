import React from 'react';
import { useApp } from '../context/AppContext';

export const TopHeader: React.FC = () => {
  const { activeTab, isOffline, pendingCounts, viewMode, setViewMode, t } = useApp();

  const getSubTitle = () => {
    switch (activeTab) {
      case 'home':
        return t.driverDashboard;
      case 'route':
        return t.routeNavigation;
      case 'report':
        return t.reportCondition;
      case 'profile':
        return t.driverProfile;
      default:
        return t.appName;
    }
  };

  return (
    <header className="sticky top-0 inset-x-0 z-40 bg-white/80 backdrop-blur-md border-b border-indigo-50/60 pt-safe select-none shadow-xs">
      <div className="h-14 px-4 flex items-center justify-between gap-3 max-w-md mx-auto">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-xs tracking-wider shadow-sm">
            EX
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-extrabold text-base text-indigo-950 tracking-wider uppercase font-sans leading-none">
              {t.appName}
            </span>
            <span className="text-[11px] font-semibold text-slate-500 truncate leading-none mt-1 font-sans">
              {getSubTitle()}
            </span>
          </div>
        </div>

        {/* Status & Mode Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          {/* View Mode Selector */}
          <div className="hidden sm:flex items-center p-0.5 rounded-lg bg-indigo-50 border border-indigo-100 text-[11px]">
            <button
              onClick={() => setViewMode('mobile')}
              className={`px-2 py-0.5 rounded-md transition-colors ${
                viewMode === 'mobile' ? 'bg-indigo-600 text-white font-bold' : 'text-indigo-600 hover:text-indigo-950'
              }`}
            >
              CAB
            </button>
            <button
              onClick={() => setViewMode('dashboard')}
              className={`px-2 py-0.5 rounded-md transition-colors ${
                viewMode === 'dashboard' ? 'bg-indigo-600 text-white font-bold' : 'text-indigo-600 hover:text-indigo-950'
              }`}
            >
              HQ
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`px-2 py-0.5 rounded-md transition-colors ${
                viewMode === 'split' ? 'bg-indigo-600 text-white font-bold' : 'text-indigo-600 hover:text-indigo-950'
              }`}
            >
              SPLIT
            </button>
          </div>

          {/* Connectivity Pill */}
          <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
            isOffline ? 'bg-amber-50 text-amber-800 border-amber-300' : 'bg-indigo-50 text-indigo-700 border-indigo-200'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isOffline ? 'bg-amber-500' : 'bg-indigo-600 animate-pulse'}`} />
            <span>{isOffline ? t.offline : t.online}</span>
            {pendingCounts.pendingReports > 0 && (
              <span className="bg-amber-200 text-amber-900 text-[10px] px-1.5 py-0.2 rounded-full">
                {pendingCounts.pendingReports}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
