export interface Menu {
  categories: CategoryMenu[];
}

interface CategoryMenu {
  id: number;
  name: string;
  slug: string;
  lessons: LessonMenu[];
}

interface LessonMenu {
  id: number;
  title: string;
  slug: string;
  description?: string;
  cover?: string;
}
