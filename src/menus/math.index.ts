import type { Anchor } from '@/core/interfaces/anchor';

export const mathAnchor: Anchor = {
    title: 'คณิตศาสตร์',
    slug: 'math',
    fullSlug: 'math',
    type: 'group',
    children: [
        {
            title: 'จำนวนเต็ม',
            slug: 'integer',
            fullSlug: 'math/integer',
            type: 'item',
        },
        {
            title: 'เศษส่วนและทศนิยม',
            slug: 'fraction-and-decimal',
            fullSlug: 'math/fraction-and-decimal',
            type: 'item',
        },
        {
            title: 'เลขยกกำลัง',
            slug: 'power-number',
            fullSlug: 'math/power-number',
            type: 'item',
        },
        {
            title: 'อัตราส่วน สัดส่วน และร้อยละ',
            slug: 'ratio-proportion-percent',
            fullSlug: 'math/ratio-proportion-percent',
            type: 'item',
        },
        {
            title: 'จำนวนจริง',
            slug: 'real-number',
            fullSlug: 'math/real-number',
            type: 'item',
        },
        {
            title: 'กราฟและความสัมพันธ์เชิงเส้น',
            slug: 'graph-and-linear-relation',
            fullSlug: 'math/graph-and-linear-relation',
            type: 'item',
        },
        {
            title: 'สมการเชิงเส้นตัวแปรเดียว',
            slug: 'linear-equation-in-one-variable',
            fullSlug: 'math/linear-equation-in-one-variable',
            type: 'item',
        },
        {
            title: 'ทฤษฎีบทพีทาโกรัส',
            slug: 'pythagorean-theorem',
            fullSlug: 'math/pythagorean-theorem',
            type: 'item',
        },
        {
            title: 'เซตเบื้องต้น',
            slug: 'set',
            fullSlug: 'math/set',
            type: 'item',
        },
        {
            title: 'ตรรกศาสตร์เบื้องต้น',
            slug: 'logic',
            fullSlug: 'math/logic',
            type: 'item',
        },
    ],
};
