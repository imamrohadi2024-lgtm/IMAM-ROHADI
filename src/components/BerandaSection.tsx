import React, { useState } from 'react';
import { PengajuanCuti, UserSession } from '../types';
import { 
  PlusCircle, 
  Calculator, 
  BookOpen, 
  TrendingUp, 
  PieChart as PieIcon, 
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface BerandaSectionProps {
  currentUser: UserSession;
  pengajuanList: PengajuanCuti[];
  onNavigate: (section: string) => void;
  onSelectPengajuan: (pengajuan: PengajuanCuti) => void;
}

export const BerandaSection: React.FC<BerandaSectionProps> = ({
  currentUser,
  pengajuanList,
  onNavigate,
  onSelectPengajuan,
}) => {
  const [hoveredBar, setHoveredBar] = useState<{ month: string; count: number } | null>(null);

  // Compute stats
  const total = pengajuanList.length;
  const menunggu = pengajuanList.filter(p => p.status === 'Menunggu Verifikasi').length;
  const disetujui = pengajuanList.filter(p => p.status === 'Disetujui').length;
  const ditolak = pengajuanList.filter(p => p.status === 'Ditolak' || p.status === 'Perlu Revisi').length;

  // Monthly data calculation for 2026
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const monthlyCounts = months.map((m, idx) => {
    const count = pengajuanList.filter(p => {
      const parts = p.tanggal.split('-');
      const month = parseInt(parts[1], 10);
      return month === idx + 1;
    }).length;
    return { month: m, count };
  });

  const maxMonthCount = Math.max(...monthlyCounts.map(m => m.count), 1);

  // Leave Type Breakdown
  const typeMap: Record<string, number> = {};
  pengajuanList.forEach(p => {
    typeMap[p.jenisCuti] = (typeMap[p.jenisCuti] || 0) + 1;
  });
  const typeEntries = Object.entries(typeMap).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-800 via-primary-700 to-sky-600 p-6 text-white shadow-xl shadow-primary-900/10 md:p-8">
        <div className="relative z-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              Sistem Cuti Terpadu Cabdin Malang
            </div>
            <h2 className="text-xl font-extrabold tracking-tight md:text-2xl">
              Selamat Datang, {currentUser.nama}!
            </h2>
            <p className="text-xs text-white/80 leading-relaxed">
              Kelola, pantau, dan verifikasi permohonan hak cuti ASN secara transparan, akuntabel, dan terintegrasi dengan regulasi UU ASN No. 20 Tahun 2023.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => onNavigate('pengajuan')}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-primary-800 shadow-md hover:bg-slate-100 transition"
            >
              <PlusCircle className="h-4 w-4 text-emerald-600" />
              Ajukan Cuti Baru
            </button>
            <button
              onClick={() => onNavigate('kalkulator')}
              className="inline-flex items-center gap-2 rounded-xl bg-white/20 px-4 py-2.5 text-xs font-bold text-white backdrop-blur hover:bg-white/30 transition"
            >
              <Calculator className="h-4 w-4" />
              Hitung Sisa Cuti
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Pengajuan</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <Calendar className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3 text-2xl font-extrabold tabular-nums text-slate-900 dark:text-white">
            {total}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            Seluruh berkas terdaftar
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Menunggu Verifikasi</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
              <Clock className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3 text-2xl font-extrabold tabular-nums text-amber-600 dark:text-amber-400">
            {menunggu}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            Membutuhkan persetujuan
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Disetujui</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3 text-2xl font-extrabold tabular-nums text-emerald-600 dark:text-emerald-400">
            {disetujui}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            Surat ijin diterbitkan
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Ditolak / Revisi</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
              <XCircle className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3 text-2xl font-extrabold tabular-nums text-rose-600 dark:text-rose-400">
            {ditolak}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            Catatan koreksi diberikan
          </div>
        </div>
      </div>

      {/* Two Column Visual Analytics */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Trend Monthly Bar Chart */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm lg:col-span-3 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <TrendingUp className="h-4 w-4 text-primary-700 dark:text-sky-400" />
                Tren Pengajuan Cuti ASN 2026
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Distribusi volume permohonan per bulan berjalan
              </p>
            </div>
            {hoveredBar && (
              <span className="rounded-lg bg-primary-50 px-2 py-1 text-xs font-semibold text-primary-800 dark:bg-primary-950 dark:text-sky-300">
                {hoveredBar.month}: {hoveredBar.count} pengajuan
              </span>
            )}
          </div>

          <div className="flex h-56 items-end gap-2 pt-6">
            {monthlyCounts.map(item => {
              const heightPct = Math.round((item.count / maxMonthCount) * 100);
              const isHovered = hoveredBar?.month === item.month;
              return (
                <div
                  key={item.month}
                  className="group relative flex flex-1 flex-col items-center gap-1.5 h-full justify-end cursor-pointer"
                  onMouseEnter={() => setHoveredBar(item)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.count}
                  </span>
                  <div
                    className={`w-full rounded-t-lg transition-all duration-300 ${
                      item.count > 0
                        ? isHovered
                          ? 'bg-sky-500 shadow-md shadow-sky-500/30'
                          : 'bg-gradient-to-t from-primary-700 to-primary-500'
                        : 'bg-slate-100 dark:bg-slate-800'
                    }`}
                    style={{ height: `${Math.max(heightPct, 6)}%` }}
                  />
                  <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leave Type Distribution */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm lg:col-span-2 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <PieIcon className="h-4 w-4 text-primary-700 dark:text-sky-400" />
              Proporsi Jenis Cuti
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Klasifikasi berdasarkan kategori permohonan
            </p>
          </div>

          <div className="space-y-2.5">
            {typeEntries.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">Belum ada data</div>
            ) : (
              typeEntries.map(([name, count], index) => {
                const pct = Math.round((count / total) * 100);
                const colors = ['bg-sky-600', 'bg-emerald-600', 'bg-amber-500', 'bg-violet-600', 'bg-rose-500', 'bg-teal-600'];
                const barColor = colors[index % colors.length];
                return (
                  <div key={name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[170px]">
                        {name}
                      </span>
                      <span className="font-bold tabular-nums text-slate-900 dark:text-white">
                        {count} <span className="text-[10px] font-normal text-slate-400">({pct}%)</span>
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                      <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Recent Submissions Table */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Pengajuan Cuti Terkini
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Daftar permohonan cuti yang baru masuk ke sistem
            </p>
          </div>
          <button
            onClick={() => onNavigate(currentUser.role === 'cabdin' ? 'verifikasi' : 'riwayat')}
            className="flex items-center gap-1 text-xs font-semibold text-primary-700 hover:text-primary-800 dark:text-sky-400"
          >
            Lihat Semua <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <th className="th">No</th>
                <th className="th">Tgl Pengajuan</th>
                <th className="th">Nama ASN & NIP</th>
                <th className="th">Unit Kerja</th>
                <th className="th">Jenis Cuti</th>
                <th className="th">Lama</th>
                <th className="th">Status</th>
                <th className="th text-right">Detail</th>
              </tr>
            </thead>
            <tbody>
              {pengajuanList.slice(0, 5).map(p => {
                let badgeClass = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
                if (p.status === 'Menunggu Verifikasi') badgeClass = 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300';
                if (p.status === 'Disetujui') badgeClass = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300';
                if (p.status === 'Ditolak') badgeClass = 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300';
                if (p.status === 'Perlu Revisi') badgeClass = 'bg-sky-100 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300';

                return (
                  <tr key={p.no} className="border-b border-slate-50 hover:bg-slate-50/80 dark:border-slate-800 dark:hover:bg-slate-800/50 transition">
                    <td className="td font-mono font-semibold">#{p.no}</td>
                    <td className="td whitespace-nowrap">{p.tanggal}</td>
                    <td className="td">
                      <div className="font-semibold text-slate-900 dark:text-white">{p.nama}</div>
                      <div className="font-mono text-[11px] text-slate-400">{p.nip}</div>
                    </td>
                    <td className="td max-w-[200px] truncate">{p.unitKerja}</td>
                    <td className="td font-medium">{p.jenisCuti}</td>
                    <td className="td tabular-nums font-semibold">{p.lamaCuti} hr</td>
                    <td className="td">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${badgeClass}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="td text-right">
                      <button
                        onClick={() => onSelectPengajuan(p)}
                        className="rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                      >
                        Buka
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
