import { Component, inject, input, output } from '@angular/core';
import { OverlayComponent } from '../../../../shared/components/overlay/overlay.component';
import { OverlayCardComponent } from '../../../../shared/components/overlay-card/overlay-card.component';
import { ApiService } from '../../../../core/services/api.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import type { Lesson } from '../../../../core/models/lesson';
import type { UpdateLessonDto } from '../../../../core/dtos/update-lesson';
import { delay, finalize } from 'rxjs';
import { LessonStoreService } from '../../../../core/services/lesson-store.service';

@Component({
  selector: 'app-update-lesson',
  imports: [OverlayComponent, OverlayCardComponent, ReactiveFormsModule],
  templateUrl: './update-lesson.component.html',
  styleUrl: './update-lesson.component.css',
})
export class UpdateLessonComponent {
  private readonly lessonStore = inject(LessonStoreService);
  private readonly apiService = inject(ApiService);
  private readonly fb = inject(FormBuilder);

  form = this.fb.group({
    slug: ['', Validators.required],
    title: ['', Validators.required],
  });

  lesson = input.required<Lesson>();

  updated = output();
  closed = output();

  updating = false;
  updateErrorMessage?: string;

  selectedCoverUrl?: string;

  get title() {
    return this.form.get('title');
  }

  ngOnInit() {
    this.form.patchValue({
      slug: this.lesson().slug,
      title: this.lesson().title,
    });

    this.selectedCoverUrl = this.lesson().coverUrl;
  }

  update() {
    if (this.form.invalid) {
      this.updateErrorMessage = 'กรุณากรอกข้อมูลให้ครบถ้วน';
      return;
    }

    let dto: UpdateLessonDto = {};

    if (this.title!.value) {
      dto.title = this.title!.value;
    }

    if (this.selectedCoverUrl) {
      dto.coverUrl = this.selectedCoverUrl;
    }

    this.updating = true;
    this.apiService
      .updateLesson(this.lesson().id, dto)
      .pipe(
        delay(300),
        finalize(() => {
          this.updating = false;
        }),
      )
      .subscribe({
        next: (lesson) => {
          this.updated.emit();
          this.form.reset();
          this.updateErrorMessage = undefined;
          this.lessonStore.update(lesson);
          this.closed.emit();
        },
        error: () => {
          this.updateErrorMessage =
            'อัปเดตบทเรียนไม่สำเร็จ กรุณาลองใหม่อีกครั้ง';
        },
      });
  }

  clearCoverImage() {
    this.selectedCoverUrl = undefined;
  }

  uploadImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.apiService
        .uploadImage(file)
        .pipe(
          finalize(() => {
            input.value = '';
          }),
        )
        .subscribe({
          next: (url) => {
            this.selectedCoverUrl = url.url;
          },
          error: (err) => {
            console.error('Image upload failed', err);
          },
        });
    }
  }
}
