import { useSidebar } from '@/context/SidebarContext';
import { Anchor } from '@/core/interfaces/anchor';
import { contentMenu } from '@/menus/menu';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Sidebar() {
    const [menu, setMenu] = useState<Anchor[]>([]);
    const { isMenuOpen, closeMenu } = useSidebar();

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('max-md:overflow-hidden');
        } else {
            document.body.classList.remove('max-md:overflow-hidden');
        }
    }, [isMenuOpen]);

    useEffect(() => {
        setMenu(contentMenu);
    }, []);

    return (
        <>
            <div
                onClick={closeMenu}
                className={`${isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'} fixed inset-0 z-20 bg-black/10 transition-all duration-500 md:invisible md:z-18`}
            ></div>
            <aside
                className={`fixed top-0 z-21 h-dvh w-72 shrink-0 grow-0 overflow-y-auto border-stone-200 bg-white max-md:shadow-lg md:top-16 md:z-19 md:h-[calc(100dvh-64px)] md:border-e ${isMenuOpen ? 'visible left-0' : 'invisible -left-72'} p-4 transition-all duration-500`}
            >
                <nav>
                    <ul>
                        {menu.map((node, idx) => (
                            <AnchorNode
                                key={node.fullSlug}
                                node={node}
                                depth={0}
                                isFirst={idx === 0}
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
}: {
    node: Anchor;
    depth: number;
    isFirst?: boolean;
}) {
    if (node.type === 'item') {
        return (
            <li>
                <Link
                    href={`/contents/${node.fullSlug}`}
                    className="block rounded px-4 py-1 text-sm hover:bg-stone-100"
                >
                    {node.title}
                </Link>
            </li>
        );
    }

    const [isOpen, setIsOpen] = useState(() =>
        depth === 0 && isFirst ? true : false,
    );

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
