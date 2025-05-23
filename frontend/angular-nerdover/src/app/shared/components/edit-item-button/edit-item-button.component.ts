import { Component } from '@angular/core';
import { BaseItemButton } from '../abstract/item-button';

@Component({
  selector: 'app-edit-item-button',
  imports: [],
  templateUrl: './edit-item-button.component.html',
  styleUrl: './edit-item-button.component.css',
})
export class EditItemButtonComponent extends BaseItemButton {}
