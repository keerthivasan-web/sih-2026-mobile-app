import React, { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const InstallPwaBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);

  useEffect(() => {
    // Check if running in standalone window mode
    const isStandaloneWindow =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;

    setIsStandalone(isStandaloneWindow);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('[PWA] User accepted install prompt');
        setDeferredPrompt(null);
      }
    } else {
      // Check if iOS browser
      const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      if (isIos) {
        setShowIosGuide(true);
      } else {
        alert('To install EXTRICATE locally on your device:\n\nChrome/Edge/Brave: Click the Install icon (📥) in your browser address bar.\nSafari (iOS): Tap "Share" -> "Add to Home Screen".');
      }
    }
  };

  if (isStandalone || dismissed) return null;

  return (
    <>
      {/* Top Notification Banner for Local App Installation */}
      <div className="bg-gradient-to-r from-[#003824] via-[#0d2a20] to-[#171c24] border-b border-[#10b981]/40 px-4 py-2.5 flex items-center justify-between gap-3 text-xs font-mono shadow-lg relative z-30">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded bg-[#10b981] text-[#003824] flex items-center justify-center shrink-0 font-bold shadow-md">
            <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-[#4edea3] uppercase tracking-wide truncate">
              Install EXTRICATE as Local Device App
            </span>
            <span className="text-[11px] text-[#bbcabf] truncate">
              Launch directly from home screen • Full offline capability & background telemetry
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleInstallClick}
            className="px-3 py-1.5 rounded bg-[#10b981] hover:bg-[#34d399] text-[#002113] font-bold uppercase tracking-wider transition-all flex items-center gap-1 shadow-md active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">install_mobile</span>
            <span>INSTALL NOW</span>
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded text-[#bbcabf] hover:text-white hover:bg-[#252a33]/50 transition-colors"
            title="Dismiss installation banner"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      </div>

      {/* iOS Installation Guide Modal */}
      {showIosGuide && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#171c24] border border-[#252a33] rounded-2xl max-w-sm w-full p-5 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#10b981]/20 text-[#4edea3] flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[28px]">ios_share</span>
            </div>
            <h3 className="font-sans font-bold text-lg text-white">Install on iOS (iPhone / iPad)</h3>
            <ol className="text-left text-xs text-[#bbcabf] space-y-2 font-mono bg-[#090e16] p-3.5 rounded-xl border border-[#252a33]">
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#10b981]">1.</span>
                <span>Tap the <strong className="text-white">Share</strong> button at the bottom of Safari.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#10b981]">2.</span>
                <span>Scroll down and select <strong className="text-white">"Add to Home Screen"</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#10b981]">3.</span>
                <span>Tap <strong className="text-white">Add</strong> in the top right corner.</span>
              </li>
            </ol>
            <button
              onClick={() => setShowIosGuide(false)}
              className="w-full py-2 rounded-xl bg-[#10b981] text-[#002113] font-bold text-xs font-mono uppercase tracking-wider"
            >
              GOT IT
            </button>
          </div>
        </div>
      )}
    </>
  );
};
