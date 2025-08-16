'use client';

import Link from 'next/link';
import React, { useState } from 'react';

import { searchAnchors } from '@/core/utils/menu-search';

import type { Anchor } from '@/core/interfaces/anchor';

interface SearchBoxProps {
    anchors: Anchor[];
}

export default function SearchBox({ anchors }: SearchBoxProps) {
    const [query, setQuery] = useState('');
    const results = query.trim() ? searchAnchors(anchors, query) : [];

    return (
        <div className="relative w-full max-w-xl">
            <div className="w-full rounded-xl border border-stone-300 px-6 py-3">
                <input
                    type="text"
                    placeholder="ค้นหาบทเรียน"
                    className="w-full bg-transparent outline-none"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            {query.trim() && (
                <div className="scrollbar-v gutter-stable absolute top-[calc(100%+4px)] left-0 z-30 max-h-72 w-full max-w-xl overflow-y-auto rounded-xl border border-stone-300 bg-white p-4 shadow-xl">
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
