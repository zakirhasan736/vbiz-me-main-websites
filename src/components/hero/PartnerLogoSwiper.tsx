'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import 'swiper/css';
import { isWebKitBrowser } from '@/lib/lenis-config';
import {
  PARTNER_LOGOS,
  PARTNER_LOGO_MOBILE_HEIGHT,
  PARTNER_LOGO_MOBILE_WIDTH,
  PARTNER_SWIPER_DESKTOP_VISIBLE_COUNT,
  PARTNER_SWIPER_MOBILE_VISIBLE_COUNT,
  PARTNER_SAFARI_ARROW_GROUP_DESKTOP,
  PARTNER_SAFARI_ARROW_GROUP_MOBILE,
} from '@/lib/partner-logos';

/** Slide transition duration — lower = faster continuous scroll. */
const AUTOPLAY_SPEED_MS = 5200;
const AUTOPLAY_DELAY_MS = 1;
const ARROW_SPEED_MS = 450;
const LOOP_BUFFER_SLIDES = PARTNER_LOGOS.length;

function getSafariArrowStep(): number {
  if (typeof window === 'undefined') return PARTNER_SAFARI_ARROW_GROUP_MOBILE;
  return window.matchMedia('(min-width: 768px)').matches
    ? PARTNER_SAFARI_ARROW_GROUP_DESKTOP
    : PARTNER_SAFARI_ARROW_GROUP_MOBILE;
}

function isPartnerLaneInView(root: HTMLElement): boolean {
  const rect = root.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.92 && rect.bottom > window.innerHeight * 0.08;
}

/** Swiper continuous marquee — seamless loop; Safari gets arrow nav. */
export function PartnerLogoSwiper() {
  const rootRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    setIsSafari(isWebKitBrowser());
  }, []);

  const syncAutoplay = useCallback((swiper: SwiperInstance) => {
    const root = rootRef.current;
    const autoplay = swiper.autoplay;
    if (!autoplay || isSafari) return;

    if (!root || isPartnerLaneInView(root)) autoplay.start();
    else autoplay.stop();
  }, [isSafari]);

  const handleSwiperInit = useCallback(
    (swiper: SwiperInstance) => {
      swiperRef.current = swiper;
      const wrapper = swiper.wrapperEl;
      if (wrapper) {
        wrapper.style.transitionTimingFunction = 'linear';
      }
      syncAutoplay(swiper);
    },
    [syncAutoplay],
  );

  const slideByArrow = useCallback(
    (direction: 'prev' | 'next') => {
      const swiper = swiperRef.current;
      if (!swiper) return;

      if (isSafari) {
        const step = getSafariArrowStep();
        const delta = direction === 'next' ? step : -step;
        swiper.slideToLoop(swiper.realIndex + delta, ARROW_SPEED_MS);
        return;
      }

      if (direction === 'next') swiper.slideNext(ARROW_SPEED_MS);
      else swiper.slidePrev(ARROW_SPEED_MS);
    },
    [isSafari],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root || isSafari) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const autoplay = swiperRef.current?.autoplay;
        if (!autoplay) return;
        if (entry.isIntersecting) autoplay.start();
        else autoplay.stop();
      },
      { threshold: 0.08 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [isSafari]);

  return (
    <div
      ref={rootRef}
      className={`partner-logo-swiper partner-logo-slider-shell${isSafari ? ' partner-logo-swiper--webkit' : ''}`}
      role="region"
      aria-label="Trusted partner company logos"
    >
      <button
        type="button"
        className="partner-logo-swiper__nav partner-logo-swiper__nav--prev"
        aria-label="Show previous partner logos"
        onClick={() => slideByArrow('prev')}
      >
        <ChevronLeft size={18} strokeWidth={2.25} aria-hidden />
      </button>

      <Swiper
        key={isSafari ? 'safari' : 'default'}
        className="partner-logo-swiper__swiper"
        modules={[Autoplay]}
        onSwiper={handleSwiperInit}
        slidesPerView={PARTNER_SWIPER_MOBILE_VISIBLE_COUNT}
        slidesPerGroup={1}
        spaceBetween={14}
        loop
        loopAdditionalSlides={LOOP_BUFFER_SLIDES}
        speed={AUTOPLAY_SPEED_MS}
        autoplay={
          isSafari
            ? false
            : {
                delay: AUTOPLAY_DELAY_MS,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                waitForTransition: false,
              }
        }
        grabCursor
        breakpoints={{
          768: {
            slidesPerView: PARTNER_SWIPER_DESKTOP_VISIBLE_COUNT,
            slidesPerGroup: 1,
            spaceBetween: 20,
          },
        }}
      >
        {PARTNER_LOGOS.map((logo) => (
          <SwiperSlide key={logo.src} className="partner-logo-swiper__slide">
            <article className="partner-logo-card">
              <div className="partner-logo-card__well">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  width={PARTNER_LOGO_MOBILE_WIDTH}
                  height={PARTNER_LOGO_MOBILE_HEIGHT}
                  className="partner-logo-card__logo"
                  decoding="async"
                  draggable={false}
                />
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        className="partner-logo-swiper__nav partner-logo-swiper__nav--next"
        aria-label="Show next partner logos"
        onClick={() => slideByArrow('next')}
      >
        <ChevronRight size={18} strokeWidth={2.25} aria-hidden />
      </button>
    </div>
  );
}
