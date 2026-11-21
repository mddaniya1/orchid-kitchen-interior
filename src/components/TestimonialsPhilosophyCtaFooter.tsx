import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, CornerUpRight, Star } from 'lucide-react';
import { SITE_CONFIG, buildWhatsAppUrl } from '../data/siteData';
import { ArrowCircleButton, CasaImage, SectionLabel } from './ui/CasaPrimitives';

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const items = SITE_CONFIG.testimonials.items;
  const active = items[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const diff = touchStartX.current - endX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="testimonials"
      className="flex w-full flex-col items-center bg-[#000000] px-6 py-[128px] max-[1199px]:py-[96px] max-[809px]:px-4 max-[809px]:py-[72px]"
    >
      <div className="flex w-full max-w-[1280px] flex-col gap-16 max-[809px]:gap-7">
        {/* Header Row */}
        <div className="flex flex-row items-end justify-between gap-6 max-[809px]:flex-col max-[809px]:items-start">
          <div className="flex flex-col gap-4">
            <SectionLabel>{SITE_CONFIG.testimonials.label}</SectionLabel>
            <h2 className="casa-h2 max-w-[16ch]">{SITE_CONFIG.testimonials.heading}</h2>
          </div>

          <div className="flex flex-col items-end gap-1.5 text-right max-[809px]:items-start max-[809px]:text-left">
            <p className="casa-body-lg max-w-[40ch] text-[#e1e0cc]/80">
              {SITE_CONFIG.testimonials.subheading}
            </p>
            <p className="text-[12px] text-[#e1e0cc]/55">
              {SITE_CONFIG.googleRating.score} · {SITE_CONFIG.googleRating.reviewCount} Google Reviews · Draft entries pending client verification
            </p>
          </div>
        </div>

        {/* Main Carousel Cards matching framer-Mub4U */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex w-full flex-row items-stretch gap-6 max-[809px]:flex-col"
        >
          {/* Left Project Photo Card (aspect 0.76, rounded 32px, blurred bottom pill) */}
          <div className="relative aspect-[0.76] w-[420px] max-w-[486px] min-w-[300px] shrink-0 overflow-hidden rounded-[32px] bg-[#120d09] max-[1199px]:w-[340px] max-[809px]:aspect-auto max-[809px]:h-[440px] max-[809px]:w-full max-[809px]:min-w-0 max-[809px]:max-w-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0.35, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.35 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full"
              >
                <CasaImage src={active.image} alt={active.project} className="h-full w-full" />
              </motion.div>
            </AnimatePresence>
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0) 35%, rgba(0, 0, 0, 0.55) 100%)',
              }}
            />
            <div className="absolute right-4 bottom-4 left-4 z-10 flex items-center justify-between rounded-[32px] bg-[#101010]/72 px-5 py-3 backdrop-blur-[14px]">
              <span className="casa-body text-[14px] text-[#e1e0cc]">{active.project}</span>
              <span className="casa-label text-[#e1e0cc]/65">KARACHI</span>
            </div>
          </div>

          {/* Right Quote Card (#101010, rounded 32px, p-12) */}
          <div className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-[32px] bg-[#101010] p-12 max-[809px]:gap-7 max-[809px]:p-6">
            <div className="casa-noise pointer-events-none absolute inset-0 opacity-15" />

            {/* Top Stars + Index Counter */}
            <div className="relative z-10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 text-[#e1e0cc]" aria-label="5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="casa-label text-[#e1e0cc]/60 tabular-nums">
                {String(activeIndex + 1).padStart(2, '0')} /{' '}
                {String(items.length).padStart(2, '0')}
              </span>
            </div>

            {/* Quote */}
            <div className="relative z-10 my-6">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={active.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="casa-h3 text-[#e1e0cc]"
                >
                  “{active.quote}”
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Bottom Author + Cream Circular Arrows matching Casa Interior */}
            <div className="relative z-10 flex items-center justify-between gap-4 pt-4">
              <div className="flex flex-col gap-0.5">
                <span className="casa-body text-[#e1e0cc]">{active.clientLabel}</span>
                <span className="text-[13px] text-[#e1e0cc]/60">{active.project}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous review"
                  className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-[32px] bg-[#e1e0cc] text-[#000000] transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e1e0cc]"
                >
                  <CornerUpRight strokeWidth={1.5} className="h-4 w-4 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next review"
                  className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-[32px] bg-[#e1e0cc] text-[#000000] transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e1e0cc]"
                >
                  <CornerUpRight strokeWidth={1.5} className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Client Selector Tabs matching Casa Interior Clients Bar */}
        <div className="flex flex-wrap items-start gap-x-8 gap-y-6 pt-2 max-[809px]:flex-nowrap max-[809px]:justify-between max-[809px]:gap-4">
          {items.map((item, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className="group relative flex min-h-[44px] cursor-pointer items-center gap-3 pb-3 text-left transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e1e0cc]"
              >
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#101010] max-[809px]:h-9 max-[809px]:w-9">
                  <CasaImage src={item.image} alt="" className="h-full w-full" withNoise={false} />
                </div>
                <div className="flex flex-col max-[809px]:hidden">
                  <span
                    className={`text-[15px] transition-colors duration-200 ${
                      isSelected
                        ? 'text-[#e1e0cc]'
                        : 'text-[#e1e0cc]/55 group-hover:text-[#e1e0cc]/85'
                    }`}
                  >
                    {item.project}
                  </span>
                  <span className="text-[12px] text-[#e1e0cc]/45">{item.clientLabel}</span>
                </div>
                <span
                  className={`absolute right-0 bottom-0 left-0 block h-[2px] transition-transform duration-300 origin-left ${
                    isSelected ? 'scale-x-100 bg-[#e1e0cc]' : 'scale-x-0 bg-[#e1e0cc]/40'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const PhilosophySection: React.FC = () => {
  return (
    <section
      id="philosophy"
      className="relative flex w-full flex-col items-center overflow-hidden px-6 py-[128px] max-[809px]:px-4 max-[809px]:py-[64px]"
    >
      <div className="relative z-10 flex w-full max-w-[1280px] flex-col gap-[96px] max-[1199px]:gap-[64px]">
        {/* 2-Column Header matching Philosophy Content Row */}
        <div className="flex flex-row flex-wrap items-end justify-between gap-8 max-[809px]:flex-col max-[809px]:items-start max-[809px]:gap-4">
          <div className="flex flex-col gap-5">
            <SectionLabel>{SITE_CONFIG.philosophy.label}</SectionLabel>
            <h2 className="casa-h2 max-w-[15ch]">{SITE_CONFIG.philosophy.heading}</h2>
          </div>
          <p className="casa-body-lg max-w-[42ch] text-[#e1e0cc]/80">
            {SITE_CONFIG.philosophy.subheading}
          </p>
        </div>

        {/* 3 Philosophy Principle Rows with Floating Hover Image (scale 0.92 rotate -2deg -> none) */}
        <div className="flex w-full flex-col">
          {SITE_CONFIG.philosophy.items.map((item) => (
            <div
              key={item.id}
              className="philosophy-row relative flex w-full flex-row items-center justify-between gap-6 border-b border-[#e1e0cc]/20 px-6 py-6 max-[809px]:flex-col max-[809px]:items-start max-[809px]:gap-4 max-[809px]:px-0 max-[809px]:py-8"
            >
              <h3 className="philosophy-title casa-h3 w-[42%] text-[#e1e0cc] max-[809px]:w-full">
                {item.title}
              </h3>

              <p className="casa-body w-[46%] text-[#e1e0cc]/75 max-[809px]:w-full">
                {item.description}
              </p>

              {/* Floating Hover Preview Image (desktop & tablet only, matching Casa Interior) */}
              <div className="philosophy-hover-image pointer-events-none absolute top-[-88px] bottom-[-53px] left-[calc(50%-120px)] z-20 hidden w-[240px] overflow-hidden rounded-[32px] shadow-2xl min-[810px]:block max-[1199px]:right-[250px] max-[1199px]:left-auto">
                <CasaImage src={item.image} alt={item.title} className="h-full w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ContactCtaSection: React.FC = () => {
  return (
    <section id="contact" className="flex w-full justify-center px-6 py-8 max-[809px]:px-4">
      {/* Exact Casa Interior Contact CTA (.framer-xnavul: 1280px, h-673px, py-24 px-6, gap-6; left burgundy .framer-qq633 44%, right photo) */}
      <div className="flex h-[673px] w-full max-w-[1280px] flex-row items-center justify-start gap-6 py-24 max-[1199px]:h-auto max-[1199px]:flex-col max-[1199px]:gap-4 max-[1199px]:py-12">
        {/* Left Burgundy CTA Panel (.framer-qq633: width 44%, bg #450204, rounded-32, p-6) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex h-full w-[44%] flex-col items-start justify-between overflow-hidden rounded-[32px] bg-[#450204] p-8 max-[1199px]:h-auto max-[1199px]:w-full max-[809px]:rounded-[24px] max-[809px]:p-6"
        >
          <div className="casa-noise pointer-events-none absolute inset-0 opacity-15" />

          <div className="relative z-10 flex flex-col gap-5">
            <SectionLabel className="text-[#e1e0cc]/75">{SITE_CONFIG.cta.label}</SectionLabel>
            <h2 className="casa-h2 max-w-[13ch] text-[#e1e0cc]">{SITE_CONFIG.cta.heading}</h2>
            <p className="casa-body-lg max-w-[34ch] text-[#e1e0cc]/85">
              {SITE_CONFIG.cta.subheading}
            </p>
          </div>

          <div className="relative z-10 pt-8">
            <ArrowCircleButton
              label={SITE_CONFIG.cta.ctaLabel}
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              variant="light"
            />
          </div>
        </motion.div>

        {/* Right Architectural Photo Panel (Card Motion) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-full flex-1 overflow-hidden rounded-[32px] bg-[#101010] max-[1199px]:h-[380px] max-[1199px]:w-full max-[809px]:h-[320px] max-[809px]:rounded-[24px]"
        >
          <CasaImage
            src={SITE_CONFIG.cta.rightImage}
            alt="Orchid Kitchen bespoke modular cabinetry and lighting"
            className="h-full w-full"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)',
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenProjects: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onOpenProjects,
  onOpenContact,
}) => {
  const [socialNotice, setSocialNotice] = useState<string | null>(null);

  const handleSocialClick = (platform: 'Instagram' | 'Facebook', url: string | null) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      setSocialNotice(
        `${platform} profile link will be published once verified. Connect directly via WhatsApp or phone.`
      );
    }
  };

  return (
    <footer className="relative w-full overflow-hidden rounded-t-[64px] bg-[#450204] px-8 pt-20 pb-8 text-[#e1e0cc] max-[1199px]:rounded-t-[64px] max-[809px]:rounded-t-[32px] max-[809px]:px-4 max-[809px]:pt-14">
      <div className="casa-noise pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col">
        {/* Top Lead & Links (.framer-4b093p) */}
        <div className="flex flex-wrap items-start justify-between gap-12 pb-20 max-[809px]:flex-col max-[809px]:pb-12">
          {/* Left Lead */}
          <div className="flex min-w-[280px] flex-1 flex-col gap-7">
            <SectionLabel className="text-[#e1e0cc]/75">
              {SITE_CONFIG.footer.leadLabel}
            </SectionLabel>
            <h2 className="casa-h2 max-w-[14ch] text-[#e1e0cc]">
              {SITE_CONFIG.footer.leadHeading}
            </h2>
            <div className="flex flex-col items-start gap-2.5 pt-1">
              <a
                href={SITE_CONFIG.contact.emailHref}
                className="inline-flex items-center gap-1.5 text-[18px] text-[#e1e0cc] underline decoration-[#e1e0cc]/35 underline-offset-4 transition-opacity hover:opacity-80 max-[809px]:text-[15px]"
              >
                <span>{SITE_CONFIG.contact.email}</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[15px] text-[#e1e0cc]/85 tabular-nums">
                <a href={SITE_CONFIG.contact.primaryPhoneHref} className="hover:underline">
                  {SITE_CONFIG.contact.primaryPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Right Columns: NAVIGATE, FOLLOW, STUDIO */}
          <div className="grid grid-cols-3 gap-12 max-[1199px]:gap-8 max-[809px]:w-full max-[809px]:grid-cols-2">
            {/* NAVIGATE */}
            <div className="flex flex-col gap-4">
              <span className="casa-label text-[#e1e0cc]/60">NAVIGATE</span>
              <nav aria-label="Footer Navigation" className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => onNavigateSection('studio')}
                  className="cursor-pointer text-left text-[15px] text-[#e1e0cc] transition-opacity hover:opacity-75"
                >
                  Studio
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateSection('philosophy')}
                  className="cursor-pointer text-left text-[15px] text-[#e1e0cc] transition-opacity hover:opacity-75"
                >
                  Philosophy
                </button>
                <button
                  type="button"
                  onClick={onOpenProjects}
                  className="cursor-pointer text-left text-[15px] text-[#e1e0cc] transition-opacity hover:opacity-75"
                >
                  Projects
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateSection('expertise')}
                  className="cursor-pointer text-left text-[15px] text-[#e1e0cc] transition-opacity hover:opacity-75"
                >
                  Expertise
                </button>
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="cursor-pointer text-left text-[15px] text-[#e1e0cc] transition-opacity hover:opacity-75"
                >
                  Contact
                </button>
              </nav>
            </div>

            {/* FOLLOW */}
            <div className="flex flex-col gap-4">
              <span className="casa-label text-[#e1e0cc]/60">FOLLOW</span>
              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() =>
                    handleSocialClick('Instagram', SITE_CONFIG.contact.social.instagramUrl)
                  }
                  className="inline-flex cursor-pointer items-center gap-1 text-left text-[15px] text-[#e1e0cc] transition-opacity hover:opacity-75"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleSocialClick('Facebook', SITE_CONFIG.contact.social.facebookUrl)
                  }
                  className="inline-flex cursor-pointer items-center gap-1 text-left text-[15px] text-[#e1e0cc] transition-opacity hover:opacity-75"
                >
                  <span>Facebook</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
                </button>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[15px] text-[#e1e0cc] transition-opacity hover:opacity-75"
                >
                  <span>WhatsApp</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
                </a>
              </div>
              {socialNotice && (
                <p className="max-w-[26ch] text-[12px] leading-snug text-[#e1e0cc]/75">
                  {socialNotice}
                </p>
              )}
            </div>

            {/* STUDIO */}
            <div className="flex flex-col gap-4 max-[809px]:col-span-2">
              <span className="casa-label text-[#e1e0cc]/60">STUDIO</span>
              <div className="flex flex-col gap-2.5 text-[14px] leading-relaxed text-[#e1e0cc]/85">
                <p className="font-medium text-[#e1e0cc]">{SITE_CONFIG.brandShort}</p>
                <p>{SITE_CONFIG.contact.address}</p>
                <p>{SITE_CONFIG.contact.timings}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar matching Empty Stack divider + 3-slot footer bar */}
        <div className="flex flex-row items-center justify-between gap-4 border-t border-[#e1e0cc]/20 pt-6 text-[11px] tracking-[0.04em] text-[#e1e0cc]/70 max-[809px]:flex-col max-[809px]:items-start">
          <span>{SITE_CONFIG.footer.copyright}</span>
          <span>{SITE_CONFIG.footer.tagline}</span>
        </div>
      </div>
    </footer>
  );
};
