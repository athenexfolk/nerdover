import type { ContentNav } from '@/core/interfaces/content-nav';
import Link from 'next/link';

type RelatedLessonProps = {
    prev?: ContentNav;
    next?: ContentNav;
};

export default function RelatedLesson({ prev, next }: RelatedLessonProps) {
    return (
        <div className="flex flex-wrap justify-between gap-4 px-4 max-sm:flex-col">
            <div>
                {prev && (
                    <Link
                        href={`/contents/${prev.slug}`}
                        className="flex items-center justify-center gap-2 rounded border-[1.5px] bg-white px-4 py-2"
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
                        className="flex items-center justify-center gap-2 rounded border-[1.5px] bg-white px-4 py-2"
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
