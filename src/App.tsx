import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopHeader } from './components/TopHeader';
import { BottomNav } from './components/BottomNav';
import { RiskAlertModal } from './components/RiskAlertModal';
import { DemoBar } from './components/DemoBar';
import { LoginScreen } from './components/LoginScreen';
import { HomeScreen } from './components/HomeScreen';
import { RouteScreen } from './components/RouteScreen';
import { ReportScreen } from './components/ReportScreen';
import { ShipmentsScreen } from './components/ShipmentsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { WebDashboard } from './components/WebDashboard';
import { InstallPwaBanner } from './components/InstallPwaBanner';

const AppContent: React.FC = () => {
  const { activeTab, viewMode, toast, isLoggedIn } = useApp();

  const renderActiveScreen = () => {
    if (!isLoggedIn) {
      return <LoginScreen />;
    }

    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'route':
        return <RouteScreen />;
      case 'report':
        return <ReportScreen />;
      case 'shipments':
        return <ShipmentsScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-[#090e16] text-[#dee2ee] flex flex-col font-sans">
      {/* Install PWA Banner */}
      <InstallPwaBanner />

      {/* Global Toast Alert */}
      {toast && (
        <div className="fixed top-4 inset-x-4 z-50 max-w-sm mx-auto pointer-events-none animate-in fade-in slide-in-from-top-4 duration-300">
          <div
            className={`p-3 rounded-xl border shadow-2xl backdrop-blur-md flex items-center gap-2.5 ${
              toast.type === 'error'
                ? 'bg-[#93000a]/90 text-[#ffdad6] border-[#ffb4ab]'
                : toast.type === 'warning'
                ? 'bg-[#ec6a06]/90 text-[#ffdbca] border-[#ffb690]'
                : toast.type === 'success'
                ? 'bg-[#003824]/90 text-[#4edea3] border-[#10b981]'
                : 'bg-[#171c24]/90 text-white border-[#252a33]'
            }`}
          >
            {toast.icon && (
              <span className="material-symbols-outlined text-[20px] shrink-0">
                {toast.icon}
              </span>
            )}
            <span className="text-[12px] font-mono leading-tight font-medium">
              {toast.message}
            </span>
          </div>
        </div>
      )}

      {/* Persistent Demo Bar across all modes */}
      <DemoBar />

      {/* View Mode: Mobile Cab Only */}
      {viewMode === 'mobile' && (
        <div className="flex-1 flex flex-col relative w-full">
          <TopHeader />
          <RiskAlertModal />
          <main className="flex-1 flex flex-col pt-10">
            {renderActiveScreen()}
          </main>
          {isLoggedIn && <BottomNav />}
        </div>
      )}

      {/* View Mode: Web Command Dashboard Only */}
      {viewMode === 'dashboard' && (
        <div className="flex-1 flex flex-col">
          <TopHeader />
          <WebDashboard />
        </div>
      )}

      {/* View Mode: Split Screen (Mobile Cab + Web HQ) */}
      {viewMode === 'split' && (
        <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-45px)] overflow-hidden">
          {/* Left: Mobile Cab View in Device Frame */}
          <div className="w-full lg:w-[480px] shrink-0 h-full overflow-y-auto border-r border-[#1b2028] bg-[#090e16] flex flex-col relative">
            <TopHeader />
            <RiskAlertModal />
            <div className="flex-1 flex flex-col pt-10">
              {renderActiveScreen()}
            </div>
            {isLoggedIn && <BottomNav />}
          </div>

          {/* Right: Central Web Command HQ */}
          <div className="flex-1 h-full overflow-y-auto flex flex-col">
            <WebDashboard />
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
