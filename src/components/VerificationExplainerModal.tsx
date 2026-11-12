import React from 'react';
import { X, ShieldCheck, Award, Users, CheckCircle2, ChevronRight, Lock } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface VerificationExplainerModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
  onPostJob: () => void;
}

export const VerificationExplainerModal: React.FC<VerificationExplainerModalProps> = ({
  isOpen,
  lang,
  onClose,
  onPostJob,
}) => {
  if (!isOpen) return null;

  const t = translations[lang];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div 
        className="relative bg-white rounded-t-[32px] sm:rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border-t sm:border border-slate-200 animate-in slide-in-from-bottom duration-300 flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* iOS Drag Handle */}
        <div className="pt-2.5 pb-1 flex justify-center sm:hidden bg-[#0F254A]" onClick={onClose}>
          <div className="w-10 h-1.2 bg-white/40 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="px-6 py-4 sm:py-5 bg-[#0F254A] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h2 className="font-display font-bold text-base sm:text-lg">
                {t.trustSystemHeading}
              </h2>
              <span className="text-xs text-slate-300">
                {lang === 'fr' ? 'Protocole d’audit terrain à Douala et Yaoundé' : 'Field audit protocol in Douala & Yaoundé'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-slate-50 p-4 rounded-2xl border border-slate-200">
            {t.trustSystemLead}
          </p>

          <div className="space-y-4">
            {/* TIER 1 */}
            <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/40 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm sm:text-base">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-black">
                  1
                </div>
                <span>{t.tier1Title}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-9">
                {t.tier1Desc}
              </p>
              <div className="pl-9 pt-1 flex items-center gap-2 text-[11px] font-semibold text-emerald-700">
                <CheckCircle2 size={13} />
                <span>CNI Biométrique certifiée · Justificatif de domicile physique</span>
              </div>
            </div>

            {/* TIER 2 */}
            <div className="p-5 rounded-2xl border border-blue-200 bg-blue-50/40 space-y-2">
              <div className="flex items-center gap-2 text-[#0F254A] font-bold text-sm sm:text-base">
                <div className="w-7 h-7 rounded-lg bg-[#0F254A] text-white flex items-center justify-center text-xs font-black">
                  2
                </div>
                <span>{t.tier2Title}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-9">
                {t.tier2Desc}
              </p>
              <div className="pl-9 pt-1 flex items-center gap-2 text-[11px] font-semibold text-[#0F254A]">
                <Award size={13} />
                <span>Note minimale requise : 90/100 · Contrôle d’outillage et sécurité</span>
              </div>
            </div>

            {/* TIER 3 */}
            <div className="p-5 rounded-2xl border border-orange-200 bg-orange-50/40 space-y-2">
              <div className="flex items-center gap-2 text-[#EA580C] font-bold text-sm sm:text-base">
                <div className="w-7 h-7 rounded-lg bg-[#EA580C] text-white flex items-center justify-center text-xs font-black">
                  3
                </div>
                <span>{t.tier3Title}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-9">
                {t.tier3Desc}
              </p>
              <div className="pl-9 pt-1 flex items-center gap-2 text-[11px] font-semibold text-[#EA580C]">
                <Users size={13} />
                <span>Chefs de quartier traditionnels · Responsables BTP · Maîtres pairs</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-100 rounded-xl text-xs text-slate-700 flex items-start gap-3">
            <Lock size={18} className="text-[#0F254A] shrink-0 mt-0.5" />
            <p>
              {lang === 'fr'
                ? 'En cas de litige ou de désaccord sur un chantier, la corporation et les garants communautaires interviennent sous 24h pour une médiation amiable ou le remplacement sans frais de l’artisan.'
                : 'In case of site dispute, the guild council and community guarantors step in within 24 hours for mediation or complimentary craftsman replacement.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            {lang === 'fr' ? 'Fermer' : 'Close'}
          </button>
          
          <button
            type="button"
            onClick={() => {
              onClose();
              onPostJob();
            }}
            className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
          >
            <span>{t.ctaPostJob}</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
