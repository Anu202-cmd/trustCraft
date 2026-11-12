import React, { useState } from 'react';
import { X, Phone, Copy, Check, ShieldCheck, AlertCircle } from 'lucide-react';
import { Artisan, Language } from '../types';
import { translations } from '../translations';
import { logArtisanContactInSupabase } from '../lib/supabase';

interface CallModalProps {
  artisan: Artisan | null;
  lang: Language;
  onClose: () => void;
}

export const CallModal: React.FC<CallModalProps> = ({
  artisan,
  lang,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!artisan) return null;

  const t = translations[lang];
  const title = lang === 'fr' ? artisan.titleFr : artisan.titleEn;

  const handleCopy = () => {
    navigator.clipboard.writeText(artisan.phoneDisplay);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDial = () => {
    logArtisanContactInSupabase({
      artisanId: artisan.id,
      artisanName: artisan.name,
      channel: 'call',
    });
    window.location.href = `tel:${artisan.phoneDisplay.replace(/\s+/g, '')}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div 
        className="relative bg-white rounded-t-[32px] sm:rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border-t sm:border border-slate-200 animate-in slide-in-from-bottom duration-300"
        role="dialog"
        aria-modal="true"
      >
        {/* iOS Drag Handle */}
        <div className="pt-2.5 pb-1 flex justify-center sm:hidden" onClick={onClose}>
          <div className="w-10 h-1.2 bg-slate-300 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="px-5 py-3.5 bg-orange-50/80 border-b border-orange-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#EA580C] text-white flex items-center justify-center">
              <Phone size={17} />
            </div>
            <div>
              <h2 className="font-display font-bold text-base text-[#0F254A]">
                {t.callModalTitle}
              </h2>
              <span className="text-xs text-orange-800 font-semibold block">
                {artisan.name} · {title}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-white rounded-full transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto border-2 border-slate-200 shadow-sm">
            <img
              src={artisan.avatarUrl}
              alt={artisan.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              {t.callNumberLabel}
            </span>
            <span className="font-mono text-2xl font-extrabold text-[#0F254A] tracking-wider mt-1 block">
              {artisan.phoneDisplay}
            </span>
            <span className="text-xs text-emerald-700 font-semibold mt-1 inline-flex items-center gap-1">
              <ShieldCheck size={14} />
              <span>{lang === 'fr' ? 'Ligne directe auditée & active' : 'Verified & active line'}</span>
            </span>
          </div>

          {/* Quick Copy & Dial */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <button
              type="button"
              onClick={handleCopy}
              className="min-h-[44px] px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              <span>{copied ? (lang === 'fr' ? 'Numéro copié !' : 'Copied!') : t.callCopyNumber}</span>
            </button>

            <button
              type="button"
              onClick={handleDial}
              className="min-h-[44px] px-3 py-2 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-xs"
            >
              <Phone size={14} />
              <span>{t.callNowBtn}</span>
            </button>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left text-[11px] text-slate-600 space-y-1">
            <div className="font-bold text-[#0F254A] flex items-center gap-1">
              <AlertCircle size={13} className="text-[#EA580C]" />
              <span>{lang === 'fr' ? 'Règle de sécurité plateforme' : 'Platform Security Advice'}</span>
            </div>
            <p>{t.callNotice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
