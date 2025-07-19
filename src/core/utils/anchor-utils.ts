import type { Anchor } from '@/core/interfaces/anchor';
import { contentMenu } from '@/menus/menu';

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

export function getLessonNavByPath(root: Anchor, ...path: string[]) {
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
    return {
        prevLesson: idx > 0 ? siblings[idx - 1] : undefined,
        nextLesson: idx < siblings.length - 1 ? siblings[idx + 1] : undefined,
        currentLesson: target,
    };
}

export function getLessonNavByPathFromRoot(...path: string[]) {
    return getLessonNavByPath(
        { slug: '', title: '', type: 'group', children: contentMenu },
        ...path,
    );
}
