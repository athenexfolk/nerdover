'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

import { fonts } from '@/core/constants/fonts';

export type FontKey = keyof typeof fonts;

interface FontContextType {
    font: FontKey;
    setFont: (font: FontKey) => void;
}

const DEFAULT_FONT: FontKey = 'notoSansThai';

const FontContext = createContext<FontContextType | undefined>(undefined);

export const FontProvider = ({ children }: { children: React.ReactNode }) => {
    const [font, setFont] = useState<FontKey>(() => {
        if (typeof window !== 'undefined') {
            const savedFont = localStorage.getItem('selectedFont');
            if (savedFont && fonts[savedFont as FontKey]) {
                return savedFont as FontKey;
            }
        }
        return DEFAULT_FONT;
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('selectedFont', font);
        }
        document.body.className =
            fonts[font]?.className || fonts[DEFAULT_FONT].className;
    }, [font]);

    return (
        <FontContext.Provider value={{ font, setFont }}>
            {children}
        </FontContext.Provider>
    );
};

export const useFont = () => {
    const context = useContext(FontContext);
    if (!context) {
        throw new Error('useFont must be used within a FontProvider');
    }
    return context;
};
