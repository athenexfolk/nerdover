import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagePageComponent } from './pages/manage-page/manage-page.component';
import { ImageStoragePageComponent } from './pages/image-storage-page/image-storage-page.component';
import { ShelfStoragePageComponent } from './pages/shelf-storage-page/shelf-storage-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { AddPageComponent } from './pages/add-page/add-page.component';

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
  {
    path: 'manage/shelf-storage/add',
    component: AddPageComponent,
  },
  {
    path: 'manage/shelf-storage/edit/:shelfId/:bookId',
    component: EditPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
