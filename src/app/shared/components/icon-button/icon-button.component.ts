import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [CommonModule, RouterLinkActive],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss',
})
export class IconButtonComponent {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) label!: string;
}
