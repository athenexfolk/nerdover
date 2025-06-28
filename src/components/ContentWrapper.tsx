import type { Anchor } from '@/core/interfaces/anchor';
import RelatedLesson from './RelatedLesson';

type ContentWrapperProps = React.PropsWithChildren & {
    title: string;
    prevLesson?: Anchor;
    nextLesson?: Anchor;
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
        <div className="mx-auto flex flex-col gap-4">
            <div
                className="relative flex aspect-video items-center justify-center bg-cover saturate-5"
                style={{ backgroundImage: `url('${imageUrl}')` }}
            >
                <h1 className="relative z-10 w-full p-4 text-center text-3xl font-black text-white drop-shadow lg:p-8 lg:text-5xl">
                    {title}
                </h1>
            </div>
            {(prevLesson || nextLesson) && (
                <RelatedLesson prev={prevLesson} next={nextLesson} />
            )}
            <article className="prose prose-sm prose-stone sm:prose-base md:prose-lg prose-blockquote:not-italic prose-blockquote:py-2 prose-blockquote:px-4 prose-img:max-w-lg prose-img:w-full prose-figure:max-w-2xl prose-figure:w-full prose-figure:mx-auto prose-img:mx-auto prose-pre:border prose-pre:border-stone-300 mx-auto max-w-4xl p-4 pb-20 md:px-8">
                {children}
            </article>
        </div>
    );
}
