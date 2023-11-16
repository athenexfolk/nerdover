import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDeletePanelComponent } from '../../components/confirm-delete-panel/confirm-delete-panel.component';
import { Shelf } from '../../../../core/models/shelf';
import { BookDescription } from '../../../../core/models/book';
import { DType } from '../../../../core/constants/document-type';

@Component({
  selector: 'app-shelf-storage-page',
  standalone: true,
  imports: [CommonModule, ConfirmDeletePanelComponent],
  templateUrl: './shelf-storage-page.component.html',
  styleUrl: './shelf-storage-page.component.scss',
})
export class ShelfStoragePageComponent {
  isDeletePanelOpen = false;

  shelves: Shelf[] = [
    {
      id: 'a',
      name: 'A',
    },
  ];
  books: BookDescription[] = [];

  currentDTypeFocus: DType | null = null;
  currentObjectFocus?: Shelf | BookDescription;

  get DType() {
    return DType;
  }

  openDeletePanel() {
    this.isDeletePanelOpen = true;
  }

  closeDeletePanel() {
    this.isDeletePanelOpen = false;
  }

  delete(type: DType, object: Shelf | BookDescription) {
    this.currentDTypeFocus = type;
    this.currentObjectFocus = object;
    this.openDeletePanel();
  }

  confirmDelete() {
    if (!this.currentObjectFocus) return;
    if (this.currentDTypeFocus === DType.Shelf) {
      this.shelves = this.shelves.filter(
        (s) => s.id !== this.currentObjectFocus!.id
      );
    } else if (this.currentDTypeFocus === DType.Book) {
      this.books = this.books.filter(
        (b) => b.id !== this.currentObjectFocus!.id
      );
    }
  }
}
