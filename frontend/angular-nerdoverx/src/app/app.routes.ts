import { Routes } from '@angular/router';
import { Landing } from './features/landing/landing/landing';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    component: Landing,
  },
  {
    path: 'lessons',
    loadChildren: () =>
      import('./features/lesson/lesson.routes').then((r) => r.routes),
  },
  {
    path: '**',
    component: NotFound,
  },
];
