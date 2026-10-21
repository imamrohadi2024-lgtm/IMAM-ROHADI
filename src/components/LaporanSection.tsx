import React, { useState } from 'react';
import { PengajuanCuti } from '../types';
import { DAFTAR_SEKOLAH } from '../data/mockData';
import { 
  BarChart3, 
  Filter, 
  FileSpreadsheet, 
  Download, 
  Calendar, 
  Building, 
  PieChart, 
  CheckCircle2, 
  Clock, 
  XCircle,
  ExternalLink
} from 'lucide-react';

interface LaporanSectionProps {
  pengajuanList: PengajuanCuti[];
  onShowToast: (msg: string, type: 'success' | 'error' | 'warning' | 'info') => void;
}

export const LaporanSection: React.FC<LaporanSectionProps> = ({
  pengajuanList,
  onShowToast,
}) => {
  const [filterTahun, setFilterTahun] = useState('2026');
  const [filterBulan, setFilterBulan] = useState('');
  const [filterUnit, setFilterUnit] = useState('');
  const [filterJenis, setFilterJenis] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [isGenerated, setIsGenerated] = useState(true);

  // Compute filtered dataset
  const filteredData = pengajuanList.filter(p => {
    const parts = p.tanggal.split('-'); // dd-MM-yyyy
    const year = parts[2];
    const month = parts[1];

    if (filterTahun && year !== filterTahun) return false;
    if (filterBulan && parseInt(month, 10) !== parseInt(filterBulan, 10)) return false;
    if (filterUnit && p.unitKerja !== filterUnit) return false;
    if (filterJenis && p.jenisCuti !== filterJenis) return false;
    if (filterStatus && p.status !== filterStatus) return false;
    return true;
  });

  const total = filteredData.length;
  const totalHari = filteredData.reduce((acc, cur) => acc + (cur.lamaCuti || 0), 0);
  const disetujui = filteredData.filter(p => p.status === 'Disetujui').length;
  const menunggu = filteredData.filter(p => p.status === 'Menunggu Verifikasi').length;
  const ditolak = filteredData.filter(p => p.status === 'Ditolak' || p.status === 'Perlu Revisi').length;

  // Breakdown per jenis
  const perJenis: Record<string, { count: number; hari: number }> = {};
  filteredData.forEach(p => {
    if (!perJenis[p.jenisCuti]) perJenis[p.jenisCuti] = { count: 0, hari: 0 };
    perJenis[p.jenisCuti].count++;
    perJenis[p.jenisCuti].hari += p.lamaCuti || 0;
  });

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      ["No,Tanggal Pengajuan,NIP,Nama,Unit Kerja,Jenis Cuti,Lama Cuti,Status"]
        .concat(filteredData.map(d => `${d.no},"${d.tanggal}","'${d.nip}","${d.nama}","${d.unitKerja}","${d.jenisCuti}",${d.lamaCuti},"${d.status}"`))
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Laporan_Cuti_ASN_Cabdin_Malang_${filterTahun}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast('Laporan berhasil diekspor ke format CSV / Spreadsheet!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Filter Box */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-4">
          <Filter className="h-4 w-4 text-primary-700 dark:text-sky-400" />
          Filter Rekapitulasi & Laporan Cuti
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div>
            <label className="label">Tahun</label>
            <select value={filterTahun} onChange={e => setFilterTahun(e.target.value)} className="input">
              <option value="2026">2026</option>
              <option value="2025">2025</option>
            </select>
          </div>

          <div>
            <label className="label">Bulan</label>
            <select value={filterBulan} onChange={e => setFilterBulan(e.target.value)} className="input">
              <option value="">Semua Bulan</option>
              <option value="1">Januari</option>
              <option value="2">Februari</option>
              <option value="3">Maret</option>
              <option value="4">April</option>
              <option value="5">Mei</option>
              <option value="6">Juni</option>
              <option value="7">Juli</option>
              <option value="8">Agustus</option>
              <option value="9">September</option>
              <option value="10">Oktober</option>
              <option value="11">November</option>
              <option value="12">Desember</option>
            </select>
          </div>

          <div>
            <label className="label">Unit Kerja</label>
            <select value={filterUnit} onChange={e => setFilterUnit(e.target.value)} className="input">
              <option value="">Semua Sekolah</option>
              {DAFTAR_SEKOLAH.map(s => (
                <option key={s.no} value={s.nama}>{s.nama}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Jenis Cuti</label>
            <select value={filterJenis} onChange={e => setFilterJenis(e.target.value)} className="input">
              <option value="">Semua Jenis</option>
              <option value="Cuti Tahunan">Cuti Tahunan</option>
              <option value="Cuti Sakit">Cuti Sakit</option>
              <option value="Cuti Melahirkan">Cuti Melahirkan</option>
              <option value="Cuti Karena Alasan Penting">Alasan Penting</option>
              <option value="Cuti Besar">Cuti Besar</option>
              <option value="Cuti Bersama">Cuti Bersama</option>
            </select>
          </div>

          <div>
            <label className="label">Status</label>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="input">
              <option value="">Semua Status</option>
              <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
              <option value="Disetujui">Disetujui</option>
              <option value="Ditolak">Ditolak</option>
              <option value="Perlu Revisi">Perlu Revisi</option>
            </select>
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={handleExport}
              className="btn btn-success w-full text-xs font-bold"
            >
              <FileSpreadsheet className="h-4 w-4" /> Export Sheet
            </button>
          </div>
        </div>
      </div>

      {/* Summary KPI Results */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 text-center">
          <div className="text-2xl font-extrabold tabular-nums text-primary-700 dark:text-sky-400">{total}</div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-1">Total Pengajuan</div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 text-center">
          <div className="text-2xl font-extrabold tabular-nums text-primary-700 dark:text-sky-400">{totalHari}</div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-1">Total Hari Kerja</div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 text-center">
          <div className="text-2xl font-extrabold tabular-nums text-emerald-600 dark:text-emerald-400">{disetujui}</div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-1">Disetujui</div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 text-center">
          <div className="text-2xl font-extrabold tabular-nums text-amber-500 dark:text-amber-400">{menunggu}</div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-1">Menunggu</div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 text-center col-span-2 lg:col-span-1">
          <div className="text-2xl font-extrabold tabular-nums text-rose-600 dark:text-rose-400">{ditolak}</div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-1">Ditolak / Revisi</div>
        </div>
      </div>

      {/* Breakdown per Jenis Cuti */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
          <PieChart className="h-4 w-4 text-primary-700 dark:text-sky-400" />
          Rincian Distribusi per Kategori Cuti
        </h3>
        <div className="space-y-3">
          {Object.entries(perJenis).map(([nama, data]) => {
            const pct = total > 0 ? Math.round((data.count / total) * 100) : 0;
            return (
              <div key={nama} className="flex items-center gap-4 text-xs">
                <div className="w-48 font-medium text-slate-700 dark:text-slate-300 truncate">{nama}</div>
                <div className="flex-1 h-3 rounded-full bg-slate-100 overflow-hidden dark:bg-slate-800">
                  <div className="h-full bg-primary-600 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <div className="w-24 text-right tabular-nums font-bold text-slate-900 dark:text-white">
                  {data.count} cuti ({data.hari} hr)
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Table */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
          Detail Data Hasil Rekapitulasi
        </h3>
        <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-800/50">
                <th className="th">No</th>
                <th className="th">Tgl Pengajuan</th>
                <th className="th">NIP</th>
                <th className="th">Nama ASN</th>
                <th className="th">Unit Kerja</th>
                <th className="th">Jenis Cuti</th>
                <th className="th">Hari</th>
                <th className="th">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="td text-center text-slate-400 py-8">
                    Tidak ada data yang sesuai filter ini.
                  </td>
                </tr>
              ) : (
                filteredData.map((d, idx) => (
                  <tr key={d.no} className="border-b border-slate-50 hover:bg-slate-50/50 dark:border-slate-800 dark:hover:bg-slate-800/40">
                    <td className="td font-mono">{idx + 1}</td>
                    <td className="td whitespace-nowrap">{d.tanggal}</td>
                    <td className="td font-mono">{d.nip}</td>
                    <td className="td font-bold text-slate-900 dark:text-white">{d.nama}</td>
                    <td className="td truncate max-w-[200px]">{d.unitKerja}</td>
                    <td className="td font-medium">{d.jenisCuti}</td>
                    <td className="td tabular-nums font-semibold">{d.lamaCuti} hr</td>
                    <td className="td">{d.status}</td>
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
