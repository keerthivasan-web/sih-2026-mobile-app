import React from 'react';
import { useApp } from '../context/AppContext';

export const HomeScreen: React.FC = () => {
  const {
    driver,
    activeShipment,
    routeMetrics,
    currentGps,
    isTripActive,
    toggleTrip,
    isOffline,
    toggleOffline,
    isSyncing,
    triggerSync,
    pendingCounts,
    isGpsAvailable,
    enableGps,
    toggleGpsAvailable,
    setActiveTab,
    showToast,
    t,
  } = useApp();

  const getRouteBadge = () => {
    switch (routeMetrics.currentRisk) {
      case 'OPEN':
        return { emoji: '🟢', text: t.open, color: 'text-[#4edea3]', bg: 'bg-[#10b981]/20', border: 'border-[#10b981]/40' };
      case 'DEGRADED':
        return { emoji: '🟡', text: t.degraded, color: 'text-[#ffb95f]', bg: 'bg-[#ffb95f]/20', border: 'border-[#ffb95f]/40' };
      case 'HIGH-RISK':
        return { emoji: '🟠', text: t.highRisk, color: 'text-[#ec6a06]', bg: 'bg-[#ec6a06]/20', border: 'border-[#ec6a06]/40' };
      case 'BLOCKED':
        return { emoji: '🔴', text: t.blocked, color: 'text-[#ffb4ab]', bg: 'bg-[#ff5449]/20', border: 'border-[#ff5449]/40' };
      default:
        return { emoji: '🟢', text: t.open, color: 'text-[#4edea3]', bg: 'bg-[#10b981]/20', border: 'border-[#10b981]/40' };
    }
  };

  const routeBadge = getRouteBadge();
  const isCritical = activeShipment.priority === 'CRITICAL';
  const isRouteRisky = routeMetrics.currentRisk === 'HIGH-RISK' || routeMetrics.currentRisk === 'BLOCKED';

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 py-3 gap-3 pb-28 select-none font-sans">
      {/* 1. Offline Mode Banner */}
      {isOffline && (
        <div className="bg-[#ec6a06] text-[#250b00] p-3.5 rounded-xl border border-[#ff8c42] shadow-md flex items-start gap-2.5 animate-in fade-in duration-200">
          <span className="text-xl shrink-0 mt-0.5">📴</span>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm uppercase tracking-wider font-mono">
              {t.offlineMode}
            </span>
            <span className="text-[12px] font-medium leading-tight text-[#341100]">
              "{t.offlineBannerSub}"
            </span>
          </div>
        </div>
      )}

      {/* 2. Driver & Vehicle Header Greeting */}
      <div className="flex items-center justify-between p-3.5 bg-[#1b2028] rounded-xl border border-[#252a33] shadow-md">
        <div className="flex flex-col">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#4edea3] font-bold">
            EXTRICATE FIELD OPERATIVE
          </span>
          <h1 className="text-xl font-extrabold text-white tracking-wide uppercase mt-0.5">
            {t.goodMorning}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[13px] font-mono text-white font-bold bg-[#090e16] px-2 py-0.5 rounded border border-[#252a33] flex items-center gap-1">
              <span>🚚</span>
              <span>{driver.vehicleId}</span>
            </span>
            <span className="text-[11px] font-mono text-[#bbcabf]">
              {driver.vehicleType}
            </span>
          </div>
        </div>

        <div className="w-12 h-12 rounded-xl bg-[#4edea3] text-[#003824] flex items-center justify-center font-extrabold text-xl shadow-md">
          <span className="material-symbols-outlined text-[30px]">local_shipping</span>
        </div>
      </div>

      {/* 3. GPS Tracking Status Indicator */}
      <div className="p-3 bg-[#171c24] rounded-xl border border-[#252a33] flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          {isGpsAvailable ? (
            <div className="flex items-center gap-1.5">
              <span className="text-base">📍</span>
              <div className="flex flex-col">
                <span className="text-[12px] font-mono text-[#4edea3] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <span>{t.gpsActive}</span>
                  {isTripActive && <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-ping" />}
                </span>
                <span className="text-[10px] font-mono text-[#bbcabf]">
                  {t.lastUpdated} 10:42 AM • ±{currentGps.accuracy}m
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="text-base">⚠</span>
              <div className="flex flex-col">
                <span className="text-[12px] font-mono text-[#ffb4ab] font-bold uppercase">
                  {t.gpsUnavailable}
                </span>
                <span className="text-[10px] font-mono text-[#bbcabf]">
                  Hardware antenna disconnected
                </span>
              </div>
            </div>
          )}
        </div>

        {isGpsAvailable ? (
          <button
            onClick={toggleGpsAvailable}
            className="px-2.5 py-1 rounded bg-[#090e16] hover:bg-[#252a33] text-[#bbcabf] text-[10px] font-mono border border-[#252a33]"
            title="Toggle GPS availability simulation"
          >
            {isTripActive ? `${currentGps.speed} KM/H` : 'STANDBY'}
          </button>
        ) : (
          <button
            onClick={enableGps}
            className="px-3 py-1.5 rounded bg-[#ec6a06] hover:bg-[#ff8c42] text-[#2c0e00] text-[11px] font-mono font-extrabold uppercase shadow"
          >
            {t.enableLocation}
          </button>
        )}
      </div>

      {/* 4. Critical Shipment Advisory Banner */}
      {isCritical && (
        <div className="bg-[#ec6a06]/20 border border-[#ec6a06] p-3 rounded-xl flex items-start gap-2.5">
          <span className="text-lg shrink-0 mt-0.5">🚨</span>
          <div className="flex flex-col">
            <span className="font-extrabold text-[12px] font-mono text-[#ffb690] uppercase tracking-wider">
              {t.criticalDeliveryAlert}
            </span>
            <p className="text-[12px] text-white leading-snug mt-0.5">
              "{isRouteRisky ? t.criticalFindingSafer : t.criticalDeliveryMsg}"
            </p>
          </div>
        </div>
      )}

      {/* 5. CURRENT DELIVERY Card */}
      <div className="flex flex-col bg-[#1b2028] rounded-xl overflow-hidden border border-[#252a33] shadow-lg">
        {/* Accent Bar */}
        <div className={`h-1.5 w-full ${isCritical ? 'bg-[#ec6a06]' : 'bg-[#4edea3]'}`} />

        <div className="p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#bbcabf] uppercase tracking-widest font-bold">
              {t.currentDelivery}
            </span>
            <span className="text-[11px] font-mono text-[#4edea3] font-bold">
              #{activeShipment.manifestCode}
            </span>
          </div>

          {/* Commodity Name */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">💊</span>
            <h2 className="text-xl font-extrabold text-white leading-tight font-sans">
              {activeShipment.commodity}
            </h2>
          </div>

          {/* Spec Grid according to prompt specification */}
          <div className="flex flex-col gap-2 bg-[#090e16] p-3 rounded-xl border border-[#252a33] text-[13px] font-mono">
            {/* Priority */}
            <div className="flex items-center justify-between">
              <span className="text-[#bbcabf]">{t.priority}</span>
              <span className="font-extrabold text-[#ffb4ab] flex items-center gap-1">
                <span>🔴</span>
                <span>{activeShipment.priority}</span>
              </span>
            </div>

            {/* Destination */}
            <div className="flex items-center justify-between border-t border-[#252a33] pt-2">
              <span className="text-[#bbcabf]">{t.destination}</span>
              <span className="font-bold text-white text-right truncate max-w-[200px]">
                {activeShipment.destination}
              </span>
            </div>

            {/* ETA */}
            <div className="flex items-center justify-between border-t border-[#252a33] pt-2">
              <span className="text-[#bbcabf]">{t.eta}</span>
              <span className="font-extrabold text-white text-base">
                {routeMetrics.currentEta}
              </span>
            </div>

            {/* Route Risk */}
            <div className="flex items-center justify-between border-t border-[#252a33] pt-2">
              <span className="text-[#bbcabf]">{t.route}</span>
              <span className={`font-extrabold flex items-center gap-1 ${routeBadge.color}`}>
                <span>{routeBadge.emoji}</span>
                <span>{routeBadge.text}</span>
              </span>
            </div>

            {/* Connectivity */}
            <div className="flex items-center justify-between border-t border-[#252a33] pt-2">
              <span className="text-[#bbcabf]">{t.connectivity}</span>
              <span className={`font-bold flex items-center gap-1 ${isOffline ? 'text-[#ffb690]' : 'text-[#4edea3]'}`}>
                <span>{isOffline ? '📴' : '🟢'}</span>
                <span>{isOffline ? t.offline : t.online}</span>
              </span>
            </div>

            {/* Last Sync */}
            <div className="flex items-center justify-between border-t border-[#252a33] pt-2">
              <span className="text-[#bbcabf]">{t.lastSync}</span>
              <span className="text-[#bbcabf]">
                {pendingCounts.pendingReports > 0 ? `${pendingCounts.pendingReports} queued` : '2m ago'}
              </span>
            </div>
          </div>

          {/* Quick Route View Action */}
          <button
            onClick={() => setActiveTab('route')}
            className="w-full py-2 px-3 rounded-lg bg-[#171c24] hover:bg-[#252a33] text-[#4edea3] text-[12px] font-mono font-bold flex items-center justify-between border border-[#252a33] transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">map</span>
              <span>INSPECT ROUTE ON MAP</span>
            </span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* 6. Primary Action Buttons */}
      <div className="flex flex-col gap-2.5 mt-1">
        {/* START / END TRIP BUTTON */}
        <button
          onClick={toggleTrip}
          className={`h-16 w-full rounded-2xl font-sans font-extrabold text-lg uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl active:scale-[0.98] transition-all cursor-pointer ${
            isTripActive
              ? 'bg-[#93000a] hover:bg-[#690005] text-[#ffdad6] border-2 border-[#ffb4ab]'
              : 'bg-[#10b981] hover:bg-[#4edea3] text-[#002113]'
          }`}
        >
          <span className="material-symbols-outlined text-[32px]">
            {isTripActive ? 'pause_circle' : 'play_circle'}
          </span>
          <span>{isTripActive ? t.endTrip : t.startTrip}</span>
        </button>

        {/* Secondary Row: [REPORT CONDITION] and [SYNC NOW] */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setActiveTab('report')}
            className="h-14 rounded-xl bg-[#252a33] hover:bg-[#30353e] text-[#dee2ee] text-[12px] font-mono font-bold uppercase flex items-center justify-center gap-2 border border-[#3c4a42] active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-[20px] text-[#ffb95f]">
              warning
            </span>
            <span>REPORT CONDITION</span>
          </button>

          <button
            onClick={async () => {
              await triggerSync();
              showToast(isOffline ? 'OFFLINE: Queue retained in SQLite' : 'SYNC COMPLETE: Data sent to Web HQ', 'success', 'done_all');
            }}
            disabled={isSyncing}
            className="h-14 rounded-xl bg-[#252a33] hover:bg-[#30353e] text-[#4edea3] text-[12px] font-mono font-bold uppercase flex items-center justify-center gap-2 border border-[#3c4a42] active:scale-[0.98] transition-all disabled:opacity-50"
          >
            <span className={`material-symbols-outlined text-[20px] ${isSyncing ? 'animate-spin' : ''}`}>
              sync
            </span>
            <span>{isSyncing ? t.syncing : 'SYNC NOW'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
