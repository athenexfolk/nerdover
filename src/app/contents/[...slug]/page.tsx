import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ContentWrapper from '@/components/ContentWrapper';
import { Anchor } from '@/core/interfaces/anchor';
import { getLessonNavByFullSlugFromRoot } from '@/core/utils/anchor-utils';
import { contentMenu } from '@/menus/menu';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const { currentLesson } = getLessonNavByFullSlugFromRoot(slug.join('/'));
    return {
        title: `${currentLesson?.title || 'บทเรียนไม่มีชื่อ'} - เนิร์ดโอเวอร์`,
        openGraph: {
            images: `/images/contents/${currentLesson?.slug}/_og_.png`,
        },
    };
}

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
            <ContentWrapper
                title={currentLesson?.title || 'Untitled Lesson'}
                imageUrl={`/images/contents/${currentLesson?.slug}/_og_.png`}
                prevLesson={prevLesson}
                nextLesson={nextLesson}
            >
                <Content />
            </ContentWrapper>
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
