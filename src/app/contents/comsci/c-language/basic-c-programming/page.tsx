import ContentWrapper from '@/components/ContentWrapper';
import Content from './basic-c-programming.mdx';
import { getLessonNavByPathFromRoot } from '@/core/utils/anchor-utils';

export default async function Page() {
    const { prevLesson, nextLesson } = getLessonNavByPathFromRoot(
        'comsci',
        'c-language',
        'basic-c-programming',
    );
    return (
        <ContentWrapper
            title="พื้นฐานการเขียนโปรแกรมภาษาซี"
            imageUrl="/images/basic-c-programming.webp"
            prevLesson={prevLesson}
            nextLesson={nextLesson}
        >
            <Content />
        </ContentWrapper>
    );
}
