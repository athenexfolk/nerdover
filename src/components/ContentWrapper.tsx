import Image from 'next/image';

type ContentWrapperProps = React.PropsWithChildren & {
    title: string;
    coverUrl?: string;
    coverAlt?: string;
};

export default function ContentWrapper({
    title,
    coverAlt,
    coverUrl,
    children,
}: ContentWrapperProps) {
    return (
        <div className="mx-auto flex max-w-screen-lg flex-col gap-4">
            <div className="relative h-64 w-full overflow-hidden rounded-xl md:h-96">
                {coverUrl && (
                    <Image
                        width={1200}
                        height={900}
                        src={coverUrl}
                        alt={coverAlt || title}
                        className="absolute inset-0 w-full object-cover object-center brightness-50"
                        priority
                    />
                )}
                <h1 className="absolute bottom-4 left-4 text-4xl font-black text-white drop-shadow">
                    {title}
                </h1>
            </div>
            <article className="prose prose-sm md:prose-base prose-stone prose-blockquote:not-italic prose-blockquote:bg-stone-100 prose-blockquote:py-2 prose-blockquote:px-4 prose-img:max-w-lg prose-img:w-full prose-figure:max-w-lg prose-figure:w-full prose-figure:mx-auto prose-img:mx-auto mx-auto max-w-screen-lg pb-20">
                {children}
            </article>
        </div>
    );
}
