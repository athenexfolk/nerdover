import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ContentService } from '../../../../core/services/content.service';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './main.layout.html',
  styleUrl: './main.layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayout {
  readonly contentService = inject(ContentService);

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
