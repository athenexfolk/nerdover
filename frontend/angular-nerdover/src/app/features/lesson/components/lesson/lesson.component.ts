import { Component, input, output } from '@angular/core';
import type { Lesson } from '../../../../core/models/lesson';
import { ItemCardComponent } from '../../../../shared/components/item-card/item-card.component';
import { ContentItemButtonComponent } from '../../../../shared/components/content-item-button/content-item-button.component';
import { EditItemButtonComponent } from '../../../../shared/components/edit-item-button/edit-item-button.component';
import { DeleteItemButtonComponent } from '../../../../shared/components/delete-item-button/delete-item-button.component';

@Component({
  selector: 'app-lesson',
  imports: [
    ItemCardComponent,
    ContentItemButtonComponent,
    EditItemButtonComponent,
    DeleteItemButtonComponent,
  ],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css',
})
export class LessonComponent {
  lesson = input.required<Lesson>();

  triggerUpdate = output<Lesson>();
  triggerDelete = output<Lesson>();
}
