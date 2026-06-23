'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { postYouTubeCommand } from '@/lib/youtube-iframe-api';
import { isWebKitBrowser } from '@/lib/scroll-config';

export function useYouTubeIframeControls(
  embedReady: boolean,
  autoplayInUrl: boolean,
) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const primedRef = useRef(false);

  useEffect(() => {
    if (!embedReady) {
      primedRef.current = false;
      setIsPlaying(false);
      setIsMuted(true);
    }
  }, [embedReady]);

  const primePlayer = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe || primedRef.current) return;
    primedRef.current = true;

    postYouTubeCommand(iframe, 'mute');
    setIsMuted(true);

    if (isWebKitBrowser() || !autoplayInUrl) {
      postYouTubeCommand(iframe, 'pauseVideo');
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
  }, [autoplayInUrl]);

  const onIframeLoad = useCallback(() => {
    primePlayer();
  }, [primePlayer]);

  const play = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    postYouTubeCommand(iframe, 'playVideo');
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    postYouTubeCommand(iframe, 'pauseVideo');
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, pause, play]);

  const toggleMute = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    if (isMuted) {
      postYouTubeCommand(iframe, 'unMute');
      setIsMuted(false);
    } else {
      postYouTubeCommand(iframe, 'mute');
      setIsMuted(true);
    }
  }, [isMuted]);

  return {
    iframeRef,
    isPlaying,
    isMuted,
    togglePlay,
    toggleMute,
    onIframeLoad,
  };
}
