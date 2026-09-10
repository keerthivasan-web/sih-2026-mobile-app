import React from 'react';
import { useApp } from '../context/AppContext';

export const TopHeader: React.FC = () => {
  const { activeTab, setActiveTab, isOffline, pendingCounts, viewMode, setViewMode } = useApp();

  const getSubTitle = () => {
    switch (activeTab) {
      case 'home':
        return 'FIELD INTEL • Home';
      case 'route':
        return 'FIELD INTEL • Route';
      case 'report':
        return 'FIELD INTEL • Report';
      case 'shipments':
        return 'FIELD INTEL • Shipments';
      case 'profile':
        return 'FIELD INTEL • Profile';
      default:
        return 'FIELD INTEL';
    }
  };

  return (
    <header className="sticky top-0 inset-x-0 z-40 bg-[#090e16]/95 backdrop-blur-xl border-b border-[#1b2028] pt-safe select-none">
      <div className="h-16 px-4 flex items-center justify-between gap-3">
        {/* Logo & Subtitle */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded bg-[#10b981] flex items-center justify-center shrink-0 shadow-sm">
            <span className="font-extrabold text-[#003824] text-lg tracking-tighter">EX</span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base text-[#dee2ee] tracking-wider uppercase leading-none truncate font-sans">
                EXTRICATE
              </span>
            </div>
            <span className="text-[11px] text-[#bbcabf] uppercase tracking-widest leading-none mt-1 font-mono truncate">
              {getSubTitle()}
            </span>
          </div>
        </div>

        {/* Right Status Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* View Mode Selector (Mobile vs Web Command) */}
          <div className="hidden sm:flex items-center p-0.5 rounded bg-[#171c24] border border-[#252a33] text-[11px] font-mono">
            <button
              onClick={() => setViewMode('mobile')}
              className={`px-2 py-1 rounded transition-colors ${
                viewMode === 'mobile' ? 'bg-[#10b981] text-[#002113] font-bold' : 'text-[#bbcabf] hover:text-white'
              }`}
            >
              DRIVER CAB
            </button>
            <button
              onClick={() => setViewMode('dashboard')}
              className={`px-2 py-1 rounded transition-colors ${
                viewMode === 'dashboard' ? 'bg-[#10b981] text-[#002113] font-bold' : 'text-[#bbcabf] hover:text-white'
              }`}
            >
              WEB HQ
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`px-2 py-1 rounded transition-colors ${
                viewMode === 'split' ? 'bg-[#10b981] text-[#002113] font-bold' : 'text-[#bbcabf] hover:text-white'
              }`}
            >
              SPLIT
            </button>
          </div>

          {/* Connectivity Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#171c24] border border-[#252a33]">
            <div
              className={`w-2 h-2 rounded-full ${
                isOffline ? 'bg-[#ffb690] animate-pulse' : 'bg-[#4edea3] animate-pulse'
              }`}
            />
            <span
              className={`text-[11px] font-mono uppercase font-bold ${
                isOffline ? 'text-[#ffb690]' : 'text-[#4edea3]'
              }`}
            >
              {isOffline ? 'OFFLINE' : 'ONLINE'}
            </span>
            {pendingCounts.pendingReports + pendingCounts.pendingGps > 0 && (
              <span className="px-1.5 py-0.2 rounded bg-[#252a33] text-[10px] font-mono text-[#ffb95f] ml-0.5">
                {pendingCounts.pendingReports} QUEUED
              </span>
            )}
          </div>

          {/* Truck ID & Avatar */}
          <div
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-2 pl-1 cursor-pointer group"
          >
            <div className="flex flex-col items-end">
              <span className="text-[11px] font-mono text-[#4edea3] bg-[#171c24] px-1.5 py-0.5 rounded border border-[#252a33] tracking-wider font-bold">
                TRK-2045
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#4edea3] flex items-center justify-center shrink-0 group-hover:ring-2 ring-[#10b981] transition-all">
              <span className="material-symbols-outlined text-[#003824] text-[18px]">person</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
