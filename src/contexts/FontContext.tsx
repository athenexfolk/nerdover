import { useEffect } from 'react';

import { fonts } from '@/core/constants/fonts';
import { create } from 'zustand';

export type FontKey = keyof typeof fonts;

interface FontState {
    font: FontKey;
    setFont: (font: FontKey) => void;
}

const DEFAULT_FONT: FontKey = 'notoSansThai';

const getInitialFont = (): FontKey => {
    if (typeof window !== 'undefined') {
        const savedFont = localStorage.getItem('selectedFont');
        if (savedFont && fonts[savedFont as FontKey]) {
            return savedFont as FontKey;
        }
    }
    return DEFAULT_FONT;
};

export const useFontStore = create<FontState>((set) => ({
    font: getInitialFont(),
    setFont: (font: FontKey) => {
        set({ font });
        if (typeof window !== 'undefined') {
            localStorage.setItem('selectedFont', font);
        }
        document.body.className =
            fonts[font]?.className || fonts[DEFAULT_FONT].className;
    },
}));

export const useFont = () => {
    const font = useFontStore((state) => state.font);
    const setFont = useFontStore((state) => state.setFont);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('selectedFont', font);
        }
        document.body.className =
            fonts[font]?.className || fonts[DEFAULT_FONT].className;
    }, [font]);

    return { font, setFont };
};
