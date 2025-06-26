#!/usr/bin/env node
// Usage: node scripts/create-lesson.js <categorySlug> <lessonSlug>

const fs = require('fs');
const path = require('path');

function usage() {
    console.log(
        'Usage: node scripts/create-lesson.js <categorySlug> <lessonSlug>',
    );
    process.exit(1);
}

const [, , categorySlug, lessonSlug] = process.argv;
if (!categorySlug || !lessonSlug) usage();

const baseDir = path.join(
    __dirname,
    '../src/app/contents',
    categorySlug,
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

export default async function Page() {
    return (
        <ContentWrapper title="${lessonSlug.replace(/-/g, ' ')}" imageUrl="/images/${lessonSlug}.webp">
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
