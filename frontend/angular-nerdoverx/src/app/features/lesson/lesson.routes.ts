import type { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Empty } from './empty/empty';
import { Lesson } from './lesson/lesson';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        component: Empty,
      },
      {
        path: ':categorySlug/:lessonSlug',
        component: Lesson,
      },
    ],
  },
];
