import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UpdateContentComponent } from './features/lesson/components/update-content/update-content.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'contents/:id',
    component: UpdateContentComponent,
  },
];
