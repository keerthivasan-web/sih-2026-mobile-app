import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShipmentManifest } from '../types';

export const ShipmentsScreen: React.FC = () => {
  const { shipments, activeShipment, setActiveShipmentId, setActiveTab, showToast, t } = useApp();
  const [selectedShipment, setSelectedShipment] = useState<ShipmentManifest | null>(null);

  // Group into Current, Upcoming, Completed
  const currentShipment = shipments.find((s) => s.id === activeShipment.id) || shipments[0];
  const upcomingShipments = shipments.filter((s) => s.id !== activeShipment.id && s.status !== 'DELIVERED');
  const completedShipments: ShipmentManifest[] = [
    {
      id: 'shp-comp-1',
      manifestCode: 'MED-1982',
      commodity: 'Sterile Surgical Kits & Saline',
      priority: 'HIGH',
      origin: 'Guwahati Logistics Hub',
      destination: 'Mangan District Hospital',
      cargoWeightKg: 2400,
      cargoDescription: '500 Units IV Saline, Surgical Sutures, Trauma Dressing',
      consignee: 'Mangan District Health Office',
      emergencyContact: '+91 94340-11223 (HQ Dispatcher)',
      distanceKm: 210,
      estimatedTime: 'Delivered',
      status: 'DELIVERED',
      specialInstructions: 'Direct handoff completed with Chief Medical Officer signoff.',
    },
  ];

  const handleSelectActive = (shipment: ShipmentManifest) => {
    setActiveShipmentId(shipment.id);
    showToast(`Active shipment set to #${shipment.manifestCode}`, 'success', 'local_shipping');
    setActiveTab('home');
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 py-2 gap-4 pb-28 select-none font-sans">
      {/* Header Info */}
      <div className="flex items-center justify-between bg-[#1b2028] p-3.5 rounded-xl border border-[#252a33] shadow-md">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[#4edea3] text-[24px]">
            local_shipping
          </span>
          <div className="flex flex-col">
            <h1 className="text-base font-extrabold text-white uppercase font-sans tracking-wide">
              {t.shipmentsTitle}
            </h1>
            <span className="text-[11px] font-mono text-[#bbcabf]">
              3 Manifests • Cold-Chain & Emergency Cargo
            </span>
          </div>
        </div>
        <span className="text-[10px] font-mono text-[#4edea3] bg-[#090e16] px-2 py-0.5 rounded border border-[#252a33] font-bold">
          LIVE MANIFESTS
        </span>
      </div>

      {/* SECTION 1: CURRENT SHIPMENT */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-mono text-[#4edea3] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
            <span>{t.currentShipment}</span>
          </span>
          <span className="text-[10px] font-mono text-[#bbcabf]">IN PROGRESS</span>
        </div>

        <div
          onClick={() => setSelectedShipment(currentShipment)}
          className="bg-[#1b2028] border-2 border-[#10b981] rounded-2xl p-4 flex flex-col gap-3 shadow-lg cursor-pointer hover:border-[#4edea3] transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-mono text-[#4edea3] font-bold">
              #{currentShipment.manifestCode}
            </span>
            <span className="px-2 py-0.5 rounded bg-[#ff5449]/20 text-[#ffb4ab] text-[10px] font-mono font-extrabold uppercase border border-[#ff5449]/40">
              🔴 {currentShipment.priority}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-2xl">💊</span>
            <div className="flex flex-col">
              <h2 className="text-lg font-extrabold text-white font-sans leading-tight">
                {currentShipment.commodity}
              </h2>
              <span className="text-[12px] text-[#bbcabf] font-sans mt-0.5">
                Destination: {currentShipment.destination}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 bg-[#090e16] p-2.5 rounded-xl border border-[#252a33] text-[11px] font-mono">
            <div>
              <span className="text-[#bbcabf] text-[10px]">DISTANCE / ETA:</span>
              <span className="text-white font-bold block mt-0.5">
                {currentShipment.distanceKm} KM • {currentShipment.estimatedTime}
              </span>
            </div>
            <div>
              <span className="text-[#bbcabf] text-[10px]">CARGO WEIGHT:</span>
              <span className="text-[#4edea3] font-bold block mt-0.5">
                {(currentShipment.cargoWeightKg / 1000).toFixed(1)} TONNES
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[#4edea3]">
            <span>Tap to view details</span>
            <span>→</span>
          </div>
        </div>
      </div>

      {/* SECTION 2: UPCOMING SHIPMENTS */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-mono text-[#bbcabf] font-bold uppercase tracking-wider">
            {t.upcomingShipments} ({upcomingShipments.length})
          </span>
          <span className="text-[10px] font-mono text-[#ffb95f]">SCHEDULED</span>
        </div>

        <div className="flex flex-col gap-2">
          {upcomingShipments.map((s) => (
            <div
              key={s.id}
              onClick={() => setSelectedShipment(s)}
              className="bg-[#171c24] hover:bg-[#1b2028] border border-[#252a33] hover:border-[#3c4a42] rounded-xl p-3 flex flex-col gap-2 cursor-pointer transition-all shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-mono text-[#dee2ee] font-bold">
                  #{s.manifestCode}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#ffb95f]/20 text-[#ffb95f] text-[9px] font-mono font-bold uppercase">
                  {s.priority}
                </span>
              </div>
              <h3 className="font-extrabold text-white text-sm">{s.commodity}</h3>
              <div className="flex items-center justify-between text-[11px] font-mono text-[#bbcabf]">
                <span>To: {s.destination}</span>
                <span>{s.distanceKm} KM</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: COMPLETED SHIPMENTS */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-mono text-[#bbcabf] font-bold uppercase tracking-wider">
            {t.completedShipments} ({completedShipments.length})
          </span>
          <span className="text-[10px] font-mono text-[#4edea3]">DELIVERED</span>
        </div>

        <div className="flex flex-col gap-2">
          {completedShipments.map((s) => (
            <div
              key={s.id}
              onClick={() => setSelectedShipment(s)}
              className="bg-[#171c24]/60 border border-[#252a33] rounded-xl p-3 flex flex-col gap-1.5 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
            >
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-mono text-[#bbcabf] font-bold">
                  #{s.manifestCode}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#10b981]/20 text-[#4edea3] text-[9px] font-mono font-bold uppercase">
                  ✓ DELIVERED
                </span>
              </div>
              <h3 className="font-bold text-white text-sm">{s.commodity}</h3>
              <span className="text-[11px] font-mono text-[#bbcabf]">
                Destination: {s.destination}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* TAP SHIPMENT: DETAILED VIEW MODAL */}
      {selectedShipment && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#1b2028] rounded-t-3xl sm:rounded-2xl border border-[#252a33] shadow-2xl p-5 flex flex-col gap-3.5 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[#252a33]">
              <div className="flex items-center gap-2">
                <span className="text-xl">📋</span>
                <span className="text-sm font-mono text-white font-extrabold uppercase">
                  MANIFEST #{selectedShipment.manifestCode}
                </span>
              </div>
              <button
                onClick={() => setSelectedShipment(null)}
                className="w-8 h-8 rounded-full bg-[#090e16] text-[#bbcabf] hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Commodity & Priority */}
            <div className="flex flex-col">
              <span className="text-[11px] font-mono text-[#4edea3] uppercase font-bold">
                {t.cargoDetails}
              </span>
              <h2 className="text-lg font-extrabold text-white font-sans mt-0.5">
                {selectedShipment.commodity}
              </h2>
              <span className="text-[12px] text-[#bbcabf] mt-1 font-mono">
                {selectedShipment.cargoDescription} ({(selectedShipment.cargoWeightKg / 1000).toFixed(1)} Tonnes)
              </span>
            </div>

            {/* Spec Breakdown: Pickup, Delivery, Priority, Emergency Contact, Instructions */}
            <div className="flex flex-col gap-2.5 bg-[#090e16] p-3.5 rounded-xl border border-[#252a33] text-[12px] font-mono">
              {/* Priority */}
              <div className="flex items-center justify-between">
                <span className="text-[#bbcabf]">{t.priority}:</span>
                <span className="font-extrabold text-[#ff5449]">
                  {selectedShipment.priority}
                </span>
              </div>

              {/* Pickup */}
              <div className="flex flex-col border-t border-[#252a33] pt-2">
                <span className="text-[#bbcabf]">{t.pickup}:</span>
                <span className="text-white font-bold mt-0.5">
                  {selectedShipment.origin}
                </span>
              </div>

              {/* Delivery */}
              <div className="flex flex-col border-t border-[#252a33] pt-2">
                <span className="text-[#bbcabf]">{t.delivery}:</span>
                <span className="text-[#4edea3] font-bold mt-0.5">
                  {selectedShipment.destination}
                </span>
              </div>

              {/* Emergency Contact */}
              <div className="flex flex-col border-t border-[#252a33] pt-2">
                <span className="text-[#bbcabf]">{t.emergencyContact}:</span>
                <span className="text-[#ffb95f] font-bold mt-0.5">
                  {selectedShipment.emergencyContact}
                </span>
              </div>

              {/* Instructions */}
              <div className="flex flex-col border-t border-[#252a33] pt-2">
                <span className="text-[#bbcabf]">{t.instructions}:</span>
                <span className="text-[#dee2ee] mt-0.5 leading-relaxed">
                  "{selectedShipment.specialInstructions || 'Ensure continuous GPS lock. Follow EXTRICATE safe corridors.'}"
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2 pt-1">
              {selectedShipment.id !== activeShipment.id && selectedShipment.status !== 'DELIVERED' && (
                <button
                  onClick={() => {
                    handleSelectActive(selectedShipment);
                    setSelectedShipment(null);
                  }}
                  className="w-full h-14 rounded-xl bg-[#10b981] hover:bg-[#4edea3] text-[#002113] font-sans font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow"
                >
                  <span className="material-symbols-outlined text-[20px]">play_circle</span>
                  <span>MAKE ACTIVE HUD SHIPMENT</span>
                </button>
              )}

              <button
                onClick={() => setSelectedShipment(null)}
                className="w-full h-12 rounded-xl bg-[#252a33] text-white font-mono text-[12px] uppercase font-bold"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
