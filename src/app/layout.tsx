import type { Metadata } from 'next';
import { Noto_Sans_Thai } from 'next/font/google';
import './globals.css';
import 'katex/dist/katex.min.css';

const notoSansThai = Noto_Sans_Thai({
    variable: '--font-noto-sans-thai',
    subsets: ['thai'],
});

export const metadata: Metadata = {
    title: 'เนิร์ดโอเวอร์',
    description: 'อยากจะเรียน เรียนให้เนิร์ด เนิร์ดให้โอเวอร์',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${notoSansThai.variable} bg-stone-50 text-stone-700`}
            >
                {children}
            </body>
        </html>
    );
}
