'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useSidebar } from '@/context/SidebarContext';
import { Anchor } from '@/core/interfaces/anchor';
import { contentMenu } from '@/menus/menu';

import SearchBox from './SearchBox';

const MAIN_MENU = [
    { title: 'หน้าหลัก', href: '/', icon: <HomeIcon /> },
    // { title: 'แอปพลิเคชัน', href: '/apps', icon: <AppsIcon /> },
];

export default function Sidebar() {
    const [menu] = useState<Anchor[]>(contentMenu);
    const { isMenuOpen, closeMenu } = useSidebar();

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('max-md:overflow-hidden');
        } else {
            document.body.classList.remove('max-md:overflow-hidden');
        }
    }, [isMenuOpen]);

    const handleCloseMenuOnSmallDevice = () => {
        if (window.innerWidth < 768) {
            closeMenu();
        }
    };

    return (
        <>
            <div
                onClick={closeMenu}
                className={`${isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'} fixed inset-0 z-20 bg-black/10 transition-all duration-500 md:invisible md:z-18`}
            ></div>
            <aside
                className={`fixed top-0 z-21 flex h-dvh w-72 shrink-0 grow-0 flex-col gap-4 overflow-y-auto border-stone-200 bg-white max-md:shadow-lg md:top-16 md:z-19 md:h-[calc(100dvh-64px)] md:border-e ${isMenuOpen ? 'visible left-0' : 'invisible -left-72'} p-4 transition-all duration-500`}
            >
                <SearchBox
                    anchors={contentMenu}
                    mini
                    className="md:hidden"
                    onLinkClick={handleCloseMenuOnSmallDevice}
                />
                <nav className="flex flex-col gap-4">
                    <ul>
                        {MAIN_MENU.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="flex items-center gap-2 rounded px-4 py-2 font-semibold hover:bg-purple-50"
                                >
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ul>
                        {menu.map((node, idx) => (
                            <AnchorNode
                                key={node.fullSlug}
                                node={node}
                                depth={0}
                                isFirst={idx === 0}
                                onLinkClick={handleCloseMenuOnSmallDevice}
                            />
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
}

function AnchorNode({
    node,
    depth,
    isFirst,
    onLinkClick,
}: {
    node: Anchor;
    depth: number;
    isFirst?: boolean;
    onLinkClick?: () => void;
}) {
    const [isOpen, setIsOpen] = useState(() =>
        depth === 0 && isFirst ? true : false,
    );
    if (node.type === 'item') {
        return (
            <li>
                <Link
                    href={`/contents/${node.fullSlug}`}
                    className="block rounded px-4 py-1 text-sm hover:bg-stone-100"
                    onClick={onLinkClick}
                >
                    {node.title}
                </Link>
            </li>
        );
    }

    // group
    return (
        <li>
            <div className="flex items-center justify-between py-1">
                <p className={depth === 0 ? 'font-semibold' : ''}>
                    {node.title}
                </p>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center rounded hover:bg-stone-50"
                >
                    <DownChevronIcon
                        className={`${isOpen ? 'rotate-180' : ''}`}
                    />
                </button>
            </div>
            {node.children && node.children.length > 0 && isOpen && (
                <ul>
                    {node.children.map((child) => (
                        <AnchorNode
                            key={child.fullSlug}
                            node={child}
                            depth={depth + 1}
                            onLinkClick={onLinkClick}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}

const DownChevronIcon = ({ className }: { className?: string }) => (
    <svg
        className={`size-6 ${className}`}
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
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="m8 10 4 4 4-4"
        />
    </svg>
);

/* Menu Icons */

function HomeIcon() {
    return (
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
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
            />
        </svg>
    );
}

function AppsIcon() {
    return (
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
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z"
            />
        </svg>
    );
}
