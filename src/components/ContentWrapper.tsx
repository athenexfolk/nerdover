'use client';

import Image from 'next/image';
import Link from 'next/link';

import type { ContentNav } from '@/core/interfaces/content-nav';
import { TocItem } from '@/core/interfaces/toc-item';

import { useScrollSpy } from '@/hooks/useScrollSpy';

import RelatedLesson from './RelatedLesson';

type ContentWrapperProps = React.PropsWithChildren & {
    title: string;
    prevLesson?: ContentNav;
    nextLesson?: ContentNav;
    imageUrl?: string;
    toc?: TocItem[];
};

export default function ContentWrapper({
    title,
    prevLesson,
    nextLesson,
    children,
    imageUrl,
    toc,
}: ContentWrapperProps) {
    const ids =
        toc?.filter((item) => item.depth > 1).map((item) => item.id) ?? [];
    const activeId = useScrollSpy(ids, 80);
    return (
        <div className="flex gap-2">
            <div className="mx-auto flex flex-col gap-2">
                <div className="p-4">
                    <div className="relative mx-auto aspect-40/21 w-full max-w-4xl">
                        {imageUrl && (
                            <Image
                                src={imageUrl}
                                alt={title}
                                width={1200}
                                height={630}
                                className="object-cover dark:invert"
                                priority
                            />
                        )}
                    </div>
                </div>
                {(prevLesson || nextLesson) && (
                    <RelatedLesson prev={prevLesson} next={nextLesson} />
                )}
                <article className="prose prose-lesson dark:prose-invert prose-sm sm:prose-base prose-pre:max-w-4xl prose-figure:max-w-4xl dark:prose-img:bg-primary dark:prose-img:rounded-2xl prose-pre:bg-(--shiki-light-bg) dark:prose-pre:bg-(--shiki-dark-bg) prose-pre:border mx-auto w-full max-w-4xl overflow-auto p-4 pb-20 md:px-8">
                    {children}
                </article>
            </div>
            <div className="sticky top-18 h-[calc(100dvh-72px)] w-72 overflow-y-auto p-4">
                <h2 className="mb-4 font-bold">สารบัญ</h2>
                <ul className="flex flex-col gap-1 text-sm">
                    {toc
                        ?.filter((item) => item.depth > 1)
                        .map((item) => (
                            <li
                                key={item.id}
                                style={{
                                    marginLeft: `${16 * (item.depth - 2)}px`,
                                }}
                                className={
                                    activeId === item.id
                                        ? 'font-semibold text-purple-600 dark:text-purple-400'
                                        : ''
                                }
                            >
                                <Link href={`#${item.id}`}>{item.text}</Link>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}
