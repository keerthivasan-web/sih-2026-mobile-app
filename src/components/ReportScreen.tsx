import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IncidentCategory } from '../types';
import { CameraModal } from './CameraModal';

interface HazardOption {
  id: IncidentCategory;
  emoji: string;
  title: string;
  defaultDesc: string;
  defaultPhoto: string;
}

const HAZARD_OPTIONS: HazardOption[] = [
  {
    id: 'ROAD_BLOCKED',
    emoji: '🚧',
    title: 'ROAD BLOCKED',
    defaultDesc: 'Rockfall and debris blocking both lanes near KM 74 bend.',
    defaultPhoto:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAcRGyiNav-ABfXKfVB5Ynw5MZLHB4_zoUlj8l6inYrwURYEOTG64rYYGZT1BeMr4QL7Jb-eFHQdgEWoCJTDsd0EwtWg0cZD8qunO7Q7-kly99my8klhwJXK09dz7Q6aww6B1Vhm3UWHwJfj2mpCYakeBURzrY8BUyEmg7T0at7uxoKgXsZP6IUQ_Y2_cRaYhLpAkL1ma-v0wac4zlasV-gW1ZHKJ-zANgHXoGjPZTIB-Au1YLLFYOamw',
  },
  {
    id: 'FLOOD_WATER',
    emoji: '🌊',
    title: 'FLOOD',
    defaultDesc: 'Culvert submerged by flash flood runoff. Water depth 45cm over asphalt.',
    defaultPhoto:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAeoX-auHZ7vu1v2JfNhbEITlSNm4h31BQSvPMPxmB88wktIqr7FQCbemkNlIbBhaMGPShCbU9Jys-kxbv57cgf_14rq5OkCYoSWiXa7AM0fji39-iZw3a-mZeMdF4BC9BT-W2-j3gXX_sAeci86str89pLeCJ1dU-3LJFXMkgYe8nEWascb3wZkKZo-7-AQpB2gfGikecMSyNmCbFoJYFRyzlLqmJqU0vc1WZ2Vngd_koor6-1EEHU-g',
  },
  {
    id: 'LANDSLIDE',
    emoji: '⛰',
    title: 'LANDSLIDE',
    defaultDesc: 'Mudslide and loose boulders cascading from upper slope onto highway.',
    defaultPhoto:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD-mOIg44pcTCA8CwyjR7dvwrrh2pT34C-L2GzMuvMXFqGnrx_oPIOqMHco4o7pkv3ry-5ABMFqatma37oA4Bs-YU0yJJ1_z-UEIQLdj_jVLU6_ErUz1mTzclcPlvubOsxqV-nqUKgPKtqU8xqtvd_vKozR5P4QfilV2UZpsPPlbtI2LAxmGHPsKvGl5YN4S23ULAzLKj61LUb5z27NSKm23AxkGvk0NJA7loBI77WK5Z77iBCAx0geZA',
  },
  {
    id: 'ROAD_DAMAGE',
    emoji: '🛣',
    title: 'ROAD DAMAGE',
    defaultDesc: 'Deep fissures, asphalt collapse, and wheel-breaking potholes.',
    defaultPhoto:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD-mOIg44pcTCA8CwyjR7dvwrrh2pT34C-L2GzMuvMXFqGnrx_oPIOqMHco4o7pkv3ry-5ABMFqatma37oA4Bs-YU0yJJ1_z-UEIQLdj_jVLU6_ErUz1mTzclcPlvubOsxqV-nqUKgPKtqU8xqtvd_vKozR5P4QfilV2UZpsPPlbtI2LAxmGHPsKvGl5YN4S23ULAzLKj61LUb5z27NSKm23AxkGvk0NJA7loBI77WK5Z77iBCAx0geZA',
  },
  {
    id: 'DOWNPOUR',
    emoji: '🌧',
    title: 'HEAVY RAIN',
    defaultDesc: 'Torrential downpour, zero visibility (< 20m), high hydroplaning risk.',
    defaultPhoto:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAeoX-auHZ7vu1v2JfNhbEITlSNm4h31BQSvPMPxmB88wktIqr7FQCbemkNlIbBhaMGPShCbU9Jys-kxbv57cgf_14rq5OkCYoSWiXa7AM0fji39-iZw3a-mZeMdF4BC9BT-W2-j3gXX_sAeci86str89pLeCJ1dU-3LJFXMkgYe8nEWascb3wZkKZo-7-AQpB2gfGikecMSyNmCbFoJYFRyzlLqmJqU0vc1WZ2Vngd_koor6-1EEHU-g',
  },
  {
    id: 'BRIDGE_DAMAGE',
    emoji: '🌉',
    title: 'BRIDGE DAMAGE',
    defaultDesc: 'Crack in bridge pier. Structural vibration under heavy load.',
    defaultPhoto:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAcRGyiNav-ABfXKfVB5Ynw5MZLHB4_zoUlj8l6inYrwURYEOTG64rYYGZT1BeMr4QL7Jb-eFHQdgEWoCJTDsd0EwtWg0cZD8qunO7Q7-kly99my8klhwJXK09dz7Q6aww6B1Vhm3UWHwJfj2mpCYakeBURzrY8BUyEmg7T0at7uxoKgXsZP6IUQ_Y2_cRaYhLpAkL1ma-v0wac4zlasV-gW1ZHKJ-zANgHXoGjPZTIB-Au1YLLFYOamw',
  },
  {
    id: 'ACCIDENT',
    emoji: '🚨',
    title: 'ACCIDENT',
    defaultDesc: 'Multi-vehicle collision blocking eastbound traffic lane.',
    defaultPhoto:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAcRGyiNav-ABfXKfVB5Ynw5MZLHB4_zoUlj8l6inYrwURYEOTG64rYYGZT1BeMr4QL7Jb-eFHQdgEWoCJTDsd0EwtWg0cZD8qunO7Q7-kly99my8klhwJXK09dz7Q6aww6B1Vhm3UWHwJfj2mpCYakeBURzrY8BUyEmg7T0at7uxoKgXsZP6IUQ_Y2_cRaYhLpAkL1ma-v0wac4zlasV-gW1ZHKJ-zANgHXoGjPZTIB-Au1YLLFYOamw',
  },
  {
    id: 'OTHER',
    emoji: '⚠',
    title: 'OTHER',
    defaultDesc: 'Obstruction or safety concern noted by driver.',
    defaultPhoto:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD-mOIg44pcTCA8CwyjR7dvwrrh2pT34C-L2GzMuvMXFqGnrx_oPIOqMHco4o7pkv3ry-5ABMFqatma37oA4Bs-YU0yJJ1_z-UEIQLdj_jVLU6_ErUz1mTzclcPlvubOsxqV-nqUKgPKtqU8xqtvd_vKozR5P4QfilV2UZpsPPlbtI2LAxmGHPsKvGl5YN4S23ULAzLKj61LUb5z27NSKm23AxkGvk0NJA7loBI77WK5Z77iBCAx0geZA',
  },
];

