import type { Metadata } from 'next';
import './globals.css';
import 'katex/dist/katex.min.css';

export const metadata: Metadata = {
    title: 'เนิร์ดโอเวอร์',
    description: 'อยากจะเรียน เรียนให้เนิร์ด เนิร์ดให้โอเวอร์',
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" data-scroll-behavior="smooth">
            <body>{children}</body>
        </html>
    );
}
