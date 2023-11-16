import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DocumentComponent } from '../../../../shared/components/document/document.component';
import { ShelfService } from '../../../../core/services/shelf/shelf.service';
import { Observable, switchMap } from 'rxjs';
import { Book } from '../../../../core/models/book';

@Component({
  selector: 'app-document-page',
  standalone: true,
  imports: [CommonModule, RouterLink, DocumentComponent],
  templateUrl: './document-page.component.html',
  styleUrl: './document-page.component.scss',
})
export class DocumentPageComponent implements OnInit {
  book$!: Observable<Book>;

  constructor(
    private shelfService: ShelfService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.book$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const shelfId = params.get('shelfId');
        const bookId = params.get('bookId');
        if (!shelfId || !bookId) throw new Error('shelfId is required');
        return this.shelfService.getBook(shelfId, bookId);
      })
    );
  }
}
