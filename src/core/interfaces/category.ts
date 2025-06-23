import type { Lesson } from './lesson';

export interface Category {
    title: string;
    slug: string;
    lessons: Lesson[];
}
