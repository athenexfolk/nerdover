import ContentWrapper from '@/components/ContentWrapper';
import Content from './ratio-proportion-percent.mdx';

export default async function Page() {
    return (
        <ContentWrapper
            title="อัตราส่วน สัดส่วน และร้อยละ"
            imageUrl="/images/percent.webp"
            prevLesson={{
                title: 'เลขยกกำลัง',
                slug: 'math/power-number',
            }}
            nextLesson={{
                title: 'สมการเชิงเส้นตัวแปรเดียว',
                slug: 'math/linear-equation-in-one-variable',
            }}
        >
            <Content />
        </ContentWrapper>
    );
}
