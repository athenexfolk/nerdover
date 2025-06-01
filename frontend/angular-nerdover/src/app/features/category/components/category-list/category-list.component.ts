import { Component, inject } from '@angular/core';
import type { Category } from '../../../../core/models/category';
import { Toggler } from '../../../../shared/utils/toggler';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { CategoryComponent } from '../category/category.component';
import { AddItemButtonComponent } from '../../../../shared/components/add-item-button/add-item-button.component';
import { UpdateCategoryComponent } from '../update-category/update-category.component';
import { DeleteCategoryComponent } from '../delete-category/delete-category.component';
import { CategoryStoreService } from '../../../../core/services/category-store.service';

@Component({
  selector: 'app-category-list',
  imports: [
    CreateCategoryComponent,
    CategoryComponent,
    AddItemButtonComponent,
    UpdateCategoryComponent,
    DeleteCategoryComponent,
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent {
  protected readonly categoryStore = inject(CategoryStoreService);

  createPanel = new Toggler();
  updatePanel = new Toggler();
  deletePanel = new Toggler();

  focusCategory?: Category;

  ngOnInit() {
    this.categoryStore.load();
  }

  handleOpenUpdatePanel(category: Category) {
    this.focusCategory = category;
    this.updatePanel.activate();
  }

  handleOpenDeletePanel(category: Category) {
    this.focusCategory = category;
    this.deletePanel.activate();
  }

  handleCloseUpdatePanel() {
    this.updatePanel.deactivate();
    this.focusCategory = undefined;
  }

  handleCloseDeletePanel() {
    this.deletePanel.deactivate();
    this.focusCategory = undefined;
  }
}
