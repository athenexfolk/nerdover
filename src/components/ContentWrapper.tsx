type ContentWrapperProps = React.PropsWithChildren & {
    title: string;
};

export default function ContentWrapper({
    title,
    children,
}: ContentWrapperProps) {
    return (
        <div className="mx-auto flex max-w-screen-md flex-col gap-4 p-4">
            <h1 className="py-20 text-center text-4xl font-black">{title}</h1>
            <article className="prose prose-sm md:prose-base prose-stone prose-blockquote:not-italic prose-blockquote:bg-stone-100 prose-blockquote:py-2 prose-blockquote:px-4 prose-img:max-w-lg prose-img:w-full prose-figure:max-w-lg prose-figure:w-full prose-figure:mx-auto prose-img:mx-auto mx-auto max-w-screen-lg pb-20">
                {children}
            </article>
        </div>
    );
}
