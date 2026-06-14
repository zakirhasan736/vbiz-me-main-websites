'use client';

import { AnimatePresence, motion } from 'motion/react';
import { VCardIframeFrame } from '@/components/VCardIframeFrame';

interface PhoneMockupFrameProps {
  src: string;
  title: string;
  /** Static screenshot inside the phone (e.g. industry toggle previews) */
  previewImage?: string;
  /** Homepage / examples hero size */
  size?: 'hero' | 'modal';
  className?: string;
  compactLoader?: boolean;
}

const SIZE_STYLES = {
  hero: {
    shell:
      'w-[320px] h-[640px] rounded-[48px] p-3 border-[4px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.1)]',
    screen: 'rounded-[36px]',
    notch: 'top-3 w-28 h-5 rounded-b-2xl',
    notchBar: 'w-10 h-0.5',
  },
  modal: {
    shell:
      'w-[300px] h-[525px] rounded-[40px] p-2.5 border-[3px] shadow-[0_20px_45px_-15px_rgba(0,0,0,0.9),0_0_20px_rgba(212,175,55,0.05)]',
    screen: 'rounded-[30px]',
    notch: 'top-2.5 w-24 h-4 rounded-b-xl',
    notchBar: 'w-8 h-0.5',
  },
} as const;

export function PhoneMockupFrame({
  src,
  title,
  previewImage,
  size = 'hero',
  className = '',
  compactLoader = false,
}: PhoneMockupFrameProps) {
  const styles = SIZE_STYLES[size];

  return (
    <div
      className={`vcard-phone-mockup bg-neutral-950 border-neutral-800 relative z-10 flex flex-col overflow-hidden ${styles.shell} ${className}`}
      data-lenis-prevent
      data-lenis-prevent-touch
      data-lenis-prevent-wheel
    >
      <div
        className={`absolute left-1/2 -translate-x-1/2 bg-black ${styles.notch} z-20 flex items-center justify-center pointer-events-none select-none`}
        aria-hidden="true"
      >
        <div className={`${styles.notchBar} bg-neutral-800 rounded-full`} />
      </div>

      <div
        className={`vcard-phone-screen w-full flex-1 min-h-0 bg-[#080808] ${styles.screen} overflow-hidden flex flex-col relative`}
        data-lenis-prevent
        data-lenis-prevent-touch
        data-lenis-prevent-wheel
      >
        {previewImage ? (
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.img
              key={previewImage}
              src={previewImage}
              alt={title}
              initial={{ opacity: 0, scale: 1.05, y: 12, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.97, y: -10, filter: 'blur(8px)' }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute inset-0 h-full w-full object-cover object-top will-change-transform"
              draggable={false}
            />
          </AnimatePresence>
        ) : (
          <VCardIframeFrame src={src} title={title} compact={compactLoader} />
        )}
      </div>
    </div>
  );
}
