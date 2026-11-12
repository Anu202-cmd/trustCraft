import React from 'react';
import { Wifi, Battery, Signal, ShieldCheck, MapPin, ChevronDown, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface IOSTopBarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
  onOpenSupabase: () => void;
  onOpenQuote: () => void;
}

export const IOSTopBar: React.FC<IOSTopBarProps> = ({
  lang,
  onLanguageChange,
  selectedCity,
  onCityChange,
  onOpenSupabase,
  onOpenQuote,
}) => {
  const t = translations[lang];

  return (
    <div className="sticky top-0 z-30 bg-white/85 backdrop-blur-xl border-b border-slate-200/60 select-none">
      {/* 1. iOS Status Bar */}
      <div className="pt-2 px-6 flex items-center justify-between text-xs font-semibold text-slate-800 tracking-tight">
        {/* Time */}
        <span className="font-semibold text-[13px] tracking-tight">9:41</span>

        {/* Dynamic Island Pill (Simulated) */}
        <div className="w-24 h-5 bg-black rounded-full flex items-center justify-between px-2 text-[9px] text-white">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[9px] font-mono text-slate-300">Artisan Trust</span>
          <ShieldCheck size={10} className="text-emerald-400" />
        </div>

        {/* Status Icons: Signal, Wi-Fi, Battery */}
        <div className="flex items-center gap-1.5 text-slate-700">
          <Signal size={12} className="stroke-[2.5]" />
          <Wifi size={13} className="stroke-[2.5]" />
          <div className="flex items-center gap-0.5">
            <span className="text-[10px] font-mono font-bold">100%</span>
            <Battery size={15} className="fill-slate-800 stroke-[2]" />
          </div>
        </div>
      </div>

      {/* 2. iOS App Bar with Location Selector & Actions */}
      <div className="px-4 py-2.5 flex items-center justify-between gap-2">
        {/* City Location Picker Sheet/Dropdown */}
        <div className="flex items-center gap-1.5 bg-slate-100/90 hover:bg-slate-200/80 px-2.5 py-1.5 rounded-full transition-colors cursor-pointer border border-slate-200/50">
          <MapPin size={13} className="text-[#EA580C]" />
          <select
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer pr-1"
          >
            <option value="All Metros">{lang === 'fr' ? 'Douala & Yaoundé' : 'All Metros'}</option>
            <option value="Douala">Douala</option>
            <option value="Yaoundé">Yaoundé</option>
          </select>
        </div>

        {/* Right Actions: Supabase Status + EN/FR Segmented Pill */}
        <div className="flex items-center gap-2">
          {/* Supabase status badge */}
          <button
            type="button"
            onClick={onOpenSupabase}
            className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-full text-[10px] font-mono text-emerald-800 flex items-center gap-1 cursor-pointer transition-colors"
            title="Supabase PostgreSQL Backend"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Supabase</span>
          </button>

          {/* iOS Segmented Language Pill */}
          <div className="bg-slate-200/70 p-0.5 rounded-full flex items-center">
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-0.5 text-[11px] font-bold rounded-full transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('fr')}
              className={`px-2 py-0.5 text-[11px] font-bold rounded-full transition-all cursor-pointer ${
                lang === 'fr'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              FR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
