import React, { useState } from 'react';
import { PengajuanCuti, Guru, StatusPengajuan, StatusHistoryItem } from '../types';
import { DAFTAR_SEKOLAH } from '../data/mockData';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Trash2, 
  History, 
  Upload, 
  FileText, 
  Calendar, 
  User, 
  Building, 
  Phone, 
  Mail, 
  ExternalLink,
  ShieldAlert,
  Send,
  Download
} from 'lucide-react';

/* ═══ 1. MODAL VERIFIKASI PENGAJUAN ═══ */
interface ModalVerifikasiProps {
  pengajuan: PengajuanCuti | null;
  onClose: () => void;
  onUpdateStatus: (no: number, status: StatusPengajuan, catatan: string) => void;
  onRequestDelete: (no: number) => void;
  onShowToast: (msg: string, type: 'success' | 'error' | 'warning' | 'info') => void;
}

export const ModalVerifikasi: React.FC<ModalVerifikasiProps> = ({
  pengajuan,
  onClose,
  onUpdateStatus,
  onRequestDelete,
  onShowToast,
}) => {
  if (!pengajuan) return null;

  const [keputusan, setKeputusan] = useState<StatusPengajuan>(pengajuan.status);
  const [catatan, setCatatan] = useState(pengajuan.catatan || '');
  const [showHistory, setShowHistory] = useState(false);
  const [eMasterUploaded, setEMasterUploaded] = useState(false);
  const [suratIjinUploaded, setSuratIjinUploaded] = useState(false);

  const canDelete = pengajuan.status === 'Menunggu Verifikasi';

  const handleSimpan = () => {
    if (!keputusan) {
      onShowToast('Pilih keputusan status terlebih dahulu', 'warning');
      return;
    }
    if ((keputusan === 'Ditolak' || keputusan === 'Perlu Revisi') && !catatan.trim()) {
      onShowToast(`Catatan wajib diisi untuk status "${keputusan}"!`, 'warning');
      return;
    }
    onUpdateStatus(pengajuan.no, keputusan, catatan.trim());
    onClose();
  };

  const handleUploadBerkas = (jenis: 'E-Master' | 'Surat Ijin Cuti') => {
    if (jenis === 'E-Master') {
      setEMasterUploaded(true);
      onShowToast('Berkas E-Master berhasil diunggah & notifikasi dikirim ke ASN!', 'success');
    } else {
      setSuratIjinUploaded(true);
      onShowToast('Surat Ijin Cuti resmi berhasil diunggah & dikirim via WA/Email!', 'success');
    }
  };

  return (
    <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm active">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 dark:border dark:border-slate-800">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-slate-900 dark:text-white">
                Verifikasi Pengajuan Cuti #{pengajuan.no}
              </span>
              <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-[11px] font-bold text-sky-800 dark:bg-sky-950/80 dark:text-sky-300">
                Diajukan: {pengajuan.tanggalPengajuan || pengajuan.tanggal}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Cabang Dinas Pendidikan Wilayah Malang · Data sinkron dengan Spreadsheet
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 py-4 text-xs">
          {/* Tanggal Pengajuan & Periode Banner */}
          <div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-4 dark:border-sky-900 dark:bg-sky-950/40">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sky-950 dark:text-sky-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-400 block">
                  Tanggal Pengajuan Masuk
                </span>
                <strong className="text-sm font-bold">{pengajuan.tanggalPengajuan || pengajuan.tanggal} (WIB)</strong>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-400 block">
                  Periode Pelaksanaan Cuti
                </span>
                <strong className="text-sm font-bold text-primary-700 dark:text-sky-300">
                  {pengajuan.tanggalMulai} s.d. {pengajuan.tanggalSelesai} ({pengajuan.lamaCuti} hari kerja)
                </strong>
              </div>
            </div>
          </div>

          {/* Data Pemohon Card */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-800/40 space-y-2">
            <div className="font-bold text-slate-800 dark:text-white flex items-center gap-1.5 text-xs">
              <User className="h-4 w-4 text-primary-700 dark:text-sky-400" />
              Data Pegawai Pemohon
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 dark:text-slate-300">
              <div>Nama: <strong className="text-slate-900 dark:text-white">{pengajuan.nama}</strong></div>
              <div>NIP: <span className="font-mono font-semibold">{pengajuan.nip}</span></div>
              <div>Unit Kerja: <span className="font-semibold">{pengajuan.unitKerja}</span></div>
              <div>Status / Jabatan: {pengajuan.statusKepegawaian} · {pengajuan.jabatan}</div>
              <div>WhatsApp: <span className="font-mono">{pengajuan.noHP}</span></div>
              <div>Email: {pengajuan.email || '-'}</div>
              <div className="sm:col-span-2">Alamat Cuti: {pengajuan.alamat}</div>
              <div className="sm:col-span-2">Alasan Cuti: <em className="text-slate-800 dark:text-slate-200">"{pengajuan.alasan}"</em></div>
              <div className="sm:col-span-2 pt-1 border-t border-slate-200 dark:border-slate-700">
                Atasan Langsung: <strong>{pengajuan.atasanLangsung}</strong> (NIP: <span className="font-mono">{pengajuan.nipAtasanLangsung}</span>)
              </div>
            </div>
          </div>

          {/* Berkas Verifikasi Cabdin */}
          <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800 space-y-2.5">
            <div className="font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
              <Upload className="h-4 w-4 text-primary-700 dark:text-sky-400" />
              Unggah Berkas Resmi Cabdin & Terbitkan Ijin
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-dashed border-slate-200 p-3 bg-white dark:border-slate-700 dark:bg-slate-800">
                <div className="font-semibold text-slate-700 dark:text-slate-200 mb-1">Unggah E-Master</div>
                {eMasterUploaded ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                    <CheckCircle2 className="h-3.5 w-3.5" /> E-Master Terunggah & Tervalidasi
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleUploadBerkas('E-Master')}
                    className="btn btn-sm btn-info w-full"
                  >
                    Unggah E-Master
                  </button>
                )}
              </div>

              <div className="rounded-xl border border-dashed border-slate-200 p-3 bg-white dark:border-slate-700 dark:bg-slate-800">
                <div className="font-semibold text-slate-700 dark:text-slate-200 mb-1">Surat Ijin Cuti Resmi</div>
                {suratIjinUploaded ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Surat Ijin Diterbitkan & Terkirim
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleUploadBerkas('Surat Ijin Cuti')}
                    className="btn btn-sm btn-success w-full"
                  >
                    Unggah & Terbitkan Surat
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Form Keputusan */}
          <div className="space-y-3">
            <div>
              <label className="label">Keputusan Verifikator Cabdin *</label>
              <select
                value={keputusan}
                onChange={e => setKeputusan(e.target.value as StatusPengajuan)}
                className="input font-bold"
              >
                <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                <option value="Disetujui">Disetujui</option>
                <option value="Ditolak">Ditolak</option>
                <option value="Perlu Revisi">Perlu Revisi</option>
              </select>
            </div>

            <div>
              <label className="label">
                Catatan / Keterangan Resmi <span className="text-slate-400 font-normal">(Wajib bila Ditolak / Perlu Revisi)</span>
              </label>
              <textarea
                rows={2}
                value={catatan}
                onChange={e => setCatatan(e.target.value)}
                placeholder="Berikan alasan atau instruksi revisi bila ada..."
                className="input"
              />
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <div>
            {canDelete && (
              <button
                type="button"
                onClick={() => {
                  onRequestDelete(pengajuan.no);
                  onClose();
                }}
                className="btn btn-danger btn-sm"
              >
                <Trash2 className="h-3.5 w-3.5" /> Hapus Pengajuan
              </button>
            )}
          </div>
          <div className="flex gap-2.5 ml-auto">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Batal
            </button>
            <button type="button" onClick={handleSimpan} className="btn btn-primary">
              <CheckCircle2 className="h-3.5 w-3.5" /> Simpan Keputusan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══ 2. MODAL KONFIRMASI HAPUS PENGAJUAN ═══ */
