'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PORTFOLIO_QR_IMAGE } from '@/lib/site-assets';
import { perfDebug } from '@/lib/performance-debug';

interface LazyQRCodeImageProps {
  src: string;
  alt: string;
  className?: string;
  bgcolor?: string;
  width?: number;
  height?: number;
  onLoaded?: () => void;
}

export const LazyQRCodeImage = ({
  src,
  alt,
  className = '',
  bgcolor = 'ffffff',
  width = PORTFOLIO_QR_IMAGE.width,
  height = PORTFOLIO_QR_IMAGE.height,
  onLoaded,
}: LazyQRCodeImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // #region agent log
          perfDebug({
            hypothesisId: 'H2',
            runId: 'post-fix',
            location: 'LazyQRCodeImage:intersection',
            message: 'QR image load triggered by intersection',
            data: { src: src.split('/').pop(), rootMargin: '100px' },
          });
          // #endregion
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [src]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    onLoaded?.();
  };

  return (
    <div
      ref={rootRef}
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
    >
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100"
            style={{ backgroundColor: bgcolor.startsWith('#') ? bgcolor : `#${bgcolor}` }}
          >
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [0.95, 1, 0.95],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: 'easeInOut',
              }}
              className="w-16 h-16 rounded-2xl bg-neutral-200 border border-neutral-300 flex items-center justify-center shadow-inner"
            >
              <div className="w-8 h-8 rounded-lg bg-neutral-300 opacity-60" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {shouldLoad && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={handleImageLoad}
          className={`${className} transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
};
