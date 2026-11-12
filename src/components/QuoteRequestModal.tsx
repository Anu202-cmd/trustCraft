import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2, ShieldCheck, MapPin, Clock } from 'lucide-react';
import { Language, TradeCategory } from '../types';
import { translations } from '../translations';
import { submitQuoteRequestToSupabase } from '../lib/supabase';

interface QuoteRequestModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
  preselectedTrade?: TradeCategory;
  preselectedCity?: 'Douala' | 'Yaoundé';
}

export const QuoteRequestModal: React.FC<QuoteRequestModalProps> = ({
  isOpen,
  lang,
  onClose,
  preselectedTrade,
  preselectedCity,
}) => {
  const [trade, setTrade] = useState<TradeCategory>(preselectedTrade || 'plumbing');
  const [city, setCity] = useState<'Douala' | 'Yaoundé'>(preselectedCity || 'Douala');
  const [quarter, setQuarter] = useState('Akwa');
  const [urgency, setUrgency] = useState<'emergency' | 'today' | 'this_week'>('today');
  const [description, setDescription] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [budgetEst, setBudgetEst] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const t = translations[lang];

  const doualaQuarters = ['Akwa', 'Bonanjo', 'Bonamoussadi', 'Makepe', 'Deido', 'Bali', 'Logpom'];
  const yaoundeQuarters = ['Bastos', 'Biyem-Assi', 'Omnisports', 'Mendong', 'Tsinga', 'Essos'];
  const activeQuarters = city === 'Douala' ? doualaQuarters : yaoundeQuarters;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const parsedBudget = parseInt(budgetEst.replace(/\D/g, ''), 10) || undefined;
    await submitQuoteRequestToSupabase({
      clientName,
      clientPhone,
      city,
      neighborhood: quarter,
      trade,
      urgency,
      description,
      budgetEstCFA: parsedBudget,
    });

    setLoading(false);
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
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
        <div className="pt-2.5 pb-1 flex justify-center sm:hidden" onClick={handleResetAndClose}>
          <div className="w-10 h-1.2 bg-slate-300 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#EA580C] text-white flex items-center justify-center">
              <Sparkles size={17} />
            </div>
            <div>
              <h2 className="font-display font-bold text-base text-[#0F254A]">
                {t.quoteModalTitle}
              </h2>
              <span className="text-xs text-slate-500 block">
                {t.quoteModalSub}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#059669] flex items-center justify-center mx-auto border-4 border-emerald-50">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-xl font-bold text-[#0F254A]">
              {t.quoteSuccessTitle}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
              {t.quoteSuccessSub}
            </p>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-2 mt-4">
              <div className="flex justify-between text-slate-500">
                <span>{t.quoteTrade}:</span>
                <strong className="text-slate-800 capitalize">{trade}</strong>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>{t.quoteQuarter}:</span>
                <strong className="text-slate-800">{quarter}, {city}</strong>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Client :</span>
                <strong className="text-slate-800">{clientName || 'Client'} ({clientPhone || '+237'})</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="w-full py-3 px-4 rounded-xl bg-[#0F254A] hover:bg-[#00102d] text-white font-bold text-xs cursor-pointer transition-all"
            >
              {lang === 'fr' ? 'Retourner aux artisans' : 'Return to Directory'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            
            {/* Trade & Urgency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t.quoteTrade}
                </label>
                <select
                  value={trade}
                  onChange={(e) => setTrade(e.target.value as TradeCategory)}
                  className="w-full min-h-[44px] px-3 rounded-xl border border-slate-200 focus:border-[#0F254A] bg-white outline-none font-medium"
                >
                  <option value="plumbing">{t.plumbing}</option>
                  <option value="electrical">{t.electrical}</option>
                  <option value="carpentry">{t.carpentry}</option>
                  <option value="masonry">{t.masonry}</option>
                  <option value="hvac">{t.hvac}</option>
                  <option value="welding">{t.welding}</option>
                  <option value="painting">{t.painting}</option>
                  <option value="tiling">{t.tiling}</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t.quoteUrgency}
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value as any)}
                  className="w-full min-h-[44px] px-3 rounded-xl border border-slate-200 focus:border-[#0F254A] bg-white outline-none font-medium"
                >
                  <option value="emergency">{t.urgencyEmergency}</option>
                  <option value="today">{t.urgencyToday}</option>
                  <option value="this_week">{t.urgencyWeek}</option>
                </select>
              </div>
            </div>

            {/* City & Quarter */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t.quoteCity}
                </label>
                <select
                  value={city}
                  onChange={(e) => {
                    const newCity = e.target.value as 'Douala' | 'Yaoundé';
                    setCity(newCity);
                    setQuarter(newCity === 'Douala' ? 'Akwa' : 'Bastos');
                  }}
                  className="w-full min-h-[44px] px-3 rounded-xl border border-slate-200 focus:border-[#0F254A] bg-white outline-none font-medium"
                >
                  <option value="Douala">Douala</option>
                  <option value="Yaoundé">Yaoundé</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t.quoteQuarter}
                </label>
                <select
                  value={quarter}
                  onChange={(e) => setQuarter(e.target.value)}
                  className="w-full min-h-[44px] px-3 rounded-xl border border-slate-200 focus:border-[#0F254A] bg-white outline-none font-medium"
                >
                  {activeQuarters.map((q) => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {t.quoteDesc}
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.quoteDescPlaceholder}
                className="w-full p-3 rounded-xl border border-slate-200 focus:border-[#0F254A] text-slate-900 outline-none resize-none leading-relaxed"
              />
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t.quoteName}
                </label>
                <input
                  required
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ex. Emmanuel Ekotto"
                  className="w-full min-h-[44px] px-3 rounded-xl border border-slate-200 focus:border-[#0F254A] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t.quotePhone}
                </label>
                <input
                  required
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="+237 699 00 00 00"
                  className="w-full min-h-[44px] px-3 rounded-xl border border-slate-200 focus:border-[#0F254A] outline-none font-mono"
                />
              </div>
            </div>

            {/* Optional Budget */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {t.quoteBudget}
              </label>
              <input
                type="text"
                value={budgetEst}
                onChange={(e) => setBudgetEst(e.target.value)}
                placeholder="Ex. 25,000 FCFA"
                className="w-full min-h-[44px] px-3 rounded-xl border border-slate-200 focus:border-[#0F254A] outline-none"
              />
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] disabled:bg-slate-300 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98] cursor-pointer"
              >
                {loading ? (
                  <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <Send size={16} />
                )}
                <span>{loading ? (lang === 'fr' ? 'Enregistrement dans la base...' : 'Saving to Database...') : t.quoteSubmit}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
