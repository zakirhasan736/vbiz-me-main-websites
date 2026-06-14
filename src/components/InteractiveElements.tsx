'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
}

export const GlowCard: React.FC<GlowCardProps> = ({ 
  children, 
  className = '', 
  glowColor = 'rgba(212,175,55,0.18)',
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMouseCoords({ x, y });
  };
  
  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative overflow-hidden transition-all duration-500 border border-white/5 bg-[#080808]/85 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Radial Hover Glow Overlay */}
      <div
        className="absolute pointer-events-none transition-opacity duration-500 ease-out z-0"
        style={{
          width: '380px',
          height: '380px',
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          left: `${mouseCoords.x - 190}px`,
          top: `${mouseCoords.y - 190}px`,
          opacity: isHovered ? 1 : 0,
          mixBlendMode: 'screen',
        }}
      />
      {/* Inner Content Wrapper */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

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

  // Auto-detect attributes for beautiful themed liquid pills
  const isGold = className.includes('bg-brand-gold');
  const fillBgColor = isGold ? '#FFFFFF' : '#D4AF37';

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isTouchDevice) return;
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    // Premium Magnetic pull: shift gently towards the cursor
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

  // Build root class safely
  const buttonClass = `relative overflow-hidden inline-flex items-center justify-center font-semibold rounded-full select-none focus:outline-none transition-shadow duration-300 ${className}`;

  const renderContent = () => (
    <>
      {/* Liquid Ripple Fill, expanding from entry point */}
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
      
      {/* Mobile Touch Overlay */}
      {isTouchDevice && isHovered && (
        <span className="absolute inset-0 bg-white/10 z-0 pointer-events-none" />
      )}

      {/* Button Content with proper relative layer index */}
      <span className={`relative z-10 flex items-center justify-center gap-2 w-full h-full text-center transition-colors duration-300 ${
        isHovered && !isGold && !isTouchDevice ? 'text-black' : ''
      }`}>
        {children}
      </span>
    </>
  );

  const motionProps = {
    ref: buttonRef as any,
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    animate: { x: magneticPos.x, y: magneticPos.y },
    transition: { type: "spring", stiffness: 150, damping: 14, mass: 0.1 },
    className: buttonClass,
    disabled
  };

  if (href) {
    return (
      <motion.a 
        id={id}
        href={disabled ? undefined : href} 
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            return;
          }
          if (onClick) onClick(e as any);
        }}
        {...(motionProps as any)}
      >
        {renderContent()}
      </motion.a>
    );
  }

  return (
    <motion.button 
      id={id}
      type="button"
      onClick={(e) => {
        if (disabled) return;
        if (onClick) onClick(e as any);
      }}
      {...(motionProps as any)}
    >
      {renderContent()}
    </motion.button>
  );
};
