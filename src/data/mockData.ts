import { Sekolah, Guru, PengajuanCuti, InfoCutiItem } from '../types';

export const HARI_LIBUR_2026 = [
  '2026-01-01', '2026-02-17', '2026-03-19', '2026-03-20', '2026-03-21',
  '2026-04-03', '2026-05-01', '2026-05-14', '2026-05-27', '2026-05-31',
  '2026-06-01', '2026-06-16', '2026-08-17', '2026-08-25', '2026-12-25'
];

export const DAFTAR_SEKOLAH: Sekolah[] = [
  { no: 1, npsn: '20533639', nama: 'SLB A,B,D NEGERI KEDUNGKANDANG KOTA MALANG', jenjang: 'SLB', kota: 'Kota Malang' },
  { no: 2, npsn: '20533640', nama: 'SLB C AUTIS NEGERI KEDUNGKANDANG KOTA MALANG', jenjang: 'SLB', kota: 'Kota Malang' },
  { no: 3, npsn: '20539749', nama: 'SLB NEGERI', jenjang: 'SLB', kota: 'Kota Malang' },
  { no: 4, npsn: '20533639', nama: 'SMA NEGERI 1 KOTA MALANG', jenjang: 'SMA', kota: 'Kota Malang' },
  { no: 5, npsn: '20533640', nama: 'SMA NEGERI 2 KOTA MALANG', jenjang: 'SMA', kota: 'Kota Malang' },
  { no: 6, npsn: '20533641', nama: 'SMA NEGERI 3 KOTA MALANG', jenjang: 'SMA', kota: 'Kota Malang' },
  { no: 7, npsn: '20533642', nama: 'SMA NEGERI 4 KOTA MALANG', jenjang: 'SMA', kota: 'Kota Malang' },
  { no: 8, npsn: '20533643', nama: 'SMA NEGERI 5 KOTA MALANG', jenjang: 'SMA', kota: 'Kota Malang' },
  { no: 9, npsn: '20533644', nama: 'SMA NEGERI 6 KOTA MALANG', jenjang: 'SMA', kota: 'Kota Malang' },
  { no: 10, npsn: '20533645', nama: 'SMA NEGERI 7 KOTA MALANG', jenjang: 'SMA', kota: 'Kota Malang' },
  { no: 11, npsn: '20533646', nama: 'SMA NEGERI 8 KOTA MALANG', jenjang: 'SMA', kota: 'Kota Malang' },
  { no: 12, npsn: '20533647', nama: 'SMA NEGERI 9 KOTA MALANG', jenjang: 'SMA', kota: 'Kota Malang' },
  { no: 13, npsn: '20533648', nama: 'SMA NEGERI 10 KOTA MALANG', jenjang: 'SMA', kota: 'Kota Malang' },
  { no: 14, npsn: '20533649', nama: 'SMA NEGERI TARUNA NALA JAWA TIMUR', jenjang: 'SMA', kota: 'Kota Malang' },
  { no: 15, npsn: '20533650', nama: 'SMKN 1 MALANG', jenjang: 'SMK', kota: 'Kota Malang' },
  { no: 16, npsn: '20533651', nama: 'SMKN 2 MALANG', jenjang: 'SMK', kota: 'Kota Malang' },
  { no: 17, npsn: '20533652', nama: 'SMKN 3 MALANG', jenjang: 'SMK', kota: 'Kota Malang' },
  { no: 18, npsn: '20533653', nama: 'SMKN 4 MALANG', jenjang: 'SMK', kota: 'Kota Malang' },
  { no: 19, npsn: '20533654', nama: 'SMKN 5 MALANG', jenjang: 'SMK', kota: 'Kota Malang' },
  { no: 20, npsn: '20533655', nama: 'SMKN 6 MALANG', jenjang: 'SMK', kota: 'Kota Malang' },
  { no: 21, npsn: '20533656', nama: 'SMKN 7 MALANG', jenjang: 'SMK', kota: 'Kota Malang' },
  { no: 22, npsn: '20533657', nama: 'SMKN 8 MALANG', jenjang: 'SMK', kota: 'Kota Malang' },
  { no: 23, npsn: '20533658', nama: 'SMKN 9 MALANG', jenjang: 'SMK', kota: 'Kota Malang' },
  { no: 24, npsn: '20533659', nama: 'SMKN 10 MALANG', jenjang: 'SMK', kota: 'Kota Malang' },
  { no: 25, npsn: '20533660', nama: 'SMKN 11 MALANG', jenjang: 'SMK', kota: 'Kota Malang' },
  { no: 26, npsn: '20533661', nama: 'SMKN 12 MALANG', jenjang: 'SMK', kota: 'Kota Malang' },
  { no: 27, npsn: '20533662', nama: 'SMKN 13 MALANG', jenjang: 'SMK', kota: 'Kota Malang' },
  { no: 28, npsn: '20533700', nama: 'SMAN 1 BATU', jenjang: 'SMA', kota: 'Kota Batu' },
  { no: 29, npsn: '20533701', nama: 'SMAN 2 BATU', jenjang: 'SMA', kota: 'Kota Batu' },
  { no: 30, npsn: '20533702', nama: 'SMAN 3 BATU', jenjang: 'SMA', kota: 'Kota Batu' },
  { no: 31, npsn: '20533703', nama: 'SMKN 1 BATU', jenjang: 'SMK', kota: 'Kota Batu' },
  { no: 32, npsn: '20533704', nama: 'SMKN 2 BATU', jenjang: 'SMK', kota: 'Kota Batu' },
  { no: 33, npsn: '20533705', nama: 'SMKN 3 BATU', jenjang: 'SMK', kota: 'Kota Batu' }
];

