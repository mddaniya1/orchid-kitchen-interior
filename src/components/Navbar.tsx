import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SITE_CONFIG, buildWhatsAppUrl } from '../data/siteData';

export type RouteView =
  | { page: 'home' }
  | { page: 'projects' }
  | { page: 'project-detail'; slug: string }
  | { page: 'contact'; preselectedService?: string };

interface NavbarProps {
  currentRoute: RouteView;
  onNavigate: (route: RouteView, sectionId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleLinkClick = (target: string) => {
    setMenuOpen(false);
    if (target === 'projects-page') {
      onNavigate({ page: 'projects' });
    } else if (target === 'contact-page') {
      onNavigate({ page: 'contact' });
    } else {
      onNavigate({ page: 'home' }, target);
    }
  };

  const isActive = (target: string) => {
    if (
      target === 'projects-page' &&
      (currentRoute.page === 'projects' || currentRoute.page === 'project-detail')
    ) {
      return true;
    }
    if (target === 'contact-page' && currentRoute.page === 'contact') {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [menuOpen]);

  // Exact Casa Interior drawer link order (.framer-v-1rmoiad):
  // Studio (0), Projects (1), Philosophy (2), Expertise (3), Contact (4)
  const orderedLinks = [
    SITE_CONFIG.navigation[0], // Studio
    SITE_CONFIG.navigation[2], // Projects
    SITE_CONFIG.navigation[1], // Philosophy
    SITE_CONFIG.navigation[3], // Expertise
    SITE_CONFIG.navigation[4], // Contact
  ];

  return (
    <header
      aria-label="Main navigation"
      className="pointer-events-none absolute top-0 left-0 z-40 w-full min-[1000px]:left-1/2 min-[1000px]:w-[828px] min-[1000px]:-translate-x-1/2 min-[1200px]:w-[1104px] min-[1440px]:w-[1280px]"
    >
      <nav
        aria-label="Main navigation"
        className={`pointer-events-auto flex w-full flex-row items-start justify-between transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen
            ? 'p-0'
            : 'pl-[20px] pr-[12px] min-[810px]:px-[36px] min-[1000px]:p-0'
        }`}
      >
        {/* Left Brand Notch (.framer-e8r2tf): #000000, rounded-b-[32px], h-[44px], px-[24px] */}
        <div
          className={`flex h-[44px] items-center justify-start overflow-hidden rounded-b-[32px] bg-[#000000] transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            menuOpen ? 'w-0 px-0 opacity-0' : 'w-auto px-[24px] opacity-100'
          }`}
        >
          <a
            href="/"
            aria-label={`${SITE_CONFIG.brandFull} — Home`}
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              onNavigate({ page: 'home' });
            }}
            className="font-display text-[14px] font-bold leading-[1em] tracking-[-0.02em] text-[#e1e0cc] whitespace-nowrap shrink-0 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e1e0cc] rounded-sm"
          >
            {SITE_CONFIG.brandShort}
          </a>
        </div>

        {/* Right Menu Notch & Expanding Panel (.framer-7sbdt5): w-[150px] px-[24px] closed -> w-full px-[28px] open */}
        <div
          ref={panelRef}
          className={`flex flex-col items-center justify-start overflow-hidden rounded-b-[32px] bg-[#000000] transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            menuOpen ? 'w-full px-[28px]' : 'w-[150px] px-[24px]'
          }`}
        >
          {/* Toggle Row (.framer-1au09mz): exact h-[44px], justify-between */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="casa-nav-drawer"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="flex h-[44px] w-full cursor-pointer flex-row items-center justify-between p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e1e0cc] rounded-sm"
          >
            <span className="font-display text-[14px] font-normal leading-[1em] text-[#e1e0cc]/80 transition-colors duration-300 hover:text-[#e1e0cc]">
              {menuOpen ? 'Close' : 'Menu'}
            </span>
            <span className="relative h-[10px] w-[18px] shrink-0" aria-hidden="true">
              <span
                className={`absolute left-0 block h-[2px] w-[18px] rounded-[2px] bg-[#e1e0cc]/80 transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  menuOpen ? 'top-[4px] rotate-45' : 'top-0 rotate-0'
                }`}
              />
              <span
                className={`absolute left-0 block h-[2px] w-[18px] rounded-[2px] bg-[#e1e0cc]/80 transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  menuOpen ? 'bottom-[4px] -rotate-45' : 'bottom-0 rotate-0'
                }`}
              />
            </span>
          </button>

          {/* Expanding Drawer (.framer-1p0wzl0): height 0 -> auto, opacity 0 -> 1 */}
          <AnimatePresence initial={false}>
            {menuOpen && (
              <motion.div
                id="casa-nav-drawer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex w-full flex-col items-start overflow-hidden"
              >
                {/* Links Stack (.framer-10sbsi3): exact pt-[20px] pb-[28px] gap-[6px] */}
                <div className="flex w-full flex-col items-start gap-[6px] pt-[20px] pb-[28px]">
                  {orderedLinks.map((item) => {
                    const active = isActive(item.target);
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => handleLinkClick(item.target)}
                        className={`flex w-full cursor-pointer items-center justify-between text-left font-display text-[22px] font-normal leading-[1.2em] tracking-[-0.03em] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] min-[810px]:text-[26px] min-[1200px]:text-[32px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e1e0cc] rounded-sm ${
                          active
                            ? 'text-[#e1e0cc]'
                            : 'text-[#e1e0cc] hover:text-[#e1e0cc]/55'
                        }`}
                      >
                        <span>{item.label}</span>
                        {active && (
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full bg-[#e1e0cc]"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Drawer Footer (.framer-y88psu): border-top 1px rgba(225,224,204,0.12), pt-[16px] pb-[24px], 12px Apfel Grotezk */}
                <div className="flex w-full flex-row items-center justify-between gap-4 border-t border-[#e1e0cc]/12 pt-[16px] pb-[24px] font-body text-[12px] font-normal leading-[1.3em] tracking-[0em] text-[#e1e0cc]/80">
                  <a
                    href={SITE_CONFIG.contact.emailHref}
                    className="truncate text-[#e1e0cc]/80 transition-colors duration-200 hover:text-[#e1e0cc]"
                  >
                    {SITE_CONFIG.contact.email}
                  </a>
                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 whitespace-nowrap text-[#e1e0cc]/80 transition-colors duration-200 hover:text-[#e1e0cc]"
                  >
                    WhatsApp ↗
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
};
