import { Component, inject, input, output } from '@angular/core';
import { OverlayComponent } from '../../../../shared/components/overlay/overlay.component';
import { OverlayCardComponent } from '../../../../shared/components/overlay-card/overlay-card.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { delay, finalize } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import { Category } from '../../../../core/models/category';
import type { UpdateCategoryDto } from '../../../../core/dtos/update-category';

@Component({
  selector: 'app-update-category',
  imports: [OverlayComponent, OverlayCardComponent, ReactiveFormsModule],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css',
})
export class UpdateCategoryComponent {
  private readonly apiService = inject(ApiService);
  private readonly fb = inject(FormBuilder);

  form = this.fb.group({
    slug: ['', Validators.required],
    name: ['', Validators.required],
  });

  category = input.required<Category>();

  updated = output();
  closed = output();

  updating = false;
  updateErrorMessage?: string;

  get name() {
    return this.form.get('name');
  }

  ngOnInit() {
    this.form.patchValue({
      slug: this.category().slug,
      name: this.category().name,
    });
  }

  update() {
    if (this.form.invalid) {
      this.updateErrorMessage = 'กรุณากรอกข้อมูลให้ครบถ้วน';
      return;
    }

    let dto: UpdateCategoryDto = {
      name: this.name!.value!,
    };

    this.updating = true;
    console.log(this.category().id);
    
    this.apiService
      .updateCategory(this.category().id, dto)
      .pipe(
        delay(300),
        finalize(() => {
          this.updating = false;
        }),
      )
      .subscribe({
        next: () => {
          this.updated.emit();
          this.form.reset();
          this.updateErrorMessage = undefined;
          this.closed.emit();
        },
        error: () => {
          this.updateErrorMessage =
            'อัปเดตหมวดหมู่ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง';
        },
      });
  }
}
