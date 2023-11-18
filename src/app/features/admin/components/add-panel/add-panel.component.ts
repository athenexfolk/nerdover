import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackdropComponent } from '../../../../shared/components/backdrop/backdrop.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShelfDto } from '../../../../core/models/shelf';

@Component({
  selector: 'app-add-panel',
  standalone: true,
  imports: [CommonModule, BackdropComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './add-panel.component.html',
  styleUrl: './add-panel.component.scss',
})
export class AddPanelComponent {
  @Output() closeTrigger = new EventEmitter();
  @Output() addTrigger = new EventEmitter<ShelfDto>();

  id = '';
  name = '';
  cover?: File;
  coverSrc?: string;

  close() {
    this.closeTrigger.emit();
  }

  add() {
    this.addTrigger.emit({ id: this.id, name: this.name, cover: this.cover });
  }

  displayCover(e: Event) {
    const files = (e.target as HTMLInputElement).files;
    if (files?.length) {
      this.cover = files[0];
      this.coverSrc = URL.createObjectURL(this.cover);
    }
  }

  clearCover() {
    this.cover = undefined;
    this.coverSrc = undefined;
  }
}
