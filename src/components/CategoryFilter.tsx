import React from 'react';
import { 
  Hammer, 
  Wrench, 
  Zap, 
  Flame, 
  Paintbrush, 
  Layers, 
  Wind, 
  ShieldCheck, 
  Grid 
} from 'lucide-react';
import { Language, TradeCategory } from '../types';
import { translations } from '../translations';

interface CategoryFilterProps {
  lang: Language;
  selectedCategory: TradeCategory | 'all';
  onSelectCategory: (category: TradeCategory | 'all') => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  lang,
  selectedCategory,
  onSelectCategory,
}) => {
  const t = translations[lang];

  const categories: Array<{
    id: TradeCategory | 'all';
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
  }> = [
    { id: 'all', label: t.allCategories, icon: Grid },
    { id: 'carpentry', label: t.carpentry, icon: Hammer },
    { id: 'plumbing', label: t.plumbing, icon: Wrench },
    { id: 'electrical', label: t.electrical, icon: Zap },
    { id: 'masonry', label: t.masonry, icon: ShieldCheck },
    { id: 'hvac', label: t.hvac, icon: Wind },
    { id: 'welding', label: t.welding, icon: Flame },
    { id: 'painting', label: t.painting, icon: Paintbrush },
    { id: 'tiling', label: t.tiling, icon: Layers },
  ];

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2">
      <div className="flex items-center gap-2 min-w-max pb-1">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const Icon = cat.icon;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap border ${
                isSelected
                  ? 'bg-[#0F254A] text-white border-[#0F254A] shadow-xs scale-[1.02]'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Icon
                size={16}
                className={isSelected ? 'text-[#EA580C]' : 'text-slate-500'}
              />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
