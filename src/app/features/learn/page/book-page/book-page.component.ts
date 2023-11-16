import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDescription } from '../../../../core/models/book';
import { CardButtonComponent } from '../../../../shared/components/card-button/card-button.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ShelfService } from '../../../../core/services/shelf/shelf.service';
import { Observable, switchMap, tap } from 'rxjs';
import { Shelf } from '../../../../core/models/shelf';

@Component({
  selector: 'app-book-page',
  standalone: true,
  imports: [CommonModule, CardButtonComponent, RouterLink],
  templateUrl: './book-page.component.html',
  styleUrl: './book-page.component.scss',
})
export class BookPageComponent implements OnInit {
  imagePrefix = '/upload/';

  shelf$!: Observable<Shelf>;
  books$!: Observable<BookDescription[]>;

  constructor(
    private shelfService: ShelfService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.shelf$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const shelfId = params.get('shelfId');
        if (!shelfId) throw new Error('shelfId is required');
        return this.shelfService.getShelf(shelfId);
      })
    );

    this.books$ = this.shelf$.pipe(
      switchMap((shelf) => {
        return this.shelfService.getBooksInShelf(shelf.id);
      })
    );
  }
}
