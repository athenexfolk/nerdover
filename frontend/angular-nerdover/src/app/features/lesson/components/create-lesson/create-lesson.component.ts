import { Component, inject, output } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import type { CreateLessonDto } from '../../../../core/dtos/create-lesson';
import type { Category } from '../../../../core/models/category';
import { OverlayComponent } from "../../../../shared/components/overlay/overlay.component";
import { OverlayCardComponent } from "../../../../shared/components/overlay-card/overlay-card.component";

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

  closed = output();
  created = output();

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
      return;
    }

    let slug = this.slug!.value!;
    let title = this.title!.value!;
    let categorySlug = this.categorySlug!.value!;

    let createLessonDto: CreateLessonDto = {
      slug,
      title,
      categorySlug,
    };

    if (this.selectedCoverUrl) {
      createLessonDto.coverUrl = this.selectedCoverUrl;
    }

    this.apiService.createLesson(createLessonDto).subscribe({
      next: () => {
        this.created.emit();
      },
    });
  }
}
