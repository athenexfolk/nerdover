import type { Category } from '@/core/interfaces/category';

export const comsciCategory: Category = {
    title: 'วิทยาการคอมพิวเตอร์',
    slug: 'comsci',
    subcategories: [
        {
            title: 'ภาษาซี',
            slug: 'c-language',
            lessons: [
                {
                    title: 'พื้นฐานการเขียนโปรแกรมด้วยภาษาซี',
                    slug: 'basic-c-programming',
                },
            ],
        },
    ],
    lessons: [],
};