interface ModalKonfirmasiHapusProps {
  noPengajuan: number | null;
  onClose: () => void;
  onConfirmDelete: (no: number, alasan: string) => void;
  onShowToast: (msg: string, type: 'success' | 'error' | 'warning' | 'info') => void;
}

export const ModalKonfirmasiHapus: React.FC<ModalKonfirmasiHapusProps> = ({
  noPengajuan,
  onClose,
  onConfirmDelete,
  onShowToast,
}) => {
  if (!noPengajuan) return null;

  const [alasan, setAlasan] = useState('');
  const [konfirmasiText, setKonfirmasiText] = useState('');

  const handleProses = () => {
    if (!alasan.trim() || alasan.length < 5) {
      onShowToast('Alasan penghapusan minimal 5 karakter', 'warning');
      return;
    }
    if (konfirmasiText.trim().toUpperCase() !== 'HAPUS') {
      onShowToast('Ketik kata "HAPUS" secara persis untuk konfirmasi', 'error');
      return;
    }
    onConfirmDelete(noPengajuan, alasan.trim());
    onClose();
  };

  return (
    <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm active">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 dark:border dark:border-slate-800 text-xs">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
          <Trash2 className="h-7 w-7" />
        </div>
        <h3 className="mt-3 text-center text-sm font-bold text-slate-900 dark:text-white">
          Konfirmasi Hapus Pengajuan #{noPengajuan}
        </h3>
        <p className="mt-1 text-center text-slate-500 dark:text-slate-400 leading-relaxed">
          Tindakan ini akan menghapus entri pengajuan cuti secara permanen dari pangkalan data. Berkas pendukung di Google Drive tetap disimpan untuk keperluan audit.
        </p>

        <div className="mt-4 space-y-3">
          <div>
            <label className="label">Alasan Penghapusan *</label>
            <textarea
              rows={2}
              value={alasan}
              onChange={e => setAlasan(e.target.value)}
              placeholder="Contoh: Pengajuan ganda / salah input tanggal..."
              className="input"
            />
          </div>
          <div>
            <label className="label">
              Ketik <span className="text-rose-600 font-bold">HAPUS</span> untuk melanjutkan
            </label>
            <input
              type="text"
              value={konfirmasiText}
              onChange={e => setKonfirmasiText(e.target.value)}
              placeholder="HAPUS"
              className="input font-mono font-bold uppercase tracking-wider text-center"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2.5">
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Batal
          </button>
          <button type="button" onClick={handleProses} className="btn btn-danger">
            Hapus Pengajuan
          </button>
        </div>
      </div>
    </div>
  );
};

