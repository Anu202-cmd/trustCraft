import React, { useState } from 'react';
import { X, Award, CheckCircle2, Send, ShieldCheck, MapPin } from 'lucide-react';
import { Language, TradeCategory } from '../types';
import { translations } from '../translations';
import { submitArtisanApplicationToSupabase } from '../lib/supabase';

interface ArtisanOnboardingModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
}

export const ArtisanOnboardingModal: React.FC<ArtisanOnboardingModalProps> = ({
  isOpen,
  lang,
  onClose,
}) => {
  const [fullName, setFullName] = useState('');
  const [trade, setTrade] = useState<TradeCategory>('carpentry');
  const [years, setYears] = useState('8');
  const [city, setCity] = useState<'Douala' | 'Yaoundé'>('Douala');
  const [quarter, setQuarter] = useState('Akwa');
  const [phone, setPhone] = useState('');
  const [cniNumber, setCniNumber] = useState('');
  const [guarantorName, setGuarantorName] = useState('');
  const [guarantorPhone, setGuarantorPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const t = translations[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await submitArtisanApplicationToSupabase({
      fullName,
      trade,
      experienceYears: parseInt(years, 10) || 1,
      city,
      neighborhood: quarter,
      phone,
      cniNumber,
      guarantorName,
      guarantorPhone,
    });

    setLoading(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div 
        className="relative bg-white rounded-t-[32px] sm:rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border-t sm:border border-slate-200 animate-in slide-in-from-bottom duration-300"
        role="dialog"
        aria-modal="true"
      >
        {/* iOS Drag Handle */}
        <div className="pt-2.5 pb-1 flex justify-center sm:hidden bg-[#0F254A]" onClick={handleReset}>
          <div className="w-10 h-1.2 bg-white/40 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="px-6 py-4 bg-[#0F254A] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/10 text-emerald-400 flex items-center justify-center">
              <Award size={18} />
            </div>
            <div>
              <h2 className="font-display font-bold text-base">
                {t.joinModalTitle}
              </h2>
              <span className="text-xs text-slate-300 block">
                {t.joinModalSub}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-white rounded-full transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#059669] flex items-center justify-center mx-auto border-4 border-emerald-50">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-xl font-bold text-[#0F254A]">
              {t.joinSuccessTitle}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
              {t.joinSuccessSub}
            </p>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-2 mt-4">
              <div className="flex justify-between text-slate-500">
                <span>Artisan :</span>
                <strong className="text-slate-800">{fullName}</strong>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Métier & Atelier :</span>
                <strong className="text-slate-800 capitalize">{trade} · {quarter}, {city}</strong>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Parrain indiqué :</span>
                <strong className="text-slate-800">{guarantorName} ({guarantorPhone})</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="w-full py-3 px-4 rounded-xl bg-[#0F254A] hover:bg-[#00102d] text-white font-bold text-xs cursor-pointer transition-all"
            >
              {lang === 'fr' ? 'Fermer' : 'Close'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            
            {/* Full Name & Trade */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t.joinFullName}
                </label>
                <input
                  required
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ex. Samuel Ndoumbe"
                  className="w-full min-h-[44px] px-3 rounded-xl border border-slate-200 focus:border-[#0F254A] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t.joinTrade}
                </label>
                <select
                  value={trade}
                  onChange={(e) => setTrade(e.target.value as TradeCategory)}
                  className="w-full min-h-[44px] px-3 rounded-xl border border-slate-200 focus:border-[#0F254A] bg-white outline-none font-medium"
                >
                  <option value="carpentry">{t.carpentry}</option>
                  <option value="plumbing">{t.plumbing}</option>
                  <option value="electrical">{t.electrical}</option>
                  <option value="masonry">{t.masonry}</option>
                  <option value="hvac">{t.hvac}</option>
                  <option value="welding">{t.welding}</option>
                  <option value="painting">{t.painting}</option>
                  <option value="tiling">{t.tiling}</option>
                </select>
              </div>
            </div>

            {/* City & Quarter */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Ville Principale
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value as any)}
                  className="w-full min-h-[44px] px-3 rounded-xl border border-slate-200 focus:border-[#0F254A] bg-white outline-none font-medium"
                >
                  <option value="Douala">Douala</option>
                  <option value="Yaoundé">Yaoundé</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t.joinQuarter}
                </label>
                <input
                  required
                  type="text"
                  value={quarter}
                  onChange={(e) => setQuarter(e.target.value)}
                  placeholder="Ex. Akwa Nord"
                  className="w-full min-h-[44px] px-3 rounded-xl border border-slate-200 focus:border-[#0F254A] outline-none"
                />
              </div>
            </div>

            {/* Phone & CNI */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t.joinPhone}
                </label>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+237 699 00 00 00"
                  className="w-full min-h-[44px] px-3 rounded-xl border border-slate-200 focus:border-[#0F254A] outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t.joinCniNumber}
                </label>
                <input
                  required
                  type="text"
                  value={cniNumber}
                  onChange={(e) => setCniNumber(e.target.value)}
                  placeholder="Ex. 108239023"
                  className="w-full min-h-[44px] px-3 rounded-xl border border-slate-200 focus:border-[#0F254A] outline-none font-mono"
                />
              </div>
            </div>

            {/* Guarantor Info */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <span className="font-bold text-slate-800 block text-xs">
                {lang === 'fr' ? 'Caution Morale ou Notabilité Référente' : 'Primary Community Guarantor'}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">
                    {t.joinGuarantorName}
                  </label>
                  <input
                    required
                    type="text"
                    value={guarantorName}
                    onChange={(e) => setGuarantorName(e.target.value)}
                    placeholder="Ex. Chef de Quartier / Maître Bell"
                    className="w-full min-h-[40px] px-3 rounded-xl border border-slate-200 bg-white focus:border-[#0F254A] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-600 mb-1">
                    {t.joinGuarantorPhone}
                  </label>
                  <input
                    required
                    type="tel"
                    value={guarantorPhone}
                    onChange={(e) => setGuarantorPhone(e.target.value)}
                    placeholder="+237 677 00 00 00"
                    className="w-full min-h-[40px] px-3 rounded-xl border border-slate-200 bg-white focus:border-[#0F254A] outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-[#0F254A] hover:bg-[#00102d] disabled:bg-slate-400 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98] cursor-pointer"
              >
                {loading ? (
                  <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <ShieldCheck size={18} />
                )}
                <span>{loading ? (lang === 'fr' ? 'Enregistrement de la candidature...' : 'Submitting Application...') : t.joinSubmitBtn}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
