import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface RerouteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RerouteModal: React.FC<RerouteModalProps> = ({ isOpen, onClose }) => {
  const { routeMetrics, acceptReroute, t } = useApp();
  const [justUpdated, setJustUpdated] = useState(false);

  if (!isOpen) return null;

  const isRerouted = routeMetrics.activeRoute === 'ALTERNATIVE';

  const handleAccept = async () => {
    await acceptReroute();
    setJustUpdated(true);
    setTimeout(() => {
      setJustUpdated(false);
      onClose();
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#171c24] border-2 border-[#10b981] rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header Strip */}
        <div className="bg-[#1b2028] px-4 py-3 border-b border-[#252a33] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4edea3] text-[24px]">
              alt_route
            </span>
            <span className="font-sans font-extrabold text-base text-white uppercase tracking-wider">
              {t.yourRoute}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#090e16] text-[#bbcabf] hover:text-white flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 flex flex-col gap-4 text-[#dee2ee]">
          {/* Post-acceptance success card */}
          {justUpdated ? (
            <div className="p-6 bg-[#003824] border border-[#10b981] rounded-xl flex flex-col items-center text-center gap-3 animate-in zoom-in-95 duration-200">
              <span className="material-symbols-outlined text-[#4edea3] text-[48px]">
                check_circle
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-xl font-extrabold text-white font-sans uppercase">
                  ✓ {t.routeUpdated}
                </span>
                <p className="text-[14px] text-[#bbcabf]">
                  "{t.continueSaferRoute}"
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Side-by-Side Comparison Box */}
              <div className="grid grid-cols-2 gap-3">
                {/* CURRENT ROUTE */}
                <div className="bg-[#1b2028] p-3.5 rounded-xl border border-[#ec6a06]/50 flex flex-col gap-2">
                  <span className="text-[11px] font-mono text-[#bbcabf] uppercase tracking-wider">
                    {t.yourRoute}
                  </span>

                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-base">🔴</span>
                    <span className="text-[13px] font-mono font-extrabold text-[#ffb4ab]">
                      {t.highRisk}
                    </span>
                  </div>

                  <div className="flex flex-col mt-1">
                    <span className="text-xl font-extrabold text-white font-mono">
                      180 km
                    </span>
                    <span className="text-[13px] font-mono text-[#bbcabf]">
                      4h 10m
                    </span>
                  </div>
                </div>

                {/* SAFER ROUTE */}
                <div className="bg-[#1b2028] p-3.5 rounded-xl border-2 border-[#10b981] shadow-lg flex flex-col gap-2">
                  <span className="text-[11px] font-mono text-[#4edea3] uppercase tracking-wider font-bold">
                    {t.open}
                  </span>

                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-base">🟢</span>
                    <span className="text-[13px] font-mono font-extrabold text-[#4edea3]">
                      {t.open}
                    </span>
                  </div>

                  <div className="flex flex-col mt-1">
                    <span className="text-xl font-extrabold text-[#4edea3] font-mono">
                      195 km
                    </span>
                    <span className="text-[13px] font-mono text-white font-bold">
                      4h 28m
                    </span>
                  </div>
                </div>
              </div>

              {/* Message Box */}
              <div className="bg-[#090e16] p-3 rounded-xl border border-[#252a33] text-center">
                <p className="text-[14px] text-[#4edea3] font-medium font-sans">
                  {t.saferRouteMessage}
                </p>
              </div>

              {/* Large Accept Button */}
              <button
                onClick={handleAccept}
                className="w-full h-15 bg-[#10b981] hover:bg-[#4edea3] text-[#002113] font-sans font-extrabold text-base uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[24px]">alt_route</span>
                <span>{isRerouted ? 'UPDATE SAFER ROUTE' : t.acceptSaferRoute}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
