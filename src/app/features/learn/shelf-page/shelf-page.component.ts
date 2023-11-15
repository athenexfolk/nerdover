import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardButtonComponent } from '../../../shared/components/card-button/card-button.component';

@Component({
  selector: 'app-shelf-page',
  standalone: true,
  imports: [CommonModule, CardButtonComponent],
  templateUrl: './shelf-page.component.html',
  styleUrl: './shelf-page.component.scss'
})
export class ShelfPageComponent {
  shelves = []
}
