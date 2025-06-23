import ContentWrapper from '@/components/ContentWrapper';
import Content from './integer.mdx';

export default async function Page() {
    return (
        <ContentWrapper
            title="จำนวนเต็ม"
            coverUrl="https://storage.googleapis.com/nerdoverbucket/media/25680601165606_20250202094959_integer.webp"
            coverAlt="Integer"
        >
            <Content />
        </ContentWrapper>
    );
}
