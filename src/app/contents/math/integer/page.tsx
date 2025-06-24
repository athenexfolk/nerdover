import ContentWrapper from '@/components/ContentWrapper';
import Content from './integer.mdx';

export default async function Page() {
    return (
        <ContentWrapper title="จำนวนเต็ม" imageUrl="/images/integer.webp">
            <Content />
        </ContentWrapper>
    );
}
