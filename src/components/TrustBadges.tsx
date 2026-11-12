import React from 'react';
import { ShieldCheck, Award, Users } from 'lucide-react';
import { Language, TrustBadgeData } from '../types';
import { translations } from '../translations';

interface TrustBadgesProps {
  trust: TrustBadgeData;
  lang: Language;
  size?: 'sm' | 'md';
  onBadgeClick?: (type: 'identity' | 'skill' | 'community') => void;
}

export const TrustBadges: React.FC<TrustBadgesProps> = ({
  trust,
  lang,
  size = 'md',
  onBadgeClick,
}) => {
  const t = translations[lang];

  const isSmall = size === 'sm';
  const iconSize = isSmall ? 13 : 15;
  const paddingClass = isSmall ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {/* 1. Identity Checked Badge */}
      {trust.identityChecked && (
        <button
          type="button"
          onClick={() => onBadgeClick?.('identity')}
          className={`inline-flex items-center gap-1.5 font-semibold rounded-full border transition-all select-none ${paddingClass} ${
            onBadgeClick ? 'cursor-pointer hover:shadow-xs active:scale-95' : 'cursor-default'
          }`}
          style={{
            backgroundColor: '#ECFDF5',
            color: '#059669',
            borderColor: '#A7F3D0',
          }}
          title={t.badgeIdentityChecked}
        >
          <ShieldCheck size={iconSize} className="shrink-0 stroke-[2.2]" />
          <span className="whitespace-nowrap tracking-tight">{t.badgeIdentityChecked}</span>
        </button>
      )}

      {/* 2. Practical Skill Assessed Badge */}
      {trust.skillAssessed && (
        <button
          type="button"
          onClick={() => onBadgeClick?.('skill')}
          className={`inline-flex items-center gap-1.5 font-semibold rounded-full border transition-all select-none ${paddingClass} ${
            onBadgeClick ? 'cursor-pointer hover:shadow-xs active:scale-95' : 'cursor-default'
          }`}
          style={{
            backgroundColor: '#F1F5F9',
            color: '#0F254A',
            borderColor: '#CBD5E1',
          }}
          title={`${t.badgeSkillAssessed} (${trust.skillTestScore}/100)`}
        >
          <Award size={iconSize} className="shrink-0 stroke-[2.2]" />
          <span className="whitespace-nowrap tracking-tight">
            {t.badgeSkillAssessed}
          </span>
        </button>
      )}

      {/* 3. Community Vouched Badge */}
      <button
        type="button"
        onClick={() => onBadgeClick?.('community')}
        className={`inline-flex items-center gap-1.5 font-semibold rounded-full border transition-all select-none ${paddingClass} ${
          onBadgeClick ? 'cursor-pointer hover:shadow-xs active:scale-95' : 'cursor-default'
        }`}
        style={{
          backgroundColor: '#FFF7ED',
          color: '#C2410C',
          borderColor: '#FED7AA',
        }}
        title={`${trust.communityVouchedCount} ${t.vouchedSuffix}`}
      >
        <Users size={iconSize} className="shrink-0 stroke-[2.2]" />
        <span className="whitespace-nowrap tracking-tight">
          {trust.communityVouchedCount} {t.vouchedSuffix}
        </span>
      </button>
    </div>
  );
};
