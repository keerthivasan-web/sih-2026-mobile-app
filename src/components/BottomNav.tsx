import React from 'react';
import { useApp, NavTab } from '../context/AppContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, pendingCounts, activeAlert } = useApp();

  const navItems: { id: NavTab; label: string; icon: string; badge?: number | boolean }[] = [
    { id: 'home', label: 'HOME', icon: 'dashboard' },
    { id: 'route', label: 'ROUTE', icon: 'navigation', badge: !!activeAlert },
    { id: 'report', label: 'REPORT', icon: 'warning' },
    { id: 'shipments', label: 'SHIPMENTS', icon: 'inventory_2' },
    { id: 'profile', label: 'PROFILE', icon: 'settings_ethernet', badge: pendingCounts.pendingReports > 0 ? pendingCounts.pendingReports : undefined },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-[#090e16]/95 backdrop-blur-xl border-t border-[#1b2028] shadow-[0_-4px_24px_rgba(0,0,0,0.6)] select-none">
      <div className="grid grid-cols-5 items-center h-18 px-1 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center gap-1 min-h-[52px] py-1 transition-all relative ${
                isActive ? 'text-[#4edea3] font-bold scale-102' : 'text-[#bbcabf] hover:text-[#dee2ee]'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span className="material-symbols-outlined text-[26px]">
                  {item.icon}
                </span>

                {/* Badge indicator */}
                {item.badge && (
                  <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 rounded-full bg-[#ec6a06] text-[#dee2ee] text-[9px] font-mono font-bold flex items-center justify-center animate-pulse">
                    {typeof item.badge === 'number' ? item.badge : '!'}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider leading-none">
                {item.label}
              </span>
              {isActive && (
                <div className="absolute bottom-1 w-6 h-0.5 rounded-full bg-[#4edea3]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
