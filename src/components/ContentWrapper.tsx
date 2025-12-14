import Image from 'next/image';

import type { ContentNav } from '@/core/interfaces/content-nav';

import RelatedLesson from './RelatedLesson';

type ContentWrapperProps = React.PropsWithChildren & {
    title: string;
    prevLesson?: ContentNav;
    nextLesson?: ContentNav;
    imageUrl?: string;
};

export default function ContentWrapper({
    title,
    prevLesson,
    nextLesson,
    children,
    imageUrl,
}: ContentWrapperProps) {
    return (
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
            <article className="prose prose-lesson dark:prose-invert prose-sm sm:prose-base mx-auto w-full max-w-4xl overflow-auto p-4 pb-20 md:px-8 prose-pre:max-w-4xl prose-figure:max-w-4xl dark:prose-img:bg-primary dark:prose-img:rounded-2xl prose-pre:bg-(--shiki-light-bg) dark:prose-pre:bg-(--shiki-dark-bg) prose-pre:border">
                {children}
            </article>
        </div>
    );
}
