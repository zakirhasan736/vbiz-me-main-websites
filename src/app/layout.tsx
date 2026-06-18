import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppProviders } from '@/components/providers/app-providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

export const metadata: Metadata = {
  title: 'vBiz Me | The Virtual Business Card That Sells For You',
  description:
    'Elevate your professional identity with vBiz Me — the advanced digital business card platform engineered for visionaries.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} theme-light antialiased`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
