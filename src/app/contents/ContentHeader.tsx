'use client';

import { useEffect, useRef, useState } from 'react';

import { SidebarTrigger } from '@/components/ui/sidebar';

import FontSelector from '@/components/FontSelector';
import { ThemeSelector } from '@/components/ThemeSelector';

export default function ContentHeader() {
    const [hidden, setHidden] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth >= 768) {
                if (hidden) {
                    setHidden(false);
                }
                return;
            }
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY.current && currentScrollY > 40) {
                setHidden(true);
            } else if (currentScrollY < lastScrollY.current) {
                setHidden(false);
            }
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hidden]);

    return (
        <header
            className={`bg-background/80 sticky top-0 z-10 flex h-18 items-center justify-between p-4 backdrop-blur transition-all duration-300 ${hidden ? '-translate-y-18' : ''}`}
        >
            <SidebarTrigger />
            <div className="flex items-center gap-2">
                <FontSelector />
                <ThemeSelector />
            </div>
        </header>
    );
}
