import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG, buildWhatsAppUrl } from '../data/siteData';
import { ArrowCircleButton, CasaImage, SectionLabel } from './ui/CasaPrimitives';

interface ExpertiseSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({ onSelectService }) => {
  return (
    <section
      id="expertise"
      className="relative flex w-full flex-col items-center overflow-hidden px-6 py-[128px] max-[809px]:px-4 max-[809px]:py-[64px]"
    >
      <div className="relative z-10 flex w-full max-w-[1280px] flex-col gap-[96px] max-[1199px]:gap-[64px]">
        {/* Header */}
        <div className="flex flex-row flex-wrap items-end justify-between gap-6 max-[809px]:flex-col max-[809px]:items-start">
          <div className="flex flex-col gap-5">
            <SectionLabel>{SITE_CONFIG.expertise.label}</SectionLabel>
            <h2 className="casa-h2 max-w-[16ch]">{SITE_CONFIG.expertise.heading}</h2>
          </div>
          <p className="casa-body-lg max-w-[42ch] text-[#e1e0cc]/80">
            {SITE_CONFIG.expertise.subheading}
          </p>
        </div>

        {/* Exact 2x2 Grid (1 Photo Statement Tile + 3 Service Cards) matching framer-1wvvdmr */}
        <div className="grid w-full grid-cols-2 auto-rows-[480px] gap-6 max-[1199px]:auto-rows-[460px] max-[809px]:flex max-[809px]:flex-col max-[809px]:gap-4">
          {/* Tile 0: Architectural Visual Statement Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-[32px] bg-[#101010] p-8 max-[809px]:h-[334px] max-[809px]:rounded-[24px] max-[809px]:p-6"
          >
            <div className="absolute inset-0 z-0">
              <CasaImage
                src={SITE_CONFIG.expertise.statementImage}
                alt="Bespoke woodwork and stone counter joinery detail"
                className="h-full w-full"
                imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(16,16,16,0.15) 0%, rgba(16,16,16,0.78) 100%)',
                }}
              />
            </div>

            <h3 className="casa-h2 relative z-10 max-w-[10ch] text-[#e1e0cc]">
              {SITE_CONFIG.expertise.statementTitle}
            </h3>
          </motion.div>

          {/* Cards 01 - 03: Service Cards matching .framer-U2TFt & .framer-poVUu */}
          {SITE_CONFIG.expertise.cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: (idx + 1) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[32px] bg-[#101010] p-8 max-[809px]:h-auto max-[809px]:min-h-[340px] max-[809px]:rounded-[24px] max-[809px]:p-6"
            >
              <div className="casa-noise pointer-events-none absolute inset-0 opacity-10" />

              <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                {/* Top Material Thumbnail (56x56, rounded 8px) + Title */}
                <div className="flex flex-col items-start gap-5">
                  <div className="h-[56px] w-[56px] overflow-hidden rounded-[8px] bg-[#1a130e]">
                    <CasaImage
                      src={card.image}
                      alt={card.title}
                      className="h-full w-full"
                      withNoise={false}
                    />
                  </div>
                  <h3 className="casa-h3 text-[#e1e0cc]">{card.title}</h3>
                </div>

                {/* Feature List matching .framer-poVUu: left 4px-rounded cream square icon + text */}
                <ul className="m-0 flex w-full list-none flex-col gap-3 p-0">
                  {card.items.map((item) => (
                    <li key={item} className="w-full">
                      <button
                        type="button"
                        onClick={() => onSelectService(`${card.title.replace('.', '')} — ${item}`)}
                        className="group flex w-full cursor-pointer items-center gap-3.5 py-0.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e1e0cc] rounded-sm"
                      >
                        <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[4px] bg-[#dfdbc8]/80 text-[#000000] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
                          <ArrowUpRight className="h-3.5 w-3.5 stroke-[1.75]" />
                        </span>
                        <span className="casa-body text-[#e1e0cc]/85 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:text-[#e1e0cc]">
                          {item}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ProcessSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const steps = SITE_CONFIG.process.steps;
  const activeStep = steps[activeStepIndex];

  return (
    <section id="process" className="flex w-full justify-center px-6 py-12 max-[809px]:px-4">
      <div className="relative flex w-full max-w-[1280px] flex-col gap-16 overflow-hidden rounded-[32px] bg-[#101010] px-8 py-24 max-[1199px]:px-6 max-[1199px]:py-24 max-[809px]:gap-8 max-[809px]:bg-transparent max-[809px]:px-0 max-[809px]:py-[72px]">
        <div className="casa-noise pointer-events-none absolute inset-0 opacity-10 max-[809px]:hidden" />

        {/* 2-Column Header matching Process Content Columns */}
        <div className="relative z-10 flex flex-row flex-wrap items-end justify-between gap-8 max-[809px]:flex-col max-[809px]:items-start max-[809px]:gap-4">
          <div className="flex flex-col gap-5">
            <SectionLabel>{SITE_CONFIG.process.label}</SectionLabel>
            <h2 className="casa-h2 max-w-[14ch]">{SITE_CONFIG.process.heading}</h2>
          </div>
          <p className="casa-body-lg max-w-[42ch] text-[#e1e0cc]/80">
            {SITE_CONFIG.process.subheading}
          </p>
        </div>

        {/* 2-Column Process Layout */}
        <div className="relative z-10 flex w-full flex-row items-start gap-14 max-[1199px]:flex-col max-[1199px]:gap-16 max-[809px]:gap-12">
          {/* Left Sticky Visual Column */}
          <div className="w-[44%] min-[1200px]:sticky min-[1200px]:top-24 max-[1199px]:w-full">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] bg-[#120d09] max-[1199px]:aspect-[16/10]">
              <motion.div
                key={activeStep.number}
                initial={{ opacity: 0.4, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full"
              >
                <CasaImage
                  src={activeStep.image}
                  alt={activeStep.title}
                  className="h-full w-full"
                />
              </motion.div>
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.82) 100%)',
                }}
              />
              <div className="absolute right-6 bottom-6 left-6 z-10 flex flex-col gap-1.5">
                <span className="casa-label text-[#b7a586] tabular-nums">
                  STEP {activeStep.number} / 03
                </span>
                <p className="casa-body text-[#e1e0cc]">{activeStep.caption}</p>
              </div>
            </div>
          </div>

          {/* Right Steps Timeline Column */}
          <div className="relative flex flex-1 flex-col gap-7 max-[809px]:gap-4">
            {/* Dashed vertical timeline line */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-6 bottom-6 left-[31px] z-0 w-px border-l border-dashed border-[#e1e0cc]/30 max-[809px]:hidden"
            />

            {steps.map((step, index) => {
              const isActive = index === activeStepIndex;
              return (
                <motion.div
                  key={step.number}
                  onViewportEnter={() => setActiveStepIndex(index)}
                  viewport={{ amount: 0.6 }}
                  onClick={() => setActiveStepIndex(index)}
                  className="relative z-10 flex cursor-pointer items-start gap-6 max-[809px]:flex-col max-[809px]:gap-3"
                >
                  {/* Step Marker Circle */}
                  <button
                    type="button"
                    onClick={() => setActiveStepIndex(index)}
                    aria-label={`View Step ${step.number}: ${step.title}`}
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full border font-display text-[18px] font-bold tabular-nums transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] max-[809px]:h-12 max-[809px]:w-12 max-[809px]:text-[15px] ${
                      isActive
                        ? 'border-[#e1e0cc] bg-[#450204] text-[#e1e0cc]'
                        : 'border-[#e1e0cc]/25 bg-[#101010] text-[#e1e0cc]/65 hover:border-[#e1e0cc]/60'
                    }`}
                  >
                    {step.number}
                  </button>

                  {/* Step Card */}
                  <div
                    className={`flex flex-1 flex-col gap-5 rounded-[24px] border p-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] max-[809px]:w-full max-[809px]:p-6 ${
                      isActive
                        ? 'border-[#e1e0cc]/30 bg-[#1a130e]/70 opacity-100'
                        : 'border-[#e1e0cc]/12 bg-[#0e0a07]/60 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div className="flex flex-col gap-3">
                      <h3 className="casa-h3 text-[#e1e0cc]">{step.title}</h3>
                      <p className="casa-body text-[#e1e0cc]/80">{step.description}</p>
                    </div>

                    {step.deliverables && (
                      <div className="flex flex-col gap-2.5 border-t border-[#e1e0cc]/12 pt-4">
                        {step.deliverables.map((del) => (
                          <div
                            key={del}
                            className="flex items-center gap-3 text-[14px] text-[#e1e0cc]/80"
                          >
                            <span className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-[4px] bg-[#dfdbc8]/80 text-[#000000]">
                              <ArrowUpRight className="h-3 w-3 stroke-[1.75]" />
                            </span>
                            <span>{del}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {index === steps.length - 1 && (
                      <div className="pt-2">
                        <ArrowCircleButton
                          label={SITE_CONFIG.process.ctaLabel}
                          href={buildWhatsAppUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="light"
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
