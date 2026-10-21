import React, { useState } from 'react';
import { PengajuanCuti, StatusPengajuan } from '../types';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  FileCheck, 
  Calendar, 
  Eye, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  Building,
  User,
  Trash2,
  Upload,
  History,
  FileText
} from 'lucide-react';

interface VerifikasiSectionProps {
  pengajuanList: PengajuanCuti[];
  onOpenVerifModal: (p: PengajuanCuti) => void;
  onShowToast: (msg: string, type: 'success' | 'error' | 'warning' | 'info') => void;
}

export const VerifikasiSection: React.FC<VerifikasiSectionProps> = ({
  pengajuanList,
  onOpenVerifModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Filter list
  const filtered = pengajuanList.filter(p => {
    const matchesSearch = 
      p.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nip.includes(searchQuery) ||
      p.unitKerja.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus ? p.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginatedRows = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const getStatusBadge = (status: StatusPengajuan) => {
    switch (status) {
      case 'Menunggu Verifikasi':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-700 dark:bg-amber-950/70 dark:text-amber-400">
            <Clock className="h-3 w-3" /> Menunggu
          </span>
        );
      case 'Disetujui':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-400">
            <CheckCircle2 className="h-3 w-3" /> Disetujui
          </span>
        );
      case 'Ditolak':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-[11px] font-bold text-rose-700 dark:bg-rose-950/70 dark:text-rose-400">
            <XCircle className="h-3 w-3" /> Ditolak
          </span>
        );
      case 'Perlu Revisi':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-0.5 text-[11px] font-bold text-sky-700 dark:bg-sky-950/70 dark:text-sky-400">
            <FileText className="h-3 w-3" /> Revisi
          </span>
        );
      default:
        return <span className="text-xs text-slate-500">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Synchronization Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-sky-100 bg-sky-50/70 p-4 text-xs text-sky-900 dark:border-sky-900/40 dark:bg-sky-950/30 dark:text-sky-200">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-sky-600 dark:text-sky-400 shrink-0" />
          <div>
            <strong>Pangkalan Data Cuti ASN Terintegrasi</strong> · Tanggal pengajuan tercatat otomatis dalam zona waktu Indonesia Barat (WIB).
          </div>
        </div>
        <span className="rounded-md bg-white px-2 py-1 font-mono text-[11px] font-semibold text-sky-800 shadow-xs border border-sky-200 dark:bg-slate-800 dark:border-slate-700 dark:text-sky-300 self-start sm:self-auto">
          Database: Google Sheets (v7.2 Aurora Sync)
        </span>
      </div>

      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                placeholder="Cari NIP, Nama ASN, atau Sekolah..."
                className="input !pl-9"
              />
            </div>
            <div className="relative">
              <select
                value={filterStatus}
                onChange={e => { setFilterStatus(e.target.value); setCurrentPage(1); }}
                className="input !pr-8 min-w-[170px]"
              >
                <option value="">Semua Status</option>
                <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                <option value="Disetujui">Disetujui</option>
                <option value="Ditolak">Ditolak</option>
                <option value="Perlu Revisi">Perlu Revisi</option>
              </select>
            </div>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400">
            Ditemukan <strong className="text-slate-800 dark:text-white tabular-nums">{filtered.length}</strong> data pengajuan
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-800/50">
                <th className="th">No</th>
                <th className="th">Tgl Pengajuan</th>
                <th className="th">Nama ASN & NIP</th>
                <th className="th">Unit Kerja</th>
                <th className="th">Jenis & Periode Cuti</th>
                <th className="th">Status</th>
                <th className="th text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="td py-12 text-center text-slate-400">
                    Tidak ada data pengajuan yang sesuai kriteria pencarian.
                  </td>
                </tr>
              ) : (
                paginatedRows.map(p => (
                  <tr
                    key={p.no}
                    className="border-b border-slate-50 hover:bg-slate-50/70 transition dark:border-slate-800/80 dark:hover:bg-slate-800/40"
                  >
                    <td className="td font-mono font-bold text-slate-900 dark:text-white">
                      #{p.no}
                    </td>
                    <td className="td whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                        <Calendar className="h-3 w-3 text-primary-600 dark:text-sky-400" />
                        {p.tanggalPengajuan || p.tanggal}
                      </span>
                    </td>
                    <td className="td">
                      <div className="font-bold text-slate-800 dark:text-white">{p.nama}</div>
                      <div className="font-mono text-[11px] text-slate-400">{p.nip}</div>
                    </td>
                    <td className="td max-w-[220px]">
                      <div className="truncate text-slate-700 dark:text-slate-300" title={p.unitKerja}>
                        {p.unitKerja}
                      </div>
                    </td>
                    <td className="td">
                      <div className="font-bold text-primary-800 dark:text-sky-300">{p.jenisCuti}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {p.tanggalMulai} s.d. {p.tanggalSelesai} ({p.lamaCuti} hr)
                      </div>
                    </td>
                    <td className="td whitespace-nowrap">
                      {getStatusBadge(p.status)}
                    </td>
                    <td className="td text-right">
                      <button
                        onClick={() => onOpenVerifModal(p)}
                        className="inline-flex items-center gap-1 rounded-xl bg-primary-700 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-primary-800 transition dark:bg-primary-600 dark:hover:bg-primary-500"
                      >
                        <Eye className="h-3.5 w-3.5" /> Proses
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-slate-500 dark:text-slate-400">
          <div>
            Menampilkan halaman <strong className="text-slate-800 dark:text-white">{currentPage}</strong> dari{' '}
            <strong className="text-slate-800 dark:text-white">{totalPages}</strong> ({filtered.length} total pengajuan)
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage <= 1}
              className="btn btn-sm btn-secondary"
            >
              <ChevronLeft className="h-3.5 w-3.5" /> Sebelumnya
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage >= totalPages}
              className="btn btn-sm btn-secondary"
            >
              Berikutnya <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
