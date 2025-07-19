import ContentWrapper from '@/components/ContentWrapper';
import Content from './set.mdx';
import { getLessonNavByPathFromRoot } from '@/core/utils/anchor-utils';

export default async function Page() {
    const { prevLesson, nextLesson } = getLessonNavByPathFromRoot(
        'math',
        'set',
    );
    return (
        <ContentWrapper
            title="เซตเบื้องต้น"
            imageUrl="/images/set.webp"
            prevLesson={prevLesson}
            nextLesson={nextLesson}
        >
            <Content />
        </ContentWrapper>
    );
}
