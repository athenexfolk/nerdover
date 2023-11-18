import { Injectable } from '@angular/core';
import { ShelfRepositoryService } from '../../repositories/shelf-repository.service';
import { BehaviorSubject } from 'rxjs';
import { Shelf } from '../../models/shelf';
import { Book } from '../../models/book';

@Injectable({
  providedIn: 'root',
})
export class ShelfService {
  shelfSubject: BehaviorSubject<Shelf[]>;

  get shelves() {
    return this.shelfSubject.value;
  }

  get shelves$() {
    return this.shelfSubject.asObservable();
  }

  constructor(private shelfRepo: ShelfRepositoryService) {
    this.shelfSubject = new BehaviorSubject<Shelf[]>([]);
  }

  getShelves() {
    return this.shelfRepo.getShelves();
  }

  getShelf(shelfId: string) {
    return this.shelfRepo.getShelfById(shelfId);
  }

  getBooks() {
    return this.shelfRepo.getBooks();
  }

  getBooksInShelf(shelfId: string) {
    return this.shelfRepo.getBooksInShelfId(shelfId);
  }

  getBook(shelfId: string, bookId: string) {
    return this.shelfRepo.getBookById(shelfId, bookId);
  }

  createShelf(shelfId: string, name: string, cover: File | undefined) {
    return this.shelfRepo.createShelf(shelfId, name, cover);
  }

  createBook(book: Book, cover: File | undefined) {
    return this.shelfRepo.createBook(book, cover);
  }

  updateShelf(shelfId: string, shelf: Partial<Shelf>, cover?: File) {
    return this.shelfRepo.updateShelf(shelfId, shelf, cover);
  }

  updateBook(
    shelfId: string,
    bookId: string,
    book: Partial<Book>,
    cover: File | undefined
  ) {
    return this.shelfRepo.updateBookById(shelfId, bookId, book, cover);
  }

  deleteShelf(shelfId: string) {
    return this.shelfRepo.deleteShelfById(shelfId);
  }

  deleteBook(shelfId: string, bookId: string) {
    return this.shelfRepo.deleteBookById(shelfId, bookId);
  }
}
