import ContentWrapper from '@/components/ContentWrapper';
import Content from './pythagorean-theorem.mdx';

export default async function Page() {
    return (
        <ContentWrapper
            title="ทฤษฎีบทพีทาโกรัส"
            imageUrl="/images/pythagorean-theorem.webp"
        >
            <Content />
        </ContentWrapper>
    );
}
