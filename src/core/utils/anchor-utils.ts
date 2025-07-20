import type { Anchor } from '@/core/interfaces/anchor';
import { contentMenu } from '@/menus/menu';
import type { ContentNav } from '../interfaces/content-nav';

export function findAnchorByPath(
    root: Anchor,
    ...path: string[]
): Anchor | undefined {
    let current: Anchor | undefined = root;
    for (const segment of path) {
        if (!current?.children) return undefined;
        current = current.children.find((child) => child.slug === segment);
        if (!current) return undefined;
    }
    return current;
}

export function getLessonNavByPath(
    root: Anchor,
    ...path: string[]
): { prevLesson?: ContentNav; nextLesson?: ContentNav } {
    const target = findAnchorByPath(root, ...path);
    if (!target) return { prevLesson: undefined, nextLesson: undefined };
    // Find the parent group
    let parent: Anchor | undefined = root;
    for (let i = 0; i < path.length - 1; i++) {
        parent = parent.children?.find((child) => child.slug === path[i]);
        if (!parent) break;
    }
    const siblings =
        parent?.children?.filter((child) => child.type === 'item') ?? [];
    const idx = siblings.findIndex((l) => l.slug === path[path.length - 1]);

    const getPrefixedSlug = (lesson: Anchor | undefined) => {
        if (!lesson) return '';
        const parentPath = path.slice(0, -1).join('/');
        return parentPath ? `${parentPath}/${lesson.slug}` : lesson.slug;
    };

    return {
        prevLesson:
            idx > 0
                ? {
                      slug: getPrefixedSlug(siblings[idx - 1]),
                      title: siblings[idx - 1].title,
                  }
                : undefined,
        nextLesson:
            idx < siblings.length - 1
                ? {
                      slug: getPrefixedSlug(siblings[idx + 1]),
                      title: siblings[idx + 1].title,
                  }
                : undefined,
    };
}

export function getLessonNavByPathFromRoot(...path: string[]) {
    return getLessonNavByPath(
        { slug: '', title: '', type: 'group', children: contentMenu },
        ...path,
    );
}
