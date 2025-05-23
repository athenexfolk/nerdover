import { Component, input } from '@angular/core';
import { Category } from '../../../../core/models/category';
import { ItemCardComponent } from '../../../../shared/components/item-card/item-card.component';
import { EditItemButtonComponent } from '../../../../shared/components/edit-item-button/edit-item-button.component';
import { DeleteItemButtonComponent } from '../../../../shared/components/delete-item-button/delete-item-button.component';

@Component({
  selector: 'app-category',
  imports: [
    ItemCardComponent,
    EditItemButtonComponent,
    DeleteItemButtonComponent,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  category = input.required<Category>();
}
