import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Shelf } from '../../../../core/models/shelf';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentComponent } from '../../../../shared/components/document/document.component';
import { ShelfService } from '../../../../core/services/shelf/shelf.service';
import { Router } from '@angular/router';
import { ImageStoragePageComponent } from '../image-storage-page/image-storage-page.component';

@Component({
  selector: 'app-add-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DocumentComponent,
    ImageStoragePageComponent,
  ],
  templateUrl: './add-page.component.html',
  styleUrl: './add-page.component.scss',
})
export class AddPageComponent {
  name = '';
  shelfId = '';
  id = '';
  data = '';

  cover: File | undefined;
  coverSrc: string | undefined;

  availableShelves$!: Observable<Shelf[]>;

  isCheckingDocument = false;
  isImagePanelOpen = false;

  publishState: 'editing' | 'publishing' | 'published' = 'editing';

  constructor(private shelfService: ShelfService, private router: Router) {}

  ngOnInit(): void {
    this.availableShelves$ = this.shelfService.getShelves();
  }

  checkDocument() {
    this.isCheckingDocument = true;
  }

  cancel() {
    this.isCheckingDocument = false;
  }

  publish() {
    if (this.shelfId.length && this.id.length && this.name.length) {
      this.publishState = 'publishing';
      this.shelfService
        .createBook(
          {
            id: this.id,
            shelfId: this.shelfId,
            name: this.name,
            data: this.data,
          },
          this.cover
        )
        .subscribe(() => {
          this.publishState = 'published';
          this.router.navigate(['/', 'learn', this.shelfId, this.id]);
        });
    }
  }

  openImagePanel() {
    this.isImagePanelOpen = true;
  }

  closeImagePanel() {
    this.isImagePanelOpen = false;
  }

  displayCover(e: Event) {
    const files = (e.target as HTMLInputElement).files;
    if (files?.length) {
      this.cover = files[0];
      this.coverSrc = URL.createObjectURL(this.cover);
    }
  }

  clearCover() {
    this.cover = undefined;
    this.coverSrc = undefined;
  }
}
