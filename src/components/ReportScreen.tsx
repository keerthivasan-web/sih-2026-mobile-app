import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IncidentCategory } from '../types';
import { CameraModal } from './CameraModal';

interface HazardOption {
  id: IncidentCategory;
  emoji: string;
  titleKey: keyof typeof import('../services/i18n').translations['en'];
  defaultDesc: string;
  defaultPhoto: string;
}

const HAZARD_OPTIONS: HazardOption[] = [
  {
    id: 'ROAD_BLOCKED',
    emoji: '🚧',
    titleKey: 'roadBlocked',
    defaultDesc: 'Rockfall and debris blocking both lanes.',
    defaultPhoto:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAcRGyiNav-ABfXKfVB5Ynw5MZLHB4_zoUlj8l6inYrwURYEOTG64rYYGZT1BeMr4QL7Jb-eFHQdgEWoCJTDsd0EwtWg0cZD8qunO7Q7-kly99my8klhwJXK09dz7Q6aww6B1Vhm3UWHwJfj2mpCYakeBURzrY8BUyEmg7T0at7uxoKgXsZP6IUQ_Y2_cRaYhLpAkL1ma-v0wac4zlasV-gW1ZHKJ-zANgHXoGjPZTIB-Au1YLLFYOamw',
  },
  {
    id: 'FLOOD_WATER',
    emoji: '🌧',
    titleKey: 'flood',
    defaultDesc: 'Culvert submerged by runoff.',
    defaultPhoto:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAeoX-auHZ7vu1v2JfNhbEITlSNm4h31BQSvPMPxmB88wktIqr7FQCbemkNlIbBhaMGPShCbU9Jys-kxbv57cgf_14rq5OkCYoSWiXa7AM0fji39-iZw3a-mZeMdF4BC9BT-W2-j3gXX_sAeci86str89pLeCJ1dU-3LJFXMkgYe8nEWascb3wZkKZo-7-AQpB2gfGikecMSyNmCbFoJYFRyzlLqmJqU0vc1WZ2Vngd_koor6-1EEHU-g',
  },
  {
    id: 'LANDSLIDE',
    emoji: '⛰',
    titleKey: 'landslide',
    defaultDesc: 'Slope debris cascading onto highway.',
    defaultPhoto:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD-mOIg44pcTCA8CwyjR7dvwrrh2pT34C-L2GzMuvMXFqGnrx_oPIOqMHco4o7pkv3ry-5ABMFqatma37oA4Bs-YU0yJJ1_z-UEIQLdj_jVLU6_ErUz1mTzclcPlvubOsxqV-nqUKgPKtqU8xqtvd_vKozR5P4QfilV2UZpsPPlbtI2LAxmGHPsKvGl5YN4S23ULAzLKj61LUb5z27NSKm23AxkGvk0NJA7loBI77WK5Z77iBCAx0geZA',
  },
  {
    id: 'ROAD_DAMAGE',
    emoji: '🛣',
    titleKey: 'roadDamage',
    defaultDesc: 'Deep asphalt cracks and severe potholes.',
    defaultPhoto:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD-mOIg44pcTCA8CwyjR7dvwrrh2pT34C-L2GzMuvMXFqGnrx_oPIOqMHco4o7pkv3ry-5ABMFqatma37oA4Bs-YU0yJJ1_z-UEIQLdj_jVLU6_ErUz1mTzclcPlvubOsxqV-nqUKgPKtqU8xqtvd_vKozR5P4QfilV2UZpsPPlbtI2LAxmGHPsKvGl5YN4S23ULAzLKj61LUb5z27NSKm23AxkGvk0NJA7loBI77WK5Z77iBCAx0geZA',
  },
  {
    id: 'DOWNPOUR',
    emoji: '🌧',
    titleKey: 'heavyRain',
    defaultDesc: 'Torrential downpour with low visibility.',
    defaultPhoto:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAeoX-auHZ7vu1v2JfNhbEITlSNm4h31BQSvPMPxmB88wktIqr7FQCbemkNlIbBhaMGPShCbU9Jys-kxbv57cgf_14rq5OkCYoSWiXa7AM0fji39-iZw3a-mZeMdF4BC9BT-W2-j3gXX_sAeci86str89pLeCJ1dU-3LJFXMkgYe8nEWascb3wZkKZo-7-AQpB2gfGikecMSyNmCbFoJYFRyzlLqmJqU0vc1WZ2Vngd_koor6-1EEHU-g',
  },
  {
    id: 'BRIDGE_DAMAGE',
    emoji: '🌉',
    titleKey: 'bridgeDamage',
    defaultDesc: 'Structural fault or cracks on bridge.',
    defaultPhoto:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAcRGyiNav-ABfXKfVB5Ynw5MZLHB4_zoUlj8l6inYrwURYEOTG64rYYGZT1BeMr4QL7Jb-eFHQdgEWoCJTDsd0EwtWg0cZD8qunO7Q7-kly99my8klhwJXK09dz7Q6aww6B1Vhm3UWHwJfj2mpCYakeBURzrY8BUyEmg7T0at7uxoKgXsZP6IUQ_Y2_cRaYhLpAkL1ma-v0wac4zlasV-gW1ZHKJ-zANgHXoGjPZTIB-Au1YLLFYOamw',
  },
  {
    id: 'ACCIDENT',
    emoji: '🚑',
    titleKey: 'accident',
    defaultDesc: 'Vehicle collision blocking passage.',
    defaultPhoto:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAcRGyiNav-ABfXKfVB5Ynw5MZLHB4_zoUlj8l6inYrwURYEOTG64rYYGZT1BeMr4QL7Jb-eFHQdgEWoCJTDsd0EwtWg0cZD8qunO7Q7-kly99my8klhwJXK09dz7Q6aww6B1Vhm3UWHwJfj2mpCYakeBURzrY8BUyEmg7T0at7uxoKgXsZP6IUQ_Y2_cRaYhLpAkL1ma-v0wac4zlasV-gW1ZHKJ-zANgHXoGjPZTIB-Au1YLLFYOamw',
  },
  {
    id: 'OTHER',
    emoji: '⚠',
    titleKey: 'other',
    defaultDesc: 'General road hazard.',
    defaultPhoto:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD-mOIg44pcTCA8CwyjR7dvwrrh2pT34C-L2GzMuvMXFqGnrx_oPIOqMHco4o7pkv3ry-5ABMFqatma37oA4Bs-YU0yJJ1_z-UEIQLdj_jVLU6_ErUz1mTzclcPlvubOsxqV-nqUKgPKtqU8xqtvd_vKozR5P4QfilV2UZpsPPlbtI2LAxmGHPsKvGl5YN4S23ULAzLKj61LUb5z27NSKm23AxkGvk0NJA7loBI77WK5Z77iBCAx0geZA',
  },
];