export const INITIAL_GURU: Guru[] = [
  { nip: '198201182006042011', nama: 'Dra. Sri Wahyuni, M.Pd.', jk: 'P', status: 'PNS', golRuang: 'IV/a', sekolah: 'SMA NEGERI 1 KOTA MALANG' },
  { nip: '197508121999031004', nama: 'Drs. Bambang Hariyanto, M.M.', jk: 'L', status: 'PNS', golRuang: 'IV/b', sekolah: 'SMA NEGERI 1 KOTA MALANG' },
  { nip: '198804252011011009', nama: 'Ahmad Fauzi, S.Pd., M.Si.', jk: 'L', status: 'PNS', golRuang: 'III/d', sekolah: 'SMKN 4 MALANG' },
  { nip: '199203152022212015', nama: 'Nurul Hidayati, S.Pd.', jk: 'P', status: 'PPPK', golRuang: 'IX', sekolah: 'SMKN 4 MALANG' },
  { nip: '197906102005011012', nama: 'Dr. Joko Susilo, M.Pd.', jk: 'L', status: 'PNS', golRuang: 'IV/b', sekolah: 'SMA NEGERI 3 KOTA MALANG' },
  { nip: '199507192024212008', nama: 'Rina Anggraeni, S.Kom.', jk: 'P', status: 'PPPK Paruh Waktu', golRuang: 'VII', sekolah: 'SMKN 1 MALANG' },
  { nip: '198311022008011006', nama: 'M. Taufiqurrahman, M.Pd.I.', jk: 'L', status: 'PNS', golRuang: 'III/c', sekolah: 'SMAN 1 BATU' },
  { nip: '198609142010012017', nama: 'Dewi Lestari, S.Pd.', jk: 'P', status: 'PNS', golRuang: 'III/c', sekolah: 'SMA NEGERI 5 KOTA MALANG' },
  { nip: '199012052022211010', nama: 'Eko Prasetyo, S.T.', jk: 'L', status: 'PPPK', golRuang: 'IX', sekolah: 'SMKN 2 MALANG' },
  { nip: '197804162002121003', nama: 'Drs. Hendro Wibowo, M.Pd.', jk: 'L', status: 'PNS', golRuang: 'IV/a', sekolah: 'SMA NEGERI 8 KOTA MALANG' },
  { nip: '198502282009022004', nama: 'Siti Aminah, M.Pd.', jk: 'P', status: 'PNS', golRuang: 'III/d', sekolah: 'SMAN 2 BATU' },
  { nip: '199308112023211005', nama: 'Bayu Saputra, S.Pd.', jk: 'L', status: 'PPPK', golRuang: 'IX', sekolah: 'SLB NEGERI' }
];

