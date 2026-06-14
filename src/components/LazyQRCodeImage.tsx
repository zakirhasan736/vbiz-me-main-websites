'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LazyQRCodeImageProps {
  src: string;
  alt: string;
  className?: string;
  bgcolor?: string;
  onLoaded?: () => void;
}

export const LazyQRCodeImage = ({
  src,
  alt,
  className = "",
  bgcolor = "ffffff",
  onLoaded
}: LazyQRCodeImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  // Small local intersection observer to defer network requesting until the card enters proximity
  useEffect(() => {
    let observer: IntersectionObserver;
    const element = document.getElementById(`lazy-qr-${encodeURIComponent(src).slice(-20)}`);
    
    if (element) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        },
        { rootMargin: "100px" } // trigger load slightly before it comes into view for zero latency
      );
      observer.observe(element);
    } else {
      setShouldLoad(true);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [src]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoaded) {
      onLoaded();
    }
  };

  return (
    <div 
      id={`lazy-qr-${encodeURIComponent(src).slice(-20)}`}
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
    >
      {/* Premium Shimmer Skeleton Loader */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100"
            style={{ backgroundColor: bgcolor.startsWith('#') ? bgcolor : `#${bgcolor}` }}
          >
            {/* Soft pulsing glow animation */}
            <motion.div
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [0.95, 1, 0.95]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5, 
                ease: "easeInOut" 
              }}
              className="w-16 h-16 rounded-2xl bg-neutral-200 border border-neutral-300 flex items-center justify-center shadow-inner"
            >
              <div className="w-8 h-8 rounded-lg bg-neutral-300 opacity-60" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actual QR Image, loaded on demand and transitioned after cached */}
      {shouldLoad && (
        <img
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          className={`${className} transition-all duration-700 ease-out ${
            isLoaded 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-95"
          }`}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
};
