export type YouTubeEmbedOptions = {
  autoplay?: boolean;
  mute?: boolean;
  controls?: boolean;
  loop?: boolean;
  modestbranding?: boolean;
  playsinline?: boolean;
  /** Hide fullscreen button — recommended for background embeds. */
  fs?: boolean;
};

export function getYouTubeThumbnailUrl(videoId: string, quality: 'hq' | 'mq' | 'max' = 'hq') {
  const file =
    quality === 'max' ? 'maxresdefault.jpg' : quality === 'mq' ? 'mqdefault.jpg' : 'hqdefault.jpg';
  return `https://i.ytimg.com/vi/${videoId}/${file}`;
}

export function buildYouTubeEmbedSrc(
  videoId: string,
  options: YouTubeEmbedOptions = {},
) {
  const {
    autoplay = false,
    mute = false,
    controls = true,
    loop = false,
    modestbranding = true,
    playsinline = true,
    fs = true,
  } = options;

  const origin =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://www.vbizme.com';

  const params = new URLSearchParams({
    rel: '0',
    playsinline: playsinline ? '1' : '0',
    cc_load_policy: '0',
    enablejsapi: '1',
    modestbranding: modestbranding ? '1' : '0',
    iv_load_policy: '3',
    origin,
    controls: controls ? '1' : '0',
    fs: fs ? '1' : '0',
    disablekb: '1',
  });

  if (mute) {
    params.set('mute', '1');
  }

  if (autoplay) {
    params.set('autoplay', '1');
  }

  if (loop) {
    params.set('loop', '1');
    params.set('playlist', videoId);
  }

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}
