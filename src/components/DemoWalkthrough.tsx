import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const DemoWalkthrough: React.FC = () => {
  const {
    activeShipment,
    isTripActive,
    toggleTrip,
    activeAlert,
    simulateRoadBlock,
    simulateFlood,
    acceptReroute,
    isOffline,
    toggleOffline,
    submitReport,
    triggerSync,
    setActiveTab,
    setViewMode,
    showToast,
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const STEPS = [
    {
      step: 1,
      title: 'Driver Logs In',
      desc: 'Driver Arun Kumar authenticated (TRK-2045)',
      actionText: 'VERIFY LOGIN',
      action: () => {
        setActiveTab('home');
        showToast('Step 1: Driver Arun Kumar logged in to TRK-2045', 'success', 'person');
        setCurrentStep(2);
      },
    },
    {
      step: 2,
      title: 'Views Active Shipment',
      desc: 'Review #MED-2045-RX Emergency Medicines Manifest',
      actionText: 'INSPECT MANIFEST',
      action: () => {
        setActiveTab('shipments');
        showToast('Step 2: Active shipment #MED-2045-RX (Critical Priority)', 'info', 'inventory_2');
        setCurrentStep(3);
      },
    },
    {
      step: 3,
      title: 'Starts Trip',
      desc: 'Engage GPS telematics and trip tracker',
      actionText: 'START TRIP',
      action: () => {
        setActiveTab('home');
        if (!isTripActive) toggleTrip();
        showToast('Step 3: Trip started. GPS breadcrumbs streaming.', 'success', 'play_arrow');
        setCurrentStep(4);
      },
    },
    {
      step: 4,
      title: 'GPS Tracking Starts',
      desc: 'Dead-reckoning satellite link active at 48 km/h',
      actionText: 'VIEW GPS TRACK',
      action: () => {
        setActiveTab('route');
        showToast('Step 4: GPS tracking active at 27.1418° N, 88.3104° E', 'info', 'gps_fixed');
        setCurrentStep(5);
      },
    },
    {
      step: 5,
      title: 'Alert Appears: Route Risky',
      desc: 'Heavy rainfall + road blockage at KM 74',
      actionText: 'TRIGGER RISK ALERT',
      action: () => {
        simulateRoadBlock();
        showToast('Step 5: Route risk detected! High-risk condition on NH-108.', 'warning', 'warning');
        setCurrentStep(6);
      },
    },
    {
      step: 6,
      title: 'View Alternative Route',
      desc: 'Inspect East Pass bypass (+18m delay, Low-Risk)',
      actionText: 'VIEW ALTERNATIVE',
      action: () => {
        setActiveTab('route');
        showToast('Step 6: Viewing East Pass Corridor alternative.', 'info', 'alt_route');
        setCurrentStep(7);
      },
    },
    {
      step: 7,
      title: 'Accept Reroute',
      desc: 'Commit bypass to navigation HUD',
      actionText: 'ACCEPT REROUTE',
      action: () => {
        acceptReroute();
        showToast('Step 7: Reroute accepted. HUD updated to East Pass Corridor.', 'success', 'check_circle');
        setCurrentStep(8);
      },
    },
    {
      step: 8,
      title: 'Turn Off Internet (Offline)',
      desc: 'Simulate entering zero-signal mountain canyon',
      actionText: 'GO OFFLINE',
      action: () => {
        if (!isOffline) toggleOffline();
        showToast('Step 8: Network connection severed. Persistent SQLite cache active.', 'info', 'cloud_off');
        setCurrentStep(9);
      },
    },
    {
      step: 9,
      title: 'Report Incident: Flood',
      desc: 'Open field report for flood water hazard',
      actionText: 'OPEN REPORT',
      action: () => {
        setActiveTab('report');
        showToast('Step 9: Selecting Flood Water category on incident log.', 'info', 'tsunami');
        setCurrentStep(10);
      },
    },
    {
      step: 10,
      title: 'Take Photo & Save Report',
      desc: 'Capture evidence with authenticated EXIF data',
      actionText: 'SUBMIT REPORT (OFFLINE)',
      action: async () => {
        await submitReport({
          category: 'FLOOD_WATER',
          categoryLabel: 'FLOOD WATER',
          description: 'Culvert submerged by flash flood runoff. Water level 45cm over asphalt.',
          photoUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAeoX-auHZ7vu1v2JfNhbEITlSNm4h31BQSvPMPxmB88wktIqr7FQCbemkNlIbBhaMGPShCbU9Jys-kxbv57cgf_14rq5OkCYoSWiXa7AM0fji39-iZw3a-mZeMdF4BC9BT-W2-j3gXX_sAeci86str89pLeCJ1dU-3LJFXMkgYe8nEWascb3wZkKZo-7-AQpB2gfGikecMSyNmCbFoJYFRyzlLqmJqU0vc1WZ2Vngd_koor6-1EEHU-g',
          aiDetectionLabel: 'Culvert Flooding & Water Hazard',
          aiConfidence: 89,
        });
        showToast('Step 10: Photo attached with EXIF & queued in offline storage.', 'success', 'photo_camera');
        setCurrentStep(11);
      },
    },
    {
      step: 11,
      title: 'Turn Internet On',
      desc: 'Vehicle emerges into cellular coverage',
      actionText: 'RESTORE ONLINE',
      action: () => {
        if (isOffline) toggleOffline();
        showToast('Step 11: 4G Cellular link restored. Auto-sync trigger ready.', 'success', 'cell_tower');
        setCurrentStep(12);
      },
    },
    {
      step: 12,
      title: 'Sync Data to Web Dashboard',
      desc: 'Flush local SQLite queue and verify on Command HQ',
      actionText: 'SYNC & VIEW HQ',
      action: async () => {
        await triggerSync();
        setViewMode('dashboard');
        showToast('Step 12: Packets synced! Field incident now visible on Web HQ.', 'success', 'done_all');
        setCurrentStep(1);
      },
    },
  ];

  const currentStepObj = STEPS[currentStep - 1];

  return (
    <div className="fixed top-16 inset-x-0 z-30 select-none pointer-events-none">
      <div className="max-w-md mx-auto px-4 pointer-events-auto">
        {/* Collapsed Guide Pill */}
        <div className="bg-[#171c24]/95 backdrop-blur-md border border-[#252a33] rounded-b-xl shadow-lg overflow-hidden">
          <div className="px-3 py-1.5 flex items-center justify-between gap-2">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 cursor-pointer min-w-0"
            >
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
              <span className="text-[11px] font-mono text-white font-bold truncate">
                DEMO SCENARIO: STEP {currentStep}/12
              </span>
              <span className="text-[10px] font-mono text-[#4edea3] truncate hidden sm:inline">
                • {currentStepObj.title}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => currentStepObj.action()}
                className="px-2.5 py-1 rounded bg-[#10b981] hover:bg-[#4edea3] text-[#002113] text-[10px] font-mono font-extrabold uppercase shadow active:scale-95 transition-transform"
              >
                {currentStepObj.actionText} →
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-7 h-7 rounded bg-[#252a33] text-[#bbcabf] hover:text-white flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {isOpen ? 'expand_less' : 'expand_more'}
                </span>
              </button>
            </div>
          </div>

          {/* Expanded 12-Step Drawer */}
          {isOpen && (
            <div className="p-3 border-t border-[#252a33] bg-[#0f141c] flex flex-col gap-2 max-h-72 overflow-y-auto">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#bbcabf]">
                <span className="uppercase font-bold text-white">12-STEP SCENARIO ROADMAP</span>
                <span>Click any step to jump</span>
              </div>

              <div className="flex flex-col gap-1.5">
                {STEPS.map((s) => {
                  const isCurrent = s.step === currentStep;
                  return (
                    <div
                      key={s.step}
                      onClick={() => {
                        s.action();
                      }}
                      className={`p-2 rounded-lg border text-left cursor-pointer transition-all flex items-center justify-between gap-2 ${
                        isCurrent
                          ? 'bg-[#1b2028] border-[#10b981] shadow'
                          : 'bg-[#171c24] border-[#252a33] hover:border-[#3c4a42]'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${
                            isCurrent
                              ? 'bg-[#10b981] text-[#002113]'
                              : 'bg-[#252a33] text-[#bbcabf]'
                          }`}
                        >
                          {s.step}
                        </span>
                        <div className="flex flex-col min-w-0">
                          <span
                            className={`text-[11px] font-mono font-bold truncate ${
                              isCurrent ? 'text-[#4edea3]' : 'text-[#dee2ee]'
                            }`}
                          >
                            {s.title}
                          </span>
                          <span className="text-[10px] text-[#bbcabf] truncate">
                            {s.desc}
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono text-[#4edea3] shrink-0 font-bold">
                        RUN →
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
