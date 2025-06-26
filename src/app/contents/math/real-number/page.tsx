import ContentWrapper from '@/components/ContentWrapper';
import Content from './real-number.mdx';

export default async function Page() {
    return (
        <ContentWrapper
            title="จำนวนจริง"
            imageUrl="/images/real-number.webp"
            prevLesson={{
                title: 'กราฟและความสัมพันธ์เชิงเส้น',
                slug: 'math/graph-and-linear-relation',
            }}
        >
            <Content />
        </ContentWrapper>
    );
}
