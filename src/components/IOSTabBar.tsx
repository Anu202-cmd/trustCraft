import React from 'react';
import { Compass, ShieldCheck, Sparkles, Database, UserPlus } from 'lucide-react';
import { Language } from '../types';

export type IOSTabId = 'explore' | 'verification' | 'quote' | 'supabase';

interface IOSTabBarProps {
  activeTab: IOSTabId;
  onTabChange: (tab: IOSTabId) => void;
  lang: Language;
}

export const IOSTabBar: React.FC<IOSTabBarProps> = ({
  activeTab,
  onTabChange,
  lang,
}) => {
  const tabs: Array<{
    id: IOSTabId;
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
  }> = [
    {
      id: 'explore',
      label: lang === 'fr' ? 'Artisans' : 'Artisans',
      icon: Compass,
    },
    {
      id: 'verification',
      label: lang === 'fr' ? 'Vérification' : 'Trust System',
      icon: ShieldCheck,
    },
    {
      id: 'quote',
      label: lang === 'fr' ? 'Devis Express' : 'Request Quote',
      icon: Sparkles,
    },
    {
      id: 'supabase',
      label: 'Supabase DB',
      icon: Database,
    },
  ];

  return (
    <div className="sticky bottom-0 z-40 bg-white/90 backdrop-blur-xl border-t border-slate-200/80 pt-1 pb-1 select-none">
      <div className="grid grid-cols-4 items-center max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 min-h-[48px] transition-all cursor-pointer ${
                isActive ? 'text-[#0F254A] font-bold scale-[1.03]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className="relative">
                <Icon
                  size={20}
                  className={`transition-colors ${
                    isActive ? 'stroke-[2.5] text-[#EA580C]' : 'stroke-[1.8]'
                  }`}
                />
                {tab.id === 'supabase' && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-0.5 leading-none font-medium truncate max-w-[70px]">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* iOS Home Indicator Bar */}
      <div className="pt-1 pb-1">
        <div className="w-32 h-1 bg-slate-900/30 rounded-full mx-auto"></div>
      </div>
    </div>
  );
};
