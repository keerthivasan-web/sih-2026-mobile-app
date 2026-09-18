import React, { useRef, useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoCaptured: (dataUrl: string) => void;
  metadata: {
    lat: number;
    lon: number;
    alt: number;
    driverId: string;
    vehicleId: string;
    incidentId: string;
  };
}

const TACTICAL_PRESETS = [
  {
    id: 'rockfall',
    labelKey: 'presetRockfall' as const,
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-mOIg44pcTCA8CwyjR7dvwrrh2pT34C-L2GzMuvMXFqGnrx_oPIOqMHco4o7pkv3ry-5ABMFqatma37oA4Bs-YU0yJJ1_z-UEIQLdj_jVLU6_ErUz1mTzclcPlvubOsxqV-nqUKgPKtqU8xqtvd_vKozR5P4QfilV2UZpsPPlbtI2LAxmGHPsKvGl5YN4S23ULAzLKj61LUb5z27NSKm23AxkGvk0NJA7loBI77WK5Z77iBCAx0geZA',
  },
  {
    id: 'flood',
    labelKey: 'presetFlood' as const,
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeoX-auHZ7vu1v2JfNhbEITlSNm4h31BQSvPMPxmB88wktIqr7FQCbemkNlIbBhaMGPShCbU9Jys-kxbv57cgf_14rq5OkCYoSWiXa7AM0fji39-iZw3a-mZeMdF4BC9BT-W2-j3gXX_sAeci86str89pLeCJ1dU-3LJFXMkgYe8nEWascb3wZkKZo-7-AQpB2gfGikecMSyNmCbFoJYFRyzlLqmJqU0vc1WZ2Vngd_koor6-1EEHU-g',
  },
  {
    id: 'cones',
    labelKey: 'presetCones' as const,
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcRGyiNav-ABfXKfVB5Ynw5MZLHB4_zoUlj8l6inYrwURYEOTG64rYYGZT1BeMr4QL7Jb-eFHQdgEWoCJTDsd0EwtWg0cZD8qunO7Q7-kly99my8klhwJXK09dz7Q6aww6B1Vhm3UWHwJfj2mpCYakeBURzrY8BUyEmg7T0at7uxoKgXsZP6IUQ_Y2_cRaYhLpAkL1ma-v0wac4zlasV-gW1ZHKJ-zANgHXoGjPZTIB-Au1YLLFYOamw',
  },
];

export const CameraModal: React.FC<CameraModalProps> = ({
  isOpen,
  onClose,
  onPhotoCaptured,
  metadata,
}) => {
  const { t } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [, setCameraError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
      return;
    }

    let activeStream: MediaStream | null = null;
    navigator.mediaDevices
      ?.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      })
      .then((s) => {
        activeStream = s;
        setStream(s);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          videoRef.current.play();
        }
      })
      .catch(() => {
        setCameraError('Camera sensor standby or simulated terminal. Use camera simulator or presets.');
      });

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const captureLiveFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        // Compress to WebP / JPEG
        const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
        onPhotoCaptured(dataUrl);
        onClose();
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onPhotoCaptured(event.target.result as string);
        onClose();
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#090e16]/95 backdrop-blur-xl flex flex-col justify-between p-4 max-w-md mx-auto animate-in fade-in select-none">
      {/* Top HUD Bar */}
      <div className="flex items-center justify-between bg-[#1b2028] p-3 rounded-xl border border-[#252a33]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ec6a06] animate-pulse" />
          <span className="text-[12px] font-mono text-white uppercase font-bold">
            {t.cameraViewfinder}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded bg-[#252a33] text-[#bbcabf] hover:text-white flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {/* Main Viewfinder area */}
      <div className="relative flex-1 my-3 bg-[#0f141c] rounded-xl overflow-hidden border border-[#252a33] flex flex-col items-center justify-center shadow-2xl">
        {stream ? (
          <video
            ref={videoRef}
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center text-center p-6 gap-3">
            <span className="material-symbols-outlined text-[#4edea3] text-[48px]">
              photo_camera
            </span>
            <span className="text-[13px] font-mono text-white uppercase font-bold">
              {t.sensorSimulatorReady}
            </span>
            <p className="text-[12px] text-[#bbcabf] max-w-xs leading-relaxed">
              {t.sensorSimulatorSubtext}
            </p>
          </div>
        )}

        {/* Tactical Crosshair overlay */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-48 h-48 border border-white/20 rounded-lg relative">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#4edea3]" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#4edea3]" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#4edea3]" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#4edea3]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-[#ec6a06]/80 animate-ping" />
            </div>
          </div>
        </div>

        {/* Live Stamped Telemetry Tag */}
        <div className="absolute bottom-2 left-2 right-2 bg-[#090e16]/85 backdrop-blur-md p-2 rounded-lg border border-[#252a33] text-[10px] font-mono text-[#bbcabf] flex justify-between">
          <span>LAT: {metadata.lat}°N LON: {metadata.lon}°E</span>
          <span className="text-[#4edea3]">SHA-256 AUTH</span>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {/* Preset selector bar */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-mono text-[#bbcabf] uppercase tracking-wider">
          {t.tacticalPresetsTitle}
        </span>
        <div className="grid grid-cols-3 gap-2">
          {TACTICAL_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                onPhotoCaptured(preset.url);
                onClose();
              }}
              className="h-14 rounded-lg bg-[#1b2028] hover:bg-[#252a33] p-1 border border-[#252a33] text-left flex flex-col justify-between active:scale-95 transition-transform"
            >
              <span className="text-[10px] font-mono text-[#4edea3] font-bold truncate">
                {t[preset.labelKey]}
              </span>
              <span className="text-[9px] font-mono text-[#bbcabf]">
                {t.usePreset}
              </span>
            </button>
          ))}
        </div>

        {/* Bottom Shutter Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          {stream ? (
            <button
              onClick={captureLiveFrame}
              className="h-14 rounded-xl bg-[#10b981] hover:bg-[#4edea3] text-[#002113] text-[13px] font-mono uppercase font-extrabold flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-transform"
            >
              <span className="material-symbols-outlined text-[24px]">camera</span>
              {t.captureFrame}
            </button>
          ) : (
            <label className="h-14 rounded-xl bg-[#10b981] hover:bg-[#4edea3] text-[#002113] text-[13px] font-mono uppercase font-extrabold flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-transform cursor-pointer">
              <span className="material-symbols-outlined text-[24px]">upload_file</span>
              {t.uploadPhoto}
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          )}

          <button
            onClick={() => {
              onPhotoCaptured(TACTICAL_PRESETS[0].url);
              onClose();
            }}
            className="h-14 rounded-xl bg-[#252a33] hover:bg-[#30353e] text-[#dee2ee] text-[12px] font-mono uppercase font-bold flex items-center justify-center gap-1.5 border border-[#3c4a42] active:scale-98 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px] text-[#ffb95f]">
              verified
            </span>
            {t.useVerifiedShot}
          </button>
        </div>
      </div>
    </div>
  );
};
