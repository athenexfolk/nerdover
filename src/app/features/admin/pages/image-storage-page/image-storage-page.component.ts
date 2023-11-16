import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Image } from '../../../../core/models/image';
import { ImageService } from '../../../../core/services/image/image.service';

@Component({
  selector: 'app-image-storage-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-storage-page.component.html',
  styleUrl: './image-storage-page.component.scss',
})
export class ImageStoragePageComponent {
  isImageViewOpen = false;
  isLinkCopied = false;

  currentImageViewIndex = 0;

  imageSrcs: Image[] = [];

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.imageService
      .getImages()
      .subscribe((images) => (this.imageSrcs = images));
  }

  openImageView(index: number) {
    this.currentImageViewIndex = index;
    this.isImageViewOpen = true;
  }

  closeImageView() {
    this.isImageViewOpen = false;
  }

  changeView(increment: 1 | -1) {
    this.isLinkCopied = false;

    this.currentImageViewIndex =
      (this.currentImageViewIndex + increment + this.imageSrcs.length) %
      this.imageSrcs.length;
  }

  copyImageLink() {
    navigator.clipboard.writeText(
      this.imageSrcs[this.currentImageViewIndex].path
    );
    this.isLinkCopied = true;
  }

  addImage(e: Event) {
    const files = (e.target as HTMLInputElement).files;
    if (files?.length) {
      this.imageService
        .uploadImage(files[0])
        .subscribe((image) => this.imageSrcs.push(image));
    }
  }
}
