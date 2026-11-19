import React from 'react';
import { motion } from 'motion/react';
import { CornerUpRight } from 'lucide-react';
import { PROJECTS, ProjectItem, SITE_CONFIG } from '../data/siteData';
import { ArrowCircleButton, CasaImage, SectionLabel } from './ui/CasaPrimitives';

interface SelectedWorkProps {
  onSelectProject: (slug: string) => void;
}

const ProjectCard: React.FC<{
  project: ProjectItem;
  aspectClass: string;
  onClick: () => void;
  delay?: number;
}> = ({ project, aspectClass, onClick, delay = 0 }) => (
  <motion.article
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    className="w-full"
  >
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full cursor-pointer flex-col items-start gap-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e1e0cc] rounded-[16px]"
    >
      {/* Exact 16px border-radius matching Casa Interior project slots */}
      <div className={`relative w-full overflow-hidden rounded-[16px] bg-[#101010] ${aspectClass}`}>
        <CasaImage
          src={project.image}
          alt={`${project.title} — ${project.category} in ${project.location}`}
          className="h-full w-full"
          imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
      </div>

      {/* Unboxed Metadata Row matching Casa Interior */}
      <div className="flex w-full items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h3 className="casa-h3 text-[#e1e0cc] transition-colors duration-200 group-hover:text-white">
            {project.title}
          </h3>
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] text-[#e1e0cc]/65">
            <span>{project.category}</span>
            <span aria-hidden="true" className="text-[#e1e0cc]/30">
              |
            </span>
            <span>{project.location}</span>
            <span aria-hidden="true" className="text-[#e1e0cc]/30">
              |
            </span>
            <span className="tabular-nums">{project.year}</span>
          </div>
        </div>

        <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e1e0cc]/25 text-[#e1e0cc] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-[#e1e0cc] group-hover:bg-[#e1e0cc] group-hover:text-[#101010]">
          <CornerUpRight
            strokeWidth={1.5}
            className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[360deg]"
          />
        </span>
      </div>
    </button>
  </motion.article>
);

export const SelectedWorkSection: React.FC<SelectedWorkProps> = ({ onSelectProject }) => {
  const [p1, p2, p3, p4] = PROJECTS;

  return (
    <section
      id="projects"
      className="flex w-full flex-col items-center bg-[#000000] px-6 py-[128px] max-[809px]:px-4 max-[809px]:py-[64px]"
    >
      <div className="flex w-full max-w-[1280px] flex-col gap-[96px] max-[1199px]:gap-[64px]">
        {/* Exact Header (.framer-1iydm): Left label + heading, Right subheading */}
        <div className="flex flex-row flex-wrap items-end justify-between gap-6 max-[809px]:flex-col max-[809px]:items-start max-[809px]:gap-4">
          <div className="flex flex-col gap-5">
            <SectionLabel>{SITE_CONFIG.selectedWork.label}</SectionLabel>
            <h2 className="casa-h2 max-w-[14ch]">{SITE_CONFIG.selectedWork.heading}</h2>
          </div>
          <p className="casa-body-lg max-w-[38ch] text-[#e1e0cc]/80">
            {SITE_CONFIG.selectedWork.subheading}
          </p>
        </div>

        {/* Asymmetric Staggered 2-Row Layout matching reference proportions */}
        <div className="flex w-full flex-col gap-[96px] max-[1199px]:gap-[72px] max-[809px]:gap-[48px]">
          {/* Row 1: 58% (4:3) & 34% offset 190px (3:4) */}
          <div className="flex w-full flex-row items-start justify-between max-[809px]:flex-col max-[809px]:gap-14">
            <div className="w-[58%] max-[1199px]:w-[55%] max-[809px]:w-full">
              <ProjectCard
                project={p1}
                aspectClass="aspect-[4/3]"
                onClick={() => onSelectProject(p1.slug)}
              />
            </div>

            <div className="w-[34%] pt-[190px] max-[1199px]:w-[40%] max-[1199px]:pt-[120px] max-[809px]:w-full max-[809px]:pt-0">
              <ProjectCard
                project={p2}
                aspectClass="aspect-[3/4]"
                onClick={() => onSelectProject(p2.slug)}
                delay={0.12}
              />
            </div>
          </div>

          {/* Row 2: pl-24 (96px), 40% (3:4) & 44% offset 160px (5:4) */}
          <div className="flex w-full flex-row items-start justify-between pl-[96px] max-[1199px]:pl-0 max-[809px]:flex-col max-[809px]:gap-8">
            <div className="w-[40%] max-[1199px]:w-[46%] max-[809px]:w-full">
              <ProjectCard
                project={p3}
                aspectClass="aspect-[3/4]"
                onClick={() => onSelectProject(p3.slug)}
              />
            </div>

            <div className="w-[44%] pt-[160px] max-[1199px]:w-[46%] max-[1199px]:pt-[100px] max-[809px]:w-full max-[809px]:pt-0">
              <ProjectCard
                project={p4}
                aspectClass="aspect-[5/4]"
                onClick={() => onSelectProject(p4.slug)}
                delay={0.12}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FeaturedProjectSection: React.FC<{ onDiscover: (slug: string) => void }> = ({
  onDiscover,
}) => {
  return (
    <section
      id="featured"
      className="flex w-full flex-col items-center px-6 py-8 max-[809px]:px-3 max-[809px]:py-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="group relative flex min-h-[620px] w-full max-w-[1280px] flex-col items-center justify-center overflow-hidden rounded-[32px] bg-[#101010] p-12 text-center max-[1199px]:min-h-[540px] max-[1199px]:p-9 max-[809px]:min-h-[460px] max-[809px]:rounded-[24px] max-[809px]:p-6"
      >
        <div className="absolute inset-0 z-0">
          <CasaImage
            src={SITE_CONFIG.featuredProject.image}
            alt={SITE_CONFIG.featuredProject.heading}
            className="h-full w-full"
            imgClassName="transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
          {/* Exact Casa Interior dark scrim (--token-dSvNeJKTA: rgba(0,0,0,0.7)) */}
          <div className="absolute inset-0 bg-[#000000]/65" />
        </div>

        {/* Centered Editorial Overlay matching Casa Interior transform:translate(-50%,-50%) */}
        <div className="relative z-10 flex max-w-[700px] flex-col items-center gap-6">
          <SectionLabel className="text-center text-[#e1e0cc]/75">
            {SITE_CONFIG.featuredProject.label}
          </SectionLabel>
          <h2 className="casa-h2 text-center text-[#e1e0cc]">
            {SITE_CONFIG.featuredProject.heading}
          </h2>
          <p className="casa-body-lg max-w-[44ch] text-center text-[#e1e0cc]/85">
            {SITE_CONFIG.featuredProject.description}
          </p>
          <div className="pt-2">
            <ArrowCircleButton
              label={SITE_CONFIG.featuredProject.ctaLabel}
              onClick={() => onDiscover(SITE_CONFIG.featuredProject.projectSlug)}
              variant="light"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};
