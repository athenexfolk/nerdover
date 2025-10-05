'use client';

import Link from 'next/link';
import React, { useState } from 'react';

import { searchAnchors } from '@/core/utils/menu-search';

import type { Anchor } from '@/core/interfaces/anchor';

interface SearchBoxProps {
    anchors: Anchor[];
    mini?: boolean;
    className?: string;
}

export default function SearchBox({
    anchors,
    mini,
    className,
}: SearchBoxProps) {
    const [query, setQuery] = useState('');
    const results = query.trim() ? searchAnchors(anchors, query) : [];

    return (
        <div className={`relative w-full max-w-xl ${className}`}>
            <div
                className={`flex w-full items-center gap-2 border border-stone-200 ${mini ? 'rounded-lg px-4 py-2' : 'rounded-xl px-6 py-3'}`}
            >
                <SearchIcon className="text-stone-400" />
                <input
                    type="text"
                    placeholder="ค้นหาบทเรียน"
                    className="w-full bg-transparent outline-none placeholder:text-stone-400"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            {query.trim() && (
                <div
                    className={`scrollbar-v gutter-stable absolute top-[calc(100%+4px)] left-0 z-30 max-h-72 w-full max-w-xl overflow-y-auto ${mini ? 'rounded-lg' : 'rounded-xl'} border border-stone-200 bg-white p-4 shadow-xl`}
                >
                    {results.length === 0 ? (
                        <div className="text-center text-stone-400">
                            ไม่พบผลลัพธ์
                        </div>
                    ) : (
                        <ul>
                            {results.map(({ anchor, path }, i) => (
                                <li
                                    key={i}
                                    className="border-b border-stone-300 py-1 last:border-b-0"
                                >
                                    <Link href={`/contents/${anchor.fullSlug}`}>
                                        <span className="text-xs text-stone-500">
                                            {path
                                                .map((p) => p.title)
                                                .join(' / ')}
                                        </span>
                                        <div className="font-bold">
                                            {anchor.title}
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

const SearchIcon = ({ className }: { className?: string }) => (
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
            strokeWidth="1.5"
            d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
        />
    </svg>
);
