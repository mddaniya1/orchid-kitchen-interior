export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: 'Modular Kitchen' | 'Wardrobes' | 'Interior Woodwork' | 'Renovation';
  location: string;
  year: string;
  aspectRatio: '4/3' | '3/4' | '5/4';
  image: string;
  secondaryImage: string;
  scope: string[];
  description: string;
  materials: string[];
  dimensions: string;
  duration: string;
  ctaLabel: string;
}

export interface ExpertiseCard {
  id: string;
  title: string;
  items: string[];
  image: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  image: string;
  caption: string;
  deliverables?: string[];
}

export interface TestimonialItem {
  id: string;
  clientLabel: string;
  project: string;
  quote: string;
  image: string;
  status: 'draft' | 'published';
  verified: boolean;
}

export interface PhilosophyItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const WHATSAPP_NUMBER_DIGITS = '923311371992';
export const WHATSAPP_DEFAULT_MESSAGE =
  'Hello Orchid Kitchen and Interior, I am interested in your modular kitchen and interior design services. I would like to discuss my project.';

export function buildWhatsAppUrl(customMessage?: string): string {
  const text = encodeURIComponent(customMessage || WHATSAPP_DEFAULT_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER_DIGITS}?text=${text}`;
}

export const SITE_CONFIG = {
  brandShort: 'ORCHID KITCHEN',
  brandFull: 'Orchid Kitchen and Interior',
  category: 'Modular Kitchen & Interior Design Studio',
  googleRating: {
    score: '5.0 / 5.0',
    reviewCount: 7,
    summary: 'Rated 5.0 stars on Google by homeowners across Karachi.',
  },
  contact: {
    primaryPhone: '+92 331 1371992',
    primaryPhoneHref: 'tel:+923311371992',
    secondaryPhone: '+92 348 8671992',
    secondaryPhoneHref: 'tel:+923488671992',
    email: 'orchidkitchenandinterior@gmail.com',
    emailHref: 'mailto:orchidkitchenandinterior@gmail.com',
    address:
      'Shop #1, Dada Garden, Jamal-ud-din Afghani Road, Sharafabad Chowrangi, Karachi, Pakistan.',
    area: 'Sharafabad, BMCHS',
    timings: 'Monday–Saturday, 11:00 AM–9:00 PM.',
    serviceOptions: ['Online estimates', 'On-site services', 'Free parking'],
    social: {
      // Set verified URLs once confirmed by client; null triggers verified contact fallback
      instagramUrl: null as string | null,
      facebookUrl: null as string | null,
    },
  },
  navigation: [
    { label: 'Studio', target: 'studio' },
    { label: 'Philosophy', target: 'philosophy' },
    { label: 'Projects', target: 'projects-page' },
    { label: 'Expertise', target: 'expertise' },
    { label: 'Contact', target: 'contact-page' },
  ],
  hero: {
    headline: 'ORCHID KITCHEN',
    description:
      'A bespoke modular kitchen and interior design studio in Karachi shaping modern homes through smart layouts, fine materials, and precision craftsmanship.',
    ctaLabel: 'Explore our work',
    ctaTarget: 'projects',
    image: '/src/assets/images/hero_modular_kitchen_1795117190126.jpg',
  },
  studio: {
    label: 'THE STUDIO*',
    heading:
      'We believe the heart of every home is built with purpose. Every cabinet, surface, and detail is crafted to elevate how you live.',
    description:
      'At Orchid Kitchen and Interior, we approach every project as a balance between modern functionality, durable materials, and timeless aesthetics. Based in Sharafabad, Karachi, our work is guided by precision and a belief that bespoke kitchens and interiors should feel as effortless as they look.',
  },
  selectedWork: {
    label: 'SELECTED WORK*',
    heading: 'Spaces built for everyday living.',
    subheading:
      'Recent bespoke modular kitchens, wardrobes, and complete home renovations across Karachi.',
  },
  featuredProject: {
    label: 'FEATURED PROJECT*',
    heading: 'Craftsmanship for the modern kitchen.',
    description:
      'A study in smart storage, soft-close hardware, and warm architectural lighting.',
    ctaLabel: 'Discover the project',
    projectSlug: 'taupe-gloss-marble-kitchen',
    image: '/src/assets/images/featured_kitchen_craft_1795117190587.jpg',
  },
  expertise: {
    label: 'OUR EXPERTISE*',
    heading: 'Considered kitchens. Thoughtful interiors.',
    subheading:
      'From on-site measurements to the final installation, we create kitchens and living spaces tailored to your lifestyle and budget.',
    statementTitle: 'Spaces built to live in.',
    statementImage: '/src/assets/images/expertise_woodwork_detail_1795117190876.jpg',
    cards: [
      {
        id: 'modular-kitchens',
        title: 'Modular Kitchens.',
        image: '/src/assets/images/project_taupe_kitchen_1795117190721.jpg',
        items: [
          'Custom layout & 3D planning',
          'Glossy, matte & UV sheet finishes',
          'Smart corner & pull-out storage',
          'Countertops & under-cabinet lighting',
        ],
      },
      {
        id: 'wardrobes-woodwork',
        title: 'Wardrobes & Woodwork.',
        image: '/src/assets/images/project_glass_closet_1795117190862.jpg',
        items: [
          'Walk-in closets & sliding wardrobes',
          'Floating bathroom vanities',
          'Modern TV media walls',
          'Bespoke residential joinery',
        ],
      },
      {
        id: 'complete-renovation',
        title: 'Complete Renovation.',
        image: '/src/assets/images/project_apartment_makeover_1795117190721.jpg',
        items: [
          'End-to-end kitchen remodeling',
          'False ceiling & ambient lighting',
          'Wall paneling & flooring',
          'On-site supervision & installation',
        ],
      },
    ] as ExpertiseCard[],
  },
  process: {
    label: 'PROCESS*',
    heading: 'From measurement to reality.',
    subheading:
      'Every custom kitchen begins with understanding your space. Our process brings together practical planning, quality hardware, and clean installation.',
    ctaLabel: 'Start a project',
    steps: [
      {
        number: '01',
        title: 'Site Visit & Measurement',
        description:
          'We visit your home in Karachi to take exact measurements, understand your daily workflow, and discuss your budget.',
        image: '/src/assets/images/process_material_studio_1795117190279.jpg',
        caption: '01 — On-site dimensional survey & workflow audit across Karachi.',
      },
      {
        number: '02',
        title: 'Material & Layout Design',
        description:
          'We translate your requirements into a cohesive 3D layout, helping you choose durable sheets, countertops, and fittings.',
        image: '/src/assets/images/expertise_woodwork_detail_1795117190876.jpg',
        caption: '02 — 3D spatial planning, moisture-resistant boards & stone pairing.',
      },
      {
        number: '03',
        title: 'Crafting & Installation',
        description:
          'From workshop fabrication to on-site fitting and finishing touches, our team delivers a ready-to-use space on time.',
        image: '/src/assets/images/featured_kitchen_craft_1795117190587.jpg',
        caption: '03 — Precision workshop fabrication & clean on-site fitting.',
        deliverables: [
          'Workshop CNC & edge-banding',
          'Soft-close hardware calibration',
          'Final inspection & handover',
        ],
      },
    ] as ProcessStep[],
  },
  testimonials: {
    label: 'KIND WORDS*',
    heading: 'The spaces speak. So do the people.',
    subheading: 'Rated 5.0 stars on Google by homeowners across Karachi.',
    // Draft CMS entries pending client verification; displayed transparently without unverified claims
    items: [
      {
        id: 't1',
        clientLabel: 'Client Review (Draft)',
        project: 'Sharafabad Kitchen Project',
        quote:
          'Exceptional finishing and attention to detail. Their team transformed our old kitchen into a modern, highly organized space.',
        image: '/src/assets/images/project_taupe_kitchen_1795117190721.jpg',
        status: 'draft',
        verified: false,
      },
      {
        id: 't2',
        clientLabel: 'Client Review (Draft)',
        project: 'Custom Wardrobe & Vanity',
        quote:
          'Very professional behavior from start to finish. Every drawer, cabinet, and corner storage was installed with complete precision.',
        image: '/src/assets/images/project_glass_closet_1795117190862.jpg',
        status: 'draft',
        verified: false,
      },
      {
        id: 't3',
        clientLabel: 'Client Review (Draft)',
        project: 'Complete Kitchen Renovation',
        quote:
          'They understood our space limitations and delivered a sleek modular kitchen right on schedule.',
        image: '/src/assets/images/project_apartment_makeover_1795117190721.jpg',
        status: 'draft',
        verified: false,
      },
    ] as TestimonialItem[],
  },
  philosophy: {
    label: 'OUR PHILOSOPHY*',
    heading: 'Built to last, designed to inspire.',
    subheading:
      'A great kitchen handles daily wear effortlessly while looking timeless. We focus on quality materials, smart ergonomics, and clean lines.',
    items: [
      {
        id: 'material-durability',
        title: 'Material Durability',
        description:
          'Moisture-resistant boards, premium soft-close hinges, and scratch-resistant finishes built for Pakistani kitchens.',
        image: '/src/assets/images/expertise_woodwork_detail_1795117190876.jpg',
      },
      {
        id: 'smart-ergonomics',
        title: 'Smart Ergonomics',
        description:
          'We design for effortless movement, maximizing every inch of storage in both compact and spacious layouts.',
        image: '/src/assets/images/featured_kitchen_craft_1795117190587.jpg',
      },
      {
        id: 'transparent-process',
        title: 'Transparent Process',
        description:
          'Clear online estimates, honest material guidance, and dedicated after-sales support.',
        image: '/src/assets/images/process_material_studio_1795117190279.jpg',
      },
    ] as PhilosophyItem[],
  },
  cta: {
    label: "LET'S TALK*",
    heading: 'Ready to upgrade your kitchen or home?',
    subheading: 'Book a free on-site measurement and estimate in Karachi today.',
    ctaLabel: 'Start a project',
    leftImage: '/src/assets/images/hero_modular_kitchen_1795117190126.jpg',
    rightImage: '/src/assets/images/featured_kitchen_craft_1795117190587.jpg',
  },
  footer: {
    leadLabel: "LET'S TALK*",
    leadHeading: 'Ready to upgrade your kitchen or home?',
    copyright:
      '© 2026 ORCHID KITCHEN AND INTERIOR — BESPOKE KITCHENS & INTERIORS IN KARACHI',
    tagline: 'SHARAFABAD, BMCHS · KARACHI, PAKISTAN',
  },
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    slug: 'taupe-gloss-marble-kitchen',
    title: 'Taupe Gloss & Marble Kitchen',
    category: 'Modular Kitchen',
    location: 'Sharafabad, Karachi',
    year: '2026',
    aspectRatio: '4/3',
    image: '/src/assets/images/project_taupe_kitchen_1795117190721.jpg',
    secondaryImage: '/src/assets/images/featured_kitchen_craft_1795117190587.jpg',
    scope: ['3D Spatial Layout', 'UV Gloss Cabinetry', 'Calacatta Countertops', 'LED Task Lighting'],
    description:
      'Designed for daily family cooking in Sharafabad, this handleless taupe high-gloss kitchen pairs moisture-resistant carcasses with a book-matched veined marble backsplash, soft-close pantry pull-outs, and warm recessed linear illumination.',
    materials: ['Moisture-Resistant MDF Core', 'Taupe High-Gloss UV Sheets', 'Honed Marble Slab', 'Soft-Close Tandem Drawers'],
    dimensions: '18 ft × 12 ft L-Shape + Island',
    duration: '5 Weeks',
    ctaLabel: 'View Taupe Gloss & Marble Kitchen',
  },
  {
    id: 'proj-2',
    slug: 'warm-wood-profile-glass-closet',
    title: 'Warm Wood & Profile Glass Closet',
    category: 'Wardrobes',
    location: 'Bahadurabad, Karachi',
    year: '2026',
    aspectRatio: '3/4',
    image: '/src/assets/images/project_glass_closet_1795117190862.jpg',
    secondaryImage: '/src/assets/images/expertise_woodwork_detail_1795117190876.jpg',
    scope: ['Walk-In Wardrobe', 'Bronze Profile Glass', 'Sensor Strip Lighting', 'Velvet Accessory Trays'],
    description:
      'A full-height dressing sanctuary in Bahadurabad crafted with warm walnut laminate interiors, fluted bronze aluminum profile glass doors, pull-out trouser organizers, and integrated 3000K shelf lighting.',
    materials: ['Walnut Textured Laminate', 'Anodized Bronze Aluminum Profiles', 'Fluted Tempered Glass', 'Integrated 3000K LED Profiles'],
    dimensions: '14 ft Walk-In Dressing Corridor',
    duration: '4 Weeks',
    ctaLabel: 'See Warm Wood & Glass Closet',
  },
  {
    id: 'proj-3',
    slug: 'modern-led-media-wall-vanity',
    title: 'Modern LED Media Wall & Vanity',
    category: 'Interior Woodwork',
    location: 'PECHS, Karachi',
    year: '2025',
    aspectRatio: '3/4',
    image: '/src/assets/images/project_media_vanity_1795117190600.jpg',
    secondaryImage: '/src/assets/images/process_material_studio_1795117190279.jpg',
    scope: ['Fluted Oak Panelling', 'Halo LED Backlighting', 'Floating Credenza', 'Floating Stone Vanity'],
    description:
      'Bespoke residential joinery for a PECHS residence uniting a vertical fluted oak media feature wall with concealed cable routing, veined stone backing, and coordinating floating bathroom vanities.',
    materials: ['Natural Fluted Oak Veneer', 'Veined Porcelain Slab', 'Matte Black Shadow Trims', 'Moisture-Sealed Vanity Carcass'],
    dimensions: '12 ft Feature Elevation + 2 Vanities',
    duration: '3 Weeks',
    ctaLabel: 'Explore Media Wall & Vanity',
  },
  {
    id: 'proj-4',
    slug: 'raw-to-luxury-apartment-makeover',
    title: 'Raw-to-Luxury Apartment Makeover',
    category: 'Renovation',
    location: 'Clifton, Karachi',
    year: '2025',
    aspectRatio: '5/4',
    image: '/src/assets/images/project_apartment_makeover_1795117190721.jpg',
    secondaryImage: '/src/assets/images/hero_modular_kitchen_1795117190126.jpg',
    scope: ['Complete Remodeling', 'False Ceiling & Cove', 'Walnut Wall Panelling', 'Open Kitchen Integration'],
    description:
      'A bare concrete shell apartment in Clifton transformed into a warm, cohesive modern home featuring stepped cove ceilings, walnut acoustic wall paneling, travertine flooring, and a seamless open modular kitchen.',
    materials: ['American Walnut Veneer Panels', 'Honed Travertine Tiles', 'Gypsum Cove Ceilings', 'Matte Charcoal Kitchen Millwork'],
    dimensions: '2,400 sq ft Full Residence',
    duration: '10 Weeks',
    ctaLabel: 'Discover Apartment Makeover',
  },
];