export const INITIAL_PENGAJUAN: PengajuanCuti[] = [
  {
    no: 101,
    tanggal: '18-10-2026',
    tanggalPengajuan: '18-10-2026',
    nip: '198201182006042011',
    nama: 'Dra. Sri Wahyuni, M.Pd.',
    jabatan: 'Guru Ahli Madya',
    unitKerja: 'SMA NEGERI 1 KOTA MALANG',
    jenisCuti: 'Cuti Tahunan',
    alasan: 'Keperluan keluarga dan mendampingi putra wisuda di luar kota.',
    tanggalMulai: '2026-10-26',
    tanggalSelesai: '2026-10-28',
    lamaCuti: 3,
    alamat: 'Jl. Ijen No. 45, Klojen, Kota Malang',
    noHP: '081234567890',
    statusKepegawaian: 'PNS',
    status: 'Menunggu Verifikasi',
    atasanLangsung: 'Drs. Bambang Hariyanto, M.M.',
    nipAtasanLangsung: '197508121999031004',
    email: 'sri.wahyuni82@gmail.com'
  },
  {
    no: 102,
    tanggal: '17-10-2026',
    tanggalPengajuan: '17-10-2026',
    nip: '198804252011011009',
    nama: 'Ahmad Fauzi, S.Pd., M.Si.',
    jabatan: 'Guru Ahli Muda',
    unitKerja: 'SMKN 4 MALANG',
    jenisCuti: 'Cuti Sakit',
    alasan: 'Rawat inap pasca tindakan operasi kecil amandel dan masa pemulihan medis.',
    tanggalMulai: '2026-10-14',
    tanggalSelesai: '2026-10-20',
    lamaCuti: 5,
    alamat: 'Jl. Tlogomas Permai Kav. 12, Lowokwaru, Malang',
    noHP: '085732114455',
    statusKepegawaian: 'PNS',
    status: 'Disetujui',
    catatan: 'Disetujui sesuai surat rekomendasi dokter RS Saiful Anwar Malang.',
    atasanLangsung: 'Drs. Bambang Hariyanto, M.M.',
    nipAtasanLangsung: '197508121999031004',
    tglVerifikasi: '18-10-2026',
    verifikator: 'Admin Cabdin',
    email: 'ahmadfauzi.guru@gmail.com'
  },
  {
    no: 103,
    tanggal: '16-10-2026',
    tanggalPengajuan: '16-10-2026',
    nip: '199203152022212015',
    nama: 'Nurul Hidayati, S.Pd.',
    jabatan: 'Guru Ahli Pertama',
    unitKerja: 'SMKN 4 MALANG',
    jenisCuti: 'Cuti Melahirkan',
    alasan: 'Persalinan anak kedua (HPL awal November 2026).',
    tanggalMulai: '2026-11-02',
    tanggalSelesai: '2027-02-02',
    lamaCuti: 65,
    alamat: 'Jl. Danau Toba G7/A14, Sawojajar, Kota Malang',
    noHP: '081399887766',
    statusKepegawaian: 'PPPK',
    status: 'Menunggu Verifikasi',
    atasanLangsung: 'Drs. Bambang Hariyanto, M.M.',
    nipAtasanLangsung: '197508121999031004',
    email: 'nurulhidayati.edu@gmail.com'
  },
  {
    no: 104,
    tanggal: '12-10-2026',
    tanggalPengajuan: '12-10-2026',
    nip: '198311022008011006',
    nama: 'M. Taufiqurrahman, M.Pd.I.',
    jabatan: 'Guru Ahli Muda',
    unitKerja: 'SMAN 1 BATU',
    jenisCuti: 'Cuti Karena Alasan Penting',
    alasan: 'Melangsungkan pernikahan di Surabaya.',
    tanggalMulai: '2026-10-21',
    tanggalSelesai: '2026-10-23',
    lamaCuti: 3,
    alamat: 'Jl. Panglima Sudirman No. 88, Kota Batu',
    noHP: '081223344556',
    statusKepegawaian: 'PNS',
    status: 'Disetujui',
    catatan: 'Selamat menempuh hidup baru.',
    atasanLangsung: 'Drs. Hendro Wibowo, M.Pd.',
    nipAtasanLangsung: '197804162002121003',
    tglVerifikasi: '13-10-2026',
    verifikator: 'Admin Cabdin',
    email: 'taufiq.batu@gmail.com'
  },
  {
    no: 105,
    tanggal: '09-10-2026',
    tanggalPengajuan: '09-10-2026',
    nip: '199507192024212008',
    nama: 'Rina Anggraeni, S.Kom.',
    jabatan: 'Teknisi Laboratorium Komputer',
    unitKerja: 'SMKN 1 MALANG',
    jenisCuti: 'Cuti Tahunan',
    alasan: 'Mudik acara keluarga ke Madiun.',
    tanggalMulai: '2026-10-15',
    tanggalSelesai: '2026-10-16',
    lamaCuti: 2,
    alamat: 'Jl. Bandung No. 20, Klojen, Malang',
    noHP: '089876543210',
    statusKepegawaian: 'PPPK Paruh Waktu',
    status: 'Disetujui',
    catatan: 'Disetujui sesuai jatah cuti PPPK Paruh Waktu.',
    atasanLangsung: 'Dr. Joko Susilo, M.Pd.',
    nipAtasanLangsung: '197906102005011012',
    tglVerifikasi: '10-10-2026',
    verifikator: 'Admin Cabdin',
    email: 'rina.anggraeni@gmail.com'
  },
  {
    no: 106,
    tanggal: '05-10-2026',
    tanggalPengajuan: '05-10-2026',
    nip: '199012052022211010',
    nama: 'Eko Prasetyo, S.T.',
    jabatan: 'Guru Produktif Teknik Otomotif',
    unitKerja: 'SMKN 2 MALANG',
    jenisCuti: 'Cuti Besar',
    alasan: 'Ibadah Umroh bersama orang tua.',
    tanggalMulai: '2026-11-10',
    tanggalSelesai: '2026-11-24',
    lamaCuti: 11,
    alamat: 'Jl. Cengger Ayam No. 5, Malang',
    noHP: '082133445566',
    statusKepegawaian: 'PPPK',
    status: 'Perlu Revisi',
    catatan: 'Sesuai regulasi UU 20/2023 & PP 49/2018, Cuti Besar diperuntukkan bagi PNS masa kerja 5 tahun. Untuk umroh bagi PPPK, silakan ajukan melalui "Cuti Karena Alasan Penting".',
    atasanLangsung: 'Drs. Hendro Wibowo, M.Pd.',
    nipAtasanLangsung: '197804162002121003',
    tglVerifikasi: '06-10-2026',
    verifikator: 'Admin Cabdin',
    email: 'eko.prasetyo@smkn2malang.sch.id'
  }
];

