import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Shelf } from '../models/shelf';
import { Book, BookDescription } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class ShelfRepositoryService {
  private readonly shelfEndpoint = '/api/shelf/shelves';
  private readonly bookEndpoint = '/api/shelf/books';

  constructor(private http: HttpClient) {}

  getShelves() {
    return this.http.get<Shelf[]>(this.shelfEndpoint);
  }

  getShelfById(shelfId: string) {
    return this.http.get<Shelf>(`${this.shelfEndpoint}/${shelfId}`);
  }

  getBooks() {
    return this.http.get<BookDescription[]>(`${this.bookEndpoint}`);
  }

  getBooksInShelfId(shelfId: string) {
    return this.http.get<BookDescription[]>(`${this.bookEndpoint}/${shelfId}`);
  }

  getBookById(shelfId: string, bookId: string) {
    return this.http.get<Book>(`${this.bookEndpoint}/${shelfId}/${bookId}`);
  }

  createShelf(shelfId: string, name: string, cover?: File | undefined) {
    const formData = new FormData();
    formData.append('id', shelfId);
    formData.append('name', name);
    if (cover) formData.append('cover', cover);
    return this.http.post<Shelf>(`${this.shelfEndpoint}`, formData);
  }

  createBook({ id, shelfId, name, data }: Book, cover?: File | undefined) {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('shelfId', shelfId);
    formData.append('name', name);
    formData.append('data', data);
    if (cover) formData.append('cover', cover);
    return this.http.post<Book>(`${this.bookEndpoint}`, formData);
  }

  updateShelf(shelfId: string, { name }: Partial<Shelf>, cover?: File) {
    const formData = new FormData();
    formData.append('id', shelfId);
    if (name) formData.append('name', name);
    if (cover) formData.append('cover', cover);
    return this.http.patch<Shelf>(`${this.shelfEndpoint}/${shelfId}`, formData);
  }

  updateBookById(
    oldShelfId: string,
    bookId: string,
    { name, data, shelfId }: Partial<Book>,
    cover: File | undefined
  ) {
    const formData = new FormData();
    if (shelfId) formData.append('shelfId', shelfId);
    if (name) formData.append('name', name);
    if (data) formData.append('data', data);
    if (cover) formData.append('cover', cover);
    return this.http.patch<Book>(
      `${this.bookEndpoint}/${oldShelfId}/${bookId}`,
      formData
    );
  }

  deleteShelfById(shelfId: string) {
    return this.http.delete(`${this.shelfEndpoint}/${shelfId}`);
  }

  deleteBookById(shelfId: string, bookId: string) {
    return this.http.delete(`${this.bookEndpoint}/${shelfId}/${bookId}`);
  }
}
