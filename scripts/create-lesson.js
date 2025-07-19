#!/usr/bin/env node
// Usage: node scripts/create-lesson.js <categoryPath> <lessonSlug>

const fs = require('fs');
const path = require('path');

function usage() {
    console.log(
        'Usage: node scripts/create-lesson.js <categoryPath> <lessonSlug>',
    );
    process.exit(1);
}

const [, , categoryPath, lessonSlug] = process.argv;
if (!categoryPath || !lessonSlug) usage();

// Support nested categories by splitting categoryPath by '/'
const baseDir = path.join(
    __dirname,
    '../src/app/contents',
    ...categoryPath.split('/'),
    lessonSlug,
);
if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
}

const lessonFile = path.join(baseDir, `${lessonSlug}.mdx`);
const pageFile = path.join(baseDir, 'page.tsx');

const lessonTemplate = `# ${lessonSlug.replace(/-/g, ' ')}\n\n<!-- Lesson content here -->\n`;

const pageTemplate = `import ContentWrapper from '@/components/ContentWrapper';
import Content from './${lessonSlug}.mdx';
import { getLessonNavByPathFromRoot } from '@/core/utils/anchor-utils';

export default async function Page() {
    const { prevLesson, nextLesson } = getLessonNavByPathFromRoot(
        ...'${categoryPath}'.split('/'),
        '${lessonSlug}',
    );
    return (
        <ContentWrapper
            title="${lessonSlug.replace(/-/g, ' ')}"
            imageUrl="/images/${lessonSlug}.webp"
            prevLesson={prevLesson}
            nextLesson={nextLesson}
        >
            <Content />
        </ContentWrapper>
    );
}
`;

if (!fs.existsSync(lessonFile)) {
    fs.writeFileSync(lessonFile, lessonTemplate);
    console.log(`Created: ${lessonFile}`);
} else {
    console.log(`File already exists: ${lessonFile}`);
}

if (!fs.existsSync(pageFile)) {
    fs.writeFileSync(pageFile, pageTemplate);
    console.log(`Created: ${pageFile}`);
} else {
    console.log(`File already exists: ${pageFile}`);
}
