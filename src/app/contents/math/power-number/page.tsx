import ContentWrapper from '@/components/ContentWrapper';
import Content from './power-number.mdx';
import { getLessonNavByPathFromRoot } from '@/core/utils/anchor-utils';

export default async function Page() {
    const { prevLesson, nextLesson } = getLessonNavByPathFromRoot(
        'math',
        'power-number',
    );
    return (
        <ContentWrapper
            title="เลขยกกำลัง"
            imageUrl="/images/power-number.webp"
            prevLesson={prevLesson}
            nextLesson={nextLesson}
        >
            <Content />
        </ContentWrapper>
    );
}
