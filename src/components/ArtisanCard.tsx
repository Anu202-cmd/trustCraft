import React from 'react';
import { MapPin, Phone, CheckCircle2, Star, Clock, ChevronRight, Briefcase } from 'lucide-react';
import { Artisan, Language } from '../types';
import { translations } from '../translations';
import { TrustBadges } from './TrustBadges';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ArtisanCardProps {
  artisan: Artisan;
  lang: Language;
  onCall: (artisan: Artisan) => void;
  onWhatsApp: (artisan: Artisan) => void;
  onViewProfile: (artisan: Artisan) => void;
}

export const ArtisanCard: React.FC<ArtisanCardProps> = ({
  artisan,
  lang,
  onCall,
  onWhatsApp,
  onViewProfile,
}) => {
  const t = translations[lang];
  const title = lang === 'fr' ? artisan.titleFr : artisan.titleEn;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md">
      {/* Top Content Area */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Header: Portrait + Core Info */}
        <div className="flex items-start gap-4 mb-4">
          {/* Portrait with verification badge overlay */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
              <img
                src={artisan.avatarUrl}
                alt={artisan.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
              />
            </div>
            {/* Explicit verification checkmark overlay */}
            <div
              className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs border border-emerald-200"
              title={t.verifiedBadgeTooltip}
            >
              <div className="bg-[#059669] text-white rounded-full p-1 flex items-center justify-center">
                <CheckCircle2 size={14} className="stroke-[2.5]" />
              </div>
            </div>
          </div>

          {/* Artisan Title & Location */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 
                onClick={() => onViewProfile(artisan)}
                className="text-lg font-bold text-[#0F254A] truncate hover:text-[#EA580C] cursor-pointer transition-colors"
              >
                {artisan.name}
              </h3>
              
              {/* Availability badge */}
              {artisan.availableToday ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {lang === 'fr' ? 'Dispo aujourd’hui' : 'Available Today'}
                </span>
              ) : (
                <span className="inline-flex items-center text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full shrink-0">
                  {lang === 'fr' ? 'Sur réservation' : 'By booking'}
                </span>
              )}
            </div>

            <p className="text-sm font-semibold text-slate-700 truncate mt-0.5">
              {title}
            </p>

            {/* Neighborhood / Locality */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1.5">
              <MapPin size={13} className="shrink-0 text-slate-400" />
              <span className="truncate font-medium">{artisan.neighborhood}</span>
              <span className="text-slate-300">·</span>
              <span className="font-semibold text-slate-600">{artisan.city}</span>
            </div>

            {/* Ratings & Volume Metrics */}
            <div className="flex items-center gap-2 text-xs text-slate-600 mt-2">
              <div className="flex items-center gap-1 text-amber-600 font-semibold">
                <Star size={13} className="fill-amber-400 text-amber-500" />
                <span>{artisan.rating.toFixed(2)}</span>
              </div>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500">{artisan.reviewCount} {lang === 'fr' ? 'avis' : 'reviews'}</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-700 font-medium">{artisan.completedJobsCount} {lang === 'fr' ? 'chantiers' : 'jobs'}</span>
            </div>
          </div>
        </div>

        {/* High-Trust Badges Row */}
        <div className="pt-2 pb-3 border-t border-slate-100">
          <TrustBadges
            trust={artisan.trust}
            lang={lang}
            size="sm"
            onBadgeClick={() => onViewProfile(artisan)}
          />
        </div>

        {/* Pricing, Experience, and Response Speed */}
        <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-3 mt-1 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">{t.dailyRateLabel}</span>
            <div className="font-bold text-[#0F254A] text-sm tabular-nums">
              {artisan.baseDailyRateCFA.toLocaleString()} <span className="text-[11px] font-normal text-slate-600">{t.perDay}</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-slate-500 mt-1 pt-1 border-t border-slate-200/50">
            <span className="flex items-center gap-1">
              <Briefcase size={12} className="text-slate-400" />
              <span>{artisan.experienceYears} {t.yearsExp}</span>
            </span>
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <Clock size={12} className="text-emerald-600" />
              <span>{t.respondsIn} ~{artisan.responseTimeMinutes}m</span>
            </span>
          </div>
        </div>

        {/* View Profile & Proof Link */}
        <button
          type="button"
          onClick={() => onViewProfile(artisan)}
          className="mt-3 w-full py-2 px-3 rounded-lg border border-slate-300 hover:border-[#0F254A] text-[#0F254A] font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-all cursor-pointer"
        >
          <span>{t.btnViewDossier}</span>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Embedded Bottom Dual Split CTA Bar */}
      <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 border-t border-slate-200">
        {/* Direct Voice Call */}
        <button
          type="button"
          onClick={() => onCall(artisan)}
          className="min-h-[48px] px-3 py-2.5 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs active:scale-[0.98] cursor-pointer focus:ring-3 focus:ring-orange-200"
        >
          <Phone size={16} className="shrink-0" />
          <span className="whitespace-nowrap">{t.btnCall}</span>
        </button>

        {/* WhatsApp Direct Connect */}
        <button
          type="button"
          onClick={() => onWhatsApp(artisan)}
          className="min-h-[48px] px-3 py-2.5 rounded-lg bg-[#16A34A] hover:bg-[#15803d] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs active:scale-[0.98] cursor-pointer focus:ring-3 focus:ring-emerald-200"
        >
          <WhatsAppIcon size={18} className="shrink-0" />
          <span className="whitespace-nowrap">{t.btnWhatsApp}</span>
        </button>
      </div>
    </div>
  );
};
