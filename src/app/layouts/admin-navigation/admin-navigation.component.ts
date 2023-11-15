import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconButtonComponent } from '../../shared/components/icon-button/icon-button.component';
import type { Nav } from '../../core/models/nav';

@Component({
  selector: 'app-admin-navigation',
  standalone: true,
  imports: [CommonModule, IconButtonComponent],
  templateUrl: './admin-navigation.component.html',
  styleUrl: './admin-navigation.component.scss',
})
export class AdminNavigationComponent {
  isLoggedIn = false;
  adminNavs: Nav[] = [
    {
      icon: 'folder_managed',
      label: 'จัดการ',
      link: ['/manage'],
    },
  ];

  logout() {
    console.log('logged out');
  }
}
