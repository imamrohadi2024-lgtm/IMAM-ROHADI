/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserSession, PengajuanCuti, Guru, StatusPengajuan } from './types';
import { INITIAL_GURU, INITIAL_PENGAJUAN } from './data/mockData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BerandaSection } from './components/BerandaSection';
import { PengajuanSection } from './components/PengajuanSection';
import { VerifikasiSection } from './components/VerifikasiSection';
import { DataGuruSection } from './components/DataGuruSection';
import { LaporanSection } from './components/LaporanSection';
import { RiwayatSection } from './components/RiwayatSection';
import { KalkulatorSection } from './components/KalkulatorSection';
import { InfoCutiSection } from './components/InfoCutiSection';
import { CalendarSection } from './components/CalendarSection';
import { InfoSection } from './components/InfoSection';
import { 
  ModalVerifikasi, 
  ModalKonfirmasiHapus, 
  ModalTambahGuru, 
  ModalBulkUpload 
} from './components/Modals';
import { CodeExportModal } from './components/CodeExportModal';
import { CheckCircle2, AlertTriangle, XCircle, Info as InfoIcon } from 'lucide-react';

interface ToastItem {
  id: string;
  msg: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserSession>({
    role: 'cabdin',
    nama: 'Admin Cabang Dinas',
    unitKerja: 'Cabang Dinas Pendidikan Wilayah Malang',
    username: 'cabdinmalang',
  });

  const [activeSection, setActiveSection] = useState<string>('beranda');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [pengajuanList, setPengajuanList] = useState<PengajuanCuti[]>(INITIAL_PENGAJUAN);
  const [guruList, setGuruList] = useState<Guru[]>(INITIAL_GURU);

