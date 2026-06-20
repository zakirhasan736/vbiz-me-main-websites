import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { AppProviders } from '@/components/providers/app-providers';
import './globals.css';

export const viewport: Viewport = {
  // viewport-fit=cover lets Safari populate env(safe-area-inset-*) for notch/Dynamic Island
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  adjustFontFallback: true,
  fallback: ['system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
  variable: '--font-inter',
  preload: true,
});

const HERO_LCP_CRITICAL_CSS = `
.hero-title-lcp,.hero-desc-lcp{margin:0;text-align:left}
.hero-title-lcp{display:flex;flex-direction:column;gap:.08em;font-size:2.25rem;line-height:1.12;font-weight:500;letter-spacing:-.025em;color:var(--color-brand-text,#0b1020);min-height:calc(2 * 1.15em + .08em)}
.hero-title-lcp__accent{color:var(--color-brand-gold,#d4af37);font-weight:inherit;letter-spacing:.01em;display:inline-block;vertical-align:baseline}
.hero-desc-lcp{display:flex;flex-direction:column;gap:.18em;font-size:1rem;line-height:1.625;font-weight:300;color:#a3a3a3;min-height:calc(3 * 1.55em + 2 * .18em)}
.hero-title-lcp__line,.hero-desc-lcp__line{display:block;opacity:1;visibility:visible}
.hero-title-lcp__line{line-height:1.15;min-height:1.15em;clip-path:none;transform:none;animation:none}
.hero-desc-lcp__line{line-height:1.55;min-height:1.55em}
@media(min-width:640px){.hero-title-lcp{font-size:3rem;line-height:1.25;min-height:calc(2 * 1.25em + .08em)}.hero-desc-lcp{font-size:1.125rem;line-height:1.625}}
@media(min-width:1024px){.hero-title-lcp{font-size:52px}.hero-desc-lcp{font-size:1.25rem;line-height:1.625}}
@media(max-width:767px){.hero-title-lcp{letter-spacing:-.02em}.hero-desc-lcp,.hero-desc-lcp__line{line-height:1.5;min-height:1.5em}}
`;

/** Defer desc-line motion until after load so LCP title paints immediately. */
const HERO_LCP_MOTION_BOOT = `(function(){function go(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;document.documentElement.classList.add("hero-lcp-motion")}function schedule(){setTimeout(go,80)}if(document.readyState==="complete"){schedule()}else{window.addEventListener("load",schedule,{once:true})}})();`;

export const metadata: Metadata = {
  title: 'vBiz Me | The Virtual Business Card That Sells For You',
  description:
    'Elevate your professional identity with vBiz Me — the advanced digital business card platform engineered for visionaries.',
  // viewport-fit=cover: enables env(safe-area-inset-*) for iPhone notch / Dynamic Island
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: HERO_LCP_CRITICAL_CSS }} />
        <script dangerouslySetInnerHTML={{ __html: HERO_LCP_MOTION_BOOT }} />
      </head>
      <body className={`${inter.className} theme-light antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('vbizme-theme');if(t==='ocean'||t==='midnight'||t==='light'){document.body.classList.remove('theme-light','theme-midnight','theme-ocean');document.body.classList.add(t==='ocean'?'theme-ocean':t==='light'?'theme-light':'theme-midnight');}}catch(e){}})();`,
          }}
        />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
