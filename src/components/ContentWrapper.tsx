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
                            className="object-cover"
                            priority
                        />
                    )}
                    {/* <div
                        className="pointer-events-none absolute inset-0 z-10"
                        aria-hidden="true"
                    >
                        <div className="absolute bottom-0 left-0 h-1/2 w-full bg-linear-to-t from-black/70 to-transparent" />
                    </div> */}
                    {/* <div className="absolute bottom-0 left-0 z-11 w-full p-4 md:p-6 lg:p-8">
                        <h1 className="text-left text-2xl font-black text-white drop-shadow sm:text-3xl lg:text-5xl">
                            {title}
                        </h1>
                    </div> */}
                </div>
            </div>
            {(prevLesson || nextLesson) && (
                <RelatedLesson prev={prevLesson} next={nextLesson} />
            )}
            <article className="prose prose-lesson prose-sm prose-stone sm:prose-base mx-auto w-full max-w-4xl overflow-auto p-4 pb-20 md:px-8 prose-pre:max-w-4xl prose-figure:max-w-4xl">
                {children}
            </article>
        </div>
    );
}
