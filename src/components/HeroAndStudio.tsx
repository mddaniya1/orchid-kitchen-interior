import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { SITE_CONFIG } from '../data/siteData';
import { ArrowCircleButton, CasaImage, SectionLabel } from './ui/CasaPrimitives';

interface HeroAndStudioProps {
  onExploreWork: () => void;
}

export const HeroSection: React.FC<HeroAndStudioProps> = ({ onExploreWork }) => {
  const words = SITE_CONFIG.hero.headline.split(' ');

  return (
    <section
      id="top"
      className="relative flex h-screen min-h-[680px] w-full flex-col bg-[#000000] p-6 max-[809px]:h-[80vh] max-[809px]:min-h-[560px] max-[809px]:p-3"
    >
      <div className="relative flex flex-1 flex-col justify-end overflow-hidden rounded-[32px] bg-[#101010] p-6 max-[809px]:rounded-[24px] max-[809px]:p-4">
        {/* Background Hero Kitchen Image with entrance scale */}
        <motion.div
          initial={{ scale: 1.07, opacity: 0.75 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          <CasaImage
            src={SITE_CONFIG.hero.image}
            alt="Orchid Kitchen and Interior bespoke modular kitchen in Karachi"
            className="h-full w-full"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0) -8%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.65) 100%)',
            }}
          />
        </motion.div>

        {/* Bottom Content Stack (.framer-kf0r2u: gap 32px) */}
        <div className="relative z-10 flex w-full flex-col gap-8 max-[809px]:gap-5">
          {/* Meta Row: Left Description (max-w-400px) & Right CTA */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-row items-end justify-between gap-8 max-[809px]:flex-col max-[809px]:items-start max-[809px]:gap-4"
          >
            <p className="casa-body-lg max-w-[400px] text-[#e1e0cc]/90">
              {SITE_CONFIG.hero.description}
            </p>
            <ArrowCircleButton
              label={SITE_CONFIG.hero.ctaLabel}
              onClick={onExploreWork}
              variant="light"
            />
          </motion.div>

          {/* Edge-to-Edge Wordmark matching Casa Interior (.framer-styles-preset-16m0ggx: Almarai 400 -0.07em 0.85em) */}
          <h1 className="w-full select-none whitespace-nowrap font-display text-[clamp(34px,9.6vw,74px)] font-normal leading-[0.85em] tracking-[-0.07em] text-[#e1e0cc] min-[810px]:text-[clamp(74px,10.4vw,154px)]">
            {words.map((word, idx) => (
              <motion.span
                key={word}
                initial={{ opacity: 0.001, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1 + idx * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mr-[0.2em] inline-block last:mr-0"
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </div>
      </div>
    </section>
  );
};

interface RevealWordProps {
  word: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}

const RevealWord: React.FC<RevealWordProps> = ({ word, index, total, progress }) => {
  const start = index / total;
  const end = Math.min(1, start + 1.8 / total);
  const opacity = useTransform(progress, [start, end], [0.28, 1]);

  return (
    <motion.span style={{ opacity }} className="mr-[0.26em] inline-block">
      {word}
    </motion.span>
  );
};

export const StudioSection: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 82%', 'end 55%'],
  });

  const descriptionWords = SITE_CONFIG.studio.description.split(' ');

  return (
    <section
      id="studio"
      className="flex w-full flex-col items-center justify-start px-6 py-[128px] max-[1199px]:py-[96px] max-[809px]:px-3 max-[809px]:py-[64px]"
    >
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex w-full max-w-[1152px] flex-col items-center justify-start gap-10 overflow-hidden rounded-[32px] bg-[#450204] px-16 py-24 text-center max-[1199px]:px-10 max-[1199px]:py-20 max-[809px]:gap-7 max-[809px]:rounded-[24px] max-[809px]:px-6 max-[809px]:py-14"
      >
        <div className="casa-noise pointer-events-none absolute inset-0 opacity-20" />

        <SectionLabel className="relative z-10 text-center text-[#e1e0cc]/75">
          {SITE_CONFIG.studio.label}
        </SectionLabel>

        <h2 className="casa-h2 relative z-10 max-w-[24ch] text-center text-[#e1e0cc]">
          {SITE_CONFIG.studio.heading}
        </h2>

        <p className="casa-h3 relative z-10 max-w-[38ch] text-center font-normal text-[#e1e0cc]">
          {descriptionWords.map((word, idx) => (
            <RevealWord
              key={`${word}-${idx}`}
              word={word}
              index={idx}
              total={descriptionWords.length}
              progress={scrollYProgress}
            />
          ))}
        </p>
      </motion.div>
    </section>
  );
};
