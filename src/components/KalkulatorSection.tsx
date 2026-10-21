import React, { useState } from 'react';
import { Guru } from '../types';
import { Calculator, Search, ShieldCheck, Info, CheckCircle2 } from 'lucide-react';

interface KalkulatorSectionProps {
  guruList: Guru[];
}

export const KalkulatorSection: React.FC<KalkulatorSectionProps> = ({ guruList }) => {
  const [nipQuery, setNipQuery] = useState('');
  const [hasil, setHasil] = useState<{
    nama: string;
    sekolah: string;
    status: string;
    kuotaDasar: number;
    sisaTahunLalu: number;
    kuotaTotal: number;
    terpakai: number;
    sisa: number;
    keterangan: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const hitungCuti = (targetNip: string) => {
    const clean = targetNip.replace(/\s+/g, '').trim();
    if (!clean) {
      setErrorMsg('Silakan masukkan NIP ASN.');
      setHasil(null);
      return;
    }

    const found = guruList.find(g => g.nip.replace(/\s+/g, '').trim() === clean);
    if (!found) {
      setErrorMsg(`NIP ${clean} tidak ditemukan dalam database.`);
      setHasil(null);
      return;
    }

    setErrorMsg('');
    const isPNS = found.status === 'PNS';
    const isParuhWaktu = found.status.includes('Paruh Waktu');
    const sisaLalu = isPNS ? 6 : 0;
    const kuotaTot = isPNS ? 18 : 12;
    const terpakai = 3;
    const sisa = kuotaTot - terpakai;

    setHasil({
      nama: found.nama,
      sekolah: found.sekolah,
      status: found.status,
      kuotaDasar: 12,
      sisaTahunLalu: sisaLalu,
      kuotaTotal: kuotaTot,
      terpakai,
      sisa,
      keterangan: isPNS 
        ? 'PNS: Hak dasar 12 hari kerja/tahun. Akumulasi sisa cuti tahun N-1 (maks. 6 hari) ditambahkan sehingga hak cuti tahun 2026 menjadi 18 hari kerja.'
        : isParuhWaktu
        ? 'PPPK Paruh Waktu: Hak cuti tahunan 12 hari kerja proporsional berdasarkan perjanjian kerja tanpa akumulasi sisa tahun lalu.'
        : 'PPPK: Hak cuti tahunan 12 hari kerja per tahun kalender berjalan tanpa akumulasi sisa cuti tahun sebelumnya.'
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-100 pb-4 mb-5 dark:border-slate-800">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary-700 dark:text-sky-400" />
            Kalkulator Sisa Cuti Tahunan ASN
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Simulasi penghitungan sisa kuota cuti berdasarkan regulasi UU No. 20 Tahun 2023 dan PP No. 11/2017 jo. PP 17/2020.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="label">Masukkan NIP ASN</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={nipQuery}
                onChange={e => setNipQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && hitungCuti(nipQuery)}
                placeholder="Contoh: 198201182006042011"
                className="input font-mono"
              />
              <button
                type="button"
                onClick={() => hitungCuti(nipQuery)}
                className="btn btn-primary shrink-0"
              >
                <Search className="h-4 w-4" /> Hitung Sisa
              </button>
            </div>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => { setNipQuery('198201182006042011'); hitungCuti('198201182006042011'); }}
                className="text-[11px] text-primary-700 hover:underline dark:text-sky-400"
              >
                Gunakan Contoh NIP: 198201182006042011
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
              {errorMsg}
            </div>
          )}

          {hasil && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 dark:border-emerald-900 dark:bg-emerald-950/40 text-xs text-emerald-950 dark:text-emerald-200 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {hasil.nama}
                  </h3>
                  <div className="text-slate-600 dark:text-slate-400 mt-0.5">
                    {hasil.sekolah} · <span className="font-semibold">{hasil.status}</span>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 font-bold text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                  Tahun Kalender 2026
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-2 border-t border-emerald-200 dark:border-emerald-900">
                <div className="bg-white/80 p-3 rounded-xl dark:bg-slate-800/80">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Kuota Dasar</span>
                  <strong className="text-base text-slate-800 dark:text-white tabular-nums">{hasil.kuotaDasar} hr</strong>
                </div>
                <div className="bg-white/80 p-3 rounded-xl dark:bg-slate-800/80">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Sisa Tahun Lalu</span>
                  <strong className="text-base text-slate-800 dark:text-white tabular-nums">+{hasil.sisaTahunLalu} hr</strong>
                </div>
                <div className="bg-white/80 p-3 rounded-xl dark:bg-slate-800/80">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Terpakai</span>
                  <strong className="text-base text-slate-800 dark:text-white tabular-nums">{hasil.terpakai} hr</strong>
                </div>
                <div className="bg-white/80 p-3 rounded-xl dark:bg-slate-800/80">
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 uppercase font-bold block">Sisa Aktif</span>
                  <strong className="text-lg text-emerald-700 dark:text-emerald-400 tabular-nums">{hasil.sisa} hr</strong>
                </div>
              </div>

              <div className="rounded-xl bg-white/70 p-3 text-[11px] leading-relaxed text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
                <Info className="h-3.5 w-3.5 inline mr-1 text-emerald-600" />
                {hasil.keterangan}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
