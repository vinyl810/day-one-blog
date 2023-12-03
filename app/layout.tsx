import './global.css';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Inter, Libre_Barcode_128_Text as LibreBarcode } from 'next/font/google';
import React from 'react';
import FloatingHeader from '@/components/FloatingHeader';
import Link from 'next/link';
import layoutStyle from './layout.module.css';

const inter = Inter({ subsets: ['latin'] });
const libreBarcode = LibreBarcode({ subsets: ['latin'], weight: ['400'] });

export const metadata: Metadata = {
  title: 'day one at work',
  description: 'Mr. dayone kim\'s first day at work',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {' '}
        <FloatingHeader />
        <header className={layoutStyle.header}>
          <Link
            href="/"
            className={`${libreBarcode.className} ${layoutStyle['header-logo']}`}
          >
            DAY ONE AT WORK
          </Link>
          <Image src="/github-mark.png" alt="github-logo" height="25" width="25" />
        </header>
        {children}
      </body>
    </html>
  );
}
