import 'katex/dist/katex.min.css';

import type { Metadata } from 'next';

import { FontProvider } from '@/context/FontContext';

import './globals.css';

export const metadata: Metadata = {
    title: 'เนิร์ดโอเวอร์',
    description: 'อยากจะเรียน เรียนให้เนิร์ด เนิร์ดให้โอเวอร์',
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" data-scroll-behavior="smooth">
            <body>
                <FontProvider>{children}</FontProvider>
            </body>
        </html>
    );
}
