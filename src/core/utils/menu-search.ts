import type { Anchor } from '@/core/interfaces/anchor';

export function searchAnchors(
    anchors: Anchor[],
    query: string,
    path: Anchor[] = [],
): { anchor: Anchor; path: Anchor[] }[] {
    const results: { anchor: Anchor; path: Anchor[] }[] = [];
    const q = query.trim().toLowerCase();
    for (const anchor of anchors) {
        const match =
            (anchor.title.toLowerCase().includes(q) ||
                anchor.slug.toLowerCase().includes(q)) &&
            anchor.type === 'item';
        if (match) {
            results.push({ anchor, path: [...path, anchor] });
        }
        if (anchor.children) {
            results.push(
                ...searchAnchors(anchor.children, query, [...path, anchor]),
            );
        }
    }
    return results;
}