export const ReportScreen: React.FC = () => {
  const {
    currentGps,
    isOffline,
    submitReport,
    setActiveTab,
    t,
  } = useApp();

  const [selectedHazard, setSelectedHazard] = useState<HazardOption | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<{ offline: boolean; title: string } | null>(null);

  const handleSelectHazard = (hazard: HazardOption) => {
    setSelectedHazard(hazard);
    setPhotoUrl(hazard.defaultPhoto);
    setDescription('');
    setSubmitSuccess(null);
  };

  const handleBackToCategories = () => {
    setSelectedHazard(null);
    setSubmitSuccess(null);
  };

  const handleSubmit = async () => {
    if (!selectedHazard) return;
    setIsSubmitting(true);
    try {
      const titleStr = (t[selectedHazard.titleKey] as string) || selectedHazard.id;
      await submitReport({
        category: selectedHazard.id,
        categoryLabel: titleStr,
        description: description || selectedHazard.defaultDesc,
        photoUrl: photoUrl || selectedHazard.defaultPhoto,
      });

      setSubmitSuccess({
        offline: isOffline,
        title: titleStr,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 py-4 gap-4 pb-28 select-none font-sans">
      {/* Offline Banner */}
      {isOffline && (
        <div className="bg-amber-50 text-amber-900 p-3.5 rounded-2xl border border-amber-300 shadow-xs flex items-start gap-2.5 animate-in fade-in duration-200">
          <span className="text-xl shrink-0">🔴 {t.offlineMode}</span>
          <div className="flex flex-col">
            <span className="font-extrabold text-xs uppercase tracking-wider font-mono text-amber-950">
              {t.offlineMode}
            </span>
            <span className="text-xs font-semibold text-amber-800 leading-snug mt-0.5">
              "{t.offlineBannerSub}"
            </span>
          </div>
        </div>
      )}

      {/* Submission Feedback View */}
      {submitSuccess ? (
        <div className="bg-white p-6 rounded-3xl border border-indigo-100 shadow-xl flex flex-col items-center text-center gap-4 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700">
            <span className="material-symbols-outlined text-[36px]">check_circle</span>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-black text-indigo-950 uppercase tracking-tight font-sans">
              {submitSuccess.offline ? t.savedOffline : t.syncComplete}
            </h2>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full uppercase mt-1">
              {submitSuccess.offline ? 'PENDING SYNC' : t.autoSuggestedRoute}
            </span>
          </div>

          <p className="text-xs font-semibold text-slate-600">
            {submitSuccess.offline
              ? t.savedOfflineSub
              : 'Report submitted successfully. Safe route auto-suggested!'}
          </p>

          <div className="w-full flex flex-col gap-2 pt-2">
            <button
              onClick={() => setActiveTab('route')}
              className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-indigo-600/30 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">alt_route</span>
              <span>{t.acceptSaferRoute}</span>
            </button>

            <button
              onClick={handleBackToCategories}
              className="w-full h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase"
            >
              REPORT ANOTHER PROBLEM
            </button>
          </div>
        </div>
      ) : !selectedHazard ? (
        /* STAGE 1: REPORT ROAD CONDITION */
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-indigo-950 tracking-tight font-sans">
              {t.reportTitle}
            </h1>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              Select what is blocking or slowing the road
            </p>
          </div>

          {/* 8 Large Touch Buttons Grid */}
          <div className="grid grid-cols-2 gap-3">
            {HAZARD_OPTIONS.map((h) => (
              <button
                key={h.id}
                onClick={() => handleSelectHazard(h)}
                className="h-24 p-3 bg-white hover:bg-indigo-50/50 border border-indigo-50 hover:border-indigo-500 rounded-3xl flex flex-col items-center justify-center gap-1.5 text-center active:scale-95 transition-all cursor-pointer shadow-sm group"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">
                  {h.emoji}
                </span>
                <span className="font-extrabold text-xs text-slate-900 leading-tight">
                  {t[h.titleKey] as string}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* STAGE 2: PHOTO REPORT VIEW */
        <div className="flex flex-col gap-4 bg-white p-5 rounded-3xl border border-indigo-50 shadow-md">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <button
              onClick={handleBackToCategories}
              className="text-xs font-extrabold text-indigo-600 hover:text-indigo-900 flex items-center gap-1"
            >
              <span>← CHANGE INCIDENT</span>
            </button>
            <span className="text-xs font-black text-slate-900 uppercase">
              {selectedHazard.emoji} {t[selectedHazard.titleKey] as string}
            </span>
          </div>

          {/* Photo Preview Container */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t.takePhoto}
            </span>

            <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
              {photoUrl ? (
                <>
                  <img
                    src={photoUrl}
                    alt="Hazard Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-black">
                    PHOTO ATTACHED ✓
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-1 text-slate-400">
                  <span className="material-symbols-outlined text-[48px]">photo_camera</span>
                  <span className="text-xs font-bold">No photo taken</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-1">
              <button
                onClick={() => setIsCameraOpen(true)}
                className="h-12 rounded-xl bg-indigo-900 hover:bg-indigo-950 text-white font-bold text-xs uppercase flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                <span>[ 📷 {t.takePhoto} ]</span>
              </button>

              {photoUrl && (
                <button
                  onClick={() => setIsCameraOpen(true)}
                  className="h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase flex items-center justify-center gap-1 border border-slate-300 cursor-pointer"
                >
                  <span>[{t.retakePhoto}]</span>
                </button>
              )}
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs font-medium text-slate-700 flex flex-col gap-1 font-sans">
            <div>Location: <strong className="text-slate-900 font-bold">{t.locationAuto}</strong></div>
            <div>Date: <strong className="text-slate-900 font-bold">{new Date().toLocaleDateString()}</strong></div>
            <div>Time: <strong className="text-slate-900 font-bold">{t.timeAuto} ({new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})</strong></div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-500 uppercase">
              Add a short note <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full bg-slate-50 text-slate-900 text-xs p-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-indigo-600 transition-colors resize-none font-sans"
              placeholder={t.descriptionOptional}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full h-15 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 active:scale-98 transition-all cursor-pointer disabled:opacity-50 mt-1"
          >
            <span>
              {isSubmitting ? 'SUBMITTING...' : t.submitReport}
            </span>
          </button>
        </div>
      )}

      {/* Camera Capture Modal */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onPhotoCaptured={(dataUrl) => {
          setPhotoUrl(dataUrl);
        }}
        metadata={{
          lat: currentGps.lat,
          lon: currentGps.lon,
          alt: currentGps.alt,
          driverId: 'ARUN-2045',
          vehicleId: 'TN 52 AB 4521',
          incidentId: 'INC-2026-0941',
        }}
      />
    </div>
  );
};
