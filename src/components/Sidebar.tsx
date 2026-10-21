import React from 'react';
import { UserSession } from '../types';
import {
  LayoutDashboard,
  FileEdit,
  CheckSquare,
  Users,
  BarChart3,
  History,
  Calculator,
  BookOpen,
  CalendarDays,
  Info,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Building2,
  ShieldCheck,
  School
} from 'lucide-react';

interface SidebarProps {
  currentUser: UserSession;
  activeSection: string;
  onSelectSection: (section: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  pendingCount: number;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentUser,
  activeSection,
  onSelectSection,
  collapsed,
  onToggleCollapse,
  pendingCount,
  onLogout,
}) => {
  const navItems = [
    { id: 'beranda', label: 'Beranda', icon: LayoutDashboard, role: 'all' },
    { id: 'pengajuan', label: 'Pengajuan Cuti', icon: FileEdit, role: 'all' },
    { 
      id: 'verifikasi', 
      label: 'Verifikasi', 
      icon: CheckSquare, 
      role: 'cabdin',
      badge: pendingCount > 0 ? pendingCount : null 
    },
    { id: 'dataGuru', label: 'Data Guru', icon: Users, role: 'cabdin' },
    { id: 'laporan', label: 'Laporan Rekap', icon: BarChart3, role: 'cabdin' },
    { id: 'riwayat', label: 'Riwayat Pengajuan', icon: History, role: 'all' },
    { id: 'kalkulator', label: 'Kalkulator Cuti', icon: Calculator, role: 'all' },
    { id: 'infoCuti', label: 'Panduan Regulasi', icon: BookOpen, role: 'all' },
    { id: 'calendar', label: 'Kalender Cuti', icon: CalendarDays, role: 'all' },
    { id: 'info', label: 'Tentang Aplikasi', icon: Info, role: 'all' },
  ];

  const visibleItems = navItems.filter(item => 
    item.role === 'all' || (item.role === 'cabdin' && currentUser.role === 'cabdin')
  );

  return (
    <aside
      className={`relative flex flex-col border-r border-slate-200/80 bg-white transition-all duration-300 dark:border-slate-800 dark:bg-slate-900 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-slate-100 px-4 dark:border-slate-800">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-primary-700 via-primary-600 to-sky-500 text-white shadow-md shadow-primary-700/20">
            <Building2 className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="truncate text-xs font-bold text-slate-900 dark:text-white">
                Sistem Cuti ASN
              </div>
              <div className="truncate text-[10px] text-slate-500 dark:text-slate-400">
                Cabdin Wilayah Malang
              </div>
            </div>
          )}
        </div>
        <button
          onClick={onToggleCollapse}
          className="hidden h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 lg:flex dark:hover:bg-slate-800 dark:hover:text-slate-300"
          title={collapsed ? 'Perluas Menu' : 'Lipat Menu'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {!collapsed && (
          <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Menu Utama
          </div>
        )}
        {visibleItems.map(item => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectSection(item.id)}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-primary-700 text-white shadow-sm shadow-primary-700/25 hover:bg-primary-800 dark:bg-primary-600'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
              } ${collapsed ? 'justify-center px-0' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-200'}`} />
              {!collapsed && (
                <span className="flex-1 truncate text-left">{item.label}</span>
              )}
              {!collapsed && item.badge !== null && item.badge !== undefined && (
                <span className="rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-bold text-white">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="border-t border-slate-100 p-3 dark:border-slate-800">
        <div className={`flex items-center gap-3 rounded-2xl bg-slate-50 p-2.5 dark:bg-slate-800/60 ${collapsed ? 'justify-center' : ''}`}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-primary-700 to-sky-600 text-xs font-bold text-white shadow-sm">
            {currentUser.nama.charAt(0).toUpperCase()}
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <div className="truncate text-xs font-bold text-slate-800 dark:text-slate-100">
                {currentUser.nama}
              </div>
              <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400">
                {currentUser.role === 'cabdin' ? (
                  <span className="flex items-center gap-0.5 text-sky-700 dark:text-sky-400">
                    <ShieldCheck className="h-3 w-3" /> Admin Cabdin
                  </span>
                ) : (
                  <span className="flex items-center gap-0.5 text-emerald-700 dark:text-emerald-400">
                    <School className="h-3 w-3" /> Portal Sekolah
                  </span>
                )}
              </div>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={onLogout}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-rose-600 dark:hover:bg-slate-700"
              title="Keluar"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
