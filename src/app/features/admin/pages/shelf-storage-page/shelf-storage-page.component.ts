import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDeletePanelComponent } from '../../components/confirm-delete-panel/confirm-delete-panel.component';
import { Shelf, ShelfDto } from '../../../../core/models/shelf';
import { BookDescription } from '../../../../core/models/book';
import { DType } from '../../../../core/constants/document-type';
import { AddPanelComponent } from '../../components/add-panel/add-panel.component';
import { RouterLink } from '@angular/router';
import { EditPanelComponent } from '../../components/edit-panel/edit-panel.component';
import { BehaviorSubject } from 'rxjs';
import { ShelfService } from '../../../../core/services/shelf/shelf.service';
import { RelativeTimePipe } from '../../../../shared/pipes/relative-time.pipe';

@Component({
  selector: 'app-shelf-storage-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ConfirmDeletePanelComponent,
    AddPanelComponent,
    EditPanelComponent,
    RelativeTimePipe
  ],
  templateUrl: './shelf-storage-page.component.html',
  styleUrl: './shelf-storage-page.component.scss',
})
export class ShelfStoragePageComponent implements OnInit {
  isDeletePanelOpen = false;
  isAddPanelOpen = false;
  isEditPanelOpen = false;

  shelves$: BehaviorSubject<Shelf[]> = new BehaviorSubject<Shelf[]>([]);
  books$: BehaviorSubject<BookDescription[]> = new BehaviorSubject<
    BookDescription[]
  >([]);

  currentDeleteDTypeFocus: DType | null = null;
  currentDeleteObjectFocus?: Shelf | BookDescription;

  currentAddShelf?: { id: string; name: string; cover?: File };
  currentEditShelf?: Shelf;

  get DType() {
    return DType;
  }

  constructor(private shelfService: ShelfService) {}

  ngOnInit(): void {
    this.shelfService.getShelves().subscribe({
      next: (shelves) => this.shelves$.next(shelves),
      complete: () => console.log('load finished'),
    });

    this.shelfService.getBooks().subscribe({
      next: (books) => this.books$.next(books),
    });
  }

  openDeletePanel() {
    this.isDeletePanelOpen = true;
  }

  closeDeletePanel() {
    this.isDeletePanelOpen = false;
  }

  openAddPanel() {
    this.isAddPanelOpen = true;
  }

  closeAddPanel() {
    this.isAddPanelOpen = false;
  }

  openEditPanel() {
    this.isEditPanelOpen = true;
  }

  closeEditPanel() {
    this.isEditPanelOpen = false;
  }

  delete(type: DType, object: Shelf | BookDescription) {
    this.currentDeleteDTypeFocus = type;
    this.currentDeleteObjectFocus = object;
    this.openDeletePanel();
  }

  confirmDelete() {
    if (!this.currentDeleteObjectFocus) return;
    if (this.currentDeleteDTypeFocus === DType.Shelf) {
      const deletingShelf: Shelf = this.currentDeleteObjectFocus;
      this.shelfService.deleteShelf(deletingShelf.id).subscribe({
        next: () => {
          this.shelves$.next(
            this.shelves$.value.filter((shelf) => shelf.id !== deletingShelf.id)
          );
          this.closeDeletePanel();
        },
      });
    } else if (this.currentDeleteDTypeFocus === DType.Book) {
      const deletingBook: BookDescription = this
        .currentDeleteObjectFocus as BookDescription;
      this.shelfService
        .deleteBook(deletingBook.shelfId, deletingBook.id)
        .subscribe({
          next: () => {
            this.books$.next(
              this.books$.value.filter((book) => book.id !== deletingBook.id)
            );
            this.closeDeletePanel();
          },
        });
    }

    this.currentDeleteDTypeFocus = null;
    this.currentDeleteObjectFocus = undefined;
  }

  addShelf() {
    this.openAddPanel();
  }

  confirmAddShelf({ id, name, cover }: ShelfDto) {
    this.shelfService.createShelf(id, name, cover).subscribe({
      next: (shelf) => {
        this.shelves$.next([...this.shelves$.value, shelf]);
        this.closeAddPanel();
      },
    });
  }

  editShelf(shelf: Shelf) {
    this.openEditPanel();
    this.currentEditShelf = shelf;
  }

  confirmEditShelf(shelf: ShelfDto) {
    this.shelfService
      .updateShelf(shelf.id, { name: shelf.name }, shelf.cover)
      .subscribe((updatedShelf) => {
        this.shelves$.next(
          this.shelves$.value.map((s) => {
            if (s.id === shelf.id) return updatedShelf;
            return s;
          })
        );
        this.closeEditPanel();
        this.currentEditShelf = undefined;
      });
  }
}
