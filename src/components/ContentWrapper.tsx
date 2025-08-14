import RelatedLesson from './RelatedLesson';
import Image from 'next/image';
import type { ContentNav } from '@/core/interfaces/content-nav';

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
            <article className="prose prose-lesson prose-sm prose-stone sm:prose-base mx-auto w-full max-w-4xl overflow-auto p-4 pb-20 md:px-8">
                {children}
            </article>
        </div>
    );
}
