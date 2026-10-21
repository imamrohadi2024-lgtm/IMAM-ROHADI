import React, { useState } from 'react';
import { Guru, PengajuanCuti, JenisCuti, KuotaCutiResult } from '../types';
import { HARI_LIBUR_2026 } from '../data/mockData';
import { 
  Search, 
  Send, 
  RefreshCw, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Calendar, 
  User, 
  Building, 
  Phone, 
  Mail,
  ShieldAlert
} from 'lucide-react';

interface PengajuanSectionProps {
  guruList: Guru[];
  onSubmitSuccess: (newPengajuan: PengajuanCuti) => void;
  onShowToast: (msg: string, type: 'success' | 'error' | 'warning' | 'info') => void;
}

export const PengajuanSection: React.FC<PengajuanSectionProps> = ({
  guruList,
  onSubmitSuccess,
  onShowToast,
}) => {
  const [nip, setNip] = useState('');
  const [nama, setNama] = useState('');
  const [statusKepegawaian, setStatusKepegawaian] = useState('');
  const [jabatan, setJabatan] = useState('Guru');
  const [unitKerja, setUnitKerja] = useState('');
  const [nipAtasan, setNipAtasan] = useState('');
  const [namaAtasan, setNamaAtasan] = useState('');
  const [noHP, setNoHP] = useState('');
  const [email, setEmail] = useState('');
  
  const [jenisCuti, setJenisCuti] = useState<JenisCuti>('Cuti Tahunan');
  const [tglMulai, setTglMulai] = useState('');
  const [tglSelesai, setTglSelesai] = useState('');
  const [alamat, setAlamat] = useState('');
  const [alasan, setAlasan] = useState('');
  
  // File upload state
  const [docJenis, setDocJenis] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSizeStr, setFileSizeStr] = useState('');

  // Lookup statuses
  const [nipLookupMsg, setNipLookupMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [atasanLookupMsg, setAtasanLookupMsg] = useState<{ text: string; ok: boolean } | null>(null);

  // Calculate working days
  const calculateDays = (start: string, end: string): number => {
    if (!start || !end) return 0;
    const d1 = new Date(start);
    const d2 = new Date(end);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime()) || d2 < d1) return 0;

    let count = 0;
    const cur = new Date(d1);
    while (cur <= d2) {
      const day = cur.getDay();
      const iso = cur.toISOString().split('T')[0];
      if (day !== 0 && day !== 6 && !HARI_LIBUR_2026.includes(iso)) {
        count++;
      }
      cur.setDate(cur.getDate() + 1);
    }
    return count;
  };

  const lamaCuti = calculateDays(tglMulai, tglSelesai);

  // Lookup pemohon by NIP
  const handleLookupNip = () => {
    const clean = nip.replace(/\s+/g, '').trim();
    if (!clean) {
      setNipLookupMsg({ text: 'Masukkan NIP pemohon', ok: false });
      return;
    }
    const found = guruList.find(g => g.nip.replace(/\s+/g, '').trim() === clean);
    if (found) {
      setNama(found.nama);
      setStatusKepegawaian(found.status);
      setUnitKerja(found.sekolah);
      setNipLookupMsg({ text: `${found.nama} (${found.sekolah})`, ok: true });
    } else {
      setNama('');
      setStatusKepegawaian('');
      setUnitKerja('');
      setNipLookupMsg({ text: 'NIP tidak ditemukan dalam database.', ok: false });
    }
  };

  // Lookup atasan by NIP
  const handleLookupAtasan = () => {
    const clean = nipAtasan.replace(/\s+/g, '').trim();
    if (!clean) {
      setAtasanLookupMsg({ text: 'Masukkan NIP atasan', ok: false });
      return;
    }
    if (clean === nip.replace(/\s+/g, '').trim()) {
      setAtasanLookupMsg({ text: 'NIP Atasan tidak boleh sama dengan NIP pemohon!', ok: false });
      setNamaAtasan('');
      return;
    }
    const found = guruList.find(g => g.nip.replace(/\s+/g, '').trim() === clean);
    if (found) {
      setNamaAtasan(found.nama);
      setAtasanLookupMsg({ text: `${found.nama} (${found.sekolah})`, ok: true });
    } else {
      setNamaAtasan('');
      setAtasanLookupMsg({ text: 'NIP Atasan tidak terdaftar di database.', ok: false });
    }
  };

  // Compute Quota Info
  const isPNS = statusKepegawaian === 'PNS';
  const isPPPK = statusKepegawaian.includes('PPPK');
  const kuotaTotal = isPNS ? 18 : 12; // Example: PNS with 6 days carryover = 18 days
  const terpakai = 3;
  const sisa = Math.max(0, kuotaTotal - terpakai);
  const exceeds = jenisCuti === 'Cuti Tahunan' && lamaCuti > sisa;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      onShowToast('Ukuran file maksimal 5 MB', 'warning');
      return;
    }
    setFileName(file.name);
    setFileSizeStr(`${(file.size / (1024 * 1024)).toFixed(2)} MB`);
    onShowToast(`File ${file.name} berhasil dilampirkan`, 'info');
  };

  const handleReset = () => {
    setNip('');
    setNama('');
    setStatusKepegawaian('');
    setJabatan('Guru');
    setUnitKerja('');
    setNipAtasan('');
    setNamaAtasan('');
    setNoHP('');
    setEmail('');
    setTglMulai('');
    setTglSelesai('');
    setAlamat('');
    setAlasan('');
    setFileName('');
    setFileSizeStr('');
    setDocJenis('');
    setNipLookupMsg(null);
    setAtasanLookupMsg(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nip || !nama) {
      onShowToast('Cari dan pastikan NIP pemohon terdaftar', 'warning');
      return;
    }
    if (!nipAtasan || !namaAtasan) {
      onShowToast('Cari dan pastikan NIP atasan langsung terdaftar', 'warning');
      return;
    }
    if (!tglMulai || !tglSelesai) {
      onShowToast('Tentukan tanggal mulai dan selesai cuti', 'warning');
      return;
    }
    if (lamaCuti <= 0) {
      onShowToast('Durasi hari kerja efektif 0 hari! Periksa tanggal.', 'warning');
      return;
    }
    if (exceeds) {
      onShowToast(`Pengajuan melebihi sisa cuti tahunan (${sisa} hari kerja)!`, 'error');
      return;
    }
    if (!alamat.trim() || !alasan.trim() || !noHP.trim()) {
      onShowToast('Mohon lengkapi alamat, alasan, dan No HP', 'warning');
      return;
    }

    const today = new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date()).replace(/\//g, '-');

    const newObj: PengajuanCuti = {
      no: Math.floor(100 + Math.random() * 900),
      tanggal: today,
      tanggalPengajuan: today,
      nip,
      nama,
      jabatan,
      unitKerja,
      jenisCuti,
      alasan,
      tanggalMulai: tglMulai,
      tanggalSelesai: tglSelesai,
      lamaCuti,
      alamat,
      noHP,
      statusKepegawaian,
      status: 'Menunggu Verifikasi',
      atasanLangsung: namaAtasan,
      nipAtasanLangsung: nipAtasan,
      email: email || undefined,
      dokumenList: fileName ? [{
        no: 1,
        tanggal: today,
        nip,
        nama,
        unitKerja,
        jenisDokumen: docJenis || 'Berkas Pendukung',
        noPengajuan: 0,
        fileName,
        fileType: 'application/pdf',
        ukuran: fileSizeStr || '1.2 MB',
        link: 'https://drive.google.com'
      }] : []
    };

    onSubmitSuccess(newObj);
    onShowToast(`Pengajuan No. #${newObj.no} berhasil dikirim ke database!`, 'success');
    handleReset();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-100 pb-4 mb-6 dark:border-slate-800">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
            Formulir Pengajuan Cuti ASN
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Data pemohon diverifikasi langsung dengan pangkalan data resmi Cabdin Pendidikan Wilayah Malang.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bagian 1: Data Pemohon */}
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-primary-700 dark:text-sky-400 flex items-center gap-1.5">
              <User className="h-4 w-4" /> 1. Data Pemohon ASN
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">NIP / NRK Pemohon *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={nip}
                    onChange={e => setNip(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleLookupNip())}
                    placeholder="Contoh: 198201182006042011"
                    className="input font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleLookupNip}
                    className="btn btn-info shrink-0 px-3"
                    title="Cari NIP"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </div>
                {nipLookupMsg && (
                  <p className={`mt-1 text-[11px] font-medium ${nipLookupMsg.ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                    {nipLookupMsg.text}
                  </p>
                )}
              </div>

              <div>
                <label className="label">Nama Lengkap (Otomatis dari DB)</label>
                <input
                  type="text"
                  value={nama}
                  readOnly
                  placeholder="Klik tombol cari NIP"
                  className="input bg-slate-50 text-slate-700 dark:bg-slate-800/80 dark:text-slate-300 font-semibold cursor-not-allowed"
                />
              </div>

              <div>
                <label className="label">Status Kepegawaian (Otomatis)</label>
                <input
                  type="text"
                  value={statusKepegawaian}
                  readOnly
                  placeholder="PNS / PPPK"
                  className="input bg-slate-50 text-slate-700 dark:bg-slate-800/80 dark:text-slate-300 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="label">Jabatan *</label>
                <input
                  type="text"
                  value={jabatan}
                  onChange={e => setJabatan(e.target.value)}
                  placeholder="Guru Ahli Madya / Kasubag TU"
                  className="input"
                />
              </div>

              <div className="md:col-span-2">
                <label className="label">Unit Kerja / Sekolah (Otomatis)</label>
                <input
                  type="text"
                  value={unitKerja}
                  readOnly
                  placeholder="Unit sekolah terdaftar"
                  className="input bg-slate-50 text-slate-700 dark:bg-slate-800/80 dark:text-slate-300 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="label">NIP Atasan Langsung *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={nipAtasan}
                    onChange={e => setNipAtasan(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleLookupAtasan())}
                    placeholder="Ketik NIP Atasan"
                    className="input font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleLookupAtasan}
                    className="btn btn-info shrink-0 px-3"
                    title="Cari NIP Atasan"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </div>
                {atasanLookupMsg && (
                  <p className={`mt-1 text-[11px] font-medium ${atasanLookupMsg.ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                    {atasanLookupMsg.text}
                  </p>
                )}
              </div>

              <div>
                <label className="label">Nama Atasan Langsung</label>
                <input
                  type="text"
                  value={namaAtasan}
                  readOnly
                  placeholder="Nama Kepala Sekolah / Kasubag"
                  className="input bg-slate-50 text-slate-700 dark:bg-slate-800/80 dark:text-slate-300 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="label">No. WhatsApp / HP Aktif *</label>
                <input
                  type="text"
                  value={noHP}
                  onChange={e => setNoHP(e.target.value)}
                  placeholder="081234567890"
                  className="input font-mono"
                />
              </div>

              <div>
                <label className="label">Email Pemohon</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* Bagian 2: Detail Cuti */}
          <div className="border-t border-slate-100 pt-5 dark:border-slate-800">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-primary-700 dark:text-sky-400 flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> 2. Rincian & Periode Cuti
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Jenis Cuti *</label>
                <select
                  value={jenisCuti}
                  onChange={e => setJenisCuti(e.target.value as JenisCuti)}
                  className="input font-medium"
                >
                  <option value="Cuti Tahunan">Cuti Tahunan</option>
                  <option value="Cuti Sakit">Cuti Sakit</option>
                  <option value="Cuti Melahirkan">Cuti Melahirkan</option>
                  <option value="Cuti Karena Alasan Penting">Cuti Karena Alasan Penting</option>
                  <option value="Cuti Besar">Cuti Besar</option>
                  <option value="Cuti di Luar Tanggungan Negara">Cuti di Luar Tanggungan Negara</option>
                  <option value="Cuti Bersama">Cuti Bersama</option>
                </select>
              </div>

              <div>
                <label className="label">Estimasi Durasi Hari Kerja</label>
                <input
                  type="text"
                  value={`${lamaCuti} hari kerja efektif`}
                  readOnly
                  className="input bg-slate-50 font-bold tabular-nums text-primary-800 dark:bg-slate-800/80 dark:text-sky-300 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="label">Tanggal Mulai Cuti *</label>
                <input
                  type="date"
                  value={tglMulai}
                  onChange={e => setTglMulai(e.target.value)}
                  className="input"
                />
              </div>

              <div>
                <label className="label">Tanggal Selesai Cuti *</label>
                <input
                  type="date"
                  value={tglSelesai}
                  onChange={e => setTglSelesai(e.target.value)}
                  className="input"
                />
              </div>

              <div className="md:col-span-2">
                <label className="label">Alamat Selama Menjalani Cuti *</label>
                <input
                  type="text"
                  value={alamat}
                  onChange={e => setAlamat(e.target.value)}
                  placeholder="Jl. Raya Malang No. 123, RT/RW, Kecamatan, Kota"
                  className="input"
                />
              </div>

              <div className="md:col-span-2">
                <label className="label">Alasan Lengkap Permohonan Cuti *</label>
                <textarea
                  rows={3}
                  value={alasan}
                  onChange={e => setAlasan(e.target.value)}
                  placeholder="Jelaskan keperluan cuti secara spesifik..."
                  className="input"
                />
              </div>
            </div>

            {/* Quota Panel for Cuti Tahunan */}
            {jenisCuti === 'Cuti Tahunan' && nama && (
              <div className={`mt-4 rounded-xl border p-4 text-xs transition ${
                exceeds
                  ? 'border-rose-300 bg-rose-50 text-rose-900 dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-200'
                  : 'border-sky-200 bg-sky-50 text-sky-900 dark:border-sky-800 dark:bg-sky-950/50 dark:text-sky-200'
              }`}>
                <div className="font-bold flex items-center gap-1.5">
                  {exceeds ? <ShieldAlert className="h-4 w-4 text-rose-600" /> : <CheckCircle2 className="h-4 w-4 text-sky-600" />}
                  Audit Kuota Cuti Tahunan 2026 — {nama} ({statusKepegawaian})
                </div>
                <div className="mt-1.5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center pt-2 border-t border-current/10">
                  <div>
                    <span className="block text-[10px] text-slate-500">Kuota Total</span>
                    <strong className="text-sm tabular-nums">{kuotaTotal} hr</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500">Terpakai</span>
                    <strong className="text-sm tabular-nums">{terpakai} hr</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500">Sisa Kuota</span>
                    <strong className={`text-sm tabular-nums ${sisa > 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700'}`}>{sisa} hr</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500">Diminta</span>
                    <strong className={`text-sm tabular-nums ${exceeds ? 'text-rose-600' : 'text-slate-800 dark:text-white'}`}>{lamaCuti} hr</strong>
                  </div>
                </div>
                {exceeds && (
                  <p className="mt-2 text-[11px] font-semibold text-rose-700 dark:text-rose-300">
                    ⚠️ Peringatan: Pengajuan melebihi sisa kuota yang tersedia ({sisa} hari kerja)!
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Bagian 3: Dokumen Pendukung */}
          <div className="border-t border-slate-100 pt-5 dark:border-slate-800">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-primary-700 dark:text-sky-400 flex items-center gap-1.5">
              <FileText className="h-4 w-4" /> 3. Dokumen Pendukung (Opsional)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Kategori Dokumen</label>
                <select
                  value={docJenis}
                  onChange={e => setDocJenis(e.target.value)}
                  className="input"
                >
                  <option value="">-- Pilih Jenis Dokumen --</option>
                  <option value="Surat Permohonan Cuti">Surat Permohonan Cuti</option>
                  <option value="Surat Keterangan Dokter">Surat Keterangan Dokter</option>
                  <option value="Surat Nikah">Surat Nikah</option>
                  <option value="Akte Kelahiran Anak">Akte Kelahiran Anak</option>
                  <option value="Surat Kematian Keluarga">Surat Kematian Keluarga</option>
                  <option value="Lainnya">Dokumen Lainnya</option>
                </select>
              </div>

              <div>
                <label className="label">Pilih Berkas (.pdf, .jpg, .png maks 5 MB)</label>
                <label className="flex h-10 w-full cursor-pointer items-center justify-between rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 text-xs text-slate-500 hover:border-primary-500 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
                  <span className="truncate">{fileName || 'Klik untuk memilih file'}</span>
                  <Upload className="h-4 w-4 shrink-0 text-slate-400" />
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileSelect}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-secondary"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Reset Form
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              <Send className="h-3.5 w-3.5" /> Kirim Pengajuan Cuti
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
