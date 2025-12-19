import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Anchor } from '@/core/interfaces/anchor';
import { TocItem } from '@/core/interfaces/toc-item';
import { getLessonNavByFullSlugFromRoot } from '@/core/utils/anchor-utils';
import { contentMenu } from '@/menus/menu';
import { promises as fs } from 'fs';
import GithubSlugger from 'github-slugger';
import remarkMath from 'remark-math';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

import ContentWrapper from '@/components/ContentWrapper';

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

        const mdxString = await fs.readFile(
            `src/contents/${slug.join('/')}.mdx`,
            'utf-8',
        );

        const toc: TocItem[] = [];
        const slugger = new GithubSlugger();

        const tree = unified()
            .use(remarkParse)
            .use(remarkMdx)
            .use(remarkMath)
            .parse(mdxString);

        visit(tree, 'heading', (node) => {
            if (node.depth < 2 || node.depth > 4) return;

            const text = node.children
                .filter((n) => n.type === 'text')
                .map((n) => n.value)
                .join('');

            toc.push({
                depth: node.depth,
                text,
                id: slugger.slug(text),
            });
        });

        return (
            <ContentWrapper
                title={currentLesson?.title || 'Untitled Lesson'}
                imageUrl={`/images/contents/${currentLesson?.slug}/_og_.png`}
                prevLesson={prevLesson}
                nextLesson={nextLesson}
                toc={toc}
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
