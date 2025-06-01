import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import type { Lesson } from '../models/lesson';

@Injectable({
  providedIn: 'root',
})
export class LessonStoreService {
  private readonly apiService = inject(ApiService);

  lessons = signal<Lesson[]>([]);

  add(lesson: Lesson) {
    this.lessons.update((currentLessons) => [...currentLessons, lesson]);
  }

  remove(lesson: Lesson) {
    this.lessons.update((currentLessons) =>
      currentLessons.filter((c) => c.id !== lesson.id),
    );
  }

  update(lesson: Lesson) {
    this.lessons.update((currentLessons) =>
      currentLessons.map((c) => (c.id === lesson.id ? lesson : c)),
    );
  }

  load() {
    this.apiService.getLessons().subscribe({
      next: (lessons) => {
        this.lessons.set(lessons);
      },
      error: (error) => {
        console.error('Failed to load lessons:', error);
      },
    });
  }
}
