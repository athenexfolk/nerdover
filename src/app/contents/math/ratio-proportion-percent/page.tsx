import ContentWrapper from '@/components/ContentWrapper';
import Content from './ratio-proportion-percent.mdx';
import { getLessonNavByPathFromRoot } from '@/core/utils/anchor-utils';

export default async function Page() {
    const { prevLesson, nextLesson } = getLessonNavByPathFromRoot(
        'math',
        'ratio-proportion-percent',
    );
    return (
        <ContentWrapper
            title="อัตราส่วน สัดส่วน และร้อยละ"
            imageUrl="/images/ratio-proportion-percent.webp"
            prevLesson={prevLesson}
            nextLesson={nextLesson}
        >
            <Content />
        </ContentWrapper>
    );
}
