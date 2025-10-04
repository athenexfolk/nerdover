import { useSidebar } from '@/context/SidebarContext';
import StaticLogo from './StaticLogo';
import { useEffect, useRef, useState } from 'react';

export default function Header() {
    const { toggleMenu } = useSidebar();
    const [hidden, setHidden] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth >= 768) return;
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
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 z-18 flex h-16 w-full items-center justify-between gap-6 border-b border-stone-200 bg-white px-4 py-1 transition-transform duration-300 md:z-20 ${hidden ? '-translate-y-16' : 'translate-y-0'}`}
        >
            <button
                onClick={toggleMenu}
                className="flex size-10 items-center rounded border border-stone-200 p-2"
            >
                <MenuIcon />
            </button>
            <div className="flex items-center gap-2">
                <StaticLogo />
                <p className="text-xl font-bold">เนิร์ดโอเวอร์</p>
            </div>
            <div className="size-10"></div>
            {/* <SearchBar /> */}
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

const SearchBar = () => {
    return (
        <div className="flex h-10 w-72 items-center rounded-full bg-stone-100 p-2"></div>
    );
};
