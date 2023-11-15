import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandComponent } from '../brand/brand.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { AdminNavigationComponent } from '../admin-navigation/admin-navigation.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    BrandComponent,
    NavigationComponent,
    AdminNavigationComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  isNavOpen = false;

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }

  closeNav() {
    this.isNavOpen = false;
  }
}
