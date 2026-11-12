import React from 'react';
import { ShieldCheck, Plus, Sparkles, Menu, X } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenQuoteModal: () => void;
  onOpenJoinModal: () => void;
  onOpenVerificationModal: () => void;
  onOpenSupabaseModal: () => void;
  onScrollToArtisans: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  onOpenQuoteModal,
  onOpenJoinModal,
  onOpenVerificationModal,
  onOpenSupabaseModal,
  onScrollToArtisans,
}) => {
  const t = translations[lang];
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 md:gap-8">
        
        {/* ZONE 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0F254A] flex items-center justify-center text-white shadow-xs group-hover:bg-[#EA580C] transition-colors">
              <ShieldCheck size={22} className="stroke-[2.2]" />
            </div>
            <div>
              <span className="font-display font-extrabold text-lg sm:text-xl text-[#0F254A] tracking-tight whitespace-nowrap block leading-tight">
                Artisan Trust
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Marketplace · Douala & Yaoundé
              </span>
            </div>
          </a>
        </div>

        {/* ZONE 2: 4-5 Concise Single-line Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-slate-700">
          <button
            type="button"
            onClick={onScrollToArtisans}
            className="hover:text-[#EA580C] transition-colors whitespace-nowrap cursor-pointer py-1"
          >
            {t.navArtisans}
          </button>
          
          <button
            type="button"
            onClick={onOpenVerificationModal}
            className="hover:text-[#EA580C] transition-colors whitespace-nowrap cursor-pointer py-1 flex items-center gap-1.5"
          >
            <ShieldCheck size={16} className="text-[#059669]" />
            <span>{t.navVerification}</span>
          </button>

          <button
            type="button"
            onClick={onOpenJoinModal}
            className="hover:text-[#EA580C] transition-colors whitespace-nowrap cursor-pointer py-1 text-slate-600"
          >
            {t.ctaJoinArtisan}
          </button>

          <button
            type="button"
            onClick={onOpenSupabaseModal}
            className="hover:text-emerald-700 transition-colors whitespace-nowrap cursor-pointer py-1 text-emerald-700 flex items-center gap-1.5 font-mono text-xs bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200"
            title="Inspect Supabase live records and tables"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Supabase Data</span>
          </button>
        </nav>

        {/* ZONE 3: 1 Primary Action + Language Switcher Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Switcher Pill (EN | FR) */}
          <div className="bg-slate-100 p-0.5 rounded-full border border-slate-200 flex items-center shrink-0">
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-[#0F254A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0F254A]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('fr')}
              className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                lang === 'fr'
                  ? 'bg-[#0F254A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0F254A]'
              }`}
            >
              FR
            </button>
          </div>

          {/* Primary Action Button (Quote / Hire) */}
          <button
            type="button"
            onClick={onOpenQuoteModal}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-semibold text-xs sm:text-sm shadow-xs transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap"
          >
            <Sparkles size={16} />
            <span>{t.ctaPostJob}</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-3">
          <button
            type="button"
            onClick={() => {
              onScrollToArtisans();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            {t.navArtisans}
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenVerificationModal();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg flex items-center justify-between"
          >
            <span>{t.navVerification}</span>
            <ShieldCheck size={16} className="text-[#059669]" />
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenJoinModal();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            {t.ctaJoinArtisan}
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenSupabaseModal();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 text-sm font-semibold text-emerald-800 bg-emerald-50 rounded-lg flex items-center justify-between"
          >
            <span>Supabase Data & Tables</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenQuoteModal();
              setMobileMenuOpen(false);
            }}
            className="w-full py-3 px-4 rounded-xl bg-[#EA580C] text-white font-semibold text-sm flex items-center justify-center gap-2"
          >
            <Sparkles size={16} />
            <span>{t.ctaPostJob}</span>
          </button>
        </div>
      )}
    </header>
  );
};
