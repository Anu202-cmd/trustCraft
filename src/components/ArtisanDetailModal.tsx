import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Award, 
  Users, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Star, 
  Clock, 
  Play, 
  Pause, 
  FileText, 
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { Artisan, Language } from '../types';
import { translations } from '../translations';
import { TrustBadges } from './TrustBadges';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ArtisanDetailModalProps {
  artisan: Artisan | null;
  lang: Language;
  onClose: () => void;
  onCall: (artisan: Artisan) => void;
  onWhatsApp: (artisan: Artisan) => void;
}

export const ArtisanDetailModal: React.FC<ArtisanDetailModalProps> = ({
  artisan,
  lang,
  onClose,
  onCall,
  onWhatsApp,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'credentials' | 'guarantors' | 'rates' | 'reviews'>('overview');
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

  if (!artisan) return null;

  const t = translations[lang];
  const title = lang === 'fr' ? artisan.titleFr : artisan.titleEn;
  const bio = lang === 'fr' ? artisan.bioFr : artisan.bioEn;

  const toggleVoiceNote = (id: string) => {
    if (playingVoiceId === id) {
      setPlayingVoiceId(null);
    } else {
      setPlayingVoiceId(id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div 
        className="relative bg-white rounded-t-[32px] sm:rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border-t sm:border border-slate-200 flex flex-col max-h-[90vh] animate-in slide-in-from-bottom duration-300"
        role="dialog"
        aria-modal="true"
      >
        {/* iOS Drag Handle */}
        <div className="pt-2.5 pb-1 flex justify-center sm:hidden" onClick={onClose}>
          <div className="w-10 h-1.2 bg-slate-300 rounded-full"></div>
        </div>

        {/* Sticky Header with Close Button */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-5 sm:px-6 py-3 sm:py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#059669]"></span>
            <h2 className="font-display font-bold text-base sm:text-lg text-[#0F254A]">
              {t.dossierTitle}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Artisan Summary Profile Banner */}
          <div className="bg-[#EFF4FF] border border-[#CBD5E1] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-slate-200">
                <img
                  src={artisan.avatarUrl}
                  alt={artisan.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 border border-emerald-300 shadow-xs">
                <div className="bg-[#059669] text-white rounded-full p-1">
                  <CheckCircle2 size={15} />
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F254A]">
                  {artisan.name}
                </h3>
                {artisan.availableToday && (
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">
                    {lang === 'fr' ? 'Disponible aujourd’hui' : 'Available Today'}
                  </span>
                )}
              </div>

              <p className="text-sm font-semibold text-slate-700 mt-0.5">
                {title}
              </p>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin size={13} className="text-slate-400" />
                  <span>{artisan.neighborhood}, {artisan.city}</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 font-semibold text-amber-600">
                  <Star size={13} className="fill-amber-400 text-amber-500" />
                  <span>{artisan.rating} ({artisan.reviewCount} {lang === 'fr' ? 'avis' : 'reviews'})</span>
                </span>
                <span>·</span>
                <span>{artisan.completedJobsCount} {lang === 'fr' ? 'chantiers validés' : 'verified jobs'}</span>
              </div>

              <div className="mt-3">
                <TrustBadges trust={artisan.trust} lang={lang} size="sm" />
              </div>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex items-center gap-1.5 border-b border-slate-200 overflow-x-auto no-scrollbar pb-1">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#0F254A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.tabOverview}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('credentials')}
              className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'credentials'
                  ? 'bg-[#0F254A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.tabCredentials}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('guarantors')}
              className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'guarantors'
                  ? 'bg-[#0F254A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.tabGuarantors} ({artisan.trust.communityVouchedCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('rates')}
              className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'rates'
                  ? 'bg-[#0F254A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.tabRateCard}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'reviews'
                  ? 'bg-[#0F254A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.tabReviews}
            </button>
          </div>

          {/* TAB 1: OVERVIEW & BIO */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-[#0F254A] uppercase tracking-wide">
                  {lang === 'fr' ? 'Biographie & Parcours Professionnel' : 'Professional Biography'}
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed mt-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {bio}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                  <span className="text-xs text-slate-500 block font-medium">
                    {lang === 'fr' ? 'Atelier Principal' : 'Registered Workshop'}
                  </span>
                  <span className="text-sm font-bold text-[#0F254A] mt-0.5 block">
                    {artisan.workshopAddress}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                  <span className="text-xs text-slate-500 block font-medium">
                    {lang === 'fr' ? 'Délai d’intervention moyen' : 'Average Response Time'}
                  </span>
                  <span className="text-sm font-bold text-emerald-700 mt-0.5 block">
                    ~{artisan.responseTimeMinutes} {lang === 'fr' ? 'minutes après contact' : 'minutes upon contact'}
                  </span>
                </div>
              </div>

              {/* Sample portfolio highlight */}
              {artisan.portfolio.length > 0 && (
                <div className="pt-2">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    {lang === 'fr' ? 'Chantier Témoin Récent' : 'Recent Showcase Project'}
                  </h4>
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                    <div className="aspect-[16/9] w-full overflow-hidden">
                      <img
                        src={artisan.portfolio[0].imageUrl}
                        alt={artisan.portfolio[0].title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 bg-white flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-800">
                          {lang === 'fr' ? artisan.portfolio[0].titleFr : artisan.portfolio[0].title}
                        </span>
                        <span className="text-slate-400 ml-2">· {artisan.portfolio[0].year}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {artisan.portfolio[0].tag}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CREDENTIALS & GUILD SCORE */}
          {activeTab === 'credentials' && (
            <div className="space-y-4">
              {/* CNI Proof Box */}
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                    <ShieldCheck size={18} className="text-[#059669]" />
                    <span>{t.cniVerifiedProof}</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-white border border-emerald-200 px-2 py-0.5 rounded-full">
                    VALIDE
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  {t.cniAuthority}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-1 text-slate-700">
                  <span>Numéro CNI : <strong>{artisan.trust.cniNumberMasked}</strong></span>
                  <span>Date d’audit : <strong>{artisan.trust.idVerifiedDate}</strong></span>
                </div>
              </div>

              {/* Guild Assessment Box */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-base text-[#0F254A]">
                      {t.guildScoreTitle}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {artisan.trust.skillGuildName}
                    </p>
                  </div>
                  <div className="bg-[#0F254A] text-white px-3 py-1.5 rounded-xl text-center shrink-0">
                    <span className="block text-xl font-extrabold tabular-nums">
                      {artisan.trust.skillTestScore}/100
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300">
                      Score Global
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600">
                  {t.guildScoreSub}
                </p>

                {/* Score breakdown metrics */}
                <div className="space-y-3 pt-2">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>{t.safetyScore}</span>
                      <span className="tabular-nums font-bold">100%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full w-full"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>{t.toolingScore}</span>
                      <span className="tabular-nums font-bold">96%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-[#0F254A] rounded-full w-[96%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>{t.stabilityScore}</span>
                      <span className="tabular-nums font-bold">98%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-[#EA580C] rounded-full w-[98%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COMMUNITY GUARANTORS */}
          {activeTab === 'guarantors' && (
            <div className="space-y-4">
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
                <Info size={16} className="text-amber-700 shrink-0 mt-0.5" />
                <p>{t.guarantorsNotice}</p>
              </div>

              <div className="space-y-3">
                {artisan.guarantors.map((g, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-2xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sm text-[#0F254A]">{g.name}</span>
                          <CheckCircle2 size={14} className="text-emerald-600" />
                        </div>
                        <span className="text-xs font-semibold text-[#EA580C] block mt-0.5">
                          {g.role}
                        </span>
                        <span className="text-xs text-slate-400 block mt-0.5">
                          {g.location} · {g.relationship}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md shrink-0">
                        {g.dateVouched}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 italic mt-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      « {g.comment} »
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
                      <span>Ligne certifiée : {g.phoneMasked}</span>
                      <span className="text-emerald-700 font-bold uppercase tracking-wider">Audit Physique Réussi</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TRANSPARENT RATE CARD */}
          {activeTab === 'rates' && (
            <div className="space-y-4">
              <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3.5 text-xs text-blue-900 flex items-start gap-2.5">
                <Info size={16} className="text-blue-700 shrink-0 mt-0.5" />
                <p>{t.rateCardNotice}</p>
              </div>

              <div className="divide-y divide-slate-200 border border-slate-200 rounded-2xl overflow-hidden bg-white">
                {artisan.rateCard.map((item, idx) => (
                  <div key={idx} className="p-4 hover:bg-slate-50/50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="font-bold text-sm text-[#0F254A]">
                        {lang === 'fr' ? item.serviceFr : item.service}
                      </span>
                      <div className="font-bold text-base text-[#EA580C] tabular-nums shrink-0">
                        {item.priceCFA.toLocaleString()} FCFA{' '}
                        <span className="text-xs font-normal text-slate-500">
                          / {lang === 'fr' ? item.unitFr : item.unit}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {lang === 'fr' ? item.descriptionFr : item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: AUDIO VOICE & WRITTEN REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {lang === 'fr' ? 'Témoignages Enregistrés sur Chantier' : 'Client Field Testimonials'}
              </h4>

              {artisan.reviews.map((rev) => {
                const isPlaying = playingVoiceId === rev.id;

                return (
                  <div
                    key={rev.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="font-bold text-sm text-[#0F254A]">{rev.author}</span>
                        <span className="text-xs text-slate-500 ml-2">· {rev.neighborhood}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} size={13} className="fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    <span className="text-xs font-semibold text-slate-600 block">
                      Chantier : {lang === 'fr' ? rev.projectCompletedFr : rev.projectCompleted}
                    </span>

                    {/* Simulated Voice Note Audio Player */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => toggleVoiceNote(rev.id)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all ${
                          isPlaying
                            ? 'bg-[#EA580C] text-white shadow-xs'
                            : 'bg-[#0F254A] text-white hover:bg-[#EA580C]'
                        }`}
                        aria-label={isPlaying ? t.pauseVoice : t.listenVoice}
                      >
                        {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                          <span className="font-medium text-emerald-700 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            {t.voiceNoteTitle}
                          </span>
                          <span className="font-mono">{rev.durationSec}s</span>
                        </div>
                        {/* Audio Waveform Bar Visualizer */}
                        <div className="flex items-center gap-1 h-5">
                          {[40, 70, 90, 50, 100, 60, 80, 45, 95, 75, 30, 85, 65, 45, 90, 70, 55, 35].map((h, i) => (
                            <div
                              key={i}
                              className={`flex-1 rounded-full transition-all duration-300 ${
                                isPlaying ? 'bg-[#059669]' : 'bg-slate-300'
                              }`}
                              style={{ height: `${isPlaying ? Math.max(20, (h * (i % 3 + 1)) % 100) : h}%` }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Audio Transcript / Message */}
                    <p className="text-xs text-slate-700 italic bg-white p-2.5 rounded-lg border border-slate-100">
                      « {rev.audioSimulatedText} »
                    </p>

                    <div className="text-[10px] text-slate-400 font-mono text-right">
                      {rev.date} · {t.verifiedClient}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Fixed Sticky Action Footer */}
        <div className="sticky bottom-0 z-20 bg-white border-t border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 hidden sm:block">
            <span>{t.callNotice}</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {/* Direct Call Action Button */}
            <button
              type="button"
              onClick={() => onCall(artisan)}
              className="flex-1 sm:flex-initial min-h-[48px] px-5 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.98]"
            >
              <Phone size={17} />
              <span>{t.btnCall}</span>
            </button>

            {/* WhatsApp Direct Connect Action Button */}
            <button
              type="button"
              onClick={() => onWhatsApp(artisan)}
              className="flex-1 sm:flex-initial min-h-[48px] px-5 py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803d] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.98]"
            >
              <WhatsAppIcon size={19} />
              <span>{t.btnWhatsApp}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
