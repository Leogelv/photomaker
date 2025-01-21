import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { cn } from '@/lib/utils';
import './globals.css';

const sfDisplay = localFont({
  src: [
    {
      path: '../fonts/SF-UI-Display-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/SF-UI-Display-Semibold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/SF-UI-Display-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/SF-Compact-Display-Regular.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-sf',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AI Фотограф - Профессиональные фото с помощью ИИ',
  description: 'Создавай профессиональные фотографии с помощью искусственного интеллекта',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased tracking-tighter',
          sfDisplay.variable
        )}
      >
        <main className="relative flex min-h-screen flex-col">
          <div className="flex-1">{children}</div>
        </main>
      </body>
    </html>
  );
} 