import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardButtonComponent } from '../../../../shared/components/card-button/card-button.component';
import { Shelf } from '../../../../core/models/shelf';
import { ShelfService } from '../../../../core/services/shelf/shelf.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shelf-page',
  standalone: true,
  imports: [CommonModule, CardButtonComponent],
  templateUrl: './shelf-page.component.html',
  styleUrl: './shelf-page.component.scss',
})
export class ShelfPageComponent implements OnInit {
  imagePrefix = '/upload/';
  shelves$!: Observable<Shelf[]>;

  constructor(private shelfService: ShelfService) {}

  ngOnInit(): void {
    this.shelves$ = this.shelfService.getShelves();
  }
}
