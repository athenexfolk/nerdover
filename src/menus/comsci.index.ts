import type { Category } from '@/core/interfaces/category';

export const comsciCategory: Category = {
    title: 'วิทยาการคอมพิวเตอร์',
    slug: 'comsci',
    lessons: [
        {
            title: 'ภาษาซี',
            slug: 'c-language',
        },
        {
            title: 'การเขียนโปรแกรมเชิงวัตถุ',
            slug: 'object-oriented-programming',
        },
    ],
};
