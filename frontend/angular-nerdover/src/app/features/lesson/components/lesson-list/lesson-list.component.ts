import { Component, inject } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import type { Lesson } from '../../../../core/models/lesson';
import { Toggler } from '../../../../shared/utils/toggler';
import { CreateLessonComponent } from '../create-lesson/create-lesson.component';
import { LessonComponent } from '../lesson/lesson.component';
import { AddItemButtonComponent } from '../../../../shared/components/add-item-button/add-item-button.component';

@Component({
  selector: 'app-lesson-list',
  imports: [CreateLessonComponent, LessonComponent, AddItemButtonComponent],
  templateUrl: './lesson-list.component.html',
  styleUrl: './lesson-list.component.css',
})
export class LessonListComponent {
  private readonly apiService = inject(ApiService);

  lessons: Lesson[] = [];

  addPanel = new Toggler();
  updatePanel = new Toggler();
  deletePanel = new Toggler();

  ngOnInit() {
    this.apiService.getLessons().subscribe({
      next: (lessons) => {
        this.lessons = lessons;
      },
    });
  }
}
