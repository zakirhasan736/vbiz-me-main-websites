import type { Metadata } from 'next';
import { AppProviders } from '@/components/providers/app-providers';
import './globals.css';

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
    <html lang="en">
      <body className="theme-midnight antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
