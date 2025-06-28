import ContentWrapper from '@/components/ContentWrapper';
import Content from './integer.mdx';

export default async function Page() {
    return (
        <ContentWrapper
            title="จำนวนเต็ม"
            imageUrl="/images/integer.webp"
            nextLesson={{
                slug: 'math/fraction-and-decimal',
                title: 'เศษส่วนและทศนิยม',
            }}
        >
            <Content />
        </ContentWrapper>
    );
}
