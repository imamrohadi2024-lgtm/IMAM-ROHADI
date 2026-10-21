import React from 'react';
import { Building2, MapPin, Phone, Mail, UserCheck, ShieldCheck, Sparkles } from 'lucide-react';

export const InfoSection: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="rounded-3xl border border-slate-200/90 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary-700 to-sky-600 text-white shadow-lg shadow-primary-700/20">
          <Building2 className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
          Sistem Informasi Cuti ASN
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Cabang Dinas Pendidikan Wilayah Malang (Kota Malang – Kota Batu)
        </p>
        <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary-50 px-3 py-1 text-[11px] font-bold text-primary-800 dark:bg-primary-950 dark:text-sky-300">
          <Sparkles className="h-3 w-3" /> Versi 7.2 Aurora Sync (Fixed & Ready to Deploy)
        </div>

        <div className="mt-8 space-y-3 text-left text-xs">
          <div className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <Building2 className="h-5 w-5 text-primary-700 dark:text-sky-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Instansi Pembina</div>
              <div className="text-slate-600 dark:text-slate-300 mt-0.5">
                Cabang Dinas Pendidikan Wilayah Malang (Memayungi SMA, SMK, dan SLB Negeri & Swasta di Kota Malang dan Kota Batu).
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <MapPin className="h-5 w-5 text-primary-700 dark:text-sky-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Alamat Kantor</div>
              <div className="text-slate-600 dark:text-slate-300 mt-0.5">
                Jalan Anjasmoro Nomor 40, Oro-oro Dowo, Kec. Klojen, Kota Malang, Jawa Timur 65119
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <Phone className="h-5 w-5 text-primary-700 dark:text-sky-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Kontak & Layanan</div>
              <div className="text-slate-600 dark:text-slate-300 mt-0.5">
                Telepon: (0341) 353155 · Email: <a href="mailto:cabdinmalangbatu@gmail.com" className="text-sky-600 hover:underline">cabdinmalangbatu@gmail.com</a>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <UserCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Perancang & Pembuat Aplikasi</div>
              <div className="text-slate-800 dark:text-slate-200 font-semibold mt-0.5">
                Imam Rohadi
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-100 text-[11px] text-slate-400 dark:border-slate-800">
          © 2026 Pemerintah Provinsi Jawa Timur · "Jer Basuki Mawa Beya"
        </div>
      </div>
    </div>
  );
};
