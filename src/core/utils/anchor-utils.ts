import type { Anchor } from '@/core/interfaces/anchor';
import { contentMenu } from '@/menus/menu';
import type { ContentNav } from '../interfaces/content-nav';

export function findAnchorByFullSlug(
    root: Anchor,
    fullSlug: string,
): Anchor | undefined {
    if (root.fullSlug === fullSlug) return root;
    if (!root.children) return undefined;
    for (const child of root.children) {
        const found = findAnchorByFullSlug(child, fullSlug);
        if (found) return found;
    }
    return undefined;
}

export function getLessonNavByFullSlug(
    root: Anchor,
    fullSlug: string,
): {
    prevLesson?: ContentNav;
    nextLesson?: ContentNav;
    currentLesson?: ContentNav;
} {
    const target = findAnchorByFullSlug(root, fullSlug);
    if (!target)
        return {
            prevLesson: undefined,
            nextLesson: undefined,
            currentLesson: undefined,
        };
    // Find parent by removing last segment from fullSlug
    const parentFullSlug = fullSlug.split('/').slice(0, -1).join('/');
    const parent = parentFullSlug
        ? findAnchorByFullSlug(root, parentFullSlug)
        : root;
    const siblings =
        parent?.children?.filter((child) => child.type === 'item') ?? [];
    const idx = siblings.findIndex((l) => l.fullSlug === fullSlug);

    return {
        prevLesson:
            idx > 0
                ? {
                      slug: siblings[idx - 1].fullSlug,
                      title: siblings[idx - 1].title,
                  }
                : undefined,
        nextLesson:
            idx < siblings.length - 1
                ? {
                      slug: siblings[idx + 1].fullSlug,
                      title: siblings[idx + 1].title,
                  }
                : undefined,
        currentLesson: target
            ? { slug: target.fullSlug, title: target.title }
            : undefined,
    };
}

export function getLessonNavByFullSlugFromRoot(fullSlug: string) {
    return getLessonNavByFullSlug(
        {
            slug: '',
            title: '',
            type: 'group',
            fullSlug: '',
            children: contentMenu,
        },
        fullSlug,
    );
}
