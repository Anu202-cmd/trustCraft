-- =========================================================
-- CREATE ARTISANS TABLE & SEED ALL DATA INTO SUPABASE
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/ugtffptaawwgwiswkcwz/sql
-- =========================================================

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

ALTER TABLE public.artisans ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read on artisans" ON public.artisans;
CREATE POLICY "Allow public read on artisans" ON public.artisans FOR SELECT TO public USING (true);
DROP POLICY IF EXISTS "Allow public insert on artisans" ON public.artisans;
CREATE POLICY "Allow public insert on artisans" ON public.artisans FOR INSERT TO public WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public update on artisans" ON public.artisans;
CREATE POLICY "Allow public update on artisans" ON public.artisans FOR UPDATE TO public USING (true);

-- Insert all 8 certified artisans
INSERT INTO public.artisans (
  id, name, trade, title_en, title_fr, city, neighborhood, experience_years,
  available_today, response_time_minutes, rating, review_count, completed_jobs_count,
  avatar_url, phone_display, whatsapp_number, base_daily_rate_cfa, workshop_address,
  bio_en, bio_fr, trust, guarantors, rate_card, reviews, portfolio
) VALUES (
  'art-001',
  'Samuel Moukoko',
  'carpentry',
  'Master Carpenter & Woodwork Specialist',
  'Maître Menuisier-Ébéniste Qualifié',
  'Douala',
  'Akwa, Boulevard de la Liberté',
  18,
  true,
  12,
  4.96,
  42,
  168,
  '/src/assets/images/artisan_carpenter_1794483505006.jpg',
  '+237 699 44 21 80',
  '237699442180',
  18000,
  'Atelier Saint-Joseph, Rue des Artisans, Akwa Nord, Douala',
  'Over 18 years producing architectural mahogany doors, structural roof trusses, customized kitchen cabinetry, and precision office fittings. Apprenticeship completed under Guildmaster Bell in 2008.',
  'Plus de 18 ans d’expérience dans la fabrication de portes massives en iroko et acajou, charpentes traditionnelles, placards intégrés et agencements de bureaux. Formé sous la direction du Maître Bell en 2008.',
  '{"identityChecked":true,"cniNumberMasked":"LT-DLA-1082***-2022","idVerifiedDate":"14 Jan 2024","skillAssessed":true,"skillTestScore":98,"skillGuildName":"Corporation des Métiers du Bois du Wouri","communityVouchedCount":28}'::jsonb,
  '[{"name":"Sa Majesté Essombè Din","role":"Chef Traditionnel de 3e Degré, Akwa","location":"Akwa, Douala","relationship":"Quarter Authority / Résident depuis 25 ans","phoneMasked":"+237 699 *** 110","dateVouched":"Oct 2023","comment":"Samuel a grandi dans ce quartier. Homme d’une intégrité exemplaire et artisan méticuleux qui ne prend jamais la fuite avec les avances de chantiers.","verifiedBadge":true},{"name":"Ing. Cyrille Ndedi","role":"Directeur de Travaux, Bâtisur Cameroun","location":"Bonanjo, Douala","relationship":"Sous-traitant sur 12 résidences","phoneMasked":"+237 677 *** 542","dateVouched":"Fév 2024","comment":"Qualité d’équarrissage et d’assemblage remarquable. Respect scrupuleux des délais et travail sans gaspillage de bois.","verifiedBadge":true},{"name":"Mme Christine Mbarga","role":"Directrice d’École & Cliente Particulière","location":"Bonamoussadi, Douala","relationship":"Aménagement complet de villa","phoneMasked":"+237 695 *** 318","dateVouched":"Avr 2024","comment":"Il a refait toute notre cuisine américaine. Finition impeccable, bois bien traité contre les termites, devis respecté au franc près.","verifiedBadge":true}]'::jsonb,
  '[{"service":"On-site Diagnostic & Measurement","serviceFr":"Diagnostic sur site & Prise de cotes","priceCFA":5000,"unit":"per visit","unitFr":"par déplacement","description":"Comprehensive inspection, moisture measurement, material estimation and formal itemized quote.","descriptionFr":"Visite d’inspection, calcul des cubages de bois et remise d’un devis quantitatif estimatif."},{"service":"Daily Master Craftsmanship Labor","serviceFr":"Journée de travail Maître Menuisier","priceCFA":18000,"unit":"per day","unitFr":"par jour","description":"Full day on site (8 hours) with master tools, joinery saws and safety gear.","descriptionFr":"Journée complète de 8 heures avec outillage professionnel et équipements de protection."},{"service":"Solid Hardwood Door Fabrication & Hanging","serviceFr":"Fabrication & Pose de porte massive en Iroko","priceCFA":45000,"unit":"per unit (labor)","unitFr":"par battant (main-d’œuvre)","description":"Tenon-and-mortise structural joints, planed finish, lock mortising and framing.","descriptionFr":"Assemblage à tenon et mortaise, ponçage haute finition, pose serrure et chambranles."},{"service":"Complete Kitchen Cabinet Unit (Linear Metre)","serviceFr":"Meuble de cuisine sur-mesure (Mètre linéaire)","priceCFA":35000,"unit":"per metre (labor)","unitFr":"par mètre linéaire","description":"Base and overhead cupboards with soft-close hinges and moisture treatment.","descriptionFr":"Caissons bas et hauts, charnières freinées et traitement fongicide hydrofuge."}]'::jsonb,
  '[{"id":"rev-01","author":"Roger Ekotto","neighborhood":"Bonamoussadi","rating":5,"date":"Il y a 3 jours","durationSec":34,"audioSimulatedText":"Je tiens à féliciter Samuel. Il a conçu et posé nos 8 portes en bois massif en 10 jours chrono. Pas un seul grincement, bois sec et très bien poli.","projectCompleted":"Installation of 8 solid teak doors in duplex","projectCompletedFr":"Pose de 8 portes en teck massif dans un duplex"},{"id":"rev-02","author":"Marie-Claire Tchounkeu","neighborhood":"Deido","rating":5,"date":"Il y a 2 semaines","durationSec":28,"audioSimulatedText":"Très ponctuel et honnête. J’avais peur de donner l’avance comme avec les autres ouvriers, mais avec la garantie de la plateforme tout a été réglé avec transparence.","projectCompleted":"Custom master bedroom walk-in closet","projectCompletedFr":"Dressing sur-mesure pour chambre principale"}]'::jsonb,
  '[{"title":"Architectural Iroko Entryway","titleFr":"Porte d’entrée monumentale en Iroko","year":"2024","imageUrl":"/src/assets/images/hero_artisan_craft_1794483504720.jpg","tag":"Residential / Résidentiel"}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  rating = EXCLUDED.rating,
  available_today = EXCLUDED.available_today;

INSERT INTO public.artisans (
  id, name, trade, title_en, title_fr, city, neighborhood, experience_years,
  available_today, response_time_minutes, rating, review_count, completed_jobs_count,
  avatar_url, phone_display, whatsapp_number, base_daily_rate_cfa, workshop_address,
  bio_en, bio_fr, trust, guarantors, rate_card, reviews, portfolio
) VALUES (
  'art-002',
  'Jean-Baptiste Mvogo',
  'plumbing',
  'Senior Master Plumber & Sanitary Engineer',
  'Maître Plombier Sanitaire & Hydraulique',
  'Douala',
  'Bonamoussadi, Carrefour du Manège',
  16,
  true,
  8,
  4.98,
  56,
  240,
  '/src/assets/images/artisan_plumber_1794483504563.jpg',
  '+237 670 12 89 33',
  '237670128933',
  15000,
  'Entrepôt Plomberie Express, Rue des Palmiers, Bonamoussadi, Douala',
  'Certified Master of the Douala Sanitary Guild. Specialist in pressurized water distribution, underground leak detection, high-capacity septic installations, and solar water heaters.',
  'Maître assermenté de la Corporation Sanitaire de Douala. Spécialiste du réseau d’eau sous pression, détection de fuites encastrées, fosses septiques toutes eaux et chauffe-eau solaires.',
  '{"identityChecked":true,"cniNumberMasked":"LT-WOU-2019***-2021","idVerifiedDate":"02 Mar 2024","skillAssessed":true,"skillTestScore":99,"skillGuildName":"Ordre Professionnel des Artisans Plombiers du Littoral","communityVouchedCount":34}'::jsonb,
  '[{"name":"M. Emmanuel Pokam","role":"Président du Conseil de Quartier Bonamoussadi","location":"Bonamoussadi, Douala","relationship":"Quartier Garant depuis 14 ans","phoneMasked":"+237 699 *** 442","dateVouched":"Jan 2024","comment":"Jean-Baptiste intervient dans tout le quartier depuis plus de dix ans. Jamais de plainte pour vol ou malfaçon.","verifiedBadge":true},{"name":"Dr. Jeanne Ngassa","role":"Médecin Chef, Clinique de l’Espérance","location":"Makepe, Douala","relationship":"Maintenance du réseau d’eau hospitalier","phoneMasked":"+237 677 *** 901","dateVouched":"Nov 2023","comment":"Il a remis à neuf tout le réseau d’alimentation et la surpression de notre clinique. Zéro interruption d’eau.","verifiedBadge":true}]'::jsonb,
  '[{"service":"Emergency Diagnostic & Leak Detection","serviceFr":"Recherche de fuite & Diagnostic d’urgence","priceCFA":5000,"unit":"per callout","unitFr":"par intervention","description":"Pressure testing, acoustic pipe trace and immediate localized containment.","descriptionFr":"Mise sous pression, détection de fuite non-destructive et arrêt d’urgence."},{"service":"Complete Bathroom Rough-in & Fixture Fitting","serviceFr":"Plomberie complète Salle d’eau (pose douche, WC, lavabo)","priceCFA":40000,"unit":"per bathroom","unitFr":"par salle de bain","description":"Cold/hot water manifold, drain slopes, trap installation and pressure seal check.","descriptionFr":"Tuyauterie multicouche/PPR, évacuations ventilées, raccordement robinetterie et test 6 bars."},{"service":"Booster Pump & Reservoir Tank Installation","serviceFr":"Installation Surpresseur & Cuve Réserve d’eau (1000L - 3000L)","priceCFA":30000,"unit":"per installation","unitFr":"par installation","description":"Electrical floater switch wiring, bypass valves, non-return valves and anti-vibration mounts.","descriptionFr":"Raccordement pressostat, flotteur de sécurité, clapet anti-retour et bypass."}]'::jsonb,
  '[{"id":"rev-03","author":"Arsène Fogué","neighborhood":"Makepe","rating":5,"date":"Hier","durationSec":42,"audioSimulatedText":"Une fuite sous dalle inondait notre salon. Jean-Baptiste est arrivé avec ses manomètres, a ciblé le raccord défectueux sans détruire tout le carrelage et a tout réparé proprement.","projectCompleted":"Under-slab leak localization and repair","projectCompletedFr":"Localisation et réparation de fuite encastrée sous dalle"}]'::jsonb,
  '[{"title":"Complete Sanitary Manifold System","titleFr":"Nourrice de distribution sanitaire multicouche","year":"2024","imageUrl":"/src/assets/images/artisan_plumber_1794483504563.jpg","tag":"Residential / Résidentiel"}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  rating = EXCLUDED.rating,
  available_today = EXCLUDED.available_today;

INSERT INTO public.artisans (
  id, name, trade, title_en, title_fr, city, neighborhood, experience_years,
  available_today, response_time_minutes, rating, review_count, completed_jobs_count,
  avatar_url, phone_display, whatsapp_number, base_daily_rate_cfa, workshop_address,
  bio_en, bio_fr, trust, guarantors, rate_card, reviews, portfolio
) VALUES (
  'art-003',
  'Amina Kouam',
  'electrical',
  'Certified Industrial & Residential Electrician',
  'Électricienne Certifiée Bâtiment & Solaire',
  'Yaoundé',
  'Bastos, Rue des Ambassades',
  12,
  true,
  15,
  4.97,
  38,
  145,
  '/src/assets/images/artisan_electrician_1794483505479.jpg',
  '+237 698 77 12 04',
  '237698771204',
  20000,
  'Laboratoire Solaire & Énergie, Boulevard de l’URSS, Bastos, Yaoundé',
  'Senior electrical technician certified by CAET. Specializes in residential rewiring to IEC safety standards, solar hybrid backup systems (lithium/inverter), three-phase balancing, and surge protection.',
  'Technicienne supérieure agréée CAET. Spécialisée dans la mise aux normes NF C 15-100, les installations solaires hybrides (onduleurs/batteries lithium), équilibrage des phases et parafoudres.',
  '{"identityChecked":true,"cniNumberMasked":"CE-YDE-0419***-2023","idVerifiedDate":"28 Nov 2023","skillAssessed":true,"skillTestScore":97,"skillGuildName":"Syndicat National des Électriciens du Cameroun (SYNELEC)","communityVouchedCount":22}'::jsonb,
  '[{"name":"M. François-Xavier Atangana","role":"Ingénieur Conseil en Énergie Solaire","location":"Bastos, Yaoundé","relationship":"Ancien Maître de Stage & Partenaire","phoneMasked":"+237 699 *** 812","dateVouched":"Oct 2023","comment":"Amina est d’une rigueur absolue. Elle ne prend aucun raccourci dangereux avec les câblages ou les calibres de disjoncteurs.","verifiedBadge":true},{"name":"Mme Sandrine Ndzana","role":"Propriétaire Résidence Les Oliviers","location":"Biyem-Assi, Yaoundé","relationship":"Installation solaire 5kVA","phoneMasked":"+237 675 *** 129","dateVouched":"Jan 2024","comment":"Grâce à son installation solaire, nos congélateurs et ordinateurs tournent en continu même en cas de coupure Eneo.","verifiedBadge":true}]'::jsonb,
  '[{"service":"Electrical Safety Audit & Load Balancing","serviceFr":"Audit de sécurité & Équilibrage des phases","priceCFA":8000,"unit":"per residential unit","unitFr":"par logement","description":"Complete earth grounding impedance test, RCD sensitivity, phase load distribution.","descriptionFr":"Mesure de résistance de prise de terre, test déclenchement 30mA et équilibrage triphasé."},{"service":"Distribution Breaker Board Replacement","serviceFr":"Remplacement Coffret Électrique & Disjoncteurs","priceCFA":25000,"unit":"per board (labor)","unitFr":"par tableau (main-d’œuvre)","description":"Standardized DIN rail installation, labeled circuits, surge protector and master isolator.","descriptionFr":"Câblage peigne normalisé, étiquetage des départs, pose parafoudre et différentiel."},{"service":"Hybrid Solar Inverter & Battery Bank Setup (3kVA - 10kVA)","serviceFr":"Installation Onduleur Solaire & Batteries Lithium","priceCFA":50000,"unit":"per system","unitFr":"par système","description":"DC safety disconnects, solar PV string wiring, grounding and auto-transfer switch.","descriptionFr":"Protection parafoudre DC/AC, raccordement inverseur de source automatique et paramétrage."}]'::jsonb,
  '[{"id":"rev-04","author":"Patrice Ondoa","neighborhood":"Bastos","rating":5,"date":"Il y a 5 jours","durationSec":37,"audioSimulatedText":"Amina est venue identifier un court-circuit complexe dans notre duplex qui faisait disjoncter le compteur général tous les soirs. Elle a résolu le problème en 45 minutes.","projectCompleted":"Diagnostic and repair of critical underground short-circuit","projectCompletedFr":"Diagnostic et réparation de court-circuit complexe"}]'::jsonb,
  '[{"title":"Precision Modular Breaker Panel","titleFr":"Tableau électrique modulaire avec parafoudre","year":"2024","imageUrl":"/src/assets/images/artisan_electrician_1794483505479.jpg","tag":"Residential / Résidentiel"}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  rating = EXCLUDED.rating,
  available_today = EXCLUDED.available_today;

INSERT INTO public.artisans (
  id, name, trade, title_en, title_fr, city, neighborhood, experience_years,
  available_today, response_time_minutes, rating, review_count, completed_jobs_count,
  avatar_url, phone_display, whatsapp_number, base_daily_rate_cfa, workshop_address,
  bio_en, bio_fr, trust, guarantors, rate_card, reviews, portfolio
) VALUES (
  'art-004',
  'Dieudonné Kamga',
  'masonry',
  'Master Mason & Reinforced Concrete Builder',
  'Maître Maçon & Spécialiste Béton Armé',
  'Douala',
  'Deido, Rond-point 4e',
  22,
  false,
  20,
  4.95,
  64,
  310,
  '/src/assets/images/artisan_mason_1794483504003.jpg',
  '+237 699 05 33 22',
  '237699053322',
  16000,
  'Parc BTP Kamga & Fils, Carrefour Deido Plage, Douala',
  'Over two decades building durable foundations, reinforced concrete columns, moisture-proof perimeter fences, and multi-story masonry structures across the coastal soils of Douala.',
  'Plus de vingt ans d’expérience dans les fondations en terrain hydromorphe, coffrage et ferraillage de poteaux-poutres, clôtures étanches et élévation d’immeubles en agglos pleins/creux.',
  '{"identityChecked":true,"cniNumberMasked":"LT-DLA-0841***-2021","idVerifiedDate":"19 Dec 2023","skillAssessed":true,"skillTestScore":96,"skillGuildName":"Union des Maîtres Bâtisseurs du Cameroun (UMBC)","communityVouchedCount":31}'::jsonb,
  '[{"name":"Sa Majesté James Betote","role":"Notabilité Coutumière du Canton Bell","location":"Bali, Douala","relationship":"Caution Morale de la Famille","phoneMasked":"+237 699 *** 300","dateVouched":"Sep 2023","comment":"Dieudonné est un artisan de parole. Il n’a jamais abandonné un chantier inachevé en 20 ans d’activité.","verifiedBadge":true},{"name":"M. Gérard Talla","role":"Architecte DPLG, Cabinet Archi-Littoral","location":"Bonanjo, Douala","relationship":"Chef de chantier régulier","phoneMasked":"+237 677 *** 419","dateVouched":"Jan 2024","comment":"Respect rigoureux des dosages de ciment (350kg/m3) et des temps de décoffrage. C’est rare et précieux.","verifiedBadge":true}]'::jsonb,
  '[{"service":"Structural Foundation & Site Inspection","serviceFr":"Visite de terrain & Implantation des fouilles","priceCFA":10000,"unit":"per session","unitFr":"par séance","description":"Soil check, chalk alignment, leveling with optical water tube, footing depth estimation.","descriptionFr":"Implantation à la chaise, tracé des axes, vérification des niveaux et profondeur de fouille."},{"service":"Blocklaying (Agglos de 15 ou 20) with Joint Mortar","serviceFr":"Pose d’Agglos (Parpaings de 15 ou 20 pleins/creux)","priceCFA":150,"unit":"per block (labor)","unitFr":"par agglos posé","description":"Straight plumb alignment, reinforced corner ties, mortar mixing.","descriptionFr":"Pose au cordeau et niveau, harpage aux angles, dosage mortier régulier."},{"service":"Reinforced Column & Lintel Casting","serviceFr":"Coffrage & Coulage Poteaux / Chaînages en Béton Armé","priceCFA":4500,"unit":"per linear metre","unitFr":"par mètre linéaire","description":"Rebar tying, formwork clamping, mechanical vibrator compaction.","descriptionFr":"Ferraillage, calage d’enrobage, coffrage bois raboté et damage régulier."}]'::jsonb,
  '[{"id":"rev-05","author":"Gilbert Nana","neighborhood":"Deido","rating":5,"date":"Il y a 1 semaine","durationSec":45,"audioSimulatedText":"Dieudonné a bâti notre clôture de 60 mètres avec chaînages et barbacanes pour éviter les fissures dues aux pluies de Douala. Solide comme un roc.","projectCompleted":"Heavy reinforced perimeter barrier wall","projectCompletedFr":"Mur de clôture renforcé avec chaînages"}]'::jsonb,
  '[{"title":"Precision Brickwork & Column Ties","titleFr":"Maçonnerie de clôture et chaînages armés","year":"2024","imageUrl":"/src/assets/images/artisan_mason_1794483504003.jpg","tag":"Structural / Gros Œuvre"}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  rating = EXCLUDED.rating,
  available_today = EXCLUDED.available_today;

INSERT INTO public.artisans (
  id, name, trade, title_en, title_fr, city, neighborhood, experience_years,
  available_today, response_time_minutes, rating, review_count, completed_jobs_count,
  avatar_url, phone_display, whatsapp_number, base_daily_rate_cfa, workshop_address,
  bio_en, bio_fr, trust, guarantors, rate_card, reviews, portfolio
) VALUES (
  'art-005',
  'Pauline Mbarga',
  'painting',
  'Interior & Architectural Decorative Painter',
  'Artisan Peintre Décoratrice & Finitions Bâtiment',
  'Yaoundé',
  'Omnisports, Face Stade Ahmadou Ahidjo',
  10,
  true,
  10,
  4.94,
  31,
  112,
  '/src/assets/images/artisan_electrician_1794483505479.jpg',
  '+237 671 22 55 99',
  '237671225599',
  14000,
  'Atelier Couleurs & Matières, Omnisports, Yaoundé',
  'Expert in architectural surface preparation, moisture barrier primers, washable satin finishes, Venetian stucco, and anti-mold treatments adapted to Yaoundé climate.',
  'Spécialiste de la préparation soignée des fonds, enduits de lissage croisés, peintures satinées lessivables, stuc et traitements hydrofuges anti-moisissures.',
  '{"identityChecked":true,"cniNumberMasked":"CE-MFU-1934***-2022","idVerifiedDate":"11 Jan 2024","skillAssessed":true,"skillTestScore":95,"skillGuildName":"Groupement des Artisans Finisseurs du Centre","communityVouchedCount":19}'::jsonb,
  '[{"name":"Mme Béatrice Abena","role":"Décoratrice d’Intérieur, Studio Kribi Design","location":"Omnisports, Yaoundé","relationship":"Collaboratrice sur 15 projets hôteliers","phoneMasked":"+237 699 *** 771","dateVouched":"Oct 2023","comment":"Les rechampis et les arêtes de Pauline sont d’une netteté photographique. Elle protège toujours scrupuleusement les sols et vitres.","verifiedBadge":true}]'::jsonb,
  '[{"service":"Surface Preparation & Double-Coat Plaster Skimming","serviceFr":"Préparation des murs & Ratissage 2 passes à l’enduit","priceCFA":800,"unit":"per m² (labor)","unitFr":"par m² (main-d’œuvre)","description":"Scraping, anti-fungal primer, cross-coat skimming, and fine sanding.","descriptionFr":"Égrenage, primaire d’accrochage, deux passes croisées et ponçage à la girafe."},{"service":"Satin / Matte Washable Emulsion (2 Coats)","serviceFr":"Application Peinture Satinée ou Mate Lessivable (2 couches)","priceCFA":700,"unit":"per m² (labor)","unitFr":"par m² (main-d’œuvre)","description":"Uniform roller application, crisp edge cutting, zero lap marks.","descriptionFr":"Application au rouleau microfibres, rechampis au pinceau à rechampir, zéro trace."}]'::jsonb,
  '[{"id":"rev-06","author":"Valentin Noah","neighborhood":"Omnisports","rating":5,"date":"Il y a 4 jours","durationSec":30,"audioSimulatedText":"Pauline a repeint notre appartement de 120m² en 4 jours avec une finition de niveau palace. Chapeau pour la propreté du chantier !","projectCompleted":"Complete interior renovation and satin painting","projectCompletedFr":"Rénovation intégrale et peinture satinée"}]'::jsonb,
  '[{"title":"Velvet Satin Finish Living Room","titleFr":"Salon avec peinture veloutée et boiseries","year":"2024","imageUrl":"/src/assets/images/hero_artisan_craft_1794483504720.jpg","tag":"Interior / Décoration"}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  rating = EXCLUDED.rating,
  available_today = EXCLUDED.available_today;

INSERT INTO public.artisans (
  id, name, trade, title_en, title_fr, city, neighborhood, experience_years,
  available_today, response_time_minutes, rating, review_count, completed_jobs_count,
  avatar_url, phone_display, whatsapp_number, base_daily_rate_cfa, workshop_address,
  bio_en, bio_fr, trust, guarantors, rate_card, reviews, portfolio
) VALUES (
  'art-006',
  'Christian Nguemo',
  'welding',
  'Certified Master Welder & Security Metalworker',
  'Maître Ferronnier d’Art & Chaudronnier Sécurité',
  'Douala',
  'Bonanjo, Zone Portuaire',
  15,
  true,
  18,
  4.96,
  47,
  198,
  '/src/assets/images/artisan_plumber_1794483504563.jpg',
  '+237 699 88 14 02',
  '237699881402',
  18000,
  'Forges Métalliques de Bonanjo, Rue de la Marine, Douala',
  'Specializes in high-security anti-burglary gates, decorative balcony balustrades, structural steel mezzanines, and anti-corrosion galvanized coatings for coastal areas.',
  'Fabrication de portails motorisés haute sécurité, grilles anti-effraction esthétiques, garde-corps forgés, charpentes métalliques et traitement anticorrosion marin.',
  '{"identityChecked":true,"cniNumberMasked":"LT-WOU-0518***-2022","idVerifiedDate":"07 Feb 2024","skillAssessed":true,"skillTestScore":97,"skillGuildName":"Corporation Métallurgique du Littoral","communityVouchedCount":25}'::jsonb,
  '[{"name":"M. Henri Bell","role":"Conseiller Municipal, Douala 1er","location":"Bonanjo, Douala","relationship":"Guarantor de moralité","phoneMasked":"+237 699 *** 219","dateVouched":"Nov 2023","comment":"Christian réalise les grilles des édifices publics et des banques du quartier administratif. Confiance totale.","verifiedBadge":true}]'::jsonb,
  '[{"service":"Heavy-Duty Security Window Grille Fabrication","serviceFr":"Fabrication Grille de Défense en Carré Plein de 14mm","priceCFA":22000,"unit":"per window m²","unitFr":"par m² de fenêtre","description":"Solid forged iron bars, embedded anchor pins, anti-rust zinc-chromate primer.","descriptionFr":"Fer carré plein de 14mm, scellement chimique ou soudé sur ferraillage, antirouille phosphatant."},{"service":"Sliding Motorized Gate Frame Welding","serviceFr":"Fabrication Portail Coulissant sur Rail (Main-d’œuvre)","priceCFA":75000,"unit":"per gate","unitFr":"par portail","description":"Heavy tube framing, guide roller track, rack plate weld for electric motorization.","descriptionFr":"Cadre en tube 80x40x2mm, galets à gorge en V, support crémaillère motorisée."}]'::jsonb,
  '[{"id":"rev-07","author":"Ferdinand Essama","neighborhood":"Bonanjo","rating":5,"date":"Il y a 6 jours","durationSec":32,"audioSimulatedText":"Un travail d’ajustage exceptionnel. Les soudures sont meulées à plat, invisibles à l’œil nu, et le portail coulisse avec le bout d’un seul doigt.","projectCompleted":"Heavy steel sliding entry gate and forged fence","projectCompletedFr":"Portail coulissant motorisé et clôture forgée"}]'::jsonb,
  '[{"title":"Modern Geometric Security Gate","titleFr":"Portail moderne à barreaudage asymétrique","year":"2024","imageUrl":"/src/assets/images/hero_artisan_craft_1794483504720.jpg","tag":"Security / Sécurité"}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  rating = EXCLUDED.rating,
  available_today = EXCLUDED.available_today;

INSERT INTO public.artisans (
  id, name, trade, title_en, title_fr, city, neighborhood, experience_years,
  available_today, response_time_minutes, rating, review_count, completed_jobs_count,
  avatar_url, phone_display, whatsapp_number, base_daily_rate_cfa, workshop_address,
  bio_en, bio_fr, trust, guarantors, rate_card, reviews, portfolio
) VALUES (
  'art-007',
  'Fabrice Tchakounte',
  'hvac',
  'Refrigeration & Split-Unit Air Conditioning Specialist',
  'Technicien Frigoriste & Climatisation Industrielle',
  'Douala',
  'Makepe, Face Collège André Malraux',
  11,
  true,
  14,
  4.93,
  39,
  175,
  '/src/assets/images/artisan_electrician_1794483505479.jpg',
  '+237 675 33 90 11',
  '237675339011',
  15000,
  'Froid & Confort Cameroun, Rue des Manguiers, Makepe, Douala',
  'Certified HVAC engineer. Expert in deep biochemical evaporator cleansing, precision refrigerant charging (R410A/R32) with manifold gauges, compressor replacements, and VRV multi-split systems.',
  'Frigoriste diplômé. Nettoyage haute pression antibactérien des évaporateurs, recharge fluide frigorigène (R410A/R32) à la balance électronique, remplacement compresseurs.',
  '{"identityChecked":true,"cniNumberMasked":"LT-WOU-1120***-2023","idVerifiedDate":"15 Jan 2024","skillAssessed":true,"skillTestScore":98,"skillGuildName":"Association Professionnelle du Génie Climatique du Cameroun","communityVouchedCount":21}'::jsonb,
  '[{"name":"Dr. Alain Ngassa","role":"Directeur de Clinique","location":"Makepe, Douala","relationship":"Maintenance blocs opératoires","phoneMasked":"+237 699 *** 450","dateVouched":"Oct 2023","comment":"Fabrice entretient notre système de climatisation critique. Jamais de surchauffe ni de perte de charge.","verifiedBadge":true}]'::jsonb,
  '[{"service":"Deep Chemical Clean & Antibacterial Service (Split Unit)","serviceFr":"Entretien Complet Antibactérien & Décrassage Split (9000 à 24000 BTU)","priceCFA":12000,"unit":"per unit","unitFr":"par climatiseur","description":"Pressure jet wash, turbine mold sanitization, drain pipe flushing, amp draw test.","descriptionFr":"Lavage haute pression, dégraissage de la turbine, débouchage condensats et contrôle consommation."},{"service":"Refrigerant Leak Repair & Vacuum Pressure Charge (R410A / R32)","serviceFr":"Recherche de fuite, tirage au vide & recharge gaz","priceCFA":25000,"unit":"per split","unitFr":"par appareil","description":"Nitrogen leak test, deep 2-stage vacuuming, electronic scale weighed charge.","descriptionFr":"Mise sous azote, tirage au vide 30 min et pesée exacte de fluide au gramme près."}]'::jsonb,
  '[{"id":"rev-08","author":"Sandrine E.","neighborhood":"Makepe","rating":5,"date":"Il y a 2 jours","durationSec":25,"audioSimulatedText":"Notre climatiseur coulait dans la chambre et ne soufflait plus de froid. Fabrice est venu en 30 minutes, a débouché le drain et rechargé le gaz. Tout refonctionne à merveille !","projectCompleted":"Split unit emergency diagnosis and recharge","projectCompletedFr":"Diagnostic d’urgence et remise en froid de split"}]'::jsonb,
  '[{"title":"Precision Inverter Split Installation","titleFr":"Installation climatiseur inverter avec pompe de relevage","year":"2024","imageUrl":"/src/assets/images/artisan_electrician_1794483505479.jpg","tag":"Cooling / Climatisation"}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  rating = EXCLUDED.rating,
  available_today = EXCLUDED.available_today;

INSERT INTO public.artisans (
  id, name, trade, title_en, title_fr, city, neighborhood, experience_years,
  available_today, response_time_minutes, rating, review_count, completed_jobs_count,
  avatar_url, phone_display, whatsapp_number, base_daily_rate_cfa, workshop_address,
  bio_en, bio_fr, trust, guarantors, rate_card, reviews, portfolio
) VALUES (
  'art-008',
  'Blaise Kenfack',
  'tiling',
  'Master Porcelain & Granite Tile Setter',
  'Maître Carreleur Mosaïste & Grès Cérame',
  'Yaoundé',
  'Biyem-Assi, Rond-point Express',
  14,
  false,
  25,
  4.95,
  45,
  180,
  '/src/assets/images/artisan_mason_1794483504003.jpg',
  '+237 699 60 74 18',
  '237699607418',
  15000,
  'Carrelages & Pierres Naturelles, Biyem-Assi, Yaoundé',
  'Laser-level precision tile craftsman specializing in large-format porcelain slabs (60x120, 80x80), waterproof walk-in shower pans, epoxy grouting, and seamless wall leveling.',
  'Carreleur de haute précision au niveau laser, spécialiste des grands formats (60x120, 80x80 cm), receveurs à l’italienne avec pente étanche et joints époxy.',
  '{"identityChecked":true,"cniNumberMasked":"CE-MEF-0782***-2023","idVerifiedDate":"12 Feb 2024","skillAssessed":true,"skillTestScore":96,"skillGuildName":"Syndicat des Carreleurs BTP du Mfoundi","communityVouchedCount":26}'::jsonb,
  '[{"name":"M. Victor Kamdem","role":"Promoteur Immobilier, Résidences du Mont","location":"Biyem-Assi, Yaoundé","relationship":"Sous-traitant principal carrelage","phoneMasked":"+237 677 *** 302","dateVouched":"Déc 2023","comment":"Zéro décalage de niveau (effet marche d’escalier). Les découpes autour des tuyaux et sanitaires sont millimétriques.","verifiedBadge":true}]'::jsonb,
  '[{"service":"Porcelain Tile Laying (60x60 / 60x120) with Leveling Clips","serviceFr":"Pose Carrelage Grès Cérame (60x60 ou 60x120) aux croisillons autonivelants","priceCFA":1500,"unit":"per m² (labor)","unitFr":"par m² (main-d’œuvre)","description":"Double buttering mortar adhesion, cross laser alignment, zero lippage.","descriptionFr":"Double encollage au peigne cranté, clips de nivellement pour planéité parfaite."},{"service":"Walk-in Shower Waterproofing & Mosaic Slope Setting","serviceFr":"Étanchéité Sous Carrelage & Pente Douche à l’Italienne","priceCFA":30000,"unit":"per shower pan","unitFr":"par receveur maçonné","description":"Liquid waterproofing membrane tape, mortar diamond pitch to drain.","descriptionFr":"Membrane d’étanchéité liquide, bandes armées d’angles et pointe de diamant vers bonde."}]'::jsonb,
  '[{"id":"rev-09","author":"Célestin Mengue","neighborhood":"Biyem-Assi","rating":5,"date":"Il y a 1 semaine","durationSec":36,"audioSimulatedText":"Blaise a carrelé tout notre rez-de-chaussée de 150m² en grès cérame poli 60x120. C’est comme un miroir, pas une seule bosse, les joints sont impeccables.","projectCompleted":"Large format porcelain floor installation with leveling clips","projectCompletedFr":"Pose de carrelage 60x120 grand format dans villa"}]'::jsonb,
  '[{"title":"Large Format Mirror Porcelain Living Space","titleFr":"Séjour en dalles de grès cérame 60x120 avec croisillons autonivelants","year":"2024","imageUrl":"/src/assets/images/hero_artisan_craft_1794483504720.jpg","tag":"Flooring / Sols"}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  rating = EXCLUDED.rating,
  available_today = EXCLUDED.available_today;


-- Also insert sample quote requests so quote_requests table is populated
INSERT INTO public.quote_requests (client_name, client_phone, city, neighborhood, trade, urgency, description, budget_cfa, status)
VALUES 
  ('Emmanuel Ekotto', '+237 699 12 34 56', 'Douala', 'Bonamoussadi', 'plumbing', 'emergency', 'Fuite importante sous évier et remplacement de robinet mitigeur', 25000, 'pending_dispatch'),
  ('Sandrine Mbarga', '+237 677 88 99 00', 'Yaoundé', 'Bastos', 'electrical', 'today', 'Installation inverseur de source et tableau de protection', 45000, 'assigned'),
  ('Paul Atangana', '+237 698 55 44 33', 'Douala', 'Akwa', 'carpentry', 'this_week', 'Fabrication de 3 portes massives en Iroko avec serrures', 120000, 'quoted');

-- Also insert sample artisan accreditation applications so artisan_applications table is populated
INSERT INTO public.artisan_applications (full_name, trade, experience_years, city, neighborhood, phone, cni_number, guarantor_name, guarantor_phone, audit_status)
VALUES 
  ('Marc Tagne', 'masonry', 12, 'Douala', 'Deido', '+237 699 33 22 11', '108293849', 'Chef Traditionnel Deido', '+237 677 00 11 22', 'scheduled_field_inspection'),
  ('Josephine Fotsing', 'painting', 9, 'Yaoundé', 'Omnisports', '+237 671 44 55 66', '201938472', 'Ing. Ndzana BTP', '+237 699 88 77 66', 'dossier_approved');
