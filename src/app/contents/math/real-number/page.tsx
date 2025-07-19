import ContentWrapper from '@/components/ContentWrapper';
import Content from './real-number.mdx';
import { getLessonNavByPathFromRoot } from '@/core/utils/anchor-utils';

export default async function Page() {
    const { prevLesson, nextLesson } = getLessonNavByPathFromRoot(
        'math',
        'real-number',
    );
    return (
        <ContentWrapper
            title="จำนวนจริง"
            imageUrl="/images/real-number.webp"
            prevLesson={prevLesson}
            nextLesson={nextLesson}
        >
            <Content />
        </ContentWrapper>
    );
}
