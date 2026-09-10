import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const DemoBar: React.FC = () => {
  const {
    simulateRoadBlock,
    simulateFlood,
    simulateHeavyRain,
    isOffline,
    toggleOffline,
    resetSimulation,
    isDemoGuideOpen,
    setIsDemoGuideOpen,
    demoStep,
    setDemoStep,
    isTripActive,
    toggleTrip,
    acceptReroute,
    submitReport,
    triggerSync,
    setActiveTab,
    setViewMode,
    showToast,
    logout,
  } = useApp();

  const [isBarExpanded, setIsBarExpanded] = useState(false);

  const DEMO_STEPS = [
    {
      step: 1,
      title: 'Driver Logs In',
      desc: 'Driver Arun Kumar authenticated (TRK-2045)',
      run: () => {
        setActiveTab('home');
        showToast('Step 1: Driver Arun Kumar logged in to TRK-2045', 'success', 'person');
        setDemoStep(2);
      },
    },
    {
      step: 2,
      title: 'Views Active Shipment',
      desc: 'Review 💊 Emergency Medicines (#MED-2045-RX) Priority: CRITICAL',
      run: () => {
        setActiveTab('home');
        showToast('Step 2: Viewing Active Shipment: 💊 Emergency Medicines (Critical)', 'info', 'inventory_2');
        setDemoStep(3);
      },
    },
    {
      step: 3,
      title: 'Starts Trip',
      desc: 'Driver taps [START TRIP] to engage GPS tracking',
      run: () => {
        setActiveTab('home');
        if (!isTripActive) toggleTrip();
        showToast('Step 3: Trip started. GPS becomes ACTIVE.', 'success', 'play_arrow');
        setDemoStep(4);
      },
    },
    {
      step: 4,
      title: 'GPS Tracking Active',
      desc: '📍 GPS ACTIVE at 48 km/h on NH-108 Corridor',
      run: () => {
        setActiveTab('route');
        showToast('Step 4: GPS Tracking Active at 27.1418° N, 88.3104° E', 'info', 'gps_fixed');
        setDemoStep(5);
      },
    },
    {
      step: 5,
      title: 'Simulate Road Block',
      desc: 'Alert Appears: 🚨 ROUTE BLOCKED (Landslide at KM 74)',
      run: () => {
        simulateRoadBlock();
        showToast('Step 5: Alert appears: 🚨 ROUTE BLOCKED', 'warning', 'warning');
        setDemoStep(6);
      },
    },
    {
      step: 6,
      title: 'See Safer Alternative',
      desc: 'Inspect East Pass Bypass (🟢 LOW RISK, 4h 28m)',
      run: () => {
        setActiveTab('route');
        showToast('Step 6: Safer route option displayed on route screen.', 'info', 'alt_route');
        setDemoStep(7);
      },
    },
    {
      step: 7,
      title: 'Accept Reroute',
      desc: 'Driver accepts safer route → ✓ ROUTE UPDATED',
      run: () => {
        acceptReroute();
        showToast('Step 7: Driver clicked ACCEPT SAFER ROUTE. Route updated.', 'success', 'check_circle');
        setDemoStep(8);
      },
    },
    {
      step: 8,
      title: 'Simulate Offline Mode',
      desc: 'Truck enters mountain pass with zero signal 📴',
      run: () => {
        if (!isOffline) toggleOffline();
        showToast('Step 8: OFFLINE MODE engaged. Local storage active.', 'info', 'cloud_off');
        setDemoStep(9);
      },
    },
    {
      step: 9,
      title: 'Report Incident: Flood / Block',
      desc: 'Tap REPORT → Select 🚧 ROAD BLOCKED or 🌊 FLOOD',
      run: () => {
        setActiveTab('report');
        showToast('Step 9: Report screen opened. Select road condition.', 'info', 'warning');
        setDemoStep(10);
      },
    },
    {
      step: 10,
      title: 'Capture Photo & Submit Offline',
      desc: 'Auto-captures GPS/time, saves locally → ✓ SAVED OFFLINE',
      run: async () => {
        await submitReport({
          category: 'ROAD_BLOCKED',
          categoryLabel: 'ROAD BLOCKED',
          description: 'Rockfall and mud slurry across both lanes at KM 74 bend.',
          photoUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAcRGyiNav-ABfXKfVB5Ynw5MZLHB4_zoUlj8l6inYrwURYEOTG64rYYGZT1BeMr4QL7Jb-eFHQdgEWoCJTDsd0EwtWg0cZD8qunO7Q7-kly99my8klhwJXK09dz7Q6aww6B1Vhm3UWHwJfj2mpCYakeBURzrY8BUyEmg7T0at7uxoKgXsZP6IUQ_Y2_cRaYhLpAkL1ma-v0wac4zlasV-gW1ZHKJ-zANgHXoGjPZTIB-Au1YLLFYOamw',
          aiDetectionLabel: 'Rockfall Hazard Detected',
          aiConfidence: 94,
        });
        showToast('Step 10: Report submitted! Status: ✓ SAVED OFFLINE', 'success', 'photo_camera');
        setDemoStep(11);
      },
    },
    {
      step: 11,
      title: 'Restore Internet (Online)',
      desc: 'Vehicle exits dead-zone. Cellular restored 🟢',
      run: () => {
        if (isOffline) toggleOffline();
        showToast('Step 11: Internet restored. App shows ONLINE.', 'success', 'cell_tower');
        setDemoStep(12);
      },
    },
    {
      step: 12,
      title: 'Sync to Web Dashboard',
      desc: 'App shows SYNCING... then ✓ SYNC COMPLETE',
      run: async () => {
        await triggerSync();
        setViewMode('dashboard');
        showToast('Step 12: SYNC COMPLETE! Verified on Web Command Dashboard.', 'success', 'done_all');
        setDemoStep(1);
      },
    },
  ];

  const currentStep = DEMO_STEPS[demoStep - 1] || DEMO_STEPS[0];

  return (
    <div className="w-full bg-[#171c24] border-b border-[#252a33] text-white select-none relative z-30">
      <div className="max-w-7xl mx-auto px-3 py-2 flex flex-col gap-2">
        {/* Top Control Strip */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {/* DEMO MODE Header & Toggle */}
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
            <span className="font-mono text-[12px] font-bold tracking-wider text-[#4edea3] uppercase">
              DEMO MODE
            </span>
            <span className="text-[11px] font-mono text-[#bbcabf] hidden sm:inline">
              | Step {demoStep}/12: {currentStep.title}
            </span>
          </div>

          {/* Prompt-mandated 5 simulation buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => {
                simulateRoadBlock();
                showToast('Triggered: Road Block Simulated', 'warning', 'barrier');
              }}
              className="px-2.5 py-1 rounded bg-[#252a33] hover:bg-[#323945] text-[#ffb4ab] text-[11px] font-mono font-bold border border-[#442b2d] active:scale-95 transition-all"
              title="Simulate Road Block"
            >
              Simulate Road Block
            </button>

            <button
              onClick={() => {
                simulateFlood();
                showToast('Triggered: Flood Simulated', 'warning', 'tsunami');
              }}
              className="px-2.5 py-1 rounded bg-[#252a33] hover:bg-[#323945] text-[#70d2ff] text-[11px] font-mono font-bold border border-[#1b3d54] active:scale-95 transition-all"
              title="Simulate Flood"
            >
              Simulate Flood
            </button>

            <button
              onClick={() => {
                simulateHeavyRain();
                showToast('Triggered: Heavy Rain Simulated', 'warning', 'rainy');
              }}
              className="px-2.5 py-1 rounded bg-[#252a33] hover:bg-[#323945] text-[#ffb95f] text-[11px] font-mono font-bold border border-[#42311c] active:scale-95 transition-all"
              title="Simulate Heavy Rain"
            >
              Simulate Heavy Rain
            </button>

            <button
              onClick={() => {
                toggleOffline();
                showToast(
                  isOffline ? 'Internet Connected (ONLINE)' : 'Internet Disconnected (OFFLINE)',
                  isOffline ? 'success' : 'info',
                  isOffline ? 'cell_tower' : 'cloud_off'
                );
              }}
              className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold border active:scale-95 transition-all ${
                isOffline
                  ? 'bg-[#ec6a06] text-[#2c0e00] border-[#ec6a06]'
                  : 'bg-[#252a33] text-[#bbcabf] border-[#303844] hover:text-white'
              }`}
              title="Simulate Offline / Online toggle"
            >
              {isOffline ? 'Simulate Online' : 'Simulate Offline'}
            </button>

            <button
              onClick={resetSimulation}
              className="px-2.5 py-1 rounded bg-[#090e16] hover:bg-[#1b2028] text-[#bbcabf] hover:text-white text-[11px] font-mono border border-[#252a33] active:scale-95 transition-all"
              title="Reset Simulation to Initial State"
            >
              Reset
            </button>

            {/* Run Next Scenario Step Button */}
            <button
              onClick={() => currentStep.run()}
              className="px-3 py-1 rounded bg-[#10b981] hover:bg-[#4edea3] text-[#002113] text-[11px] font-mono font-extrabold uppercase shadow active:scale-95 transition-transform flex items-center gap-1"
            >
              <span>NEXT STEP ({demoStep})</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>

            <button
              onClick={() => setIsBarExpanded(!isBarExpanded)}
              className="w-7 h-7 rounded bg-[#252a33] hover:bg-[#303844] text-[#bbcabf] hover:text-white flex items-center justify-center text-[11px]"
              title="Toggle 12-Step Walkthrough"
            >
              <span className="material-symbols-outlined text-[16px]">
                {isBarExpanded ? 'expand_less' : 'format_list_numbered'}
              </span>
            </button>
          </div>
        </div>

        {/* Expandable 12-step script preview */}
        {isBarExpanded && (
          <div className="bg-[#090e16] p-3 rounded-xl border border-[#252a33] flex flex-col gap-2 max-h-56 overflow-y-auto">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#bbcabf]">
              <span className="uppercase font-bold text-white">COMPLETE END-TO-END DEMO SCENARIO</span>
              <span>Click any step to execute</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5">
              {DEMO_STEPS.map((s) => {
                const isCurrent = s.step === demoStep;
                return (
                  <button
                    key={s.step}
                    onClick={() => s.run()}
                    className={`p-2 rounded-lg text-left border flex items-center justify-between gap-2 transition-all ${
                      isCurrent
                        ? 'bg-[#1b2028] border-[#10b981] text-white'
                        : 'bg-[#171c24] border-[#252a33] text-[#bbcabf] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${
                          isCurrent ? 'bg-[#10b981] text-[#002113]' : 'bg-[#252a33] text-[#bbcabf]'
                        }`}
                      >
                        {s.step}
                      </span>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[11px] font-mono font-bold truncate">
                          {s.title}
                        </span>
                        <span className="text-[9px] text-[#bbcabf] truncate">
                          {s.desc}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#4edea3] shrink-0 font-bold">
                      RUN
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
