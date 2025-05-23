import { Component, input } from '@angular/core';

@Component({
  selector: 'app-overlay-card',
  imports: [],
  templateUrl: './overlay-card.component.html',
  styleUrl: './overlay-card.component.css',
  
})
export class OverlayCardComponent {
  title = input('');
}
