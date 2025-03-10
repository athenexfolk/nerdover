import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main/main.layout';
import { LessonPage } from './pages/lesson/lesson.page';
import { EmptyPage } from './pages/empty/empty.page';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        component: EmptyPage,
      },
      {
        path: ':categorySlug/:lessonSlug',
        component: LessonPage,
      },
    ],
  },
];
