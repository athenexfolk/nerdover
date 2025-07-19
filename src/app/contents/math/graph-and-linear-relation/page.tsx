import ContentWrapper from '@/components/ContentWrapper';
import Content from './graph-and-linear-relation.mdx';
import { getLessonNavByPathFromRoot } from '@/core/utils/anchor-utils';

export default async function Page() {
    const { prevLesson, nextLesson } = getLessonNavByPathFromRoot(
        'math',
        'graph-and-linear-relation',
    );
    return (
        <ContentWrapper
            title="กราฟและความสัมพันธ์เชิงเส้น"
            imageUrl="/images/graph-and-linear-relation.webp"
            prevLesson={prevLesson}
            nextLesson={nextLesson}
        >
            <Content />
        </ContentWrapper>
    );
}
