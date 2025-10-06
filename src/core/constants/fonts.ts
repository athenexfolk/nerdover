import { Kanit, Noto_Sans_Thai, Sarabun } from 'next/font/google';

const notoSansThai = Noto_Sans_Thai({
    subsets: ['latin', 'thai'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const sarabun = Sarabun({
    subsets: ['latin', 'thai'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

const kanit = Kanit({
    subsets: ['latin', 'thai'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const fonts: Record<string, { name: string; className: string }> = {
    system: { name: 'แบบอักษรระบบ', className: 'system-font' },
    notoSansThai: { name: 'Noto Sans Thai', className: notoSansThai.className },
    sarabun: { name: 'Sarabun', className: sarabun.className },
    kanit: { name: 'Kanit', className: kanit.className },
};
