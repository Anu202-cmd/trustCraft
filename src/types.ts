export type Language = 'en' | 'fr';

export type TradeCategory = 
  | 'masonry'
  | 'plumbing'
  | 'electrical'
  | 'carpentry'
  | 'hvac'
  | 'welding'
  | 'painting'
  | 'tiling';

export interface TrustBadgeData {
  identityChecked: boolean;
  cniNumberMasked: string; // e.g. "LT-DLA-***-2023"
  idVerifiedDate: string;
  skillAssessed: boolean;
  skillTestScore: number; // e.g. 96
  skillGuildName: string; // e.g. "Chambre Régionale des Métiers du Littoral"
  communityVouchedCount: number; // e.g. 24
}

export interface CommunityGuarantor {
  name: string;
  role: string; // e.g. "Chef de Quartier Deido", "Ingénieur Travaux Eiffage Cameroun", "Master Plumber Guild President"
  location: string;
  relationship: string;
  phoneMasked: string;
  dateVouched: string;
  comment: string;
  verifiedBadge: boolean;
}

export interface RateItem {
  service: string;
  serviceFr: string;
  priceCFA: number;
  unit: string;
  unitFr: string;
  description: string;
  descriptionFr: string;
}

export interface VoiceReview {
  id: string;
  author: string;
  neighborhood: string;
  rating: number;
  date: string;
  durationSec: number;
  audioSimulatedText: string;
  projectCompleted: string;
  projectCompletedFr: string;
}

export interface PortfolioItem {
  title: string;
  titleFr: string;
  year: string;
  imageUrl: string;
  tag: string;
}

export interface Artisan {
  id: string;
  name: string;
  trade: TradeCategory;
  titleEn: string;
  titleFr: string;
  city: 'Douala' | 'Yaoundé';
  neighborhood: string;
  experienceYears: number;
  availableToday: boolean;
  responseTimeMinutes: number;
  rating: number;
  reviewCount: number;
  completedJobsCount: number;
  avatarUrl: string;
  phoneDisplay: string;
  whatsappNumber: string;
  baseDailyRateCFA: number;
  bioEn: string;
  bioFr: string;
  workshopAddress: string;
  trust: TrustBadgeData;
  guarantors: CommunityGuarantor[];
  rateCard: RateItem[];
  reviews: VoiceReview[];
  portfolio: PortfolioItem[];
}

export interface QuoteRequestData {
  artisanId?: string;
  artisanName?: string;
  clientName: string;
  clientPhone: string;
  city: 'Douala' | 'Yaoundé';
  neighborhood: string;
  trade: TradeCategory;
  urgency: 'emergency' | 'today' | 'this_week';
  description: string;
  budgetEstCFA?: number;
}
