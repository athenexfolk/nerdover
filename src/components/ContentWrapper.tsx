import type { Anchor } from '@/core/interfaces/anchor';
import RelatedLesson from './RelatedLesson';
import Image from 'next/image';

type ContentWrapperProps = React.PropsWithChildren & {
    title: string;
    prevLesson?: Partial<Anchor>;
    nextLesson?: Partial<Anchor>;
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
            <div className="p-4 md:p-6 lg:p-8">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                    {imageUrl && (
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            className="object-cover"
                            priority
                        />
                    )}
                    <div
                        className="pointer-events-none absolute inset-0 z-10"
                        aria-hidden="true"
                    >
                        <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-black/70 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 z-20 w-full p-4 md:p-6 lg:p-8">
                        <h1 className="text-left text-2xl font-black text-white drop-shadow sm:text-3xl lg:text-5xl">
                            {title}
                        </h1>
                    </div>
                </div>
            </div>
            {(prevLesson || nextLesson) && (
                <RelatedLesson prev={prevLesson} next={nextLesson} />
            )}
            <article className="prose prose-sm prose-stone sm:prose-base md:prose-lg prose-blockquote:not-italic prose-blockquote:py-2 prose-blockquote:bg-stone-100 prose-blockquote:px-4 prose-img:w-full prose-figure:max-w-2xl prose-figure:w-full prose-figure:mx-auto prose-img:mx-auto prose-pre:border prose-pre:border-stone-300 mx-auto w-full max-w-4xl p-4 pb-20 md:px-8">
                {children}
            </article>
        </div>
    );
}
