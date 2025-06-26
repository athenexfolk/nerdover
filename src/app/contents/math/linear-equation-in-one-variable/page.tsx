import ContentWrapper from '@/components/ContentWrapper';
import Content from './linear-equation-in-one-variable.mdx';

export default async function Page() {
    return (
        <ContentWrapper
            title="สมการเชิงเส้นตัวแปรเดียว"
            imageUrl="/images/linear-equation-in-one-variable.webp"
            prevLesson={{
                title: 'อัตราส่วน สัดส่วน และร้อยละ',
                slug: 'math/ratio-proportion-percent',
            }}
        >
            <Content />
        </ContentWrapper>
    );
}
