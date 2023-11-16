import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagePageComponent } from './pages/manage-page/manage-page.component';
import { ImageStoragePageComponent } from './pages/image-storage-page/image-storage-page.component';
import { ShelfStoragePageComponent } from './pages/shelf-storage-page/shelf-storage-page.component';

const routes: Routes = [
  {
    path: 'manage',
    component: ManagePageComponent,
  },
  {
    path: 'manage/image-storage',
    component: ImageStoragePageComponent,
  },
  {
    path: 'manage/shelf-storage',
    component: ShelfStoragePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
