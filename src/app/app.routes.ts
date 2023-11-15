import { Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing/landing-page/landing-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'learn',
    loadComponent: () =>
      import('./features/learn/shelf-page/shelf-page.component').then(
        (m) => m.ShelfPageComponent
      ),
  },
];
