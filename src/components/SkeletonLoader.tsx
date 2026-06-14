'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

interface SkeletonProps {
  pathname: string;
}

export const SkeletonLoader: React.FC<SkeletonProps> = ({ pathname }) => {
  const textLine = (widthClass: string = 'w-full', heightClass: string = 'h-4') => (
    <div className={`bg-neutral-800/60 rounded-full ${heightClass} ${widthClass} animate-pulse`} />
  );

  const heading = (widthClass: string = 'w-1/2') => (
    <div className={`bg-neutral-700/60 rounded-lg h-8 ${widthClass} animate-pulse mb-6`} />
  );

  const cardSkeleton = () => (
    <div className="bg-neutral-900/40 border border-white/5 rounded-[2rem] p-6 flex flex-col justify-between h-full animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-neutral-800" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-neutral-800 rounded w-1/3" />
          <div className="h-3 bg-neutral-800/60 rounded w-1/4" />
        </div>
      </div>
      <div className="space-y-2 mt-6">
        <div className="h-3 bg-neutral-800/80 rounded w-5/6" />
        <div className="h-3 bg-neutral-800/60 rounded w-2/3" />
      </div>
      <div className="h-10 bg-neutral-800/40 rounded-full w-full mt-6" />
    </div>
  );

  if (pathname === '/') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 font-sans text-left min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-neutral-900/60 px-4 py-2 rounded-full border border-white/5">
              <div className="w-2 h-2 rounded-full bg-brand-gold/65 animate-ping" />
              <div className="h-3 bg-neutral-800 rounded w-28" />
            </div>
            {heading('w-3/4')}
            {heading('w-1/2')}
            <div className="space-y-3 pt-2">
              {textLine('w-11/12')}
              {textLine('w-10/12')}
              {textLine('w-8/12')}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="h-[420px] bg-neutral-900/50 border border-white/5 rounded-[2rem] animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 min-h-screen">
      {heading('w-1/3')}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {cardSkeleton()}
        {cardSkeleton()}
        {cardSkeleton()}
      </div>
    </div>
  );
};
