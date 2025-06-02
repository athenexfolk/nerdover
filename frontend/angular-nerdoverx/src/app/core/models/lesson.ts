export interface Lesson {
  id: string;
  slug: string;
  title: string;
  categorySlug: string;
  contentUrl: string;
  coverUrl?: string;
  content?: string;
}
