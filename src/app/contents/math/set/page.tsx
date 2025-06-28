import ContentWrapper from '@/components/ContentWrapper';
import Content from './set.mdx';

export default async function Page() {
    return (
        <ContentWrapper title="เซตเบื้องต้น" imageUrl="/images/set.webp">
            <Content />
        </ContentWrapper>
    );
}
