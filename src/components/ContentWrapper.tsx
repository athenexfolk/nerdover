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
                className="relative flex h-96 items-center justify-center border-y-4 bg-cover bg-fixed bg-center"
                style={{ backgroundImage: `url('${imageUrl}')` }}
            >
                {/* <div className="absolute inset-0"></div> */}
                <h1 className="relative z-10 w-full border-y-4 bg-white p-8 text-center text-4xl font-black">
                    {title}
                </h1>
            </div>
            <RelatedLesson prev={prevLesson} next={nextLesson} />
            <article className="prose prose-sm sm:prose-base md:prose-lg prose-blockquote:not-italic prose-blockquote:py-2 prose-blockquote:px-4 prose-img:max-w-2xl prose-img:w-full prose-figure:max-w-2xl prose-figure:w-full prose-figure:mx-auto prose-img:mx-auto mx-auto max-w-screen p-4 pb-20 md:p-8">
                {children}
            </article>
        </div>
    );
}
