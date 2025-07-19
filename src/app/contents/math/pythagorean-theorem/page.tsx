import ContentWrapper from '@/components/ContentWrapper';
import Content from './pythagorean-theorem.mdx';
import { getLessonNavByPathFromRoot } from '@/core/utils/anchor-utils';

export default async function Page() {
    const { prevLesson, nextLesson } = getLessonNavByPathFromRoot(
        'math',
        'pythagorean-theorem',
    );
    return (
        <ContentWrapper
            title="ทฤษฎีบทพีทาโกรัส"
            imageUrl="/images/pythagorean-theorem.webp"
            prevLesson={prevLesson}
            nextLesson={nextLesson}
        >
            <Content />
        </ContentWrapper>
    );
}
