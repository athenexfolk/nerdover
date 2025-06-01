import { inject, Injectable, signal } from '@angular/core';
import type { Category } from '../models/category';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryStoreService {
  private readonly apiService = inject(ApiService);

  categories = signal<Category[]>([]);

  add(category: Category) {
    this.categories.update((currentCategories) => [
      ...currentCategories,
      category,
    ]);
  }

  remove(category: Category) {
    this.categories.update((currentCategories) =>
      currentCategories.filter((c) => c.id !== category.id),
    );
  }

  update(category: Category) {
    this.categories.update((currentCategories) =>
      currentCategories.map((c) => (c.id === category.id ? category : c)),
    );
  }

  load() {
    this.apiService.getCategories().subscribe({
      next: (categories) => {
        this.categories.set(categories);
      },
      error: (error) => {
        console.error('Failed to load categories:', error);
      },
    });
  }
}
