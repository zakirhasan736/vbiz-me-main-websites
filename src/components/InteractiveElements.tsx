'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { SiteGlowCard } from '@/components/ui/SiteGlowCard';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  radius?: number;
  onClick?: () => void;
}

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor,
  radius = 40,
  onClick,
}) => (
  <SiteGlowCard
    className={className}
    glowColor={glowColor}
    radius={radius}
    onClick={onClick}
  >
    {children}
  </SiteGlowCard>
);

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  disabled?: boolean;
  id?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  className = '', 
  onClick, 
  href,
  disabled = false,
  id,
}) => {
  const buttonRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const isGold = className.includes('bg-brand-gold');
  const fillBgColor = isGold ? '#FFFFFF' : '#D4AF37';

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isTouchDevice) return;
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const pullX = (e.clientX - rect.left - centerX) * 0.18;
    const pullY = (e.clientY - rect.top - centerY) * 0.22;
    setMagneticPos({ x: pullX, y: pullY });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (isTouchDevice) return;
    setIsHovered(true);
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMagneticPos({ x: 0, y: 0 });
  };

  const handleTouchStart = () => {
    setIsTouchDevice(true);
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
  };

  const buttonClass = `relative overflow-hidden inline-flex items-center justify-center font-semibold rounded-full select-none focus:outline-none transition-shadow duration-300 ${className}`;

  const magneticStyle: React.CSSProperties = {
    transform: `translate3d(${magneticPos.x}px, ${magneticPos.y}px, 0)`,
    transition: 'transform 0.18s cubic-bezier(0.22, 1, 0.36, 1)',
  };

  const renderContent = () => (
    <>
      {!isTouchDevice && (
        <span 
          className="absolute rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] z-0"
          style={{
            left: `${coords.x}px`,
            top: `${coords.y}px`,
            width: isHovered ? '400px' : '0px',
            height: isHovered ? '400px' : '0px',
            backgroundColor: fillBgColor,
            opacity: isHovered ? (isGold ? 0.35 : 1) : 0,
            mixBlendMode: isGold ? 'overlay' : 'normal',
          }}
        />
      )}
      
      {isTouchDevice && isHovered && (
        <span className="absolute inset-0 bg-white/10 z-0 pointer-events-none" />
      )}

      <span className={`relative z-10 flex items-center justify-center gap-2 w-full h-full text-center transition-colors duration-300 ${
        isHovered && !isGold && !isTouchDevice ? 'text-black' : ''
      }`}>
        {children}
      </span>
    </>
  );

  const sharedHandlers = {
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    style: magneticStyle,
    className: buttonClass,
  };

  if (href) {
    return (
      <a 
        id={id}
        ref={buttonRef}
        href={disabled ? undefined : href} 
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            return;
          }
          if (onClick) onClick(e as React.MouseEvent);
        }}
        {...sharedHandlers}
      >
        {renderContent()}
      </a>
    );
  }

  return (
    <button 
      id={id}
      ref={buttonRef}
      type="button"
      disabled={disabled}
      onClick={(e) => {
        if (disabled) return;
        if (onClick) onClick(e as React.MouseEvent);
      }}
      {...sharedHandlers}
    >
      {renderContent()}
    </button>
  );
};

interface MagneticNavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

/** Desktop navbar link — bold type + cursor-following magnetic pull & glow */
export const MagneticNavLink: React.FC<MagneticNavLinkProps> = ({
  href,
  children,
  active = false,
  onClick,
}) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!linkRef.current) return;
    const rect = linkRef.current.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setMagneticPos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.16,
      y: (e.clientY - rect.top - rect.height / 2) * 0.18,
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setMagneticPos({ x: 0, y: 0 });
  };

  return (
    <div
      className="relative"
      style={{
        transform: `translate3d(${magneticPos.x}px, ${magneticPos.y}px, 0)`,
        transition: 'transform 0.18s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <Link
        ref={linkRef}
        href={href}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className={`navbar-nav-link relative block px-2.5 py-2 xl:px-3 xl:py-2 text-[13px] xl:text-[15px] font-bold tracking-wide transition-colors duration-300 rounded-full outline-none whitespace-nowrap overflow-hidden ${
          active
            ? 'text-white navbar-nav-link--active'
            : 'text-neutral-400 hover:text-white'
        }`}
      >
        <span
          className="absolute rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] z-0"
          style={{
            left: coords.x,
            top: coords.y,
            width: hovered ? 260 : 0,
            height: hovered ? 260 : 0,
            background:
              'radial-gradient(circle, rgba(212,175,55,0.22) 0%, rgba(212,175,55,0.06) 45%, transparent 70%)',
          }}
          aria-hidden
        />
        <span className="relative z-10">{children}</span>
        {active && (
          <div className="absolute inset-0 border border-brand-gold/25 bg-brand-gold/8 rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.12)]">
            <div className="absolute -bottom-px inset-x-3 h-px bg-gradient-to-r from-transparent via-[#FFDF65] to-transparent opacity-100 shadow-[0_0_12px_rgba(212,175,55,0.75)]" />
          </div>
        )}
      </Link>
    </div>
  );
};
