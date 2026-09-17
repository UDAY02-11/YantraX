import './globals.css';
import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { Providers } from '@/components/providers/Providers';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://makerhub.example.com'),
  title: {
    default: 'MakerHub — Robotics, Electronics & STEM Store',
    template: '%s | MakerHub',
  },
  description:
    'Shop robotics kits, development boards, sensors, IoT modules, 3D printers and STEM supplies. Build something amazing with MakerHub.',
  keywords: [
    'robotics',
    'arduino',
    'raspberry pi',
    'electronics',
    'IoT',
    'STEM',
    '3D printing',
    'sensors',
    'development boards',
  ],
  openGraph: {
    title: 'MakerHub — Robotics, Electronics & STEM Store',
    description:
      'Shop robotics kits, development boards, sensors, IoT modules, 3D printers and STEM supplies. Build something amazing with MakerHub.',
    type: 'website',
    url: '/',
    siteName: 'MakerHub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MakerHub — Robotics, Electronics & STEM Store',
    description:
      'Shop robotics kits, development boards, sensors, IoT modules, 3D printers and STEM supplies.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
