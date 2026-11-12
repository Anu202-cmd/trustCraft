import React, { useState, useEffect } from 'react';
import { 
  X, 
  Database, 
  Check, 
  Copy, 
  CheckCircle2, 
  RefreshCw, 
  ExternalLink,
  Table,
  FileCode,
  Inbox,
  Clock,
  MapPin,
  Phone,
  User,
  Sparkles
} from 'lucide-react';
import { supabase, SUPABASE_PROJECT_ID, SUPABASE_URL } from '../lib/supabase';
import { Language } from '../types';

interface SupabaseModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
}

export const SupabaseModal: React.FC<SupabaseModalProps> = ({
  isOpen,
  lang,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'records' | 'links' | 'sql'>('records');
  const [checking, setChecking] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  // Live Records
  const [quoteRequests, setQuoteRequests] = useState<any[]>([]);
  const [artisanApps, setArtisanApps] = useState<any[]>([]);
  const [interactions, setInteractions] = useState<any[]>([]);
  const [loadingRecords, setLoadingRecords] = useState(false);

  const fetchRecords = async () => {
    setLoadingRecords(true);
    try {
      // 1. Fetch quote requests
      const { data: quotes, error: qError } = await supabase
        .from('quote_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (!qError && quotes) {
        setQuoteRequests(quotes);
      } else {
        const local = JSON.parse(localStorage.getItem('local_quote_requests') || '[]');
        setQuoteRequests(local);
      }

      // 2. Fetch artisan applications
      const { data: apps, error: aError } = await supabase
        .from('artisan_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (!aError && apps) {
        setArtisanApps(apps);
      } else {
        const localApps = JSON.parse(localStorage.getItem('local_artisan_applications') || '[]');
        setArtisanApps(localApps);
      }

      // 3. Fetch interactions
      const { data: inters, error: iError } = await supabase
        .from('artisan_interactions')
        .select('*')
        .order('timestamp', { ascending: false });

      if (!iError && inters) {
        setInteractions(inters);
      }
    } catch {
      // Fallback to local storage
      setQuoteRequests(JSON.parse(localStorage.getItem('local_quote_requests') || '[]'));
      setArtisanApps(JSON.parse(localStorage.getItem('local_artisan_applications') || '[]'));
    } finally {
      setLoadingRecords(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchRecords();
    }
  }, [isOpen]);

  const sqlSchema = `-- =========================================================
-- Artisan Trust Marketplace - Supabase PostgreSQL Schema
-- Project: https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql
-- =========================================================

-- 1. Table for Certified Artisans
CREATE TABLE IF NOT EXISTS public.artisans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  trade TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  city TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  experience_years INTEGER NOT NULL,
  available_today BOOLEAN DEFAULT true,
  response_time_minutes INTEGER DEFAULT 15,
  rating NUMERIC DEFAULT 4.9,
  review_count INTEGER DEFAULT 0,
  completed_jobs_count INTEGER DEFAULT 0,
  avatar_url TEXT NOT NULL,
  phone_display TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  base_daily_rate_cfa NUMERIC NOT NULL,
  workshop_address TEXT NOT NULL,
  bio_en TEXT NOT NULL,
  bio_fr TEXT NOT NULL,
  trust JSONB NOT NULL,
  guarantors JSONB NOT NULL,
  rate_card JSONB NOT NULL,
  reviews JSONB NOT NULL,
  portfolio JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Table for Client Express Quote Requests
CREATE TABLE IF NOT EXISTS public.quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  city TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  trade TEXT NOT NULL,
  urgency TEXT NOT NULL,
  description TEXT NOT NULL,
  budget_cfa NUMERIC,
  status TEXT DEFAULT 'pending_dispatch',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Table for Artisan Accreditation Applications
CREATE TABLE IF NOT EXISTS public.artisan_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  trade TEXT NOT NULL,
  experience_years INTEGER NOT NULL,
  city TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  phone TEXT NOT NULL,
  cni_number TEXT NOT NULL,
  guarantor_name TEXT NOT NULL,
  guarantor_phone TEXT NOT NULL,
  audit_status TEXT DEFAULT 'scheduled_field_inspection',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Table for Artisan Interactions & Contact Logs
CREATE TABLE IF NOT EXISTS public.artisan_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artisan_id TEXT NOT NULL,
  artisan_name TEXT NOT NULL,
  channel TEXT NOT NULL,
  client_name TEXT DEFAULT 'Anonymous Client',
  neighborhood TEXT DEFAULT 'Unknown',
  timestamp TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS) with Public Access
ALTER TABLE public.artisans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artisan_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artisan_interactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on artisans" ON public.artisans;
CREATE POLICY "Allow public read on artisans" ON public.artisans FOR SELECT TO public USING (true);
DROP POLICY IF EXISTS "Allow public insert on artisans" ON public.artisans;
CREATE POLICY "Allow public insert on artisans" ON public.artisans FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public insert on quote_requests" ON public.quote_requests;
CREATE POLICY "Allow public insert on quote_requests" ON public.quote_requests FOR INSERT TO public WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public read on quote_requests" ON public.quote_requests;
CREATE POLICY "Allow public read on quote_requests" ON public.quote_requests FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Allow public insert on artisan_applications" ON public.artisan_applications;
CREATE POLICY "Allow public insert on artisan_applications" ON public.artisan_applications FOR INSERT TO public WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public read on artisan_applications" ON public.artisan_applications;
CREATE POLICY "Allow public read on artisan_applications" ON public.artisan_applications FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Allow public insert on artisan_interactions" ON public.artisan_interactions;
CREATE POLICY "Allow public insert on artisan_interactions" ON public.artisan_interactions FOR INSERT TO public WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public read on artisan_interactions" ON public.artisan_interactions;
CREATE POLICY "Allow public read on artisan_interactions" ON public.artisan_interactions FOR SELECT TO public USING (true);
`;

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlSchema);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div 
        className="relative bg-white rounded-t-[32px] sm:rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl border-t sm:border border-slate-200 animate-in slide-in-from-bottom duration-300 flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* iOS Drag Handle */}
        <div className="pt-2.5 pb-1 flex justify-center sm:hidden bg-[#0F254A]" onClick={onClose}>
          <div className="w-10 h-1.2 bg-white/40 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="px-6 py-4 bg-[#0F254A] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Database size={18} />
            </div>
            <div>
              <h2 className="font-display font-bold text-base">
                {lang === 'fr' ? 'Base de Données Supabase' : 'Supabase Database & Records'}
              </h2>
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{SUPABASE_PROJECT_ID}.supabase.co</span>
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 pb-1 border-b border-slate-200 bg-slate-50 flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('records')}
            className={`px-3 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'records'
                ? 'bg-white text-[#0F254A] shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Inbox size={14} />
            <span>{lang === 'fr' ? 'Données & Demandes' : 'Live Submissions'}</span>
            <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded-full text-[10px]">
              {quoteRequests.length + artisanApps.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('links')}
            className={`px-3 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'links'
                ? 'bg-white text-[#0F254A] shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Table size={14} />
            <span>{lang === 'fr' ? 'Où les trouver sur Supabase ?' : 'Where to Find in Supabase'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sql')}
            className={`px-3 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'sql'
                ? 'bg-white text-[#0F254A] shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCode size={14} />
            <span>{lang === 'fr' ? 'Schéma SQL' : 'SQL Script'}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6 text-xs">
          
          {/* TAB 1: LIVE SUBMISSIONS */}
          {activeTab === 'records' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#0F254A]">
                    {lang === 'fr' ? 'Demandes de devis & Candidatures enregistrées' : 'Submitted Quotes & Applications'}
                  </h3>
                  <p className="text-slate-500 text-xs mt-0.5">
                    {lang === 'fr'
                      ? 'Les enregistrements sont synchronisés directement avec votre instance Supabase.'
                      : 'Records are synced directly with your live Supabase instance.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={fetchRecords}
                  disabled={loadingRecords}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 font-bold text-slate-700 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw size={13} className={loadingRecords ? 'animate-spin' : ''} />
                  <span>{lang === 'fr' ? 'Actualiser' : 'Refresh'}</span>
                </button>
              </div>

              {/* Quote Requests Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <Sparkles size={14} className="text-[#EA580C]" />
                    <span>Table `quote_requests` ({quoteRequests.length})</span>
                  </span>
                  <a
                    href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/editor`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0F254A] hover:underline inline-flex items-center gap-1"
                  >
                    <span>{lang === 'fr' ? 'Voir dans Table Editor' : 'View in Table Editor'}</span>
                    <ExternalLink size={11} />
                  </a>
                </div>

                {quoteRequests.length > 0 ? (
                  <div className="divide-y divide-slate-200 border border-slate-200 rounded-2xl overflow-hidden bg-white">
                    {quoteRequests.map((q, idx) => (
                      <div key={idx} className="p-4 hover:bg-slate-50/50 transition-colors space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">
                              {q.client_name || q.clientName}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-orange-100 text-[#EA580C]">
                              {q.trade}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {q.created_at ? new Date(q.created_at).toLocaleTimeString() : 'Récent'}
                          </span>
                        </div>

                        <p className="text-slate-700 italic">
                          « {q.description} »
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-slate-500 text-[11px] pt-1">
                          <span className="flex items-center gap-1 font-mono">
                            <Phone size={12} className="text-slate-400" />
                            <span>{q.client_phone || q.clientPhone}</span>
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} className="text-slate-400" />
                            <span>{q.neighborhood}, {q.city}</span>
                          </span>
                          {q.budget_cfa && (
                            <>
                              <span>·</span>
                              <span className="font-bold text-slate-700">
                                Budget : {Number(q.budget_cfa).toLocaleString()} FCFA
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center border border-dashed border-slate-200 rounded-2xl text-slate-400">
                    {lang === 'fr' 
                      ? 'Aucune demande envoyée pour l’instant. Cliquez sur « Demander un devis » pour tester !' 
                      : 'No quote requests yet. Click "Request a Quote" to test!'}
                  </div>
                )}
              </div>

              {/* Artisan Applications Section */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <User size={14} className="text-[#059669]" />
                    <span>Table `artisan_applications` ({artisanApps.length})</span>
                  </span>
                  <a
                    href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/editor`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0F254A] hover:underline inline-flex items-center gap-1"
                  >
                    <span>{lang === 'fr' ? 'Voir dans Table Editor' : 'View in Table Editor'}</span>
                    <ExternalLink size={11} />
                  </a>
                </div>

                {artisanApps.length > 0 ? (
                  <div className="divide-y divide-slate-200 border border-slate-200 rounded-2xl overflow-hidden bg-white">
                    {artisanApps.map((app, idx) => (
                      <div key={idx} className="p-4 hover:bg-slate-50/50 transition-colors space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="font-bold text-slate-900 text-sm">
                              {app.full_name || app.fullName}
                            </span>
                            <span className="text-slate-500 ml-2">
                              ({app.experience_years || app.experienceYears} ans d’expérience)
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                            {app.trade}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-slate-500 text-[11px]">
                          <span>Tél : <strong className="font-mono text-slate-700">{app.phone}</strong></span>
                          <span>·</span>
                          <span>CNI : <strong className="font-mono text-slate-700">{app.cni_number || app.cniNumber}</strong></span>
                          <span>·</span>
                          <span>Atelier : <strong>{app.neighborhood}, {app.city}</strong></span>
                        </div>

                        <div className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                          Parrain : <strong>{app.guarantor_name || app.guarantorName}</strong> ({app.guarantor_phone || app.guarantorPhone})
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center border border-dashed border-slate-200 rounded-2xl text-slate-400">
                    {lang === 'fr' 
                      ? 'Aucune candidature d’artisan pour l’instant. Cliquez sur « Devenir Artisan » pour postuler !' 
                      : 'No artisan applications yet. Click "Join as Artisan" to apply!'}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: DIRECT SUPABASE LINKS GUIDE */}
          {activeTab === 'links' && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-[#0F254A]">
                {lang === 'fr' ? 'Accès direct à votre projet Supabase' : 'Direct Supabase Dashboard Links'}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {lang === 'fr'
                  ? 'Pour consulter, exporter en CSV ou modifier vos tables et requêtes directement chez Supabase, utilisez ces liens rapides :'
                  : 'To view, export to CSV, or query your database tables directly on Supabase, use these direct links:'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                
                {/* Link 1: Table Editor */}
                <a
                  href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/editor`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl border-2 border-slate-200 hover:border-[#0F254A] bg-white hover:bg-slate-50 transition-all flex flex-col justify-between group shadow-2xs"
                >
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Table size={18} />
                    </div>
                    <h4 className="font-bold text-sm text-[#0F254A] flex items-center gap-1.5">
                      <span>Table Editor</span>
                      <ExternalLink size={13} className="text-slate-400" />
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      {lang === 'fr' 
                        ? 'Consultez les lignes de quote_requests, artisan_applications et contacts.' 
                        : 'View rows for quote_requests, artisan_applications, and contacts.'}
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-[#EA580C] mt-3 block">
                    Ouvrir Table Editor →
                  </span>
                </a>

                {/* Link 2: SQL Editor */}
                <a
                  href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl border-2 border-slate-200 hover:border-[#0F254A] bg-white hover:bg-slate-50 transition-all flex flex-col justify-between group shadow-2xs"
                >
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#0F254A] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <FileCode size={18} />
                    </div>
                    <h4 className="font-bold text-sm text-[#0F254A] flex items-center gap-1.5">
                      <span>SQL Editor</span>
                      <ExternalLink size={13} className="text-slate-400" />
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      {lang === 'fr' 
                        ? 'Exécutez le script SQL pour créer ou modifier les tables et les index.' 
                        : 'Run queries and execute the setup schema for tables and indexes.'}
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-[#EA580C] mt-3 block">
                    Ouvrir SQL Editor →
                  </span>
                </a>

                {/* Link 3: Database Settings */}
                <a
                  href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/settings/database`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl border-2 border-slate-200 hover:border-[#0F254A] bg-white hover:bg-slate-50 transition-all flex flex-col justify-between group shadow-2xs"
                >
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Database size={18} />
                    </div>
                    <h4 className="font-bold text-sm text-[#0F254A] flex items-center gap-1.5">
                      <span>Database Settings</span>
                      <ExternalLink size={13} className="text-slate-400" />
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      {lang === 'fr' 
                        ? 'Gérez votre mot de passe PostgreSQL, vos ports de connexion et vos sauvegardes.' 
                        : 'Manage connection strings, PostgreSQL passwords, and backups.'}
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-[#EA580C] mt-3 block">
                    Paramètres Base de Données →
                  </span>
                </a>

                {/* Link 4: API Settings */}
                <a
                  href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/settings/api`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl border-2 border-slate-200 hover:border-[#0F254A] bg-white hover:bg-slate-50 transition-all flex flex-col justify-between group shadow-2xs"
                >
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <CheckCircle2 size={18} />
                    </div>
                    <h4 className="font-bold text-sm text-[#0F254A] flex items-center gap-1.5">
                      <span>API & Clés d’accès</span>
                      <ExternalLink size={13} className="text-slate-400" />
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      {lang === 'fr' 
                        ? 'Vérifiez votre clé publique sb_publishable et votre URL de projet.' 
                        : 'Verify your publishable key and REST API endpoint settings.'}
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-[#EA580C] mt-3 block">
                    Voir Clés API →
                  </span>
                </a>

              </div>
            </div>
          )}

          {/* TAB 3: SQL SCHEMA */}
          {activeTab === 'sql' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#0F254A]">
                    {lang === 'fr' ? 'Script SQL de création des tables' : 'Table Creation SQL Script'}
                  </h3>
                  <p className="text-slate-500 text-xs mt-0.5">
                    {lang === 'fr' 
                      ? 'Exécutez ce script une fois dans votre Supabase SQL Editor.' 
                      : 'Run this script once in your Supabase SQL Editor.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopySql}
                  className="px-3 py-1.5 rounded-lg bg-[#0F254A] text-white font-bold inline-flex items-center gap-1.5 hover:bg-[#00102d] transition-colors cursor-pointer"
                >
                  {copiedSql ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copiedSql ? (lang === 'fr' ? 'Copié !' : 'Copied!') : (lang === 'fr' ? 'Copier le script' : 'Copy Script')}</span>
                </button>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-slate-300 bg-slate-900 text-slate-100">
                <pre className="p-4 text-[11px] font-mono overflow-x-auto max-h-72 leading-relaxed text-emerald-300/90">
                  {sqlSchema}
                </pre>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            {lang === 'fr' ? 'Fermer' : 'Close'}
          </button>

          <a
            href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/editor`}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[40px] px-4 py-2 rounded-xl bg-[#0F254A] hover:bg-[#00102d] text-white font-bold text-xs inline-flex items-center gap-1.5 transition-all shadow-xs"
          >
            <span>{lang === 'fr' ? 'Ouvrir Dashboard Supabase' : 'Open Supabase Dashboard'}</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
};
