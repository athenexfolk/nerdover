'use client';

import { contentMenu } from '@/menus/menu';
import Link from 'next/link';
import React from 'react';

export default function ContentLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const openMenu = () => setIsMenuOpen(true);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            {isMenuOpen && (
                <div
                    onClick={closeMenu}
                    className={`fixed top-0 left-0 z-29 h-dvh w-full lg:hidden`}
                ></div>
            )}
            <aside
                className={`fixed top-0 z-30 flex h-dvh w-72 flex-col gap-8 overflow-auto border-stone-300 bg-white p-4 transition-all duration-500 lg:border-e ${isMenuOpen ? 'left-0 max-lg:shadow-2xl' : '-left-72'}`}
            >
                <span className="text-2xl font-bold">เนิร์ดโอเวอร์</span>
                <nav>
                    {contentMenu.map((category) => (
                        <div key={category.slug}>
                            <div className="sticky -top-4 -mx-4 bg-white px-4 py-2 text-sm">
                                <p className="font-medium">{category.title}</p>
                            </div>
                            <ul className="flex flex-col text-sm">
                                {category.lessons?.map((item) => (
                                    <li
                                        key={item.slug}
                                        className="flex flex-col"
                                    >
                                        <Link
                                            href={`/contents/${category.slug}/${item.slug}`}
                                            className="rounded px-4 py-2 font-medium hover:bg-stone-800 hover:text-white"
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </aside>
            {/* Close button positioned outside the scrollable sidebar */}
            <button
                onClick={closeMenu}
                className={`fixed top-1/2 z-30 flex h-12 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-300 transition-all duration-500 max-lg:hidden ${isMenuOpen ? 'visible left-68 opacity-100' : 'invisible -left-4 opacity-0'}`}
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
                className="fixed bottom-4 left-4 z-20 flex size-10 items-center justify-center rounded-full bg-white shadow"
            >
                <MenuIcon />
            </button>
        </>
    );
}

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
