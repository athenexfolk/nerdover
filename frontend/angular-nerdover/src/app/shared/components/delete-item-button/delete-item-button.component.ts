import { Component } from '@angular/core';
import { BaseItemButton } from '../abstract/item-button';

@Component({
  selector: 'app-delete-item-button',
  imports: [],
  templateUrl: './delete-item-button.component.html',
  styleUrl: './delete-item-button.component.css',
})
export class DeleteItemButtonComponent extends BaseItemButton {}
