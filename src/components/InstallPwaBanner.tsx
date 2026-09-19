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
      {/* Top Bar with ONLY Purple Install Button */}
      <div className="bg-slate-900/90 border-b border-purple-900/40 px-4 py-1.5 flex items-center justify-end gap-2 text-xs font-mono relative z-30">
        <button
          onClick={handleInstallClick}
          className="px-3.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md active:scale-95 text-xs cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">install_mobile</span>
          <span>INSTALL NOW</span>
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          title="Dismiss install button"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      {/* iOS Installation Guide Modal */}
      {showIosGuide && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#171c24] border border-purple-900/50 rounded-2xl max-w-sm w-full p-5 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[28px]">ios_share</span>
            </div>
            <h3 className="font-sans font-bold text-lg text-white">Install on iOS (iPhone / iPad)</h3>
            <ol className="text-left text-xs text-[#bbcabf] space-y-2 font-mono bg-[#090e16] p-3.5 rounded-xl border border-[#252a33]">
              <li className="flex items-start gap-2">
                <span className="font-bold text-purple-400">1.</span>
                <span>Tap the <strong className="text-white">Share</strong> button at the bottom of Safari.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-purple-400">2.</span>
                <span>Scroll down and select <strong className="text-white">"Add to Home Screen"</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-purple-400">3.</span>
                <span>Tap <strong className="text-white">Add</strong> in the top right corner.</span>
              </li>
            </ol>
            <button
              onClick={() => setShowIosGuide(false)}
              className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs font-mono uppercase tracking-wider transition-colors"
            >
              GOT IT
            </button>
          </div>
        </div>
      )}
    </>
  );
};
