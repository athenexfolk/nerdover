import { Component, inject, signal } from '@angular/core';
import { ContentService } from '../../../core/services/content.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  protected readonly contentService = inject(ContentService);

  isOpen = signal(false);

  ngOnInit() {
    this.contentService.loadMenu();
  }

  openMenu() {
    this.isOpen.set(true);
  }

  closeMenu() {
    this.isOpen.set(false);
  }
}
