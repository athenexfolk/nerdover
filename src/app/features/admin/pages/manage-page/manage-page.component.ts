import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './manage-page.component.html',
  styleUrl: './manage-page.component.scss'
})
export class ManagePageComponent {

}
