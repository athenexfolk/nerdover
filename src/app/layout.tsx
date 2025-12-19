import type { Metadata } from 'next';

import { ThemeProvider } from '@/components/theme-provider';

import InitializeFont from './InitializeFont';
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
        <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
                <InitializeFont />
            </body>
        </html>
    );
}