/* ═══ 3. MODAL TAMBAH GURU ═══ */
interface ModalTambahGuruProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveGuru: (guru: Guru) => void;
  onShowToast: (msg: string, type: 'success' | 'error' | 'warning' | 'info') => void;
}

export const ModalTambahGuru: React.FC<ModalTambahGuruProps> = ({
  isOpen,
  onClose,
  onSaveGuru,
  onShowToast,
}) => {
  if (!isOpen) return null;

  const [nip, setNip] = useState('');
  const [nama, setNama] = useState('');
  const [jk, setJk] = useState<'L' | 'P'>('L');
  const [status, setStatus] = useState<'PNS' | 'PPPK' | 'PPPK Paruh Waktu'>('PNS');
  const [golRuang, setGolRuang] = useState('III/a');
  const [sekolah, setSekolah] = useState(DAFTAR_SEKOLAH[3].nama);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nip.trim() || !nama.trim() || !sekolah) {
      onShowToast('NIP, Nama, dan Sekolah wajib diisi', 'warning');
      return;
    }
    onSaveGuru({ nip: nip.trim(), nama: nama.trim(), jk, status, golRuang, sekolah });
    onClose();
  };

  return (
    <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm active">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 dark:border dark:border-slate-800 text-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <User className="h-4 w-4 text-primary-700 dark:text-sky-400" />
            Tambah Data Guru / ASN Baru
          </h3>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:text-slate-600">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">NIP ASN *</label>
            <input
              type="text"
              value={nip}
              onChange={e => setNip(e.target.value)}
              placeholder="198201182006042011"
              className="input font-mono"
              required
            />
          </div>
          <div>
            <label className="label">Nama Lengkap & Gelar *</label>
            <input
              type="text"
              value={nama}
              onChange={e => setNama(e.target.value)}
              placeholder="Drs. Ahmad Fauzi, M.Pd."
              className="input"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Jenis Kelamin</label>
              <select value={jk} onChange={e => setJk(e.target.value as 'L' | 'P')} className="input">
                <option value="L">Laki-laki (L)</option>
                <option value="P">Perempuan (P)</option>
              </select>
            </div>
            <div>
              <label className="label">Status Kepegawaian</label>
              <select value={status} onChange={e => setStatus(e.target.value as any)} className="input">
                <option value="PNS">PNS</option>
                <option value="PPPK">PPPK</option>
                <option value="PPPK Paruh Waktu">PPPK Paruh Waktu</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Golongan Ruang</label>
              <input
                type="text"
                value={golRuang}
                onChange={e => setGolRuang(e.target.value)}
                placeholder="III/a / IV/a / IX"
                className="input"
              />
            </div>
            <div>
              <label className="label">Sekolah / Unit Kerja</label>
              <select value={sekolah} onChange={e => setSekolah(e.target.value)} className="input">
                {DAFTAR_SEKOLAH.map(s => (
                  <option key={s.no} value={s.nama}>
                    {s.nama} ({s.kota})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              Simpan Data Guru
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ═══ 4. MODAL BULK UPLOAD CSV DATA GURU ═══ */
interface ModalBulkUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onBulkUploaded: (count: number) => void;
  onShowToast: (msg: string, type: 'success' | 'error' | 'warning' | 'info') => void;
}

export const ModalBulkUpload: React.FC<ModalBulkUploadProps> = ({
  isOpen,
  onClose,
  onBulkUploaded,
  onShowToast,
}) => {
  if (!isOpen) return null;

  const [selectedFileName, setSelectedFileName] = useState('');
  const [parsedCount, setParsedCount] = useState<number | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith('.csv')) {
      onShowToast('File harus berekstensi .csv', 'error');
      return;
    }
    setSelectedFileName(file.name);
    setParsedCount(18); // Simulated parsed rows
  };

  const handleProses = () => {
    if (!parsedCount) {
      onShowToast('Pilih berkas CSV terlebih dahulu', 'warning');
      return;
    }
    onBulkUploaded(parsedCount);
    onShowToast(`Berhasil mengunggah ${parsedCount} data guru ke database!`, 'success');
    onClose();
  };

  const downloadTemplate = () => {
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
    <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm active">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 dark:border dark:border-slate-800 text-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Upload className="h-4 w-4 text-primary-700 dark:text-sky-400" />
            Bulk Upload Data Guru (.csv)
          </h3>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:text-slate-600">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="rounded-xl border border-sky-100 bg-sky-50/80 p-3 text-sky-900 dark:border-sky-900/40 dark:bg-sky-950/40 dark:text-sky-200">
          Gunakan file CSV ber-encoding UTF-8 dengan format kolom: <strong>NIP, Nama, Jenis Kelamin, Status, Golongan Ruang, Sekolah</strong>.
          <div className="mt-2">
            <button
              type="button"
              onClick={downloadTemplate}
              className="font-bold underline text-primary-700 hover:text-primary-800 dark:text-sky-300"
            >
              📥 Unduh Template CSV Resmi di Sini
            </button>
          </div>
        </div>

        <div className="mt-4">
          <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/50">
            <Upload className="h-8 w-8 text-slate-400 mb-2" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {selectedFileName || 'Klik untuk memilih file .csv atau Drag & Drop'}
            </span>
            <span className="text-[10px] text-slate-400 mt-1">Maksimal 500 baris / 2 MB per berkas</span>
            <input type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
          </label>
        </div>

        {parsedCount && (
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
            ✓ Berkas siap diunggah: <strong>{parsedCount} data guru</strong> terdeteksi valid.
          </div>
        )}

        <div className="mt-5 flex justify-end gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Batal
          </button>
          <button
            type="button"
            disabled={!parsedCount}
            onClick={handleProses}
            className="btn btn-primary"
          >
            Upload Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};
