import ContentWrapper from '@/components/ContentWrapper';
import Content from './fraction-and-decimal.mdx';

export default async function Page() {
    return (
        <ContentWrapper
            title="เศษส่วนและทศนิยม"
            imageUrl="/images/fraction-and-decimal.webp"
            prevLesson={{
                title: 'จำนวนเต็ม',
                slug: 'math/integer',
            }}
            nextLesson={{
                title: 'เลขยกกำลัง',
                slug: 'math/power-number',
            }}
        >
            <Content />
        </ContentWrapper>
    );
}
