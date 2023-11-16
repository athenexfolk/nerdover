import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShelfPageComponent } from './page/shelf-page/shelf-page.component';
import { BookPageComponent } from './page/book-page/book-page.component';
import { DocumentPageComponent } from './page/document-page/document-page.component';

const routes: Routes = [
  {
    path: '',
    component: ShelfPageComponent,
  },
  {
    path: ':shelfId',
    component: BookPageComponent,
  },
  {
    path: ':shelfId/:bookId',
    component: DocumentPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnRoutingModule {}
