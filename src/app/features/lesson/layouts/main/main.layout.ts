import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ContentService } from '../../../../core/services/content.service';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './main.layout.html',
  styleUrl: './main.layout.css',
})
export class MainLayout {
  readonly contentService = inject(ContentService);

  isOpen = false;

  ngOnInit() {
    this.contentService.loadMenu();
  }

  openMenu() {
    this.isOpen = true;
  }

  closeMenu() {
    this.isOpen = false;
  }
}
