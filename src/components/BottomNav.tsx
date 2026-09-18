import React from 'react';
import { useApp, NavTab } from '../context/AppContext';
import { TranslationStrings } from '../services/i18n';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, pendingCounts, activeAlert, t } = useApp();

  const navItems: { id: NavTab; labelKey: keyof TranslationStrings; icon: string; badge?: number | boolean }[] = [
    { id: 'home', labelKey: 'tabHome', icon: 'dashboard' },
    { id: 'route', labelKey: 'tabRoute', icon: 'navigation', badge: !!activeAlert },
    { id: 'report', labelKey: 'tabReport', icon: 'confirmation_number' },
    { id: 'profile', labelKey: 'tabProfile', icon: 'person', badge: pendingCounts.pendingReports > 0 ? pendingCounts.pendingReports : undefined },
  ];

  return (
    <nav className="fixed bottom-3 inset-x-3 z-50 max-w-md mx-auto select-none pointer-events-none">
      <div className="bg-white/95 backdrop-blur-md rounded-[2.2rem] border border-indigo-50 shadow-[0_12px_32px_rgba(99,102,241,0.15)] px-3 py-2 flex items-center justify-around pointer-events-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const labelText = t[item.labelKey] as string;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative flex flex-col items-center justify-center transition-all duration-200 cursor-pointer p-1"
            >
              {isActive ? (
                /* Active Tab: Solid Purple Rounded Badge with Label */
                <div className="flex flex-col items-center justify-center px-4 py-1.5 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105 transition-all">
                  <span className="material-symbols-outlined text-[20px]">
                    {item.icon}
                  </span>
                  <span className="text-[10px] font-bold tracking-tight uppercase leading-tight font-sans">
                    {labelText}
                  </span>
                </div>
              ) : (
                /* Inactive Tab: Soft Icon + Label */
                <div className="flex flex-col items-center justify-center text-indigo-300 hover:text-indigo-600 transition-colors py-1">
                  <span className="material-symbols-outlined text-[22px]">
                    {item.icon}
                  </span>
                  <span className="text-[10px] font-semibold tracking-tight uppercase leading-tight font-sans">
                    {labelText}
                  </span>
                </div>
              )}

              {/* Notification Badge Dot */}
              {item.badge && (
                <span className="absolute top-0 right-1 min-w-4 h-4 px-1 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center animate-pulse border-2 border-white">
                  {typeof item.badge === 'number' ? item.badge : '!'}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