  // Modals state
  const [selectedPengajuan, setSelectedPengajuan] = useState<PengajuanCuti | null>(null);
  const [deletingNoPengajuan, setDeletingNoPengajuan] = useState<number | null>(null);
  const [isAddGuruOpen, setIsAddGuruOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [isCodeExportOpen, setIsCodeExportOpen] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (msg: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  const handleChangeRole = (role: 'cabdin' | 'sekolah', schoolName?: string) => {
    if (role === 'cabdin') {
      setCurrentUser({
        role: 'cabdin',
        nama: 'Admin Cabang Dinas',
        unitKerja: 'Cabang Dinas Pendidikan Wilayah Malang',
        username: 'cabdinmalang',
      });
      addToast('Beralih ke mode Admin Cabang Dinas (Akses Lengkap)', 'info');
    } else {
      const unit = schoolName || 'SMA NEGERI 1 KOTA MALANG';
      setCurrentUser({
        role: 'sekolah',
        nama: unit,
        unitKerja: unit,
        username: 'sekolah',
      });
      if (activeSection === 'verifikasi' || activeSection === 'dataGuru' || activeSection === 'laporan') {
        setActiveSection('beranda');
      }
      addToast(`Beralih ke mode Unit Sekolah: ${unit}`, 'info');
    }
  };

  // Add new leave submission
  const handleAddNewPengajuan = (item: PengajuanCuti) => {
    setPengajuanList(prev => [item, ...prev]);
  };

  // Update status (Approve, Reject, Revision)
  const handleUpdateStatus = (no: number, status: StatusPengajuan, catatan: string) => {
    setPengajuanList(prev => prev.map(p => {
      if (p.no === no) {
        return {
          ...p,
          status,
          catatan,
          tglVerifikasi: new Intl.DateTimeFormat('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          }).format(new Date()).replace(/\//g, '-'),
          verifikator: currentUser.nama,
        };
      }
      return p;
    }));
    addToast(`Pengajuan #${no} berhasil diperbarui menjadi "${status}"`, 'success');
  };

  // Confirm delete
  const handleConfirmDelete = (no: number, alasan: string) => {
    setPengajuanList(prev => prev.filter(p => p.no !== no));
    addToast(`Pengajuan #${no} berhasil dihapus dari database (Alasan: ${alasan})`, 'success');
  };

  // Add new teacher
  const handleSaveGuru = (guru: Guru) => {
    setGuruList(prev => [guru, ...prev]);
    addToast(`Guru ${guru.nama} berhasil ditambahkan ke database!`, 'success');
  };

  // Bulk upload teacher simulation
  const handleBulkUploaded = (count: number) => {
    addToast(`Sinkronisasi berhasil! ${count} data guru baru dimasukkan ke database.`, 'success');
  };

  const pendingCount = pengajuanList.filter(p => p.status === 'Menunggu Verifikasi').length;

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800 antialiased dark:bg-slate-950 dark:text-slate-100">
      {/* Toast Notification Container */}
      <div className="pointer-events-none fixed right-5 top-5 z-[9999] flex flex-col gap-2.5 max-w-sm">
        {toasts.map(t => {
          let bg = 'bg-primary-700 text-white';
          let Icon = InfoIcon;
          if (t.type === 'success') { bg = 'bg-emerald-600 text-white'; Icon = CheckCircle2; }
          if (t.type === 'error') { bg = 'bg-rose-600 text-white'; Icon = XCircle; }
          if (t.type === 'warning') { bg = 'bg-amber-500 text-slate-950'; Icon = AlertTriangle; }

          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-start gap-2.5 rounded-2xl px-4 py-3 text-xs font-semibold shadow-2xl transition-all duration-300 ${bg}`}
            >
              <Icon className="h-4 w-4 shrink-0 mt-0.5" />
              <span className="flex-1 leading-snug">{t.msg}</span>
            </div>
          );
        })}
      </div>

      {/* Sidebar */}
      <Sidebar
        currentUser={currentUser}
        activeSection={activeSection}
        onSelectSection={sec => setActiveSection(sec)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        pendingCount={pendingCount}
        onLogout={() => addToast('Sesi aktif diperbarui', 'info')}
      />

      {/* Main Wrapper */}
      <div className="flex flex-1 flex-col min-w-0 min-h-screen">
        <Header
          currentUser={currentUser}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          onToggleDarkMode={handleToggleDarkMode}
          isDarkMode={isDarkMode}
          activeSection={activeSection}
          onOpenCodeExport={() => setIsCodeExportOpen(true)}
          onChangeRole={handleChangeRole}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeSection === 'beranda' && (
            <BerandaSection
              currentUser={currentUser}
              pengajuanList={pengajuanList}
              onNavigate={sec => setActiveSection(sec)}
              onSelectPengajuan={p => setSelectedPengajuan(p)}
            />
          )}

          {activeSection === 'pengajuan' && (
            <PengajuanSection
              guruList={guruList}
              onSubmitSuccess={handleAddNewPengajuan}
              onShowToast={addToast}
            />
          )}

          {activeSection === 'verifikasi' && (
            <VerifikasiSection
              pengajuanList={pengajuanList}
              onOpenVerifModal={p => setSelectedPengajuan(p)}
              onShowToast={addToast}
            />
          )}

          {activeSection === 'dataGuru' && (
            <DataGuruSection
              guruList={guruList}
              onOpenAddModal={() => setIsAddGuruOpen(true)}
              onOpenBulkModal={() => setIsBulkUploadOpen(true)}
              onShowToast={addToast}
            />
          )}

          {activeSection === 'laporan' && (
            <LaporanSection
              pengajuanList={pengajuanList}
              onShowToast={addToast}
            />
          )}

          {activeSection === 'riwayat' && (
            <RiwayatSection
              pengajuanList={pengajuanList}
              onSelectPengajuan={p => setSelectedPengajuan(p)}
            />
          )}

          {activeSection === 'kalkulator' && (
            <KalkulatorSection guruList={guruList} />
          )}

          {activeSection === 'infoCuti' && (
            <InfoCutiSection />
          )}

          {activeSection === 'calendar' && (
            <CalendarSection pengajuanList={pengajuanList} />
          )}

          {activeSection === 'info' && (
            <InfoSection />
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200/80 bg-white py-4 px-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
            <span>Cabang Dinas Pendidikan Wilayah Malang (Kota Malang - Kota Batu)</span>
            <span className="font-mono text-[11px]">v7.2 Aurora Sync · Jawa Timur</span>
          </div>
        </footer>
      </div>

      {/* Modals */}
      <ModalVerifikasi
        pengajuan={selectedPengajuan}
        onClose={() => setSelectedPengajuan(null)}
        onUpdateStatus={handleUpdateStatus}
        onRequestDelete={no => setDeletingNoPengajuan(no)}
        onShowToast={addToast}
      />

      <ModalKonfirmasiHapus
        noPengajuan={deletingNoPengajuan}
        onClose={() => setDeletingNoPengajuan(null)}
        onConfirmDelete={handleConfirmDelete}
        onShowToast={addToast}
      />

      <ModalTambahGuru
        isOpen={isAddGuruOpen}
        onClose={() => setIsAddGuruOpen(false)}
        onSaveGuru={handleSaveGuru}
        onShowToast={addToast}
      />

      <ModalBulkUpload
        isOpen={isBulkUploadOpen}
        onClose={() => setIsBulkUploadOpen(false)}
        onBulkUploaded={handleBulkUploaded}
        onShowToast={addToast}
      />

      <CodeExportModal
        isOpen={isCodeExportOpen}
        onClose={() => setIsCodeExportOpen(false)}
        onShowToast={addToast}
      />
    </div>
  );
}
