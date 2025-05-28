import { Component, inject, input, output } from '@angular/core';
import { OverlayComponent } from '../../../../shared/components/overlay/overlay.component';
import { OverlayCardComponent } from '../../../../shared/components/overlay-card/overlay-card.component';
import { ApiService } from '../../../../core/services/api.service';
import { Category } from '../../../../core/models/category';
import { delay, finalize } from 'rxjs';

@Component({
  selector: 'app-delete-category',
  imports: [OverlayComponent, OverlayCardComponent],
  templateUrl: './delete-category.component.html',
  styleUrl: './delete-category.component.css',
})
export class DeleteCategoryComponent {
  private readonly apiService = inject(ApiService);

  category = input.required<Category>();

  deleted = output();
  closed = output();

  deleting = false;
  deleteErrorMessage?: string;

  delete() {
    this.deleting = true;
    this.apiService
      .deleteCategory(this.category().id)
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
          this.closed.emit();
        },
        error: () => {
          this.deleteErrorMessage = 'ลบหมวดหมู่ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง';
        },
      });
  }
}
