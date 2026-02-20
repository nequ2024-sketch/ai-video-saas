import { Cairo } from 'next/font/google';
import './globals.css';
import React from 'react';

const cairo = Cairo({ subsets: ['arabic', 'latin'] });

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>{props.children}</body>
    </html>
  );
}
