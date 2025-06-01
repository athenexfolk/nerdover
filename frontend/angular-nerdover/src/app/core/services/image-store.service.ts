import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ImageStoreService {
  private readonly apiService = inject(ApiService);

  firstLoad = true;

  images = signal<string[]>([]);

  add(image: string) {
    this.images.update((currentImages) => [...currentImages, image]);
  }

  load() {
    if (!this.firstLoad) {
      return;
    }

    this.firstLoad = false;
    this.apiService.getImageLinks().subscribe({
      next: (images) => {
        this.images.set(images);
      },
      error: (error) => {
        console.error('Failed to load images:', error);
      },
    });
  }
}
