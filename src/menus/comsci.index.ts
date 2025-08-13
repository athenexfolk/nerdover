import type { Anchor } from '@/core/interfaces/anchor';

export const comsciAnchor: Anchor = {
    title: 'วิทยาการคอมพิวเตอร์',
    slug: 'comsci',
    type: 'group',
    children: [
        {
            title: 'ภาษาซี',
            slug: 'c-language',
            type: 'group',
            children: [
                {
                    title: 'พื้นฐานการเขียนโปรแกรมด้วยภาษาซี',
                    slug: 'basic-c-programming',
                    type: 'item',
                },
            ],
        },
    ],
};
