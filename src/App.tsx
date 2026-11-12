import React, { useState, useMemo, useEffect } from 'react';
import { 
  ShieldCheck, 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  ArrowUpDown, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  Users, 
  Clock, 
  Phone,
  ChevronRight,
  Database,
  ExternalLink,
  Plus
} from 'lucide-react';
import { Artisan, Language, TradeCategory } from './types';
import { mockArtisans } from './data/mockArtisans';
import { translations } from './translations';
import { fetchArtisansFromSupabase, SUPABASE_PROJECT_ID } from './lib/supabase';
import { IPhoneFrame } from './components/IPhoneFrame';
import { IOSTopBar } from './components/IOSTopBar';
import { IOSTabBar, IOSTabId } from './components/IOSTabBar';
import { CategoryFilter } from './components/CategoryFilter';
import { ArtisanCard } from './components/ArtisanCard';
import { ArtisanDetailModal } from './components/ArtisanDetailModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { CallModal } from './components/CallModal';
import { QuoteRequestModal } from './components/QuoteRequestModal';
import { VerificationExplainerModal } from './components/VerificationExplainerModal';
import { ArtisanOnboardingModal } from './components/ArtisanOnboardingModal';
import { SupabaseModal } from './components/SupabaseModal';

export default function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [activeTab, setActiveTab] = useState<IOSTabId>('explore');
  
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<TradeCategory | 'all'>('all');
  const [selectedCity, setSelectedCity] = useState<string>('All Metros');
  const [selectedQuarter, setSelectedQuarter] = useState<string>('All Neighborhoods');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyAvailableToday, setOnlyAvailableToday] = useState<boolean>(false);
  const [onlyHighVouched, setOnlyHighVouched] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'rating' | 'jobs' | 'rate'>('rating');

  // Modal States
  const [selectedArtisanForDetail, setSelectedArtisanForDetail] = useState<Artisan | null>(null);
  const [selectedArtisanForWhatsApp, setSelectedArtisanForWhatsApp] = useState<Artisan | null>(null);
  const [selectedArtisanForCall, setSelectedArtisanForCall] = useState<Artisan | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState<boolean>(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState<boolean>(false);
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState<boolean>(false);

  // Dynamic Artisans from Supabase or Mock
  const [artisansList, setArtisansList] = useState<Artisan[]>(mockArtisans);
  const [dataSource, setDataSource] = useState<'supabase' | 'seed'>('seed');

  useEffect(() => {
    fetchArtisansFromSupabase().then((res) => {
      setArtisansList(res.artisans);
      setDataSource(res.source);
    });
  }, []);

  const t = translations[lang];

  // Filtering Logic
  const filteredArtisans = useMemo(() => {
    return artisansList
      .filter((artisan) => {
        if (selectedCategory !== 'all' && artisan.trade !== selectedCategory) {
          return false;
        }
        if (selectedCity !== 'All Metros' && artisan.city !== selectedCity) {
          return false;
        }
        if (
          selectedQuarter !== 'All Neighborhoods' &&
          !artisan.neighborhood.toLowerCase().includes(selectedQuarter.toLowerCase())
        ) {
          return false;
        }
        if (searchQuery.trim() !== '') {
          const query = searchQuery.toLowerCase();
          const matchName = artisan.name.toLowerCase().includes(query);
          const matchTitleEn = artisan.titleEn.toLowerCase().includes(query);
          const matchTitleFr = artisan.titleFr.toLowerCase().includes(query);
          const matchTrade = artisan.trade.toLowerCase().includes(query);
          const matchNeighborhood = artisan.neighborhood.toLowerCase().includes(query);

          if (!matchName && !matchTitleEn && !matchTitleFr && !matchTrade && !matchNeighborhood) {
            return false;
          }
        }
        if (onlyAvailableToday && !artisan.availableToday) {
          return false;
        }
        if (onlyHighVouched && artisan.trust.communityVouchedCount < 25) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'jobs') return b.completedJobsCount - a.completedJobsCount;
        if (sortBy === 'rate') return a.baseDailyRateCFA - b.baseDailyRateCFA;
        return 0;
      });
  }, [
    artisansList,
    selectedCategory,
    selectedCity,
    selectedQuarter,
    searchQuery,
    onlyAvailableToday,
    onlyHighVouched,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedCity('All Metros');
    setSelectedQuarter('All Neighborhoods');
    setSearchQuery('');
    setOnlyAvailableToday(false);
    setOnlyHighVouched(false);
    setSortBy('rating');
  };

  const handleTabSelect = (tab: IOSTabId) => {
    setActiveTab(tab);
    if (tab === 'quote') {
      setIsQuoteModalOpen(true);
    } else if (tab === 'verification') {
      setIsVerificationModalOpen(true);
    } else if (tab === 'supabase') {
      setIsSupabaseModalOpen(true);
    }
  };

  return (
    <IPhoneFrame>
      {/* 1. iOS Top Bar with Status Bar & Dynamic Island */}
      <IOSTopBar
        lang={lang}
        onLanguageChange={setLang}
        selectedCity={selectedCity}
        onCityChange={(city) => {
          setSelectedCity(city);
          setSelectedQuarter('All Neighborhoods');
        }}
        onOpenSupabase={() => setIsSupabaseModalOpen(true)}
        onOpenQuote={() => setIsQuoteModalOpen(true)}
      />

      {/* 2. Scrollable App Body */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
        
        {/* iOS Large Title Section */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                {lang === 'fr' ? '100% CNI & Garants Contrôlés' : '100% Verified Dignity'}
              </span>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-[#0F254A] tracking-tight">
                {lang === 'fr' ? 'Artisans' : 'Artisans'}
              </h1>
            </div>

            {/* Quick Action Pill: Post Job */}
            <button
              type="button"
              onClick={() => setIsQuoteModalOpen(true)}
              className="px-3 py-1.5 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold flex items-center gap-1 shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles size={13} />
              <span>{lang === 'fr' ? 'Devis' : 'Quote'}</span>
            </button>
          </div>

          {/* Native iOS Search Field */}
          <div className="relative mt-3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search size={16} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'fr' ? 'Rechercher un plombier, maçon, électricien...' : 'Search carpenter, plumber, mason...'}
              className="w-full h-10 pl-9 pr-8 rounded-xl bg-slate-200/60 focus:bg-white border border-transparent focus:border-slate-300 text-xs text-slate-900 placeholder:text-slate-500 outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* 3. iOS Trade Horizontal Segmented Control */}
        <div className="px-4 pt-1">
          <CategoryFilter
            lang={lang}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* 4. iOS Filter Chips Row */}
        <div className="px-4 py-2 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Available Today Pill */}
            <button
              type="button"
              onClick={() => setOnlyAvailableToday(!onlyAvailableToday)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all cursor-pointer flex items-center gap-1 ${
                onlyAvailableToday
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${onlyAvailableToday ? 'bg-white' : 'bg-emerald-500'}`}></span>
              <span>{lang === 'fr' ? 'Disponible' : 'Available'}</span>
            </button>

            {/* 15+ Vouchers Pill */}
            <button
              type="button"
              onClick={() => setOnlyHighVouched(!onlyHighVouched)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${
                onlyHighVouched
                  ? 'bg-[#EA580C] text-white border-[#EA580C] shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{lang === 'fr' ? '20+ Garants' : '20+ Vouched'}</span>
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1 text-[11px] text-slate-500 shrink-0">
            <ArrowUpDown size={11} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent font-bold text-slate-800 outline-none cursor-pointer"
            >
              <option value="rating">{lang === 'fr' ? 'Mieux notés' : 'Top rated'}</option>
              <option value="jobs">{lang === 'fr' ? 'Plus de chantiers' : 'Most jobs'}</option>
              <option value="rate">{lang === 'fr' ? 'Tarif croissant' : 'Lowest rate'}</option>
            </select>
          </div>
        </div>

        {/* 5. Results Counter & Reset */}
        <div className="px-4 py-1 flex items-center justify-between text-[11px] text-slate-500">
          <span>
            <strong>{filteredArtisans.length}</strong> {lang === 'fr' ? 'artisans accrédités' : 'accredited artisans'}
          </span>
          {(selectedCategory !== 'all' || selectedCity !== 'All Metros' || searchQuery || onlyAvailableToday || onlyHighVouched) && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-red-600 hover:underline font-bold inline-flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw size={10} />
              <span>{lang === 'fr' ? 'Effacer' : 'Reset'}</span>
            </button>
          )}
        </div>

        {/* 6. Feed of Artisan Cards */}
        <div className="px-4 pt-2 space-y-4">
          {filteredArtisans.length > 0 ? (
            filteredArtisans.map((artisan) => (
              <ArtisanCard
                key={artisan.id}
                artisan={artisan}
                lang={lang}
                onCall={(art) => setSelectedArtisanForCall(art)}
                onWhatsApp={(art) => setSelectedArtisanForWhatsApp(art)}
                onViewProfile={(art) => setSelectedArtisanForDetail(art)}
              />
            ))
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
              <SlidersHorizontal size={28} className="mx-auto text-slate-400" />
              <p className="text-xs font-bold text-slate-700">
                {lang === 'fr' ? 'Aucun artisan ne correspond à ce filtre' : 'No artisans found'}
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-4 py-2 bg-[#0F254A] text-white rounded-xl text-xs font-bold"
              >
                {lang === 'fr' ? 'Réinitialiser les filtres' : 'Reset filters'}
              </button>
            </div>
          )}
        </div>

        {/* 7. Quick Promotional Banner inside iOS feed */}
        <div className="mx-4 mt-6 p-4 rounded-2xl bg-gradient-to-br from-[#0F254A] to-[#00102D] text-white flex items-center justify-between gap-3 shadow-md">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              {lang === 'fr' ? 'Vous êtes maître artisan ?' : 'Are you a master artisan?'}
            </span>
            <h4 className="font-bold text-sm text-white mt-0.5">
              {lang === 'fr' ? 'Rejoindre le Réseau Accrédité' : 'Apply for Guild Accreditation'}
            </h4>
          </div>
          <button
            type="button"
            onClick={() => setIsJoinModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs shrink-0 active:scale-95 transition-transform cursor-pointer"
          >
            {lang === 'fr' ? 'Postuler' : 'Apply'}
          </button>
        </div>

      </div>

      {/* 3. iOS Bottom Tab Bar (Navigation Anchor) */}
      <IOSTabBar
        activeTab={activeTab}
        onTabChange={handleTabSelect}
        lang={lang}
      />

      {/* 4. Native iOS Bottom Sheet Modals */}
      <ArtisanDetailModal
        artisan={selectedArtisanForDetail}
        lang={lang}
        onClose={() => setSelectedArtisanForDetail(null)}
        onCall={(art) => {
          setSelectedArtisanForDetail(null);
          setSelectedArtisanForCall(art);
        }}
        onWhatsApp={(art) => {
          setSelectedArtisanForDetail(null);
          setSelectedArtisanForWhatsApp(art);
        }}
      />

      <WhatsAppModal
        artisan={selectedArtisanForWhatsApp}
        lang={lang}
        onClose={() => setSelectedArtisanForWhatsApp(null)}
      />

      <CallModal
        artisan={selectedArtisanForCall}
        lang={lang}
        onClose={() => setSelectedArtisanForCall(null)}
      />

      <QuoteRequestModal
        isOpen={isQuoteModalOpen}
        lang={lang}
        onClose={() => {
          setIsQuoteModalOpen(false);
          setActiveTab('explore');
        }}
        preselectedTrade={selectedCategory === 'all' ? undefined : selectedCategory}
        preselectedCity={selectedCity === 'All Metros' ? undefined : (selectedCity as any)}
      />

      <VerificationExplainerModal
        isOpen={isVerificationModalOpen}
        lang={lang}
        onClose={() => {
          setIsVerificationModalOpen(false);
          setActiveTab('explore');
        }}
        onPostJob={() => {
          setIsVerificationModalOpen(false);
          setIsQuoteModalOpen(true);
        }}
      />

      <ArtisanOnboardingModal
        isOpen={isJoinModalOpen}
        lang={lang}
        onClose={() => setIsJoinModalOpen(false)}
      />

      <SupabaseModal
        isOpen={isSupabaseModalOpen}
        lang={lang}
        onClose={() => {
          setIsSupabaseModalOpen(false);
          setActiveTab('explore');
        }}
      />
    </IPhoneFrame>
  );
}
