import React from 'react';
import { ShieldCheck, MapPin, Phone, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface FooterProps {
  lang: Language;
  onOpenVerificationModal: () => void;
  onOpenJoinModal: () => void;
  onOpenQuoteModal: () => void;
  onOpenSupabaseModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onOpenVerificationModal,
  onOpenJoinModal,
  onOpenQuoteModal,
  onOpenSupabaseModal,
}) => {
  const t = translations[lang];

  return (
    <footer className="bg-[#00102D] text-slate-300 pt-14 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-800">
          
          {/* Brand & Purpose */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 text-white flex items-center justify-center">
                <ShieldCheck size={22} className="text-[#EA580C]" />
              </div>
              <span className="font-display font-extrabold text-xl text-white tracking-tight">
                Artisan Trust
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {t.footerDesc}
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <CheckCircle2 size={16} />
              <span>{lang === 'fr' ? 'Audit physique de terrain à Douala & Yaoundé' : 'Field physical audits across Douala & Yaoundé'}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {lang === 'fr' ? 'Plateforme & Confiance' : 'Platform & Trust'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={onOpenVerificationModal}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.navVerification}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenQuoteModal}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.ctaPostJob}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenJoinModal}
                  className="hover:text-white transition-colors cursor-pointer text-left text-orange-400 font-semibold"
                >
                  {t.ctaJoinArtisan}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenSupabaseModal}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left flex items-center gap-1.5 font-mono text-[11px] text-emerald-500"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Supabase: ugtffptaawwgwiswkcwz</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Regional Field Offices */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {lang === 'fr' ? 'Bureaux Régionaux de Terrain' : 'Regional Field Offices'}
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin size={15} className="text-slate-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Douala :</strong> Boulevard de la Liberté, Immeuble Akwa Center
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={15} className="text-slate-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Yaoundé :</strong> Avenue Bastos, Face Ambassade de Suisse
                </span>
              </div>
              <div className="flex items-center gap-2 pt-1 font-mono text-slate-300">
                <Phone size={14} className="text-slate-500" />
                <span>Support Usagers : +237 233 42 10 00</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {t.footerLegal}</p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenSupabaseModal}
              className="text-emerald-400 hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>Supabase Backend</span>
            </button>
            <span>·</span>
            <span>{t.footerStandards}</span>
            <span>·</span>
            <span>{t.footerSecurity}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
