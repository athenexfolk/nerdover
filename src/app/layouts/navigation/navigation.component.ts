import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconButtonComponent } from '../../shared/components/icon-button/icon-button.component';
import type { Nav } from '../../core/models/nav';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, IconButtonComponent, RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  @Output() closeTrigger = new EventEmitter();

  navs: Nav[] = [
    {
      icon: 'home',
      label: 'หน้าหลัก',
      link: ['/'],
    },
    {
      icon: 'school',
      label: 'บทเรียน',
      link: ['/learn'],
    },
    {
      icon: 'apps',
      label: 'แอป',
      link: ['/app'],
    },
    {
      icon: 'person',
      label: 'เกี่ยวกับฉัน',
      link: ['/about'],
    },
  ];

  sendClose() {
    this.closeTrigger.emit()
  }
}
