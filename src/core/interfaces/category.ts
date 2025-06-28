import type { Anchor } from './anchor';
import type { Lesson } from './lesson';

export interface Category extends Anchor {
    lessons: Lesson[];
    subcategories?: Category[];
}
