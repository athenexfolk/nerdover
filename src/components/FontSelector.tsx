'use client';

import { useState } from 'react';

import { useFont } from '@/context/FontContext';
import { fonts } from '@/core/constants/fonts';

export default function FontSelector({ className }: { className?: string }) {
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const { font, setFont } = useFont();

    return (
        <div className={`group relative ${className ?? ''}`}>
            <button
                onClick={() => setIsPanelOpen(!isPanelOpen)}
                className="flex items-center rounded-lg border border-stone-200 p-2 text-stone-400"
            >
                <FontFamilyIcon />
            </button>
            {isPanelOpen && (
                <div className="absolute top-[calc(100%+4px)] right-0 z-16 w-40 rounded-lg border border-stone-200 bg-white px-2 py-2 text-sm shadow-lg">
                    <form>
                        <div className="flex flex-col gap-1">
                            {Object.entries(fonts).map(([key, fontObj]) => (
                                <label
                                    key={key}
                                    className="group flex cursor-pointer items-center gap-2 rounded px-2 py-1 hover:bg-stone-100 has-checked:bg-purple-100"
                                >
                                    <input
                                        type="radio"
                                        name="font"
                                        value={key}
                                        checked={font === key}
                                        onChange={() =>
                                            setFont(key as keyof typeof fonts)
                                        }
                                        className="accent-purple-600"
                                    />
                                    <span>{fontObj.name}</span>
                                </label>
                            ))}
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

const FontFamilyIcon = () => (
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
            d="m10.5785 19 4.2979-10.92966c.0369-.09379.1674-.09379.2042 0L19.3785 19m-8.8 0H9.47851m1.09999 0h1.65m7.15 0h-1.65m1.65 0h1.1m-7.7-3.9846h4.4M3 16l1.56685-3.9846m0 0 2.73102-6.94506c.03688-.09379.16738-.09379.20426 0l2.50367 6.94506H4.56685Z"
        />
    </svg>
);
