import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconButtonComponent } from '../../shared/components/icon-button/icon-button.component';
import type { Nav } from '../../core/models/nav';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, IconButtonComponent],
  templateUrl: './admin-navigation.component.html',
  styleUrl: './admin-navigation.component.scss',
})
export class AdminNavigationComponent {
  isLoggedIn$: Observable<boolean>;
  adminNavs: Nav[] = [
    {
      icon: 'folder_managed',
      label: 'จัดการ',
      link: ['manage'],
    },
  ];

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
