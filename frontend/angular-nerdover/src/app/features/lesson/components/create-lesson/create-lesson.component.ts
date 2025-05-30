import { Component, inject, output } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import type { CreateLessonDto } from '../../../../core/dtos/create-lesson';
import type { Category } from '../../../../core/models/category';
import { OverlayComponent } from '../../../../shared/components/overlay/overlay.component';
import { OverlayCardComponent } from '../../../../shared/components/overlay-card/overlay-card.component';
import { delay, finalize } from 'rxjs';

@Component({
  selector: 'app-create-lesson',
  imports: [ReactiveFormsModule, OverlayComponent, OverlayCardComponent],
  templateUrl: './create-lesson.component.html',
  styleUrl: './create-lesson.component.css',
})
export class CreateLessonComponent {
  private readonly apiService = inject(ApiService);
  private readonly fb = inject(FormBuilder);

  categories: Category[] = [];

  form = this.fb.group({
    slug: ['', [Validators.required]],
    title: ['', [Validators.required]],
    categorySlug: ['', [Validators.required]],
  });

  created = output();
  closed = output();

  creating = false;
  createErrorMessage?: string;

  selectedCoverUrl?: string;

  get slug() {
    return this.form.get('slug');
  }

  get title() {
    return this.form.get('title');
  }

  get categorySlug() {
    return this.form.get('categorySlug');
  }

  ngOnInit() {
    this.apiService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;

        if (categories.length > 0) {
          this.form.patchValue({ categorySlug: categories[0].slug });
        }
      },
    });
  }

  create() {
    if (this.form.invalid) {
      this.createErrorMessage = 'กรุณากรอกข้อมูลให้ครบถ้วน';
      return;
    }

    let slug = this.slug!.value!;
    let title = this.title!.value!;
    let categorySlug = this.categorySlug!.value!;

    let dto: CreateLessonDto = {
      slug,
      title,
      categorySlug,
    };

    if (this.selectedCoverUrl) {
      dto.coverUrl = this.selectedCoverUrl;
    }

    this.creating = true;
    this.apiService
      .createLesson(dto)
      .pipe(
        delay(300),
        finalize(() => {
          this.creating = false;
        }),
      )
      .subscribe({
        next: () => {
          this.created.emit();
          this.form.reset();
          this.createErrorMessage = undefined;
          this.closed.emit();
        },
        error: (err) => {
          if (err.status === 409) {
            this.createErrorMessage =
              'หมุดบทเรียนนี้มีอยู่แล้ว กรุณาเลือกชื่ออื่น';
          }
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
