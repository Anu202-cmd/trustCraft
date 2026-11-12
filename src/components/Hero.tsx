import React from 'react';
import { Search, MapPin, ShieldCheck, CheckCircle2, Award, Users, ArrowRight } from 'lucide-react';
import { Language, TradeCategory } from '../types';
import { translations } from '../translations';

interface HeroProps {
  lang: Language;
  selectedCity: string;
  onCityChange: (city: string) => void;
  selectedQuarter: string;
  onQuarterChange: (quarter: string) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearchSubmit: () => void;
  onOpenVerificationModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  selectedCity,
  onCityChange,
  selectedQuarter,
  onQuarterChange,
  searchQuery,
  onSearchQueryChange,
  onSearchSubmit,
  onOpenVerificationModal,
}) => {
  const t = translations[lang];

  const doualaQuarters = [
    'All Neighborhoods',
    'Akwa',
    'Bonanjo',
    'Bonamoussadi',
    'Makepe',
    'Deido',
    'Bali',
    'Logpom',
    'Kotto',
  ];

  const yaoundeQuarters = [
    'All Neighborhoods',
    'Bastos',
    'Biyem-Assi',
    'Omnisports',
    'Mendong',
    'Tsinga',
    'Essos',
    'Santa Barbara',
  ];

  const currentQuarters = selectedCity === 'Yaoundé' ? yaoundeQuarters : doualaQuarters;

  return (
    <section className="relative bg-gradient-to-b from-[#EFF4FF] via-[#F8FAFC] to-[#F8FAFC] border-b border-slate-200 pt-8 pb-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Split: Hero Headline & Visual Proof */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Proposition, Search Box, Trust Indicators */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust Pill Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>{t.heroPill}</span>
            </div>

            {/* Display Hero Headline */}
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0F254A] tracking-tight leading-[1.15] text-balance">
              {t.heroTitle}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              {t.heroSubtitle}
            </p>

            {/* Structured Search Box (Min 48px Input Height, High Contrast) */}
            <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-300 shadow-sm space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                
                {/* Search Term / Trade */}
                <div className="sm:col-span-6 relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Search size={18} />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchQueryChange(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit()}
                    placeholder={t.heroSearchPlaceholder}
                    className="w-full min-h-[48px] pl-10 pr-3 rounded-xl border border-slate-200 focus:border-[#0F254A] focus:ring-2 focus:ring-[#0F254A]/10 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                  />
                </div>

                {/* City Selector */}
                <div className="sm:col-span-3">
                  <select
                    value={selectedCity}
                    onChange={(e) => {
                      onCityChange(e.target.value);
                      onQuarterChange('All Neighborhoods');
                    }}
                    className="w-full min-h-[48px] px-3 rounded-xl border border-slate-200 focus:border-[#0F254A] focus:ring-2 focus:ring-[#0F254A]/10 text-sm font-semibold text-slate-800 bg-white outline-none cursor-pointer"
                  >
                    <option value="All Metros">{lang === 'fr' ? 'Toutes Villes' : 'All Metros'}</option>
                    <option value="Douala">Douala</option>
                    <option value="Yaoundé">Yaoundé</option>
                  </select>
                </div>

                {/* Quarter / Neighborhood Selector */}
                <div className="sm:col-span-3">
                  <select
                    value={selectedQuarter}
                    onChange={(e) => onQuarterChange(e.target.value)}
                    className="w-full min-h-[48px] px-3 rounded-xl border border-slate-200 focus:border-[#0F254A] focus:ring-2 focus:ring-[#0F254A]/10 text-sm text-slate-800 bg-white outline-none cursor-pointer truncate"
                  >
                    {currentQuarters.map((q) => (
                      <option key={q} value={q}>
                        {q === 'All Neighborhoods' ? (lang === 'fr' ? 'Tous Quartiers' : 'All Quarters') : q}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-medium">
                    <CheckCircle2 size={14} className="text-emerald-600" />
                    <span>CNI Verified</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 font-medium">
                    <Award size={14} className="text-[#0F254A]" />
                    <span>Guild Benchmarked</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 font-medium">
                    <Users size={14} className="text-[#EA580C]" />
                    <span>Quarter Vouched</span>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onSearchSubmit}
                  className="w-full sm:w-auto min-h-[48px] px-6 py-2.5 rounded-xl bg-[#0F254A] hover:bg-[#00102d] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 shadow-xs active:scale-[0.98]"
                >
                  <span>{t.heroSearchButton}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Link to 3-tier trust system breakdown */}
            <div className="pt-1">
              <button
                type="button"
                onClick={onOpenVerificationModal}
                className="text-xs font-semibold text-[#0F254A] hover:text-[#EA580C] inline-flex items-center gap-1 underline underline-offset-4 cursor-pointer"
              >
                <span>{lang === 'fr' ? 'Découvrir comment nous vérifions physiquement chaque artisan →' : 'Learn how our field agents verify each artisan in person →'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: High-Trust Visual Proof Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200 shadow-xl bg-white">
              {/* High-res generated workshop photo */}
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-900">
                <img
                  src="/src/assets/images/hero_artisan_craft_1794483504720.jpg"
                  alt="Certified Master Artisan at work"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating physical certification overlay card */}
              <div className="p-5 bg-white border-t border-slate-200">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wide">
                      <ShieldCheck size={16} className="text-[#059669]" />
                      <span>{lang === 'fr' ? 'Atelier Certifié de Corporation' : 'Certified Guild Workshop'}</span>
                    </div>
                    <h4 className="font-bold text-base text-[#0F254A] mt-1">
                      Menuiserie Ndoumbe & Fils
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Akwa Nord, Douala · Agrément N° DLA-2024-W89
                    </p>
                  </div>
                  
                  <div className="text-right shrink-0">
                    <span className="inline-block text-xl font-extrabold text-[#0F254A] tabular-nums">98/100</span>
                    <span className="block text-[10px] uppercase font-bold text-slate-500">
                      {lang === 'fr' ? 'Score Métier' : 'Guild Score'}
                    </span>
                  </div>
                </div>

                {/* Physical Proof Breakdown */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-center">
                  <div className="p-2 rounded-lg bg-slate-50">
                    <span className="block text-xs font-bold text-slate-800">100%</span>
                    <span className="text-[10px] text-slate-500 font-medium">CNI Validée</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50">
                    <span className="block text-xs font-bold text-slate-800">28</span>
                    <span className="text-[10px] text-slate-500 font-medium">Parrains</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50">
                    <span className="block text-xs font-bold text-emerald-700 font-bold">Zéro</span>
                    <span className="text-[10px] text-slate-500 font-medium">Faux-Bond</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Full-Width 4-Column KPI Trust Strip below Hero Split */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="block text-2xl lg:text-3xl font-extrabold text-[#0F254A] tabular-nums">
              1,420+
            </span>
            <span className="text-xs font-semibold text-slate-600 mt-0.5 block">
              {t.heroStatsArtisans}
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="block text-2xl lg:text-3xl font-extrabold text-[#059669] tabular-nums">
              100%
            </span>
            <span className="text-xs font-semibold text-slate-600 mt-0.5 block">
              {lang === 'fr' ? 'Identité & CNI Contrôlées' : 'Biometric ID Verified'}
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="block text-2xl lg:text-3xl font-extrabold text-[#EA580C] tabular-nums">
              8,900+
            </span>
            <span className="text-xs font-semibold text-slate-600 mt-0.5 block">
              {t.heroStatsVouched}
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="block text-2xl lg:text-3xl font-extrabold text-[#0F254A] tabular-nums">
              4.96 <span className="text-base font-normal text-slate-400">/5</span>
            </span>
            <span className="text-xs font-semibold text-slate-600 mt-0.5 block">
              {t.heroStatsRating}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
