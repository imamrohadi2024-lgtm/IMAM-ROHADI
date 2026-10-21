import React from 'react';
import { UserSession } from '../types';
import { 
  Menu, 
  Moon, 
  Sun, 
  FileCode2, 
  ShieldCheck, 
  School,
  Download
} from 'lucide-react';

interface HeaderProps {
  currentUser: UserSession;
  onToggleSidebar: () => void;
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
  activeSection: string;
  onOpenCodeExport: () => void;
  onChangeRole: (role: 'cabdin' | 'sekolah', schoolName?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onToggleSidebar,
  onToggleDarkMode,
  isDarkMode,
  activeSection,
  onOpenCodeExport,
  onChangeRole,
}) => {
  const getSectionTitle = () => {
    switch (activeSection) {
      case 'beranda': return 'Beranda Dashboard';
      case 'pengajuan': return 'Form Pengajuan Cuti';
      case 'verifikasi': return 'Verifikasi Pengajuan Cuti';
      case 'dataGuru': return 'Data Guru & Pegawai';
      case 'laporan': return 'Laporan & Rekapitulasi';
      case 'riwayat': return 'Riwayat Pengajuan Cuti';
      case 'kalkulator': return 'Kalkulator Sisa Cuti';
      case 'infoCuti': return 'Panduan Regulasi Cuti ASN';
      case 'calendar': return 'Kalender Cuti ASN';
      case 'info': return 'Informasi Aplikasi';
      default: return 'Sistem Cuti ASN';
    }
  };

  const todayStr = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur-md md:px-6 dark:border-slate-800 dark:bg-slate-900/95">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 lg:hidden dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          aria-label="Toggle Navigation"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-sm font-bold text-slate-900 md:text-base dark:text-white">
            {getSectionTitle()}
          </h1>
          <div className="hidden text-[11px] text-slate-500 sm:block dark:text-slate-400">
            {todayStr} · Cabdin Wilayah Malang
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {/* Role Switcher Pill for Testing Live */}
        <div className="hidden items-center rounded-xl border border-slate-200 bg-slate-50 p-1 text-xs sm:flex dark:border-slate-700 dark:bg-slate-800">
          <button
            onClick={() => onChangeRole('cabdin')}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-semibold transition ${
              currentUser.role === 'cabdin'
                ? 'bg-white text-primary-700 shadow-sm dark:bg-slate-700 dark:text-sky-300'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Admin Cabdin
          </button>
          <button
            onClick={() => onChangeRole('sekolah', 'SMA NEGERI 1 KOTA MALANG')}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-semibold transition ${
              currentUser.role === 'sekolah'
                ? 'bg-white text-primary-700 shadow-sm dark:bg-slate-700 dark:text-sky-300'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            <School className="h-3.5 w-3.5" />
            Sekolah
          </button>
        </div>

        {/* Code Exporter Modal Button */}
        <button
          onClick={onOpenCodeExport}
          className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-primary-700 to-sky-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:from-primary-800 hover:to-sky-700 transition"
          title="Buka Kode GS & Index.html Siap Pakai"
        >
          <FileCode2 className="h-4 w-4" />
          <span className="hidden sm:inline">Kode GS & Index</span>
          <span className="rounded bg-white/20 px-1 py-0.5 text-[10px] font-mono">FIX</span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={onToggleDarkMode}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          title="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
        </button>
      </div>
    </header>
  );
};
