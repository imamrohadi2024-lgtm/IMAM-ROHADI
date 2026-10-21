import React, { useState } from 'react';
import { Guru } from '../types';
import { DAFTAR_SEKOLAH } from '../data/mockData';
import { 
  Users, 
  School, 
  Search, 
  UserPlus, 
  Upload, 
  Download, 
  ChevronDown, 
  ChevronUp,
  Building2,
  Filter
} from 'lucide-react';

interface DataGuruSectionProps {
  guruList: Guru[];
  onOpenAddModal: () => void;
  onOpenBulkModal: () => void;
  onShowToast: (msg: string, type: 'success' | 'error' | 'warning' | 'info') => void;
}

export const DataGuruSection: React.FC<DataGuruSectionProps> = ({
  guruList,
  onOpenAddModal,
  onOpenBulkModal,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSekolah, setSelectedSekolah] = useState('');
  const [openSekolah, setOpenSekolah] = useState<Record<string, boolean>>({});

  // Group by school
  const filteredGuru = guruList.filter(g => {
    const matchesSearch = 
      g.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.nip.includes(searchQuery);
    const matchesSekolah = selectedSekolah ? g.sekolah === selectedSekolah : true;
    return matchesSearch && matchesSekolah;
  });

  const grouped: Record<string, Guru[]> = {};
  filteredGuru.forEach(g => {
    if (!grouped[g.sekolah]) grouped[g.sekolah] = [];
    grouped[g.sekolah].push(g);
  });

  const toggleAccordion = (sekolah: string) => {
    setOpenSekolah(prev => ({ ...prev, [sekolah]: !prev[sekolah] }));
  };

  const handleDownloadTemplate = () => {
    const csv = `NIP,Nama,Jenis Kelamin,Status,Golongan Ruang,Sekolah\n198201182006041001,Ahmad Fauzi,L,PNS,III/d,SMA NEGERI 1 KOTA MALANG\n198505222010012002,Siti Nurhaliza,P,PNS,III/c,SMKN 1 MALANG\n199001152015031003,Budi Santoso,L,PPPK,III/a,SMA NEGERI 2 KOTA MALANG\n`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'template_guru_cabdin_malang.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast('Template CSV berhasil diunduh', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary-700 to-sky-600 text-white shadow-sm">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Guru Terdaftar</div>
            <div className="text-2xl font-extrabold tabular-nums text-slate-900 dark:text-white">
              {guruList.length} <span className="text-xs font-normal text-slate-400">orang</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-sm">
            <School className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Unit Sekolah Wilayah</div>
            <div className="text-2xl font-extrabold tabular-nums text-slate-900 dark:text-white">
              {DAFTAR_SEKOLAH.length} <span className="text-xs font-normal text-slate-400">SMA / SMK / SLB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="flex flex-1 flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Cari nama guru atau NIP..."
                className="input !pl-9"
              />
            </div>
            <div className="relative min-w-[200px]">
              <select
                value={selectedSekolah}
                onChange={e => setSelectedSekolah(e.target.value)}
                className="input"
              >
                <option value="">-- Semua Sekolah ({DAFTAR_SEKOLAH.length}) --</option>
                {DAFTAR_SEKOLAH.map(s => (
                  <option key={s.no} value={s.nama}>
                    {s.nama} ({s.kota})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button onClick={onOpenAddModal} className="btn btn-primary btn-sm">
              <UserPlus className="h-3.5 w-3.5" /> Tambah Guru
            </button>
            <button onClick={onOpenBulkModal} className="btn btn-info btn-sm">
              <Upload className="h-3.5 w-3.5" /> Bulk Upload CSV
            </button>
            <button onClick={handleDownloadTemplate} className="btn btn-secondary btn-sm" title="Download Template CSV">
              <Download className="h-3.5 w-3.5" /> Template
            </button>
          </div>
        </div>

        {/* Grouped Accordions */}
        <div className="space-y-3">
          {Object.keys(grouped).length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              Tidak ada data guru yang cocok dengan pencarian.
            </div>
          ) : (
            Object.keys(grouped).sort().map(sekolahName => {
              const list = grouped[sekolahName];
              const isOpen = openSekolah[sekolahName] ?? true;
              return (
                <div
                  key={sekolahName}
                  className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800"
                >
                  <button
                    onClick={() => toggleAccordion(sekolahName)}
                    className="flex w-full items-center justify-between bg-slate-50/80 px-4 py-3 text-left transition hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800"
                  >
                    <div className="flex items-center gap-2.5">
                      <School className="h-4 w-4 text-primary-700 dark:text-sky-400" />
                      <span className="text-xs font-bold text-slate-800 dark:text-white">
                        {sekolahName}
                      </span>
                      <span className="rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-bold text-primary-800 dark:bg-sky-950 dark:text-sky-300">
                        {list.length} guru
                      </span>
                    </div>
                    {isOpen ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                  </button>

                  {isOpen && (
                    <div className="overflow-x-auto border-t border-slate-100 dark:border-slate-800">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900">
                            <th className="th !py-2.5">No</th>
                            <th className="th !py-2.5">NIP</th>
                            <th className="th !py-2.5">Nama Lengkap</th>
                            <th className="th !py-2.5">JK</th>
                            <th className="th !py-2.5">Status</th>
                            <th className="th !py-2.5">Gol. Ruang</th>
                          </tr>
                        </thead>
                        <tbody>
                          {list.map((g, idx) => (
                            <tr
                              key={g.nip}
                              className="border-b border-slate-50 hover:bg-slate-50/50 dark:border-slate-800/60 dark:hover:bg-slate-800/40"
                            >
                              <td className="td !py-2.5 text-slate-400 tabular-nums">{idx + 1}</td>
                              <td className="td !py-2.5 font-mono font-semibold text-slate-700 dark:text-slate-300">
                                {g.nip}
                              </td>
                              <td className="td !py-2.5 font-bold text-slate-900 dark:text-white">
                                {g.nama}
                              </td>
                              <td className="td !py-2.5">{g.jk}</td>
                              <td className="td !py-2.5">
                                <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                  g.status === 'PNS'
                                    ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/80 dark:text-sky-300'
                                    : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300'
                                }`}>
                                  {g.status}
                                </span>
                              </td>
                              <td className="td !py-2.5 font-mono">{g.golRuang || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
