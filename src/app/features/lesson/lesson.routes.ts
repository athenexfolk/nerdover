import { Routes, type ActivatedRouteSnapshot } from '@angular/router';
import { MainLayout } from './layouts/main/main.layout';
import { LessonPage } from './pages/lesson/lesson.page';
import { EmptyPage } from './pages/empty/empty.page';
import { inject } from '@angular/core';
import { ContentService } from '../../core/services/content.service';

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
        resolve: {
          lesson: (route: ActivatedRouteSnapshot) => {
            const contentService = inject(ContentService);
            return contentService.getLessonBySlug(
              route.params['categorySlug'],
              route.params['lessonSlug'],
            );
          },
        },
      },
    ],
  },
];
