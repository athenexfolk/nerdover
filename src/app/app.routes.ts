import { Routes } from '@angular/router';
import { LandingPage } from './features/landing/pages/landing/landing.page';

export const routes: Routes = [
  {
    path: '',
    component: LandingPage,
  },
  {
    path: 'lessons',
    loadChildren: () =>
      import('./features/lesson/lesson.routes').then((r) => r.routes),
  },
];
