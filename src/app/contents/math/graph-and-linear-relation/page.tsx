import ContentWrapper from '@/components/ContentWrapper';
import Content from './graph-and-linear-relation.mdx';

export default async function Page() {
    return (
        <ContentWrapper
            title="กราฟและความสัมพันธ์เชิงเส้น"
            imageUrl="/images/graph-and-linear-relation.webp"
            prevLesson={{
                title: 'สมการเชิงเส้นตัวแปรเดียว',
                slug: 'math/linear-equation-in-one-variable',
            }}
        >
            <Content />
        </ContentWrapper>
    );
}
