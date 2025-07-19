import type { Anchor } from '@/core/interfaces/anchor';
import Link from 'next/link';

type RelatedLessonProps = {
    prev?: Partial<Anchor>;
    next?: Partial<Anchor>;
};

export default function RelatedLesson({ prev, next }: RelatedLessonProps) {
    return (
        <div className="flex flex-wrap justify-between gap-4 px-8 py-4 max-sm:flex-col">
            <div>
                {prev && (
                    <Link
                        href={`/contents/${prev.slug}`}
                        className="flex justify-center items-center gap-2 rounded border border-stone-200 bg-stone-50 px-4 py-2 font-medium hover:bg-stone-100"
                    >
                        <LeftArrowIcon />
                        {prev.title}
                    </Link>
                )}
            </div>

            <div>
                {next && (
                    <Link
                        href={`/contents/${next.slug}`}
                        className="flex justify-center items-center gap-2 rounded border border-stone-200 bg-stone-50 px-4 py-2 font-medium hover:bg-stone-100"
                    >
                        {next.title}
                        <RightArrowIcon />
                    </Link>
                )}
            </div>
        </div>
    );
}

const LeftArrowIcon = () => (
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
            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
        />
    </svg>
);

const RightArrowIcon = () => (
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
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
        />
    </svg>
);
