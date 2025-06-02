import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import type { Lesson } from '../models/lesson';
import type { categorySlugger } from '../models/menu';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private readonly http = inject(HttpClient);

  menu = signal<categorySlugger[] | undefined>(undefined);

  getMenu() {
    var url = 'api/menu.json';
    return this.http.get<categorySlugger[]>(url);
  }

  getLessonBySlug(categorySlug: string, lessonSlug: string) {
    var url = `api/${categorySlug}.${lessonSlug}.json`;
    return this.http.get<Lesson>(url);
  }

  loadMenu() {
    if (!this.menu()) {
      this.getMenu().subscribe(this.menu.set);
    }
  }
}
