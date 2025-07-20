'use client';

import type { Anchor } from '@/core/interfaces/anchor';
import { contentMenu } from '@/menus/menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function ContentLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const openMenu = () => setIsMenuOpen(true);
    const closeMenu = () => setIsMenuOpen(false);

    // Helper to close menu only on small devices
    const closeMenuOnSmallDevice = () => {
        if (window.innerWidth < 1024) {
            closeMenu();
        }
    };

    return (
        <>
            {isMenuOpen && (
                <div
                    onClick={closeMenu}
                    className={`fixed top-0 left-0 z-29 h-dvh w-full lg:hidden`}
                ></div>
            )}
            <aside
                className={`fixed top-0 z-30 flex h-dvh w-72 flex-col gap-8 overflow-auto border-stone-300 bg-stone-50 p-4 transition-all duration-500 lg:border-r ${isMenuOpen ? 'left-0 max-lg:shadow-2xl' : '-left-72'}`}
            >
                <div className="flex items-center gap-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="24"
                        viewBox="0 0 240 240"
                        className="size-8"
                    >
                        <path d="M87.78 88.28q63.42.52 63.44 63.44M19.5 220V59 M219.5 20v161" />
                        <circle cx="59.5" cy="60" r="40" />
                        <circle cx="179.5" cy="180" r="40" />
                    </svg>
                    <p className="text-2xl font-bold">เนิร์ดโอเวอร์</p>
                </div>
                <nav className="-mx-2 text-sm">
                    <MenuWrapper
                        closeMenuOnSmallDevice={closeMenuOnSmallDevice}
                    >
                        {contentMenu.map((anchor) => (
                            <MenuItem
                                key={anchor.slug}
                                anchor={anchor}
                                prefix=""
                                closeMenuOnSmallDevice={closeMenuOnSmallDevice}
                            />
                        ))}
                    </MenuWrapper>
                </nav>
            </aside>
            <button
                onClick={closeMenu}
                className={`fixed top-1/2 z-30 flex h-12 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-stone-300 bg-stone-50 text-stone-300 transition-all duration-500 max-lg:hidden ${isMenuOpen ? 'visible left-68 opacity-100' : 'invisible -left-4 opacity-0'}`}
            >
                <LeftChevronIcon />
            </button>
            <main
                className={`${isMenuOpen ? 'pl-72' : 'pl-0'} transition-all duration-500 max-lg:pl-0`}
            >
                {children}
            </main>
            <button
                onClick={openMenu}
                className="fixed bottom-4 left-4 z-20 flex size-10 items-center justify-center rounded-full bg-stone-50 shadow"
            >
                <MenuIcon />
            </button>
        </>
    );
}

type MenuItemElement = React.ReactElement<typeof MenuItem>;

type MenuWrapperProps = {
    children?: MenuItemElement | MenuItemElement[];
    closeMenuOnSmallDevice: () => void;
};

const MenuWrapper = ({ children }: MenuWrapperProps) => (
    <ul className="flex flex-col">{children}</ul>
);

const MenuItem = ({
    anchor,
    prefix,
    closeMenuOnSmallDevice,
}: {
    anchor: Anchor;
    prefix?: string;
    closeMenuOnSmallDevice: () => void;
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const pathname = usePathname();
    const currentPrefix = prefix ? `${prefix}/${anchor.slug}` : anchor.slug;
    const isActive = () => pathname === `/contents/${currentPrefix}`;

    return (
        <li key={anchor.slug} className="flex flex-col px-1">
            {anchor.type === 'group' ? (
                <>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="group flex items-center justify-between gap-4 rounded px-2 py-1 hover:bg-stone-100"
                    >
                        <span className="flex items-center gap-2">
                            <div className="size-2 rounded-xs bg-stone-300 group-hover:bg-green-400"></div>
                            {anchor.title}
                        </span>
                        <DownChevronIcon />
                    </button>
                    {isOpen &&
                        anchor.children &&
                        anchor.children.length > 0 && (
                            <MenuWrapper
                                closeMenuOnSmallDevice={closeMenuOnSmallDevice}
                            >
                                {anchor.children.map((child) => (
                                    <MenuItem
                                        key={child.slug}
                                        anchor={child}
                                        prefix={currentPrefix}
                                        closeMenuOnSmallDevice={
                                            closeMenuOnSmallDevice
                                        }
                                    />
                                ))}
                            </MenuWrapper>
                        )}
                </>
            ) : (
                <Link
                    href={`/contents/${currentPrefix}`}
                    onClick={closeMenuOnSmallDevice}
                    className={`${isActive() ? 'font-semibold text-purple-700' : ''} group flex items-center gap-2 rounded px-2 py-1 hover:bg-stone-100`}
                >
                    <div
                        className={`size-2 rounded-full ${isActive() ? 'bg-purple-700' : 'bg-stone-300 group-hover:bg-purple-400'}`}
                    ></div>
                    {anchor.title}
                </Link>
            )}
        </li>
    );
};

const LeftChevronIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
        />
    </svg>
);

const DownChevronIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-4"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
        />
    </svg>
);

const MenuIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
    </svg>
);
