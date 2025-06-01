import { Component, inject, output } from '@angular/core';
import { OverlayComponent } from '../../../../shared/components/overlay/overlay.component';
import { OverlayCardComponent } from '../../../../shared/components/overlay-card/overlay-card.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import type { CreateCategoryDto } from '../../../../core/dtos/create-category';
import { ApiService } from '../../../../core/services/api.service';
import { delay, finalize } from 'rxjs';
import { CategoryStoreService } from '../../../../core/services/category-store.service';

@Component({
  selector: 'app-create-category',
  imports: [OverlayComponent, OverlayCardComponent, ReactiveFormsModule],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css',
})
export class CreateCategoryComponent {
  private readonly categoryStore = inject(CategoryStoreService);
  private readonly apiService = inject(ApiService);
  private readonly fb = inject(FormBuilder);

  form = this.fb.group({
    slug: ['', Validators.required],
    name: ['', Validators.required],
  });

  created = output();
  closed = output();

  creating = false;
  createErrorMessage?: string;

  get slug() {
    return this.form.get('slug');
  }

  get name() {
    return this.form.get('name');
  }

  create() {
    if (this.form.invalid) {
      this.createErrorMessage = 'กรุณากรอกข้อมูลให้ครบถ้วน';
      return;
    }

    let dto: CreateCategoryDto = {
      name: this.name!.value!,
      slug: this.slug!.value!,
    };

    this.creating = true;
    this.apiService
      .createCategory(dto)
      .pipe(
        delay(300),
        finalize(() => {
          this.creating = false;
        }),
      )
      .subscribe({
        next: (category) => {
          this.created.emit();
          this.form.reset();
          this.createErrorMessage = undefined;
          this.categoryStore.add(category);
          this.closed.emit();
        },
        error: (err) => {
          if (err.status === 409) {
            this.createErrorMessage =
              'หมุดหมวดหมู่นี้มีอยู่แล้ว กรุณาเลือกชื่ออื่น';
          }
        },
      });
  }
}
