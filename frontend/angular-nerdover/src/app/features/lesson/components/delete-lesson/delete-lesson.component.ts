import { Component, inject, input, output } from '@angular/core';
import { OverlayComponent } from '../../../../shared/components/overlay/overlay.component';
import { OverlayCardComponent } from '../../../../shared/components/overlay-card/overlay-card.component';
import { ApiService } from '../../../../core/services/api.service';
import type { Lesson } from '../../../../core/models/lesson';
import { delay, finalize } from 'rxjs';
import { LessonStoreService } from '../../../../core/services/lesson-store.service';

@Component({
  selector: 'app-delete-lesson',
  imports: [OverlayComponent, OverlayCardComponent],
  templateUrl: './delete-lesson.component.html',
  styleUrl: './delete-lesson.component.css',
})
export class DeleteLessonComponent {
  private readonly lessonStore = inject(LessonStoreService);
  private readonly apiService = inject(ApiService);

  lesson = input.required<Lesson>();

  deleted = output();
  closed = output();

  deleting = false;
  deleteErrorMessage?: string;

  delete() {
    this.deleting = true;
    this.apiService
      .deleteLesson(this.lesson().id)
      .pipe(
        delay(300),
        finalize(() => {
          this.deleting = false;
        }),
      )
      .subscribe({
        next: () => {
          this.deleted.emit();
          this.deleteErrorMessage = undefined;
          this.lessonStore.remove(this.lesson());
          this.closed.emit();
        },
        error: () => {
          this.deleteErrorMessage = 'ลบบทเรียนไม่สำเร็จ กรุณาลองใหม่อีกครั้ง';
        },
      });
  }
}