export const ReportScreen: React.FC = () => {
  const {
    driver,
    currentGps,
    isOffline,
    submitReport,
    pendingCounts,
    showToast,
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
    setDescription(hazard.defaultDesc);
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
      await submitReport({
        category: selectedHazard.id,
        categoryLabel: selectedHazard.title,
        description: description || selectedHazard.defaultDesc,
        photoUrl: photoUrl || selectedHazard.defaultPhoto,
        aiDetectionLabel: `${selectedHazard.title} Hazard Detected`,
        aiConfidence: 91,
      });

      setSubmitSuccess({
        offline: isOffline,
        title: selectedHazard.title,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 py-2 gap-3 pb-28 select-none font-sans">
      {/* Top Banner if Offline */}
      {isOffline && (
        <div className="bg-[#ec6a06] text-[#250b00] p-3 rounded-xl border border-[#ff8c42] shadow-md flex items-start gap-2.5 animate-in fade-in duration-200">
          <span className="text-xl shrink-0 mt-0.5">📴</span>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm uppercase tracking-wider font-mono">
              {t.offlineMode}
            </span>
            <span className="text-[12px] font-medium leading-tight text-[#341100]">
              "{t.offlineBannerSub}"
            </span>
          </div>
        </div>
      )}

      {/* Submission Feedback View (✓ SAVED OFFLINE / ✓ REPORT SENT) */}
      {submitSuccess ? (
        <div className="bg-[#1b2028] p-6 rounded-2xl border-2 border-[#10b981] shadow-2xl flex flex-col items-center text-center gap-4 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-[#10b981]/20 border-2 border-[#4edea3] flex items-center justify-center text-[#4edea3]">
            <span className="material-symbols-outlined text-[36px]">check_circle</span>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-extrabold text-white font-sans uppercase tracking-wide">
              {submitSuccess.offline ? `✓ ${t.savedOffline}` : '✓ REPORT TRANSMITTED'}
            </h2>
            <p className="text-[14px] text-[#bbcabf] font-medium mt-1">
              "{submitSuccess.offline ? t.savedOfflineSub : 'Your report has reached the Command HQ Web Dashboard.'}"
            </p>
          </div>

          <div className="w-full p-3 rounded-xl bg-[#090e16] border border-[#252a33] text-[12px] font-mono text-[#bbcabf] flex flex-col gap-1 text-left">
            <div className="flex justify-between">
              <span>HAZARD:</span>
              <span className="text-white font-bold">{submitSuccess.title}</span>
            </div>
            <div className="flex justify-between">
              <span>LOCATION:</span>
              <span className="text-[#4edea3]">27.1418° N, 88.3104° E</span>
            </div>
            <div className="flex justify-between">
              <span>STORAGE:</span>
              <span className="text-[#ffb95f]">Drift SQLite Encrypted Cache</span>
            </div>
          </div>

          <button
            onClick={handleBackToCategories}
            className="w-full h-14 rounded-xl bg-[#10b981] hover:bg-[#4edea3] text-[#002113] font-sans font-extrabold text-base uppercase tracking-wider shadow-lg active:scale-98 transition-all"
          >
            REPORT ANOTHER HAZARD
          </button>
        </div>
      ) : !selectedHazard ? (
        /* STAGE 1: REPORT ROAD CONDITION - Large buttons */
        <div className="flex flex-col gap-3">
          {/* Title Header */}
          <div className="flex flex-col p-3 bg-[#1b2028] rounded-xl border border-[#252a33]">
            <span className="text-[11px] font-mono text-[#bbcabf] uppercase tracking-widest font-bold">
              FIELD INCIDENT DISPATCH
            </span>
            <h1 className="text-xl font-extrabold text-white uppercase tracking-wide font-sans mt-0.5">
              {t.reportTitle}
            </h1>
            <span className="text-[11px] font-mono text-[#4edea3] mt-1">
              GPS & Time automatically recorded with zero typing
            </span>
          </div>

          {/* Large Hazard Selection Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {HAZARD_OPTIONS.map((h) => (
              <button
                key={h.id}
                onClick={() => handleSelectHazard(h)}
                className="h-20 p-3 bg-[#171c24] hover:bg-[#252a33] border-2 border-[#252a33] hover:border-[#10b981] rounded-2xl flex items-center gap-3.5 text-left active:scale-[0.98] transition-all cursor-pointer shadow-md group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#090e16] flex items-center justify-center text-2xl border border-[#252a33] group-hover:scale-105 transition-transform shrink-0">
                  {h.emoji}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-sans font-extrabold text-base text-white uppercase tracking-wider truncate">
                    {h.title}
                  </span>
                  <span className="text-[11px] font-mono text-[#bbcabf] truncate">
                    Tap to file report →
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Pending Queue Summary */}
          {pendingCounts.pendingReports > 0 && (
            <div className="bg-[#090e16] p-3 rounded-xl border border-[#252a33] flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#bbcabf]">OFFLINE OUTBOX QUEUE:</span>
              <span className="text-[#ffb95f] font-bold">
                {pendingCounts.pendingReports} Reports ({pendingCounts.totalPayloadMb} MB)
              </span>
            </div>
          )}
        </div>
      ) : (
        /* STAGE 2: PHOTO REPORT VIEW */
        <div className="flex flex-col gap-3">
          {/* Header with Back button and Hazard Title */}
          <div className="flex items-center justify-between bg-[#1b2028] p-3 rounded-xl border border-[#252a33]">
            <button
              onClick={handleBackToCategories}
              className="flex items-center gap-1 text-[#4edea3] hover:text-white font-mono text-[12px] font-bold"
            >
              <span>←</span>
              <span>CHANGE HAZARD</span>
            </button>
            <span className="text-[11px] font-mono text-[#bbcabf] uppercase font-bold">
              {isOffline ? 'OFFLINE READY' : 'ONLINE LINK'}
            </span>
          </div>

          {/* Title: [HAZARD] REPORT */}
          <div className="flex items-center gap-2.5 p-3.5 bg-[#171c24] rounded-xl border border-[#252a33]">
            <span className="text-3xl">{selectedHazard.emoji}</span>
            <div className="flex flex-col">
              <h2 className="text-xl font-extrabold text-white uppercase font-sans tracking-wide">
                {selectedHazard.title} REPORT
              </h2>
              <span className="text-[11px] font-mono text-[#4edea3]">
                Immediate hazard dispatch protocol
              </span>
            </div>
          </div>

          {/* 📷 Add Photo / [TAKE PHOTO] */}
          <div className="flex flex-col gap-2 bg-[#1b2028] p-3.5 rounded-xl border border-[#252a33]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-white font-sans font-extrabold text-sm uppercase">
                <span className="text-lg">📷</span>
                <span>{t.addPhoto}</span>
              </div>
              <span className="text-[10px] font-mono text-[#4edea3] bg-[#090e16] px-2 py-0.5 rounded border border-[#252a33] font-bold">
                EXIF STAMPED
              </span>
            </div>

            {/* Photo Preview Container */}
            <div className="relative w-full h-44 rounded-xl overflow-hidden bg-[#090e16] border border-[#252a33]">
              {photoUrl ? (
                <>
                  <img
                    src={photoUrl}
                    alt="Hazard Evidence"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#090e16]/85 text-[10px] font-mono text-[#4edea3] font-bold">
                    EVIDENCE ATTACHED
                  </div>
                  <button
                    onClick={() => setIsCameraOpen(true)}
                    className="absolute bottom-2 right-2 px-3 py-1.5 rounded-lg bg-[#1b2028]/95 hover:bg-[#252a33] text-white text-[11px] font-mono uppercase font-bold border border-[#252a33] flex items-center gap-1.5 shadow"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#4edea3]">
                      replay
                    </span>
                    <span>RETAKE</span>
                  </button>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#bbcabf]">
                  <span className="material-symbols-outlined text-[40px] text-[#bbcabf]">
                    photo_camera
                  </span>
                  <span className="text-[12px] font-mono">No photo captured</span>
                </div>
              )}
            </div>

            {/* Large [TAKE PHOTO] button */}
            <button
              onClick={() => setIsCameraOpen(true)}
              className="w-full h-13 rounded-xl bg-[#252a33] hover:bg-[#303844] text-white font-mono text-[13px] font-bold uppercase flex items-center justify-center gap-2 border border-[#3c4a42] active:scale-98 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px] text-[#4edea3]">
                photo_camera
              </span>
              <span>{t.takePhoto}</span>
            </button>
          </div>

          {/* Automatic Location & Time Card */}
          <div className="flex flex-col gap-2.5 bg-[#171c24] p-3.5 rounded-xl border border-[#252a33] text-[13px] font-mono">
            {/* Location */}
            <div className="flex items-center justify-between">
              <span className="text-[#bbcabf] flex items-center gap-1">
                <span>📍</span>
                <span>Location:</span>
              </span>
              <span className="font-bold text-[#4edea3] text-right">
                {t.locationAuto}
              </span>
            </div>
            <div className="text-[11px] text-[#bbcabf] pl-5 -mt-1 font-mono">
              27.1418° N, 88.3104° E • NH-108 Corridor KM 74
            </div>

            {/* Time */}
            <div className="flex items-center justify-between border-t border-[#252a33] pt-2">
              <span className="text-[#bbcabf] flex items-center gap-1">
                <span>🕐</span>
                <span>Time:</span>
              </span>
              <span className="font-bold text-[#4edea3] text-right">
                {t.timeAuto}
              </span>
            </div>
            <div className="text-[11px] text-[#bbcabf] pl-5 -mt-1 font-mono">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Today
            </div>
          </div>

          {/* Description: Optional */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-mono text-[#bbcabf] uppercase tracking-wider">
              Description: <span className="text-white font-normal">(Optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full bg-[#1b2028] text-white text-[13px] font-sans p-3 rounded-xl border border-[#252a33] focus:outline-none focus:border-[#10b981] transition-colors resize-none"
              placeholder={t.descriptionOptional}
            />
          </div>

          {/* Large [SUBMIT REPORT] button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full h-16 rounded-2xl bg-[#10b981] hover:bg-[#4edea3] text-[#002113] font-sans font-extrabold text-lg uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 mt-1"
          >
            <span className="material-symbols-outlined text-[28px]">
              {isOffline ? 'save' : 'send'}
            </span>
            <span>
              {isSubmitting
                ? 'SAVING...'
                : isOffline
                ? 'SAVE OFFLINE'
                : t.submitReport}
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
          showToast('PHOTO CAPTURED & EXIF STAMPED', 'success', 'photo_camera');
        }}
        metadata={{
          lat: currentGps.lat,
          lon: currentGps.lon,
          alt: currentGps.alt,
          driverId: driver.driverId,
          vehicleId: driver.vehicleId,
          incidentId: 'INC-2025-0941',
        }}
      />
    </div>
  );
};
