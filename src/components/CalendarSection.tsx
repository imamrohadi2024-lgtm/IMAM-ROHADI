import React, { useState } from 'react';
import { PengajuanCuti } from '../types';
import { CalendarDays, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CalendarSectionProps {
  pengajuanList: PengajuanCuti[];
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({ pengajuanList }) => {
  const approvedLeaves = pengajuanList.filter(p => p.status === 'Disetujui');

  const openGoogleCalendar = () => {
    window.open('https://calendar.google.com', '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-6 dark:border-slate-800">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary-700 dark:text-sky-400" />
              Kalender Cuti ASN Terintegrasi
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Pengajuan yang berstatus <strong>Disetujui</strong> otomatis disinkronkan dengan Google Calendar Cabdin Malang.
            </p>
          </div>

          <button
            onClick={openGoogleCalendar}
            className="btn btn-primary btn-sm self-start sm:self-auto"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Buka Google Calendar Resmi
          </button>
        </div>

        {/* Schedule List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Jadwal Cuti Aktif & Mendatang ({approvedLeaves.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {approvedLeaves.map(p => (
              <div
                key={p.no}
                className="rounded-2xl border border-slate-200 p-4 bg-slate-50/50 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800/40 text-xs transition"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">{p.nama}</span>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {p.jenisCuti}
                  </span>
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                  {p.unitKerja}
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-slate-700 dark:text-slate-300 font-semibold">
                  <span>📅 {p.tanggalMulai} s.d. {p.tanggalSelesai}</span>
                  <span className="tabular-nums">{p.lamaCuti} hari kerja</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
