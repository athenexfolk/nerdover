import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../../../../core/models/book';
import { Observable, switchMap } from 'rxjs';
import { Shelf } from '../../../../core/models/shelf';
import { DocumentComponent } from '../../../../shared/components/document/document.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ShelfService } from '../../../../core/services/shelf/shelf.service';
import { ImageStoragePageComponent } from '../image-storage-page/image-storage-page.component';

@Component({
  selector: 'app-edit-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DocumentComponent,
    ImageStoragePageComponent,
  ],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.scss',
})
export class EditPageComponent {
  name = '';
  shelfId = '';
  id = '';
  data = '';

  oldShelfId = '';

  book: Book | undefined;

  cover: File | undefined;
  coverSrc: string | undefined;

  availableShelves$!: Observable<Shelf[]>;

  isCheckingDocument = false;
  isImagePanelOpen = false;

  adminFailState = false;

  publishState: 'editing' | 'publishing' | 'published' = 'editing';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shelfService: ShelfService
  ) {}

  ngOnInit(): void {
    this.availableShelves$ = this.shelfService.getShelves();

    this.route.paramMap
      .pipe(
        switchMap((params) => {
          let shelfId = params.get('shelfId');
          let bookId = params.get('bookId');

          if (!shelfId || !bookId)
            throw new Error('Shelf ID or Book ID must be valid');

          return this.shelfService.getBook(shelfId, bookId);
        })
      )
      .subscribe((book) => {
        if (!!localStorage.getItem('cacheDraft')) {
          const draft = JSON.parse(localStorage.getItem('cacheDraft')!) as Book;
          if (draft.id === book.id) {
            this.id = draft.id;
            this.shelfId = draft.shelfId;
            this.name = draft.name;
            this.data = draft.data;
            localStorage.removeItem('cacheDraft');
          }
        } else {
          this.id = book.id;
          this.shelfId = book.shelfId;
          this.name = book.name;
          this.data = book.data;
        }
        this.book = book;
        this.oldShelfId = book.shelfId;
      });
  }

  openImagePanel() {
    this.isImagePanelOpen = true;
  }

  closeImagePanel() {
    this.isImagePanelOpen = false;
  }

  checkDocument() {
    this.isCheckingDocument = true;
  }

  cancel() {
    this.isCheckingDocument = false;
  }

  publish() {
    this.publishState = 'publishing';
    this.shelfService
      .updateBook(
        this.oldShelfId,
        this.id,
        {
          shelfId: this.shelfId,
          name: this.name,
          data: this.data,
        },
        this.cover
      )
      .subscribe({
        next: () => {
          this.publishState = 'published';
          this.router.navigate(['/admin', 'manage', 'shelf-storage']);
        },
        error: () => {
          this.publishState = 'editing';
          this.adminFailState = true;
          const book: Book = {
            id: this.id,
            shelfId: this.shelfId,
            name: this.name,
            data: this.data,
          };
          localStorage.setItem('cacheDraft', JSON.stringify(book));
        },
      });
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
