import React, { useState } from 'react';
import { CornerUpRight } from 'lucide-react';

interface CasaImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  withNoise?: boolean;
  priority?: boolean;
}

export const CasaImage: React.FC<CasaImageProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  withNoise = true,
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#120d09] ${className}`}>
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading={priority ? 'eager' : 'lazy'}
          onError={() => setHasError(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      ) : (
        <div
          className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#1a130e] via-[#101010] to-[#450204]/50 p-6 text-center"
          role="img"
          aria-label={alt}
        >
          <span className="casa-label text-[#b7a586]">ORCHID KITCHEN</span>
          <span className="mt-2 max-w-[24ch] text-sm text-[#e1e0cc]/70">{alt}</span>
        </div>
      )}
      {withNoise && <div className="casa-noise pointer-events-none absolute inset-0 opacity-20" />}
    </div>
  );
};

interface ArrowCircleButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  variant?: 'light' | 'dark';
  className?: string;
}

export const ArrowCircleButton: React.FC<ArrowCircleButtonProps> = ({
  label,
  onClick,
  href,
  target,
  rel,
  variant = 'light',
  className = '',
}) => {
  const isLight = variant === 'light';
  const content = (
    <span
      className={`group inline-flex items-center gap-3 rounded-[32px] p-[4px_4px_4px_20px] whitespace-nowrap shrink-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02] hover:gap-4 ${
        isLight
          ? 'bg-[#e1e0cc] text-[#000000]'
          : 'border border-[#e1e0cc]/25 bg-[#101010] text-[#e1e0cc] hover:border-[#e1e0cc]/50'
      }`}
    >
      <span className="casa-body text-[16px] leading-[1.3em] tracking-normal">
        {label}
      </span>
      <span
        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[32px] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isLight
            ? 'bg-[#000000] text-[#e1e0cc]/80'
            : 'bg-[#e1e0cc]/12 text-[#e1e0cc]'
        }`}
      >
        <CornerUpRight
          strokeWidth={1.5}
          className="h-[18px] w-[18px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[360deg] group-hover:scale-90"
        />
      </span>
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={`inline-flex min-h-[44px] items-center rounded-[32px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e1e0cc] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-[44px] cursor-pointer items-center rounded-[32px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e1e0cc] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${className}`}
    >
      {content}
    </button>
  );
};

export const SectionLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <p className={`casa-label text-[#e1e0cc]/65 ${className}`}>{children}</p>
);
