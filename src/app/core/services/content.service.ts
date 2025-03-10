import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import type { Menu } from '../models/menu';
import type { Lesson } from '../models/lesson';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  readonly #http = inject(HttpClient);

  menu = signal<Menu | undefined>(undefined);

  getMenu() {
    var url = 'api/menu.json';
    return this.#http.get<Menu>(url);
  }

  getLessonBySlug(categorySlug: string, lessonSlug: string) {
    var url = `api/${categorySlug}.${lessonSlug}.json`;
    return this.#http.get<Lesson>(url);
  }

  loadMenu() {
    if (!this.menu()) {
      this.getMenu().subscribe(this.menu.set);
    }
  }
}
