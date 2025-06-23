import { contentMenu } from './content-menu';

export default function getLesson(categorySlug: string, lessonSlug: string) {
    const category = contentMenu.find((cat) => cat.slug === categorySlug);
    if (!category) {
        return null;
    }
    const lesson = category.lessons.find((les) => les.slug === lessonSlug);
    if (!lesson) {
        return null;
    }
    return lesson;
}
