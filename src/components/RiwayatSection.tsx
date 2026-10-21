import React, { useState } from 'react';
import { PengajuanCuti } from '../types';
import { History, Filter, Search, Calendar, FileText } from 'lucide-react';

interface RiwayatSectionProps {
  pengajuanList: PengajuanCuti[];
  onSelectPengajuan: (p: PengajuanCuti) => void;
}

export const RiwayatSection: React.FC<RiwayatSectionProps> = ({
  pengajuanList,
  onSelectPengajuan,
}) => {
  const [filterStatus, setFilterStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = pengajuanList.filter(p => {
    const matchStatus = filterStatus ? p.status === filterStatus : true;
    const matchSearch = p.nama.toLowerCase().includes(searchQuery.toLowerCase()) || p.nip.includes(searchQuery);
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <History className="h-4 w-4 text-primary-700 dark:text-sky-400" />
              Riwayat Pengajuan Cuti ASN
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Daftar rekam jejak status permohonan dan surat keputusan cuti
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Cari NIP / Nama..."
              className="input !w-48 text-xs"
            />
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="input !w-44 text-xs"
            >
              <option value="">Semua Status</option>
              <option value="Menunggu Verifikasi">Menunggu</option>
              <option value="Disetujui">Disetujui</option>
              <option value="Ditolak">Ditolak</option>
              <option value="Perlu Revisi">Perlu Revisi</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-800/50">
                <th className="th">No</th>
                <th className="th">Tgl Pengajuan</th>
                <th className="th">Nama ASN</th>
                <th className="th">Unit Kerja</th>
                <th className="th">Jenis Cuti</th>
                <th className="th">Hari</th>
                <th className="th">Status</th>
                <th className="th">Catatan Cabdin</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="td text-center text-slate-400 py-10">
                    Belum ada riwayat pengajuan cuti.
                  </td>
                </tr>
              ) : (
                filtered.map((p, idx) => (
                  <tr
                    key={p.no}
                    onClick={() => onSelectPengajuan(p)}
                    className="border-b border-slate-50 hover:bg-slate-50/70 cursor-pointer dark:border-slate-800 dark:hover:bg-slate-800/50 transition"
                  >
                    <td className="td font-mono font-semibold">#{p.no}</td>
                    <td className="td whitespace-nowrap">{p.tanggalPengajuan || p.tanggal}</td>
                    <td className="td font-bold text-slate-900 dark:text-white">{p.nama}</td>
                    <td className="td truncate max-w-[200px]">{p.unitKerja}</td>
                    <td className="td font-medium">{p.jenisCuti}</td>
                    <td className="td tabular-nums font-semibold">{p.lamaCuti} hr</td>
                    <td className="td">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        p.status === 'Disetujui'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : p.status === 'Menunggu Verifikasi'
                          ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="td text-slate-500 dark:text-slate-400 max-w-xs truncate">
                      {p.catatan || '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
