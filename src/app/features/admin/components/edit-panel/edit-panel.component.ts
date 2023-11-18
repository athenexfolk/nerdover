import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackdropComponent } from '../../../../shared/components/backdrop/backdrop.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Shelf, ShelfDto } from '../../../../core/models/shelf';

@Component({
  selector: 'app-edit-panel',
  standalone: true,
  imports: [CommonModule, BackdropComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-panel.component.html',
  styleUrl: './edit-panel.component.scss',
})
export class EditPanelComponent implements OnInit {
  @Input({ required: true }) oldShelf!: Shelf;
  @Output() closeTrigger = new EventEmitter();
  @Output() editTrigger = new EventEmitter<ShelfDto>();

  id = '';
  name = '';
  cover?: File;
  coverSrc?: string;

  ngOnInit(): void {
    this.id = this.oldShelf.id;
    this.name = this.oldShelf.name;
  }

  close() {
    this.closeTrigger.emit();
  }

  edit() {
    this.editTrigger.emit({ id: this.id, name: this.name, cover: this.cover });
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
