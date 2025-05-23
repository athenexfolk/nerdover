import { Component } from '@angular/core';
import { CategoryListComponent } from "./features/category/components/category-list/category-list.component";
import { LessonListComponent } from "./features/lesson/components/lesson-list/lesson-list.component";

@Component({
  selector: 'app-root',
  imports: [CategoryListComponent, LessonListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-nerdover';
}
