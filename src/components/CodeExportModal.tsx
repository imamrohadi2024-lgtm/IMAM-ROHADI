import React, { useState } from 'react';
import { FIXED_CODE_GS, FIXED_INDEX_HTML } from '../data/fixedAppsScript';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  FileCode, 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  Terminal,
  ExternalLink
} from 'lucide-react';

interface CodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string, type: 'success' | 'error' | 'warning' | 'info') => void;
}

export const CodeExportModal: React.FC<CodeExportModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'codegs' | 'indexhtml' | 'panduan'>('codegs');
  const [copiedGs, setCopiedGs] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);

  const handleCopy = (type: 'gs' | 'html') => {
    const text = type === 'gs' ? FIXED_CODE_GS : FIXED_INDEX_HTML;
    navigator.clipboard.writeText(text);
    if (type === 'gs') {
      setCopiedGs(true);
      setTimeout(() => setCopiedGs(false), 2500);
      onShowToast('Kode "Code.gs" berhasil disalin ke clipboard!', 'success');
    } else {
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2500);
      onShowToast('Kode "Index.html" berhasil disalin ke clipboard!', 'success');
    }
  };

  const handleDownload = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast(`File ${filename} berhasil diunduh!`, 'success');
  };

  return (
    <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-md active">
      <div className="relative flex h-[92vh] w-full max-w-5xl flex-col rounded-3xl bg-white shadow-2xl dark:bg-slate-900 dark:border dark:border-slate-800 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary-700 to-sky-600 text-white shadow-sm">
              <FileCode className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Kode GS & Index Siap Terapkan (Fixed & Production Ready)
                </h2>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  v7.2 Aurora Sync
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ketik ulang kode backend Google Apps Script dan frontend Index dengan perbaikan sinkronisasi database & zona waktu WIB.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Selector & Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-white px-6 py-2.5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex gap-1.5 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
            <button
              onClick={() => setActiveTab('codegs')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
                activeTab === 'codegs'
                  ? 'bg-white text-primary-700 shadow-xs dark:bg-slate-700 dark:text-sky-300'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              Code.gs (Backend Google Apps Script)
            </button>
            <button
              onClick={() => setActiveTab('indexhtml')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
                activeTab === 'indexhtml'
                  ? 'bg-white text-primary-700 shadow-xs dark:bg-slate-700 dark:text-sky-300'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              Index.html (Frontend Web App)
            </button>
            <button
              onClick={() => setActiveTab('panduan')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
                activeTab === 'panduan'
                  ? 'bg-white text-primary-700 shadow-xs dark:bg-slate-700 dark:text-sky-300'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              Panduan Penerapan (Langkah Demi Langkah)
            </button>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === 'codegs' && (
              <>
                <button
                  onClick={() => handleCopy('gs')}
                  className="btn btn-sm btn-primary"
                >
                  {copiedGs ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedGs ? 'Tersalin!' : 'Salin Code.gs'}
                </button>
                <button
                  onClick={() => handleDownload('Code.gs', FIXED_CODE_GS)}
                  className="btn btn-sm btn-secondary"
                  title="Unduh File Code.gs"
                >
                  <Download className="h-3.5 w-3.5" /> Unduh .gs
                </button>
              </>
            )}

            {activeTab === 'indexhtml' && (
              <>
                <button
                  onClick={() => handleCopy('html')}
                  className="btn btn-sm btn-primary"
                >
                  {copiedHtml ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedHtml ? 'Tersalin!' : 'Salin Index.html'}
                </button>
                <button
                  onClick={() => handleDownload('Index.html', FIXED_INDEX_HTML)}
                  className="btn btn-sm btn-secondary"
                  title="Unduh File Index.html"
                >
                  <Download className="h-3.5 w-3.5" /> Unduh .html
                </button>
              </>
            )}
          </div>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 text-xs">
          {activeTab === 'codegs' && (
            <div className="space-y-4">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-3 text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-200">
                <CheckCircle2 className="h-4 w-4 inline mr-1 text-emerald-600" />
                <strong>Status Kode GS: Fixed & Diuji</strong> · Format tanggal pengajuan dikonversi konsisten ke string <code>dd-MM-yyyy</code> dengan zona waktu WIB (<code>Asia/Jakarta</code>). Format teks NIP aman dari pemangkasan angka nol atau format eksponensial.
              </div>

              <pre className="max-h-[60vh] overflow-auto rounded-2xl bg-slate-950 p-4 font-mono text-[11px] leading-relaxed text-slate-100 dark:bg-black border border-slate-800">
                <code>{FIXED_CODE_GS}</code>
              </pre>
            </div>
          )}

          {activeTab === 'indexhtml' && (
            <div className="space-y-4">
              <div className="rounded-xl border border-sky-200 bg-sky-50/80 p-3 text-sky-900 dark:border-sky-900/60 dark:bg-sky-950/40 dark:text-sky-200">
                <CheckCircle2 className="h-4 w-4 inline mr-1 text-sky-600" />
                <strong>Status Index.html: Fixed & Dipercantik</strong> · Desain antar muka modern berbasis Tailwind CSS, tipografi Plus Jakarta Sans, mode gelap/terang mulus, tampilan tanggal pengajuan akurat pada menu Verifikasi, dan penanganan fallback responsif.
              </div>

              <pre className="max-h-[60vh] overflow-auto rounded-2xl bg-slate-950 p-4 font-mono text-[11px] leading-relaxed text-slate-100 dark:bg-black border border-slate-800">
                <code>{FIXED_INDEX_HTML}</code>
              </pre>
            </div>
          )}

          {activeTab === 'panduan' && (
            <div className="max-w-3xl space-y-6 text-slate-700 dark:text-slate-300">
              <div className="rounded-2xl border border-primary-200 bg-primary-50/60 p-5 dark:border-primary-900/60 dark:bg-primary-950/30">
                <h3 className="text-sm font-bold text-primary-900 dark:text-white flex items-center gap-2 mb-2">
                  <ShieldCheck className="h-5 w-5 text-primary-700 dark:text-sky-400" />
                  Panduan Pemasangan & Penerapan di Google Apps Script
                </h3>
                <p className="text-xs text-primary-800 dark:text-slate-300">
                  Ikuti 5 langkah mudah berikut untuk menerapkan kode yang sudah diperbaiki ke spreadsheet dan web app Anda:
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-700 font-bold text-white text-[11px]">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Buka Proyek Apps Script</h4>
                    <p className="mt-0.5 text-slate-600 dark:text-slate-400">
                      Buka Google Sheets sistem Anda (ID: <code>1djPc_54LiLywARvMi2XAqiL0AafrLGe56NAO1gdWhVA</code>), lalu klik menu <strong>Ekstensi &gt; Apps Script</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-700 font-bold text-white text-[11px]">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Ganti Isi Berkas Code.gs</h4>
                    <p className="mt-0.5 text-slate-600 dark:text-slate-400">
                      Buka file <code>Code.gs</code> di editor Apps Script, hapus seluruh kodenya, lalu <strong>Paste</strong> kode dari tab <em>"Code.gs"</em> di atas. Tekan <strong>Ctrl + S</strong> untuk menyimpan.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-700 font-bold text-white text-[11px]">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Ganti Isi Berkas Index.html</h4>
                    <p className="mt-0.5 text-slate-600 dark:text-slate-400">
                      Di Apps Script, buka berkas HTML bernama <code>Index</code> (jika belum ada, klik tanda <strong>+</strong> lalu pilih <strong>HTML</strong> dan beri nama <code>Index</code>). Hapus isinya, lalu <strong>Paste</strong> kode dari tab <em>"Index.html"</em> di atas.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-700 font-bold text-white text-[11px]">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Jalankan Fungsi Inisialisasi setup()</h4>
                    <p className="mt-0.5 text-slate-600 dark:text-slate-400">
                      Di dropdown fungsi Apps Script, pilih fungsi <code>setup</code> lalu klik <strong>Jalankan (Run)</strong>. Berikan izin akses Google (Otorisasi). Fungsi ini akan memastikan seluruh sheet (Database_Cuti, Data_Guru, Dokumen_Cuti, Status_History) terbuat dan header tersusun rapi.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-700 font-bold text-white text-[11px]">
                    5
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Deploy Versi Baru</h4>
                    <p className="mt-0.5 text-slate-600 dark:text-slate-400">
                      Klik tombol biru <strong>Deploy &gt; Kelola Deployment (Manage deployments)</strong> &gt; klik ikon pensil (Edit) &gt; pilih <strong>Versi Baru (New version)</strong> &gt; klik <strong>Deploy</strong>. Selesai! Web app cuti Anda kini sudah termutakhirkan dengan tampilan modern dan sinkronisasi database fix.
                    </p>
                  </div>
                </div>
              </div>

              {/* Important styling fix notice */}
              <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900/60 dark:bg-sky-950/40 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sky-900 dark:text-sky-200 text-xs">
                  <Sparkles className="h-4 w-4 text-sky-600 shrink-0" />
                  <span>Jaminan Tampilan Rapi 100% (Solusi Tampilan Polos / Broken CSS):</span>
                </div>
                <p className="text-xs text-sky-800 dark:text-sky-300 leading-relaxed">
                  Jika sebelumnya tampilan Web App di <code>script.google.com</code> sempat tampak polos tanpa warna atau tombol bawaan abu-abu, hal itu disebabkan stylesheet eksternal yang diblokir oleh sandbox Google. Berkas <code>Index.html</code> terbaru ini telah diperbaiki dengan <strong>Embedded Native CSS &amp; Inline Fallback</strong>, sehingga tampilan login, dashboard, kartu statistik, dan formulir dijamin <strong>langsung tampil modern, rapi, dan presisi</strong> saat di-deploy!
                </p>
              </div>

              {/* Summary of fixes applied */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/40 space-y-2">
                <div className="font-bold text-slate-800 dark:text-white">
                  Ringkasan Perbaikan yang Sudah Diterapkan di Kode Ini:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Sinkronisasi tanggal pengajuan akurat (dd-MM-yyyy WIB).</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Format NIP disimpan sebagai teks murni tanpa terpotong.</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Audit trail pencatatan status &amp; penghapusan data.</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Bulk upload CSV dengan normalisasi header &amp; validasi sekolah.</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Dukungan dark mode, responsif mobile &amp; tablet.</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Integrasi kalender dan notifikasi WhatsApp Fonnte.</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/70 px-6 py-3 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-800/50">
          <div>
            File tersimpan juga di direktori <code>public/apps-script/Code.gs</code> dan <code>public/apps-script/Index.html</code>
          </div>
          <button onClick={onClose} className="btn btn-secondary btn-sm">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
