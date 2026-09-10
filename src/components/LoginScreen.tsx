import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const LoginScreen: React.FC = () => {
  const { login, t } = useApp();
  const [driverId, setDriverId] = useState('ARUN-2045');
  const [password, setPassword] = useState('driver@123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(driverId);
  };

  return (
    <div className="min-h-screen bg-[#090e16] text-[#dee2ee] flex flex-col items-center justify-center p-6 select-none font-sans relative overflow-hidden">
      {/* Background glow and subtle tactical grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1b2028_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#10b981]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#ec6a06]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-sm flex flex-col items-center gap-6 relative z-10">
        {/* EXTRICATE Logo & Title */}
        <div className="flex flex-col items-center text-center gap-2.5">
          <div className="w-20 h-20 rounded-2xl bg-[#10b981] flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.35)] border-2 border-[#4edea3]/40">
            <span className="font-extrabold text-[#002113] text-3xl tracking-tighter">EX</span>
          </div>

          <div className="flex flex-col items-center mt-1">
            <h1 className="text-3xl font-extrabold tracking-wider text-white uppercase font-sans">
              EXTRICATE
            </h1>
            <span className="text-[12px] font-mono tracking-[0.25em] text-[#4edea3] uppercase font-bold mt-0.5">
              DRIVER & FIELD APP
            </span>
          </div>
        </div>

        {/* Login Form Box */}
        <form
          onSubmit={handleSubmit}
          className="w-full bg-[#171c24] p-6 rounded-2xl border border-[#252a33] shadow-2xl flex flex-col gap-4.5"
        >
          {/* Driver ID */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-mono text-[#bbcabf] uppercase tracking-wider font-bold">
              {t.driverId}
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-[#4edea3] text-[20px]">
                badge
              </span>
              <input
                type="text"
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
                required
                className="w-full h-13 bg-[#090e16] text-white font-mono text-base pl-10 pr-3 rounded-xl border border-[#252a33] focus:outline-none focus:border-[#10b981] transition-colors"
                placeholder="e.g. ARUN-2045"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-mono text-[#bbcabf] uppercase tracking-wider font-bold">
              {t.password}
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-[#ffb95f] text-[20px]">
                lock
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-13 bg-[#090e16] text-white font-mono text-base pl-10 pr-3 rounded-xl border border-[#252a33] focus:outline-none focus:border-[#10b981] transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Large Login Button */}
          <button
            type="submit"
            className="w-full h-15 mt-2 bg-[#10b981] hover:bg-[#4edea3] text-[#002113] font-sans font-extrabold text-lg uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">login</span>
            <span>{t.loginButton}</span>
          </button>

          {/* Quick Demo Fill Helper */}
          <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-[#bbcabf]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#10b981]" />
              TRK-2045 Assigned
            </span>
            <button
              type="button"
              onClick={() => {
                setDriverId('ARUN-2045');
                setPassword('driver@123');
              }}
              className="text-[#4edea3] hover:underline"
            >
              Demo Auto-Fill
            </button>
          </div>
        </form>

        {/* Below Text */}
        <div className="flex items-center gap-2 text-[#bbcabf] text-[13px] font-mono tracking-wide">
          <span className="material-symbols-outlined text-[18px] text-[#4edea3]">
            shield
          </span>
          <span>{t.secureDriverAccess}</span>
        </div>
      </div>
    </div>
  );
};
