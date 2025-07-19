import ContentWrapper from '@/components/ContentWrapper';
import Content from './integer.mdx';
import { getLessonNavByPathFromRoot } from '@/core/utils/anchor-utils';

export default async function Page() {
    const { prevLesson, nextLesson } = getLessonNavByPathFromRoot(
        'math',
        'integer',
    );
    return (
        <ContentWrapper
            title="จำนวนเต็ม"
            imageUrl="/images/integer.webp"
            prevLesson={prevLesson}
            nextLesson={nextLesson}
        >
            <Content />
        </ContentWrapper>
    );
}
