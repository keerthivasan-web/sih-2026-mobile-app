import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SupportedLanguage } from '../services/i18n';

export const ProfileScreen: React.FC = () => {
  const {
    driver,
    pendingCounts,
    isOffline,
    toggleOffline,
    isSyncing,
    triggerSync,
    language,
    setLanguage,
    logout,
    showToast,
    t,
  } = useApp();

  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  const handleSyncNow = async () => {
    setSyncFeedback(null);
    await triggerSync();
    if (!isOffline) {
      setSyncFeedback(t.syncComplete);
      showToast(t.syncComplete, 'success', 'done_all');
    } else {
      showToast('Offline: queued in local storage', 'info', 'cloud_off');
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 py-2 gap-3 pb-28 select-none font-sans">
      {/* 1. SYNC STATUS Card (Strictly per prompt specification) */}
      <section className="flex flex-col bg-[#1b2028] rounded-2xl overflow-hidden border-2 border-[#252a33] shadow-xl">
        {/* Header Bar */}
        <div className={`p-4 flex items-center justify-between ${isOffline ? 'bg-[#ec6a06]' : 'bg-[#10b981]'}`}>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#002113] text-[24px]">
              {isOffline ? 'cloud_off' : 'cloud_sync'}
            </span>
            <h2 className="text-base font-extrabold text-[#002113] uppercase font-sans tracking-wide">
              {t.syncStatus}
            </h2>
          </div>
          <button
            onClick={toggleOffline}
            className="px-2.5 py-1 rounded bg-[#090e16]/30 text-[#002113] text-[10px] font-mono font-extrabold uppercase"
          >
            {isOffline ? 'GO ONLINE' : 'GO OFFLINE'}
          </button>
        </div>

        {/* Sync Spec Breakdown */}
        <div className="p-4 flex flex-col gap-3">
          <div className="flex flex-col gap-2.5 bg-[#090e16] p-3.5 rounded-xl border border-[#252a33] text-[13px] font-mono">
            {/* Connection */}
            <div className="flex items-center justify-between">
              <span className="text-[#bbcabf]">{t.connection}</span>
              <span className={`font-extrabold flex items-center gap-1.5 ${isOffline ? 'text-[#ffb690]' : 'text-[#4edea3]'}`}>
                <span>{isOffline ? '📴' : '🟢'}</span>
                <span>{isOffline ? t.offline : t.online}</span>
              </span>
            </div>

            {/* Pending Reports */}
            <div className="flex items-center justify-between border-t border-[#252a33] pt-2">
              <span className="text-[#bbcabf]">{t.pendingReports}</span>
              <span className="font-extrabold text-white text-base">
                {pendingCounts.pendingReports}
              </span>
            </div>

            {/* Pending GPS */}
            <div className="flex items-center justify-between border-t border-[#252a33] pt-2">
              <span className="text-[#bbcabf]">{t.pendingGps}</span>
              <span className="font-extrabold text-[#4edea3] text-base">
                {pendingCounts.pendingGps}
              </span>
            </div>

            {/* Pending Photos */}
            <div className="flex items-center justify-between border-t border-[#252a33] pt-2">
              <span className="text-[#bbcabf]">{t.pendingPhotos}</span>
              <span className="font-extrabold text-[#ffb95f] text-base">
                {pendingCounts.pendingReports}
              </span>
            </div>

            {/* Last Sync */}
            <div className="flex items-center justify-between border-t border-[#252a33] pt-2">
              <span className="text-[#bbcabf]">{t.lastSync}</span>
              <span className="text-white font-bold">10:42 AM</span>
            </div>
          </div>

          {/* Sync Complete / Syncing banner */}
          {isSyncing ? (
            <div className="bg-[#10b981]/20 border border-[#10b981] p-3 rounded-xl flex items-center gap-2 text-[#4edea3] font-mono text-[12px] font-bold animate-pulse">
              <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
              <span>{t.syncing}</span>
            </div>
          ) : syncFeedback ? (
            <div className="bg-[#10b981]/20 border border-[#10b981] p-3 rounded-xl flex items-center gap-2 text-[#4edea3] font-mono text-[12px] font-bold">
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              <span>✓ {syncFeedback}</span>
            </div>
          ) : null}

          {/* Large [SYNC NOW] Button */}
          <button
            onClick={handleSyncNow}
            disabled={isSyncing}
            className="w-full h-15 rounded-xl bg-[#10b981] hover:bg-[#4edea3] text-[#002113] font-sans font-extrabold text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all cursor-pointer disabled:opacity-50"
          >
            <span className={`material-symbols-outlined text-[24px] ${isSyncing ? 'animate-spin' : ''}`}>
              sync
            </span>
            <span>{isSyncing ? t.syncing : t.syncNow}</span>
          </button>
        </div>
      </section>

      {/* 2. Driver & Vehicle Profile Details */}
      <section className="flex flex-col bg-[#1b2028] p-4 rounded-xl border border-[#252a33] gap-3 shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#bbcabf] uppercase tracking-wider font-bold">
            {t.driverProfile}
          </span>
          <span className="px-2 py-0.5 rounded bg-[#090e16] text-[10px] font-mono text-[#4edea3] font-bold border border-[#252a33]">
            VERIFIED
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl bg-[#090e16] border border-[#252a33] flex items-center justify-center text-2xl font-extrabold text-[#4edea3] shadow">
            {driver.name.charAt(0)}
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-extrabold text-white uppercase font-sans">
              {driver.name}
            </h3>
            <span className="text-[12px] font-mono text-[#4edea3]">
              ID: {driver.driverId} • License: {driver.licenseNumber}
            </span>
            <span className="text-[11px] font-mono text-[#bbcabf] mt-0.5">
              Assigned: {driver.vehicleId} ({driver.vehicleType})
            </span>
          </div>
        </div>
      </section>

      {/* 3. MULTILINGUAL Language Selector */}
      <section className="flex flex-col bg-[#1b2028] p-4 rounded-xl border border-[#252a33] gap-2.5 shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#bbcabf] uppercase tracking-wider font-bold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#4edea3]">translate</span>
            <span>{t.language}</span>
          </span>
          <span className="text-[10px] font-mono text-[#4edea3]">NER LOCALIZATION</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {(
            [
              { code: 'en', label: 'English', sub: 'Default' },
              { code: 'hi', label: 'हिन्दी', sub: 'Hindi' },
              { code: 'as', label: 'অসমীয়া', sub: 'Assamese' },
            ] as { code: SupportedLanguage; label: string; sub: string }[]
          ).map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  showToast(`Language switched to ${lang.label}`, 'success', 'translate');
                }}
                className={`py-2.5 px-2 rounded-xl flex flex-col items-center justify-center gap-0.5 border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#10b981] text-[#002113] border-[#4edea3] font-bold shadow'
                    : 'bg-[#171c24] hover:bg-[#252a33] text-white border-[#252a33]'
                }`}
              >
                <span className="text-[13px] font-bold">{lang.label}</span>
                <span className={`text-[10px] font-mono ${isSelected ? 'text-[#002113]/80' : 'text-[#bbcabf]'}`}>
                  {lang.sub}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. Logout / Switch Operator Button */}
      <button
        onClick={() => {
          logout();
          showToast('Driver logged out. Session locked.', 'info', 'logout');
        }}
        className="w-full h-13 rounded-xl bg-[#252a33] hover:bg-[#30353e] text-[#ffb4ab] text-[12px] font-mono font-bold uppercase flex items-center justify-center gap-2 border border-[#3c4a42] active:scale-98 transition-all cursor-pointer mt-1"
      >
        <span className="material-symbols-outlined text-[20px]">logout</span>
        <span>{t.logout} / SWITCH OPERATOR</span>
      </button>
    </div>
  );
};
