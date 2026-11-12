import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';
import { Artisan, Language } from '../types';
import { translations } from '../translations';
import { WhatsAppIcon } from './WhatsAppIcon';
import { logArtisanContactInSupabase } from '../lib/supabase';

interface WhatsAppModalProps {
  artisan: Artisan | null;
  lang: Language;
  onClose: () => void;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  artisan,
  lang,
  onClose,
}) => {
  const [clientName, setClientName] = useState('');
  const [clientQuarter, setClientQuarter] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [copied, setCopied] = useState(false);

  if (!artisan) return null;

  const t = translations[lang];
  const title = lang === 'fr' ? artisan.titleFr : artisan.titleEn;

  // Construct realistic bilingual WhatsApp message
  const defaultQuarter = clientQuarter || (artisan.city === 'Douala' ? 'Akwa' : 'Bastos');
  const defaultName = clientName || (lang === 'fr' ? 'un client' : 'a client');

  const generatedMessage = lang === 'fr'
    ? `Bonjour Maître ${artisan.name},\n\nJe vous contacte via la plateforme Artisan Trust Marketplace.\nMon nom : ${defaultName}\nLocalisation du chantier : ${defaultQuarter} (${artisan.city})\n\nBesoin / Travaux : ${jobDescription || 'Intervention rapide et devis'}\n\nÊtes-vous disponible pour une visite de diagnostic ou un échange ? Merci !`
    : `Hello Master ${artisan.name},\n\nI am contacting you through Artisan Trust Marketplace.\nMy name: ${defaultName}\nSite location: ${defaultQuarter} (${artisan.city})\n\nService needed: ${jobDescription || 'Prompt inspection and quote'}\n\nAre you available for a diagnostic visit or a call? Thank you!`;

  const waUrl = `https://wa.me/${artisan.whatsappNumber}?text=${encodeURIComponent(generatedMessage)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    logArtisanContactInSupabase({
      artisanId: artisan.id,
      artisanName: artisan.name,
      channel: 'whatsapp',
      clientName: clientName || undefined,
      neighborhood: clientQuarter || undefined,
    });
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div 
        className="relative bg-white rounded-t-[32px] sm:rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border-t sm:border border-slate-200 animate-in slide-in-from-bottom duration-300"
        role="dialog"
        aria-modal="true"
      >
        {/* iOS Drag Handle */}
        <div className="pt-2.5 pb-1 flex justify-center sm:hidden" onClick={onClose}>
          <div className="w-10 h-1.2 bg-slate-300 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="px-5 sm:px-6 py-3.5 bg-emerald-50/70 border-b border-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#16A34A] text-white flex items-center justify-center">
              <WhatsAppIcon size={18} />
            </div>
            <div>
              <h2 className="font-display font-bold text-base text-[#0F254A]">
                {t.waModalTitle}
              </h2>
              <span className="text-xs text-emerald-800 font-semibold block">
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

        {/* Form Body */}
        <div className="p-5 sm:p-6 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            {t.waModalSub}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t.waYourName}
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Ex. Emmanuel Ekotto"
                className="w-full min-h-[44px] px-3 rounded-xl border border-slate-200 focus:border-[#0F254A] text-xs text-slate-900 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t.waYourQuarter}
              </label>
              <input
                type="text"
                value={clientQuarter}
                onChange={(e) => setClientQuarter(e.target.value)}
                placeholder={artisan.city === 'Douala' ? 'Ex. Bonamoussadi' : 'Ex. Bastos'}
                className="w-full min-h-[44px] px-3 rounded-xl border border-slate-200 focus:border-[#0F254A] text-xs text-slate-900 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t.waProjectDesc}
            </label>
            <textarea
              rows={2}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder={lang === 'fr' ? 'Ex. Pose de 4 portes en bois massif et serrure de sécurité...' : 'Ex. 4 solid wood doors installation and locks...'}
              className="w-full p-3 rounded-xl border border-slate-200 focus:border-[#0F254A] text-xs text-slate-900 outline-none resize-none"
            />
          </div>

          {/* Generated Message Preview */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1">
              <span>{t.waPreviewLabel}</span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs text-[#0F254A] hover:text-[#EA580C] inline-flex items-center gap-1 font-semibold cursor-pointer"
              >
                {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                <span>{copied ? (lang === 'fr' ? 'Copié !' : 'Copied!') : t.waCopyBtn}</span>
              </button>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-700 whitespace-pre-line leading-relaxed">
              {generatedMessage}
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
            <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
            <span>{t.waDirectDialNotice}</span>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-[#16A34A] hover:bg-[#15803d] text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-[0.98] cursor-pointer"
          >
            <WhatsAppIcon size={20} />
            <span>{t.waSendBtn}</span>
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
