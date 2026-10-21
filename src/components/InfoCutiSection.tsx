import React, { useState } from 'react';
import { INFO_CUTI_LIST } from '../data/mockData';
import { BookOpen, ChevronDown, ChevronUp, CheckCircle, FileText, Scale, Lightbulb } from 'lucide-react';

export const InfoCutiSection: React.FC = () => {
  const [openCard, setOpenCard] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenCard(prev => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-4 text-xs text-sky-900 dark:border-sky-900/40 dark:bg-sky-950/40 dark:text-sky-200 flex items-start gap-3">
        <Lightbulb className="h-5 w-5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
        <div>
          <strong>Pedoman Resmi Jenis Cuti ASN Berdasarkan Regulasi Nasional</strong>
          <p className="mt-0.5 text-slate-600 dark:text-slate-300">
            Ketentuan berikut mengacu pada <strong>Undang-Undang No. 20 Tahun 2023</strong> (tentang Aparatur Sipil Negara), <strong>Peraturan Pemerintah No. 11/2017 jo. PP No. 17/2020</strong> (Manajemen PNS), dan <strong>PP No. 49/2018</strong> (Manajemen PPPK).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {INFO_CUTI_LIST.map((item, idx) => {
          const isOpen = openCard === idx;
          return (
            <div
              key={item.nama}
              className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="flex w-full items-center justify-between p-5 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800/60"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.nama}
                    </h3>
                    <span className="rounded-full bg-primary-100 px-2.5 py-0.5 text-[10px] font-bold text-primary-800 dark:bg-sky-950 dark:text-sky-300">
                      {item.untuk}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {item.jumlah}
                  </p>
                </div>
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 text-slate-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-400" />
                )}
              </button>

              {isOpen && (
                <div className="border-t border-slate-100 p-5 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-300 space-y-4">
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-1.5 mb-2">
                      <Scale className="h-4 w-4 text-primary-700 dark:text-sky-400" />
                      Dasar Hukum
                    </h4>
                    <p className="rounded-xl bg-slate-50 p-2.5 dark:bg-slate-800/60 font-mono text-[11px]">
                      {item.dasarHukum}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white mb-2">
                      Ketentuan & Persyaratan
                    </h4>
                    <ul className="list-disc pl-5 space-y-1.5">
                      {item.syarat.map((s, sIdx) => (
                        <li key={sIdx}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-1.5 mb-2">
                      <FileText className="h-4 w-4 text-emerald-600" />
                      Dokumen yang Wajib Dilampirkan
                    </h4>
                    <div className="space-y-1.5">
                      {item.dokumen.map((d, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 dark:border-slate-700 dark:bg-slate-800">
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {item.catatan && (
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
                      <strong>Catatan Tambahan:</strong> {item.catatan}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
