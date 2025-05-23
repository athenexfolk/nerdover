import { Component } from '@angular/core';
import { BaseItemButton } from '../abstract/item-button';

@Component({
  selector: 'app-add-item-button',
  imports: [],
  templateUrl: './add-item-button.component.html',
  styleUrl: './add-item-button.component.css',
})
export class AddItemButtonComponent extends BaseItemButton {}
