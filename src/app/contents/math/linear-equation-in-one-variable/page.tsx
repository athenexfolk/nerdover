import ContentWrapper from '@/components/ContentWrapper';
import Content from './linear-equation-in-one-variable.mdx';
import { getLessonNavByPathFromRoot } from '@/core/utils/anchor-utils';

export default async function Page() {
    const { prevLesson, nextLesson } = getLessonNavByPathFromRoot(
        'math',
        'linear-equation-in-one-variable',
    );
    return (
        <ContentWrapper
            title="สมการเชิงเส้นตัวแปรเดียว"
            imageUrl="/images/linear-equation-in-one-variable.webp"
            prevLesson={prevLesson}
            nextLesson={nextLesson}
        >
            <Content />
        </ContentWrapper>
    );
}