export const INFO_CUTI_LIST: InfoCutiItem[] = [
  {
    nama: 'Cuti Tahunan',
    untuk: 'PNS, PPPK, & PPPK Paruh Waktu',
    jumlah: 'PNS: 12 hari kerja/tahun (dapat diakumulasi s.d. 18-24 hari). PPPK: 12 hari kerja/tahun (tanpa akumulasi). PPPK Paruh Waktu: 12 hari kerja proporsional sesuai kontrak.',
    dasarHukum: 'UU No. 20 Tahun 2023 tentang Aparatur Sipil Negara; PP 11/2017 jo. PP 17/2020; PP 49/2018; Surat Edaran BKN No. 7/2021.',
    syarat: [
      'ASN telah bekerja paling sedikit 1 tahun secara terus-menerus di instansi.',
      'PNS: Sisa cuti tahun N-1 dapat diakumulasikan maksimal 6 hari (total hak 18 hari), dan sisa 2 tahun berturut-turut maksimal 24 hari.',
      'PPPK: Diberikan 12 hari kerja per tahun kalender berjalan, tanpa akumulasi sisa tahun sebelumnya.',
      'PPPK Paruh Waktu: Diberikan hak istirahat tahunan sesuai kesepakatan perjanjian kerja.',
      'Permohonan diajukan secara tertulis atau melalui aplikasi sebelum tanggal cuti dimulai.',
      'Tidak mengurangi tugas kedinasan mendesak unit kerja.'
    ],
    dokumen: [
      'Formulir / surat permohonan cuti tahunan resmi.',
      'Rekomendasi persetujuan atasan langsung (Kepala Sekolah / Kasubag TU).',
      'Cek sisa kuota cuti pada aplikasi Sistem Cuti ASN.'
    ],
    catatan: 'Hari dihitung hanya pada hari kerja efektif (Senin s.d. Jumat/Sabtu), tidak memperhitungkan akhir pekan dan hari libur nasional.'
  },
  {
    nama: 'Cuti Besar',
    untuk: 'PNS',
    jumlah: 'Paling lama 3 bulan.',
    dasarHukum: 'UU 20/2023; PP 11/2017 jo. PP 17/2020 Pasal 315-318.',
    syarat: [
      'PNS telah bekerja paling sedikit 5 tahun secara terus-menerus.',
      'PNS yang mengambil Cuti Besar tidak berhak atas Cuti Tahunan pada tahun yang bersangkutan.',
      'Dapat digunakan untuk menunaikan ibadah keagamaan, kepentingan pendidikan/riset, atau pemulihan.',
      'Memerlukan persetujuan Pejabat Pembina Kepegawaian (PPK) atau pejabat yang didelegasikan.'
    ],
    dokumen: [
      'Surat permohonan cuti besar resmi.',
      'Fotokopi SK CPNS, SK PNS, dan SK Pangkat Terakhir.',
      'Dokumen pendukung khusus (bukti pendaftaran haji/ibadah, surat dokter, dll).',
      'Pertimbangan dan rekomendasi atasan langsung.'
    ],
    catatan: 'Selama menjalani cuti besar, PNS tetap menerima penghasilan dasar sesuai ketentuan perundang-undangan.'
  },
  {
    nama: 'Cuti Sakit',
    untuk: 'PNS & PPPK',
    jumlah: '1 hari s.d. 14 hari dengan surat dokter; hingga 1 tahun untuk sakit berkepanjangan dengan pengujian kesehatan.',
    dasarHukum: 'UU 20/2023; PP 11/2017 jo. PP 17/2020; PP 49/2018.',
    syarat: [
      'Sakit 1 s.d. 14 hari wajib melampirkan Surat Keterangan Sakit dari dokter resmi.',
      'Sakit lebih dari 14 hari wajib surat dokter pemerintah / Rumah Sakit Pemerintah.',
      'Untuk kondisi darurat atau rawat inap mendadak, pengajuan dapat disusulkan maksimal 14 hari kerja ke belakang.'
    ],
    dokumen: [
      'Surat Keterangan Sakit dari dokter / klinik / rumah sakit pemerintah.',
      'Resume medis / surat kontrol berkala untuk sakit berkepanjangan.',
      'Surat permohonan cuti sakit.'
    ],
    catatan: 'Untuk kecelakaan kerja saat dinas, diberlakukan tata kelola khusus kecelakaan kerja ASN.'
  },
  {
    nama: 'Cuti Melahirkan',
    untuk: 'ASN Perempuan',
    jumlah: '3 bulan (dapat diambil 1 bulan sebelum dan 2 bulan setelah persalinan).',
    dasarHukum: 'UU 20/2023; PP 11/2017 jo. PP 17/2020; PP 49/2018; UU KIA No. 4/2024.',
    syarat: [
      'Diberikan untuk persalinan anak pertama, kedua, dan ketiga.',
      'Untuk kelahiran anak keempat dan seterusnya bagi PNS berlaku ketentuan cuti besar atau ketentuan khusus.',
      'Dapat diajukan hingga 2 tahun ke depan sesuai perkiraan HPL dokter.'
    ],
    dokumen: [
      'Surat permohonan cuti melahirkan.',
      'Surat keterangan Hari Perkiraan Lahir (HPL) dari dokter spesialis kandungan / bidan.',
      'Akta kelahiran / surat keterangan lahir anak (susulan pasca melahirkan).'
    ],
    catatan: 'Bagi ASN pria yang mendampingi istri bersalin, menggunakan fasilitas Cuti Karena Alasan Penting.'
  },
  {
    nama: 'Cuti Karena Alasan Penting',
    untuk: 'PNS & PPPK',
    jumlah: 'Paling lama 1 bulan sesuai kebutuhan riil.',
    dasarHukum: 'UU 20/2023; PP 11/2017 jo. PP 17/2020; PP 49/2018.',
    syarat: [
      'Ibu, bapak, isteri/suami, anak, adik, kakak, mertua, atau menantu sakit keras atau meninggal dunia.',
      'Melangsungkan perkawinan yang pertama.',
      'Mendampingi istri yang melahirkan / operasi caesar.',
      'Mengalami musibah bencana alam kebakaran/banjir yang menimpa tempat tinggal.',
      'Ibadah umroh bagi PPPK (karena PPPK tidak memiliki hak cuti besar).'
    ],
    dokumen: [
      'Surat permohonan cuti alasan penting.',
      'Dokumen pendukung: surat keterangan kematian, surat nikah, surat keterangan rawat inap keluarga, bukti tiket umroh, dll.'
    ],
    catatan: 'Kejadian darurat dapat diajukan susulan maksimal 7 hari ke belakang.'
  },
  {
    nama: 'Cuti di Luar Tanggungan Negara',
    untuk: 'PNS',
    jumlah: 'Paling lama 3 tahun, dapat diperpanjang maksimal 1 tahun.',
    dasarHukum: 'UU 20/2023; PP 11/2017 jo. PP 17/2020.',
    syarat: [
      'Telah bekerja paling sedikit 5 tahun terus-menerus.',
      'Diberikan untuk mendampingi suami/istri tugas dinas ke luar negeri, mendampingi program pengobatan keluarga di luar negeri, dll.',
      'Selama CLTN, PNS tidak menerima penghasilan dari kas negara dan masa kerja terhenti sementara.'
    ],
    dokumen: [
      'Surat permohonan CLTN bermaterai.',
      'Surat penugasan resmi pasangan / rujukan rumah sakit luar negeri.',
      'Persetujuan teknis BKN dan SK Gubernur Jawa Timur.'
    ],
    catatan: 'Setelah selesai CLTN, PNS wajib melapor untuk penempatan kembali.'
  },
  {
    nama: 'Cuti Bersama',
    untuk: 'PNS & PPPK',
    jumlah: 'Mengikuti Surat Keputusan Bersama (SKB) 3 Menteri.',
    dasarHukum: 'SKB 3 Menteri tentang Hari Libur Nasional & Cuti Bersama; PP 11/2017.',
    syarat: [
      'Ditetapkan oleh Pemerintah Pusat secara serentak.',
      'Tidak memotong kuota Cuti Tahunan reguler ASN.',
      'ASN yang bertugas pada unit pelayanan vital saat cuti bersama diberikan kompensasi penambahan cuti tahunan.'
    ],
    dokumen: [
      'Jadwal operasional / surat tugas piket khusus dari kepala unit kerja.'
    ],
    catatan: 'Pelaksanaan piket pada hari cuti bersama diatur oleh masing-masing kepala sekolah/unit kerja.'
  }
];
