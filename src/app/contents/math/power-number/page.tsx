import ContentWrapper from '@/components/ContentWrapper';
import Content from './power-number.mdx';

export default async function Page() {
    return (
        <ContentWrapper
            title="เลขยกกำลัง"
            imageUrl="/images/power-number.webp"
            prevLesson={{
                title: 'เศษส่วนและทศนิยม',
                slug: 'math/fraction-and-decimal',
            }}
        >
            <Content />
        </ContentWrapper>
    );
}
