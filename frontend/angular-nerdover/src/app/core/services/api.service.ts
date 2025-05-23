import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Category } from '../models/category';
import type { Lesson } from '../models/lesson';
import type { CreateLessonDto } from '../dtos/create-lesson';
import type { CreateCategoryDto } from '../dtos/create-category';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly BASE_API_URL = 'https://localhost:7172';

  getCategories() {
    return this.http.get<Category[]>(`${this.BASE_API_URL}/api/categories`);
  }

  getCategoryById(id: string) {
    return this.http.get<Category>(`${this.BASE_API_URL}/api/categories/${id}`);
  }

  createCategory(dto: CreateCategoryDto) {
    return this.http.post<Category>(`${this.BASE_API_URL}/api/categories`, dto);
  }

  updateCategory(id: string) {
    return this.http.patch(`${this.BASE_API_URL}/api/categories/${id}`, {});
  }

  deleteCategory(id: string) {
    return this.http.delete(`${this.BASE_API_URL}/api/categories/${id}`, {});
  }

  getLessons() {
    return this.http.get<Lesson[]>(`${this.BASE_API_URL}/api/lessons`);
  }

  getLessonById(id: string) {
    return this.http.get<Lesson>(`${this.BASE_API_URL}/api/lessons/${id}`);
  }

  createLesson(dto: CreateLessonDto) {
    return this.http.post(`${this.BASE_API_URL}/api/lessons`, dto);
  }

  updateLesson(id: string) {
    return this.http.put(`${this.BASE_API_URL}/api/lessons/${id}`, {});
  }

  updateContent(id: string) {
    return this.http.patch(
      `${this.BASE_API_URL}/api/categories/${id}/content`,
      {},
    );
  }

  deleteLesson(id: string) {
    return this.http.delete(`${this.BASE_API_URL}/api/lessons/${id}`);
  }

  getImageLinks() {
    return this.http.get(`${this.BASE_API_URL}/api/features/images`);
  }

  uploadImage() {
    return this.http.post(`${this.BASE_API_URL}/api/features/images`, {});
  }
}
