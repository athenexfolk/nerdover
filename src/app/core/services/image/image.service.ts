import { Injectable } from '@angular/core';
import { ImageRepositoryService } from '../../repositories/image-repository.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private imageRepo: ImageRepositoryService) {}

  getImages() {
    return this.imageRepo.findAll();
  }

  uploadImage(image: File) {
    return this.imageRepo.uploadImage(image);
  }
}
