import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-button',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card-button.component.html',
  styleUrl: './card-button.component.scss'
})
export class CardButtonComponent {
  @Input({ required: true }) image: string = '';
  @Input({ required: true }) name: string = '';
  @Input({ required: true }) link: string[] = [];
}
