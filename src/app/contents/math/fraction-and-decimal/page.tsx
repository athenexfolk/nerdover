import ContentWrapper from '@/components/ContentWrapper';
import Content from './fraction-and-decimal.mdx';
import { getLessonNavByPathFromRoot } from '@/core/utils/anchor-utils';

export default async function Page() {
    const { prevLesson, nextLesson } = getLessonNavByPathFromRoot(
        'math',
        'fraction-and-decimal',
    );
    return (
        <ContentWrapper
            title="เศษส่วนและทศนิยม"
            imageUrl="/images/fraction-and-decimal.webp"
            prevLesson={prevLesson}
            nextLesson={nextLesson}
        >
            <Content />
        </ContentWrapper>
    );
}
