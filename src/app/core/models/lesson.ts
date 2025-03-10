export interface Lesson {
  id: number;
  title: string;
  slug: string;
  categoryId: number;
  categoryName: string;
  categorySlug: string;
  content?: string;
  description?: string;
  cover?: string;
  author?: string;
  updateTime?: Date;
}
