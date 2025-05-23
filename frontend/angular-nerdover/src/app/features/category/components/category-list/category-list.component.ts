import { Component, inject } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import type { Category } from '../../../../core/models/category';
import { Toggler } from '../../../../shared/utils/toggler';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { CategoryComponent } from '../category/category.component';
import { AddItemButtonComponent } from '../../../../shared/components/add-item-button/add-item-button.component';
import type { CreateCategoryDto } from '../../../../core/dtos/create-category';
import { delay, finalize } from 'rxjs';

@Component({
  selector: 'app-category-list',
  imports: [CreateCategoryComponent, CategoryComponent, AddItemButtonComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent {
  private readonly apiService = inject(ApiService);

  categories: Category[] = [];

  addPanel = new Toggler();
  updatePanel = new Toggler();
  deletePanel = new Toggler();

  creating = false;

  ngOnInit() {
    this.apiService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
    });
  }

  create(dto: CreateCategoryDto) {
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
        next: () => {
          this.addPanel.deactivate();
        },
      });
  }
}
