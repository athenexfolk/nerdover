import ContentWrapper from '@/components/ContentWrapper';
import Content from './basic-c-programming.mdx';

export default async function Page() {
    return (
        <ContentWrapper title="พื้นฐานการเขียนโปรแกรมภาษาซี" imageUrl="/images/basic-c-programming.webp">
            <Content />
        </ContentWrapper>
    );
}
