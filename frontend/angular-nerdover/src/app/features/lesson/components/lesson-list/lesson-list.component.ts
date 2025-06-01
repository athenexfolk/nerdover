import { Component, inject } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import type { Lesson } from '../../../../core/models/lesson';
import { Toggler } from '../../../../shared/utils/toggler';
import { CreateLessonComponent } from '../create-lesson/create-lesson.component';
import { LessonComponent } from '../lesson/lesson.component';
import { AddItemButtonComponent } from '../../../../shared/components/add-item-button/add-item-button.component';
import { UpdateLessonComponent } from '../update-lesson/update-lesson.component';
import { DeleteLessonComponent } from '../delete-lesson/delete-lesson.component';
import { Router } from '@angular/router';
import { LessonStoreService } from '../../../../core/services/lesson-store.service';

@Component({
  selector: 'app-lesson-list',
  imports: [
    CreateLessonComponent,
    LessonComponent,
    AddItemButtonComponent,
    UpdateLessonComponent,
    DeleteLessonComponent,
  ],
  templateUrl: './lesson-list.component.html',
  styleUrl: './lesson-list.component.css',
})
export class LessonListComponent {
  protected readonly lessonStore = inject(LessonStoreService);
  private readonly router = inject(Router);

  addPanel = new Toggler();
  updatePanel = new Toggler();
  deletePanel = new Toggler();

  focusLesson?: Lesson;

  ngOnInit() {
    this.lessonStore.load();
  }

  handleOpenUpdatePanel(lesson: Lesson) {
    this.focusLesson = lesson;
    this.updatePanel.activate();
  }

  handleOpenDeletePanel(lesson: Lesson) {
    this.focusLesson = lesson;
    this.deletePanel.activate();
  }

  handleCloseUpdatePanel() {
    this.updatePanel.deactivate();
    this.focusLesson = undefined;
  }

  handleCloseDeletePanel() {
    this.deletePanel.deactivate();
    this.focusLesson = undefined;
  }

  openContentPage(lesson: Lesson) {
    this.router.navigate(['contents', lesson.id]);
  }
}
