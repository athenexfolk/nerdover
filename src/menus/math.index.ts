import type { Category } from '@/core/interfaces/category';

export const mathCategory: Category = {
    title: 'คณิตศาสตร์',
    slug: 'math',
    lessons: [
        {
            title: 'จำนวนเต็ม',
            slug: 'integer',
        },
        {
            title: 'เศษส่วนและทศนิยม',
            slug: 'fraction-and-decimal',
        },
        {
            title: 'เลขยกกำลัง',
            slug: 'power-number',
        },
        {
            title: 'อัตราส่วน สัดส่วน และร้อยละ',
            slug: 'ratio-proportion-percent',
        },
    ],
};
