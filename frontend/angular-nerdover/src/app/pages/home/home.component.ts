import { Component } from '@angular/core';
import { CategoryListComponent } from '../../features/category/components/category-list/category-list.component';
import { LessonListComponent } from '../../features/lesson/components/lesson-list/lesson-list.component';

@Component({
  selector: 'app-home',
  imports: [CategoryListComponent, LessonListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
