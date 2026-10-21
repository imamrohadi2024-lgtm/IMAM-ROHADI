export type UserRole = 'cabdin' | 'sekolah';

export interface UserSession {
  role: UserRole;
  nama: string;
  unitKerja: string;
  username: string;
}

export interface Sekolah {
  no: number;
  npsn: string;
  nama: string;
  jenjang: 'SMA' | 'SMK' | 'SLB';
  kota: 'Kota Malang' | 'Kota Batu';
}

export interface Guru {
  nip: string;
  nama: string;
  jk: 'L' | 'P';
  status: 'PNS' | 'PPPK' | 'PPPK Paruh Waktu';
  golRuang: string;
  sekolah: string;
}

export type StatusPengajuan = 'Menunggu Verifikasi' | 'Disetujui' | 'Ditolak' | 'Perlu Revisi';

export type JenisCuti =
  | 'Cuti Tahunan'
  | 'Cuti Besar'
  | 'Cuti Sakit'
  | 'Cuti Melahirkan'
  | 'Cuti Karena Alasan Penting'
  | 'Cuti di Luar Tanggungan Negara'
  | 'Cuti Bersama';

export interface PengajuanCuti {
  no: number;
  tanggal: string; // dd-MM-yyyy
  tanggalPengajuan?: string;
  nip: string;
  nama: string;
  jabatan: string;
  unitKerja: string;
  jenisCuti: JenisCuti;
  alasan: string;
  tanggalMulai: string; // dd-MM-yyyy or yyyy-MM-dd
  tanggalSelesai: string; // dd-MM-yyyy or yyyy-MM-dd
  lamaCuti: number;
  alamat: string;
  noHP: string;
  statusKepegawaian: string;
  status: StatusPengajuan;
  catatan?: string;
  atasanLangsung: string;
  nipAtasanLangsung: string;
  tglVerifikasi?: string;
  verifikator?: string;
  email?: string;
  calendarEventId?: string;
  dokumenList?: DokumenCuti[];
}

export interface DokumenCuti {
  no: number;
  tanggal: string;
  nip: string;
  nama: string;
  unitKerja: string;
  jenisDokumen: string;
  noPengajuan: number | string;
  fileName: string;
  fileType: string;
  ukuran: string;
  link: string;
  keterangan?: string;
}

export interface StatusHistoryItem {
  id: string;
  timestamp: string;
  noPengajuan: number | string;
  statusLama: string;
  statusBaru: string;
  catatan: string;
  aktor: string;
}

export interface InfoCutiItem {
  nama: JenisCuti;
  untuk: string;
  jumlah: string;
  dasarHukum: string;
  syarat: string[];
  dokumen: string[];
  catatan: string;
}

export interface KuotaCutiResult {
  nip: string;
  nama: string;
  sekolah: string;
  statusKepegawaian: string;
  tahun: number;
  kuotaDasar: number;
  sisaTahunLalu: number;
  sisaDuaTahunLalu: number;
  kuotaTotal: number;
  terpakai: number;
  pending: number;
  sisa: number;
  diminta: number;
  melebihi: boolean;
  keterangan: string;
}
