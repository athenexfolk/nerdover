'use client';

import { useEffect, useRef, useState } from 'react';

import FontSelector from '@/components/FontSelector';
import { ThemeSelector } from '@/components/ThemeSelector';
import { SidebarTrigger } from '@/components/ui/sidebar';

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
            className={`sticky top-0 z-10 p-4 transition-all duration-300 bg-background/80 backdrop-blur flex justify-between items-center h-18 ${hidden ? '-translate-y-18' : ''}`}
        >
            <SidebarTrigger />
            <div className="flex items-center gap-2">
                <FontSelector />
                <ThemeSelector />
            </div>
        </header>
    );
}
