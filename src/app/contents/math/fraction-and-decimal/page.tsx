import ContentWrapper from '@/components/ContentWrapper';
import Content from './fraction-and-decimal.mdx';

export default async function Page() {
    return (
        <ContentWrapper
            title="เศษส่วนและทศนิยม"
            imageUrl="https://storage.googleapis.com/nerdoverbucket/media/25680602120507_fraction.webp"
            nextLesson={{
                title: 'เศษส่วนและทศนิยม',
                slug: 'math/fraction-and-decimal',
            }}
        >
            <Content />
        </ContentWrapper>
    );
}
