type AnchorType = 'group' | 'item';

export interface Anchor {
    title: string;
    slug: string;
    type: AnchorType;
    children?: Anchor[];
    coverUrl?: string;
}
