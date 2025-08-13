import type { Anchor } from '@/core/interfaces/anchor';

export const mathAnchor: Anchor = {
    title: 'คณิตศาสตร์',
    slug: 'math',
    type: 'group',
    children: [
        {
            title: 'จำนวนเต็ม',
            slug: 'integer',
            type: 'item',
        },
        {
            title: 'เศษส่วนและทศนิยม',
            slug: 'fraction-and-decimal',
            type: 'item',
        },
        {
            title: 'เลขยกกำลัง',
            slug: 'power-number',
            type: 'item',
        },
        {
            title: 'อัตราส่วน สัดส่วน และร้อยละ',
            slug: 'ratio-proportion-percent',
            type: 'item',
        },
        {
            title: 'จำนวนจริง',
            slug: 'real-number',
            type: 'item',
        },
        {
            title: 'กราฟและความสัมพันธ์เชิงเส้น',
            slug: 'graph-and-linear-relation',
            type: 'item',
        },
        {
            title: 'สมการเชิงเส้นตัวแปรเดียว',
            slug: 'linear-equation-in-one-variable',
            type: 'item',
        },
        {
            title: 'ทฤษฎีบทพีทาโกรัส',
            slug: 'pythagorean-theorem',
            type: 'item',
        },
        {
            title: 'เซตเบื้องต้น',
            slug: 'set',
            type: 'item',
        },
        {
            title: 'ตรรกศาสตร์เบื้องต้น',
            slug: 'logic',
            type: 'item',
        },
    ],
};
