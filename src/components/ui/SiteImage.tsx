'use client';

import Image, { type ImageProps } from 'next/image';

type SiteImageProps = Omit<ImageProps, 'alt'> & {
  alt: string;
};

/** Optimized local/remote image with sensible lazy defaults. */
export function SiteImage({ priority, loading, ...props }: SiteImageProps) {
  return (
    <Image
      {...props}
      priority={priority}
      loading={priority ? undefined : loading ?? 'lazy'}
      decoding="async"
    />
  );
}
