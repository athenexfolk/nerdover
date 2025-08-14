import AnimatedWrapper from '@/components/AnimatedWrapper';
import ContentWrapper from '@/components/ContentWrapper';
import { Anchor } from '@/core/interfaces/anchor';
import { getLessonNavByFullSlugFromRoot } from '@/core/utils/anchor-utils';
import { contentMenu } from '@/menus/menu';
import { notFound } from 'next/navigation';

export default async function ContentPage({
    params,
}: {
    params: Promise<{ slug: string[] }>;
}) {
    const { slug } = await params;
    const { prevLesson, nextLesson, currentLesson } =
        getLessonNavByFullSlugFromRoot(slug.join('/'));

    try {
        const { default: Content } = await import(
            `@/contents/${slug.join('/')}.mdx`
        );
        return (
            <AnimatedWrapper animationKey={slug.join('/')}>
                <ContentWrapper
                    title={currentLesson?.title || 'Untitled Lesson'}
                    imageUrl={`/images/contents/${currentLesson?.slug}/_cover_.webp`}
                    prevLesson={prevLesson}
                    nextLesson={nextLesson}
                >
                    <Content />
                </ContentWrapper>
            </AnimatedWrapper>
        );
    } catch (error) {
        console.log(error);
        return notFound();
    }
}

function collectSlugs(menu: Anchor[], parent: string[] = []): string[][] {
    let slugs: string[][] = [];
    for (const item of menu) {
        const current = [...parent, item.slug];
        if (item.children && item.children.length > 0) {
            slugs = slugs.concat(collectSlugs(item.children, current));
        } else {
            slugs.push(current);
        }
    }
    return slugs;
}

export function generateStaticParams() {
    const slugs = collectSlugs(contentMenu);
    return slugs.map((slugArr: string[]) => ({ slug: slugArr }));
}

export const dynamicParams = false;
