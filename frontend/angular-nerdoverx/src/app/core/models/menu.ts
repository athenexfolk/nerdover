export interface categorySlugger {
  name: string;
  slug: string;
  lessons: LessonSlugger[];
}

interface LessonSlugger {
  title: string;
  slug: string;
}
