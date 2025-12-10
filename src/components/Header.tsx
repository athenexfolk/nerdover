'use client';

import { useEffect, useRef, useState } from 'react';

import { useSidebar } from '@/context/SidebarContext';
import { contentMenu } from '@/menus/menu';

import Brand from './Brand';
import FontSelector from './FontSelector';
import SearchBox from './SearchBox';

export default function Header() {
    const { toggleMenu } = useSidebar();
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
            className={`fixed top-0 left-0 z-18 flex h-16 w-full items-center justify-between gap-6 border-b border-stone-200 bg-white px-4 py-1 transition-transform duration-300 md:z-20 ${hidden ? '-translate-y-16' : 'translate-y-0'}`}
        >
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleMenu}
                    className="flex size-10 items-center rounded p-2"
                >
                    <MenuIcon />
                </button>
                <Brand />
            </div>
            <div className="flex items-center gap-4">
                <FontSelector />
                <SearchBox
                    anchors={contentMenu}
                    mini
                    className="max-md:hidden md:max-w-md lg:max-w-lg"
                />
            </div>
        </header>
    );
}

const MenuIcon = () => (
    <svg
        className="size-6"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
    >
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            d="M5 7h14M5 12h14M5 17h14"
        />
    </svg>
);
